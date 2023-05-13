import { Action, createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersError, loadUsersSuccess } from '../actions';
import { User } from '../../models/user.model';

export interface UsersState {
  users: User[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const usersInitialState: UsersState = {
  users: [],
  loaded: false,
  loading: false,
  error: null,
};

const _usersReducer = createReducer(
  usersInitialState,

  on(loadUsers, (state) => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    loaded: true,
    users: [...users],
  })),
  on(loadUsersError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function usersReducer(state: any, action: any) {
  return _usersReducer(state, action);
}
