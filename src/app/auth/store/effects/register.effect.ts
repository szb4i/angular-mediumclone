import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction
} from 'src/app/auth/store/actions/register.actions';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Injectable()
export class RegisterEffect {
  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _persistanceService: PersistanceService,
    private _router: Router
  ) {}

  register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this._authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this._persistanceService.set('accessToken', currentUser.token);
            return registerSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this._router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}
