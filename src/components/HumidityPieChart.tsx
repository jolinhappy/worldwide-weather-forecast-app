import React, { useRef, useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { ICommonComponentProperty, IDailyHumidity, IPieChartData } from '../types';

interface IHumidityPieChartProperty extends ICommonComponentProperty {
  data: IDailyHumidity[],
}

const HumidityPieChartComponent = ({ className, data }: IHumidityPieChartProperty) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const pieChartColor = useRef<string[]>(['#A49393', '#67595E', '#D48C70', '#E98980'])

  const pieChartData: IPieChartData[] = useMemo(() => (
    data.map((item, index) => ({
      color: pieChartColor.current[index],
      value: item.value,
      date: item.date
    }))
  ), [data]);

  const totalValue: number = useMemo(() => (
    pieChartData.reduce((prev, curr) => prev + curr.value, 0)
  ), [pieChartData]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.getContext('2d');
      setCtx(canvas.getContext('2d'));
      setCanvas(canvas);
      canvas.height = 300;
      canvas.width = 300;
    }
  }, [canvasRef]);

  useEffect(() => {
    const drawPieChart = (color: string, value: number) => {
      let startAngle = 0;
      let endAngle = 0;
      if (!ctx || !canvas) return;
      endAngle += value * Math.PI * 2 / totalValue;
      ctx.beginPath();
      ctx.fillStyle = color;
      // 移動到圓中心
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      // 畫圓弧(x軸中心, y軸中心, 半徑, 起始角度, 結束角度)
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
      ctx.lineTo(canvas.width / 2, canvas.height / 2);
      ctx.fill();

      const sliceMiddle = (startAngle + endAngle) / 2;
      const sliceX = canvas.width / 2 + Math.cos(sliceMiddle) * canvas.width / 4;
      const sliceY = canvas.height / 2 + Math.sin(sliceMiddle) * canvas.height / 4;
      const valueString = `${value}`;
      ctx.font = '14px Arial';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(valueString, sliceX, sliceY);
      startAngle = endAngle;
    }
    pieChartData.forEach((item: IPieChartData) => drawPieChart(item.color, item.value));
  }, [canvas, ctx, pieChartData, totalValue])

  return (
    <div className={className}>
      <div className="chart-info">
        {
          pieChartData.map((item: IPieChartData) => (
            <p>
              <span className="color" style={{ backgroundColor: item.color }}></span>
              <span className="text">{item.date}</span>
            </p>
          ))
        }
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
};

const HumidityPieChart = styled(HumidityPieChartComponent)`
  background-color: #EED6D3;
  padding: 20px;
  display: flex;
  justify-content: center;
  position: relative;
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
  @media screen and (min-width: 640px) {
    .chart-info {
      font-size: 16px;
      padding: 13px;
      width: 80px;
    }
  }
`

export default HumidityPieChart;