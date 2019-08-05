export interface Temperature {
  fahrenheit: number
  celsius: number
}

export type TemperatureUnit = 'C' | 'F'

export interface City {
  id: number
  name: string
  state: string
}
