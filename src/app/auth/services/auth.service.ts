import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { RegisterRequestInteface } from '../types/registerRequest.intrface';
import { environment } from 'src/environments/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { LoginRequestInteface } from 'src/app/auth/types/loginRequest.interface';

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInteface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';
    return this._http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInteface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login';
    return this._http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user';
    return this._http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }
}
