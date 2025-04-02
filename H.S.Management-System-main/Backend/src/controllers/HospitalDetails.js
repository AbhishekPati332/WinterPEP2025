const {uploadMultipleImages} = require('../services/multipleImages');
const Hospital = require('../models/hospital');
const HospitalDetails = require('../models/hospitalDetails');
require('dotenv').config();



exports.UpdateHospitalDetail = async(req,res) => {
    try{

        const {id} = req.query;
        const {description, numberOfDoctors, numberOfDepartment} = req.body;
        let images = req.files?.images;

        if(!id){
            return res.status(400).json({
                success: false,
                message: 'Please provide hospital id'
            });
        }

        const findHospital = await Hospital.findById(id);
        if(!findHospital){
            return res.status(400).json({
                success: false,
                message: 'Hospital not found'
            });
        }
        
        const findHospitalDetails = await HospitalDetails.findById(findHospital.additionalDetails);
        if(!findHospitalDetails){
            return res.status(400).json({
                success: false,
                message: 'Hospital Details not found'
            });
        }


        if(description){
            findHospitalDetails.description = description;
        }

        if(numberOfDepartment){
            findHospitalDetails.numberOfDepartment = numberOfDepartment;
        }

        if(numberOfDoctors){
            findHospitalDetails.numberOfDoctors = numberOfDoctors;
        }

        if(images){

            if (!Array.isArray(images)) {
                images = [images];
            }

            const multiUpload = await uploadMultipleImages(images);

            if(multiUpload.length === 0){
                return res.status(400).json({
                    success: false,
                    message: 'Failed to upload images'
                });
            }

            findHospitalDetails.images = multiUpload;
        }

        await findHospitalDetails.save();

        return res.status(200).json({
            success: true,
            message: 'Hospital Details updated successfully'
        })


    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating Hospital details"
        })
    }
}