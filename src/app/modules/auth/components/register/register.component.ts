import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UniqueEmailValidatorService} from '../../services/unique-email-validator.service';
import {tap} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private uniqueEmailValidatorService: UniqueEmailValidatorService, private changeDetectorRef: ChangeDetectorRef) {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['admin@example.co', [Validators.required, Validators.email], [this.uniqueEmailValidatorService]],
      password: [],
    });
  }

  ngOnInit(): void {
  }

  signUp() {

  }

  emailAsync(control: AbstractControl) {
    return this.uniqueEmailValidatorService.validate(control).pipe(
      tap(() => this.changeDetectorRef.markForCheck()),
    );
  }
}
