import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  useEffect(() => {
    let token = sessionStorage.getItem('auth');
    toast.success('Login successfully');
    var decoded = jwt_decode(token);
    setUsername(decoded.userName);
  }, []);

  return (
    <div>
      <Header />
      <div style={{ fontSize: '50px' }}>HELLO {username}</div>
      <ToastContainer autoClose={2000} theme="colored" />
    </div>
  );
};

export default Home;
