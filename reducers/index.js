import { combineReducers } from 'redux'
import sys from './sys'
import processing from './processing'


export default combineReducers({
  sys,
  processing
})
