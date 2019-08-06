import { City } from '../types'

const API_URL = process.env.REACT_APP_API_URI

export async function fetchCities(term: string) {
  return fetch(`${API_URL}/cities?term=${term}`)
    .then(response => response.json())
    .then(response => ({ ...response } as { cities: City[] }))
}

export async function addUserCity(city: City) {
  const token = localStorage.getItem('token')!

  return fetch(`${API_URL}/user_cities`, {
    method: 'POST',
    body: JSON.stringify({ city_id: city.id }),
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(response => response as City)
}
