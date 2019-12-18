import React from 'react';

const Button = (props) => {
    return (
        <button value={props.state} id={props.id} onClick={props.handleClick} className="button">
        {props.text}</button>
 );
}

export default Button;




