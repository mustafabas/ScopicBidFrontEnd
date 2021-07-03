import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */

interface User{
  userId: number;
  userName: string;
}

interface SigInState {
  readonly username: string;
  readonly password:string;
  readonly loading:boolean;
  readonly message:string;
  readonly user: User;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = SigInState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions, User };
