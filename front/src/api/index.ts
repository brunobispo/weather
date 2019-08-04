const API_URL = 'http://localhost:3001'

export async function fetchWeather() {
  return fetch(`${API_URL}/weather`).then(response => response.json())
}
