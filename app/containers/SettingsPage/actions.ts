import { action } from 'typesafe-actions';
// import { } from './types';

import ActionTypes from './constants';



export const changeProductId = (productId: number) =>
action(ActionTypes.CHANGE_PRODUCT_ID, productId);

export const getProductDetail=(data: any)=>
action(ActionTypes.GET_PRODUCT_DETAIL, data);


export const loadProductDetailData = () => action(ActionTypes.LOAD_PRODUCT_DETAİL);

