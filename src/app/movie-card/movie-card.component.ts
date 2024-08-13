import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';

/**
 * The `MovieCardComponent` is responsible for displaying a list of movies,
 * managing the user's favorite movies, and providing methods to interact
 * with movie details such as director, genre, and synopsis.
 * 
 * @example
 * <app-movie-card></app-movie-card>
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  movieImage: any = '';
  userDetails: any = { username: localStorage.getItem('username') || '' };
  favoriteMovies: any[] = [];
  favoriteList: any[] = [];
  favorite: boolean = false;
  seeFavorites: boolean = localStorage.getItem('favorites') === 'true'; // Proper initialization

  /**
   * Constructor that injects the FetchApiDataService and MatDialog services.
   * 
   * @param fetchApiData - The service used to fetch movie and user data.
   * @param dialog - The service used to open dialogs for movie details.
   */
  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
    if (localStorage.getItem('favorites') === null)
      localStorage.setItem('favorites', 'false');
  }

  /**
   * Retrieves the list of movies from the API and updates the component's state.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (result) => {
        console.log(result);
        this.movies = result;
        this.movieImage = result[0].imagePath;
        this.getFavoriteList();
      }
    });
  }

  /**
   * Toggles the visibility of the user's favorite movies.
   */
  showFavorites() {
    // Retrieve the current value from localStorage, convert to boolean
    // and toggle the value
    this.seeFavorites = localStorage.getItem('favorites') !== 'true';

    // Store the updated value in localStorage as a string
    localStorage.setItem('favorites', this.seeFavorites.toString());

  }

  /**
   * Filters the list of movies to include only the user's favorite movies.
   */
  getFavoriteList() {
    this.favoriteList = this.movies.filter(mov => this.isFavorite(mov));
  }

  /**
   * Retrieves the user's favorite movies from the API and updates the component's state.
   */
  getFavoriteMovies() {
    this.fetchApiData.getFavoriteMovies(this.userDetails).subscribe({
      next: (result) => {
        this.favoriteMovies = result;
        this.getFavoriteList();
      }
    });
  }

  /**
   * Checks if a given movie is in the user's list of favorite movies.
   * 
   * @param movie - The movie to check.
   * @returns `true` if the movie is a favorite, `false` otherwise.
   */
  isFavorite(movie: any): boolean {
    this.favorite = this.favoriteMovies.some(fav => fav === movie._id);
    return this.favorite;
  }

  /**
   * Toggles the favorite status of a movie.
   * Adds or removes the movie from the user's favorite list.
   * 
   * @param movie - The movie to toggle favorite status for.
   */
  toggleFavorite(movie: any) {
    if (this.isFavorite(movie)) {
      this.fetchApiData.deleteFavoriteMovie(this.userDetails, movie).subscribe({
        next: (result) => {
          this.favoriteMovies = result.favoriteMovies;
          this.getFavoriteList();
        }
      })
    } else {
      this.fetchApiData.addFavoriteMovie(this.userDetails, movie).subscribe({
        next: (result) => {
          this.favoriteMovies = result.favoriteMovies;
          this.getFavoriteList();
        }
      });
    }
  }

  /**
   * Updates the currently displayed movie image.
   * 
   * @param movie - The movie whose image should be displayed.
   */
  changeMovie(movie: any) {
    this.movieImage = movie.imagePath;
  }

  /**
   * Opens a dialog displaying details about the movie's director.
   * 
   * @param movie - The movie whose director details should be displayed.
   */
  openDirector(movie: any) {
    this.dialog.open(DetailsDialogComponent, {
      data: {
        title: movie.director.name,
        img: movie.director.imagePath,
        details: movie.director.bio
      }
    });
  }

  /**
   * Opens a dialog displaying details about the movie's genre.
   * 
   * @param movie - The movie whose genre details should be displayed.
   */
  openGenre(movie: any) {
    this.dialog.open(DetailsDialogComponent, {
      data: {
        title: movie.genre.name,
        details: movie.genre.description
      }
    });
  }

  /**
   * Opens a dialog displaying the synopsis of the movie.
   * 
   * @param movie - The movie whose synopsis should be displayed.
   */
  openSynopisis(movie: any) {
    this.dialog.open(DetailsDialogComponent, {
      data: {
        title: movie.title,
        img: movie.imagePath,
        details: movie.description
      }
    })
  }
}
