import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";
import FavoritesList from "./FavoritesList.js";
import styled from "styled-components";
import { useContext, useEffect, useState} from "react";
import { UserContext } from "../../context/UserContext.js";
import { useNavigate } from "react-router-dom";

const Favorites = () => {

  const { currentUser } = useContext(UserContext);
  const [userFavorites, setUserFavorites] = useState(null);
  console.log(userFavorites)

  const Navigate = useNavigate();
  useEffect(()=>{
    if(!currentUser){
      Navigate("/Home")
    }
  },[])

  const fetchFavorites = async () => {

    const stringSub = currentUser.sub.toString()
    console.log(stringSub)
    console.log(typeof stringSub)
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
          console.log(parse.data)
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
    }
  }, []);

  const goToHandler = (blocoId) => {
    Navigate(`/finda-a-bloco/${blocoId}`)
  };

  const deleteHandler = (blocoId)=> {

    fetch("/favorites", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {_id: currentUser.sub, name: blocoId},
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
      {userFavorites ? <FavoritesList userFavorites={userFavorites} goToHandler={goToHandler} deleteHandler={deleteHandler}/> : <p>Loading...!</p>}
    </Main>
    <Footer/>
  </>
}

export default Favorites;