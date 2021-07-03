/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';

import signInReducer from './containers/SignIngPage/reducer';

import productDetailReducer from  './containers/ProductDetail/reducer';
import homeReducer from 'containers/HomePage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    signIn : signInReducer,
    home:homeReducer,
    productDetail:productDetailReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}