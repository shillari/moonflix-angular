import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { Title } from '@angular/platform-browser';


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


  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
    if (localStorage.getItem('favorites') === null)
      localStorage.setItem('favorites', 'false');
  }

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

  showFavorites() {
    // Retrieve the current value from localStorage, convert to boolean
    // and toggle the value
    this.seeFavorites = localStorage.getItem('favorites') !== 'true';

    // Log the current state for debugging
    console.log('SEE FAV ' + this.seeFavorites);

    // Store the updated value in localStorage as a string
    localStorage.setItem('favorites', this.seeFavorites.toString());

  }

  getFavoriteList() {
    this.favoriteList = this.movies.filter(mov => this.isFavorite(mov));
    console.log('FAV LIST ' + this.favoriteList);
  }

  getFavoriteMovies() {
    this.fetchApiData.getFavoriteMovies(this.userDetails).subscribe({
      next: (result) => {
        this.favoriteMovies = result;
        this.getFavoriteList();
      }
    });
  }

  isFavorite(movie: any): boolean {
    this.favorite = this.favoriteMovies.some(fav => fav === movie._id);
    return this.favorite;
  }

  toggleFavorite(movie: any) {
    console.log(movie)
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

  changeMovie(movie: any) {
    this.movieImage = movie.imagePath;
  }

  openDirector(movie: any) {
    this.dialog.open(DetailsDialogComponent, {
      data: {
        title: movie.director.name,
        img: movie.director.imagePath,
        details: movie.director.bio
      }
    });
  }

  openGenre(movie: any) {
    this.dialog.open(DetailsDialogComponent, {
      data: {
        title: movie.genre.name,
        details: movie.genre.description
      }
    });
  }

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
