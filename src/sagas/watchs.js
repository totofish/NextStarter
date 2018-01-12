import { delay } from 'redux-saga';
import { call, put, fork, take, cancel, takeEvery } from 'redux-saga/effects';
import jsonp from 'jsonp';
import { sysMessage } from '../actions/sys';
import { FetchException } from '../constants/config';
import encodeQueryData, { getUrlQuery } from '../utility/encodeQueryData';
import * as types from '../constants/actionTypes';


async function fetchAPI(url, options) {
  const response = await fetch(url, options);
  if (response.status < 200 || response.status > 399) {
    throw new Error(response.status);
  }
  const json = await response.json();
  return json;
}

function api({
  fullUrl, contentType, Authorization, method = 'GET', body = {}
}) {
  let $fullUrl;
  let $method = method.toLocaleUpperCase();
  const $contentType = contentType.toLocaleUpperCase();
  if ($contentType === 'JSONP') $method = 'GET';
  if ($method === 'GET') {
    const urls = fullUrl.split('?');
    const query = encodeQueryData({ ...getUrlQuery(urls[1] || ''), ...body });
    $fullUrl = `${urls[0]}${query ? `?${query}` : ''}`;
  }
  if ($contentType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp($fullUrl, {}, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
  const headers = { 'Content-Type': $contentType === 'JSON' ? 'application/json' : 'application/x-www-form-urlencoded;charset=utf-8' };
  const $body = $contentType === 'JSON' ? JSON.stringify(body) : encodeQueryData(body);
  if (Authorization) headers.Authorization = Authorization;
  return fetchAPI($fullUrl, {
    method: $method,
    headers,
    body: $method === 'GET' ? undefined : $body,
  });
}

function* sendAPI(action) {
  try {
    // 正常程序
    if (action.processingStart) yield put(action.processingStart);
    const response = yield call(api, action.option);
    if (action.success) {
      const next = action.success(response);
      if (next) yield put(next);
    }
    if (typeof action.processingEnd === 'object') yield put(action.processingEnd);
    if (typeof action.callback === 'function') action.callback.call(null, response);
    if (typeof action.Promise === 'object' && typeof action.Promise.then === 'function') action.resolve(response);
  } catch (error) {
    // 失敗程序
    // 如有自訂Error在這邊檢視
    // console.info(error.name, error.message)
    switch (error.message) {
      case '401':
        yield put(sysMessage({
          type: types.FAILED_FETCH,
          message: 'Unauthorized',
        }));
        break;
      case '408':
        yield put(sysMessage({
          type: types.FAILED_FETCH,
          message: 'Request Timeout',
        }));
        break;
      case '404':
        yield put(sysMessage({
          type: types.FAILED_FETCH,
          message: 'Server Not Found',
        }));
        break;
      default:
        yield put(sysMessage({
          type: types.FAILED_FETCH,
          message: FetchException,
        }));
    }
    try {
      if (typeof action.processingEnd === 'object') yield put(action.processingEnd);
      if (typeof action.Promise === 'object' && typeof action.Promise.then === 'function') action.reject(error);
      // if (typeof action.callback === 'function') action.callback.call(null, error);
    } catch (e) {
      // continue regardless of error
    }
  }
}

// Single API
export function* apiFlow(action) {
  const task = yield fork(sendAPI, action);
  yield take(types.API_CANCEL);
  yield cancel(task);
  // 清除processing狀態
  if (typeof action.processingEnd === 'object') yield put(action.processingEnd);
}

// Multi Step
function* multiFlow(action) {
  for (let i = 0, j = action.actions.length; i < j; i += 1) {
    try {
      const actionStep = action.actions[i];
      if (typeof actionStep === 'object') {
        if (actionStep.type === types.API_ASYNC) {
          yield call(sendAPI, actionStep); // api 異步處理
        } else if (actionStep.type === types.DELAY) { // 暫停
          yield call(delay, actionStep.millisecond);
        } else {
          yield put(actionStep); // 一般 action 呼叫
        }
      } else if (typeof actionStep === 'function') {
        actionStep.call();
      }
    } catch (error) {
      yield put(sysMessage({
        type: types.ACTION_STEP_ERROR,
        message: error,
      }));
    }
  }
  // yield put({ type: types.ACTION_STEP_END, id:action.id }) // 多筆呼叫結束
}

export function* MultiActionFlow(action) {
  const task = yield fork(multiFlow, action);
  yield take(types.ACTION_STEP_CANCEL);
  yield cancel(task);
  // 清除所有action的processing狀態
  for (let i = 0, j = action.actions.length; i < j; i += 1) {
    const actionStep = action.actions[i];
    if (typeof actionStep === 'object') {
      if (actionStep.type === types.API_ASYNC) {
        if (typeof actionStep.processingEnd === 'object') yield put(actionStep.processingEnd);
      } else if (actionStep.type === types.PROCESSING_END) {
        yield put(actionStep);
      }
    }
  }
}


/////////////////////////////////////
// 監控單筆API事件
/////////////////////////////////////
export function* watchApiAsync() {
  yield takeEvery(types.API_ASYNC, apiFlow);
}

/////////////////////////////////////
// 監控逐步多筆Action事件
/////////////////////////////////////
export function* watchStepActionAsync() {
  yield takeEvery(types.ACTION_STEP_ASYNC, MultiActionFlow);
}
