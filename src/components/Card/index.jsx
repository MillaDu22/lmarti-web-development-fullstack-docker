import React from "react";
import "./card.scss";
import { Link } from "react-router-dom";

function Card({ id, cover, alt, title, informations, size }) {
    return (
        <div className={`card ${size}`}>
            <Link to={`/project/${id}`} className="card-link">
                <img src={cover} alt={alt} className="card-image" />
                <div className="card-details">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-info">{informations}</p>
                </div>
            </Link>
        </div>
    );
}

export default Card;

