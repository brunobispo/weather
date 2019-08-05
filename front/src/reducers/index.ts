import { combineReducers } from 'redux'

import weather from './weather'
import cities from './cities'
import user from './user'

export default combineReducers({
  weather,
  cities,
  user
})


