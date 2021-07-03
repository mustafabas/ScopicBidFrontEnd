import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

// The initial state of the App
export const initialState: ContainerState = {
  username: '',
  password:'',
  user:{} as any,
  loading:false,
  message : ''
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function signInReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.CHANGE_USERNAME:
      return {
        ...state,
        username: action.payload,
  
      };
      case ActionTypes.CHANGE_PASSWORD:
        return {
          ...state,
          password: action.payload,
   
        };
        case ActionTypes.LOAD_USER:
        return {
          ...state,
          user:action.payload,
        }
        case ActionTypes.USER_NOT_FOUND:
          return {
            ...state,
            message:action.payload
          }
    default:
      return state;
  }
}

export default signInReducer;
