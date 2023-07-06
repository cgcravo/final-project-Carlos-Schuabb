import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";
import { useContext, useEffect} from "react";
import { UserContext } from "../../context/UserContext.js";
import { useNavigate } from "react-router-dom";

const Favorites = () => {

  const { currentUser } = useContext(UserContext);
  const Navigate = useNavigate();
  useEffect(()=>{
    if(!currentUser){
      Navigate("/Home")
    }
  },[])
  
  return <>
    <Header/>
    <Main>
    <p>This is the Favorites page</p>
    </Main>
    <Footer/>
  </>
}

export default Favorites;