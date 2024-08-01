import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {

  userLoggedIn: boolean = localStorage.getItem('token') == null ? false : true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
  }

  // Redirect to profile page
  goToProfile() {
    // TODO
  }

  // Log out the user
  logout() {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  login() {
    // TODO
  }

}
