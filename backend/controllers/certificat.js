const Certificat = require('../models/certificat');

// Controller pour créer un nouveau certificat //
exports.createCertificat= async (req, res) => {
    try {
        const certificat = new Certificat({
            id: req.body.id,
            description: req.body.description,
            url: req.body.urlCertificat
        });
        console.log('Certificat to be saved:', certificat);
        const savedCertificat = await certificat.save();
        console.log('Certificat saved successfully:', savedCertificat);

        res.status(201).json(savedCertificat);

    } catch (error) {
        console.error('Error saving certificat:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Controller pour récupérer tous les certificats //
exports.getAllCertificats = (req, res, next) => {
    Certificat.find()
        .then(certificats => {
            res.status(200).json(certificats);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

// Controller pour récupérer un certificat par son ID //
exports.getCertificatById = (req, res, next) => {
    Certificat.findById(req.params.id)
        .then(certificat => {
            if (!certificat) {
                return res.status(404).json({
                    message: 'Certificat non trouvé'
                });
            }
            res.status(200).json(certificat);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

// Controller pour mettre à jour un certificat //
exports.updateCertificat = (req, res, next) => {
    const { description, urlCertificat } = req.body;
    const updateData = {};

    if (description) {
        updateData.description = description;
    }
    if (urlCertificat) {
        updateData.url = urlCertificat;
    }

    Certificat.findByIdAndUpdate(req.params.id, updateData, { new: true })
        .then(updatedCertificat => {
            if (!updatedCertificat) {
                return res.status(404).json({
                    message: 'Certificat non trouvé'
                });
            }
            res.status(200).json({
                message: 'Certificat mis à jour avec succès',
                certificat: updatedCertificat
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

// Controller pour supprimer un certificat //
exports.deleteCertificat = (req, res, next) => {
    Certificat.findByIdAndDelete(req.params.id)
        .then(certificat => {
            if (!certificat) {
                return res.status(404).json({
                    message: 'Certificat non trouvé'
                });
            }
            res.status(200).json({
                message: 'Certificat supprimé avec succès'
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};
