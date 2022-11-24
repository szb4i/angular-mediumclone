import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPopularTagsAction } from 'src/app/shared/modules/popularTags/store/action/getPopularTags.action';
import {
  errorSelector,
  isLoadingSelector,
  popularTagsSelector
} from 'src/app/shared/modules/popularTags/store/selectors';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  styleUrls: ['./popularTags.component.scss']
})
export class PopularTagsComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  popularTags$!: Observable<PopularTagType[] | null>;

  constructor(private _store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  private initializeValues(): void {
    this.isLoading$ = this._store.select(isLoadingSelector);
    this.error$ = this._store.select(errorSelector);
    this.popularTags$ = this._store.select(popularTagsSelector);
  }

  private fetchData(): void {
    this._store.dispatch(getPopularTagsAction());
  }
}
