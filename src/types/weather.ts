import weather from '../apis/weather';
import { ICoordinate, IWeather } from './index';
export interface IClouds {
  all: number;
}
export interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}
export interface ISys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
export interface IWind {
  speed: number;
  deg: number;
  gust: number;
}
export interface ICurrentWeatherResponse {
  base: string;
  clouds: IClouds;
  cod: number;
  coord: ICoordinate;
  dt: number;
  id: number;
  main: IMain;
  name: string;
  sys: ISys
  timezone: number;
  visibility: number;
  weather: IWeather[];
  wind: IWind;
}