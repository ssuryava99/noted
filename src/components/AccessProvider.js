import React, { createContext, useState } from 'react';

export const AccessContext = createContext();

export const AccessProvider = ({ children }) => {
  const [databaseID, setDatabaseID] = useState(null);
  const [providerToken, setProviderToken] = useState(null);

  const updateDatabaseID = (newToken) => {
    setDatabaseID(newToken);
  };
  
  const updateProviderToken = (newToken) => {
    setProviderToken(newToken);
  };
  const value = { 
    databaseID, 
    providerToken,
    updateDatabaseID,
    updateProviderToken
   };

  return (
    <AccessContext.Provider value={value}>
      {children}
    </AccessContext.Provider>
  );
};