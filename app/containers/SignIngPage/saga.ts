/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';


import request from 'utils/request';
import { makeSelectUsername } from './selectors';
import { makeSelectPassword } from './selectors';
import axios from 'axios';
import { loadUser, userNotFound } from './actions';
import { useDispatch } from 'react-redux';
import ActionTypes from './constants';
import { User } from './types';
import { POST_LOGIN_URL } from 'containers/App/constanst';
/**
 * Github repos request/response handler
 */
export function* signIn() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const password = yield select(makeSelectPassword());
  console.log(username, password);

     
  const apiCall = () => axios.post(POST_LOGIN_URL, {
    username: username,
    password: password
  })
  .then(response => {

    return response.data;
  })
  .catch(function (error) {
    throw error;
  });

  try {
   
    var response =  yield call(apiCall);

    console.log(response);
    if(response.isSuccess){
      response = response.result;
          let user:User ={ userId:response.userId,
            userName:response.userName  
    };
    /*localStorage.setItem('token', user.token);
    localStorage.setItem('storeId', user.storeId.toString());*/

    localStorage.setItem('userId', user.userId.toString());
    localStorage.setItem('userName', user.userName.toString());
    
    yield put(loadUser(user));
 
    }
    else{
 
      yield put(userNotFound("Kullanıcı Adı Veya Şifre Bulunamadı. Lütfen Tekrar Deneyiniz."));
    }
  
  } catch (err) {
    //yield put(loadUser(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sigInAction() {

  yield takeLatest(ActionTypes.SING_IN, signIn);
}
