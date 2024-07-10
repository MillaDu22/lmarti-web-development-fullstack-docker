const Project = require('../models/project');

// Controller pour créer un nouveau projet //
exports.createProject = async (req, res) => {
    console.log('Received POST request to create project');
    console.log('Request body:', req.body);

    try {
        const project = new Project({
            id: req.body.id,
            name: req.body.name,
            informations: req.body.informations,
            tags: [req.body.tag1, req.body.tag2, req.body.tag3],
            description: req.body.description,
            cover: req.body.coverUrl.split(','),
            photos: req.body.photosUrl.split(','),
            code: req.body.lienCode.split(','),
            site: req.body.lienSite.split(','),
            alt: req.body.altCover,
            html: parseInt(req.body.html),
            css: parseInt(req.body.css),
            js: parseInt(req.body.js)
        });

        console.log('Project to be saved:', project);

        const savedProject = await project.save();
        console.log('Project saved successfully:', savedProject);

        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error saving project:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Controller pour récupérer tous les projets //
exports.getAllProjects = (req, res, next) => {
    Project.find()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

// Controller pour récupérer un projet par son ID //
exports.getProjectById = (req, res, next) => {
    const projectId = req.params.id;
    console.log(`Received request to get project with ID: ${projectId}`);
    
    Project.findOne({ id: projectId })
        .then(project => {
            if (!project) {
                console.log(`Project with ID: ${projectId} not found`);
                return res.status(404).json({ message: 'Project not found' });
            }
            console.log(`Project with ID: ${projectId} found`, project);
            res.status(200).json(project);
        })
        .catch(error => {
            console.error(`Error fetching project with ID: ${projectId}`, error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        });
};

// Controller pour mettre à jour un projet //
exports.updateProject = (req, res, next) => {
    Project.findByIdAndUpdate(req.params.id, req.body,{ new: true })
        .then(project => {
            if (!project) {
                return res.status(404).json({
                    message: 'Projet non trouvé'
                });
            }
            res.status(200).json({
                message: 'Projet mis à jour avec succès'
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

// Controller pour supprimer un projet //
exports.deleteProject = (req, res, next) => {
    Project.findByIdAndDelete(req.params.id)
        .then(project => {
            if (!project) {
                return res.status(404).json({
                    message: 'Projet non trouvé'
                });
            }
            res.status(200).json({
                message: 'Projet supprimé avec succès'
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};
