/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import ActionTypes from './constants'


import axios from 'axios';
import {GET_PRODUCT_DETAIL_URL, GET_PRODUCT_URL } from 'containers/App/constanst';
import { makeSelectProductId } from './selectors';
import { getProductDetail } from './actions';

/**
 * Github repos request/response handler
 */
export function* getProductDetailSaga() {
  // Select username from store
  const productId = yield select(makeSelectProductId());



  try {
    // Call our request helper (see 'utils/request')
    let url: string = GET_PRODUCT_DETAIL_URL+productId;
    //  yield put(getHomeData(response));

    const apiCall = () =>
      axios
        .get(url)
        .then(response => {
          var data = response.data.result;
          console.log(data,"data");
          return data;
        })
        .catch(function (error: string) {
          console.log(error);
          throw error;
        });

    try {
      var response = yield call(apiCall);

      yield put(getProductDetail(response));

    } catch (ex) {
      console.log(ex);
      throw ex;
    }

  } catch (err) {
    yield put(repoLoadingError(err));
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

  yield takeEvery(ActionTypes.LOAD_PRODUCT_DETAİL, getProductDetailSaga);

}
