import Navigator from "./Navigator.js";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import LoginButton from "./Login/LoginButton.js";
import LogoutButton from "./Login/LogoutButton.js";

const Header = () => {


    // useEffect(() => {

    //     window.addEventListener('scroll', scrollHandle);
            
    //     return ()=>{window.removeEventListener('scroll', scrollHandle)}

    // });

    return (
        <StyledHeader>
            {/* <SearchBar/> */}
            <Navigator/>

            <LoginButton/>
            <LogoutButton/>
        </StyledHeader>
    )
};

// when width < x make a ball for the navigators (hamburger)
// create a on/off button for the darkmode => change text and background colors when clicked
// dark mode on the right side of the navbar
// make the header sticky and fade when on top
const StyledHeader = styled.header`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    height: 5em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    transition: all 0.7s ease-in-out;
    background-color: ${( {isTransparent} ) => isTransparent ? `none` : `var(--header-bg-color)`};
    position: fixed;
    z-index: 10;
`;


export default Header;