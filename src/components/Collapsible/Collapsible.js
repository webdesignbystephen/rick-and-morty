import React, { useState, useRef, useEffect } from 'react';

import Button from '../UI/Button/Button';
import classes from './Collapsible.module.css';

const Collapsible = (props) => {
    const [showPanel, setShowPanel] = useState(false);
    const panelRef = useRef();

    const togglePanel = () => {
        setShowPanel((showPanel) => !showPanel);
    }

    useEffect(() => {
        if (!showPanel) {
            panelRef.current.style.maxHeight = '0';
        }
        else {
            panelRef.current.style.maxHeight = panelRef.current.scrollHeight + 'px';
        }
    }, [showPanel, props.viewportWidth]);

    return (
        <div className={classes.Collapsible}>
            <div className={classes.Heading}>
                <div className={classes.HeadingText}>
                    <span>{props.name}</span>
                    <i>{props.type}</i>
                </div>
                <Button
                    text={`${(showPanel ? 'Hide' : 'Show')} Residents`}
                    clicked={togglePanel}
                />
            </div>
            <div
                className={classes.Panel}
                ref={panelRef}
            >
                <div className={classes.Content}>
                    {props.content}
                </div>
            </div>
        </div>
    );
}

export default Collapsible;
