import React from 'react';
import { Link } from 'react-router-dom';

import classes from './CharacterCard.module.css';

const CharacterCard = (props) => {

    let statusBubbleClasses = [classes.StatusBubble];
    switch (props.status) {
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

    return (
        <Link className={classes.CharacterLink} to={`/character/${props.id}`}>
            <div className={classes.CharacterCard}>
                <img
                    src={props.image}
                    alt={`resident ${props.name}`}
                />
                <div className={classes.CharacterDetails}>
                    <span className={classes.CharacterName}>{props.name}</span>
                    <span className={classes.CharacterStatus}>
                        <span className={statusBubbleClasses.join(' ')}></span>
                        {props.status}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default CharacterCard;
