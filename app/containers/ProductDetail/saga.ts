/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import ActionTypes from './constants';
import axios from 'axios';
import { makeSelectProductId } from './selectors';
import { getProductDetail } from './actions';
import { GET_PRODUCT_DETAIL_URL } from 'containers/App/constanst';

/**
 * Github repos request/response handler
 */
export function* getProductDetailSaga() {
  // Select username from store
  const productId = yield select(makeSelectProductId());



  try {

    let url: string = GET_PRODUCT_DETAIL_URL+productId;

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



}
}

export default function* productDetailData() {
  yield takeEvery(ActionTypes.LOAD_PRODUCT_DETAİL, getProductDetailSaga);

}
