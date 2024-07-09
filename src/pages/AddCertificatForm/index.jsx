import "./addCertificatForm.css";
import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import Navbar from "../../components/Navbar/index";

function AddCertificatForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        description: "",
        urlCertificat: ""
    });

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
        const response = await axios.post("https://marti.alwaysdata.net/api/certificat", formData);
        console.log("Certificat added:", response.data);
        navigate('/about');
        } catch (error) {
        console.error("Error adding certificat:", error);
        }
    };

    return (
        <div className = "container-form">
            <Navbar />
            <Link className= "return-dash" to="/dashboardcertificates"><i className="fa-solid fa-circle-left"></i></Link>
            <form className ="form-certificat" onSubmit={handleSubmit}>
                <h2>Add Certificat</h2>
                <label htmlFor="id">Certificat ID:</label>
                <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} />
                <label htmlFor="description">Name:</label>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                <label htmlFor="urlCertificat">Certificat URL:</label>
                <input type="text" id="urlCertificat" name="urlCertificat" value={formData.urlCertificat} onChange={handleChange} />
                <button type="submit">Add Certificat</button>
            </form>
        </div>
    );
}

export default AddCertificatForm;
