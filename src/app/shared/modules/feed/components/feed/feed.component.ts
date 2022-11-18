import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getFeedAction } from 'src/app/shared/modules/feed/store/actions/getFeed.action';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector
} from 'src/app/shared/modules/feed/store/selectors';
import { GetFeedResponseInterface } from 'src/app/shared/modules/feed/types/getFeedResponse.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input('apiUrl') apiUrlProps!: string;

  feed$!: Observable<GetFeedResponseInterface | null>;
  error$!: Observable<string | null>;
  isLoading$!: Observable<boolean>;
  limit: number = environment.limit;
  baseUrl!: string;
  queryParamsSubscription!: Subscription;
  currentPage!: number;

  constructor(
    private _store: Store,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.feed$ = this._store.pipe(select(feedSelector));
    this.error$ = this._store.pipe(select(errorSelector));
    this.isLoading$ = this._store.pipe(select(isLoadingSelector));
    this.baseUrl = this._router.url.split('?')[0];
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this._route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
      }
    );
  }

  fetchData(): void {
    this._store.dispatch(getFeedAction({ url: this.apiUrlProps }));
  }
}
