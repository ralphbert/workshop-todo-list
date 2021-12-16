import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  error: Error | null = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordRepeat: [null, [Validators.required]],
      disclaimerAccepted: [false],
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
    this.error = null;

    if (this.form.valid) {
      const {email, password, firstName, lastName} = this.form.value;
      this.authService.register(email, password, firstName, lastName).subscribe({
        next: () => {
          this.router.navigate(['/todos']);
        },
        error: error => {
          this.error = error;
        }
      });
      console.log(this.form.value);
      alert('Submitting');
    }
  }
}
