import React from 'react';
import Home from "../pages/Home/index";
import About from "../pages/About/index";
import Sign from "../pages/Sign/index";
import Log from "../pages/Log/index";
import DashboardProjects from "../components/DashboardProjects/index";
import DashboardCertificates from "../components/DashboardCertificates/index";
import DashboardCvs from "../components/DashboardCvs/index";
import AddProjectForm from '../pages/AddProjectForm/index';
import EditProjectForm from '../pages/EditProjectForm/index';
import AddCertificatForm from '../pages/AddCertificatForm/index';
import EditCertificatForm from '../pages/EditCertificatForm/index';
import AddCVForm from '../pages/AddCvForm/index';
import EditCVForm from '../pages/EditCvForm/index';
import Error from "../pages/Error/index";
import Project from "../pages/Project/index";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from '../components/ProtectedRoute';



const Router =  () => {
    return (
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/project/:id" element={<Project />} />
                <Route path="/sign" element={<Sign />} />
                <Route path="/log" element={<Log />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboardprojects" element={<DashboardProjects />} />
                    <Route path="/dashboardcertificates" element={<DashboardCertificates />} />
                    <Route path="/dashboardcvs" element={<DashboardCvs />} />
                    <Route path="/addprojectform" element={<AddProjectForm />} />
                    <Route path="/editprojectform/:id" element={<EditProjectForm />} />
                    <Route path="/addcertificatform" element={<AddCertificatForm />} />
                    <Route path="/editcertificatform/:id" element={<EditCertificatForm />} />
                    <Route path="/addcvform" element={<AddCVForm />} />
                    <Route path="/editcvform/:id" element={<EditCVForm />} />
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
    );
};

export default Router;