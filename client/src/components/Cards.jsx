import React, { Component } from 'react';
import Card from './CardUI';
import Loading from './Loading';
import { db } from '../firebase/firebase'

class Cards extends Component{

    state={
        load: false,
        properties: null
    }     
    componentWillMount() {   
        db.ref('properties').once('value').then(snapshot => {
            this.setState({
                properties: Object.entries(snapshot.val()),
            })
            // console.log(Object.entries(snapshot.val()));
            this.loadFinish(); 
        })
        
    }

    loadFinish() {
        setTimeout(() => {
            this.setState({
                load: true
            })
        }, 3000)
    }

    render(){
        return(<>
                {
                    this.state.load ?(
                        <div className="container-fluid d-flex justify-content-center ">
                            <div className="row">
                                {this.state.properties.map((oneCard, index) => 
                                    <div className="col-md-4 individual_card" >
                                        <Card   key={oneCard.id}
                                                i={index}
                                                info={oneCard} />
                                    </div>)
                                }
                            </div>
                        </div>
                    )
                    :
                    <Loading />
                }
            </>
        );
    }
}

export default Cards;
