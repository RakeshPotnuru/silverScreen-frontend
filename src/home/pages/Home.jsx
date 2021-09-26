import React, { useEffect, useState } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ShowCase from "../components/ShowCase";
import Trending from "../components/Trending";

function Home(props) {
    const [loadedMovies, setLoadedMovies] = useState();
    const { isLoading, error, sendRequest, open, handleClose } = useHttpClient();

    useEffect(() => {
        const fetchMovies = async () => {
            
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL+"/home");

                setLoadedMovies(responseData);
            } catch (err) {}
        };
        fetchMovies();
    }, [sendRequest]);

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
            {!isLoading && loadedMovies && (
                <React.Fragment>
                    <ShowCase movies={loadedMovies.popularMovies} />
                    <Trending movies={loadedMovies.trendingMovies} />
                </React.Fragment>
            )}
            
        </React.Fragment>
    );
}

export default Home;