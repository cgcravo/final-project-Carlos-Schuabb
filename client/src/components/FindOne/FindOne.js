/* global google */
import { GoogleMap, MarkerF, useLoadScript, InfoWindowF } from "@react-google-maps/api";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext.js";
import { MdOutlineAddLocation } from 'react-icons/md'
import { MdOutlineDone } from 'react-icons/md'
import styled from "styled-components";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";
import { useParams } from "react-router-dom";

//NEEDS INFOWINDOW

const FindOne = () => {

  const[bloco, setBloco] = useState(null);
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [userFavorites, setUserFavorites] = useState();

  //mapRef: Stores the reference of the map component
  const [mapRef, setMapRef] = useState();

  //isOpen: Manages the state of the InfoWindow component
  const [isOpen, setIsOpen] = useState(false);

  //infoWindowData: Stores the necessary data of a specific marker
  const [infoWindowData, setInfoWindowData] = useState();

  //get the bloco when mount
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
  },[id]);

  //extracting conditionally the lat and lng for using on map load
  let lat = null;
  let lng =null; 
  if(bloco){
    lat = bloco.lat;
    lng = bloco.lng;
  }

  //function to get the user favorites
  const getUserFavorites = async () => {

    const stringSub = currentUser.sub.toString()

    fetch(`/favorites/${stringSub}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 200) {
          setUserFavorites(parse.data);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  //get the user favorites when mount
  useEffect(() => {
    if (currentUser) {
      getUserFavorites();
    }
  }, []);

  //function to add the bloco to the user favorites
  const addToUserFavorites = async(name) => {
    const body = {_id: currentUser.sub, name: name}

    fetch(`/new-favorite`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 200) {
          window.alert(parse.message);
          getUserFavorites() //necessary to render the change 
        } else if (parse.status === 409){
          window.alert(parse.message);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  //handler for adding bloco to favorites
  const handlerFavoritesButton = async(name) => {
    await addToUserFavorites(name)
  }

  const onMapLoad = (map) => {
    setMapRef(map);
  };

  const handleMarkerClick = (lat, lng, id) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData(id);
    setIsOpen(true);
  };

  
  //useLoadScript: It loads the Google Maps API script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBpjW_xSBCDcTSRuu5wpJ5mnIj_YpHwVAE"
  });

  return <>
    <Header/>
    <Main>
    {bloco && <MapApp className="Map-App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (// creates a map with just one marker as center
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onMapLoad}
          center={new google.maps.LatLng(lat, lng)}
          zoom={12}
          onClick={() => setIsOpen(false)}
        >
          <MarkerF position={new google.maps.LatLng(lat, lng)} name={bloco.name} onClick={() => {
            handleMarkerClick(bloco.lat, bloco.lng, bloco._id);
          }} >
            {isOpen && infoWindowData === bloco._id && (
            //Creates a window with info 
            <InfoWindowF position={{lat: bloco.lat, lng: bloco.lng}}
            //By default InfoWindow comes with the close icon on the top right corner
            //Set the isOpen state as false to hide the InfoWindow component by clicking on the close icon
              onCloseClick={() => {
                setIsOpen(false);
              }}
            ><InfoDiv>
              <h3>{bloco.name}</h3>
              <p>{bloco.address}</p>
              <p className="date">{bloco.date}</p>
              {currentUser && !userFavorites.includes(bloco.name) && <StyledMdOutlineAddLocation size={30} onClick={()=> handlerFavoritesButton(bloco._id)}/>}
              {currentUser && userFavorites.includes(bloco.name) && <StyledMdOutlineDone size={30} disabled/>}
            </InfoDiv>
            </InfoWindowF>
          )}
        </MarkerF>
        </GoogleMap>
      )}
    </MapApp>}
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
const InfoDiv = styled.div`
  width: 8em;
  text-align: center;

  & h3{
    font-weight: 700;
    font-size: 1.3em;
    padding: 0 0 0.5em 0;
  }

  & p{
    font-style: italic;
    font-size: 0.8em;
  }

  & .date {
    font-size: 0.8em;
  }
`
const StyledMdOutlineAddLocation = styled(MdOutlineAddLocation)`
  color: green;
`

const StyledMdOutlineDone = styled(MdOutlineDone)`
  color: green;
`

export default FindOne;