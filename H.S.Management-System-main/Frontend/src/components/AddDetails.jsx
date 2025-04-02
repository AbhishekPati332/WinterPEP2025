import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { endPoints } from '../utils/endpoints';
import { useParams, useNavigate } from 'react-router-dom';

const { UPDATE_PARTICULAR_HOSPITAL_DETAIL_API } = endPoints;

const AddDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    numberOfDoctors: '',
    numberOfDepartment: '',
    images: [], // Array to accumulate all selected images
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles], // Append new files to existing array
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append('description', formData.description);
    data.append('numberOfDoctors', formData.numberOfDoctors);
    data.append('numberOfDepartment', formData.numberOfDepartment);
    formData.images.forEach((image) => {
      data.append('images', image);
    });

    console.log('FormData contents:');
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const res = await axios.post(`${UPDATE_PARTICULAR_HOSPITAL_DETAIL_API}?id=${id}`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      console.log('Details updated:', res.data);
      toast.success('Hospital details updated successfully!');
      navigate('/myHospitals');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      toast.error(err);
      setError(err.response?.data?.message || 'Failed to update hospital details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center py-12">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Add Hospital Details
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter hospital description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />
          </div>

          <div>
            <label htmlFor="numberOfDoctors" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Doctors
            </label>
            <input
              type="number"
              id="numberOfDoctors"
              name="numberOfDoctors"
              value={formData.numberOfDoctors}
              onChange={handleChange}
              placeholder="Enter number of doctors"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="numberOfDepartment" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Departments
            </label>
            <input
              type="number"
              id="numberOfDepartment"
              name="numberOfDepartment"
              value={formData.numberOfDepartment}
              onChange={handleChange}
              placeholder="Enter number of departments"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center bg-gray-100 p-2 rounded-lg">
                    <span className="text-sm text-gray-600 truncate max-w-[150px]">
                      {image.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 cursor-pointer text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center disabled:bg-blue-400"
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
                  Saving...
                </>
              ) : (
                'Save Details'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/myHospitals')}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDetails;