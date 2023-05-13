import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { loadUser, loadUserError, loadUserSuccess } from '../actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      //   tap((data) => console.log('effect tap: ', data)),
      mergeMap((action) =>
        this.userService.getUserById(action.id).pipe(
          // tap((data) => console.log('getUsers Effect: ', data))
          map((user) => loadUserSuccess({ user })),
          catchError((error) => of(loadUserError({ payload: error })))
        )
      )
    )
  );
}
