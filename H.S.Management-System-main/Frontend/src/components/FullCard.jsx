import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { endPoints } from '../utils/endpoints';

const { GET_PARTICULAR_HOSPITAL_API } = endPoints;

const FullCard = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null); // Initial state as null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, [location.pathname])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const res = await axios.get(GET_PARTICULAR_HOSPITAL_API, {
          params: { id: id },
        });

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        console.log(res.data.data);
        setHospital(res.data.data);
      } catch (error) {
        console.error(error);
        setError(error.message || 'Failed to fetch hospital data');
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchData();
  }, [id]); // Add id as dependency

  //   return <div>
  //     {/* <img src={hospital.image} alt="" /> */}
  //     {
  //         loading ? (
  //             <div>..loading</div>
  //         ) : (
  //             <div>
  //                 <img src={hospital.image} alt="" />
  //             </div>
  //         )
  //     }
  //   </div>

  //   Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
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
          <span className="text-gray-600">Loading hospital data...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // Only render when hospital data is available
  if (!hospital) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in-down">
            {hospital.name}
          </h1>
          <p className="text-xl flex items-center gap-2 animate-fade-in-up">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {hospital.city}
          </p>
          <div className="mt-4 bg-blue-500 inline-block px-4 py-1 rounded-full text-sm font-semibold">
            Rating: {hospital.rating} ★
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Image */}
        <section className="mb-12">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-[400px] object-cover object-center"
            />
          </div>
        </section>

        {/* Details Section */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About {hospital.name}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {hospital.additionalDetails?.description || 'More details not uploaded'}
            </p>

            {/* Specialities */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Specialities</h3>
              <div className="flex flex-wrap gap-2">
                {hospital.speciality.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hospital Statistics</h3>
            {hospital.additionalDetails ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-500 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21h10a2 2 0 002-2V9l-7-7-7 7v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Number of Departments</p>
                    <p className="text-xl font-bold text-gray-800">
                      {hospital.additionalDetails.numberOfDepartment}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-500 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Number of Doctors</p>
                    <p className="text-xl font-bold text-gray-800">
                      {hospital.additionalDetails.numberOfDoctors}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 italic">More details not uploaded</p>
            )}
            <Link to='/contact' >
              <button className="mt-6 w-full cursor-pointer bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Contact Hospital
              </button>
            </Link>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Gallery</h2>
          {hospital.additionalDetails?.images?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {hospital.additionalDetails.images.map((img, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={img}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">No additional images available</p>
          )}
        </section>
      </main>

      {/* Footer */}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fadeInDown 1s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out; }
      `}</style>
    </div>
  );
};

export default FullCard;