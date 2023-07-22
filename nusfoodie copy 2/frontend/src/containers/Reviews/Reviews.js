import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Chip, Typography, cardStyle, CardMedia, Card, Box, CardContent } from '@mui/material';
import axios from "axios";

import './Reviews.css';
import ResponsiveAppBar from '../navbar';
import ReviewPic from '../../assets/review.png'

import ReviewListings from '../components/cards/ReviewListings';

const styles = {
    paperContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFC95F'
    }
};

class Reviews extends Component {
  
    render() {
        return (
            <Container fluid mx="3px" id="reviews" >
                <ResponsiveAppBar />
                <div className="flex-container align-content-sm-stretch" id="review-header" style={Object.assign({}, styles.paperContainer, { width: "100%", margin: 0, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' })}>
                    <h1 style={{ fontSize: "28px", textAlign: 'center' }}>Food Reviews</h1>
                    <div className="flex-container align-content-sm-stretch" id="review-subheader">
                        <h4 style={{ fontSize: "18px", paddingTop: '23px', paddingBottom: '29px' }}>Let others know your favourite food in NUS!</h4>
                    </div>
                </div>


                <div className="container">
                    <Card sx={{ display: 'flex', width: '60%', margin: '0 auto', boxShadow: 4, borderRadius: '16px', backgroundColor: '#F9F9F9' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={ReviewPic}
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6" fontWeight={'bold'} fontSize='18px' color={'#0F006B'}>
                                    Share your food ratings and reviews with us!
                                </Typography>
                                <Button variant="contained" href='/review-form' style={{ bottom: 0, left: "90%", marginTop: '1em', backgroundColor: '#390A9D' }}>Post My Review</Button>
                            </CardContent>

                        </Box>
                    </Card>

                    <div className="subtitile">
                        <p style={{ fontSize: "16px", paddingTop: "1em", textAlign: 'left', paddingLeft: '9em' }}>Explore various food reviews by other foodies! Share yours too!</p>
                    </div>

                    <ReviewListings />
                </div>
            </Container >
        )
    }
}

export default Reviews;