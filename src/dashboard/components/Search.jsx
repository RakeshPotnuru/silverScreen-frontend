import React, { useState, useCallback, useReducer, useContext } from "react";
import { useHistory } from "react-router";
// import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { AuthContext } from "../../shared/context/auth-context";
import {VALIDATOR_REQUIRE} from "../../shared/util/validators";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import SearchBar from "../../shared/components/UIElements/SearchBar";
// import fakeData from "../../fakedata"; // to be removed
import "./Search.css";

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            }
    
        default:
            return state;
    }
};

function Search(props) {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: "",
                isValid: false
            }
        },
        isValid: false
    });

    const auth = useContext(AuthContext);
    const history = useHistory();
    const { isLoading, error, sendRequest, open, handleClose } = useHttpClient();
    const [isRequested, setIsRequested] = useState(false);
    const [loadedMovies, setLoadedMovies] = useState();

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: "INPUT_CHANGE", value: value, isValid: isValid, inputId: id});
    }, []);

    async function handleSearch(event) {
        event.preventDefault();
        // console.log(formState.inputs.title.value);
        // const title = event.target.title.value;
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+"/movies/search",
                "POST",
                JSON.stringify({title: formState.inputs.title.value}),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token
                }
            );

            setLoadedMovies(responseData.movies);
        } catch (err) {}
        
        setIsRequested(true);
    } 

    async function addToCollection(event) {
        event.preventDefault();
        const movie_id = event.target.mid.value;
        const imageUrl = event.target.imageUrl.value;
        const title = event.target.title.value;
        const date = event.target.date.value;

        console.log(movie_id);

        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL+"/movies/add",
                "POST",
                JSON.stringify({
                    movieId: movie_id,
                    imageUrl: imageUrl,
                    title: title,
                    release_date: date,
                    creator: auth.userId
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token
                }
            );
        } catch (err) {}

        history.push(`/dashboard/${auth.userId}`);
    }

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
                    <LoadingSpinner asOverlay/>
                </div>
            )}

            <div id="search">
                <div className="search__bar">
                <form onSubmit={handleSearch}>
                    <SearchBar
                        id="title"
                        type="text"
                        name="title"
                        style={{width: "500%"}} 
                        placeholder="Enter movie title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title"
                        onInput={inputHandler}
                        disabled={!formState.isValid}
                    />
                </form>
                </div>
                {!isRequested && <div className="empty-div"></div>}
                {!isLoading && isRequested && 
                <div className="search__results">
                    {loadedMovies ? 
                    <div>
                        <h1>Search Results</h1>
                        <h3>Pick one</h3>
                            
                            {loadedMovies.map(movie => {
                                return (
                                    <form onSubmit={addToCollection}>
                                        <div>
                                            <u>{movie.title || movie.name}</u>
                                            <input 
                                                type="hidden"
                                                value={movie.id}
                                                name="mid"
                                                id="mid"
                                            />
                                            <input 
                                                type="hidden"
                                                value={movie.poster_path}
                                                name="imageUrl"
                                                id="imageUrl"
                                            />
                                            <input 
                                                type="hidden"
                                                value={movie.title}
                                                name="title"
                                                id="title"
                                            />
                                            <input 
                                                type="hidden"
                                                value={movie.release_date}
                                                name="date"
                                                id="date"
                                            />
                                            <button type="submit">
                                                <AddBoxIcon style={{color: "white"}} />
                                            </button>
                                        </div>
                                    </form>
                                );
                            })}
                            
                    </div>
                    : <h2>No movies found</h2>}
                </div>}
            </div>
        </React.Fragment>
    );
}

export default Search;