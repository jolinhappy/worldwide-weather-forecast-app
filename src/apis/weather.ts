import { apiHelper } from "../utils/api-helper";
import { ICurrentWeatherResponse } from "../types/weather";
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
const baseURL = 'data/2.5/weather?';

const weatherApiHandler = {
  getCurrentWeather(city: string): Promise<ICurrentWeatherResponse> {
    return apiHelper.get(`${baseURL}q=${city}&units=metric&lang=zh_tw&appid=${apiKey}`)
  },
};

export default weatherApiHandler