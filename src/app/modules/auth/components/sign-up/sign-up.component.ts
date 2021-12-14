import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {delay, map, of, switchMap} from 'rxjs';
import {AuthService} from '../../services/auth.service';

function checkEmailValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return of(control.value)
      .pipe(
        delay(250),
        switchMap(email => {
          return authService.checkEmail(email);
        }),
        map(isAvailable => {
          if (isAvailable) {
            return null;
          }

          return {
            checkEmail: true,
          };
        })
      );
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email], [checkEmailValidator(authService)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordRepeat: [null, [Validators.required]],
      disclaimerAccepted: [false, [Validators.requiredTrue]],
    }, {
      validators: (control) => {
        const password = control.value.password;
        const passwordRepeat = control.value.passwordRepeat;

        if (password && passwordRepeat) {
          if (password !== passwordRepeat) {
            return {
              passwordMatch: true,
            };
          }
        }

        return null;
      }
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      alert('Submitting');
    }
  }
}
