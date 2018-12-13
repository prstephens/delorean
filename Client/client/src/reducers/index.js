import { combineReducers } from 'redux'

const initialState = { openSnackbar: false, snackbarMessage: '', isOn: false, dialogTitle: 'Title', dialogMessage: null, loading: true }

const delorean = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'POST_TIMEMACHINE_ON_RECEIVED':
    case 'POST_TIMEMACHINE_OFF_RECEIVED':
    case 'POST_TIMEMACHINE_RESTART_RECEIVED':
    case 'POST_TIMEMACHINE_SLEEP_RECEIVED':
    case 'POST_TIMEMACHINE_SETDNS_RECEIVED':
    case 'POST_TIMEMACHINE_RESETDNS_RECEIVED':
      return {
        ...state,
        openSnackbar: true,
        snackbarMessage: action.snackbarMessage,
        loading: action.loading
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
        dialogMessage: null
      }
    case 'GET_IS_TIMEMACHINE_ON_RECEIVED':
      return {
        ...state,
        isOn: action.data.ison,
        loading: action.loading
      }
    case 'GET_IS_DNSSET_RECEIVED':
      return {
        ...state,
        isDnsSet: action.data.isdnsset,
        loading: action.loading
      }
    case 'GET_IS_TIMEMACHINE_ON_ERROR':
    case 'GET_IS_DNSSET_ERROR':
    case 'POST_TIMEMACHINE_ON_ERROR':
    case 'POST_TIMEMACHINE_ON_SLEEP':
    case 'POST_TIMEMACHINE_OFF_ERROR':
    case 'POST_TIMEMACHINE_SETDNS_ERROR':
    case 'POST_TIMEMACHINE_RESETDNS_ERROR':
    case 'GET_IS_DNSSET_ERROR':
    case 'NEW_VERSION':
      return {
        ...state,
        dialogTitle: action.dialogTitle,
        dialogMessage: action.dialogMessage,
        loading: action.loading
      }
    default:
      return state
  }
}

export const reducers = combineReducers({
  delorean
})

