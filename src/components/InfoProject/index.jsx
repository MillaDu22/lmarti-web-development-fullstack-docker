import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import './infoproject.css';
import Tag from '../Tag/index';
import Slider from '../../components/Slider/index';
import LienCode from "../LienCode/index";
import LienSite from "../LienSite/index";
import CircleSkillHtml from "../CircleSkillHtml/indexHtml";
import CircleSkillCss from "../CircleSkillCss/indexCss";
import CircleSkillJs from '../CircleSkillJs/indexJs';

const InfoProject = () => {
    const { id } = useParams(); 
    const [project, setProject] = useState(null);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`https://marti.alwaysdata.net/api/project/${id}`);
                setProject(response.data); 
            } catch (error) {
                console.error('Erreur :', error.message);
                setError(true);
            }
        };

        fetchProject();
    }, [id]);

    if (error) {
        return <Navigate to="/error" replace />;
    }

    if (!project) {
        return <div>Loading...</div>;
    }

    const TagsProjets = project?.tags.map((tag, index) => (
        <Tag key={index} title={tag} />
    ));

    const CodesProjets = project?.code.map((code, index) => (
        <LienCode key={index} title={code} />
    ));

    const SitesProjets = project?.site.map((site, index) => (
        <LienSite key={index} title={site} />
    ));

    return (
        <div className='info-projet-box' key={project.id}>
            <h2 className="title">{project.name}</h2>
            <div className="display-row">
                <div className="box-slider-infos">
                    <Slider images={project.photos} />
                    <div className="info-projet">
                        <div className=" container-mots-cles">{TagsProjets}</div>
                        <span className="back-info-projet">
                            <span className="txt-info-projet">{project.description}</span>
                        </span>
                        <div className=" container-liens">{CodesProjets}{SitesProjets}</div>
                    </div>
                </div>
            </div>
            <div className="box-title-circleskill">
                <h3 className="titre-circle-skill-box">Niveaux d'utilisation des technologies sur ce projet</h3>
                <div className="container-circle-skill">
                    <CircleSkillHtml percentage={project.html} />
                    <CircleSkillCss percentage={project.css} />
                    <CircleSkillJs percentage={project.js} />
                </div>
            </div>
        </div>
    );
};

export default InfoProject;
