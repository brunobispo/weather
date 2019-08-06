import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { AppState } from '../store'

import { City } from '../types'
import { fetchCities, addUserCity as requestAddUserCity } from '../services'
import { requestWeather } from './weather'

export enum CitiesActionTypes {
  START_EDITING_CITY = 'START_EDITING_CITY',
  STOP_EDITING_CITY = 'STOP_EDITING_CITY',
  REQUEST_SEARCH_CITY = 'REQUEST_SEARCH_CITY',
  RECEIVE_SEARCH_CITY = 'RECEIVE_SEARCH_CITY',
  SELECT_CITY = 'SELECT_CITY',
  REQUEST_ADD_USER_CITY = 'REQUEST_ADD_USER_CITY',
  RECEIVE_ADD_USER_CITY = 'RECEIVE_ADD_USER_CITY'
}

export interface RequestSearchCityAction {
  type: CitiesActionTypes.REQUEST_SEARCH_CITY
  term: string
}

export interface ReceiveSearchCityAction {
  type: CitiesActionTypes.RECEIVE_SEARCH_CITY
  term: string
  cities: City[]
}

export interface SelectCityAction {
  type: CitiesActionTypes.SELECT_CITY
  city: City
}

export interface RequestAddUserCityAction {
  type: CitiesActionTypes.REQUEST_ADD_USER_CITY
  city: City
}

export interface ReceiveAddUserCityAction {
  type: CitiesActionTypes.RECEIVE_ADD_USER_CITY
  city: City
}

export type CitiesAction =
  | ReceiveSearchCityAction
  | RequestSearchCityAction
  | SelectCityAction
  | RequestAddUserCityAction
  | ReceiveAddUserCityAction
  | Action<CitiesActionTypes.START_EDITING_CITY>
  | Action<CitiesActionTypes.STOP_EDITING_CITY>

export function startEditingCity() {
  return { type: CitiesActionTypes.START_EDITING_CITY }
}

export function stopEditingCity() {
  return { type: CitiesActionTypes.STOP_EDITING_CITY }
}

export function selectCity(
  city: City
): ThunkAction<void, AppState, null, SelectCityAction> {
  return async dispatch => {
    dispatch({ type: CitiesActionTypes.SELECT_CITY, city })
    dispatch(requestWeather())
  }
}

export function searchCities(
  term: string
): ThunkAction<
  void,
  AppState,
  null,
  ReceiveSearchCityAction | RequestSearchCityAction
> {
  return async dispatch => {
    dispatch({ type: CitiesActionTypes.REQUEST_SEARCH_CITY, term })
    dispatch({
      type: CitiesActionTypes.RECEIVE_SEARCH_CITY,
      term,
      ...(await fetchCities(term))
    })
  }
}

export function addUserCity(
  city: City
): ThunkAction<
  void,
  AppState,
  null,
  RequestAddUserCityAction | ReceiveAddUserCityAction
> {
  return async (dispatch, getStore) => {
    const store = getStore()
    if (
      store.user.logged &&
      !store.cities.userCities.map(city => city.id).includes(city.id)
    ) {
      dispatch({ type: CitiesActionTypes.REQUEST_ADD_USER_CITY, city })
      dispatch({
        type: CitiesActionTypes.RECEIVE_ADD_USER_CITY,
        city: await requestAddUserCity(city)
      })
    }
  }
}
