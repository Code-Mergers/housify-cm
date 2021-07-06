import React, { Component } from 'react';
import { db } from '../firebase/firebase';
import { Button, Form , InputGroup } from 'react-bootstrap';

export function getFullLocalTime() {
    const d = new Date();
    return d.toLocaleTimeString() + " " + d.toLocaleDateString();
}

class Footer extends Component {
    state = {feedback: ""}

    onSubmit = event => {
        const { feedback } = this.state;
            db.ref('feedbacks').push().set({ feedback: feedback })
            .then(()=> {
                alert("Thank you so much for taking the time to send us your valuable feedback!");
                this.setState({ feedback: "" });
            })
            .catch(e =>{
                alert(e.message);
            });
            event.preventDefault();
    }

    render() {
        const { feedback } = this.state;
        const Invalid = feedback === "";
        return (<div id="ourfooter">
            <br/>
            <footer>
                <div class="container-foot">
                    <section class="ft-main">
                        <div class="ft-main-item">
                        <h2 class="ft-title">ABOUT</h2>
                        <p className="main-p" style={{color: "white"}}>
                            <a href="https://github.com/Code-Mergers" 
                            target="_blank" rel="noreferrer"> Code Mergers </a>
                            - a group
                            <br />
                            of MERN Stack developers.
                            <br />
                            Reacting with code.
                        </p>
                        </div>
                        <div class="ft-main-item">
                        <h2 class="ft-title">CONTACT | TEMPLATE</h2>
                        <ul>
                            <li><a href="mailto:codemergers.org@gmail.com" target="_blank"  rel="noreferrer">Mail us</a></li>
                            <li><a href="https://github.com/Code-Mergers" target="_blank" rel="noreferrer">Code Mergers</a></li>
                            <li><a href="https://github.com/Code-Mergers/UI-Auth-Template-Using-React" target="_blank" rel="noreferrer">Use this Template</a></li>
                        </ul>
                        </div>
                        <div id="ourfeedback" class="ft-main-item">
                            <h2 class="ft-title">FEEDBACK</h2>
                            <p style={{color: "white", margin: "0 0 0.3rem 0"}}>Send your valuable feedback</p>
                            <Form onSubmit={this.onSubmit}>
                                <InputGroup style={{width: "75%"}}>
                                    <Form.Control id="feedbackstyletext" type="textarea" name="feedback" placeholder=" Enter your feedback"
                                    value={feedback}
                                    onChange={(e)=> this.setState({feedback: e.target.value})
                                    }/>
                                </InputGroup>
                                <Button id="feedbackstylebutton" type="submit" disabled={Invalid}>Send</Button>
                            </Form>
                        </div>
                    </section>
                    <section class="ft-social">
                        <ul class="ft-social-list">
                        <li><a href="https://www.linkedin.com/in/code-mergers-000674216/" target="_blank" rel="noreferrer"><i class="fa fa-linkedin-square"></i></a></li>
                            <li><a href="https://github.com/Code-Mergers" target="_blank" rel="noreferrer"><i class="fa fa-github"></i></a></li>
                            <li><a href="mailto:codemergers.org@gmail.com" target="_blank" rel="noreferrer"><i class="fa fa-envelope"></i></a></li>
                            <li><a href="https://twitter.com/CMergers" target="_blank" rel="noreferrer"><i class="fa fa-twitter"></i></a></li>
                            <li><a href="https://www.facebook.com/profile.php?id=100070570321423" target="_blank" rel="noreferrer"><i class="fa fa-facebook-square" target="_blank"></i></a></li>
                        </ul>
                    </section>
                    <section class="ft-legal">
                        <center>
                            <span style={{ color: "grey" }}>&copy; 2021 Copyright Code Mergers</span>
                        </center>
                    </section>
                </div>
            </footer>
        </div>);
    }
    
}

export default Footer;