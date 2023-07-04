import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";

const LoginButtonWelcome = () => {
  const { loginWithRedirect } = useAuth0();

  return <StyledButton onClick={() => loginWithRedirect()}>Log In</StyledButton>;
};

const StyledButton = styled.button`
  font-family: var(--main-font-family);
  height: 2em;
  background-color: #635dff;
  color: black;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  font-size: 1.5em;
  margin: 1em 1em;
  padding: 0 2em;
  border: none;
  border-radius:0.5em;

  &:hover{
      outline: 0.05em solid black;
  }
`

export default LoginButtonWelcome;