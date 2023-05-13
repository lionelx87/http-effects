import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUsers, loadUsersError, loadUsersSuccess } from '../actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      tap((data) => console.log('effect tap: ', data)),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          // tap((data) => console.log('getUsers Effect: ', data))
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersError({ payload: error })))
        )
      )
    )
  );
}
