import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';


export const initialState: ContainerState = {
  homeData: null,
  loading:false
};

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
