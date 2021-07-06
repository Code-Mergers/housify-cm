import React from 'react';
import { auth } from '../../firebase/firebase'
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import "./styles.css";

const CardUI = props => {

    return (
        <div className="card shadow container cardContainer">

            <div className="overflow cardImg">
                <img src={props.info[1].imageurl}
                    alt= {"image" + props.i }
                    className="card-img-top"
                    height="250px"
                />
            </div>

            <hr/>

            <div className="card-body text-dark text-center cardBody">
                <p className ="card-text text-secondary text-left" style={{ padding: "0 1.5rem" }}>
                <h2 className="card-title text-center titleText">{props.info[1].name}</h2>
                    <div className="cardBodyText">
                        <strong>Location: </strong>{props.info[1].location}
                        <br />
                        <strong>Owner: </strong>{props.info[1].author.name}
                        <br />
                        <strong>Area: </strong>{props.info[1].area + " sq ft"}
                        <br />
                        <strong>BHK: </strong>{props.info[1].bhk + " "}
                        <br/>
                        <strong> Bath Room(s): </strong>{props.info[1].bathroom}
                        <br />
                        <strong>Price (Lakhs): </strong>{props.info[1].price}
                        <br />
                        <strong>Date: </strong>{props.info[1].date}
                        <br />
                    </div>
                </p>
                {
                    props.info[1].sold ? 
                    <p className="btn btn-outline disabled cardBtn1">Sold</p>
                    :
                    <Link to={ auth.currentUser === null ? routes.SIGN_IN : ("/buyer/" + props.info[0])}
                        className="btn btn-primary cardBtn2">
                        Buy
                    </Link>
                }
            </div>

        </div>
    )
}

export default CardUI;
