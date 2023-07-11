//context for keeping track of user
import { createContext, useState } from "react";

export const UserLocationContext = createContext(null);

export const UserLocationProvider = ({ children }) => {

  //the default is location is the concordia university
  const [userLat, setUserLat] = useState(45.49520229274075);
  const [userLng, setUserLng] = useState(-73.57788271059083);

  // Check if geolocation method is supported by the browser 
  if ("geolocation" in navigator) {
    // Prompt user for permission to access their location
    //watchPosition follow the user's position in real-time as they move
    navigator.geolocation.watchPosition(
      // Success callback function
      (position) => {
        // Get the user's latitude and longitude coordinates
        // cant't pass directly to state, need to declare first
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLat(lat);
        setUserLng(lng);
      },
      // Error callback function
      (error) => {
        // Handle errors, e.g. user denied location sharing permissions
        console.error("Error getting user location:", error);
      }, {timeout:3000}
    );
  } else {
    // Geolocation is not supported by the browser
    console.error("Geolocation is not supported by this browser.");
  }

  return (
    <UserLocationContext.Provider value={ {userLat, userLng} }>
      {children}
    </UserLocationContext.Provider>
  );
};
