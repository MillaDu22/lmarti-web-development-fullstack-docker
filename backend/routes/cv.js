const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cv');

// Route pour créer un nouveau CV //
router.post('/', cvController.createCv);

// Route pour récupérer tous les CV //
router.get('/', cvController.getAllCvs);

// Route pour récupérer un CV par son ID //
router.get('/:id', cvController.getCvById);

// Route pour mettre à jour un CV //
router.put('/:id', cvController.updateCv);

// Route pour supprimer un CV //
router.delete('/:id', cvController.deleteCv);

module.exports = router;
