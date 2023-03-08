import { apiHelper } from "../utils/api-helper";
import { ICoordinateResponse } from "../types";
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
const baseURL = 'geo/1.0/direct?';

export default {
  getCoordinate(city: string): Promise<ICoordinateResponse[]> {
    return apiHelper.get(`${baseURL}q=${city}&limit=1&appid=${apiKey}`)
  },
}