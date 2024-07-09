import './editCvForm.css';
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/index";
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom';
import axios from "axios";

function EditCVForm() {
    const { id } = useParams();
    const [cv, setCv] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        _id: "",
        id: "",
        title: "",
        urlCv: ""
    });


    useEffect(() => {
        const fetchCv = async () => {
            try {
                const response = await axios.get(`https://marti.alwaysdata.net/api/cv/${id}`);
                setCv(response.data);
                setFormData({
                    _id: response.data._id || '', 
                    id: response.data._id || '',
                    title: response.data.title || '',
                    urlCv: response.data.url || '',
                });
            } catch (error) {
                console.error('Erreur :', error.message);
                setError(true);
            }
        };

        fetchCv();
    }, [id]);

    if (error) {
        return <Navigate to="/error" replace />;
    }

    if (!cv) {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.put(`https://marti.alwaysdata.net/api/cv/${formData.id}`, formData);
        console.log("CV updated:", response.data);
        navigate('/');
        } catch (error) {
        console.error("Error updating CV:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`https://marti.alwaysdata.net/api/cv/${formData.id}`);
            console.log("Cv deleted:", response.data);
            navigate('/');
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className = "container-form">
            <Navbar />
            <Link className= "return-dash" to="/dashboardcvs"><i className="fa-solid fa-circle-left"></i></Link>
            <form key={formData.id} className= "form-edit-cv" onSubmit={handleSubmit}>
                <h2>Edit CV</h2>
                <label htmlFor="_id-cv" className="label-formsAPI">Cv _ID:</label>
                <input type="text" id="_id-cv" name="_id" autoComplete="off" className="input-field" value={formData._id} onChange={handleChange} />
                <label htmlFor="id-cv" className="label-formsAPI">CV ID:</label>
                <input type="text" id="id-cv" name="id" autoComplete="off" className="input-field" value={formData.id} onChange={handleChange} />
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                <label htmlFor="cvUrl">CV URL:</label>
                <input type="text" id="cvUrl" name="urlCv" value={formData.urlCv} onChange={handleChange} />
                <div className="buttons">
                    <button type="submit" className="btn-submit">Update CV</button>
                    <button type="button" className="btn-delete" onClick={handleDelete}>Delete</button>
                </div>
            </form>
        </div>
    );
}

export default EditCVForm;
