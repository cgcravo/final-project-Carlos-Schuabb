import React from "react";
import GlobalStyles from "./GlobalStyles";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome/Welcome";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import About from "./components/About/About";
import FindOne from "./components/FindOne/FindOne";
import FindAll from "./components/FindAll/FindAll";
import New from "./components/New/New";
import Mine from "./components/Mine/Mine";
import Favorites from "./components/Favorites/Favorites";

const App = () => {
  return (
    <>
    <GlobalStyles />
    
    <Router>
        <Header />
        <Main>
        <Routes>
            <Route path="/" element={<Welcome />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/find-a-bloco" element={<FindOne />}/>
            <Route path="/find-all-blocos" element={<FindAll />}/>
            <Route path="/new-bloco" element={<New />}/>
            <Route path="/my-blocos" element={<Mine />}/>
            <Route path="/favorite-blocos" element={<Favorites />}/>
            <Route path="/*" element={<Home />} />
            {/* <Route path="*" element={<Error />}/> */}
        </Routes>
        </Main>
        <Footer />
    </Router>
    </>
  );
}

export default App;
