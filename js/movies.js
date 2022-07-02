//get fetch the imdb ID for the movie details from the query string
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const res = params.id;
console.log(res);




// get the plot movies 
document.addEventListener("DOMContentLoaded", getMoviePlots());

// The code below show the details of movie in another page.
const movDetails = document.querySelector('.movie-details');
const movieId = sessionStorage.getItem('movieDetail');

// The below code works when no movie is found by that name
if (res === null || res !== movieId) {
  movDetails.innerHTML = "<div class='container' style='text-align:center'><h1>Oops!! The Wrong One</h1> <p>The page does not exist</p></div>";
  showSnackbar("Sorry , Wrong Request , Going Back to HomePage.....", 4000);
  setTimeout(function () { window.open('../index.html'); }, 3000);
}

//The below function is used for getting plots of the movie
async function getMoviePlots() {
  try {

    const searches = await fetch(`https://www.omdbapi.com/?i=${res}&plot=full&apikey=f95293ff`);
    const data = await searches.json();
    if (data.Response === "True") {
      setMovieDetails(data);
    }
  }
  catch (e) {
    console.log(e);
  }
}

// Function to set the movie details from the list movie details
function setMovieDetails(data) {
  console.log(data);
  if (movieId === res) {
    movDetails.innerHTML = `<div class="flex container">
              <img src="${data.Poster}" alt="${data.Title}" />
              <div class="movie-desc">
                  <h1>${data.Title}</h1>
                  <p>${data.Plot}</p>
                  <p><strong>Rating:</strong> ${data.imdbRating}</p>
                  <p><strong>Director:</strong> ${data.Director}</p>
                  <p><strong>Language:</strong> ${data.Language}</p>
                  <p><strong>Country of Origin:</strong> ${data.Country}</p>
                  <p><strong>Genre:</strong> ${data.Genre}</p>
                  <p><strong>Release Date:</strong> ${data.Released}</p>
                  <button class="fav-button">Add to Favourites</button>
              </div>
      </div>`;
    addToFav(data);
  }
  else {
    movDetails.innerHTML = "<div class='container' style='text-align:center'><h1>Error 404</h1> <p>The page does not exist</p></div>";
    alertMessagebar("This is an Invalid Request , Redirecting to Home.....", 3000);
    setTimeout(function () { window.open('../index.html'); }, 3000);
  }
}

// This function will add to to favourites section
function addToFav(data) {
  document.querySelector('.fav-button').addEventListener('click', function () {
    //add it to the favourite section
    let favMovieList;
    if (localStorage.getItem('favMovieList') === null) {
      favMovieList = [];
    }
    else {
      favMovieList = JSON.parse(localStorage.getItem('favMovieList'));
    }
    const fav = favMovieList.find((movie) => (data.imdbID === movie.imdbID));
    if (fav === undefined) {
      favMovieList.push(data);
      localStorage.setItem('favMovieList', JSON.stringify(favMovieList));
      alertMessagebar("Movie added to favourites", 3000);
    }
    else {
      alertMessagebar("Movie already added to Favourites", 3000);
    }
  });
}

// show alert messages 
function alertMessagebar(text, timing) {
  const alert = document.getElementById("alert");
  alert.innerHTML = text;
  alert.className = "show";
  setTimeout(function () { alert.className = alert.className.replace("show", ""); }, timing);
}

