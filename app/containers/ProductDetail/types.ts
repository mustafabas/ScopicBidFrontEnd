
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */

interface ProductDetailState {
  readonly productDetail: any;
  readonly productId:number;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = ProductDetailState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };
