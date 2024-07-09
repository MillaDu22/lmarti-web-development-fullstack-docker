import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/index";
import axios from "axios";
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom';
import './editProjectForm.css';

function EditProjectForm() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        _id: '', 
        id: '',
        name: '',
        informations: '',
        tag1: '',
        tag2: '',
        tag3: '',
        description: '',
        lienCode: '',
        lienSite: '',
        altCover: '',
        coverUrl: '',
        photosUrl: '',
        html: '',
        css: '',
        js: ''
    });

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`https://marti.alwaysdata.net/api/project/${id}`);
                setProject(response.data);
                setFormData({
                    _id: response.data._id || '', 
                    id: response.data._id || '',
                    name: response.data.name || '',
                    informations: response.data.informations || '',
                    tag1: response.data.tags[0] || '',
                    tag2: response.data.tags[1] || '',
                    tag3: response.data.tags[2] || '',
                    description: response.data.description || '',
                    lienCode: response.data.code.join(', ') || '',
                    lienSite: response.data.site.join(', ') || '',
                    altCover: response.data.alt || '',
                    coverUrl: response.data.cover.join(', ') || '',
                    photosUrl: response.data.photos.join(', ') || '',
                    html: response.data.html || '',
                    css: response.data.css || '',
                    js: response.data.js || ''
                });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://marti.alwaysdata.net/api/project/${formData.id}`,{
                ...formData,
                tags: [formData.tag1, formData.tag2, formData.tag3],
                photos: formData.photosUrl.split(',').map(photo => photo.trim()),
                cover: formData.coverUrl.split(',').map(cover => cover.trim()),
                code: formData.lienCode.split(',').map(code => code.trim()),
                site: formData.lienSite.split(',').map(site => site.trim())
                
            });
            console.log("Project updated:", response.data);
            navigate('/');
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`https://marti.alwaysdata.net/api/project/${formData.id}`);
            console.log("Project deleted:", response.data);
            navigate('/');
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container-form">
            <Navbar />
            <Link className="return-dash" to="/dashboardprojects"><i className="fa-solid fa-circle-left"></i></Link>
            <form key={formData.id} className="form-project" onSubmit={handleSubmit}>
                <h4 className="title-form">Edit Project</h4>
                <label htmlFor="_id-project" className="label-formsAPI">Project _ID:</label>
                <input type="text" id="_id-project" name="_id" autoComplete="off" className="input-field" value={formData._id} onChange={handleChange} />

                <label htmlFor="id-project" className="label-formsAPI">Project ID:</label>
                <input type="text" id="id-project" name="id" autoComplete="off" className="input-field" value={formData.id} onChange={handleChange} />

                <label htmlFor="name-project" className="label-formsAPI">Name:</label>
                <input type="text" id="name-project" name="name" autoComplete="off" className="input-field" value={formData.name} onChange={handleChange} />
                
                <label htmlFor="informations-project" className="label-formsAPI">Informations (card):</label>
                <textarea rows="5" id="informations-project" name="informations" autoComplete="off" className="input-field" value={formData.informations} onChange={(e) => handleChange(e)}></textarea>
                
                <label htmlFor="tag1-project" className="label-formsAPI">Tag1:</label>
                <input type="text" id="tag1-project" name="tag1" autoComplete="off" className="input-field" value={formData.tag1} onChange={(e) => handleChange(e)} />
                
                <label htmlFor="tag2-project" className="label-formsAPI">Tag2:</label>
                <input type="text" id="tag2-project" name="tag2" autoComplete="off" className="input-field" value={formData.tag2} onChange={(e) => handleChange(e)} />
                
                <label htmlFor="tag3-project" className="label-formsAPI">Tag3:</label>
                <input type="text" id="tag3-project" name="tag3" autoComplete="off" className="input-field" value={formData.tag3} onChange={(e) => handleChange(e)} />
                
                <label htmlFor="description-project" className="label-formsAPI">Description (page project):</label>
                <textarea rows="5" id="description-project" name="description" autoComplete="off" className="input-field" value={formData.description} onChange={(e) => handleChange(e)}></textarea>
                
                <label htmlFor="lien-code-project" className="label-formsAPI">Url code:</label>
                <input type="text" id="lien-code-project" name="lienCode" autoComplete="off" className="input-field" value={formData.lienCode} onChange={(e) => handleChange(e)} />
                
                <label htmlFor="lien-site-project" className="label-formsAPI">Url site:</label>
                <input type="text" id="lien-site-project" name="lienSite" autoComplete="off" className="input-field" value={formData.lienSite} onChange={(e) => handleChange(e)} />
                
                <label htmlFor="alt-cover-project" className="label-formsAPI">Alt cover:</label>
                <input type="text" id="alt-cover-project" name="altCover" autoComplete="off" className="input-field" value={formData.altCover} onChange={(e) => handleChange(e)} />
                
                <label htmlFor="cover-url-project" className="label-formsAPI">Cover URL (webp):</label>
                <input type="text" id="cover-url-project" name="coverUrl" autoComplete="off" className="input-field" value={formData.coverUrl} onChange={(e) => handleChange(e)} />
                
                <label htmlFor="photos-url-project" className="label-formsAPI">Photos URL (webp):</label>
                <textarea rows="5" id="photos-url-project" name="photosUrl" autoComplete="off" className="input-field" value={formData.photosUrl} onChange={(e) => handleChange(e)} />
                
                <label htmlFor="html-project" className="label-formsAPI">HTML %:</label>
                <input type="text" id="html-project" name="html" autoComplete="off" className="input-field" value={formData.html} onChange={(e) => handleChange(e)} />
                
                <label htmlFor="css-project" className="label-formsAPI">CSS %:</label>
                <input type="text" id="css-project" name="css" autoComplete="off" className="input-field" value={formData.css} onChange={(e) => handleChange(e)} />
                
                <label htmlFor="js-project" className="label-formsAPI">JS %:</label>
                <input type="text" id="js-project" name="js" autoComplete="off" className="input-field" value={formData.js} onChange={(e) => handleChange(e)} />
                
                <p className="errormsg-form-project"></p>
                <div className="buttons">
                    <input type="submit" className="btn-submit" value="Update" />
                    <button type="button" className="btn-delete" onClick={handleDelete}>Delete</button>
                </div>
            </form>
        </div>
    );
}

export default EditProjectForm;
