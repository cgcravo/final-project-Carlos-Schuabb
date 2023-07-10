import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";
import MyBlcosList from "./MyBlocosList.js";
import styled from "styled-components";
import { useContext, useEffect, useState} from "react";
import { UserContext } from "../../context/UserContext.js";
import { BlocosNamesContext } from "../../context/BlocosNamesContext.js";
import { useNavigate } from "react-router-dom";

const MyBlcos = () => {

  const { currentUser } = useContext(UserContext);
  const { fetchNames } = useContext(BlocosNamesContext);
  const [userBlocos, setUserBlocos] = useState(null);
  const[lat, setLat] = useState(null);
  const[lng, setLng] = useState(null);
  const Navigate = useNavigate();

  useEffect(()=>{
    if(!currentUser){
      Navigate("/Home")
    }
  },[])

  const fetchUserBlocos = async () => {

    const stringSub = currentUser.sub.toString()

    fetch(`/my-blocos/${stringSub}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 200) {
          setUserBlocos(parse.data);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserBlocos();
    }
  }, []);

  const goToHandler = (blocoId) => {
    Navigate(`/find-a-bloco/${blocoId}`)
  };

  const deleteHandler = (blocoId)=> {

    const stringSub = currentUser.sub.toString()

    fetch("/delete-bloco", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id:stringSub, name: blocoId }),
    })
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 200) {
          window.alert("Bloco successfully deleted");
          setUserBlocos(parse.data)
          fetchNames()
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  const getLocation = async () => {

    if ("geolocation" in navigator) {
      //getCurrentPosition gets the user position at that time
      try{ 
        await navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLat(lat); //the method didn't allow to do it in 1 line
          setLng(lng);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } catch (err) {
      // Geolocation is not supported by the browser
      // give back a fix location (in this case the concordia university coordinates)
      const lat = 45.49520229274075;
      const lng = -73.57788271059083;
      setLat(lat);
      setLng(lng);
      console.error("Geolocation is not supported by this browser.");
    }}

  };
  //this handler gets the user position and then send it to the database
  const shareHandler = (blocoId) => {
    
    getLocation()
    // if ("geolocation" in navigator) {
    //   //getCurrentPosition gets the user position at that time
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const lat = position.coords.latitude;
    //       const lng = position.coords.longitude;
    //       setLat(lat); //the method didn't allow to do it in 1 line
    //       setLng(lng);
    //     },
    //     (error) => {
    //       console.error("Error getting user location:", error);
    //     }
    //   );
    // } else {
    //   // Geolocation is not supported by the browser
    //   // give back a fix location (in this case the concordia university coordinates)
    //   const lat = 45.49520229274075;
    //   const lng = -73.57788271059083;
    //   setLat(lat);
    //   setLng(lng);
    //   console.error("Geolocation is not supported by this browser.");
    // }

    // console.log(lat, lng, "2")
    //fetch that updates the latitude and lng
    
    fetch("/share-coordinates", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: blocoId, lat: lat, lng: lng }),
    })
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 200) {
          window.alert(parse.message);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
    
  }
  
  return <>
    <Header/>
    <Main>
      <Container>
        {userBlocos ? <MyBlcosList userBlocos={userBlocos} goToHandler={goToHandler} deleteHandler={deleteHandler} shareHandler={shareHandler}/> : <p>Loading...!</p>}
      </Container>
    </Main>
    <Footer/>
  </>
}

const Container =styled.div`
  padding-top: 2em;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`

export default MyBlcos;