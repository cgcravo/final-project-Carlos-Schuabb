/* global google */
import { GoogleMap, MarkerF, useLoadScript, InfoWindowF, DirectionsRenderer } from "@react-google-maps/api";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext.js";
import { UserLocationContext } from "../../context/UserLocationContext.js";
import { MdOutlineAddLocation } from 'react-icons/md'
import { MdOutlineDone } from 'react-icons/md'
import { CiCircleRemove } from "react-icons/ci";
import { FaRoute } from "react-icons/fa";
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
  const { userLat, userLng } = useContext(UserLocationContext);
  
  //mapRef: Stores the reference of the map component
  const [mapRef, setMapRef] = useState();

  //isOpen: Manages the state of the InfoWindow component
  const [isOpen, setIsOpen] = useState(false);

  //infoWindowData: Stores the necessary data of a specific marker
  const [infoWindowData, setInfoWindowData] = useState();

  //the response we get from the directions API and other states needed for calculating
  //the origin will be the users location and the destination the bloco location
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration]=useState("");

  //this function calculate the route from the user to the bloco and renders it on the map
  const calculateRoute = async() => {
    if(!userLat || !userLng || !lat || !lng){
      return
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: new google.maps.LatLng(userLat, userLng),
      destination: new google.maps.LatLng(lat, lng),
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  };

  //this function clears the route calculations
  const clearRoute = async()=>{
    setDirectionsResponse(null)
    setDistance("")
    setDuration("")
  }

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

  //map is the google maps event
  const onMapLoad = (map) => {
    setMapRef(map);
  };

  //panTo redirects the map to the center given
  const handleMarkerClick = (lat, lng, id) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData(id);
    setIsOpen(true);
  };

  
  //useLoadScript: It loads the Google Maps API script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return <>
    <Header/>
    <Main>
      {/* this is the box that will contain the application */}
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
          options={{streetViewControl: false}}
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
        {/* user marker */}
        {currentUser && <MarkerF position={new google.maps.LatLng(userLat, userLng)} name={currentUser.nickname} onClick={() => {
            handleMarkerClick(userLat, userLng, currentUser.nickname);
          }}>
          {isOpen && infoWindowData === currentUser.nickname && (
            //Creates a window with info 
            <InfoWindowF position={{lat: userLat, lng: userLng}}
            //By default InfoWindow comes with the close icon on the top right corner
            //Set the isOpen state as false to hide the InfoWindow component by clicking on the close icon
              onCloseClick={() => {
                setIsOpen(false);
              }}
            ><InfoDiv>
              <h3>{currentUser.nickname}</h3>
              <img url={currentUser.img}/>
            </InfoDiv>
            </InfoWindowF>)}
        </MarkerF>}
        {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
        </GoogleMap>
      )}
        {currentUser && <DistanceBox>
          <ButtonsBox>
          <StyledFaRoute size={25} onClick={calculateRoute}/>
          <StyledCiCircleRemove size={25} onClick={clearRoute}/>
          </ButtonsBox>
          {directionsResponse && <div>
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
          </div>}
        </DistanceBox>}
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

const DistanceBox = styled.div`
  width: 5em;
  position: absolute;
  background-color: white;
  top: 0.6em;
  right: 4em;
  z-index: 100;
  border-radius: 0.2em;
  box-shadow: 1px 1px 2px gray;
  padding: 0.5em 0;

  & p{
    margin-top: 0.3em;
    font-size: 0.8em;
  }
`
const StyledFaRoute = styled(FaRoute)`
  color: #3878c7;
  transition: 0.1s ease-in-out;

  & :hover, :active{
    scale: 1.10;
    cursor: pointer;
  }
`

const StyledCiCircleRemove = styled(CiCircleRemove)`
  color: red;
  transition: 0.1s ease-in-out;

  & :hover, :active{
    scale: 1.10;
    cursor: pointer;
  }
`

const ButtonsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`
export default FindOne;