import React from "react";
import "./verticalNavbar.css";
import {Link} from "react-router-dom";

function VerticalNavbar() {
    return (
        <div className="vertical-menu">
            <nav className= "vertical-nav">
                <Link className = "vertical-link active" to="/dashboardprojects">Projects</Link>
                <Link className = "vertical-link" to="/dashboardcertificates">Certificates</Link>
                <Link className = "vertical-link" to="/dashboardcvs">Cvs</Link>
            </nav>
        </div>
    )
}
export default VerticalNavbar;