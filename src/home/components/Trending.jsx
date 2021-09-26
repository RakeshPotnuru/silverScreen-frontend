
import { Link } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import "./Trending.css";

function Trending(props) {
    function split(str) {
        if(str){
            return str.split("-")[0];
        }
        return "";
    }

    function truncate(str) {
        if(str) {
            return str.length > 25 ? str.substring(0, 25) + "..." : str;
        }
        return "";
    }

    return (
        <div id="trending">
        <h1>Trending</h1>
        
            <div className="trending">
                {props.movies.map(movie => {
                    return (
                        <div className="trending__card">
                            <Link to={`/movies/${movie.id}`}>
                                <Card className="trending__card-img">
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                </Card>
                            </Link>
                            <div className="trending__card-details">
                                    <p>{truncate(movie.title || movie.name)}</p>
                                    <li className="year">{split(movie.release_date) || split(movie.first_air_date)}</li>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Trending;