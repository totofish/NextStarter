import { processingStart, processingEnd, randomRocessId } from '../actions/processing';
import * as sysAction from '../actions/sys';
import { multiAction } from '../actions/multiAction';
import * as types from '../constants/actionTypes';
import { PROCESS_GLOBAL } from '../constants/config';
import appendPromise from '../utility/appendPromise';


export const getUTCDateResponse = (response) => {
  // 擷取Response Headers中的Date資訊，藉此抓取server時間
  const UTC = new Date(response.headers.get('date')).toString();
  const animation = [];
  let s = 80;
  for (let i = 0, j = UTC.length; i <= j; i += 1) {
    s -= 2;
    animation.push(
      sysAction.delay(s),
      sysAction.sysMessage({
        type: types.TRACK,
        message: UTC.substr(0, i)
      })
    );
  }

  // 直接回 Action
  return multiAction({
    actions: animation
  });

  // 或回一個 Promise
  // return response.blob().then(() => multiAction({
  //   actions: animation
  // }), () => {
  //   console.log('error');
  // });
};

/**
 * 取得Server時間
 * @param  function callback
 */
export const getUTCDate = ({
  processingLevel = PROCESS_GLOBAL, callback = null, processId = randomRocessId()
} = {}) => appendPromise({
  type: types.FETCH_ASYNC,
  url: document.location,
  options: {},
  processingStart: processingStart(processingLevel, processId),
  processingEnd: processingEnd(processingLevel, processId),
  success: getUTCDateResponse,
  callback
});
