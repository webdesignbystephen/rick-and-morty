import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {

    return (
        <button
            className={classes.Button}
            onClick={props.clicked}>
            {props.text}
        </button>
    );
}

export default Button;
