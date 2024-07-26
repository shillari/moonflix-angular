import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moonflix-97228dafe8d1.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the login endpoint
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(`${apiUrl}/login`, userDetails).pipe(
      tap((response: any) => localStorage.setItem('token', response.token)),
      catchError(this.handleError)
    );
  }

  // Making the api call for the update user endpoint
  public updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${apiUrl}/users/${userDetails.username}`,
      userDetails,
      {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${token}`,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call for the get user endpoint
  public getUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/users/${userDetails.username}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the delete user endpoint
  public deleteUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}/users/${userDetails.username}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the get all movies endpoint
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/movies`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the get one movie endpoint
  public getMovie(movieDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/movies/${movieDetails.title}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for get director endpoint
  public getDirector(movieDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/directors/${movieDetails.director}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for get genre endpoint
  public getGenre(movieDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/genre/${movieDetails.genre}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for get favorites movies for a user endpoint
  public getFavoriteMovies(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/users/${userDetails.username}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      map((response: any) =>
        this.extractResponseData(response.favoriteMovies)),
      catchError(this.handleError)
    );
  }

  // Making the api call for add a movie to a favorite list endpoint
  public addFavoriteMovie(userDetails: any, movieDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${apiUrl}/users/${userDetails.username}/movies/${movieDetails.id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for delete a movie from a favorite list endpoint
  public deleteFavoriteMovie(userDetails: any, movieDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}/users/${userDetails.username}/movies/${movieDetails.id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    return res || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body: ${error.error}`
      );
    }
    return throwError(
      'An error occurred. Please try again later.'
    );
  }
}
