import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import Header from './Header';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchAllUser = () => {
    return axios.get(process.env.REACT_APP_URL + '/api/auth/user');
}

const Home = ({ logout, token }) => {
  const { isLoading, data, isError, error } = useQuery('user', fetchAllUser);
  const [username, setUsername] = useState('');

  useEffect(() => {
    toast.success('Login successfully');
    var decoded = jwt_decode(token);
    setUsername(decoded.userName);
  }, [token]);

  if (isLoading) {
    return <h2>LOADING.....</h2>;
  }

  if (isError){
    return <h2>{error.message}</h2>
  }


  return (
    <div>
      <Header logout={logout} />
      <div style={{ fontSize: '50px', textAlign: 'center' }}>
        HELLO {username}
      </div>
      <br />
      <div style={{ fontSize: '30px', textAlign: 'center' }}>
        List of all users:
      </div>
      {data?.data.data.map((user) => {
        return (
          <div style={{ textAlign: 'center', fontWeight: '700' }} key={user._id}>
            {user.username}
          </div>
        );
      })}
      <ToastContainer autoClose={2000} theme="colored" />
    </div>
  );
};

export default Home;
