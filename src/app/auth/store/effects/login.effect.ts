import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction
} from 'src/app/auth/store/actions/login.action';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Injectable()
export class LoginEffect {
  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _persistanceService: PersistanceService,
    private _router: Router
  ) {}

  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this._authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this._persistanceService.set('accessToken', currentUser.token);
            return loginSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              loginFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this._router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}
