import React from 'react';
import {Link} from 'react-router-dom';
import './error.css';

function Error () {
        return (
            <div className="error_wrapper">
                <h1 className="error_number">404</h1>
                <i className="fa-solid fa-circle-exclamation"></i>
                <h2 className= "error_description">Not found</h2>
                <Link className = "error-link" to="/">Retour vers la page d'accueil</Link>
            </div>
        );
    }
export default Error;