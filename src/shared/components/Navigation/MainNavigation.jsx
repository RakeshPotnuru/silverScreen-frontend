import React, { useState } from "react";
import { Link } from "react-router-dom";

import SideDrawer from "./SideDrawer";
import MainHeader from "./MainHeader";
import Navlinks from "./NavLinks";
import Backdrop from "../UIElements/BackDrop";
import "./MainNavigation.css";

// import Logo from "./logo.png";

function MainNavigation() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    function openDrawerHandler() {
        setDrawerIsOpen(true);
    }

    function closeDrawerHandler() {
        setDrawerIsOpen(false);
    }

    return (
        <React.Fragment>
        {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
        
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
            <nav className="main-navigation__drawer-nav">
                <Navlinks />
            </nav>
        </SideDrawer>

        <MainHeader>
            <button onClick={openDrawerHandler} className="main-navigation__menu-btn">
                <span />
                <span />
                <span />
            </button>
            <div className="main-navigation__brand">
                <Link to="/"><h1><span className="s">S</span>ilver<br />Screen</h1></Link>
            </div>
            <nav className="main-navigation__header-nav">
                <Navlinks />
            </nav>
        </MainHeader>
        </React.Fragment>
    );
}

export default MainNavigation;