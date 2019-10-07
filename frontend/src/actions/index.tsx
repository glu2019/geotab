import * as constants from '../constants'

//define action interfaces
interface SetLoadingAction {
  type: constants.SET_LOADING
  loading: boolean
}

export function setLoading(l: boolean): SetLoadingAction {
  return {
    type: constants.SET_LOADING,
    loading: l,
  }
}

export type LoadAction = SetLoadingAction
