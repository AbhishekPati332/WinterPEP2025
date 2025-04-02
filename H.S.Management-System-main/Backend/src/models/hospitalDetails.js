const mongoose = require('mongoose');

const HospitalDetailsSchema = new mongoose.Schema({
    description: {
        type: String
    },
    images: [
        {
            type: String
        }
    ],
    numberOfDoctors: {
        type: Number
    },
    numberOfDepartment: {
        type: Number
    }
})

const HospitalDetails = new mongoose.model("HospitalDetails",HospitalDetailsSchema);
module.exports = HospitalDetails;