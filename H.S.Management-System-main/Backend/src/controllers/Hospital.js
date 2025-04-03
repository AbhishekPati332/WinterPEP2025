const { imageUploaderToCloudinary } = require('../utils/imageUploader');
const { uploadMultipleImages } = require('../services/multipleImages');
const Hospital = require('../models/hospital');
const HospitalDetails = require('../models/hospitalDetails');
const User = require('../models/user');
require('dotenv').config();




exports.createHospital = async (req, res) => {
    try {
        const Userid = req.user.id;
        const { name, city, speciality, rating } = req.body;
        const image = req.files?.image;

        if (!name || !city || !rating || !image) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }

        if (!speciality || speciality.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please select at least one speciality"
            })
        }

        const findExistingUser = await User.findById(Userid);
        if (!findExistingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const findExistingHospital = await Hospital.findOne({ name: name, city: city });

        if (findExistingHospital) {
            return res.status(400).json({
                success: false,
                message: "Hospital already exists"
            });
        }

        const uploadImage = await imageUploaderToCloudinary(image, process.env.CLOUDINARY_FOLDER_NAME);
        if (!uploadImage) {
            return res.status(400).json({
                success: false,
                message: "Failed to upload image"
            })
        }

        const additionalDetails = await HospitalDetails.create({
            description: null,
            images: null,
            numberOfDoctors: null,
            numberOfDepartment: null
        });

        const hospital = await Hospital.create({
            name: name,
            city: city,
            speciality: speciality,
            rating: rating,
            image: uploadImage.secure_url,
            additionalDetails: additionalDetails._id
        })


        await User.findByIdAndUpdate(Userid,
            {
                $push: {
                    hospital: hospital._id
                }
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Hospital created successfully",
            data: hospital
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating hospital"
        })
    }
}


exports.getAllHospitals = async (req, res) => {
    try {

        const { query } = req.body;

        if (!query) {
            const que = await Hospital.find().populate("additionalDetails").exec();
            if (!que) {
                return res.status(404).json({
                    success: false,
                    message: "No hospital found"
                })
            }
            return res.status(200).json({
                success: true,
                message: "all hospital fetched successfully",
                data: que
            })
        }


        const findHospital = await Hospital.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { city: { $regex: query, $options: 'i' } },
                { speciality: { $regex: query, $options: 'i' } }
            ]
        });

        if (!findHospital) {
            return res.status(404).json({
                success: false,
                message: "No hospital found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "hospital fetched successfully",
            data: findHospital
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting hospital details"
        })
    }
}


exports.getParticularHospital = async (req, res) => {
    try {

        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide hospital id"
            })
        }

        const findHospital = await Hospital.findOne({ _id: id }).populate("additionalDetails");
        if (!findHospital) {
            return res.status(404).json({
                success: false,
                message: "No hospital found"
            });
        }


        return res.status(200).json({
            success: true,
            message: "hospital fetched successfully",
            data: findHospital
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting hospital details"
        })
    }
}

exports.deleteParticularHospital = async (req, res) => {
    try {

        const userId = req.user.id;
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide hospital id"
            })
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const findHospital = await Hospital.findOne({ _id: id });
        if (!findHospital) {
            return res.status(404).json({
                success: false,
                message: "No hospital found"
            });
        }

        await User.findByIdAndUpdate(userId,
            {
                $pull: {
                    hospital: findHospital._id
                }
            },
            {
                new: true
            }
        )

        await HospitalDetails.findByIdAndDelete(findHospital.additionalDetails);
        await Hospital.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Hospital deleted successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in deleting hospital"
        })
    }
}


exports.updateHospital = async (req, res) => {
    try {

        const { id } = req.query;
        const { rating = "" } = req.body;
        const image = req.files?.image;

        const findHospital = await Hospital.findById(id);

        if (!findHospital) {
            return res.status(404).json({
                success: false,
                message: "No hospital found"
            });
        }

        if (rating) {
            findHospital.rating = rating;
        }

        if (image) {
            const updatedImage = await imageUploaderToCloudinary(image, process.env.CLOUDINARY_FOLDER_NAME);
            findHospital.image = updatedImage.secure_url;
        }

        await findHospital.save();

        return res.status(200).json({
            success: true,
            message: "Hospital updated successfully",
            data: findHospital
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in updating hospital"
        })
    }
}

exports.getAllHospitalOfAParticularUser = async(req,res) => {
    try{

        const id = req.user.id;

        const user = await User.findById(id).select("-password").populate("hospital").exec();

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Hospitals of user fetched successfully",
            data: user.hospital
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting all hospital of a particular user"
        })
    }
}