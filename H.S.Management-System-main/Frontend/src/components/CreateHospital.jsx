import React, { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { endPoints } from '../utils/endpoints';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const { CREATE_HOSPITAL_API } = endPoints;

const CreateHospital = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    speciality: [], // Starts as empty array, will become ["eye", "bone", etc."]
    rating: '',
    image: null,
  });
  const [newSpeciality, setNewSpeciality] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const addSpeciality = () => {
    if (newSpeciality.trim() === '') return;
    setFormData((prev) => ({
      ...prev,
      speciality: [...prev.speciality, newSpeciality.trim()],
    }));
    setNewSpeciality('');
  };

  const removeSpeciality = (index) => {
    setFormData((prev) => ({
      ...prev,
      speciality: prev.speciality.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('city', formData.city);
    data.append('speciality', formData.speciality); // Sent as ["eye", "bone", "brain"]
    data.append('rating', formData.rating);
    if (formData.image) data.append('image', formData.image);

    try {
      const res = await axios.post(CREATE_HOSPITAL_API, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      // console.log('Hospital created:', res.data.data);
      toast.success(res.data.message);
      navigate('/myHospitals');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      setError(err.message || 'Failed to create hospital');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center justify-center py-12">


      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg mt-[40px] p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create New Hospital
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Hospital Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter hospital name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Speciality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialities
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSpeciality}
                onChange={(e) => setNewSpeciality(e.target.value)}
                placeholder="Add a speciality (e.g., eye, bone, brain)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addSpeciality}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.speciality.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {spec}
                  <button
                    type="button"
                    onClick={() => removeSpeciality(index)}
                    className="ml-2 text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
              Rating (0-5)
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Enter rating"
              min="0"
              max="5"
              step="0.1"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Hospital Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.image && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {formData.image.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 cursor-pointer text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center disabled:bg-blue-400"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </>
            ) : (
              'Create Hospital'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHospital;