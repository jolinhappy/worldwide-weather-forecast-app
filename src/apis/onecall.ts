import { apiHelper } from "../utils/api-helper";
import { ICoordinate, IOnecallWeatherData } from "../types";
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
const baseURL = 'data/3.0/onecall?';

export default {
  getCurrentWeather(city: string): Promise<any> {
    return apiHelper.get(`${baseURL}/weather?q=${city}&appid=${apiKey}`)
  },
  getWeatherForecast(coordinate: ICoordinate): Promise<IOnecallWeatherData> {
    return apiHelper.get(`${baseURL}lat=${coordinate.lat}&lon=${coordinate.lon}&units=metric&lang=zh_tw&appid=${apiKey}`)
  }
  // getWeatherForecast(city: string): Promise<any> {
  //   return apiHelper.get(`forecast/daily?q=${city}&appid=${apiKey}`)
  // }
}