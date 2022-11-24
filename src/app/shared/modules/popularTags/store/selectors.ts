import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FeedStateInterface } from 'src/app/shared/modules/feed/types/feedState.interface';
import { PopularTagsStateInterface } from 'src/app/shared/modules/popularTags/types/popularTagsState.interface';

export const popularTagsFeatureSelector =
  createFeatureSelector<PopularTagsStateInterface>('popularTags');

export const isLoadingSelector = createSelector(
  popularTagsFeatureSelector,
  (feedState: PopularTagsStateInterface) => feedState.isLoading
);

export const errorSelector = createSelector(
  popularTagsFeatureSelector,
  (feedState: PopularTagsStateInterface) => feedState.error
);

export const popularTagsSelector = createSelector(
  popularTagsFeatureSelector,
  (feedState: PopularTagsStateInterface) => feedState.data
);
