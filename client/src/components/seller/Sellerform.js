import React, {Component} from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Navigation from '../Navigation';
import { Button, Form, InputGroup } from "react-bootstrap";
import Footer, { getFullLocalTime } from '../Footer';
import { db, storage, auth } from '../../firebase/firebase';
import Axios from 'axios';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import loc from './location.js';
import { Container } from "@material-ui/core";

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
});

const INITIAL_STATE = {
    name: "",
    userInfo: "",
    bhk: "",
    area: "",
    location: "",
    price: "",
    bathroom: "",
    text: "",
    image: null,
    imageLoadStatus: 0,
    styleUpload: { width: "120px" },
    message: "Upload Image of Property"
};

class SellerForm extends Component {
 
    state = {
        ...INITIAL_STATE
    }
  
    onSubmit = event => {
        db.ref('users/'+ auth.currentUser.uid).once('value').then(snapshot => {
            this.setState({
                userInfo: snapshot.val()
            })
        })

        if (this.state.image) {
            const imageRef = storage.ref('/properties/' + (new Date().getTime() + this.state.image.name));
            const upload = imageRef.put( this.state.image );

            upload.on('state_changed', snapshot => {
                this.setState({ message: "Uploading: " + (Math.round((snapshot.bytesTransferred / snapshot.totalBytes), 2) * 100) + "%" })
                
                }, (error) => {
                    alert("Error in uploading time, try again.");
                    this.setState({ imageLoadStatus: 0, image: null ,
                        styleUpload: { width: "120px" },
                        message: "Upload Image of Property"})
                
                }, () => {
                    upload.snapshot.ref.getDownloadURL().then((url)=> {
                        db.ref('properties').push().set({
                                name: this.state.name,
                                author: this.state.userInfo,
                                location: this.state.location,
                                area: this.state.area,
                                bhk: this.state.bhk,
                                bathroom: this.state.bathroom,
                                price: this.state.price,
                                text: this.state.text,
                                date: getFullLocalTime(),
                                imageurl: url,
                                sold: false
                        })
                        .then(()=> {
                            alert("Your property is recorded.\nThank you for supporting us.");
                            this.setState({ ...INITIAL_STATE });
                        })
                        .catch(e =>{
                            alert(e.message);
                        });
                    })
                }
            )    
        } else {
            alert("Please Upload Image of Property.");
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
            this.setState({ image: null, styleUpload: { width: "120px" }, message: "Upload Image of Property" });
        }
    };

