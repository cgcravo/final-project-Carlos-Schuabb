import { React, useContext } from "react";//maybe will remove
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../../context/UserContext";//maybe will remove

const Home = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const { setCurrentUser } = useContext(UserContext);
  
  if(user && isAuthenticated)
  setCurrentUser(user);

  return <>
    <p>This is the home page</p>
  </>
}

export default Home;