/* global google */
import { React, useContext, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../../context/UserContext.js";
import { UserLocationContext } from "../../context/UserLocationContext.js";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import styled from "styled-components";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";


const Home = () => {

  const google = window.google;
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { setCurrentUser } = useContext(UserContext);
  const { userLat, userLng } = useContext(UserLocationContext);

  useEffect(() => {
    if (user && isAuthenticated) {
      setCurrentUser(user);
    }
  }, [isLoading]);

  //useLoadScript: It loads the Google Maps API script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.API_MAPS_KEY,
  });

  //Auth0 loading
  if(isLoading){
    return <div>Loading!</div>
  }
  
  //Maps Loading
  if(!isLoaded){
    return (<></>)
  }

  return <>
    <Header/>
    <Main>
      {/* this is the box that will contain the application */}
    <MapApp className="Map-App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (// creates a map with just one marker as center

        <GoogleMap
          mapContainerClassName="map-container"
          center={new google.maps.LatLng(userLat, userLng)}
          zoom={10}
          options={{streetViewControl: false}}
        >
          <MarkerF position={new google.maps.LatLng(userLat, userLng)} />
        </GoogleMap>

      )}
    </MapApp>
    </Main>
    <Footer/>
  </>
}

const MapApp = styled.div`
  height: 90vh;
  width: 100vw;

  .map-container {
  height: 100%;
  width: 100%;
  }
`

export default Home;