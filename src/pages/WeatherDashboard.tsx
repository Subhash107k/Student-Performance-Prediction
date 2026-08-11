import React, { useState, useEffect, useCallback } from "react";
import { 
  fetchWeather, 
  WeatherResponse 
} from "../services/weatherService";
import {
  Cloud, Sun, CloudRain, CloudLightning, Snowflake, CloudFog,
  MapPin, Search, Navigation, RefreshCw, Droplets, Wind, Gauge, Clock
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cityInput, setCityInput] = useState<string>("");
  const [currentCity, setCurrentCity] = useState<string>("Kathmandu"); // Default
  const [activeCoords, setActiveCoords] = useState<{ lat: number; lon: number } | null>(null);

  const loadWeather = useCallback(async (city?: string, lat?: number, lon?: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city, lat, lon);
      setWeatherData(data);
      if (data.location.city && data.location.city !== "Current Location") {
        setCurrentCity(data.location.city);
        setActiveCoords(null);
      }
    } catch (err: any) {
      setError(err.message || "Unable to load weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeCoords) {
      loadWeather(undefined, activeCoords.lat, activeCoords.lon);
    } else {
      loadWeather(currentCity);
    }
    
    // Auto refresh every 5 minutes
    const interval = setInterval(() => {
      if (activeCoords) {
        loadWeather(undefined, activeCoords.lat, activeCoords.lon);
      } else {
        loadWeather(currentCity);
      }
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [currentCity, activeCoords, loadWeather]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      setActiveCoords(null);
      setCurrentCity(cityInput.trim());
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setActiveCoords({ lat, lon });
        loadWeather(undefined, lat, lon);
      },
      (_err) => {
        setLoading(false);
        setError("Location access was denied. Search for a city instead.");
      }
    );
  };

  const getWeatherIcon = (condition: string, className = "w-6 h-6") => {
    const c = condition.toLowerCase();
    if (c.includes("clear") || c.includes("sun")) return <Sun className={`${className} text-amber-500`} />;
    if (c.includes("cloud") && !c.includes("rain")) return <Cloud className={`${className} text-slate-400`} />;
    if (c.includes("rain") || c.includes("drizzle")) return <CloudRain className={`${className} text-blue-500`} />;
    if (c.includes("thunder")) return <CloudLightning className={`${className} text-purple-500`} />;
    if (c.includes("snow")) return <Snowflake className={`${className} text-sky-300`} />;
    if (c.includes("fog")) return <CloudFog className={`${className} text-slate-300`} />;
    return <Cloud className={`${className} text-slate-400`} />;
  };

  const formatHour = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Search */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Sun className="w-6 h-6 text-amber-500" /> Real-Time Weather
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Live weather, 24-hour hourly prediction, and 7-day forecast.
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="flex w-full md:w-auto items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search location..."
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <button
              type="button"
              onClick={handleCurrentLocation}
              title="Use current location"
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
            >
              <Navigation className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (activeCoords) {
                  loadWeather(undefined, activeCoords.lat, activeCoords.lon);
                } else {
                  loadWeather(currentCity);
                }
              }}
              title="Refresh"
              className="p-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </form>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm flex items-center gap-2">
          <CloudLightning className="w-5 h-5" /> {error}
        </div>
      )}

      {loading && !weatherData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 h-64 bg-slate-100 animate-pulse rounded-3xl"></div>
          <div className="md:col-span-2 h-64 bg-slate-100 animate-pulse rounded-3xl"></div>
        </div>
      )}

      {!loading && weatherData && (
        <>
          {/* Current Weather Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg lg:col-span-1 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                {getWeatherIcon(weatherData.current.condition, "w-48 h-48")}
              </div>
              
              <div>
                <div className="flex items-center gap-1.5 text-indigo-100 text-sm font-medium mb-1">
                  <MapPin className="w-4 h-4" />
                  {weatherData.location.city}{weatherData.location.country ? `, ${weatherData.location.country}` : ''}
                </div>
                <h3 className="text-5xl font-extrabold mt-2 tracking-tighter">
                  {weatherData.current.temperature}°C
                </h3>
                <p className="text-lg font-medium text-indigo-50 mt-1 capitalize">
                  {weatherData.current.condition}
                </p>
                <p className="text-sm text-indigo-200 mt-1">
                  Feels like {weatherData.current.feels_like}°C
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/20">
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-xs text-indigo-200"><Droplets className="w-3 h-3"/> Humidity</span>
                  <span className="font-bold">{weatherData.current.humidity}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-xs text-indigo-200"><Wind className="w-3 h-3"/> Wind</span>
                  <span className="font-bold">{weatherData.current.wind_speed} km/h</span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-xs text-indigo-200"><Gauge className="w-3 h-3"/> Pressure</span>
                  <span className="font-bold">{weatherData.current.pressure} hPa</span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-xs text-indigo-200"><CloudFog className="w-3 h-3"/> Visibility</span>
                  <span className="font-bold">{weatherData.current.visibility !== null ? `${weatherData.current.visibility} km` : 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Temperature Trend Chart */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm lg:col-span-2">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                📅 7-Day Temperature Trend
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weatherData.forecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', {weekday: 'short'})}
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748b' }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelFormatter={(val) => new Date(val).toLocaleDateString('en-US', {weekday: 'long', month: 'short', day: 'numeric'})}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="temp_max" 
                      name="Max Temp (°C)"
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorTemp)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="temp_min" 
                      name="Min Temp (°C)"
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fillOpacity={0} 
                      strokeDasharray="4 4"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 24-Hour Hourly Weather Prediction */}
          {weatherData.hourly && weatherData.hourly.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" /> ⏱️ 24-Hour Hourly Prediction
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-200">
                {weatherData.hourly.map((hour, idx) => (
                  <div 
                    key={idx} 
                    className="flex-none w-24 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/70 rounded-2xl p-3 flex flex-col items-center text-center transition"
                  >
                    <span className="text-xs font-semibold text-slate-500 mb-2">
                      {formatHour(hour.time)}
                    </span>
                    {getWeatherIcon(hour.condition, "w-7 h-7 mb-2")}
                    <span className="text-sm font-bold text-slate-900 mb-1">
                      {Math.round(hour.temperature)}°C
                    </span>
                    <span className="text-[10px] text-slate-500 truncate w-full mb-1" title={hour.condition}>
                      {hour.condition}
                    </span>
                    {hour.precipitation_prob > 0 && (
                      <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <CloudRain className="w-2.5 h-2.5" /> {hour.precipitation_prob}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7-Day Forecast Cards */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              🔮 Weather Forecast (Next 7 Days)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {weatherData.forecast.map((day, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {idx === 0 ? "Today" : new Date(day.date).toLocaleDateString('en-US', {weekday: 'short'})}
                  </span>
                  {getWeatherIcon(day.condition, "w-8 h-8 mb-3")}
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span>{Math.round(day.temp_max)}°</span>
                    <span className="text-slate-400 font-medium">{Math.round(day.temp_min)}°</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 truncate w-full" title={day.condition}>
                    {day.condition}
                  </span>
                  <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                    <CloudRain className="w-3 h-3" /> {day.precipitation_prob}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
