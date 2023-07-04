import { React } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if(isLoading){
    return <div>Loading!</div>
  }
  console.log(user)
  return (
    <>
      <Header/>
      <Main>
      {isAuthenticated && (
      <div>
        <img src={user.picture}/>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      )}
      </Main>
      <Footer/>
    </>
    
  );
};

export default UserProfile;