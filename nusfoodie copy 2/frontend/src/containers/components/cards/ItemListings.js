import React from 'react';
import { Grid, Item, ListItem, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


var cardStyle = {
    display: 'block',
    width: '20vw',
    transitionDuration: '0.3s',
    height: '100%'
}

export default function ItemListings({ items }) {
    return (
        <>
            <Grid container style={{ paddingLeft: '8em', paddingRight: '8em' }} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                {items.map((item, index) => (
                    <Grid key={index} item xs={4} md={3}>
                        <ListItem>
                            <Card style={cardStyle} sx={{ maxWidth: 345, fontFamily: 'Poppins', boxShadow: 5 }} md={{ minWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={item.imageId ? item.imageId : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'}
                                    title={item.foodName}
                                />
                                <CardContent>
                                    <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h5" component="div" fontSize="1rem" fontWeight="lg">
                                        {item.foodName}
                                    </Typography>
                                    <Chip sx={{ textTransform: 'uppercase', marginTop: '2em' }} color="primary" label={item.genreName} />
                                </CardContent>
                            </Card>
                        </ListItem>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}


// export default EstablishmentsListings;
