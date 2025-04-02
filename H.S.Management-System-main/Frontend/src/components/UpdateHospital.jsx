import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { endPoints } from '../utils/endpoints';
import { useParams, useNavigate } from 'react-router-dom';

const { UPDATE_PARTICULAR_HOSPITAL_API,GET_PARTICULAR_HOSPITAL_API } = endPoints; // Assuming this endpoint exists

const UpdateHospital = () => {
  const { id } = useParams(); // Hospital ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rating: '',
    image: null,
  });
  const [existingImage, setExistingImage] = useState(''); // To display current image
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing hospital data to pre-fill the form
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await axios.get(`${GET_PARTICULAR_HOSPITAL_API}?id=${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (res.data.success && res.data.data) {
          const { rating, image } = res.data.data;
          setFormData((prev) => ({
            ...prev,
            rating: rating || '',
          }));
          setExistingImage(image || ''); // Set current image URL
        }
      } catch (err) {
        console.error('Failed to fetch hospital data:', err);
        setError('Failed to load hospital data');
      }
    };
    fetchHospital();
  }, [id]);

  // Handle rating change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Single file upload
    setFormData((prev) => ({ ...prev, image: file }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    if (formData.rating) data.append('rating', formData.rating);
    if (formData.image) data.append('image', formData.image);

    // Debug FormData
    console.log('FormData contents:');
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const res = await axios.put(`${UPDATE_PARTICULAR_HOSPITAL_API}?id=${id}`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      console.log('Hospital updated:', res.data);
      alert('Hospital updated successfully!');
      navigate('/myHospitals');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to update hospital');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center py-12">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Update Hospital
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Hospital Image
            </label>
            {existingImage && !formData.image && (
              <div className="mb-4">
                <img
                  src={existingImage}
                  alt="Current hospital"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 mt-1">Current Image</p>
              </div>
            )}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.image && (
              <div className="mt-2 flex items-center bg-gray-100 p-2 rounded-lg">
                <span className="text-sm text-gray-600 truncate max-w-[200px]">
                  {formData.image.name}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
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
                'Save Changes'
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

export default UpdateHospital;