import React, { useState } from 'react';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import Home from './Component/Main/Home';
import ProtectedRoute from './Component/Auth/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  const [token, setToken] = useState(sessionStorage.getItem('auth'));

  const handleLogin = (data) => setToken(data);
  const handleLogout = () => setToken(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<Login login={handleLogin} />} />
        <Route path="" element={<Login login={handleLogin} />} />
        <Route
          path="home"
          element={
            <ProtectedRoute token={token}>
              <Home logout={handleLogout} token={token} />
            </ProtectedRoute>
          }
        />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