    render() {
        console.log(this.state);
        const { classes } = this.props;
        const isInvalid = this.state.area === "" ||
        this.state.image === null ||
        this.state.bhk === "" ||
        this.state.location === "" ||
        this.state.price === "" ||
        this.state.text === "" ||
        this.state.text.length >= 200 ||
        this.state.bathroom === "";
        const isInvalid2 = this.state.area === "" ||
        this.state.bhk === "" ||
        this.state.location === "" ||
        this.state.bathroom === "";
        return (
		    <>
                <Navigation />
                    <Container className="main-margin-top" component="main" maxWidth="xs">
                        <CssBaseline/>
                        <div className={classes.paper}>
                            <h2 id="mytexth2">Enlist Property</h2>
                            <p>Please fill in all the fields before submitting</p>
                            <br/>
                            <form className={classes.form} onSubmit={e => this.onSubmit(e)}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Property Name"
                                    name="text"
                                    autoComplete="off"
                                    autoFocus
                                    onChange={e =>
                                        this.setState(byPropKey("name", e.target.value))
                                    }
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="area"
                                    label="Area"
                                    name="text"
                                    autoComplete="off"
                                    onChange={e =>
                                        this.setState(byPropKey("area", e.target.value))
                                    }
                                />
                                <InputGroup className="inputtext">
                                    <Form.Label className="inputlabel">BHK: </Form.Label>
                                    <Form.Check
                                        className="inputradio"
                                        label="1"
                                        type="radio"
                                        name="myRadio"
                                        value="1"
                                        onChange={e => this.setState(byPropKey("bhk", e.target.value))}
                                    />
                                    <Form.Check
                                        className="inputradio"
                                        label="2"
                                        type="radio"
                                        name="myRadio"
                                        value="2"
                                        onChange={e => this.setState(byPropKey("bhk", e.target.value))}
                                    />
                                    <Form.Check
                                        className="inputradio"
                                        label="3"
                                        type="radio"
                                        name="myRadio"
                                        value="3"
                                        onChange={e => this.setState(byPropKey("bhk", e.target.value))}
                                    />
                                    <Form.Check
                                        className="inputradio"
                                        label="4"
                                        type="radio"
                                        name="myRadio"
                                        value="4"
                                        onChange={e => this.setState(byPropKey("bhk", e.target.value))}
                                    />
                                    <Form.Check
                                        className="inputradio"
                                        label="5"
                                        type="radio"
                                        name="myRadio"
                                        value="5"
                                        onChange={e => this.setState(byPropKey("bhk", e.target.value))}
                                    />
                                    </InputGroup>
                                    <br/>
                                    <InputGroup className="inputtext">
                                    <Form.Label className="inputlabel">Bath: </Form.Label>
                                    <Form.Check
                                        className="inputradio"
                                        label="1"
                                        type="radio"
                                        name="myRadio2"
                                        value="1"
                                        onChange={e => this.setState(byPropKey("bathroom", e.target.value))}
                                    />
                                    <Form.Check
                                        className="inputradio"
                                        label="2"
                                        type="radio"
                                        name="myRadio2"
                                        value="2"
                                        onChange={e => this.setState(byPropKey("bathroom", e.target.value))}
                                        />
                                    <Form.Check
                                        className="inputradio"
                                        label="3"
                                        type="radio"
                                        name="myRadio2"
                                        value="3"
                                        onChange={e => this.setState(byPropKey("bathroom", e.target.value))}
                                        />
                                    <Form.Check
                                        className="inputradio"
                                        label="4"
                                        type="radio"
                                        name="myRadio2"
                                        value="4"
                                        onChange={e => this.setState(byPropKey("bathroom", e.target.value))}
                                    />
                                    <Form.Check
                                        className="inputradio"
                                        label="5"
                                        type="radio"
                                        name="myRadio2"
                                        value="5"
                                        onChange={e => this.setState(byPropKey("bathroom", e.target.value))}
                                    />
                                    </InputGroup>
                                <div className={classes.formControl}>
                                    <div>
                                        <Typography className={classes.locationTag}>
                                            Select Location :
                                        </Typography>
                                    </div>
                                    <div>
                                    <FormControl
                                        className={classes.formSelect}>
                                            
                                        <InputLabel>Locations</InputLabel>
                                        <Select
                                        onChange={e => this.setState(byPropKey("location", e.target.value))}
                                        style={{minWidth:'120px'}}>
                                            {loc.map((val, index ) =>  
                                            <MenuItem
                                            key={index} 
                                            
                                            value={val}>{val}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    </div>
                                </div>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="textComment"
                                    label="Describe Property... (Max 200 chars)"
                                    name="text"
                                    autoComplete="off"
                                    multiline
                                    rows={4}
                                    inputProps={{ maxLength: 200 }}
                                    onChange={event =>
                                        this.setState({ text: event.target.value })
                                    }
                                >
                                </TextField>
                                <center>
                                <div className="custom-file" style={{
                                    margin: "10px 0", width: "100%" }}>
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
                                </center>
                                <br/>
                                <div className="text-center">
                                <Button disabled={isInvalid2} onClick={()=>{
                                    let bodyFormData = new FormData();
                                    bodyFormData.append('total_sqft', Number(this.state.area));
                                    bodyFormData.append('location',this.state.location); 
                                    bodyFormData.append('bhk',Number(this.state.bhk)); 
                                    bodyFormData.append('bath',Number(this.state.bathroom)); 
                                    Axios({
                                        method: "post",
                                        url: "http://127.0.0.1:5000/predict_home_price",
                                        data: bodyFormData,
                                        headers: { "Content-Type": "multipart/form-data" },
                                    })
                                    .then((response) => {
                                    //handle success
                                    this.setState({price: response.data.estimated_price})
                                    })
                                    .catch((response) =>{
                                    //handle error
                                    console.log(response);
                                    });
                                }} type="button" id="mybutton">
                                    Predict Price
                                </Button>
                                </div>
                                <br/>
                                <InputGroup>
                                    <InputGroup.Prepend className="inputlabel">Price(Lakhs): </InputGroup.Prepend>
                                    <Form.Control
                                        id="inputtext"
                                            type="type"
                                        name="password"
                                        placeholder="Estimated Price"
                                        value={this.state.price}
                                        required
                                        onChange={e =>
                                        this.setState(byPropKey("price", e.target.value))
                                        }
                                    />
                                </InputGroup>
                                <br/>
                                <div className="text-center">
                                    <Button disabled={isInvalid} type="submit" id="mybutton">
                                        Enlist Details
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Container>
                    <br/>
                <Footer />
	         </>
        );
    }


    submitData = e => {

    };
}

export default withStyles(styles)(SellerForm);
