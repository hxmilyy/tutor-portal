import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('tutor@champcode.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email);
      navigate('/dashboard'); // login success redirect
    } catch (error) {
      alert('Login failed, please check your credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Here you can put the Logo */}
        <div className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
          C
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Champ Code Academy</h2>
        <p className="mt-2 text-sm text-gray-600">Tutor Portal</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300"
              >
                {loading ? 'Validating...' : 'Login'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <span className="text-xs text-gray-400 italic">Tip: You can enter any information to proceed</span>
          </div>
        </div>
      </div>
    </div>
  );
};