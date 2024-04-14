import React, { createContext, useState } from 'react';

export const AccessContext = createContext();

export const AccessProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [providerToken, setProviderToken] = useState(null);

  const updateAccessToken = (newToken) => {
    setAccessToken(newToken);
  };
  
  const updateProviderToken = (newToken) => {
    setProviderToken(newToken);
  };
  const value = { 
    accessToken, 
    providerToken,
    updateAccessToken,
    updateProviderToken
   };

  return (
    <AccessContext.Provider value={value}>
      {children}
    </AccessContext.Provider>
  );
};