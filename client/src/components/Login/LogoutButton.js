import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <StyledButton onClick={() => logout({ logoutParams: { returnTo: "http://localhost:3000/home" } })}>
      Log Out
    </StyledButton>
  );
};

const StyledButton = styled.button`
  font-family: var(--main-font-family);
  height: 2em;
  background-color: white;
  color: black;
  text-decoration: none;
  text-align: center;
  font-size: 0.7em;
  border: none;
  border-radius:0.5em;
  transition: 0.5s ease-in-out;

  &:hover{
    scale: 1.25;
  }
`


export default LogoutButton;