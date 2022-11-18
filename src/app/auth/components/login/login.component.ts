import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loginAction } from 'src/app/auth/store/actions/login.action';
import { LoginRequestInteface } from 'src/app/auth/types/loginRequest.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector
} from 'src/app/auth/store/selectors';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private _fb: FormBuilder, private _store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm(): void {
    this.form = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this._store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this._store.pipe(select(validationErrorsSelector));
  }

  onSubmit(): void {
    const request: LoginRequestInteface = {
      user: this.form.value
    };
    this._store.dispatch(loginAction({ request }));
  }
}
