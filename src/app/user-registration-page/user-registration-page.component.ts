import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * The `UserRegistrationPageComponent` handles the user registration process.
 * It allows new users to register by entering their username, password, email, and birthday.
 */
@Component({
  selector: 'app-user-registration-page',
  templateUrl: './user-registration-page.component.html',
  styleUrl: './user-registration-page.component.scss'
})
export class UserRegistrationPageComponent implements OnInit {

  /**
   * Object to hold user data such as username, password, email, and birthday for registration.
   */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };
  /**
   * Event emitter that signals a successful user registration.
   */
  @Output() registerSuccess = new EventEmitter<void>();

  /**
   * Constructor for `UserRegistrationPageComponent`.
   * Injects necessary services: `FetchApiDataService` to handle API requests,
   * `MatSnackBar` for notifications, and `Router` for navigation.
   * 
   * @param fetchApiData - Service to interact with the API.
   * @param snackBar - Service to display notifications.
   * @param router - Router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Sends the user registration data to the backend API to create a new user.
   * On success, it emits the `registerSuccess` event and displays a confirmation message.
   * On error, it displays an error message.
   */
  registerUser(): void {

    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        // Logic for a successful user registration 
        this.registerSuccess.emit();
        this.snackBar.open('User registered', 'OK', {
          duration: 2000
        });
      },
      error: (error) => {
        this.snackBar.open(error, 'error', {
          duration: 4000
        });
      }
    });
  }
}
