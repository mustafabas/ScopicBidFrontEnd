import { action } from 'typesafe-actions';
// import { } from './types';

import ActionTypes from './constants';
import { User } from './types';

export const changeUsername = (name: string) =>
  action(ActionTypes.CHANGE_USERNAME, name);
 
  export const changePassword = (name: string) =>
  action(ActionTypes.CHANGE_PASSWORD, name);

  export const signIn = () => action(ActionTypes.SING_IN);
  
  export const loadUser = (data: User) =>
    action(ActionTypes.LOAD_USER, data);



export const userNotFound=(message:string)=>action(ActionTypes.USER_NOT_FOUND, message);