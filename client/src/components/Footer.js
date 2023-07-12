import styled from "styled-components";
import React from "react";
import { FaGithub, FaLinkedin, FaInstagramSquare, FaCopyright } from "react-icons/fa";

const Footer = () => {

  const clickHandler = (url) => {
    window.location.href = `${url}`
  }

  return(
    <StyledFooter>
      <MediaIcons>
        <FaLinkedin className="icon" onClick={() => clickHandler("https://www.linkedin.com/in/carlos-guilherme-cravo-schuabb-7a9bab223/")}/>
        <FaGithub className="icon" onClick={() => clickHandler("https://github.com/cgcravo/final-project-Carlos-Schuabb")}/>
        <FaInstagramSquare className="icon" onClick={() => window.alert("Instagram page under construction")}/>
      </MediaIcons>
      <RightsContainer>
        <FaCopyright className="icon"/><RightsText>2023 Carlos Schuabb. All rights reserved.</RightsText>
      </RightsContainer>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;

  & .icon{
    font-size: 1em;
    margin: 0.2em;
  }
`

const MediaIcons = styled.div`
  margin: 0.5em 0;
`

const RightsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const RightsText = styled.p`
  font-size: 1em;
`


export default Footer;