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

  /**
   * Registers a new user by sending user details to the server API.
   * 
   * @param userDetails The user information for registration.
   * @returns the response from server API.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails)
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in the user.
   * 
   * @param userDetails The user information for login.
   * @returns the response from server API.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(`${apiUrl}/login`, userDetails).pipe(
      tap((response: any) => localStorage.setItem('token', response.token)),
      catchError(this.handleError)
    );
  }

  /**
   * Update user's information.
   * 
   * @param userDetails The user information to be updated.
   * @returns the response from server API.
   */
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

  /**
   * Retrieve user's information.
   * 
   * @param userDetails User details containing the username.
   * @returns the response from server API.
   */
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

  /**
   * Changes the password of the logged in user.
   * 
   * @param userDetails Object containing new and old password.
   * @returns the response from server API.
   */
  public changePassword(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${apiUrl}/users/${userDetails.username}/password`, userDetails, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deletes user's account.
   * 
   * @param userDetails User information.
   * @returns the response from server API.
   */
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

  /**
   * Retrieve information about all movies.
   * 
   * @returns the response from server API.
   */
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

  /**
   * Retrieve information about a requested movie.
   * 
   * @param movieDetails The movie's title.
   * @returns the response from server API.
   */
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

  /**
   * Retrieve information about director.
   * 
   * @param movieDetails The director details.
   * @returns the response from server API.
   */
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

  /**
   * Retrieve information about genre.
   * 
   * @param movieDetails The genre information.
   * @returns the response from server API.
   */
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

  /**
   * Retrieve a list of a user's favorite movies.
   * 
   * @param userDetails User information.
   * @returns the response from server API.
   */
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

  /**
   * Add a movie to a user's favorite list.
   * 
   * @param userDetails User details
   * @param movieDetails Movie to be added.
   * @returns the response from server API.
   */
  public addFavoriteMovie(userDetails: any, movieDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${apiUrl}/users/${userDetails.username}/movies/${movieDetails._id}`,
      null,
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a movie from a user's favorite list.
   * 
   * @param userDetails User information containing username.
   * @param movieDetails Movie to be deleted.
   * @returns the response from server API.
   */
  public deleteFavoriteMovie(userDetails: any, movieDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}/users/${userDetails.username}/movies/${movieDetails._id}`, {
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