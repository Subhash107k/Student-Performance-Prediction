from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from ..services.weather_service import geocode_city, fetch_weather_data, normalize_weather_response

router = APIRouter(prefix="/weather", tags=["weather"])

@router.get("/current")
async def get_current_weather(city: Optional[str] = None, lat: Optional[float] = None, lon: Optional[float] = None):
    try:
        location = None
        if city:
            location = await geocode_city(city)
            if not location:
                raise HTTPException(status_code=404, detail="Location not found. Please try another city.")
        elif lat is not None and lon is not None:
            # Reverse geocoding not strictly needed if we just use coords, 
            # but we can simulate a location object or fetch reverse geocode.
            # For simplicity, if lat/lon is provided directly:
            location = {
                "city": "Current Location",
                "country": "",
                "latitude": lat,
                "longitude": lon,
                "timezone": "auto"
            }
        else:
            raise HTTPException(status_code=400, detail="Must provide either city name or lat/lon coordinates.")
            
        raw_data = await fetch_weather_data(location["latitude"], location["longitude"], location["timezone"])
        normalized_data = normalize_weather_response(location, raw_data)
        
        # Strip forecast for just current endpoint if needed, but since we fetched both, 
        # it's efficient to just return the combined normalized object.
        return normalized_data
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/forecast")
async def get_weather_forecast(city: Optional[str] = None, lat: Optional[float] = None, lon: Optional[float] = None):
    # Since current fetches both, we can just reuse the logic.
    return await get_current_weather(city=city, lat=lat, lon=lon)
