import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";

import './Establishments.css';
import ResponsiveAppBar from '../navbar';
import Button from '@mui/material/Button';

import EstablishmentsListings from '../components/cards/EstablishmentsListings';

const styles = {
    paperContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFC95F'
    }
};

class Establishments extends Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     this.fetchCourses();
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.page !== this.state.page) {
    //         //console.log("page", this.state.page)
    //         this.fetchCourses();
    //     }
    // }

    // setSelectedUniversity = (data) => {
    //     this.setState({ selectedUniversity: data })
    // }

    // setSelectedDiscipline = (data) => {
    //     this.setState({ selectedDiscipline: data })
    // }

    // setSearchQuery = (data) => {
    //     // console.log("search: ",data.target.value)
    //     this.setState({ search: data.target.value })
    // }

    // setPage = (data) => {
    //     this.setState({ page: data })
    // }

    // setPageCount = (data) => {
    //     this.setState({ pageCount: data })
    // }

    // setTotal = (data) => {
    //     this.setState({ total: data })
    // }

    // setLoading = (data) => {
    //     this.setState({ loading: data })
    // }

    // getUrlQuery = () => {
    //     let uniFilter = "&university="
    //     for (let i = 0; i < this.state.selectedUniversity.length; i++) {
    //         uniFilter += `${this.state.selectedUniversity[i].value}`;
    //         if (i < this.state.selectedUniversity.length - 1) {
    //             uniFilter += ','
    //         }
    //     }

    //     let disciplineFilter = "&discipline="
    //     for (let i = 0; i < this.state.selectedDiscipline.length; i++) {
    //         disciplineFilter += `${this.state.selectedDiscipline[i].value}`;
    //         if (i < this.state.selectedDiscipline.length - 1) {
    //             disciplineFilter += ','
    //         }
    //     }
    //     return `https://dev.silvi.io/api/undergraduate-programmes?search=${this.state.search}&page=${this.state.page}${uniFilter}${disciplineFilter}`;
    // }

    // resetForm = () => {
    //     this.setState({
    //         ...this.state,
    //         selectedUniversity: [],
    //         selectedDiscipline: [],
    //         search: "",
    //         page: 1,
    //     }, () => {
    //         this.fetchCourses();
    //     })
    // }

    // handleSubmit = () => {
    //     this.setState({
    //         ...this.state,
    //         page: 1,
    //     }, () => {
    //         this.fetchCourses();
    //     })
    // }

    // fetchMe = () => {
    //     axios.get(`https://dev.silvi.io/api/me`,
    //         { withCredentials: true })
    //         .then(response => {
    //             // this.setRiasec_1(response.data.profile.interest_1.name)
    //             // this.setRiasec_2(response.data.profile.interest_2.name)
    //             // this.setRiasec_3(response.data.profile.interest_3.name)

    //             return response.data
    //         })
    //         .catch(error => {
    //             console.error('Error', error);
    //         });
    // }

    // fetchCourses = () => {
    //     const URL = this.getUrlQuery();
    //     axios.get(URL, { withCredentials: true })
    //         .then(response => {
    //             this.setCourses_(response.data.results)
    //             this.fetchMe();
    //             let contentRange = response.headers["content-range"]
    //             let total = contentRange.split("/")[1]
    //             let length = response.data.page_size
    //             const total_page = Math.ceil(total / length)
    //             this.setPageCount(total_page)
    //             this.setTotal(contentRange.split("/")[1])
    //         })
    //         .catch(error =>
    //             console.error('Error', error));
    // }

    render() {
        return (
            <Container fluid mx="3px" id="establishments" >
                <ResponsiveAppBar />

                <div className="flex-container align-content-sm-stretch" id="establishment-header" style={Object.assign({}, styles.paperContainer, { width: "100%", margin: 0, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' })}>
                    <h1 style={{ fontSize: "28px", textAlign: 'center' }}>Canteens</h1>
                    <div className="flex-container align-content-sm-stretch" id="establishment-subheader">
                        <h4 style={{ fontSize: "18px", paddingTop: '23px', paddingBottom: '29px' }}>Satisfy your cravings now!</h4>
                    </div>
                </div>


                {/* <Row>
                            <Col className="col-12 col-md-3">
                                <UniversityFilter
                                    setSelectedUniversity={this.setSelectedUniversity}
                                    selectedUniversity={this.state.selectedUniversity}
                                /></Col>
                            <Col className="col-12 col-md-3">
                                <DisciplineFilter
                                    setSelectedDiscipline={this.setSelectedDiscipline}
                                    selectedDiscipline={this.state.selectedDiscipline}
                                /></Col>
                            <Col className="col-12 col-md-3">
                                <SearchProgrammes
                                    setSearchQuery={this.setSearchQuery}
                                    search={this.state.search}
                                /></Col>
                            <Col className="col-12 col-md-3" style={{ padding: "20px", marginBottom: "1em" }}>
                                <Button className="submit-filter position-absolute bottom-0 end-5 " variant="contained" style={{ marginLeft: "10px", marginRight: "10px", fontSize: "13px" }}
                                    onClick={() => { this.handleSubmit() }}>
                                    Submit
                                </Button>
                                <Button className="submit-filter position-absolute bottom-0 end-0" size="lg" variant="outlined" style={{ marginLeft: "10px", marginRight: "40px", fontSize: "13px" }}
                                    onClick={this.resetForm}>
                                    Reset
                                </Button>
                            </Col>
                        </Row> */}



                <div className= "container">
                    {/* <div className="subtitile">
                        <p style={{ fontSize: "18px", paddingTop: "1em" }}>  <small class="text-muted">Your profile says you are </small><span style={{ fontFamily: "Poppins", fontSize: "17px", fontStyle: "bold", color: "1A2E5A", fontWeight: 400 }}>{this.state.riasec_1},  {this.state.riasec_2}, {this.state.riasec_3}</span>! </p>
                        <p style={{ fontSize: "13px", textAlign: "center", marginBottom: 0 }}>These are some recommended undergraduate programmes you might be interested in. Click details to explore and learn more about the education with us!</p>
                    </div> */}

                    <EstablishmentsListings />

                    {/* <ProgrammeListings
                        selectedUniversity={this.state.selectedUniversity}
                        selectedDiscipline={this.state.selectedDiscipline}
                        search={this.state.search}
                        courses_={this.state.courses_}
                        setCourses_={this.setCourses_}
                        page={this.state.page}
                        setPage={this.setPage}
                        pageCount={this.state.pageCount}
                    /> */}
                </div>
            </Container>
        )
    }
}

export default Establishments;