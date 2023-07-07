import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";
import MyBlcosList from "./MyBlocosList.js";
import styled from "styled-components";
import { useContext, useEffect, useState} from "react";
import { UserContext } from "../../context/UserContext.js";
import { useNavigate } from "react-router-dom";

const MyBlcos = () => {

  const { currentUser } = useContext(UserContext);
  const [userBlocos, setUserBlocos] = useState(null);
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
    Navigate(`/finda-a-bloco/${blocoId}`)
  };

  const deleteHandler = (blocoId)=> {

    fetch("/delete-bloco", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: { name: blocoId },
    })
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 204) {
          window.alert("Bloco successfully deleted");
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  const shareHandler = () => {
    console.log("stretching goal")
    //maybe create a context that will receive the bloco to go live and have a timer
    //every defined time it will fetch the db and update the bloco lat and lng for the users current one
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