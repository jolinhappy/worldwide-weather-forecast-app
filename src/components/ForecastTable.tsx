import { table } from "console";
import React from "react";
import styled from "styled-components";
import { ICommonComponentProperty, IDisplayDailyData } from '../types';

interface IForecastTableProperty extends ICommonComponentProperty {
  data: IDisplayDailyData[];
}

const ForecastTableComponet = ({ className, data }: IForecastTableProperty) => {
  return (
    <table className={className}>
      <thead>
          <tr>
            <th></th>
            {
              data.map((item, index) => (
                <td key={index}>
                  <h3>{item.date}</h3>
                  <img src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="" />
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

const ForecastTable = styled(ForecastTableComponet)`
  width: 100%;
  background-color: #EED6D3;
  color: #3B0404;
  th {
    padding: 10px;
  }
  td {
    padding: 10px;
    text-align: center;
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