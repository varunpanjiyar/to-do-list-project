import React, { createContext, useState } from 'react';

// Create the context
export const DataContext = createContext(null);




export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
