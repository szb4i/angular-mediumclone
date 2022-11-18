import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { FeedService } from 'src/app/shared/modules/feed/services/feed.service';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction
} from 'src/app/shared/modules/feed/store/actions/getFeed.action';
import { GetFeedResponseInterface } from 'src/app/shared/modules/feed/types/getFeedResponse.interface';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Injectable()
export class GetFeedEffect {
  constructor(private _actions$: Actions, private _feedService: FeedService) {}

  getFeed$ = createEffect(() =>
    this._actions$.pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {
        return this._feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({ feed });
          }),
          catchError(() => {
            return of(getFeedFailureAction());
          })
        );
      })
    )
  );
}
