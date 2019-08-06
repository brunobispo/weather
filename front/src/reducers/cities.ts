import { CitiesAction, CitiesActionTypes } from '../actions'
import { City } from '../types'

interface CitiesState {
  editing: boolean
  selected: City
  searchTerm: string | null
  searchCities: City[] | null
  loading: boolean
}

const initialState: CitiesState = {
  editing: false,
  selected: {
    id: 4932,
    name: 'São Paulo',
    state: 'SP'
  },
  searchTerm: null,
  searchCities: null,
  loading: false
}

export default function cities(
  state: CitiesState = initialState,
  action: CitiesAction
): CitiesState {
  console.log(action)
  switch (action.type) {
    case CitiesActionTypes.REQUEST_SEARCH_CITY:
      return { ...state, searchTerm: action.term }

    case CitiesActionTypes.RECEIVE_SEARCH_CITY:
      if (state.searchTerm === action.term)
        return {
          ...state,
          loading: state.searchTerm === action.term,
          searchCities: action.cities
        }
      break

    case CitiesActionTypes.START_EDITING_CITY:
      return { ...state, loading: true, editing: true }

    case CitiesActionTypes.STOP_EDITING_CITY:
      return {
        ...state,
        loading: false,
        editing: false,
        searchTerm: null,
        searchCities: null
      }

    case CitiesActionTypes.SELECT_CITY:
      return {
        ...state,
        selected: action.city,
        editing: false,
        loading: false,
        searchTerm: null,
        searchCities: null
      }
  }

  return state
}
