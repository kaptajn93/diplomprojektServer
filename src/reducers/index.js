import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import api from './api'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  api
})

export default todoApp
