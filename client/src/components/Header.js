import Navigator from "./Navigator.js";//maybe not
import styled from "styled-components";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext.js";
import LoginButton from "./Login/LoginButton.js";
import LogoutButton from "./Login/LogoutButton.js";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SarchBar.js";
import Burger from "./Burger.js";


const Header = () => {

    const { currentUser } = useContext(UserContext);
    const Navigate = useNavigate()

    return (
        <StyledHeader>
            {!currentUser ? <PlaceholderDiv></PlaceholderDiv>: <StyledImage src={currentUser.picture} onClick={() => {Navigate("/profile")}}/>}          
            <Burger/>
            <SearchBar/>
            {/* <Navigator/> maybe not*/}
            {!currentUser ? <LoginButton/> :
            <LogoutButton/>}
        </StyledHeader>
    )
};

const StyledHeader = styled.header`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    height: 5em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    transition: all 0.7s ease-in-out;
    background-color: rgba(0,0,0,0.8);
    position: fixed;
    z-index: 10;
`;

const PlaceholderDiv = styled.div`
    width: 2.5em;
    height: 2.5em;
`

const StyledImage = styled.img`
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
`
export default Header;