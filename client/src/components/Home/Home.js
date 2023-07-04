import { React, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../../context/UserContext.js";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import styled from "styled-components";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";

const Home = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [isLoading]);

  //useLoadScript: It loads the Google Maps API script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBpjW_xSBCDcTSRuu5wpJ5mnIj_YpHwVAE"
  });

  //initial position => pass the bloco position
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  if(isLoading){
    return <div>Loading!</div>
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
          center={center}
          zoom={10}
        >
          <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
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