import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};
