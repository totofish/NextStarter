import * as types from '../constants/actionTypes';
import { PROCESS_GLOBAL, PROCESS_ALL } from '../constants/config'


export default function processing(state = [], action) {
  switch (action.type) {
    case types.PROCESSING_START:
      let stateList = [...state]
      stateList.push({
        level: action.level,
        id   : action.id
      })
      return stateList

    case types.PROCESSING_END:
      if(action.level === PROCESS_ALL) return []
      let stateFilter = state.filter((item) => {
        if(item.id !== action.id || item.level !== action.level) return true
        return false
      })
      return stateFilter

    default:
      return state
  }
}
