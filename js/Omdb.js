class Omdb {
    constructor(movies) {
        this.movies = movies;
        this.movieList = []
    }
    async searchMovies() {
        try {
            console.log(this.movies);
            const searches = await fetch(`https://www.omdbapi.com/?s=${this.movies}&apikey=f95293ff`);
            const data = await searches.json();
            this.movieList = data.Search;
        }
        catch (err) {
            return err;
        }
    }
}