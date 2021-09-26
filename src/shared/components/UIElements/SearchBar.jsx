import React, {useEffect, useReducer} from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { validate } from '../../util/validators';
import "./SearchBar.css";

function inputReducer(state, action) {
    switch(action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
}

function SearchBar(props) {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || "",
        isTouched: false,
        inValid: props.valid || false
    });

    function handleChange(event) {
        dispatch({type: "CHANGE", val: event.target.value, validators: props.validators});
    }

    function touchHandler() {
        dispatch({type: "TOUCH"})
    }

    const {id, onInput } = props;
    const {value, isValid} = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    return (
        <div className={`search-bar ${props.className} ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`} style={props.style}>
            
                <input
                    id={props.id}
                    type={props.type}
                    placeholder={props.placeholder} 
                    name={props.name} 
                    value={inputState.value}
                    onChange={handleChange}
                    onBlur={touchHandler}
                />
                <button type="submit" disabled={props.disabled}>
                    <SearchIcon style={{color: "white", cursor: "pointer"}} />
                </button>
                {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
            
        </div>
    );
}

export default SearchBar;