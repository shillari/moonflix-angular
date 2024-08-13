import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * The `MainLayoutComponent` is responsible for managing the main layout of the application
 * when the user is logged in.
 * It includes navigation methods to various pages and handles user login status.
 * 
 * @example
 * <app-main-layout></app-main-layout>
 */
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  /**
   * Indicates whether the user is logged in.
   * It is `true` if a token is found in localStorage, otherwise `false`.
   */
  userLoggedIn: boolean = localStorage.getItem('token') == null ? false : true;

  /**
   * Constructor that injects the Router service.
   * 
   * @param router - The Router service used for navigation.
   */
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
  }

  /**
   * Navigates to the user's profile page.
   */
  goToProfile() {
    this.router.navigate(['/home/profile']);
  }

  /**
   * Logs out the user by clearing the localStorage and navigating to the welcome page.
   */
  logout() {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  /**
   * Redirects to the home page.
   */
  home() {
    this.router.navigate(['/home/movies']);
  }

}
