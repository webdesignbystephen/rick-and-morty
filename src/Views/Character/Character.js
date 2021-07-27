import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Character.module.css';

const Character = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [characterDetails, setCharacterDetails] = useState(null);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then((response) => {
                setCharacterDetails(response.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
            .then(() => {
                setLoading(false);
            })
    }, [id]);

    let details;
    if (loading) {
        details =
            <Modal>
                <Spinner/>
            </Modal>
    }
    else if (error) {
        details =
            <Modal>
                <span>error</span>
            </Modal>
    }
    else if (characterDetails) {
        let statusBubbleClasses = [classes.StatusBubble];
        switch (characterDetails.status) {
            case 'Alive':
                statusBubbleClasses.push(classes.StatusAlive);
                break;
            case 'Dead':
                statusBubbleClasses.push(classes.StatusDead);
                break;
            case 'unknown':
                statusBubbleClasses.push(classes.StatusUnknown);
                break;
            default:
                statusBubbleClasses.push(classes.StatusUnknown);
        }

        details =
            <div className={classes.Character}>
                <div className={classes.CharacterDetails}>
                    <img src={characterDetails.image} alt={`Resident ${characterDetails.name}`} />
                    <div className={classes.CharacterInfo}>
                        <span className={classes.CharacterName}>{characterDetails.name}</span>
                        <span className={classes.Status}><span className={statusBubbleClasses.join(' ')}></span>{characterDetails.status}</span>
                        <div className={classes.CharacterType}>
                            <span>{characterDetails.species}</span>
                            <span><i>{characterDetails.gender}</i></span>
                        </div>
                        <div className={classes.Locations}>
                            <b>Last known location</b>
                            <span>{characterDetails.location.name}</span>
                            <b>First seen</b>
                            <span>{characterDetails.origin.name}</span>
                        </div>
                    </div>
                </div>
                <Button
                    text={'Add Notes'}
                    clicked={() => setShowNotesModal(true)}
                />
            </div>;
    }

    return (
        <>
            {details}
        </>
    );
}

export default Character;
