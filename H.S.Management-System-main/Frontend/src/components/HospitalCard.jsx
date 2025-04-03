import React from 'react'

const HospitalCard = ({ name, city, image, speciality, rating }) => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <img className="w-full h-[300px] object-cover" src={image} alt={name} />
            <div className="p-5 text-center">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                <p className="text-gray-600">{city}</p>
                <p className="mt-2 text-gray-700 font-medium">Specialities: {speciality.join(", ")}</p>
                <div className="mt-2 flex justify-center items-center">
                    <span className="text-yellow-500 text-lg font-semibold">⭐ {rating}</span>
                </div>
                <button className="mt-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                    View Profile
                </button>
            </div>
        </div>
    );
}

export default HospitalCard