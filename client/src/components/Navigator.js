import { NavLink } from "react-router-dom";
import styled from "styled-components";
import React from "react";

const Navigator = () => {
    return (
        <NavContainer>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/about">About</StyledLink>
            <StyledLink to="/contact">Contact</StyledLink>
            <StyledLink to="/projects">Projects</StyledLink>
        </NavContainer>
    )
};

const NavContainer = styled.div`
    box-sizing: border-box;
`

const StyledLink = styled(NavLink)`
    font-weight: bold;
    text-decoration: none;
    text-align: center;
    color: black;
    font-size: 1.2em;
    margin: 0 10px;
    padding: 0 20px;

    &:hover{
        color: black;
        border-radius:15px;
        outline: 1px solid black;
        background-color: none;
    }

    & .active{
        color: black;
        border-radius:50%;
        outline: 1px solid black;
        background-color: none;
    }
`;

export default Navigator;