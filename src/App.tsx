import React, { useState, useEffect, useCallback } from 'react';
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
  IOnecallWeatherData,
  Category
} from './types';
import styled from "styled-components";
import geoApiHandler from './apis/geo';
import onecallApiHandler from './apis/onecall';
import weatherApiHandler from './apis/weather';
import dayjs from 'dayjs';
import { Toast } from './utils/toast-helper';
import { useQuery } from '@tanstack/react-query'

const AppComponent = ({ className }: ICommonComponentProperty) => {
  const [inputValue, setInputValue] = useState<string>('Taipei');
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(null);
  const [dailyWeather, setDailyWeather] = useState<IDisplayDailyData[]>([]);
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState<Category>('weather');
  const [localName, setLocalName] = useState<string>('臺北市');
  const [dailyTemperature, setDailyTemperature] = useState<IDailyTemperature[]>([]);
  const [dailyHumidity, setDailyHumidity] = useState<IDailyHumidity[]>([]);
  const [currentCity, setCurrentCity] = useState<string>('');
  const [coordinateData, setCoordinateData] = useState<ICoordinate | null>(null);

  const { data: coordinate, isLoading: isGetCoordinateLoading, refetch: refetchCoordinate } = useQuery({ queryKey: ['coordinate', inputValue], queryFn: () => geoApiHandler.getCoordinate(inputValue), enabled: false })
  const { data: weatherData, isLoading: isGetWeatherDataLoading, refetch: refetchWeatherData } = useQuery({ queryKey: ['coordinate', coordinateData], queryFn: () => coordinateData && onecallApiHandler.getWeatherForecast(coordinateData), enabled: !!coordinateData })
  const { data: currentWeatherData, refetch: refetchCurrentWeatherData } = useQuery({ queryKey: ['currentWeather', currentCity], queryFn: () => weatherApiHandler.getCurrentWeather(currentCity), enabled: false })

  const handleSearch = async () => {
    if (inputValue === '') {
      Toast.fire({
        icon: 'warning',
        title: '請輸入欲查詢的地區名稱！',
      });
      return;
    }
    await refetchCoordinate()
    if (coordinate && coordinate.length > 0 && coordinateData) {
      setLocalName(coordinate[0].local_names['zh'] || coordinate[0].name);
      await refetchWeatherData();
      if (coordinateData) {
        await refetchWeatherData();
        // 避免把input刪掉後，又點擊refresh，會無法找到目前要查的地點
        setCurrentCity(coordinate[0].name);
      }
    }
  };

  const getWholeWeatherData = useCallback((weatherData: IOnecallWeatherData) => {
    setCurrentWeather(getCurrentWeatherData(weatherData.current));
    setDailyWeather(getDailyWeatherData(weatherData.daily).slice(0, 4));
    setDailyTemperature(getDailyTemperatureData(weatherData.daily).slice(0, 4));
    setDailyHumidity(getDailyHumidityData(weatherData.daily).slice(0, 4));
  }, []);

  useEffect(() => {
    const getSearchedCoordinate = () => {
      if (coordinate && coordinate.length > 0) {
        setLocalName(coordinate[0].local_names['zh'] || coordinate[0].name);
        setCoordinateData({
          lat: coordinate[0].lat,
          lon: coordinate[0].lon
        });
      } else {
        Toast.fire({
          icon: 'warning',
          title: '查無此地點，請重新搜尋！',
        });
      }
    };
    if (coordinate) {
      getSearchedCoordinate()
    }
  }, [coordinate])

  useEffect(() => {
    if (weatherData) {
      getWholeWeatherData(weatherData);
    }
  }, [getWholeWeatherData, weatherData])

  useEffect(() => {
    refetchCoordinate()
  }, [refetchCoordinate])

  useEffect(() => {
    setCurrentCity(inputValue);
  }, [inputValue])



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value.trim());
  };

  const handleTabSelect = (category: Category) => {
    setCurrentSelectedCategory(category);
  };

  const changeDisplayData = () => {
    switch (currentSelectedCategory) {
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

  const getDailyWeatherData = (daily: IDaily[]) => {
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

  const getDailyTemperatureData = (daily: IDaily[]) => {
    return daily.map((item: IDaily) => ({
      date: dayjs.unix(item.dt).format('MM/DD'),
      min: Math.round(item.temp.min),
      max: Math.round(item.temp.max),
    }));
  }

  const getDailyHumidityData = (daily: IDaily[]) => {
    return daily.map((item: IDaily) => ({
      date: dayjs.unix(item.dt).format('MM/DD'),
      value: item.humidity
    }));
  }

  const getCurrentWeatherData = (current: ICurrent) => {
    return {
      icon: current.weather[0].icon,
      description: current.weather[0].description,
      temp: Math.round(current.temp)
    }
  }

  const handleRefresh = async () => {
    if (currentCity) {
      await refetchCurrentWeatherData()
    }
    if (currentWeatherData) {
      setCurrentWeather({
        icon: currentWeatherData.weather[0].icon,
        description: currentWeatherData.weather[0].description,
        temp: Math.round(currentWeatherData.main.temp),
      });
    }
  }
  return (
    <div className={className}>
      <h1>全球天氣預報</h1>
      <section className='weather-search'>
        <SearchInput value={inputValue} inputChange={handleInputChange} search={handleSearch} isLoading={isGetWeatherDataLoading || isGetCoordinateLoading} />
      </section>
      <section className='weather-now-data'>
        <TodayWeatherCard data={currentWeather} localName={localName} refresh={handleRefresh} />
      </section>
      <section className='weather-forecast-data'>
        <CategoryTabs currentSelectedTab={currentSelectedCategory} tabSelect={handleTabSelect} />
        <div className="data-content">
          {
            weatherData && !isGetWeatherDataLoading ? changeDisplayData() : <div className="loader"></div>
          }
        </div>
      </section>
    </div>
  )
}

const App = styled(AppComponent)`
  padding: 60px 20px;
  background-color: #F9F1F0;
  .loader {
  font-weight: bold;
  font-family: sans-serif;
  font-size: 30px;
  animation: l1 1s linear infinite alternate;
  }
  .loader:before {
  content:"Loading..."
  }
  @keyframes l1 {to{opacity: 0}}
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
    min-height: 362px;
    .data-content {
      overflow: scroll;
      min-height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
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
