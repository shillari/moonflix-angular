import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {

  login: boolean = true;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // This is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.login = false;
  }

  // This is the function that will open the dialog when the login button is clicked
  openUserLogin(): void {
    this.login = true;
  }
}
