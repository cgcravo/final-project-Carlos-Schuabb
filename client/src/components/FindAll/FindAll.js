/* global google */
import { GoogleMap, MarkerF, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";

const FindAll = () => {

  const[allBlocos, setAllBlocos] = useState(null);

  useEffect(() => {
    fetch(`/blocos`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 200) {
          setAllBlocos(parse.data);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }, []);

  //useLoadScript: It loads the Google Maps API script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBpjW_xSBCDcTSRuu5wpJ5mnIj_YpHwVAE"
  });

  //mapRef: Stores the reference of the map component
  const [mapRef, setMapRef] = useState();

  //isOpen: Manages the state of the InfoWindow component
  const [isOpen, setIsOpen] = useState(false);

  //infoWindowData: Stores the necessary data of a specific marker
  const [infoWindowData, setInfoWindowData] = useState();
  
  //INITIAL STATE OF THE MAP
  //Set the reference of the map component
  //Set a default view of the map (all selected markers in the area )
  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    allBlocos?.forEach((bloco) => bounds.extend({ lat: bloco.lat, lng: bloco.lng }));
    map.fitBounds(bounds);
  };

  //HANDLER FOR SHOWING DATA WHEN CLICKED
  //Set the clicked marker at the center position of the map by providing the latitude and longitude to the panTo method.
  //Set the necessary data for a specific marker
  //Change the isOpen state to true to show the InfoWindow component
  const handleMarkerClick = (lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ address });
    setIsOpen(true);
  };

  return <>
    <Header/>
    <Main>

    {allBlocos && <MapApp className="Map-App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (//Creates the map with all markes and info on click
      <GoogleMap
      mapContainerClassName="map-container"
      onLoad={onMapLoad}
      //Set the isOpen state to false to hide the InfoWindow component by clicking anywhere on the map
      onClick={() => setIsOpen(false)}
    >
      {allBlocos && allBlocos.map((bloco) => (
        <MarkerF
          key={bloco._id}
          name={bloco.name}
          position={{ lat: bloco.lat, lng: bloco.lng }}
          onClick={() => {
            handleMarkerClick(bloco.lat, bloco.lng);
            setInfoWindowData(bloco._id);
            setIsOpen(true);
          }}
          onLoad={()=>{console.log("Marker has been loaded")}}
        >
          {isOpen && infoWindowData === bloco._id && (
            //Creates a window with info 
            <InfoWindow position={{lat: bloco.lat, lng: bloco.lng}}
            //By default InfoWindow comes with the close icon on the top right corner
            //Set the isOpen state as false to hide the InfoWindow component by clicking on the close icon
              onCloseClick={() => {
                setIsOpen(false);
              }}
            >
              <h3>{allBlocos.find((bloco)=>(bloco._id === infoWindowData)).name}</h3>
            </InfoWindow>
          )}
        </MarkerF>
      ))}
        </GoogleMap>
      )}
    </MapApp>}
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

export default FindAll;