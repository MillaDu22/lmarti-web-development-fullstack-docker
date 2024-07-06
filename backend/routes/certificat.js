const express = require('express');
const router = express.Router();
const certificatController = require('../controllers/certificat');

// Route pour créer un nouveau certificat //
router.post('/', certificatController.createCertificat);

// Route pour récupérer tous les certificats //
router.get('/', certificatController.getAllCertificats);

// Route pour récupérer un certificat par son ID //
router.get('/:id', certificatController.getCertificatById);

// Route pour mettre à jour un certificat //
router.put('/:id', certificatController.updateCertificat);

// Route pour supprimer un certificat //
router.delete('/:id', certificatController.deleteCertificat);

module.exports = router;
