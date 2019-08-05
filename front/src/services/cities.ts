import { City } from '../types'

const API_URL = process.env.REACT_APP_API_URI

export async function fetchCities(term: string) {
  return fetch(`${API_URL}/cities?term=${term}`)
    .then(response => response.json())
    .then(response => ({ ...response } as { cities: City[] }))
}
