/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const productDetail = (state: ApplicationRootState) => state.productDetail || initialState;

const makeSelectProductDetailData = () =>
  createSelector(productDetail, substate => substate.productDetail);

  const makeSelectProductId = () =>
  createSelector(productDetail, substate => substate.productId);

export { productDetail, makeSelectProductDetailData, makeSelectProductId};
