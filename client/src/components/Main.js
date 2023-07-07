import styled from "styled-components";
import React, { useState, useEffect } from 'react';

const Main = ( {children} ) => {


  return <Container className="main"> {children} </Container>
}

const Container = styled.main`
  width: 100%;
  position: absolute;
  top: 5em;
  background-color: white;
  
  @media only screen and (max-width: 500px) {
  
}
`

export default Main;