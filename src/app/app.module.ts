import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatLabel } from '@angular/material/form-field';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { UserRegistrationPageComponent } from './user-registration-page/user-registration-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  {
    path: 'home',
    component: MainLayoutComponent,
    children: [
      {
        path: 'movies', component: MovieCardComponent
      },
      {
        path: 'profile', component: UserProfileComponent
      },
      { path: '', redirectTo: 'movies', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    WelcomePageComponent,
    MainLayoutComponent,
    UserLoginPageComponent,
    UserRegistrationPageComponent,
    UserProfileComponent,
    DetailsDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    NgbModule,
    MatToolbarModule,
    MatMenuModule,
    MatLabel,
    MatTabsModule,
    MatSlideToggleModule,
  ],
  providers: [provideHttpClient(withFetch()), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
