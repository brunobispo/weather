import { Temperature, City } from '../types'

const API_URL = process.env.REACT_APP_API_URI

export async function fetchWeather(city: City) {
  return fetch(`${API_URL}/weather?city_id=${city.id}`)
    .then(response => response.json())
    .then(response => ({ ...response } as { temperature: Temperature }))
}
