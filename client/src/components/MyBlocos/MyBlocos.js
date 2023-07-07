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

  // const fetchUserBlocos = async () => {

  //   const stringSub = currentUser.sub.toString()

  //   fetch(`/favorites/${stringSub}`, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((parse) => {
  //       if (parse.status === 200) {
  //         setUserFavorites(parse.data);
  //         console.log(parse.data)
  //       }
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // };

  useEffect(() => {
    if (currentUser) {
      // fetchFavorites();
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
        {userBlocos ? <MyBlcosList userBlocos={userBlocos} goToHandler={goToHandler} deleteHandler={deleteHandler} shareHandler={shareHandler}/> : <p>Loading...!</p>}
      </Container>
    </Main>
    <Footer/>
  </>
}

const Container =styled.div`
`

export default MyBlcos;