import React, { useContext } from 'react';
import SawoLogin from 'sawo-react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import "./Login.css";

function LoginPage() {
    const auth = useContext(AuthContext);
    
    const { isLoading, error, sendRequest, open, handleClose } = useHttpClient();

    async function sawoLoginCallback(payload) {

        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+"/users/signup", 
                "POST",
                JSON.stringify({payload: payload}),
                {"Content-Type": "application/json"}
            );
            
            auth.login(responseData.userId, responseData.token);
        } catch (err) {

        }

    }
    
    const sawoConfig = {
        onSuccess: sawoLoginCallback, //required,
        identifierType: 'email', //required, must be one of: 'email', 'phone_number_sms',
        apiKey: process.env.REACT_APP_SAWO_API_KEY, // required, get it from sawo dev.sawolabs.com,
        containerHeight: '230px', // the login container height, default is 230px
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
            <div className="login">
            {isLoading && <LoadingSpinner asOverlay/>}
                <h2><b>Welcome</b></h2>
                <p>Passwordless Authentication</p>
                <SawoLogin config={sawoConfig}/>
            </div>
        </React.Fragment>
    )
}

export default LoginPage