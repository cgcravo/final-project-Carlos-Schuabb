import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";
import MyBlcosList from "./MyBlocosList.js";
import styled from "styled-components";
import { useContext, useEffect, useState} from "react";
import { UserContext } from "../../context/UserContext.js";
import { UserLocationContext } from "../../context/UserLocationContext.js";
import { BlocosNamesContext } from "../../context/BlocosNamesContext.js";
import { useNavigate } from "react-router-dom";

const MyBlcos = () => {

  const { currentUser } = useContext(UserContext);
  const { fetchNames } = useContext(BlocosNamesContext);
  const [userBlocos, setUserBlocos] = useState(null);
  const { userLat, userLng } = useContext(UserLocationContext);

  const Navigate = useNavigate();

  useEffect(()=>{
    if(!currentUser){
      Navigate("/Home")
    }
  },[])

  //function to fetch the users blocos
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

  //get the blocos if user exist
  useEffect(() => {
    if (currentUser) {
      fetchUserBlocos();
    }
  }, []);

  //go to button handler
  const goToHandler = (blocoId) => {
    Navigate(`/find-a-bloco/${blocoId}`)
  };

  //delete button handler
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

  //share button handler
  const shareHandler = (blocoId) => {
    
    console.log(userLat, userLng, "2")
    //fetch that updates the latitude and lng
    fetch("/share-coordinates", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: blocoId, lat: userLat, lng: userLng }),
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
        {userBlocos ? <MyBlcosList lat={userLat} lng={userLng} userBlocos={userBlocos} goToHandler={goToHandler} deleteHandler={deleteHandler} shareHandler={shareHandler}/> : <p>Loading...!</p>}
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