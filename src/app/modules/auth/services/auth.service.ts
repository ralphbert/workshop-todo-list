import {Injectable} from '@angular/core';
import {EMPTY, from, map, Observable, switchMap, tap} from 'rxjs';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from '@angular/fire/auth';

export interface LoginResponse {
  access_token: string;
}

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null> = EMPTY;

  constructor(private auth: Auth) {
    this.user$ = authState(this.auth);
  }

  get user(): User | null {
    return this.auth.currentUser;
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(
      map(u => !!u),
    );
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        tap(response => {
          console.log('signUp response', response);
        }),
      );
  }

  register(email: string, password: string, firstName: string, lastName: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        switchMap(response => {
          return updateProfile(response.user, {
            displayName: [firstName, lastName].join(' '),
          })
        }),
      );
  }

  logout() {
    return from(signOut(this.auth));
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
