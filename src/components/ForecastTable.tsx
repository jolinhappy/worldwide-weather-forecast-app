import { useState } from 'react';
import styled from "styled-components";
import { ICommonComponentProperty, IDisplayDailyData } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface IForecastTableProperty extends ICommonComponentProperty {
  data: IDisplayDailyData[];
}

const ForecastTableComponent = ({ className, data }: IForecastTableProperty) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false)
  };

  return (
    <table className={className}>
      <thead>
        <tr>
          <th></th>
          {
            data.map((item, index) => (
              <td key={index}>
                <h3>{item.date}</h3>
                <div className='weather-section'>
                  {
                    isImageLoading && <LoadingSpinner />
                  }
                  <img style={isImageLoading ? { display: 'none' } : { display: 'inline' }} onLoad={handleImageLoad} src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="" />
                </div>

                <p>{item.description}</p>
              </td>
            ))
          }
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>白天</th>
          {
            data.map((item, index) => (
              <td key={index}>{item.mornTemp}°C</td>
            ))
          }
        </tr>
        <tr>
          <th>晚上</th>
          {
            data.map((item, index) => (
              <td key={index}>{item.nightTemp}°C</td>
            ))
          }
        </tr>
        <tr>
          <th>體感溫度</th>
          {
            data.map((item, index) => (
              <td key={index}>{item.averageFeelsLike}°C</td>
            ))
          }
        </tr>
        <tr>
          <th>紫外線</th>
          {
            data.map((item, index) => (
              <td key={index}>{item.uvi}</td>
            ))
          }
        </tr>
      </tbody>
    </table>
  )
};

const ForecastTable = styled(ForecastTableComponent)`
  width: 100%;
  background-color: #EED6D3;
  color: #3B0404;
  th {
    padding: 10px;
  }
  td {
    padding: 10px;
    text-align: center;
    .weather-section {
      height: 100px;
      width: 100px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
  }
  tr {
    th {
      background-color: #B95C50;
      font-weight: bold;
      color: #FADCD9;
    }
  }
  th, td {
    border: 1px solid #B95C50;
    border-collapse: collapse;
  }
`

export default ForecastTable;