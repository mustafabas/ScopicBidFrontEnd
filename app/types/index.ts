import { Reducer, Store } from 'redux';
import { RouterState } from 'connected-react-router';
import { Saga } from 'redux-saga';
import { SagaInjectionModes } from 'redux-injectors';
import { ContainerState as HomeState } from 'containers/HomePage/types';
import { ContainerState as SigInState } from 'containers/SignIngPage/types';
import {ContainerState as ProductDetailState } from 'containers/ProductDetail/types';

export interface InjectedStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: Saga<any[]> | undefined, args: any | undefined): any;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: Saga;
  mode?: SagaInjectionModes;
}

export interface IResponseModel<T>{
  isSuccess: boolean;
  message:string;
  result: T;
  statusCode: number;
}
export interface ApplicationRootState {
  readonly router: RouterState;
  readonly sigIn  : SigInState;
  readonly productDetail : ProductDetailState;
  readonly homeData:HomeState;
  readonly test: any;
}
