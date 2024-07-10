import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar/index";
import VerticalNavbar from '../VerticalNavbar/index';
import './dashboardCvs.css';

function DashboardCvs({id}) {
    const [cvs, setCvs] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Mets à jour la liste des projets lorsque la page est montée //
        fetchCvs();
    }, []);

    const fetchCvs = async () => {
        try {
            const response = await axios.get('https://marti.alwaysdata.net/api/cv');
            setCvs(response.data);
        } catch (error) {
            console.error('Error fetching cvs:', error);
        }
    };

    // Récupére les paramètres de requête de l'URL //
    const searchParams = new URLSearchParams(location.search);
    const newCvId = searchParams.get('newCvId');

    useEffect(() => {
        // Si un nouvel identifiant de cv est présent dans les paramètres de requête, ajoute le nouveau cv à la liste des cvs //
        if (newCvId) {
            fetchCvs(); // Rafraîchi la liste des cvs depuis le serveur //
        }
    }, [newCvId]);

    return (
        <section className = "container-dashboard">
            <Navbar />
            <div className = "row-vertical-list">
                <VerticalNavbar />
                <div className ="title-btn-list">
                    <div className= "title-btn">
                        <h4 className="title-list">Cvs</h4>
                        <Link className="link-add" to="/addcvform">Add+</Link>
                    </div>
                    <div className="list">
                        {cvs.map((cv) => (
                            <Link to= {`/editcvform/${cv._id}`} key={cv._id} className="rows-list">
                                <span className="id">{cv.id}</span>
                                <span className="name">{cv.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>  
        </section>
    );
}

export default DashboardCvs;

