import { combineReducers } from 'redux'

import { WeatherAction, WeatherActionTypes } from '../actions'
import { Temperature, TemperatureUnit } from '../types'

interface WeatherState {
  temperature: Temperature | null
  unit: TemperatureUnit
}

const initialState: WeatherState = {
  temperature: null,
  unit: 'F'
}

function weather(
  state: WeatherState = initialState,
  action: WeatherAction
): WeatherState {
  switch (action.type) {
    case WeatherActionTypes.RECEIVE_WEATHER:
      return { ...state, temperature: action.weather.temperature }
    case WeatherActionTypes.CHANGE_UNIT:
      return { ...state, unit: action.unit }
  }

  return state
}

export default combineReducers({
  weather
})
