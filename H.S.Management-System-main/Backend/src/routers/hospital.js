const express = require('express');
const router = express.Router();

const {
    createHospital,
    getAllHospitals,
    getParticularHospital,
    deleteParticularHospital,
    updateHospital,
    getAllHospitalOfAParticularUser
} = require('../controllers/Hospital');

const {
    auth,
    isHospital,
    isUser
} = require('../middleware/auth');


router.post("/create",auth,isHospital,createHospital);
router.post("/all",getAllHospitals);
router.get("/get",getParticularHospital);
router.delete("/delete",auth,isHospital,deleteParticularHospital);
router.put("/update",auth,isHospital,updateHospital);
router.get('/myHospitals',auth,isHospital,getAllHospitalOfAParticularUser);


module.exports = router;