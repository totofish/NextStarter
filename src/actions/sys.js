import * as types from '../constants/actionTypes'

/*
// 用法規則
sysMessage({
  type   : 'ERROR',         // 自訂標籤，讓接收者各自認領
  message: 'Error Message'  // 內文
})
*/

export const sysMessage = ({ type, ...message }) => {
  return {
    type: types.SYS_MESSAGE,
    info: type ? { type, ...message } : null
  }
}

export const clearSysMessage = () => {
  return {
    type: types.SYS_MESSAGE_CLEAR
  }
}

export const trace = (log) => {
  return {
    type: types.TRACE,
    log
  }
}


export const delay = (millisecond) => {
  return {
    type: types.DELAY,
    millisecond
  }
}
