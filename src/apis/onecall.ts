import { apiHelper } from "../utils/api-helper";
import { ICoordinate, IOnecallWeatherData } from "../types";
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
const baseURL = 'data/3.0/onecall?';

export default {
  getWeatherForecast(coordinate: ICoordinate): Promise<IOnecallWeatherData> {
    return apiHelper.get(`${baseURL}lat=${coordinate.lat}&lon=${coordinate.lon}&units=metric&lang=zh_tw&appid=${apiKey}`)
  }
}