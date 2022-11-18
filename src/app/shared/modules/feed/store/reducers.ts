import { Action, createReducer, on } from '@ngrx/store';

import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction
} from 'src/app/shared/modules/feed/store/actions/getFeed.action';
import { FeedStateInterface } from 'src/app/shared/modules/feed/types/feedState.interface';

const initialState: FeedStateInterface = {
  data: null,
  isLoading: false,
  error: null
};

const feedReducer = createReducer(
  initialState,
  on(
    getFeedAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getFeedSuccessAction,
    (state, action): FeedStateInterface => ({
      ...state,
      isLoading: false,
      data: action.feed
    })
  ),
  on(
    getFeedFailureAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: false
    })
  )
);

export function reducers(state: FeedStateInterface, action: Action) {
  return feedReducer(state, action);
}
