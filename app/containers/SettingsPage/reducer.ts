import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

// The initial state of the App
export const initialState: ContainerState = {
  productDetail: null,
  productId:0
};

function productDetailReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.CHANGE_PRODUCT_ID:
      return {
        ...state,
        productId: action.payload,
  
      };
      case ActionTypes.GET_PRODUCT_DETAIL:
        return {
          ...state,
          productDetail: action.payload,
        };
    default:
      return state;
  }
}

export default productDetailReducer;
