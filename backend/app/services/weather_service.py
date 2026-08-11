import httpx
import datetime
from typing import Dict, Any, Optional
import os

GEOCODING_URL = os.getenv("WEATHER_GEOCODING_URL", "https://geocoding-api.open-meteo.com/v1/search")
WEATHER_URL = os.getenv("WEATHER_API_BASE_URL", "https://api.open-meteo.com/v1/forecast")

def map_weather_code(code: int) -> str:
    """Map Open-Meteo WMO weather codes to human-readable strings."""
    if code == 0:
        return "Clear sky"
    elif code in [1, 2, 3]:
        return "Partly cloudy"
    elif code in [45, 48]:
        return "Fog"
    elif code in [51, 53, 55, 56, 57]:
        return "Drizzle"
    elif code in [61, 63, 65, 66, 67]:
        return "Rain"
    elif code in [71, 73, 75, 77, 85, 86]:
        return "Snow"
    elif code in [80, 81, 82]:
        return "Rain showers"
    elif code in [95, 96, 99]:
        return "Thunderstorm"
    return "Unknown"

async def geocode_city(city: str) -> Optional[Dict[str, Any]]:
    """Geocode a city name into coordinates."""
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(GEOCODING_URL, params={
                "name": city,
                "count": 1,
                "language": "en",
                "format": "json"
            })
            response.raise_for_status()
            data = response.json()
            if "results" in data and len(data["results"]) > 0:
                result = data["results"][0]
                return {
                    "city": result.get("name"),
                    "country": result.get("country", ""),
                    "latitude": result.get("latitude"),
                    "longitude": result.get("longitude"),
                    "timezone": result.get("timezone", "UTC")
                }
            return None
        except httpx.RequestError as e:
            print(f"Geocoding request failed: {e}")
            raise Exception("Unable to connect to the geocoding service.")
        except Exception as e:
            print(f"Geocoding error: {e}")
            raise Exception("Geocoding failed.")

async def fetch_weather_data(latitude: float, longitude: float, timezone: str) -> Dict[str, Any]:
    """Fetch current weather and daily forecast."""
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            params = {
                "latitude": latitude,
                "longitude": longitude,
                "current": "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m",
                "hourly": "temperature_2m,weather_code,precipitation_probability",
                "daily": "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
                "timezone": timezone
            }
            response = await client.get(WEATHER_URL, params=params)
            response.raise_for_status()
            return response.json()
        except httpx.RequestError as e:
            print(f"Weather request failed: {e}")
            raise Exception("Unable to connect to the weather service.")
        except Exception as e:
            print(f"Weather error: {e}")
            raise Exception("Weather data is temporarily unavailable.")

def normalize_weather_response(location: Dict[str, Any], raw_data: Dict[str, Any]) -> Dict[str, Any]:
    """Normalize the raw Open-Meteo response into the exact format required by the frontend."""
    current = raw_data.get("current", {})
    daily = raw_data.get("daily", {})
    hourly = raw_data.get("hourly", {})
    
    current_weather = {
        "temperature": current.get("temperature_2m"),
        "feels_like": current.get("apparent_temperature"),
        "humidity": current.get("relative_humidity_2m"),
        "pressure": current.get("surface_pressure"),
        "wind_speed": current.get("wind_speed_10m"),
        "wind_direction": current.get("wind_direction_10m"),
        "visibility": None,
        "weather_code": current.get("weather_code"),
        "condition": map_weather_code(current.get("weather_code", -1))
    }
    
    forecast_days = []
    if daily and "time" in daily:
        for i in range(len(daily["time"])):
            forecast_days.append({
                "date": daily["time"][i],
                "temp_max": daily["temperature_2m_max"][i],
                "temp_min": daily["temperature_2m_min"][i],
                "precipitation_prob": daily["precipitation_probability_max"][i] if "precipitation_probability_max" in daily else 0,
                "weather_code": daily["weather_code"][i],
                "condition": map_weather_code(daily["weather_code"][i]),
                "sunrise": daily["sunrise"][i],
                "sunset": daily["sunset"][i]
            })

    hourly_forecast = []
    if hourly and "time" in hourly:
        # Take the next 24 hours
        import datetime
        now = datetime.datetime.now(datetime.timezone.utc) # Approx
        
        for i in range(min(24, len(hourly["time"]))):
            hourly_forecast.append({
                "time": hourly["time"][i],
                "temperature": hourly["temperature_2m"][i],
                "weather_code": hourly["weather_code"][i],
                "condition": map_weather_code(hourly["weather_code"][i]),
                "precipitation_prob": hourly["precipitation_probability"][i] if "precipitation_probability" in hourly else 0
            })

    return {
        "location": location,
        "current": current_weather,
        "forecast": forecast_days,
        "hourly": hourly_forecast,
        "updated_at": current.get("time")
    }
