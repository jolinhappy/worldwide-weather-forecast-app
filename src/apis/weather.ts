import { apiHelper } from "../utils/api-helper";
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
const baseURL = 'data/2.5/weather?';

export default {
  getCurrentWeather(city: string): Promise<any> {
    return apiHelper.get(`${baseURL}q=${city}&appid=${apiKey}`)
  },
}