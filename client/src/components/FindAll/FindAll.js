/* global google */
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import styled from "styled-components";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";

const FindAll = () => {

  //useLoadScript: It loads the Google Maps API script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBpjW_xSBCDcTSRuu5wpJ5mnIj_YpHwVAE"
  });

  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  //mapRef: Stores the reference of the map component
  const [mapRef, setMapRef] = useState();

  //isOpen: Manages the state of the InfoWindow component
  const [isOpen, setIsOpen] = useState(false);

  //infoWindowData: Stores the necessary data of a specific marker
  const [infoWindowData, setInfoWindowData] = useState();

  //pass all the blocos data instead of these markers
  const markers = [
    {  lat: 18.5204, lng: 73.8567 },
    {  lat: 18.5314, lng: 73.8446 },
    {  lat: 18.5642, lng: 73.7769 },
  ];
  console.log(markers)

  //INITIAL STATE OF THE MAP
  //Set the reference of the map component
  //Set a default view of the map (all selected markers in the area )
  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
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
    <p>This is the FindAll page</p>

    <MapApp className="Map-App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (//Creates the map with all markes and info on click
      <GoogleMap
      mapContainerClassName="map-container"
      onLoad={onMapLoad}
      //Set the isOpen state to false to hide the InfoWindow component by clicking anywhere on the map
      onClick={() => setIsOpen(false)}
    >
      {markers.map(({ lat, lng }, index) => (
        <Marker
          key={index}
          position={{ lat, lng }}
          onClick={() => {
            handleMarkerClick(lat, lng);
          }}
          onLoad={()=>{console.log("Marker has been loaded")}}
        >
          {isOpen && infoWindowData?.id === index && (
            //Creates a window with info 
            <InfoWindow
            //By default InfoWindow comes with the close icon on the top right corner
            //Set the isOpen state as false to hide the InfoWindow component by clicking on the close icon
              onCloseClick={() => {
                setIsOpen(false);
              }}
            >
              {/* <h3>{infoWindowData.address}</h3> */}
            </InfoWindow>
          )}
        </Marker>
      ))}
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

export default FindAll;