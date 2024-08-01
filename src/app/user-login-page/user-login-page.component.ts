import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrl: './user-login-page.component.scss'
})
export class UserLoginPageComponent implements OnInit {

  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        console.log(result.token)

        // Add username and token to local storage
        localStorage.setItem('username', result.user.username)
        localStorage.setItem('token', result.token)
        this.router.navigate(['movies']);
        this.snackBar.open('User logged in', 'OK', {
          duration: 2000
        });
      },
      error: (error) => {
        this.snackBar.open(error, 'error', {
          duration: 2000
        });
      }
    })
  }

}
