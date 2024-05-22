import React, { useMemo } from "react";
import styled from "styled-components";
import { ICommonComponentProperty, IDailyTemperature } from '../types';

interface ITemperatureBarChartProperty extends ICommonComponentProperty {
  data: IDailyTemperature[];
}

const TemperatureBarChartComponent = ({ className, data }: ITemperatureBarChartProperty) => {
  // 依照實際氣溫的最大值去計算基本參考值
  const basicTemp = useMemo(() => data.reduce((prev, curr) => prev + curr.max, 0) / 4 + 10, [data])
  const barChartMaxHeight: number = 400;
  const getHeight = (value: number) => {
    const perTempToHeight = barChartMaxHeight / basicTemp;
    return value < 0 ? Math.abs(value * perTempToHeight) : value * perTempToHeight;
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
                <div className="bar max" style={{ height: getHeight(item.max), transform: item.max < 0 ? `translateY(${item.max}px)` : undefined  }}>
                  <p className="data-value">{item.max}°C</p>
                </div>
                <div className="bar min" style={{ height: getHeight(item.min), transform: item.min < 0 ? `translateY(${getHeight(item.min)}px)` : undefined }}>
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

const TemperatureBarChart = styled(TemperatureBarChartComponent)`
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
          position: relative;
          .data-value {
            color: rgb(59, 4, 4);
            font-weight: bold;
            font-size: 12px;
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
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