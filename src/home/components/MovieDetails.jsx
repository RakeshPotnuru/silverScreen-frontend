
import "./MovieDetails.css";

function MovieDetails(props) {
    return (
        <div className="movie-page">
        <h1>{props.movie.title}</h1>
            <div className="movie-page__details">
                <div className="movie-page__movie-img">
                    <img src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} alt={props.movie.title} />
                </div>
                <div className="movie-page__movie-details">
                    <p>Rating : {props.movie.vote_average}</p>
                    <p>Release date: {props.movie.release_date || props.movie.first_air_date ? props.movie.release_date : "N/A"}</p>
                    <h2>Overview</h2>
                    <p>{props.movie.overview} </p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;