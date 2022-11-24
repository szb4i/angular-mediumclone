import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { PopularTagsService } from 'src/app/shared/modules/popularTags/services/popularTags.service';
import {
  getPopularTagsAction,
  getPopularTagsActionFailure,
  getPopularTagsSuccessAction
} from 'src/app/shared/modules/popularTags/store/action/getPopularTags.action';
import { GetPopularTagsResponseInterface } from 'src/app/shared/modules/popularTags/types/getPopularTagsResponse.interface';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';

@Injectable()
export class GetPopularTagsEffect {
  constructor(
    private _actions$: Actions,
    private _popularTagService: PopularTagsService
  ) {}

  getPopularTags$ = createEffect(() =>
    this._actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this._popularTagService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return getPopularTagsSuccessAction({ popularTags });
          }),
          catchError(() => {
            return of(getPopularTagsActionFailure());
          })
        );
      })
    )
  );
}
