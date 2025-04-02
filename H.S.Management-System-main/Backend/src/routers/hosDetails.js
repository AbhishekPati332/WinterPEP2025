const express = require('express');
const router = express.Router();

const {
    UpdateHospitalDetail
} = require('../controllers/HospitalDetails');

const {
    auth,
    isHospital,
    isUser
} = require('../middleware/auth');

router.post("/update",auth,isHospital,UpdateHospitalDetail);


module.exports = router;