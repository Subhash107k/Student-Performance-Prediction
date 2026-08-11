import { request } from "./api";

export interface WeatherLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CurrentWeather {
  temperature: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_direction: number;
  visibility: number | null;
  weather_code: number;
  condition: string;
}

export interface DailyForecast {
  date: string;
  temp_max: number;
  temp_min: number;
  precipitation_prob: number;
  weather_code: number;
  condition: string;
  sunrise: string;
  sunset: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  weather_code: number;
  condition: string;
  precipitation_prob: number;
}

export interface WeatherResponse {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: DailyForecast[];
  hourly: HourlyForecast[];
  updated_at: string;
}

export async function fetchWeather(city?: string, lat?: number, lon?: number): Promise<WeatherResponse> {
  const params = new URLSearchParams();
  if (city) params.append("city", city);
  if (lat !== undefined) params.append("lat", lat.toString());
  if (lon !== undefined) params.append("lon", lon.toString());
  
  return request<WeatherResponse>(`/weather/current?${params.toString()}`);
}
