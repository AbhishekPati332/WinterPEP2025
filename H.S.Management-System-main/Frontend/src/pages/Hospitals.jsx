import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { endPoints } from '../utils/endpoints';
import HospitalCard from '../components/HospitalCard';
import { Link } from 'react-router-dom';

const { GET_ALL_HOSPITAL_API } = endPoints;

const Hospitals = () => {

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(GET_ALL_HOSPITAL_API, {
        query: query
      });

      if (!res.data.success) {
        alert(res.data.message);
        return;
      }
      setData(res.data.data);

    } catch (error) {
      alert(error);
    } finally {
      setLoading(false); // End loading
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.post(GET_ALL_HOSPITAL_API);

        if (!res.data.success) {
          alert(res.data.message);
          return;
        }
        setData(res.data.data);

      } catch (error) {
        alert(error);
      } finally {
        setLoading(false); // End loading
      }
    }
    fetchData();
  }, [])

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

  return <div className=' min-h-screen bg-white ' >




    <div className=' w-[80%] mx-auto flex flex-col justify-center mb-[50px] ' >

      <div className=' flex items-center justify-center w-full mt-[20px] ' >
        <form onSubmit={handelSubmit} className=' flex gap-[10px] '>
          <input className='border pl-[10px] font-semibold rounded-2xl w-[300px] pt-[5px] pb-[5px]  focus:ring-0' placeholder='Type City here...' type="text" onChange={(e) => {
            setQuery(e.target.value);
          }} />
          <button type='submit' className=' border cursor-pointer pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-3xl font-semibold ' >Search</button>
        </form>
      </div>

      {
        data.length > 0 ? (
          <div className=' grid grid-cols-3 gap-6 mt-[30px] ' >
            {
              data.map((item, index) => {
                return <Link to={`/hospital/${item._id}`} key={index}>
                  <HospitalCard name={item.name} image={item.image} city={item.city} speciality={item.speciality} rating={item.rating} />
                </Link>
              })
            }
          </div>
        ) : (
          <div className=' flex justify-center items-center h-[500px] ' >
            <div className=' text-3xl font-bold text-black ' >
              Data Not Found
            </div>
          </div>
        )
      }

    </div>

  </div>
}

export default Hospitals