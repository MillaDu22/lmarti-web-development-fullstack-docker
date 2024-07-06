const Cv = require('../models/cv');

// Controller pour créer un nouveau CV //
exports.createCv= async (req, res) => {
    try {
        const cv = new Cv({
            id: req.body.id,
            title: req.body.title,
            url: req.body.urlCv
        });
        console.log('Cv to be saved:', cv);
        const savedCv = await cv.save();
        console.log('Cv saved successfully:', savedCv);

        res.status(201).json(savedCv);

    } catch (error) {
        console.error('Error saving cv:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Controller pour récupérer tous les CV //
exports.getAllCvs = (req, res, next) => {
    Cv.find()
        .then(cvs => {
            res.status(200).json(cvs);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

// Controller pour récupérer un CV par son ID //
exports.getCvById = (req, res, next) => {
    Cv.findById(req.params.id)
        .then(cv => {
            if (!cv) {
                return res.status(404).json({
                    message: 'CV non trouvé'
                });
            }
            res.status(200).json(cv);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

// Controller pour mettre à jour un CV //
exports.updateCv = (req, res, next) => {
    const { title, urlCv } = req.body;
    const updateData = {};

    if (title) {
        updateData.title = title;
    }
    if (urlCv) {
        updateData.url = urlCv;
    }

    Cv.findByIdAndUpdate(req.params.id, updateData, { new: true })
        .then(updatedCV => {
            if (!updatedCV) {
                return res.status(404).json({
                    message: 'CV non trouvé'
                });
            }
            res.status(200).json({
                message: 'CV mis à jour avec succès',
                cv: updatedCV
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};






// Controller pour supprimer un CV //
exports.deleteCv = (req, res, next) => {
    Cv.findByIdAndDelete(req.params.id)
        .then(cv => {
            if (!cv) {
                return res.status(404).json({
                    message: 'CV non trouvé'
                });
            }
            res.status(200).json({
                message: 'CV supprimé avec succès'
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};
