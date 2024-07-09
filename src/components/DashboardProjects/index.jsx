import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/index';
import VerticalNavbar from '../VerticalNavbar/index';
import './dashboardProjects.css';

function DashboardProjects() { 
    const [projects, setProjects] = useState([]);
    const location = useLocation();

    useEffect(() => {
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

    const searchParams = new URLSearchParams(location.search);
    const newProjectId = searchParams.get('newProjectId');

    useEffect(() => {
        if (newProjectId) {
            fetchProjects();
        }
    }, [newProjectId]);

    return (
        <section className="container-dashboard">
            <Navbar />
            <div className="row-vertical-list">
                <VerticalNavbar />
                <div className="title-btn-list">
                    <div className="title-btn">
                        <h4 className="title-list">Projects</h4>
                        <Link className="link-add" to="/addprojectform">Add+</Link>
                    </div>
                    <div className="list">
                        {projects.map((project) => (
                            <Link to={`/editprojectform/${project.id}`} key={project.id} className="rows-list">
                                <span className="id">{project.id}</span>
                                <span className="name">{project.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DashboardProjects;
