// src/contexts/TabBarVisibilityContext.tsx
import React, { createContext, useState } from 'react';

interface TabBarVisibilityContextProps {
  isTabBarVisible: boolean;
  setIsTabBarVisible: (visible: boolean) => void;
}

export const TabBarVisibilityContext = createContext<TabBarVisibilityContextProps>({
  isTabBarVisible: true,
  setIsTabBarVisible: () => {},
});

export const TabBarVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  return (
    <TabBarVisibilityContext.Provider value={{ isTabBarVisible, setIsTabBarVisible }}>
      {children}
    </TabBarVisibilityContext.Provider>
  );
};
