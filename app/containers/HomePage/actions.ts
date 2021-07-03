import { action } from 'typesafe-actions';
// import { } from './types';

import ActionTypes from './constants';

export const loadHomeData= () =>
action(ActionTypes.LOAD_HOME_DATA);



export const getHomeData=(data: any)=>
action(ActionTypes.GET_HOME, data);

