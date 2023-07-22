import React, { Component } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';





class Header extends Component {
    render() {
        return (
            <Container fluid mx="3px" id="courses" style={{ width: "100%", margin: 0, padding: 0 }}>
                <ResponsiveAppBar />
                <div className="flex-container" id="course-header">
                    <h1 style={{ fontSize: "25px" }}>Undergraduate Programmes Comparison</h1>
                    <div className="course-subheader" style={{ backgroundColor: "transparent" }}>
                        <h4 style={{ fontSize: "18px", fontFamily: "Poppins Light" }}>Your choice matters</h4>
                    </div>
                </div>
            </Container>
        )
    }
}

export default Header;