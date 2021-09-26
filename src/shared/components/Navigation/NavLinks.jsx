import React, {useContext} from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

function NavLinks() {
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>Home</NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to={`/dashboard/${auth.userId}`}>Dashboard</NavLink>
                </li>
            )}
            <li>
                <NavLink to="/contact">Contact Us</NavLink>
            </li>
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">Login/Signup</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <span onClick={auth.logout}>Logout</span>
                </li>
            )}
        </ul>
    );
}

export default NavLinks;