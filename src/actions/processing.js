import * as types from '../constants/actionTypes';
import { PROCESS_GLOBAL } from '../constants/config';
import { s4 } from '../utility/guid';

export function randomRocessId() {
  return `${Date.now()}-${s4()}${s4()}`;
}

/**
 * 開始Processing狀態
 * @param  level  廣播特定層級的Processing，預設'global'
 * @param  id
 * @return Processing Start Action
 */
export const processingStart = (level = PROCESS_GLOBAL, id = '#') => {
  if (!level) return false;
  return {
    type: types.PROCESSING_START,
    level,
    id
  };
};

/**
 * 停止Processing狀態
 * @param  level  廣播特定層級的Processing，預設'global','all'=停止所有層級Processing
 * @param  id
 * @return Processing End Action
 */
export const processingEnd = (level = PROCESS_GLOBAL, id = '#') => {
  if (!level) return false;
  return {
    type: types.PROCESSING_END,
    level,
    id
  };
};
