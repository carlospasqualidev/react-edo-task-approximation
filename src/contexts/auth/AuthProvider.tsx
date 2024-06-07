import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { IUserAccount } from '@/utils/types';

interface IAuthContext {
  user: IUserAccount | null;
  setUser: Dispatch<SetStateAction<IUserAccount | null>>;
  signIn: (token: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserAccount | null>({
    id: 'id',
    email: 'carlos.pasquali.dev@gmail.com',
    name: 'Carlos Pasquali',
  });

  const signIn = async (token: string) => {
    localStorage.setItem('token', token);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
