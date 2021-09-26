import { createPortal } from "react-dom";

import "./BackDrop.css";

function BackDrop(props) {
    return createPortal(
        <div className="backdrop" onClick={props.onClick}></div>,
        document.getElementById('backdrop-hook')
    );
}

export default BackDrop;