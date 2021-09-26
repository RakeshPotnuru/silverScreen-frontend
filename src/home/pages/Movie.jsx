import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useHttpClient } from "../../shared/hooks/http-hook";
import MovieDetails from "../components/MovieDetails";
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

// import showCaseMovies from "../../fakedata";

function Movie() {
    const [loadedMovie, setLoadedMovie] = useState();
    const movieId = useParams().mid;

    const { isLoading, error, sendRequest, open, handleClose } = useHttpClient();
    useEffect(() => {
        const fetchMovie = async () => {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+`/movies/${movieId}`
            );
            setLoadedMovie(responseData.movie);
        };
        fetchMovie();
    }, [sendRequest, movieId]);
    
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"An error occured! Please try again"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>
            )}
            {!isLoading && loadedMovie && <MovieDetails movie={loadedMovie} />}
            
        </React.Fragment>
    );
}

export default Movie;