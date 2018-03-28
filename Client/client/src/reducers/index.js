import { combineReducers } from 'redux'

const initialState = { openSnackbar: false, snackbarMessage: '', isOn: false, dialogErrorMessage: null }

const delorean = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'POST_TIMEMACHINE_ON_RECEIVED':
    case 'POST_TIMEMACHINE_OFF_RECEIVED':
    case 'POST_TIMEMACHINE_RESTART_RECEIVED':
    case 'POST_TIMEMACHINE_SLEEP_RECEIVED':
      return {
        ...state,
        openSnackbar: true,
        snackbarMessage: action.snackbarMessage
      }
    case 'CLOSE_SNACKBAR':
      return {
        ...state,
        openSnackbar: false,
        snackbarMessage: ''
      }
    case 'CLOSE_DIALOG':
      return {
        ...state,
        dialogErrorMessage: null
      }
    case 'GET_IS_TIMEMACHINE_ON_RECEIVED':
      return {
        ...state,
        isOn: action.data.ison
      }
    case 'GET_IS_TIMEMACHINE_ON_ERROR':
    case 'POST_TIMEMACHINE_ON_ERROR':
    case 'POST_TIMEMACHINE_ON_SLEEP':
    case 'POST_TIMEMACHINE_OFF_ERROR':
      return {
        ...state,
        dialogErrorMessage: action.dialogErrorMessage
      }
    default:
      return state
  }
}

export const reducers = combineReducers({
  delorean
})

