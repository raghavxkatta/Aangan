import React, { createContext } from 'react';

// Placeholder for AuthContext
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // This will be filled in later with Firebase logic
  const value = { currentUser: null };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
