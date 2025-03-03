const Hospital = require('../models/Hospital');

// Create Hospital
exports.createHospital = async (req, res) => {
  try {
    // Validate specialities length
    if (req.body.specialities && req.body.specialities.length > 5) {
      return res.status(400).json({ message: 'Maximum 5 specialities are allowed' });
    }

    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json(hospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Hospitals
exports.getHospitalsByCity = async (req, res) => {
  try {
    const { city } = req.query;
    let query = {};
    
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }
    
    const hospitals = await Hospital.find(query);
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Hospital by ID
exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(hospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Hospital
exports.deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findByIdAndDelete(id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Hospital
exports.updateHospital = async (req, res) => {
  try {
    // Validate specialities length for updates
    if (req.body.specialities && req.body.specialities.length > 5) {
      return res.status(400).json({ message: 'Maximum 5 specialities are allowed' });
    }

    const { id } = req.params;
    const hospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true });
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(hospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add Hospital Details
exports.addHospitalDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(hospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 