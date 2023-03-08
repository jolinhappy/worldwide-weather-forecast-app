export interface ICoordinateResponse {
  country: string; 
  lat: number; 
  local_names: ILocalName;
  lon: number;
  name: string;
}

export interface ILocalName {
  [key: string]: string;
}