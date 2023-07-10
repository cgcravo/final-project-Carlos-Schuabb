//context for keeping track of blocos names
import { createContext, useState } from "react";

export const BlocosNamesContext = createContext(null);

export const BlocosNamesProvider = ({ children }) => {

  const [blocosNames, setBlocosNames] = useState(null);

  const fetchNames = async () => {

      fetch("/blocos-names", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
        .then((response) => response.json())
        .then((parse) => {
          if (parse.status === 200) {
            setBlocosNames(parse.data);
          }
        })
        .catch((error) => {
          window.alert(error);
      });
  };

  if(!blocosNames){
    fetchNames();
  }

  return (
    <BlocosNamesContext.Provider value={ {blocosNames, fetchNames} }>
      {children}
    </BlocosNamesContext.Provider>
  );
};
