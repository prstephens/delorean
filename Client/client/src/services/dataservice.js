import axios from 'axios'
import * as config from '../config/config.json'

const dataService = store => next => action => {
    next(action)

    const getApi = getApiGenerator(next)
    const baseUrl = config.apiBaseURL

    switch (action.type) {
        case 'GET_IS_TIMEMACHINE_ON':
            getApi(baseUrl + 'ison', 'GET_IS_TIMEMACHINE_ON', 'get')
            break
        case 'POST_TIMEMACHINE_ON':
            getApi(baseUrl + 'on', 'POST_TIMEMACHINE_ON', 'post', 'Wake on Lan Requested')
            break
        case 'POST_TIMEMACHINE_SLEEP':
            getApi(baseUrl + 'sleep', 'POST_TIMEMACHINE_SLEEP', 'post', 'Sleep Requested')
            break
        case 'POST_TIMEMACHINE_RESTART':
            getApi(baseUrl + 'restart', 'POST_TIMEMACHINE_RESTART', 'post', 'Restart Requested')
            break
        case 'POST_TIMEMACHINE_OFF':
            getApi(baseUrl + 'off', 'POST_TIMEMACHINE_OFF', 'post', 'Shutdown Requested')
            break
        default:
            break
    }
}

const getApiGenerator = next => (url, name, method, message = 'Operation Requested') => {
    axios({
        method,
        url,
        headers: { 'Access-Control-Allow-Origin': '*' }
    })
        .then(resp => {
            const data = resp.data
            next({
                type: `${name}_RECEIVED`,
                data,
                snackbarMessage: message
            })
        })
        .catch(error => {
            const apiError = error.toString()
            next({
                type: `${name}_ERROR`,
                dialogErrorMessage : apiError
            })
        })
}

export default dataService