import * as types from '../constants/actionTypes';

/*
// 用法規則
sysMessage({
  type   : 'ERROR',         // 自訂標籤，讓接收者各自認領
  message: 'Error Message'  // 內文
})
*/

export const sysMessage = ({ type, ...message }) => ({
  type: types.SYS_MESSAGE,
  info: type ? { type, ...message } : null
});

export const clearSysMessage = () => ({
  type: types.SYS_MESSAGE_CLEAR
});

export const trace = log => ({
  type: types.TRACE,
  log
});


export const delay = millisecond => ({
  type: types.DELAY,
  millisecond
});
