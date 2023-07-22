import React, { useState, useEffect } from 'react';
import { Grid, ListItem, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


var cardStyle = {
    display: 'block',
    width: '30vw',
    transitionDuration: '0.3s',
    height: '20vw'
}

export default function EstablishmentsListings() {
    const [establishments, setEstablishments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/api/establishments')
            .then(response => response.json())
            .then(data => setEstablishments(data));
    }, []);

    return (
        <>
            <Grid container style={{ paddingLeft: '8em', paddingRight: '8em' }} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                {establishments.map((establishment, index) =>
                    <Grid item xs={6} md={4} key={index}>
                        <ListItem>
                            <Card style={cardStyle} sx={{ maxWidth: 345, fontFamily: 'Poppins' }} md={{ minWidth: 345 }}>
                                    <CardActionArea component={Link} to={`/establishments/${establishment.establishmentId}`}>

                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={establishment.imageId}
                                        title={establishment.establishmentName}
                                    />
                                    <CardContent>
                                        <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h5" component="div" fontSize="1.2rem" fontWeight="lg">
                                            {establishment.establishmentName}
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {establishment.locationName}
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', paddingTop: '1em', color: 'black' }}>
                                                Opening Hours
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {establishment.openingHours}
                                            </Typography>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </ListItem>
                    </Grid>
                )}
            </Grid>
        </>
    );
}
