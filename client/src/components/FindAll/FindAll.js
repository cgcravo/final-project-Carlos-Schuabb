/* global google */
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  InfoWindowF,
} from "@react-google-maps/api";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext.js";
import { MdOutlineAddLocation } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import styled from "styled-components";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";

const FindAll = () => {
  const [allBlocos, setAllBlocos] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [userFavorites, setUserFavorites] = useState();
  //get all blocos when mount
  useEffect(() => {
    fetch(`/blocos`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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

  //function to get the user favorites
  const getUserFavorites = async () => {
    const stringSub = currentUser.sub.toString();

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

  //useLoadScript: It loads the Google Maps API script
  //key will be hidden latter
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.API_MAPS_KEY,
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
    allBlocos?.forEach((bloco) =>
      bounds.extend({ lat: bloco.lat, lng: bloco.lng })
    );
    map.fitBounds(bounds);
  };

  //HANDLER FOR SHOWING DATA WHEN CLICKED
  //Set the clicked marker at the center position of the map by providing the latitude and longitude to the panTo method.
  //Set the necessary data for a specific marker
  //Change the isOpen state to true to show the InfoWindow component
  const handleMarkerClick = (lat, lng, id) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData(id);
    setIsOpen(true);
  };

  //function to add the bloco to the user favorites
  const addToUserFavorites = async (name) => {
    const body = { _id: currentUser.sub, name: name };

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
          getUserFavorites(); //necessary to render the change
        } else if (parse.status === 409) {
          window.alert(parse.message);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  //handler for adding bloco to favorites
  const handlerFavoritesButton = async (name) => {
    await addToUserFavorites(name);
  };

  return (
    <>
      <Header />
      <Main>
        {/* this is the box that will contain the application */}
        {allBlocos && (
          <MapApp className="Map-App">
            {!isLoaded ? (
              <h1>Loading...</h1>
            ) : (
              //Creates the map with all markes and info on click
              <GoogleMap
                mapContainerClassName="map-container"
                onLoad={onMapLoad}
                //Set the isOpen state to false to hide the InfoWindow component by clicking anywhere on the map
                onClick={() => setIsOpen(false)}
                options={{streetViewControl: false}}
              >
                {allBlocos &&
                  allBlocos.map((bloco) => (
                    <MarkerF
                      key={bloco._id}
                      // isDisabled={}
                      name={bloco.name}
                      position={{ lat: bloco.lat, lng: bloco.lng }}
                      onClick={() => {
                        handleMarkerClick(bloco.lat, bloco.lng, bloco._id);
                      }}
                    >
                      {/* open the info window that belongs to the specific bloco */}
                      {isOpen && infoWindowData === bloco._id && (
                        //Creates a window with info
                        <InfoWindowF
                          position={{ lat: bloco.lat, lng: bloco.lng }}
                          //By default InfoWindow comes with the close icon on the top right corner
                          //Set the isOpen state as false to hide the InfoWindow component by clicking on the close icon
                          onCloseClick={() => {
                            setIsOpen(false);
                          }}
                        >
                          <InfoDiv>
                            <h3>
                              {
                                allBlocos.find(
                                  (bloco) => bloco._id === infoWindowData
                                ).name
                              }
                            </h3>
                            <p>
                              {
                                allBlocos.find(
                                  (bloco) => bloco._id === infoWindowData
                                ).address
                              }
                            </p>
                            {/* use date time methods to compare the time and to get strings out of the date */}
                            {allBlocos
                              .find((bloco) => bloco._id === infoWindowData)
                              .date && <p className="date">{allBlocos
                              .find((bloco) => bloco._id === infoWindowData)
                              .date}</p>}
                            {currentUser &&
                              !userFavorites.includes(
                                allBlocos.find(
                                  (bloco) => bloco._id === infoWindowData
                                ).name
                              ) && (
                                <StyledMdOutlineAddLocation
                                  size={30}
                                  onClick={() =>
                                    handlerFavoritesButton(bloco._id)
                                  }
                                />
                              )}
                            {currentUser &&
                              userFavorites.includes(
                                allBlocos.find(
                                  (bloco) => bloco._id === infoWindowData
                                ).name
                              ) && <StyledMdOutlineDone size={30} disabled />}
                          </InfoDiv>
                        </InfoWindowF>
                      )}
                    </MarkerF>
                  ))}
              </GoogleMap>
            )}
          </MapApp>
        )}
      </Main>
      <Footer />
    </>
  );
};

const MapApp = styled.div`
  height: 90vh;
  width: 100vw;

  .map-container {
    height: 100%;
    width: 100%;
  }
`;
const InfoDiv = styled.div`
  width: 8em;
  text-align: center;

  & h3 {
    font-weight: 700;
    font-size: 1.3em;
    padding: 0 0 0.5em 0;
  }

  & p {
    font-style: italic;
    font-size: 0.8em;
  }

  & .date {
    font-size: 0.8em;
  }
`;
const StyledMdOutlineAddLocation = styled(MdOutlineAddLocation)`
  color:green;
`;

const StyledMdOutlineDone = styled(MdOutlineDone)`
  color: green;
`;

// const DateTime = styled.div`
//   display:flex;
//   flex-direction: row;
// `
export default FindAll;


// new Date(allBlocos
//   .find((bloco) => bloco._id === infoWindowData)
//   .date)) < Date.now() ? (
//   <DateTime>
//   { <p className="date">
//     {(new Date(allBlocos
//       .find((bloco) => bloco._id === infoWindowData)
//       .date)).getDate()}
//   </p> }
//   { <p className="time">
//     {allBlocos
//       .find((bloco) => bloco._id === infoWindowData)
//       .date.getHours()}
//   </p> }
//   </DateTime>