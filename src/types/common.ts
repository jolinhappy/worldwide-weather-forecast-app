export interface ICommonComponentProperty {
  className?: string;
}

export interface ICoordinate {
  lat: number;
  lon: number;
}


// 前端顯示用
export interface IDisplayDailyData {
  // TODO; 增加icon + 敘述
  date: string;
  icon: string;
  description: string;
  mornTemp: number;
  nightTemp: number;
  averageFeelsLike: number;
  uvi: number;
}

export type Category = 'weather' | 'temperature' | 'humidity'

export interface IDisplayTabs {
  type: Category;
  name: string;
}

export interface IBarChartData {
  date: string;
  min: number;
  max: number
}