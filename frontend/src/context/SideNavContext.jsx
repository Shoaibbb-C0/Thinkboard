import { createContext, useContext, useState } from "react";

const SideNavContext = createContext(null);

export const SideNavProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SideNavContext.Provider
      value={{
        isOpen,
        toggleSideNav,
      }}
    >
      {children}
    </SideNavContext.Provider>
  );
};

export const useSideNav = () => {
  return useContext(SideNavContext);
};
