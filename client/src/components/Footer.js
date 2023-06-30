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
        <FaCopyright className="icon"/><p>2023 Carlos Schuabb. All rights reserved.</p>
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
  margin: 1em 0;
`

const RightsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default Footer;