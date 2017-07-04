import { processingStart, processingEnd, randomRocessId } from '../actions/processing'
import * as sysAction from '../actions/sys'
import { multiAction } from '../actions/multiAction'
import * as types from '../constants/actionTypes'
import config, { PROCESS_GLOBAL, PROCESS_ALL } from '../constants/config'
import appendPromise from '../utils/appendPromise'

/**
 * Get IP API
 * @param  callback  回呼function
 * @return Get IP Action
 */
export const getIP = ({ callback=null, processLevel=PROCESS_GLOBAL, processId=randomRocessId() }={}) => {
  return appendPromise({
    type: types.API_ASYNC,
    option: {
      fullUrl      : config.IP_API,
      method       : 'GET',
      contentType  : 'form',
      body         : { format: 'json' }
    },
    callback,
    processingStart: processingStart(processLevel, processId),
    processingEnd  : processingEnd(processLevel, processId),
    success        : ipResponse
  })
}

const ipResponse = (response) => {
  return sysAction.sysMessage({
    type   : 'IP',
    message: response.ip
  })

  // let animation = []
  // for(let i=0, j = response.ip.length; i < j; i++) {
  //   animation.push(
  //     sysAction.delay(50),
  //     sysAction.sysMessage({
  //       type   : types.TRACK,
  //       message: response.ip.substr(0, i)
  //     })
  //   )
  // }
  // return multiAction({
  //   actions: animation
  // })
}