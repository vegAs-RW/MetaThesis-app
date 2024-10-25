import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, role } = response.data.data;
      if (response.data.message === 'Login successful') {
        dispatch(login({ token, role }));
        if (role === 'admin') {
          navigate('/dashboard/admin');
        } else if (role === 'advisor') {
          navigate('/dashboard/advisor');
        } else {
          setError('Probleme d\'autorisation');
        }
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-blue-500">
      <div className="w-full max-w-lg px-8 py-6 bg-white rounded-lg shadow-lg transform transition-all duration-500 hover:shadow-2xl md:px-10 md:py-8 lg:max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Connexion</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-md font-semibold text-gray-600">Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-md font-semibold text-gray-600">Mot de passe :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 shadow-lg focus:ring-4 focus:ring-blue-400 focus:outline-none"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
