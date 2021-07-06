import React, { Component } from 'react';
import { db, storage } from '../firebase/firebase';

import { Button, Form , InputGroup, Container } from 'react-bootstrap';

import MainBanner from "./Banner";
import Navigation from './Navigation';
import Footer, { getFullLocalTime } from './Footer';

const IssuePage = () => (
    <div>
      <Navigation />
      <div className="div-flex">
        <MainBanner />
        <hr/>
        <center>
          <IssuePageBase />
        </center>
        <Footer />
      </div>
    </div>
);

const INITIAL_STATE = {
    text: "",
    image: null,
    imageLoadStatus: 0,
    styleUpload: { width: "120px" },
    message: "Please provide Image/Screenshot"
};

class IssuePageBase extends Component {
    state = {  ...INITIAL_STATE  }

    onSubmit = event => {

            if (this.state.image) {
                console.log(this.state.image);
                const imageRef = storage.ref('/issue/' + ( new Date().getTime() + this.state.image.name));
                const upload = imageRef.put( this.state.image );

                upload.on('state_changed', snapshot => {
                    this.setState({ message: "Uploading: " + (Math.round((snapshot.bytesTransferred / snapshot.totalBytes), 2) * 100) + "%" })
                    
                    }, (error) => {
                        alert("Error in uploading time, try again.");
                        this.setState({ imageLoadStatus: 0, image: null ,
                            styleUpload: { width: "120px" },
                            message: "Please provide Image/Screenshot"})
                    
                    }, () => {
                        upload.snapshot.ref.getDownloadURL().then((url)=> {

                            db.ref('issues').push().set({
                                issue: {
                                    text: this.state.text,
                                    date: getFullLocalTime(),
                                    url: url
                                }
                            })
                            .then(()=> {
                                alert("Your issues have been reported to us.\nWe will definitely work on this.\nThank you for supporting us.");
                                this.setState({ ...INITIAL_STATE });
                            })
                            .catch(e =>{
                                alert(e.message);
                            });
                        })
                    }
                )    
            } else {
                alert("Please upload screenshot of your issue.");
            }
        event.preventDefault();
    }

    onImageChange(e) {
        const reader = new FileReader();
        let file = e.target.files[0]; // get the supplied file
        // if there is a file, set image to that file
        if (file) {
          reader.onload = () => {
            if (reader.readyState === 2) {
              this.setState({ image: file, styleUpload: { width: "auto" }, message: "Image selected"});
            }
          };
          reader.readAsDataURL(e.target.files[0]);
        // if there is no file, set image back to null
        } else {
            this.setState({ image: null, styleUpload: { width: "120px" }, message: "Please provide Image/Screenshot" });
        }
      };

    render() {
        const { text, image } = this.state;
        const Invalid = text === "" || image === null ;
        return (<div className="main-input-class">
                <Container >
                    <h2 id="main-h2">Report an Issue</h2>
                    <Form onSubmit={this.onSubmit} style={{ margin: "30px 0 60px 0" }}>
                        <InputGroup>
                            <Form.Control
                            as="textarea"
                            id="chat-text-area"
                            placeholder=" Write your issue here"
                            value={text}
                            required
                            onChange={event =>
                                this.setState({ text: event.target.value })
                            }
                            style={{ height: "200px" }}
                            />
                        </InputGroup>
                        <div className="custom-file" style={{
                            margin: "40px 0", width: "100%" }}>
                            
                            <p>{this.state.message}</p>
                            <label className="custom-file-upload" for="customFile" id="upload-input"
                                style={this.state.styleUpload}
                            >
                                
                                { this.state.image === null ? 
                                    <i className="fa fa-cloud-upload" /> : <p>{this.state.image.name}</p> }
                                    <input type="file" className="custom-file-input " id="customFile"
                                    onChange={event => this.onImageChange(event) }
                                    accept="image/x-png,image/jpeg,image/jpg"
                                    />
                            </label>
                        </div>
                        <br/>
                        <div className="text-center">
                            <Button disabled={Invalid} type="submit" id="main-button">
                                Send Issue
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default IssuePage;