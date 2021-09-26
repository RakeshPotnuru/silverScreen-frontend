import "./Button.css";

function Button(props) {
    return (
        <button 
            className={`button ${props.className}`} 
            type={props.type} 
            style={props.style}
        >
            {props.name}
        </button>
    );
}

export default Button;