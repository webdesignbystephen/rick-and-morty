import React, { useState } from 'react';
import axios from 'axios';

import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button/Button';
import classes from './NotesForm.module.css';

const NotesForm = (props) => {
    const [notes, setNotes] = useState('');
    const [sendingData, setSendingData] = useState(false);
    const [successSending, setSuccessSending] = useState(false);
    const [errorSending, setErrorSending] = useState(false);

    const saveNotes = (event) => {
        event.preventDefault();
        setSendingData(true);
        axios.post('https://jsonplaceholder.typicode.com/posts', {body: notes})
            .then((response) => {
                setSendingData(false);
                setSuccessSending(true);
                clearNotes();
            })
            .catch((error) => {
                setSendingData(false);
                console.log(error);
                setErrorSending(true);
            })
    }

    const clearNotes = () => {
        setNotes('');
    }

    const closeErrorDialog = () => {
        setErrorSending(false);
    }

    const resetNotesDialog = () => {
        setSuccessSending(false);
    }

    let content;
    if (errorSending) {
        content =
            <>
                <span className={classes.SuccessMessage}>There was an error saving your notes</span>
                <div className={classes.ButtonPanel}>
                    <Button
                        text={'OK'}
                        clicked={closeErrorDialog}
                    />
                </div>
            </>
    }
    else if (successSending) {
        content =
            <>
                <span className={classes.SuccessMessage}>Your notes were successfully saved!</span>
                <div className={classes.ButtonPanel}>
                    <Button
                        text={'Add More Notes'}
                        clicked={() => resetNotesDialog()}
                    />
                    <Button
                        text={'Close'}
                        clicked={props.closeButtonClicked}
                    />
                </div>
            </>
    }
    else if (sendingData) {
        content =
            <Spinner />
    }
    else {
        content =
            <form onSubmit={saveNotes}>
                <label>Enter your notes below</label>
                <textarea
                    rows="10"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    autoFocus
                >
                </textarea>
                <div className={classes.ButtonPanel}>
                    <Button
                        text={'Save'}
                        clicked={saveNotes}
                        disabled={!notes}
                    />
                    <Button
                        text={'Cancel'}
                        clicked={props.cancelButtonClicked}
                    />
                </div>
            </form>
    }

    return (
        <div
            className={classes.NotesForm}
        >
            {content}
        </div>
    );
}

export default NotesForm;
