import { React, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../../context/UserContext";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";

const Home = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log(user)

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      console.log(currentUser);
    }
  }, [currentUser]);

  if(isLoading){
    return <div>Loading!</div>
  }
  
  if(user && isAuthenticated){
    setCurrentUser(user);
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