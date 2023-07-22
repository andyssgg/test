import SignInPic from '../../assets/signInPic.png';
import logo from '../../assets/logoV.png'
import React, { Component } from "react";
import axios from 'axios';
import { Grid, Item, ListItem, Chip, Link, Checkbox, TextField, FormControlLabel, Typography, Box, Button } from '@mui/material';
import { withCookies } from 'react-cookie';

class Login extends Component {
    handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const postData = {
            email: data.get("email"),
            password: data.get("password"),
        };

        try {
            const response = await axios.post('http://localhost:5001/api/login', postData);
            console.log(response.data);

            this.props.cookies.set('user', postData.email, { path: '/' });

            window.location.href = "/";


        } catch (error) {
            console.log(error)
            alert('Error: ' + error.response.data.message)
            console.error('Error:', error.response.data.message);
        }
    };

    render() {
        return (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item md={6}>
                    <img src={SignInPic} style={{ width: '85%', paddingTop: '7em', alignContent: 'center' }} className="signIn-Logo" id="signinLogo" alt="logo" />
                </Grid>
                <Grid item md={6}>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingTop: '5em'
                        }}
                    >
                        <img src={logo} style={{ width: '30%', paddingBottom: '2em' }} className="signIn-Logo" id="signinLogo" alt="logo" />
                        <Typography component="h1" variant="h5">
                            Welcome to NUSFoodie!
                        </Typography>
                        <Typography component="h5">
                            Log In to your account now!
                        </Typography>
                        <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <Button type="submit" variant="contained" sx={{ width: '100%', marginTop: '1em', marginBottom: '2em', backgroundColor: '#F5B102', color: 'white' }}>Log In</Button>
                            <Grid container>
                                <Grid item>
                                    Don't have an account? <Link href="/signup" underline="none" color="#000A60" style={{ fontWeight: 'bold' }}>{'Sign Up Now!'}</Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        );
    };
};


export default withCookies(Login);
