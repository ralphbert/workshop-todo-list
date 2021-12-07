import {ChangeDetectionStrategy, Component, forwardRef, Input, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

export interface PasswordPayload {
  password: string;
  passwordRepeat: string;
}

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => PasswordComponent),
  }, {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => PasswordComponent),
  }]
})
export class PasswordComponent implements ControlValueAccessor, Validator {
  @Input() disabled = false;
  onChange = (val: PasswordPayload) => {
  };
  onTouch = () => {
  };

  value: PasswordPayload = {
    password: '',
    passwordRepeat: '',
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: PasswordPayload): void {
    this.value = obj || {password: '', passwordRepeat: ''};
  }

  emitChange(key: keyof PasswordPayload, val: string) {
    this.value = {
      ...this.value,
      [key]: val,
    };

    this.onChange(this.value);
    this.onTouch();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const payload: PasswordPayload = control.value;

    const errors: ValidationErrors = {};

    if (payload?.passwordRepeat && payload?.password && payload.passwordRepeat !== payload.password) {
      errors['passwordNoMatch'] = true;
    }

    if (!payload?.passwordRepeat || !payload?.password) {
      errors['required'] = true;
    }

    if (payload?.password.length < 8) {
      errors['passwordTooShort'] = {
        required: 8,
        current: payload.password.length,
      };
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }
}
