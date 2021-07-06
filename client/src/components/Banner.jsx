import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({ duration: 1000 });

const MainBanner = () => (
    <Container style={{marginTop: "120px", marginBottom: "20px"}}
    data-aos="fade-in"
    data-aos-duration="2000"
    className="main-banner">
        <Row>
            <Col lg={{ span: 5 }} id="banner-left">
                <Link to={routes.LANDING}>
                    <img src="/banner-logo.jpg" alt="Brand Logo" height={"100px"} />
                </Link>
            </Col>
            <Col lg={{ span: 7 }} id="banner-right" style={{
                margin: "auto 0"
            }}>
                <img src="/banner-logo-title.jpg" alt="Brand Logo Title" height={"70px"} />
            </Col>
        </Row>
    </Container>
);

export const MainBanner2 = () => (
    <Container style={{marginTop: "120px", marginBottom: "20px"}} className="main-banner">
        <Row>
            <Col lg={{ span: 4 }} data-aos="slide-right" id="banner-left" style={{
                margin: "auto 0"
            }} >
                <Link to={routes.LANDING}>
                    <img src="/banner-logo.jpg" alt="Brand Logo" height={"160px"}  />
                </Link>
            </Col>
            <Col lg={{ span: 8 }} data-aos="zoom-in" id="banner-right">
                <p style={{ textAlign: "left", fontFamily:"sans-serif",
                 padding: "0.7rem", color: "#314e7b", fontSize: "1.1rem"
                }}>
                Welcome to Housify, your one-stop destination for selling and buying houses. Be it a luxurious farmhouse or a small cottage, you can buy and sell every type of property, here at Housify. With intelligent price prediction for your property, we try our best to ensure that not only do the sellers get the best value for their properties but also the buyers get the best value out of their money. What more?? You can also set your custom price if you don't prefer the price suggested by Housify.   
                <br />
                So what are you waiting for, try Housify right now.
                </p>    
            </Col>
        </Row>
    </Container>
);

export default MainBanner;