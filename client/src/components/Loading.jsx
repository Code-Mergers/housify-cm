import React,{ Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashLoader } from "react-spinners";

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({ duration: 1000 });

class Loading extends Component {

    state={
        title: "Gathering Information...", 
        text: "",
        index: 0
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.text === this.state.title) this.setState({ text: "" })
            this.setState({
                text: (this.state.text + this.state.title[this.state.index]),
                index: ((this.state.index + 1)%this.state.title.length)
            })
        }, 100)
    }

    render() {
        return  <div className="load" style={{ marginTop: "5vh", width: "100%", height: "100vh"}}
                    data-aos="zoom-in"
                >
                   <HashLoader
                    color={"#007bff"} 
                    size={100} style={{ width: "100%", height: "100%"}} />
                    <br />
                    <h3 style={{ transitionDuration: "0.1s" }}  className="main-margin-top">
                        {this.state.text}
                    </h3>
                </div>
    }
}

export default Loading;
