import React, { Component } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { db } from '../../firebase/firebase';
import SpinnerLoad from '../Spinner';
import { Container, Row, Col } from 'react-bootstrap';
import './styles.css'

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
                <div className="headingText">
                    <h2 id="mytexth2" >Buy Property</h2>
                </div>
              <br />
              {
                this.state.load ?
                  <div className="card shadow">
                    <div className="overflow buyerImg">
                        <img src={this.state.property.imageurl}
                            alt="image"
                            className="card-img-top"
                            width="100%"
                            height="700px"
                        />
                    </div>
                    <div className="card-body text-dark text-center">
                        <p className="card-text text-left"
                            style={{ padding: "0 2rem", fontSize: "1.2rem", textIndent: "3rem" }}>
                            <br />
                            <div className="rowCol">
                                <Row>
                                    <Col lg={{ snap: "6" }} className="col1">
                                        <h3>Details</h3>
                                        <strong>Name: </strong>{this.state.property.name}
                                        <br />
                                        <strong>Location: </strong>{this.state.property.location}
                                        <br />
                                        <strong>BHK: </strong>{this.state.property.bhk + " "}
                                        <br/>
                                        <strong> Bath: </strong>{this.state.property.bathroom}
                                        <br />
                                        <br />
                                    </Col>
                                    <br />
                                    <Col lg={{ snap: "6" }} className="col2">
                                        <h3>Owner</h3>
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
                                <h5 className="areaText"> Area : {this.state.property.area} sq ft.</h5>
                            </div>
                            <div className="commentText">
                                <h5 >Comments : {this.state.property.text}</h5>
                                <h3>Price: {this.state.property.price + " L"}</h3>
                            </div>
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
