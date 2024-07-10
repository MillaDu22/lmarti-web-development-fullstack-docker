import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
    return(
        <div className="container-footer">
            <Link className="about" to="/about">©Ludmilla-Marti-2024</Link>
            <a className= "mailto" href="mailto:marti.ludmilla@orange.fr">- Contact -</a>
        </div>
    )
}
export default Footer;