import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const token = localStorage.getItem('token');

  // Decode token immediately when provider is created and expose decoded payload
  let initialUser = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (!isExpired) {
        // store the entire decoded payload so components can access name, role, etc.
        initialUser = decoded;
      } else {
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error('Invalid token:', err);
      localStorage.removeItem('token');
    }
  }

  const [user, setUser] = useState(initialUser);

  return (
    <AuthContext.Provider value={{ user, setUser, token }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook so you don’t import useContext everywhere
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
