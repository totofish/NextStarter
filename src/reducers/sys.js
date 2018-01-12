import * as types from '../constants/actionTypes';

const initialState = {
  // info : {}
};

export default function sys(state = initialState, action) {
  switch (action.type) {
    case types.SYS_MESSAGE:
      return { ...state, info: action.info };

    case types.SYS_MESSAGE_CLEAR: {
      const stateClone = { ...state };
      delete stateClone.info;
      return stateClone;
    }

    case types.TRACE:
      return { ...state, trace: action.log };

    default:
      return state;
  }
}
