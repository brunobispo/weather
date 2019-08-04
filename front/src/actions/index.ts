import { ThunkAction } from 'redux-thunk'
import { AppState } from '../store'

import { fetchWeather } from '../api'

export enum WeatherActionTypes {
  REQUEST_WEATHER = 'REQUEST_WEATHER',
  RECEIVE_WEATHER = 'RECEIVE_WEATHER'
}

export interface WeatherAction {
  type: WeatherActionTypes
  weather?: {
    temperature: number
  }
}

export function requestWeather(): ThunkAction<
  void,
  AppState,
  null,
  WeatherAction
> {
  return async dispatch => {
    dispatch({ type: WeatherActionTypes.REQUEST_WEATHER })
    dispatch({
      type: WeatherActionTypes.RECEIVE_WEATHER,
      weather: await fetchWeather()
    })
  }
}
