import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ResponsiveAppBar from '../navbar';
import UserContext from '../../UserContext';
import './Home.css';
import CuisineListings from '../components/cards/CuisineListings';
import HomeCuisineListings from '../components/HomeCuisineListings';
const styles = {
    paperContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFC95F'
    }
};

const Home = () => {
    const { user } = useContext(UserContext);
    const [defaultFoodItem, setDefaultFoodItem] = useState(null);

    const [foodItems, setFoodItems] = useState([]);
    const [recommenedFoodItem, setRecFood] = useState([]);

    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/fooditems')
            .then(response => {
                // Slice the response data to only get the first 100 items
                console.log("Top 100 :")
                setFoodItems(response.data.slice(0, 100));
            })
            .catch(error => {
                console.error(`Error fetching data: ${error}`);
            });


        axios.get('http://localhost:5001/api/searchhistory/'+user)
            .then(response => {
                console.log("Search history : ", response.data.food_item)
                setSearchHistory(response.data.food_item);


                
                // Get recommendations.
                const data = {
                    food_item: response.data.food_item,
                };
                            
                axios.post('http://localhost:5001/recommendations', data)
                .then(response => {
                    console.log("Recommended data:")
                    console.log(response.data['Food Item']);

                    setRecFood(response.data['Food Item']);

                })
                .catch(error => {
                    console.error(`Error: ${error}`);
                });


            })
            .catch(error => {
                setSearchHistory("")
                console.error(`Error fetching data: ${error}`);
            });
    }, []);

    function addSearch(foodItem) {
        const data = {
            user_email: user,
            food_item: foodItem
        };
    
        axios.post('http://localhost:5001/search', data)
            .then(response => {
                console.log(response.data);
                window.location.href = "/"
            })
            .catch(error => {
                console.error(`Error: ${error}`);
            });
    }
    useEffect(() => {
        if (foodItems.length > 0 && searchHistory !== "") {
            let item = foodItems.find(item => item.foodName === searchHistory);
            console.log('INFO: ',foodItems)
            setDefaultFoodItem(item);
            console.log('INFO: ', item.foodName)
        }
    }, [foodItems, searchHistory]);

    return (
        <Container fluid mx="3px" id="establishments" >
            <ResponsiveAppBar />

            <div className="flex-container align-content-sm-stretch" id="establishment-header" style={Object.assign({}, styles.paperContainer, { width: "100%", margin: 0, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' })}>
                <h1 style={{ fontSize: "28px", textAlign: 'center' }}>The quickest way to find the perfect bite</h1>
                <div className="flex-container align-content-sm-stretch" id="establishment-subheader">
                    <h4 style={{ fontSize: "18px", paddingTop: '23px', paddingBottom: '29px' }}>Satisfy your cravings now!</h4>
                </div>
            </div>

            <div className="container">
                <div className="subtitile">
            
            { searchHistory === "" ? <p style={{ fontSize: "16px", paddingTop: "1em", paddingBottom:'1em', textAlign: 'left', paddingLeft: '9em' }}>{user ? "Hi," : ""} <b>{user ? user + "!" : ""}</b> <br/>You have not searched for any recommended food before, search now to get them!</p> :                     <p style={{ fontSize: "16px", paddingTop: "1em", paddingBottom:'1em', textAlign: 'left', paddingLeft: '9em' }}>{user ? "Hi," : ""} <b>{user ? user + "!" : ""}</b> <br/>Here are the list of food choices you may like based on your preference and ratings!</p>}
       
       
            { searchHistory !== "" ? <p style={{ fontSize: "16px", paddingTop: "1em", paddingBottom:'1em', textAlign: 'left', paddingLeft: '9em' }}>You previously searched for <b>{searchHistory}</b></p>  :  <div></div>}


                </div>

                <Row style={{ marginLeft: '9em', paddingBottom: '2em' }}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    defaultValue={defaultFoodItem} 
                    options={foodItems}
                    getOptionLabel={(option) => option.foodName}
                    sx={{ width: 300 }}
                    onChange={(event, newValue) => {
                    console.log(newValue.foodName);
                    addSearch(newValue.foodName)
                    }}
                    renderInput={(params) => <TextField {...params} label="Search for Top Rated Cuisines" />}
                />

                </Row>
            { recommenedFoodItem.length > 0 ? <HomeCuisineListings foodItems={recommenedFoodItem} /> : <CuisineListings/> }
            </div>
        </Container>
    );
}

export default Home;
