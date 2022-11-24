import { Action, createReducer, on } from '@ngrx/store';
import {
  getPopularTagsAction,
  getPopularTagsActionFailure,
  getPopularTagsSuccessAction
} from 'src/app/shared/modules/popularTags/store/action/getPopularTags.action';
import { PopularTagsStateInterface } from 'src/app/shared/modules/popularTags/types/popularTagsState.interface';

const initialState: PopularTagsStateInterface = {
  data: null,
  isLoading: false,
  error: null
};

const popularTagsReducer = createReducer(
  initialState,
  on(getPopularTagsAction, (state) => ({
    ...state,
    isLoading: true
  })),
  on(getPopularTagsSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.popularTags
  })),
  on(getPopularTagsActionFailure, (state) => ({
    ...state,
    isLoading: false
  }))
);

export function reducers(state: PopularTagsStateInterface, action: Action) {
  return popularTagsReducer(state, action);
}
