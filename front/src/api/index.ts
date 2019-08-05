import { Temperature, City } from '../types'

const API_URL = 'http://localhost:3001'

export async function fetchWeather(city: City) {
  return fetch(`${API_URL}/weather?city_id=${city.id}`)
    .then(response => response.json())
    .then(response => ({ ...response } as { temperature: Temperature }))
}

export async function fetchCities(term: string) {
  return fetch(`${API_URL}/cities?term=${term}`)
    .then(response => response.json())
    .then(response => ({ ...response } as { cities: City[] }))
}
