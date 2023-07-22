import React, { useState, useEffect } from 'react';
import { Grid, Item, ListItem, Chip, Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';


var cardStyle = {
    display: 'block',
    width: '30vw',
    transitionDuration: '0.3s',
    height: '100%'
}

export default function CuisineListings() {
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/fooditems')
            .then(response => {
                setFoodItems(response.data);
            })
            .catch(error => {
                console.error(`Error fetching data: ${error}`);
            });
    }, []);


    return (
        <>
            <Grid container style={{ paddingLeft: '8em', paddingRight: '8em' }} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                {foodItems.map((item) => (
                    <Grid item xs={6} md={3} key={item.foodId}>
                        <ListItem>
                            <Card style={cardStyle} sx={{ maxWidth: 345, fontFamily: 'Poppins' }} md={{ minWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={item.imageId ? item.imageId : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'}
                                    title={item.foodName}
                                />
                                <CardContent>
                                    <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }} gutterBottom variant="h5" component="div" fontSize="1rem" fontWeight="lg">
                                        {item.foodName}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '12px' }} color="text.primary">{item.Ratings} ⭐</Typography>
                                    </Typography>
                                    <Chip sx={{ textTransform: 'uppercase' }} rowSpacing={12} color="primary" label={item.genreName} />
                                </CardContent>
                            </Card>
                        </ListItem>
                    </Grid>
                ))}
            </Grid>
        </>
    );

}


