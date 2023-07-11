import { React, useEffect, useContext} from "react";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";
import { UserContext } from "../../context/UserContext.js";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const UserProfile = () => {

  const { currentUser } = useContext(UserContext);
  const Navigate = useNavigate();
  useEffect(()=>{
    if(!currentUser){
      Navigate("/Home")
    }
  },[])

  console.log(currentUser)

  return (
    <>
      <Header/>
      <Main>
        {currentUser && (
        <Container>
          <img src={currentUser.picture}/>
          {currentUser.name !== currentUser.email ? <h2>{currentUser.name}</h2> : <h2>{currentUser.nickname}</h2>}
          {currentUser.email && <p>{currentUser.email}</p>}
        </Container>
        )}
      </Main>
      <Footer/>
    </>
  );
};

const Container = styled.div`

  height: 100%;
  padding: 2em;
  margin: 2em 0;
  padding: 2em 0;
  display:flex;
  flex-direction: column;
  /* justify-content: center;
  text-align: center */
  align-items: center;

  & img{
    width: 10em;
    height: 10em;
    border-radius: 50%;
    margin-bottom: 2em;
  }

  & h2{
    font-size: 2em;
  }

  & p{
    font-size: 1.5em;
    font-style: italic;
  }

`


export default UserProfile;