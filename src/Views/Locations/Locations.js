import React from 'react';

import Collapsible from '../../components/Collapsible/Collapsible';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import useWindowWidth from '../../hooks/useWindowWidth';
import { gql, useQuery } from '@apollo/client';

import classes from './Locations.module.css';

const Locations = () => {
    const windowWidth = useWindowWidth();

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

    const  {loading, error, data } = useQuery(LOCATIONS_QUERY);

    let queryResults;
    if (loading) {
        queryResults =
            <Modal>
                <Spinner />
            </Modal>;
    }
    else if (error) {
        queryResults =
            <Modal>
                <span className={classes.FetchingErrorMessage}>We're sorry but an error occurred while retrieving location data.</span>
            </Modal>;
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
                                        <CharacterCard
                                            id={resident.id}
                                            name={resident.name}
                                            image={resident.image}
                                            status={resident.status}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                        : <b>No Residents</b>
                    return (
                        <li>
                            <Collapsible
                                name={name}
                                type={type}
                                content={collapsibleContent}
                                viewportWidth={windowWidth}
                            />
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
