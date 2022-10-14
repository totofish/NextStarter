import { HYDRATE } from 'next-redux-wrapper'
import type { AnyAction } from '@reduxjs/toolkit'

export const extractRehydrationInfo = (
  action: AnyAction,
  { reducerPath }: { reducerPath: string },
  // eslint-disable-next-line consistent-return
) => {
  if (action.type === HYDRATE) {
    /*
    eslint-disable-next-line
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-unsafe-member-access
    */
    return action.payload[reducerPath]
  }
}

export default {
  extractRehydrationInfo,
}
