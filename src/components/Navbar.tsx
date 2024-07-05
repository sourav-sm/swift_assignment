import React from 'react';
import { Link } from 'react-router-dom';
import { GrLinkNext } from "react-icons/gr";

const Navbar: React.FC = () => {
  return (
    <div className='text-blue-950 bg-slate-100'>
      <div className='max-w-7xl mx-auto flex flex-wrap justify-between items-center'>
        <div className='text-xl font-bold hover:bg-blue-950 hover:text-white pointer p-4'>
          <Link to="/">Dashboard</Link>
        </div>
        <div className='flex items-center space-x-2 font-semibold hover:bg-blue-950 hover:text-white pointer p-4'>
          <Link to="/profile">
          Profile
          </Link>
          <GrLinkNext/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

