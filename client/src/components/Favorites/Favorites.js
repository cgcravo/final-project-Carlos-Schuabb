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

  const Navigate = useNavigate();
  useEffect(()=>{
    if(!currentUser){
      Navigate("/Home")
    }
  },[])

  const fetchFavorites = async () => {

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

  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
    }
  }, []);

  const goToHandler = (blocoId) => {
    Navigate(`/finda-a-bloco/${blocoId}`)
  };

  const deleteHandler = (blocoId)=> {

    const stringSub = currentUser.sub.toString()
    //blocoId is undefined, why?
    console.log(blocoId)
    console.log(stringSub)

    fetch("/favorites", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {_id: stringSub, name: blocoId},
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
        {userFavorites ? <FavoritesList userFavorites={userFavorites} goToHandler={goToHandler} deleteHandler={deleteHandler}/> : <p>Loading...!</p>}
      </Container>
    </Main>
    <Footer/>
  </>
}

const Container = styled.div`
  padding-top: 2em;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


export default Favorites;