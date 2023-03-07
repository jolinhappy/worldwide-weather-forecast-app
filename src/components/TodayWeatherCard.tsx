import React from "react";
import styled from "styled-components";
import { ICommonComponentProperty } from '../types';

const TodayWeatherCardComponet = ({ className }: ICommonComponentProperty) => {
  return (
    <div className={className}>
      <h2>今日天氣</h2>
      <div>
        <img />
        <p>氣溫</p>
        <p>氣候敘述</p>           
      </div>
      <div>refresh</div>
    </div>
  )
};

const TodayWeatherCard = styled(TodayWeatherCardComponet)`
  height: 180px;
  padding: 25px;
  background-color: pink;
  border-radius: 5px;
  h2 {
    text-align: center;
    font-size: 26px;
    color: black;
  }
`

export default TodayWeatherCard;