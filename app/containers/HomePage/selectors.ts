/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectHome = (state: ApplicationRootState) => state.home || initialState;
const selectLayout= (state: ApplicationRootState) => state.layout || initialState;

const makeSelectHomeData = () =>
  createSelector(selectHome, substate => substate.homeData);

  const makeSelectLoading=()=>
  createSelector(selectHome, substate => substate.loading);
  
  const makeSelectNotificationCount=()=>
  createSelector(selectLayout, substate => substate.notificationCount);

export { selectHome, makeSelectHomeData,makeSelectLoading ,makeSelectNotificationCount};
