import { Action, createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersError, loadUsersSuccess } from '../actions';

export interface UsersState {
    users: [],
    loaded: boolean,
    loading: boolean,
    error: any 
}

export const usersInitialState: UsersState = {
   users: [],
   loaded: false,
   loading: false,
   error: null
}

const _usersReducer = createReducer(usersInitialState,

    on(loadUsers, state => ({ ...state, loading: true })),
    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        loading: false,
        loaded: true,
        ...users
    })),
    on(loadUsersError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))

);

export function usersReducer(state: UsersState, action: Action) {
    return _usersReducer(state, action);
}