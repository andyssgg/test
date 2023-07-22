import React from 'react';
import { Grid, ListItem, Box, CardActionArea } from '@mui/material';

function StallListings(props) {
    const { stalls } = props;
    
    return (
        <>
            <Grid container style={{ paddingLeft: '9em', paddingRight: '9em', alignContent:'center' }} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                {stalls.map((stall, index) => (
                    <Grid key={index} item xs={4} md={3}>
                        <ListItem>
                        <CardActionArea href={`/establishments/${stall.establishmentId}/${stall.stallId}`}>
                            <Box
                                sx={{
                                    backgroundImage: `url('${stall.imageId}')`,
                                    backgroundRepeat: "no-repeat",
                                    height: '180px',
                                    width: '180px',
                                    borderRadius: '50%',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    color: 'white',
                                    backgroundColor: 'grey',
                                    backgroundBlendMode: 'multiply',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    boxShadow: 5
                                }}
                            >
                                {stall.stallName}
                            </Box>
                            </CardActionArea>
                        </ListItem>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default StallListings;
