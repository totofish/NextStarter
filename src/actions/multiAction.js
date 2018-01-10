import * as types from '../constants/actionTypes'

/**
 * 依序批次Actions
 * @param  id      批次id,可不傳
 * @param  actions 一個array,內容可以接受function || action
 * @return         Multi Action
 */
export const multiAction = ({ id, actions }) => {
  return {
    type: types.ACTION_STEP_ASYNC,
    id,
    actions
  }
}


/**
 * API Action Cancel
 * @return Object 中斷等待中的API Action
 */
export const multiActionCancel = () => {
  return {
    type: types.ACTION_STEP_CANCEL
  }
}


/**
 * API Action Cancel
 * @return Object 中斷等待中的API Action
 */
export const apiActionCancel = () => {
  return {
    type: types.API_CANCEL
  }
}
