import React, { useState, useEffect } from 'react';
import SearchInput from './components/SearchInput';
import TodayWeatherCard from './components/TodayWeatherCard';
import CategoryTabs from './components/CategoryTabs';
import ForecastTable from './components/ForecastTable';
import TemperatureBarChart from './components/TemperatureBarChart';
import HumidityPieChart from './components/HumidityPieChart';
import {
  ICommonComponentProperty,
  ICoordinate,
  ICurrent,
  IDaily,
  IDisplayDailyData,
  IDailyTemperature,
  IDailyHumidity,
  ICurrentWeather,
  Category
} from './types';
import styled from "styled-components";
import geoApiHandler from './apis/geo';
import onecallApiHandler from './apis/onecall';
import weatherApiHandler from './apis/weather';
import dayjs from 'dayjs';
import { Toast } from './utils/toast-helper';

const AppComponent = ({className}: ICommonComponentProperty) => {
  const [inputValue, setInputValue] = useState<string>('Taipei');
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather|null>(null);
  const [dailyWeather, setDailyWeather] = useState<IDisplayDailyData[]>([]);
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState<Category>('weather');
  const [localName, setlocalName] = useState<string>('臺北市');
  const [dailyTemperature, setDailyTemperature] = useState<IDailyTemperature[]>([]);
  const [dailyHumidity, setDailyHumidity] = useState<IDailyHumidity[]>([]);
  const [currentCity, setCurrentCity] = useState<string>('');

  useEffect(() => {
    handleSearch();
    return;
  }, []);

  async function handleSearch () {
    const coordinate = await getSearchedCoordinate(inputValue);
    if (!coordinate) return;
    // 避免把input刪掉後，又點擊refresh，會無法找到目前要查的地點
    setCurrentCity(inputValue);
    const res = await onecallApiHandler.getWeatherForecast(coordinate);
    if (res) {
      setCurrentWeather(getCurrentWeatherData(res.current));
      setDailyWeather(getDailyWeatherData(res.daily).slice(0, 4));
      setDailyTemperature(getDailyTemperatureData(res.daily).slice(0, 4));
      setDailyHumidity(getDailyHumidityData(res.daily).slice(0, 4));
    }
  };

  async function getSearchedCoordinate (city: string): Promise<ICoordinate | undefined> {
    try {
      const res = await geoApiHandler.getCoordinate(city);
      if (res.length > 0) {
        setlocalName(res[0].local_names['zh'] || res[0].name);
        return {
          lat: res[0].lat,
          lon: res[0].lon
        }        
      } else {
        Toast.fire({
          icon: 'warning',
          title: '查無此地點，請重新搜尋！',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleInputChange (event: any) {
    setInputValue(event.target.value);
  };

  function handleTabSelect (category: Category) {
    setCurrentSelectedCategory(category);
  };

  function changeDisplayData () {
    switch(currentSelectedCategory) {
      case 'weather':
        return <ForecastTable data={dailyWeather} />
      case 'temperature':
        return <TemperatureBarChart data={dailyTemperature} />
      case 'humidity':
        return <HumidityPieChart data={dailyHumidity} />
      default:
        return <ForecastTable data={dailyWeather} />
    }
  }

  function getDailyWeatherData (daily: IDaily[]) {
    return daily.map((item: IDaily) => ({
      date: dayjs.unix(item.dt).format('MM/DD'),
      icon: item.weather[0].icon,
      description: item.weather[0].description,
      mornTemp: Math.round(item.temp.morn),
      nightTemp: Math.round(item.temp.night),
      averageFeelsLike: Math.round(Object.values(item.feels_like).reduce((prev, curr) => prev + curr, 0) / 4),
      uvi: item.uvi,
    }))
  }

  function getDailyTemperatureData (daily: IDaily[]) {
    return daily.map((item: IDaily) => ({
      date: dayjs.unix(item.dt).format('MM/DD'),
      min: Math.round(item.temp.min),
      max: Math.round(item.temp.max),
    }));
  }

  function getDailyHumidityData (daily: IDaily[]) {
    return daily.map((item: IDaily) => ({
      date: dayjs.unix(item.dt).format('MM/DD'),
      value: item.humidity
    }));
  }

  function getCurrentWeatherData (current: ICurrent) {
    return {
      icon: current.weather[0].icon,
      description: current.weather[0].description,
      temp: Math.round(current.temp)
    }
  }

  async function handleRefresh () {
    const res = await weatherApiHandler.getCurrentWeather(currentCity);
    const currentWeatherData = {
      icon: res.weather[0].icon,
      description: res.weather[0].description,
      temp: Math.round(res.main.temp),
    }
    setCurrentWeather(currentWeatherData);
  }
  return (
    <div className={className}>
      <h1>全球天氣預報</h1>
      <section className='weather-search'>
        <SearchInput value={inputValue} inputChange={handleInputChange} search={handleSearch} />
      </section>
      <section className='weather-now-data'>
        <TodayWeatherCard data={currentWeather} localName={localName} refresh={handleRefresh} />
      </section>
      <section className='weather-forecast-data'>
        <CategoryTabs currentSelectedTab={currentSelectedCategory} tabSelect={handleTabSelect}/>
        <div className="data-content">
          {
            changeDisplayData()
          }          
        </div>
      </section>
    </div>
  )
}

const App = styled(AppComponent)`
  padding: 60px 20px;
  background-color: #F9F1F0;
  h1 {
    font-size: 35px;
    font-weight: bold;
    text-align: center;
    color: #3B0404;
  }
  .weather-search {
    margin: 50px 0px 30px;
    text-align: right;
  }
  .weather-forecast-data {
    margin-top: 20px;
    .data-content {
      overflow: scroll;
    }
  }
  @media screen and (min-width: 640px) {
    padding: 60px;
    h1 {
      font-size: 40px;
      font-weight: bold;
      text-align: center;
    }    
  }
`
export default App;
