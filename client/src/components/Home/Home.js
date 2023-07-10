/* global google */
import { React, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../../context/UserContext.js";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import styled from "styled-components";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";


const Home = () => {

  const google = window.google;
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { setCurrentUser } = useContext(UserContext);
  const[lat, setLat] = useState(null);
  const[lng, setLng] = useState(null);

  useEffect(() => {
    if (user && isAuthenticated) {
      setCurrentUser(user);
    }
  }, [isLoading]);

  //useLoadScript: It loads the Google Maps API script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBpjW_xSBCDcTSRuu5wpJ5mnIj_YpHwVAE"
  });

  //Auth0 loading
  if(isLoading){
    return <div>Loading!</div>
  }
  
  //Maps Loading
  if(!isLoaded){
    return (<></>)
  }

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
        setLat(lat);
        setLng(lng);
      },
      // Error callback function
      (error) => {
        // Handle errors, e.g. user denied location sharing permissions
        console.error("Error getting user location:", error);
      }
    );
  } else {
    // Geolocation is not supported by the browser
    // give back a fix location (in this case the concordia university coordinates)
    const lat = 45.49520229274075;
    const lng = -73.57788271059083;
    setLat(lat);
    setLng(lng);
    console.error("Geolocation is not supported by this browser.");
  }

  return <>
    <Header/>
    <Main>
    <MapApp className="Map-App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (// creates a map with just one marker as center

        <GoogleMap
          mapContainerClassName="map-container"
          center={new google.maps.LatLng(lat, lng)}
          zoom={10}
        >
          <MarkerF position={new google.maps.LatLng(lat, lng)} />
        </GoogleMap>

      )}
    </MapApp>
    </Main>
    <Footer/>
  </>
}

const MapApp = styled.div`
  height: 100vh;
  width: 100vw;

  .map-container {
  height: 100%;
  width: 100%;
  }
`

export default Home;