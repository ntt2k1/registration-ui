import React, { useEffect, useState } from 'react';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Component/Main/Home';
import ProtectedRoute from './Component/Auth/ProtectedRoute';

const App = () => {
  const [isAllow, setIsAllow] = useState(false);
  let token = sessionStorage.getItem('auth');

  useEffect(() => {
    if (token) {
      setIsAllow(true);
    }
  }, [token]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/home',
      element: (
        <ProtectedRoute isAllow={isAllow}>
          <Home />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
