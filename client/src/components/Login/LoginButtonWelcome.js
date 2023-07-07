import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";

const LoginButtonWelcome = () => {
  const { loginWithRedirect } = useAuth0();

  return <StyledButton onClick={() => loginWithRedirect()}>Log In</StyledButton>;
};

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 2em;
  background-color: #635dff;
  color: black;
  font-weight: bold;
  font-size: 1.5em;
  margin: 1.5em 1em;
  padding: 0 2em;
  border: none;
  border-radius:0.5em;
  transition: 0.3s ease-in-out;

  &:hover{
    scale: 1.10;
  }

  @media only screen and (min-width: 550px) {
    width: 10em;
    padding: 0;
  }
`;

export default LoginButtonWelcome;