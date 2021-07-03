/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectSıgnIn = (state: ApplicationRootState) => state.sigIn || initialState;

const makeSelectUsername = () =>
  createSelector(selectSıgnIn, substate => substate.username);

  const makeSelectPassword= () =>
  createSelector(selectSıgnIn, substate => substate.password);


const makeSelectUser= () =>
  createSelector(selectSıgnIn, substate => substate.user);

const makeSelectLoading=()=>
  createSelector(selectSıgnIn, substate => substate.loading);
  
const makeSelectMessage=()=>
  createSelector(selectSıgnIn, substate => substate.message);


export { selectSıgnIn, makeSelectUsername,makeSelectPassword,makeSelectUser , makeSelectLoading, makeSelectMessage};