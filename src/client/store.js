import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import reduxActionsLogger from './logger';

const initialState = {};

const middlewares = [thunk];

// dev debug
if (module.hot) {
  middlewares.push(reduxActionsLogger);
}

export default createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
