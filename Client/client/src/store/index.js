import { createStore, applyMiddleware, compose  } from 'redux';
import { reducers } from '../reducers'
import dataService from '../services/dataservice'

const initialState = {}
const composeEnhancers = process.env.NODE_ENV=='development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose

const store = createStore(reducers, initialState, composeEnhancers(
    applyMiddleware(dataService)
  ));
  
export default store;