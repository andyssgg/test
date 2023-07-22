import React, { useEffect, useState } from "react";
import { Grid, Item, ListItem, Link, CardActionArea, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from "axios";


var cardStyle = {
    display: 'block',
    width: '30vw',
    transitionDuration: '0.3s',
    height: '100%'
}

export default function ReviewListings() {


    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/api/reviews")
            .then(res => {
                console.log(res.data)
                setReviews(res.data)
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <Grid container style={{ paddingLeft: '8em', paddingRight: '8em' }} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                {reviews.map(review => (
                    <Grid item xs={12} md={4} key={review.review_id}>
                        <ListItem>
                            <Card style={cardStyle} sx={{ maxWidth: 345, fontFamily: 'Poppins', boxShadow: 5 }} md={{ minWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={review.imageId}
                                    title={review.food_name}
                                />
                                <CardContent>
                                    <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h5" component="div" fontSize="1rem" fontWeight="lg">
                                        {review.food_name}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {review.review_description}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '15px', marginTop: '1em' }}>
                                        Rating: {review.rating} 🌟
                                    </Typography>
                                    <Chip style={{ marginTop: '1em' }} label={review.cuisine_type} color="primary" />
                                    <Typography variant="subtitle2" color="text.secondary" marginTop={2}>
                                        📍 {review.canteen}, <b>UTown</b>
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" marginTop={1.4} sx={{ fontSize: '11px' }}>
                                        Posted by <b>{review.username}</b>, {review.date}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </ListItem>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}


