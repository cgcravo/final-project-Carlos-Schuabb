import styled from "styled-components";
import React from "react";
import { FaGithub, FaLinkedin, FaInstagramSquare, FaCopyright } from "react-icons/fa";

const Footer = () => {

  return(
    <StyledFooter>
      <MediaIcons>
        <FaLinkedin className="icon"/>
        <FaGithub className="icon"/>
        <FaInstagramSquare className="icon"/>
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