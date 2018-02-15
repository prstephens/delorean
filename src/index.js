import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './index.css';
import AppContainer from './components/App/App'
import { Provider } from 'react-redux'
import store from './store'

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root'));
    
console.log(React.version);
store.dispatch({ type: 'GET_IS_TIMEMACHINE_ON' })