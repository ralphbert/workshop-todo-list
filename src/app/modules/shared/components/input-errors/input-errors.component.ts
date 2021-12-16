import {Component, Input, OnInit} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.css']
})
export class InputErrorsComponent implements OnInit {
  @Input() errors: ValidationErrors | null | undefined;

  get errorArray() {
    return Object.keys(this.errors || {}).map(errorKey => {
      return {
        name: errorKey,
        payload: this.errors?.[errorKey] || undefined,
      };
    });
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
