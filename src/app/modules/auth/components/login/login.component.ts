import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {catchError, of, tap} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  accepted = false;
  error: Error | undefined;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.error = undefined;

    if (this.username && this.password) {
      this.authService.login(this.username, this.password)
        .pipe(
          tap(() => {
            this.router.navigate(['/todos']);
          }),
          catchError((error) => {
            this.error = error;
            return of(null);
          }),
        )
        .subscribe(() => {
          console.log('All ok!');
        });
    }
  }
}
