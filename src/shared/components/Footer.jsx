import React from "react";
import { Link } from "react-router-dom";
import { Twitter } from "@mui/icons-material";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import "./Footer.css";
import TmdbLogo from "../../images/tmdb_logo.svg";

function Footer() {
    return (
        <React.Fragment>
            <hr />
            <footer>
                <div>
                    <img src={TmdbLogo} alt="TMDB" />
                    <p>TMDB Api</p>
                    <p>© Silver Screen</p>
                </div>
                <div className="social-icons">
                    <span>
                        <Link to="">
                            <Twitter style={{ color: "white" }} />
                        </Link>
                    </span>
                    <span>
                        <Link to="">
                            <InstagramIcon style={{ color: "white" }} />
                        </Link>
                    </span>
                    <span>
                        <Link to="">
                            <LinkedInIcon style={{ color: "white" }} />
                        </Link>
                    </span>
                </div>
            </footer>
        </React.Fragment>
    );
}

export default Footer;