import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The `UserProfileComponent` handles the display and update of the user's profile information.
 * It allows the user to view and update their email, birthday, and username,
 * as well as change their password.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  /**
   * Object to hold user data such as username, email, and birthday for updating profile information.
   */
  @Input() userData = { username: '', email: '', birthday: '' };

  /**
   * Object to hold user data necessary for changing the password, including username, old password, and new password.
   */
  @Input() userDetails = { username: '', oldpassword: '', newpassword: '' };

  /**
   * Constructor for `UserProfileComponent`.
   * Injects necessary services: FetchApiDataService to handle API requests, and MatSnackBar for notifications.
   * 
   * @param fetchApiData - Service to interact with the API.
   * @param snackBar - Service to display notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Angular lifecycle hook that is called after the component is initialized.
   * It retrieves the current user's data from the backend and populates the `userData` object.
   */
  ngOnInit(): void {
    this.userData.username = localStorage.getItem('username') || '';
    this.userDetails.username = this.userData.username;
    this.fetchApiData.getUser(this.userData).subscribe({
      next: (result) => {
        this.userData.email = result.email;
        console.log(result.birthday);
        this.userData.birthday = this.formatDate(result.birthday);
      },
      error: (error) => {
        console.log(error)
        this.snackBar.open(error, 'error', {
          duration: 4000
        });
      }
    });
  }

  /**
   * Formats a date string into the format `YYYY-MM-DD`.
   * 
   * @param dateString - The date string to format.
   * @returns A formatted date string.
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  /**
   * Sends the updated user data to the backend API to update the user's profile information.
   * Displays a confirmation message upon success.
   */
  updateUser() {
    this.fetchApiData.updateUser(this.userData).subscribe({
      next: (result) => {
        this.userData.username = result.username;
        this.userData.email = result.email;
        this.userData.birthday = this.formatDate(result.birthday);
        this.snackBar.open('User updated', 'OK', {
          duration: 4000
        });
      }
    });
  }

  /**
   * Sends a request to the backend API to change the user's password.
   * Displays a confirmation message upon success or an error message if the update fails.
   */
  changePassword() {
    this.fetchApiData.changePassword(this.userDetails).subscribe({
      next: (result) => {
        this.snackBar.open('Password updated', 'OK', {
          duration: 4000
        });
      },
      error: (err) => {
        this.snackBar.open('Password not valid', 'error', {
          duration: 4000
        });
      }
    });
  }
}
