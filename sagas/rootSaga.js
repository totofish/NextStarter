import { all } from 'redux-saga/effects'
import { watchApiAsync, watchStepActionAsync } from './watchs'
import { watchFetchAPI } from './watchFetchAPI'

export default function* rootSaga() {
  yield all([
    watchApiAsync(),
    watchStepActionAsync(),
    watchFetchAPI()
  ])
}