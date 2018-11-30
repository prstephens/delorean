import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))

registerServiceWorker()

store.dispatch({ type: 'GET_IS_DNSSET' })
store.dispatch({ type: 'GET_IS_TIMEMACHINE_ON' })