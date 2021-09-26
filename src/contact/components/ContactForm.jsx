import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import BUTTON from "../../shared/components/UIElements/Button";
import "./ContactForm.css";


function ContactForm(props) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const history = useHistory();
    const [open, setOpen] = useState(false);
    function handleClose() {
        setOpen(false);
        history.push("/home");
    }

    function handleForm(event) {
        event.preventDefault();
        setIsSubmitted(true);
        setOpen(true);
    }

    return (
        <React.Fragment>
        {isSubmitted && (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"Success"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {"Form successfully submitted"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
            </Dialog>
        )}
        <div id="contact">
            <h2>Want to talk? Submit your message or get in touch with socials.</h2>
            <form onSubmit={handleForm}>
                <div className="name element">
                    <label htmlFor="name">Name :</label>
                    <input type="text" id="name" name="name" placeholder="Enter your full name" required />
                </div>
                <div className="email element">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="message element">
                    <label htmlFor="message">Message:</label>
                    <textarea type="text" id="message" name="messsage" placeholder="Your message" rows="4" cols="50" />
                </div>
                
                <BUTTON type={"submit"} name={"Submit"} style={{margin: "auto auto 5% 3%"}} />
            </form>
        </div>
        </React.Fragment>
    );
}

export default ContactForm;