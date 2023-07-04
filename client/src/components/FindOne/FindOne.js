import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import styled from "styled-components";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";

const FindOne = () => {

  //useLoadScript: It loads the Google Maps API script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBpjW_xSBCDcTSRuu5wpJ5mnIj_YpHwVAE"
  });

  //initial position => pass the bloco position
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return <>
    <Header/>
    <Main>
    <p>This is the FindAll page</p>
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

export default FindOne;