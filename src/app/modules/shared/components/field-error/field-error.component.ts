import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

export interface ErrorDetails {
  name: string;
  payload?: any;
}

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldErrorComponent {
  private _errors: ValidationErrors | undefined;

  @Input() status: 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED' | undefined;

  @Input() set errors(errors: ValidationErrors | undefined | null) {
    this._errors = errors || undefined;
  }

  get errorList(): ErrorDetails[] {
    return Object.keys(this._errors || {}).map(key => {
      const payload = this._errors?.[key];

      return {
        name: key,
        payload: payload !== true ? payload : undefined,
      } as ErrorDetails;
    });
  }

  trackByDetails(i: number, item: ErrorDetails) {
    return item.name;
  }
}
