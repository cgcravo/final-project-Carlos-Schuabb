/* global google */
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";
import { useParams } from "react-router-dom";

//NEEDS INFOWINDOW

const FindOne = () => {

  const[bloco, setBloco] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/blocos/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 200) {
          setBloco(parse.data);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }, []);

  let lat = null;
  let lng =null; 
  if(bloco){
    lat = bloco.lat;
    lng = bloco.lng;
  }
  
  //useLoadScript: It loads the Google Maps API script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBpjW_xSBCDcTSRuu5wpJ5mnIj_YpHwVAE"
  });

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
          zoom={12}
        >
          <Marker position={new google.maps.LatLng(lat, lng)} />
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