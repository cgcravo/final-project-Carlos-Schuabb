//context for keeping track of user
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={ {currentUser, setCurrentUser} }>
      {children}
    </UserContext.Provider>
  );
};
