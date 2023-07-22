
import SignUpPic from '../../assets/signup.png';
import logo from '../../assets/logoV.png'
import React, { Component } from "react";
import axios from 'axios';
import { Grid, Link, TextField, Typography, Box, Button } from '@mui/material';


class SignUp extends Component {
    handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        // Prepare the data to send
        const postData = {
            email: data.get("email"),
            username: data.get("username"),
            password: data.get("password"),
        };
    
        // Post the data
        try {
            const response = await axios.post('http://localhost:5001/api/signup', postData);
            console.log(response.data);
            alert("Success! Account created successsfully. You may now login")
            window.location.href = "/login";
        } catch (error) {
            alert('Error: ' + error.response.data.message);
        }
    };




    render() {

        return (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item md={6} xs={12}>
                    <img src={SignUpPic} style={{ width: '75%', paddingTop: '8em', alignContent: 'right' }} className="signIn-Logo" id="signinLogo" alt="logo" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingTop: '5em',
                            width:'70%'
                        }}
                    >
                        <img src={logo} style={{ width: '30%', paddingBottom: '2em' }} className="signIn-Logo" id="signinLogo" alt="logo" />
                        <Typography component="h1" variant="h5">
                            Welcome to NUSFoodie!
                        </Typography>
                        <Typography component="h5">
                            Sign Up to be part of us!
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
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
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

                            <Button type="submit" variant="contained" sx={{ width: '100%', marginTop: '1em', marginBottom: '2em', backgroundColor: '#F5B102', color: 'white' }}>Sign Up</Button>
                            <Grid container>
                                <Grid item>
                                    {/* <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up Now!"}
                                    </Link> */}
                                    Already have an account? <Link href="/login" underline="none" color="#000A60" style={{ fontWeight: 'bold' }}>{'Log In Now!'}</Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        );
    };
};


export default SignUp;