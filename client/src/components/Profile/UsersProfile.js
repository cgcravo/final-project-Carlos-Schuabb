import { React, useEffect, useContext} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";
import { UserContext } from "../../context/UserContext.js";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {

  const { currentUser } = useContext(UserContext);
  const Navigate = useNavigate();
  useEffect(()=>{
    if(!currentUser){
      Navigate("/Home")
    }
  },[])


  return (
    <>
      <Header/>
      <Main>
      {currentUser && (
      <div>
        <img src={currentUser.picture}/>
        <h2>{currentUser.name}</h2>
        <p>{currentUser.email}</p>
      </div>
      )}
      </Main>
      <Footer/>
    </>
    
  );
};

export default UserProfile;