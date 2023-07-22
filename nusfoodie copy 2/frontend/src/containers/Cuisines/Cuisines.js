import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import ResponsiveAppBar from '../navbar';
import Button from '@mui/material/Button';

import './Cuisines.css';
import CuisineListings from '../components/cards/CuisineListings';

const styles = {
    paperContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFC95F'
    }
};

class Cuisines extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid mx="3px" id="establishments" >
                <ResponsiveAppBar />

                <div className="flex-container align-content-sm-stretch" id="cuisine-header" style={Object.assign({}, styles.paperContainer, { width: "100%", margin: 0, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' })}>
                    <h1 style={{ fontSize: "28px", textAlign: 'center' }}>Cuisines</h1>
                    <div className="flex-container align-content-sm-stretch" id="cuisine-subheader">
                        <h4 style={{ fontSize: "18px", paddingTop: '23px', paddingBottom: '29px' }}>Satisfy your cravings now!</h4>
                    </div>
                </div>

                <div className="container">
                    <div className="subtitile">
                        <p style={{ fontSize: "16px", paddingTop: "1em", textAlign: 'left', paddingLeft: '9em' }}>Here are the list of food choices that you can explore around NUS!</p>
                    </div>
                    <CuisineListings />
                </div>
            </Container>
        )
    }
}

export default Cuisines;