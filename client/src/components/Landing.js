import React , { Component } from 'react';
import Navigation from "./Navigation";
import { MainBanner2 } from "./Banner";
import Footer from "./Footer";
import Cards from "./card/Cards";

const INITIAL_STATE = {
  error: null
};

class Landing extends Component {
  state = { ...INITIAL_STATE }


  render() {
    return (
      <div className="App">
       <div>
          <Navigation />
          <MainBanner2 />
          <div>
            <div className="cards_together">
              <Cards/>
            </div>
          </div>
          <Footer/>
        </div>
      </div>    
    );
  }
}
  
export default Landing;
