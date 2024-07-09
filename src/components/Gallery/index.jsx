import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/index';
import "./gallery.css";
import { useLocation } from 'react-router-dom';

function Gallery() {
    const [projects, setProjects] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Mets à jour la liste des projets lorsque la page est montée //
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('https://marti.alwaysdata.net/api/project');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    // Récupére les paramètres de requête de l'URL //
    const searchParams = new URLSearchParams(location.search);
    const newProjectId = searchParams.get('newProjectId');

    useEffect(() => {
        // Si un nouvel identifiant de projet est présent dans les paramètres de requête, ajoute le nouveau projet à la liste des projets //
        if (newProjectId) {
            fetchProjects(); // Rafraîchi la liste des projets depuis le serveur //
        }
    }, [newProjectId]);

    return (
        <section className="gallery">
            <h2 className="title-gallery">Ma galerie</h2>
            <div className="galleryGrid">
                {projects.map((project) => (
                    <Card
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        cover={project.cover}
                        alt={project.alt}
                        informations={project.informations}
                    />
                ))}
            </div>
        </section>
    );
}

export default Gallery;







