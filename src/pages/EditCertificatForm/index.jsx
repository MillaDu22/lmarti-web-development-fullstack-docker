import './editCertificatForm.css';
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/index";
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom';
import axios from "axios";

function EditCertificatForm() {
    const { id } = useParams();
    const [certificat, setCertificat] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        _id: '', 
        id: "",
        description: "",
        urlCertificat: ""
    });


    useEffect(() => {
        const fetchCertificat = async () => {
            try {
                const response = await axios.get(`https://marti.alwaysdata.net/api/certificat/${id}`);
                setCertificat(response.data);
                setFormData({
                    _id: response.data._id || '', 
                    id: response.data._id || '',
                    description: response.data.description || '',
                    urlCertificat: response.data.url || '',
                });
            } catch (error) {
                console.error('Erreur :', error.message);
                setError(true);
            }
        };

        fetchCertificat();
    }, [id]);

    if (error) {
        return <Navigate to="/error" replace />;
    }

    if (!certificat) {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`https://marti.alwaysdata.net/api/certificat/${formData.id}`);
            console.log("Certificat deleted:", response.data);
            navigate('/about');
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.put(`https://marti.alwaysdata.net/api/certificat/${formData.id}`, formData);
        console.log("Certificat updated:", response.data);
        navigate('/about');
        } catch (error) {
        console.error("Error updating certificat:", error);
        }
    };

    return (
        <div className = "container-form">
        <Navbar />
        <Link className= "return-dash" to="/dashboardcertificates"><i className="fa-solid fa-circle-left"></i></Link>
            <form key={formData.id} className="form-edit-certificat" onSubmit={handleSubmit}>
                <h2>Edit Certificat</h2>
                <label htmlFor="_id-certificat" className="label-formsAPI">Certificat _ID:</label>
                <input type="text" id="_id-certificat" name="_id" autoComplete="off" className="input-field" value={formData._id} onChange={handleChange} />
                <label htmlFor="id">ID:</label>
                <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} />
                <label htmlFor="description">Name:</label>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                <label htmlFor="urlCertificat">Certificat URL:</label>
                <input type="text" id="urlCertificat" name="urlCertificat" value={formData.urlCertificat} onChange={handleChange} />
                <div className= "buttons">
                    <button type="submit" className ="btn-submit">Update Certificat</button>
                    <button type="button" className="btn-delete" onClick={handleDelete}>Delete</button>
                </div>
            </form>
        </div>
    );
}

export default EditCertificatForm;
