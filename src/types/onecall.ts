export interface IOnecallWeatherData {
  current : ICurrent;
  daily: IDaily[];
  hourly: IHourly[];
  lat: number;
  lon: number; 
  minutely: IMinutely[]
  timezone: string; 
  timezone_offset: number;
}

export interface ICurrent {
  cloud: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: IWeather[];
  wind_deg: number;
  wind_speed: number;
}

export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IDaily {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: IFeelLike;
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: ITemp;
  uvi: number;
  weather: IWeather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface IFeelLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface ITemp {
  day: number;
  min: number;
  max: number;
  night: number;
  morn: number;
  eve: number;
}

export interface IHourly {
  clouds: number;
  dew_point: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
}

export interface IMinutely {
  dt: number;
  preciptation: number;
}