import {Injectable} from '@angular/core';
import {from, map, Observable, switchMap} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from '@angular/fire/auth';

export interface LoginResponse {
  access_token: string;
}

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private httpClient: HttpClient, private auth: Auth) {
    this.user$ = authState(this.auth);
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(
      map(user => user != null)
    );
  }

  register(email: string, password: string, firstName: string, lastName: string) {
    const registerPromise = createUserWithEmailAndPassword(this.auth, email, password);
    const observable = from(registerPromise);

    return observable.pipe(
      switchMap(response => {
        return updateProfile(
          response.user,
          {
            displayName: firstName + ' ' + lastName,
          }
        );
      }),
    );
  }

  login(email: string, password: string): Observable<UserCredential> {
    const loginPromise = signInWithEmailAndPassword(this.auth, email, password);
    const observable = from(loginPromise);
    return observable;
  }

  logout() {
    return from(signOut(this.auth));
  }

  checkEmail(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);

    return this.httpClient.get<{ available: boolean }>(`${environment.api}/auth/check-email`, {params})
      .pipe(
        map(result => result.available),
      );
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
