import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import "./ShowCase.css";


function ShowCase(props) {
    function split(str) {
        if(str){
            return str.split("-")[0];
        }
        return "";
    }

    function truncate(str) {
        if(str){
            return str.length > 25 ? str.substring(0, 25) + "..." : str;
        }
        return "";
    }

    return (
        <div className="showcase">
            {props.movies.map(movie => {
                return (
                    <div className="showcase__card">
                        <Link to={`/movies/${movie.id}`} >
                            <Card className="showcase__card-img">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            </Card>
                        </Link>
                        <div className="showcase__card-details">
                            <p style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {truncate(movie.title || movie.name)}
                            </p>
                            <li className="year">{split(movie.release_date) || split(movie.first_air_date)}</li>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ShowCase;