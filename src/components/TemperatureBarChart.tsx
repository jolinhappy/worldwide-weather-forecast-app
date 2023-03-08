import React from "react";
import styled from "styled-components";
import { ICommonComponentProperty, IDailyTemperature } from '../types';

interface ITemperatureBarChartProperty extends ICommonComponentProperty {
  data: IDailyTemperature[];
}

const TemperatureBarChartComponet = ({ className, data }: ITemperatureBarChartProperty) => {
  const basicTemp: number = 40;
  const barChartMaxHeight: number = 400;
  function getHeight (value: number) {
    const perTempToHeight = barChartMaxHeight / basicTemp;
    return value * perTempToHeight;
  }
  return (
    <div className={className}>
      <div className="bar-chart" style={{ height: barChartMaxHeight }}>
        <div className="chart-info">
          <p>
            <span className="color max"></span>
            <span className="text">當日最高溫</span>
          </p>
          <p>
            <span className="color min"></span>
            <span color="text">當日最低溫</span>
          </p>
        </div>
        {
          data.map((item, index) => (
            <div className="temperature-bar" key={index}>
              <div className="bar-item">
                <div className="bar max" style={{ height: getHeight(item.max) }}>
                  <p className="data-value">{item.max}°C</p>
                </div>
                <div className="bar min" style={{ height: getHeight(item.min) }}>
                  <p className="data-value">{item.min}°C</p>
                </div>          
              </div>
              <p className="date">{item.date}</p>
            </div>          
          ))
        }        
      </div>
    </div>
  )
};

const TemperatureBarChart = styled(TemperatureBarChartComponet)`
  height: 425px;
  .bar-chart {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    background-color: #EED6D3;
    position: relative;
    .max {
      background-color: #DE847B;
    }
    .min {
      background-color: #B95C50;
    }
    .chart-info {
      position: absolute;
      padding: 10px;
      background-color: #F9F1F0;
      right: 10px;
      top: 10px;
      border-radius: 5px;
      font-size: 12px;
      p {
        & + p {
          margin-top: 5px;
        }
      }
      .color {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 6px;
      }
    }
    .temperature-bar {
      position: relative;
      .date {
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
        color: #3B0404;
        font-weight: bold;
        font-size: 13px;
      }
      .bar-item {
        display: flex;
        align-items: flex-end;;
        .bar {
          min-width: 28px;
          margin-right: 10px;
          transition: height 0.5s ease;
          .data-value {
            color: white;
            text-align: center;
            margin-top: 10px;
            font-weight: bold;
            font-size: 12px;
          }
        }          
      }
    }    
  }

  @media screen and (min-width: 640px) {
    .chart-info {
      font-size: 16px;
      padding: 13px;
    }
    .temperature-bar {
      .date {
        font-size: 16px;
      }
      .bar-item {
        .bar {
          min-width: 50px;
          .data-value {
            font-size: 16px;
          }
        }          
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .temperature-bar {
      .bar-item {
        .bar {
          width: 80px;
        }          
      }
    }
  }
`
export default TemperatureBarChart;