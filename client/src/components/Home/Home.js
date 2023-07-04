import { React, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../../context/UserContext.js";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";

const Home = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log("from home", currentUser)

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [isLoading]);

  if(isLoading){
    return <div>Loading!</div>
  }
    
  return <>
    <Header/>
    <Main>
      <p>This is the home page</p>
    </Main>
    <Footer/>
  </>
}

export default Home;