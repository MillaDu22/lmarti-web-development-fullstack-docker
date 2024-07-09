import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/index';
import Banniere from '../../components/Banniere/index';
import Collapse from '../../components/Collapse/index';
import SkillBar from '../../components/SkillBar/index';
import './about.css';

function About() {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await axios.get('https://marti.alwaysdata.net/api/certificat'); 
                setCertifications(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching certifications:', error);
                setLoading(false);
            }
        };

        fetchCertifications();
    }, []);

    const ficheCollapse1 = [
        {
            "id": "1",
            "projets": [
                {"id": "1", "description": "Le projet Riding Cities: Mes premiers pas vers le langage HTML."},
                {"id": "2", "description": "Le projet Ohmyfood: Implémentation et amélioration de l'interface du site mobile avec des animations CSS."},
                {"id": "3", "description": "Le projet Print-It: Mes premiers pas vers le langage JavaScript."},
                {"id": "4", "description": "Le projet kasa: Création d'une application web de location immobilière avec React."},
                {"id": "5", "description": "Le projet Photographe Nina Carducci: Optimisation et référencement."},
                {"id": "6", "description": "Le projet Booki: Création de la page d'accueil d'une agence de voyage avec HTML & CSS."},
                {"id": "7", "description": "Le projet GameOn: Création, avec JavaScript, de la landing page d'une PME spécialisée dans les concours de jeux."},
                {"id": "8", "description": "Le projet FishEye: Création d'un site accessible pour une plateforme de photographes."},
                {"id": "9", "description": "Le projet Les petits plats: Développement d'algorithmes de recherche en JavaScript."},
                {"id": "10", "description": "Le projet Wealth Health: Passage d'une librairie JQuery vers React. "}
            ],
            "projetsCode": [
                {"id": "11", "description": "Le projet Architecte Sophie Bluel: Création d'une page web dynamique avec JavaScript."},
                {"id": "12", "description": "Le projet 724events: Débuggage du site de l'agence d'évènementiel."},
                {"id": "13", "description": "Le projet Argent-Bank: Implémentation du front-end de l'application bancaire avec React."},
                {"id": "14", "description": "Le projet Bills-app: Déboggage et tests d'un SaaS RH."},
                {"id": "15", "description": "Le projet SportSee: Développement d'un tableau de bord d'analytics avec React."}
            ],
            "liens": [
                {"id": "1", "url": "https://milladu22.github.io/riding-cities/"},
                {"id": "2", "url": "https://milladu22.github.io/OhMyFood/"},
                {"id": "3", "url": "https://milladu22.github.io/Print-it-JS/"},
                {"id": "4", "url": "https://milladu22.github.io/Kasa/"},
                {"id": "5", "url": "https://milladu22.github.io/nina-carducci/"},
                {"id": "6", "url": "https://milladu22.github.io/booki-agence-de-voyage/"},
                {"id": "7", "url": "https://milladu22.github.io/GameOn-website-FR/"},
                {"id": "8", "url": "https://milladu22.github.io/Front-End-Fisheye/"},
                {"id": "9", "url": "https://milladu22.github.io/Les-petits-plats/"},
                {"id": "10", "url": "https://milladu22.github.io/rhnet-wealth-health/"}
            ],
            "liensCode": [
                {"id": "11", "url": "https://github.com/MillaDu22/Portfolio-Architecte-Sophie-Bruel"},
                {"id": "12", "url": "https://github.com/MillaDu22/724events"},
                {"id": "13", "url": "https://github.com/MillaDu22/ArgentBank-website"},
                {"id": "14", "url": "https://github.com/MillaDu22/bills-app"},
                {"id": "15", "url": "https://github.com/MillaDu22/sportsee"}
            ],
            "projetNoLink": [
                {"id": "16", "description": "Le projet Menu by qwerta: Planification du développement du site du client."},
                {"id": "17", "description": "Le projet Learn@Home: Définition des besoins pour une app de soutien scolaire."}
            ]
        }
    ];

    const projets = ficheCollapse1[0]?.projets.map((projet) => (
        <div className="nav" key={projet.id}>
            <ul className="projets">
                <li className="projet">{projet.description}
                    <a href={ficheCollapse1[0]?.liens.find((lien) => lien.id === projet.id)?.url} className="Lien-collapse" aria-label="lien-site" target="_blank" rel="noopener noreferrer">Voir le site.</a>
                </li>
            </ul>
        </div>
    ));

    const projetsCode = ficheCollapse1[0]?.projetsCode.map((projet) => (
        <div className="nav" key={projet.id}>
            <ul className="projets">
                <li className="projet">{projet.description}
                    <a href={ficheCollapse1[0]?.liensCode.find((lien) => lien.id === projet.id)?.url} className="Lien-collapse" aria-label="lien-code" target="_blank" rel="noopener noreferrer">Voir le code.</a>
                </li>
            </ul>
        </div>
    ));

    const projetNoLink = ficheCollapse1[0]?.projetNoLink.map((projet) => (
        <div className="nav" key={projet.id}>
            <ul className="projets">
                <li className="projet">{projet.description}</li>
            </ul>
        </div>
    ));

    const certificationsList = certifications.map((certification) => (
        <div className="nav" key={certification._id}>
            <ul className="projets">
                <li className="projet">{certification.description}
                    <a href={certification.url} className="Lien-collapse" aria-label="certificat" target="_blank" rel="noopener noreferrer">Certificat.</a>
                </li>
            </ul>
        </div>
    ));

    return (
        <div className="AProposPage">
            <Navbar />
            <Banniere />
            <section className="collapsesAbout">
                <div className="box">
                    <div>
                        <Collapse
                            id="1"
                            title="Les projets de mon parcours de développeur-web"
                            content={[...projets, ...projetsCode, ...projetNoLink]}
                        />
                    </div>
                </div>
                <div className="box">
                    <div>
                        <Collapse
                            id="2"
                            title="Mes certifications Openclassrooms"
                            content={loading ? <p>Loading...</p> : certificationsList}
                        />
                    </div>
                </div>
            </section>
            <div className="container-skillbar">
                <h3 className="titre-bar-moyennes">Moyennes d'utilisation des technologies sur l'ensemble des projets</h3>
                <SkillBar skillName="HTML" percentage={11.95} />
                <SkillBar skillName="CSS" percentage={23.92} />
                <SkillBar skillName="Sass" percentage={5.59} />
                <SkillBar skillName="JavaScript" percentage={58.54} />
            </div>
        </div>
    );
}

export default About;
