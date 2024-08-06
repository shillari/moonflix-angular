import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  @Input() userData = { username: '', email: '', birthday: '' };

  @Input() userDetails = { username: '', oldpassword: '', newpassword: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) { }

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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

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
