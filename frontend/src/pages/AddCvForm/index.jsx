import "./addCvForm.css";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/index";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

function AddCVForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        urlCv: ""
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
        const response = await axios.post("https://marti.alwaysdata.net/api/cv", formData);
        console.log("CV added:", response.data);
        navigate('/');
        } catch (error) {
        console.error("Error adding CV:", error);
        }
    };

    return (
        <div className = "container-form">
            <Navbar />
            <Link className= "return-dash" to="/dashboardcvs"><i className="fa-solid fa-circle-left"></i></Link>
            <form className = "form-add-cv" onSubmit={handleSubmit}>
            <h2>Add CV</h2>
            <label htmlFor="id-cv" className="label-formsAPI">CV ID:</label>
            <input type="text" id="id-cv" name="id" autoComplete="off" className="input-field" value={formData.id} onChange={handleChange} />
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
            <label htmlFor="url">CV URL:</label>
            <input type="text" id="url" name="urlCv" value={formData.urlCv} onChange={handleChange} />
            <button type="submit">Add CV</button>
            </form>
        </div>
    );
}

export default AddCVForm;
