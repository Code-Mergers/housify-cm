import React, { Component } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { db } from '../firebase/firebase';
import SpinnerLoad from './Spinner';
import { Container, Row, Col } from 'react-bootstrap';
class BuyerForm extends Component {

  state={
    load: false,
    property: null
  }
 
  componentWillMount() {   
      db.ref('properties/' + this.props.match.params.id).once('value').then(snapshot => {
          if (snapshot.val() !== null)
            this.setState({
                property: snapshot.val(),
            })
          this.loadFinish();
      })
  }

  loadFinish() {
    setTimeout(() => {
        this.setState({
            load: true
        })
    }, 1000)
  }

  render() {
    return (
      <>
        <Navigation />
          <Container style={{marginTop: "120px"}}>
            <center> 
              <h2 id="mytexth2">Buy Property</h2>
              <br />
              {
                this.state.load ?
                  <div className="card shadow">
                    <div className="overflow">
                        <img src={this.state.property.imageurl}
                            alt="image"
                            className="card-img-top"
                            width="100%"
                        />
                    </div>
                    <div className="card-body text-dark text-center">
                        <p className="card-text text-left" 
                            style={{ padding: "0 2rem", fontSize: "1.2rem", textIndent: "3rem" }}>
                            {this.state.property.text}
                            <br />
                            <Row
                            style={{ padding: "1.5rem"}}
                            >
                              <Col lg={{ snap: "6" }}>
                                <h4>Details</h4>
                                <strong>Name: </strong>{this.state.property.name}
                                <br />
                                <strong>Location: </strong>{this.state.property.location}
                                <br />
                                <strong>BHK: </strong>{this.state.property.bhk + " "}
                                <strong> Bath: </strong>{this.state.property.bathroom}
                                <br />
                                <strong>Area: </strong>{this.state.property.area + " sq ft"}
                                <br />
                                <strong>Price: </strong>{this.state.property.price + " L"}
                                <br />
                              </Col>
                              <br />
                              <Col lg={{ snap: "6" }}>
                                <h4>Owner</h4>
                                <strong>Name: </strong>{this.state.property.author.name}
                                <br />
                                <strong>Email: </strong>{this.state.property.author.email}
                                <br />
                                <strong>Phone: </strong>{this.state.property.author.phone}
                                <br />
                                <strong>Date: </strong>{this.state.property.date}
                                <br />   
                              </Col>
                            </Row>                         
                        </p>
                        {
                          this.state.property.sold ? 
                          <p className="btn btn-primary disabled">Sold</p>
                          :
                          <button className="btn btn-outline-primary" onClick={() => {
                            this.setState({
                              property: {
                                ...this.state.property,
                                sold: true
                              }
                            });
                            db.ref('properties/' + this.props.match.params.id).set(
                              {
                                ...this.state.property,
                                sold: true
                              }
                            )
                            alert("Congratulations!! you have got this property");
                          }}>Buy</button>
                        }
                    </div>
                </div>
                :
                <SpinnerLoad />
              }
            </center> 
          </Container>
          <br />
          <hr />
        <Footer />
      </>
    )
  }
  
}

export default BuyerForm;
