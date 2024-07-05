import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUser(response.data[0]);
      });
  }, []);

  if (!user) return <div className="flex justify-center items-center h-screen text-2xl">Loading...</div>;

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg mt-4 sm:mt-10'>
        <div className='flex items-center space-x-4 mb-6 sm:mb-8'> 
             <FaArrowLeft className='cursor-pointer text-blue-600 hover:text-blue-800' onClick={()=>navigate('/')}/>
             <div className='font-bold text-xl sm:text-3xl text-blue-600 hover:text-gray-800'>
             Welcome, {user.name}
             </div>
        </div>
        <div className='mb-6 sm:mb-8'>
          <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6'>
              <div className='bg-gray-200 rounded-full px-5 py-5 sm:px-7 sm:py-7 text-2xl sm:text-3xl font-bold'>
                  {user.name.split(' ').map((n:string)=>n[0]).join('').toUpperCase()}
              </div>
              <div className='text-center sm:text-left'>
                  <h3 className='font-semibold text-xl sm:text-2xl text-gray-800'>{user.name}</h3>
                  <h3 className='text-gray-600 text-base sm:text-lg'>{user.email}</h3>
              </div>
          </div>
          <div className='flex flex-col sm:flex-row justify-between pt-4 space-y-4 sm:space-y-0'>
            <div className='w-full sm:w-[48%]'>
                <InfoItem label="User ID" value={user.id}/>
                <InfoItem label="Email ID" value={user.email}/>
                <InfoItem label="Phone" value={user.phone}/>
            </div>
             <div className='w-full sm:w-[48%]'>
                <InfoItem label="Name" value={user.name}/>
                <InfoItem label="Address" value={`${user.address.street}, ${user.address.suite}, ${user.address.city}`}/>
             </div>
        </div>
        
      </div>
    </div>
  );
};

//CUSTOM STYLE COMPONENT FOR PROFILE
const InfoItem: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
    <div className='mb-4'>
      <h3 className='font-semibold text-base sm:text-lg text-gray-700 mb-1'>{label}</h3>
      <p className='bg-gray-100 text-gray-800 text-sm sm:text-base p-2 rounded'>{value}</p>
    </div>
);

export default Profile;

