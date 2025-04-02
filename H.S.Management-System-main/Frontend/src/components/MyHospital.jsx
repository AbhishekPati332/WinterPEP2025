import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import axios from 'axios'
import { endPoints } from '../utils/endpoints';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HospitalCard from './HospitalCard';
import Navbar from './Navbar';

const { GET_USERS_ALL_HOSPITAL_API, DELETE_PARTICULAR_HOSPITAL_API } = endPoints;

const MyHospital = () => {

    const navigate = useNavigate();

    const [hospital, setHospital] = useState(null); // Initial state as null
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null);


    const fetchData = async () => {
        try {
            setLoading(true); // Start loading
            const res = await axios.get(GET_USERS_ALL_HOSPITAL_API, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })

            if (!res.data.success) {
                throw new Error(res.data.message);
            }

            // console.log(res.data.data);
            setHospital(res.data.data);
        } catch (error) {
            console.error(error);
            setError(error.message || 'Failed to fetch hospital data');
        } finally {
            setLoading(false); // End loading
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const buttonClicked = async(id) => {
            try {
                setLoading(true); // Start loading
                const res = await axios.delete(DELETE_PARTICULAR_HOSPITAL_API, {
                    params: { id }, 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }
                });
    
                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
    
                console.log(res.data);
                toast.success(res.data.message);
                await fetchData();
            } catch (error) {
                console.error(error);
                toast.error(error.message || 'Failed to delete hospital data');
                setError(error.message || 'Failed to Delete hospital');
            } finally {
                setLoading(false); // End loading
            }
    }

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

    return <div className=' min-h-screen bg-white ' >



        <div className=' w-[80%] mx-auto flex flex-col justify-center mb-[50px] ' >

            {
                hospital.length > 0 ? (
                    <div className=' grid grid-cols-3 gap-6 mt-[30px] ' >
                        {
                            hospital.map((item, index) => {
                                return <div key={index} className=' flex flex-col gap-[5px] ' >
                                    <Link to={`/hospital/${item._id}`}>
                                        <HospitalCard name={item.name} image={item.image} city={item.city} speciality={item.speciality} rating={item.rating} />
                                    </Link>
                                    <div className=' flex w-full items-center justify-between pl-[15px] pr-[15px] ' >
                                        <Link to={`/update/${item._id}`} className=' pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] text-white rounded-3xl flex items-center justify-center cursor-pointer bg-gray-500 text-sm ' >
                                            Add Details
                                        </Link>

                                        <Link to={`/update-hospital/${item._id}`} className=' pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] text-white rounded-3xl flex items-center justify-center cursor-pointer bg-blue-500 text-sm ' >
                                            Update
                                        </Link>

                                        <button onClick={()=>{
                                            buttonClicked(item._id);
                                        }} className=' pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] text-white rounded-3xl flex items-center justify-center cursor-pointer bg-red-500 text-sm ' >
                                            Delete Hospital
                                        </button>

                                    </div>
                                </div>
                            })
                        }
                    </div>
                ) : (
                    <div className=' flex justify-center flex-col gap-[30px] items-center h-[500px] ' >
                        <div className=' text-3xl font-bold text-black ' >
                            No Hospitals Created Yet
                        </div>
                        <div className=' text-lg text-gray-600 ' >
                            Please create a hospital to view it here
                        </div>
                        <div>
                            <Link to='/create-hospital' className=' pt-[0.75rem] pb-[0.75rem] pl-[2rem] pr-[2rem] text-white rounded-3xl flex items-center justify-center cursor-pointer bg-blue-500 text-sm ' >
                                Create Hospital
                            </Link>
                        </div>
                    </div>
                )
            }

        </div>

    </div>

}

export default MyHospital