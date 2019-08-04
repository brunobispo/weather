import { combineReducers } from 'redux'
import { WeatherAction, WeatherActionTypes } from '../actions'

interface WeatherState {
  temperature: number | null
}

const initialState: WeatherState = {
  temperature: null
}

function weather(
  state: WeatherState = initialState,
  action: WeatherAction
): WeatherState {
  switch (action.type) {
    case WeatherActionTypes.RECEIVE_WEATHER:
      if (action.type === WeatherActionTypes.RECEIVE_WEATHER)
        return { ...state, ...action.weather! }
  }

  return state
}

export default combineReducers({
  weather
})
