import React from 'react';
import { auth } from '../firebase/firebase'
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";

const CardUI = props => {
    return (
        <div className="card shadow">
            <div className="overflow">
                <img src={props.info[1].imageurl}
                    alt= {"image" + props.i }
                    className="card-img-top"
                    height="250px"
                />
            </div>
            <div className="card-body text-dark text-center">
                <p className ="card-text text-secondary text-left" style={{ padding: "0 1.5rem" }}>
                <h2 className="card-title text-center">{props.info[1].name}</h2>
                    <strong>Location: </strong>{props.info[1].location}
                    <br />
                    <strong>Owner: </strong>{props.info[1].author.name}
                    <br />
                    <strong>Area: </strong>{props.info[1].area + " sq ft"}
                    <br />
                    <strong>BHK: </strong>{props.info[1].bhk + " "}
                    <strong> Bath: </strong>{props.info[1].bathroom}
                    <br />
                    <strong>Price: </strong>{props.info[1].price}
                    <br />
                    <strong>Date: </strong>{props.info[1].date}
                    <br />
                </p>
                {
                    props.info[1].sold ? 
                    <p className="btn btn-primary disabled">Sold</p>
                    :
                    <Link to={ auth.currentUser === null ? routes.SIGN_IN : ("/buyer/" + props.info[0])}
                        className="btn btn-outline-primary">
                        Buy
                    </Link>
                }
            </div>
        </div>
    )
}

export default CardUI;
