import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  return (
      <div className=' p-10 cursor-pointer'
      onClick={() => navigate('/')}
      >
          <h1 className=' text-5xl ml-9 text-[#6B7280] outline-none font-medium'>Task Management</h1>
      </div>
  );
}

export default Header;
