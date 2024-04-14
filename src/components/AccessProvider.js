import React, { createContext, useState } from 'react';

export const AccessContext = createContext();

export const AccessProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  const updateAccessToken = (newToken) => {
    setAccessToken(newToken);
  };

  const value = { accessToken, updateAccessToken };

  return (
    <AccessContext.Provider value={value}>
      {children}
    </AccessContext.Provider>
  );
};