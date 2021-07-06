import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import SignOutButton from './SignOut';
import { auth } from '../firebase/firebase';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { Component } from 'react';
AOS.init({ duration: 1000 });

class Navigation extends Component {
  
  state={
    scroll: false,
    prev: 0
  }

  constructor(props) {
    super(props);
    window.addEventListener('scroll', () => {
      this.setState({ prev: window.scrollY, scroll: true })
      setTimeout(() => {
        if (this.state.prev === window.scrollY)  this.setState({ scroll: false })
      }, 100)
    })
  }

  render(){
    return (
        <div data-aos="slide-down" style={{position: "fixed", top: "0", width: "100%", zIndex: "99"}}>
          <Navbar className="header" collapseOnSelect expand="lg" bg="primary" variant="dark"
          style={{ boxShadow: (this.state.scroll ? "0px 5px 5px rgba(0,0,0,0.5)" : "none" ),
          transitionDuration: "0.4s"
          }}
          >
            <Navbar.Brand><Link to={routes.LANDING}><Button id="mylogo">Housify</Button></Link></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link>
                      <Link to={ auth.currentUser === null ? routes.SIGN_IN : routes.SELLER }
                      style={{ color: "white" }}
                      >
                        <Button id="nav-button">
                        Enlist Property
                      </Button>
                      </Link>
                  </Nav.Link>
                  <Nav.Link>
                      <Link to={ routes.ISSUE }
                      style={{ color: "white" }}
                      >
                        <Button id="nav-button">
                          Report an Issue
                        </Button>
                      </Link>
                  </Nav.Link>
                  <Nav.Link href="#ourfooter">
                    <Button id="nav-button">
                      Feedback
                    </Button>
                  </Nav.Link>
                </Nav>
                {
                  auth.currentUser === null ?(
                  <Nav>
                    <Nav.Link>
                      <Link to={routes.SIGN_IN} style={{color: "white"}} >
                        <Button id="nav-button">SignIn/SignUp</Button>
                        </Link>
                    </Nav.Link>
                  </Nav>):
                  (<Nav>
                    <Nav.Link>
                      <Link to={routes.ACCOUNT} style={{color: "white"}}>
                        <Button id="nav-button">Profile</Button>
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <SignOutButton />
                    </Nav.Link>
                  </Nav>
                  ) 
                }                
              </Navbar.Collapse>
          </Navbar>
        </div>
    )}
}

export default Navigation;
