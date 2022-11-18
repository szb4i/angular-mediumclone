import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from 'src/app/auth/store/actions/getCurrentUser.action';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Injectable()
export class GetCurrentUserEffect {
  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _persistanceService: PersistanceService
  ) {}

  getCurrentUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this._persistanceService.get('accessToken');
        if (!token) {
          return of(getCurrentUserFailureAction());
        }
        return this._authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getCurrentUserFailureAction());
          })
        );
      })
    )
  );
}
