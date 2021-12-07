import {AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {AuthService} from './auth.service';
import {catchError, map, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

export class EmailValidator {
  static createValidator(uniqueEmailValidatorService: UniqueEmailValidatorService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return uniqueEmailValidatorService.validate(control);
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class UniqueEmailValidatorService implements AsyncValidator {
  constructor(private authService: AuthService) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.checkEmail(control.value)
      .pipe(
        map(result => {
          if (result?.available === false) {
            return { uniqueEmail: true };
          }

          return null;
        }),
        catchError(error => {
          return of({ uniqueEmailServerError: error });
        }),
      );
  }
}
