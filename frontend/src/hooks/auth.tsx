import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  avatar_url: string;
  created_at: string;
}

interface AuthState {
  token: string;
  user: UserData;
}

interface SignInCredential {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  user: UserData;
  signIn(credentials: SignInCredential): Promise<void>;
  signUp(data: SignUpData): Promise<void>;
  signOut(): void;
  isSigned: boolean;
  updateUser(user: UserData): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Buggy:token');
    const user = localStorage.getItem('@Buggy:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredential) => {
    const response = await api.post('/sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@Buggy:token', token);
    localStorage.setItem('@Buggy:user', JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signUp = useCallback(async ({ name, email, password }: SignUpData) => {
    await api.post('/users', { name, email, password });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Buggy:token');
    localStorage.removeItem('@Buggy:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: UserData) => {
      localStorage.setItem('@Buggy:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  const isSigned = !!data.user;

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, signUp, isSigned, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
