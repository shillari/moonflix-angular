import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * The `WelcomePageComponent` is responsible for displaying the welcome page
 * and handling the user login and registration dialogs.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {

  /**
   * Indicates if the login view is currently active.
   */
  login: boolean = true;

  /**
   * Constructor for `WelcomePageComponent`.
   * 
   * @param dialog - The Angular Material dialog service for opening dialogs.
   */
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Opens the user registration dialog by setting `login` to false.
   */
  openUserRegistrationDialog(): void {
    this.login = false;
  }

  /**
   * Resets the `login` flag to true indicating registration success.
   */
  onRegistrationSuccess() {
    this.login = true;
  }

  /**
   * Opens the user login dialog by setting `login` to true.
   */
  openUserLogin(): void {
    this.login = true;
  }
}
