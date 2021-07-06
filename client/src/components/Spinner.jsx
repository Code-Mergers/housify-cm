import React from "react";
import { Spinner, Container } from "react-bootstrap";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({ duration: 1000 });

const SpinnerLoad = () => (
    <Container style={{margin: "20vh auto 30vh auto", textAlign: "center"}}>
        <Spinner animation="border" variant="primary" />
    </Container>
);


export default SpinnerLoad;