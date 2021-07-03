import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

// The initial state of the App
export const initialState: ContainerState = {
  homeData: null,
  loading:false
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function homeReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.GET_HOME: 
    return {
        homeData: action.payload,
        loading:false
      };

    default:
      return state;
  }
}

export default homeReducer;
