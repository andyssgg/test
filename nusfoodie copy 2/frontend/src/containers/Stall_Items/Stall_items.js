import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";

import './Stall_item.css';
import ResponsiveAppBar from '../navbar';
import ItemListings from '../components/cards/ItemListings';

const styles = {
    paperContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFC95F'
    }
};

function StallItems() {
    const [items, setItems] = useState([]);
    const [establishmentName, setEstablishmentName] = useState('');
    const [stallName, setStallName] = useState('');

    useEffect(() => {
        const path = window.location.pathname;
        const parts = path.split('/');
        const establishmentId = parts[2];
        const stallId = parts[3];

        axios.get(`http://localhost:5001/api/establishments/${establishmentId}/stalls/${stallId}/items`)
            .then((response) => {
                const data = response.data;
                setItems(data);
                console.log(data)
            })
            .catch((error) => {
                console.error(`Error fetching data: ${error}`);
            });

        axios.get(`http://localhost:5001/api/establishments/${establishmentId}/stalls/${stallId}`)
            .then((response) => {
                const data = response.data;
                console.log(data)
                setEstablishmentName(data.establishmentName);
                setStallName(data.stallName);
            })
            .catch((error) => {
                console.error(`Error fetching data: ${error}`);
            });

    }, []);

    return (
        <Container fluid mx="3px" id="item" >
            <ResponsiveAppBar />

            <div className="flex-container align-content-sm-stretch" id="item-header" style={Object.assign({}, styles.paperContainer, { width: "100%", margin: 0, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' })}>
                <h1 style={{ fontSize: "28px", textAlign: 'center' }}>{establishmentName}</h1>
                <div className="flex-container align-content-sm-stretch" id="item-subheader">
                    <h4 style={{ fontSize: "18px", paddingTop: '23px', paddingBottom: '29px' }}>Satisfy your cravings now!</h4>
                </div>
            </div>


            <div className="container">
                <div className="subtitile">
                    <p style={{ fontSize: "16px", paddingTop: "1em", paddingBottom: '2em', textAlign: 'left', paddingLeft: '9em' }}>Here are the list of canteens/ restaurants available around at <b>{stallName}, {establishmentName}</b>! </p>
                    <h2 style={{ textAlign: 'left', paddingLeft: '6em' }}>{establishmentName} - {stallName}</h2>
                </div>

                <ItemListings items={items} />

            </div>
        </Container>
    )
}

export default StallItems;
