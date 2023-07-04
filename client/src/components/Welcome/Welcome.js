import LoginButtonWelcome from "../Login/LoginButtonWelcome";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Welcome = () => {

  const { currentUser } = useContext(UserContext);
  const Navigate = useNavigate()
  console.log(currentUser)

  if(currentUser){
    Navigate("/home")
  }

  return <>
  <ContentContainer>
    <TextContainer>
      <Title>Find My Bloco</Title>
      <h2>Never lose a bloco again!</h2>
    </TextContainer>
    <ButtonsContainer>
      <LoginButtonWelcome/>
      <ContinueButton to={"/home"}>Continue</ContinueButton>
    </ButtonsContainer>
  </ContentContainer>
  </>
};

const ContentContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-image: url("client/assets/DSC_3573.JPG");
`

const TextContainer = styled.div`
  width: 80%;
  text-align: center;

  & h2{
    font-size: 2em;
  }
`

const Title = styled.h1`
  font-size: 5em;
  margin-bottom: 0.5em;
`

const ButtonsContainer =styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`

const ContinueButton = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 2em;
  background-color: #635dff;
  color: black;
  font-weight: bold;
  font-size: 1.5em;
  margin: 0 1em;
  padding: 0 2em;
  border: none;
  border-radius:0.5em;
  transition: 0.3s ease-in-out;

  &:hover{
    scale: 1.10;
  }
`;

export default Welcome;