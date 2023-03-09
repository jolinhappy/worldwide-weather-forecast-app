import React from "react";
import styled from "styled-components";
import { ICommonComponentProperty, ICurrentWeather } from '../types';
import { ReactComponent as RefreshIcon } from '../images/refresh.svg';

interface ITodayWeatherCardProperty extends ICommonComponentProperty {
  data: ICurrentWeather | null;
  localName: string;
  refresh: () => void;
}

const Refresh = styled.div`
  display: flex;
  align-items: flex-end;
  color: red;
  svg {
    width: 16px;
    height: 16px;
    margin-left: auto;
    cursor: pointer;
  }
  `

const TodayWeatherCardComponet = ({ className, data, localName, refresh }: ITodayWeatherCardProperty) => {
  return (
    <div className={className}>
      <h2>{localName} - 今日天氣</h2>
      <div className="weather">
        <img src={`https://openweathermap.org/img/wn/${data?.icon}@4x.png`} alt="weather-icon" />
        <div className="weather_temp-info">
          <p className="temp">{data?.temp ? `${data?.temp}°C`: '-'}</p>
          <p className="description">{data?.description}</p>              
        </div>  
      </div>
        <Refresh>
          <RefreshIcon onClick={refresh} />
        </ Refresh>
    </div>
  )
};

const TodayWeatherCard = styled(TodayWeatherCardComponet)`
  padding: 25px;
  background-color: #67595E;
  border-radius: 5px;
  color: #EED6D3;
  min-height: 250px;
  h2 {
    text-align: center;
    font-size: 26px;
    font-weight: bold;
  }
  .weather {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      max-width: 180px;
    }
    &_temp-info {
      text-align: center;
      font-size: 18px;
      .temp {
        font-size: 30px;
      }
      .description {
        margin-top: 12px;
        font-size: 16px;
      }
    }

  }
  @media screen and (min-width: 640px) {
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 35px;
    }
    .weather {
      flex-direction: row;
      margin: 0 auto;
      img {
        max-width: 200px;
      }
      &_temp-info {
        .temp {
          font-size: 50px;
        }
        .description {
          font-size: 18px;
        }
      }      
    }
  }
`

export default TodayWeatherCard;