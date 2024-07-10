import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';

function Navbar() {

    const [cvs, setCvs] = useState([]);
    const location = useLocation();
    const [url, setUrl] = useState(null);


    useEffect(() => {
        fetchCvs();
    }, []);
    const fetchCvs = async () => {
        try {
            const response = await axios.get('https://marti.alwaysdata.net/api/cv');
            setCvs(response.data);
            if (response.data.length > 0) {
                setUrl(response.data[0].url); 
            }
        } catch (error) {
            console.error("Error fetching the PDF URL:", error);
        };
    }
    useEffect(() => {
        // Récupére les paramètres de requête de l'URL //
        const searchParams = new URLSearchParams(location.search);
        const newCvId = searchParams.get('newCvId')

        // Si un nouvel identifiant de projet est présent dans les paramètres de requête, ajoute le nouveau projet à la liste des projets //
        if (newCvId) {
            fetchCvs(); // Rafraîchi la liste des projets depuis le serveur //
        }
    }, [location.search]);

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Met à jour l'état en fonction de la présence du token
    }, []);

    const logout = () => {
        // Supprime le token d'authentification du localStorage //
        localStorage.clear();
        setIsAuthenticated(false);
        // Redirige l'utilisateur vers la page de connexion //
        navigate('/log');
    };
    
    return(
        <div className = "container-navbar">
            <div className= "box-icons">
            {!isAuthenticated && (
                    <Link className="loginbutton" to="/log">
                        <i className="fa-solid fa-power-off login"></i>
                    </Link>
                )}
                {isAuthenticated && (
                    <i className="fa-solid fa-power-off logout" onClick={logout}></i>
                )}
                {isAuthenticated && (
                <Link className="dashboardbutton" to="/dashboardprojects">
                    <i className="fa-solid fa-gauge dash"></i>
                </Link>
                )}
            </div>
            <nav className="nav-header">
                <Link className="nav_item1" to="/">
                    <p className="nav_item_text1">Home</p>
                </Link>
                <Link className="nav_item2" to="/about">
                    <p className="nav_item_text2">About</p>
                </Link>
                <a key={cvs.id} href={url} className="nav_item3" target='blank' >
                    <p className="nav_item_text3">Cv</p>
                </a>
            </nav>
        </div>
    )
}
export default Navbar;