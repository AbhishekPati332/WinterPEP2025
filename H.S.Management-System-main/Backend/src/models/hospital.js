const mongoose = require('mongoose');


const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    speciality: [
        {
            type: String,
            required: true
        }
    ],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HospitalDetails'
    }
})

const Hospital = new mongoose.model("Hospital",hospitalSchema);
module.exports = Hospital;