import React from "react";
import styled from "styled-components";
import { ICommonComponentProperty, ICurrent } from '../types';
import { ReactComponent as RefreshIcon } from '../images/refresh.svg';

interface ITodayWeatherCardProperty extends ICommonComponentProperty {
  data: ICurrent | null;
  localName: string;
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
    /* animation: rotate infinite 1.5s linear; */
  }
  /* @keyframes rotate {
    from{
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  } */
  `

const TodayWeatherCardComponet = ({ className, data, localName }: ITodayWeatherCardProperty) => {
  function toRounding (value: number) {
    return Math.round(value);
  }
  return (
    <div className={className}>
      <h2>{localName} - 今日天氣</h2>
      <div className="weather">
        <img src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`}/>
        <div className="weather_temp-info">
          <p className="temp">{data?.temp ? `${toRounding(data?.temp)}°C`: '-'}</p>
          <p className="description">{data?.weather[0].description}</p>              
        </div>  
      </div>
        {/* TODO: refresh */}
        <Refresh>
          <RefreshIcon />
        </ Refresh>
    </div>
  )
};

const TodayWeatherCard = styled(TodayWeatherCardComponet)`
  padding: 25px;
  background-color: #67595E;
  border-radius: 5px;
  color: #EED6D3;
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