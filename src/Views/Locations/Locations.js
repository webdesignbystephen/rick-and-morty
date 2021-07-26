import React, { useEffect } from 'react';

import Collapsible from '../../components/Collapsible/Collapsible';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import { gql, useQuery } from '@apollo/client';

import classes from './Locations.module.css';

const Locations = () => {
    const LOCATIONS_QUERY = gql `
        query GetLocations {
            locations {
                results {
                    name,
                    type,
                    residents {
                        id,
                        name,
                        status,
                        image
                    }
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(LOCATIONS_QUERY);

    let queryResults;
    if (loading) {
        queryResults = <Modal>
                    <Spinner />
                </Modal>;
    }
    else if (error) {
        queryResults = <p>We're sorry but an error occurred while retrieving location data.</p>;
    }
    else {
        console.log(data);
        queryResults = (
            <ul className={classes.LocationsList}>
                {data.locations.results.map(({ name, type, residents }) => {
                    const collapsibleContent =
                        (residents.length >= 1)
                        ? <ul className={classes.ResidentList}>
                            {residents.map((resident) => {
                                return (
                                    <li>
                                        character card
                                    </li>
                                )
                            })}
                        </ul>
                        : <b>No Residents</b>
                    return (
                        <li>
                            <Collapsible name={name} type={type} content={collapsibleContent} />
                        </li>
                    )
                })}
            </ul>
        );
    }

    return (
        <>
            <h1  className={classes.LocationsHeading}>Rick and Morty's Universe</h1>
            {queryResults}
        </>
    );
}

export default Locations;
