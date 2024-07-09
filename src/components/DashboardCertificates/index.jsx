import React, {useEffect, useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import Navbar from "../Navbar/index";
import VerticalNavbar from '../VerticalNavbar/index';
import './dashboardCertificates.css';

function DashboardCertificates({id}) {
    const [certificates, setCertificates] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Mets à jour la liste des certificats lorsque la page est montée //
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const response = await axios.get('https://marti.alwaysdata.net/api/certificat');
            setCertificates(response.data);
        } catch (error) {
            console.error('Error fetching certificates:', error);
        }
    };

    // Récupére les paramètres de requête de l'URL //
    const searchParams = new URLSearchParams(location.search);
    const newCertificateId = searchParams.get('newCertificateId');

    useEffect(() => {
        // Si un nouvel identifiant de certificat est présent dans les paramètres de requête, ajoute le nouveau certificat à la liste des certificats //
        if (newCertificateId) {
            fetchCertificates(); // Rafraîchi la liste des certificats depuis le serveur //
        }
    }, [newCertificateId]);

    return (
        <section className = "container-dashboard">
            <Navbar />
            <div className = "row-vertical-list">
                <VerticalNavbar />
                <div className ="title-btn-list">
                    <div className= "title-btn">
                        <h4 className="title-list">Certificates</h4>
                        <Link className="link-add" to="/addcertificatform">Add+</Link>
                    </div>
                    <div className="list">
                        {certificates.map((certificate) => (
                            <Link to= {`/editcertificatform/${certificate._id}`} key={certificate._id} className="rows-list">
                                <span className="id">{certificate.id}</span>
                                <span className="name">{certificate.description}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div> 
        </section>
    );
}

export default DashboardCertificates;
