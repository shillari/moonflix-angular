import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * This component provides a login form for users to authenticate themselves.
 * It uses the FetchApiDataService to communicate with the backend API for user authentication.
 * Once authenticated, the user's token and username are stored in local storage,
 * and the user is redirected to the home/movies route.
 */
@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrl: './user-login-page.component.scss'
})
export class UserLoginPageComponent implements OnInit {

  /**
   * Holds the user input data for username and password.
   */
  @Input() userData = { username: '', password: '' };

  /**
   * Injects required services: FetchApiDataService for API communication,
   * MatSnackBar for displaying notifications, and Router for navigation.
   * 
   * @param fetchApiData - Service to interact with the API for user login.
   * @param snackBar - Service to display notifications.
   * @param router - Service to handle navigation after successful login.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Handles the user login process. It sends the user data to the API for authentication,
   * stores the returned token and username in local storage, and redirects the user to the movies page.
   * If login fails, an error message is displayed.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        console.log(result.token)

        // Add username and token to local storage
        localStorage.setItem('username', result.user.username)
        localStorage.setItem('token', result.token)
        this.router.navigate(['home/movies']);
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
