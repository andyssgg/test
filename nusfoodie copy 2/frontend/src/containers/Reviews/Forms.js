import React, { useState, useEffect, useContext } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { Button, Typography, Grid, TextField, Box, MenuItem } from '@mui/material';
import axios from "axios";
import UserContext from '../../UserContext';

import './Reviews.css';
import ResponsiveAppBar from '../navbar';
import ReviewPic from '../../assets/review.png'


const styles = {
    paperContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFC95F'
    }
};

const ReviewForm = () => {
    
    const { user } = useContext(UserContext);

    const [cuisine, setCuisine] = useState('');
    const [foodName, setFoodName] = useState('');
    const [reviewDescription, setReviewDescription] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [canteen, setCanteen] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [userId, setUserId] = useState('');
    const [cuisineTypes, setCuisineTypes] = useState([]);
    const [establishments, setEstablishments] = useState([]);
    const [rating, setRating] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:5001/api/genres')
            .then(response => {
                setCuisineTypes(response.data);
            })
            .catch(error => {
                console.error('Error', error);
            });
    
        axios.get('http://localhost:5001/api/establishments')
            .then(response => {
                setEstablishments(response.data);
            })
            .catch(error => {
                console.error('Error', error);
            });
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        let cuisineTypeName = cuisineTypes.find(option => option.genreId === cuisineType)?.genreName;
        let canteenName = establishments.find(option => option.establishmentId === canteen)?.establishmentName;
        
        const review = {
            foodName: foodName,
            reviewDescription: reviewDescription,
            cuisineType: cuisineTypeName,
            canteen: canteenName,
            imageLink: imageLink,
            userEmail: user,
            rating: rating
        };

        axios.post('http://localhost:5001/api/reviews', review)
            .then(res => {
                alert("Review posted successfully!")
                window.location.href = "/reviews";

            })
            .catch(err => alert("Something went wrong! Please try again."));
    };

        return (
            <Container fluid mx="3px" id="reviews" >
                <ResponsiveAppBar />

                <div className="flex-container align-content-sm-stretch" id="review-header" style={Object.assign({}, styles.paperContainer, { width: "100%", margin: 0, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' })}>
                    <h1 style={{ fontSize: "28px", textAlign: 'center' }}>Food Reviews</h1>
                    <div className="flex-container align-content-sm-stretch" id="review-subheader">
                        <h4 style={{ fontSize: "18px", paddingTop: '23px', paddingBottom: '29px' }}>Let others know your favourite food in NUS!</h4>
                    </div>
                </div>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginBottom: '3em' }}>
                    <Grid item md={6} xs={12}>
                        <img src={ReviewPic} style={{ width: '75%', paddingTop: '8em', alignContent: 'right' }} className="signIn-Logo" id="signinLogo" alt="logo" />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Box
                            sx={{
                                marginTop: 3,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                paddingTop: '2em',
                                width: '70%'
                            }}
                        >

                            <Typography component="h1" variant="h5">
                                Share Your Thoughts!
                            </Typography>

                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="foodName"
                                label="Food Name"
                                name="foodName"
                                autoComplete="foodName"
                                autoFocus
                                onChange={e => setFoodName(e.target.value)}
                                />

                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Review Description"
                                name="description"
                                autoComplete="description"
                                onChange={e => setReviewDescription(e.target.value)}
                                />

                                <TextField
                                id="outlined-select-rating"
                                select
                                required
                                margin="normal"
                                fullWidth
                                label="Rating"
                                onChange={e => setRating(e.target.value)}
                                >
                                {[1, 2, 3, 4, 5].map((option) => (
                                <MenuItem key={option} value={option}>
                                {option}
                                </MenuItem>
                                ))}
                                </TextField>

                                <TextField
                                id="outlined-select-cuisine"
                                select
                                required
                                margin="normal"
                                fullWidth
                                label="Cuisine Type"
                                onChange={e => setCuisineType(e.target.value)}
                                >
                                {cuisineTypes.map((option) => (
                                <MenuItem key={option.genreId} value={option.genreId}>
                                {option.genreName}
                                </MenuItem>
                                ))}
                                </TextField>

                                <TextField
                                id="outlined-select-canteen"
                                select
                                required
                                margin="normal"
                                fullWidth
                                label="Canteen"
                                onChange={e => setCanteen(e.target.value)}
                                >
                                {establishments.map((option) => (
                                <MenuItem key={option.establishmentId} value={option.establishmentId}>
                                {option.establishmentName}
                                </MenuItem>
                                ))}
                                </TextField>

                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="imageLink"
                                label="Food Image URL"
                                name="imageLink"
                                autoComplete="imageLink"
                                autoFocus
                                onChange={e => setImageLink(e.target.value)}
                                />

                                <Button type="submit" onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#0F006B', left: '37%', marginTop: '2em' }}>Post My Review</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container >
        )
}

export default ReviewForm;