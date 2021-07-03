
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import ActionTypes from './constants'

import request from 'utils/request';
import { getHomeData, loadHomeData } from './actions';
import axios from 'axios';
import { GET_PRODUCT_URL } from 'containers/App/constanst';



export function* getHome() {


  try {
    let url: string = GET_PRODUCT_URL;

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


export default function* getProductToHome() {


  yield takeEvery(ActionTypes.LOAD_HOME_DATA, getHome);

}
