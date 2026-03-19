import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // exactly like your login
        localStorage.setItem('token', token); // exactly like your login
        navigate('/home');
      } catch (err) {
        console.error('Token decode failed', err);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="flex items-center gap-3">
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        <p className="text-[#A3A3A3] text-sm">Logging you in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
