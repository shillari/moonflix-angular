import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration-page',
  templateUrl: './user-registration-page.component.html',
  styleUrl: './user-registration-page.component.scss'
})
export class UserRegistrationPageComponent implements OnInit {

  @Input() userData = { username: '', password: '', email: '', birthday: '' };
  @Output() registerSuccess = new EventEmitter<void>();

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
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
        console.log(error)
        this.snackBar.open(error, 'error', {
          duration: 4000
        });
      }
    });
  }
}
