import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { AppState } from '../store'

import { Temperature, TemperatureUnit, City } from '../types'
import { fetchWeather } from '../services'

export enum WeatherActionTypes {
  REQUEST_WEATHER = 'REQUEST_WEATHER',
  RECEIVE_WEATHER = 'RECEIVE_WEATHER',
  CHANGE_UNIT = 'CHANGE_UNIT'
}

export interface ReceiveWeatherAction {
  type: WeatherActionTypes.RECEIVE_WEATHER
  weather: { temperature: Temperature }
}

export interface ChangeUnitAction {
  type: WeatherActionTypes.CHANGE_UNIT
  unit: TemperatureUnit
}

export type WeatherAction =
  | ReceiveWeatherAction
  | Action<WeatherActionTypes.REQUEST_WEATHER>
  | ChangeUnitAction

export function requestWeather(city?: City): ThunkAction<
  void,
  AppState,
  null,
  ReceiveWeatherAction | Action<WeatherActionTypes.REQUEST_WEATHER>
>
 {
  return async (dispatch, getState) => {
    dispatch({ type: WeatherActionTypes.REQUEST_WEATHER })
    dispatch({
      type: WeatherActionTypes.RECEIVE_WEATHER,
      weather: await fetchWeather(getState().cities.selected)
    })
  }
}

export function changeUnit(unit: TemperatureUnit): ChangeUnitAction {
  return {
    type: WeatherActionTypes.CHANGE_UNIT,
    unit
  }
}
