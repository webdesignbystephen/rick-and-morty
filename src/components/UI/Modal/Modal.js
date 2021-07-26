import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const Modal = (props) => {

    return (
        <>
            <Backdrop />
            <div className={classes.Modal}>
                {props.children}
            </div>
        </>
    );
}

export default Modal;
