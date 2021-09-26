import { Link, useHistory } from "react-router-dom";
import React, { useState, useContext } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import "./MyCollection.css";

function MyCollection(props) {
    const [loadedCollection, setLoadedCollection] = useState(props.collection);
    const { isLoading, error, sendRequest, open, handleClose } = useHttpClient();
    const history = useHistory();
    const auth = useContext(AuthContext);

    function deleteMovieHandler(deletedMovieId) {
        setLoadedCollection(prevCollection => 
            prevCollection.filter(movie => movie.movieId !== deletedMovieId
        ));
        history.push(`/dashboard/${auth.userId}`)
    }

    async function deleteMovie(event) {
        const movieId = event.target.movieId.value;

        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL+`/users/collection/${movieId}`,
                "DELETE",
                null,
                {
                    Authorization: "Bearer " + auth.token
                }
            );
            deleteMovieHandler(movieId);
        } catch (err) {}
    }

    return (
        <React.Fragment>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="al    ert-dialog-description"
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
                    <LoadingSpinner />
                </div>
            )}   
        <div id="my-collection">
            <h1>My Collection</h1>
            
            <div className="my-collection">
            {loadedCollection.map(movie => {
                return (
                    <div className="my-collection__card">
                        <Link to={`/movies/${movie.movieId}`} >
                            <Card className="my-collection__card-img">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.imageUrl}`} alt={movie.title} />
                            </Card>
                        </Link>
                        <div className="my-collection__card-details">
                                <p>{movie.title}</p>
                                <form onSubmit={deleteMovie}>
                                    <input 
                                        type="hidden"
                                        value={movie.movieId}
                                        name="movieId"
                                        id="movieId"
                                    />
                                    <div className="delete-btn">
                                        <button type="submit">
                                            <DeleteIcon style={{color: "white"}} />
                                        </button>
                                    </div>
                                </form>
                        </div>
                    </div>
                );
            })}
              
            </div>
        
            <Link to="/collection/add">
                <div className="fab"> + </div>
            </Link>
        </div>
        
        </React.Fragment>
    );
}

export default MyCollection;