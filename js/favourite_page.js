const movie = document.querySelector('.fav-movies .container');

document.addEventListener('DOMContentLoaded', setMovies());

//Whateber movi is passed from the movie details page it will load here
function getMovies() {
   let movies;
   if (localStorage.getItem('favMovieList') === null) {
      movies = [];
   }
   else {
      movies = JSON.parse(localStorage.getItem('favMovieList'));
   }
   return movies;
}

// this will set the movie details 
function setMovies() {
   const getFavourites = getMovies();
   if (getFavourites.length > 0) {
      getFavourites.forEach((movies) => {
         console.log(movies);
         movie.innerHTML += `<div class="item">
                  <figure><img src='${movies.Poster}' alt=${movies.Title}/></figure>
                  <div class="desc">
                      <h2>
                        <a href="javascript:void(0);" onclick=movieClicked('${movies.imdbID}')>
                           ${movies.Title}
                        </a>
                      </h2>
                      <p>Director: ${movies.Director}</p>
                      <p>Type: ${movies.Type}</p>
                      <p>Year: ${movies.Year}</p>
                      <button class="remove-btn" onclick="removeMovieFromFav(this,'${movies.imdbID}')">Remove From Favourites</button>
                  </div>
            </div>`;
      });
   }
   else {
      movie.innerHTML += `<h3>You have not added any favourite movie</h3>`
   }
}

// give details of movie when clicked
function movieClicked(id) {
   sessionStorage.setItem('movieDetail', id);
   window.open('../movie-detail.html?id=' + id, '_self');
}
// to remove the movie from the favourite list
function removeMovieFromFav(e, imdbID) {
   let favMovieList = getMovies();
   // remove the clicked movie
   favMovieList.forEach(function (favmovie, index) {
      if (favmovie.imdbID === imdbID) {
         favMovieList.splice(index, 1);
      }
   });
   localStorage.setItem('favMovieList', JSON.stringify(favMovieList));
   alertMessagebar("Movie Removed", 3000);
   console.log(e.parentElement.parentElement.remove());
}
// to show alert messages
function alertMessagebar(text, timing) {
   const alertbar = document.getElementById("alert");
   alertbar.innerHTML = text;
   alertbar.className = "show";
   setTimeout(function () { alertbar.className = alertbar.className.replace("show", ""); }, timing);
}