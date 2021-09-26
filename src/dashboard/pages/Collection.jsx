import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import MyCollection from "../components/MyCollection";

function Collection(props) {
    const [loadedCollection, setLoadedCollection] = useState();
    const { isLoading, error, sendRequest, open, handleClose } = useHttpClient();
    const auth = useContext(AuthContext);

    const userId = useParams().uid;

    useEffect(() => {
        const fetchCollection = async () => {
            try {
               const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+`/users/dashboard/${userId}`
                );
               setLoadedCollection(responseData.movies);
               console.log(responseData.movies);
            } catch (err) {}
            
        };
        fetchCollection();
    }, [sendRequest, userId, auth]);


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
                    <LoadingSpinner />
                </div>
            )}        
            {(!loadedCollection || loadedCollection.lenght === 0) && (
                <h2>No saved movies, click the plus button below to add one.</h2>
            )}
            {!isLoading && loadedCollection && (
                <MyCollection collection={loadedCollection} />
            )}
            
        </React.Fragment>
    );
}

export default Collection;