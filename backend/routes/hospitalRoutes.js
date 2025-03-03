const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

// Get single hospital by ID (this should come before the general routes)
router.get('/:id', hospitalController.getHospitalById);

// Get all hospitals
router.get('/', hospitalController.getHospitalsByCity);

// Create hospital
router.post('/', hospitalController.createHospital);

// Update hospital
router.put('/:id', hospitalController.updateHospital);

// Delete hospital
router.delete('/:id', hospitalController.deleteHospital);

// Add hospital details
router.post('/:id/details', hospitalController.addHospitalDetails);

module.exports = router; 