/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import ActionTypes from './constants'

import request from 'utils/request';
import { getHomeData, loadHomeData } from './actions';
import axios from 'axios';
import { GET_PRODUCT_URL } from 'containers/App/constanst';


/**
 * Github repos request/response handler
 */
export function* getHome() {
  // Select username from store


  try {
    // Call our request helper (see 'utils/request')
    let url: string = GET_PRODUCT_URL;
    //  yield put(getHomeData(response));

    const apiCall = () =>
      axios
        .get(url)
        .then(response => {
          var data = response.data.result;
          return data;
        })
        .catch(function (error: string) {
          console.log(error);
          throw error;
        });

    try {
      var response = yield call(apiCall);

      console.log(response);


      yield put(getHomeData(response));

    } catch (ex) {
      throw ex;
    }

  } catch (err) {
   
  }

}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield takeEvery(ActionTypes.LOAD_HOME_DATA, getHome);

}
