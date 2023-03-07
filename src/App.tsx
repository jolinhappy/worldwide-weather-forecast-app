import React from 'react';
import SearchInput from './components/SearchInput';
import TodayWeatherCard from './components/TodayWeatherCard';
import CategoryTabs from './components/CategoryTabs';
import ForecastTable from './components/ForecastTable';
import { ICommonComponentProperty } from './types';
import styled from "styled-components";

const AppComponent = ({className}: ICommonComponentProperty) => {
  return (
    <div className={className}>
      <h1>Worldwide Weather Forecast</h1>
      <section className='weather-search'>
        <SearchInput />
      </section>
      <section className='weather-now-data'>
        <TodayWeatherCard />
      </section>
      <section className='weather-forecast-data'>
        <CategoryTabs />
        <ForecastTable />
      </section>
    </div>
  )
}

const App = styled(AppComponent)`
  padding: 60px;
  h1 {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
  }
  .weather-search {
    margin: 50px 0px 30px;
    text-align: right;
  }
  .weather-forecast-data {
    margin-top: 20px;
  }

`
export default App;
