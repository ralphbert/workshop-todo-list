import {Component, Input} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss']
})
export class InputErrorsComponent {
  @Input() errors: ValidationErrors | null | undefined;

  get errorsArray(): { name: string; payload?: any }[] {
    if (this.errors != null) {
      const keys = Object.keys(this.errors);
      return keys.map(key => {
        return {
          name: key,
          payload: this.errors?.[key],
        };
      });
    } else {
      return [];
    }
  }
}
