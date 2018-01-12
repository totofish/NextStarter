import { processingStart, processingEnd, randomRocessId } from '../actions/processing';
import * as sysAction from '../actions/sys';
import * as types from '../constants/actionTypes';
import config, { PROCESS_GLOBAL } from '../constants/config';
import appendPromise from '../utility/appendPromise';


const ipResponse = response => sysAction.sysMessage({
  type: 'IP',
  message: response.ip
});

/**
 * Get IP API
 * @param  callback  回呼function
 * @return Get IP Action
 */
const getIP = ({
  callback = null, processLevel = PROCESS_GLOBAL, processId = randomRocessId()
} = {}) => appendPromise({
  type: types.API_ASYNC,
  option: {
    fullUrl: config.IP_API,
    method: 'GET',
    contentType: 'form',
    body: { format: 'json' }
  },
  callback,
  processingStart: processingStart(processLevel, processId),
  processingEnd: processingEnd(processLevel, processId),
  success: ipResponse
});

exports.getIP = getIP;
