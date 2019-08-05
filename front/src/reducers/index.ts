import { combineReducers } from 'redux'

import weather from './weather'
import cities from './cities'

export default combineReducers({
  weather,
  cities
})


