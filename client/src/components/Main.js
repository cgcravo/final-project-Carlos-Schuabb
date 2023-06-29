import styled from "styled-components";
import React, { useState, useEffect } from 'react';

const Main = ( {children} ) => {


  return <Container className="main"> {children} </Container>
}

const Container = styled.main`
  width: 100%;
  background-color: white;
  min-height: 80vh;
  
  @media only screen and (max-width: 600px) {
  background-color: red;
  
}
`
// Here are some notes (not things you have to change):

// Nice background fade on your nav when you scroll down.

// Remember to move console.logs once you're done testing.  I see a whole bunch of Booleans be thrown at me from Header.

// In your Contact section, consider a third option for questions.  Someone might want to ask you something that isn't yet related to a job offer.

// You should probably update the README.md file to reflect information about yourself.

// Your App.css file has un-used media / class rules.  - no doubt a relic of create react-app

// App.js is nice and clean!  Consider adding in that /* Route catch.

// I'm a big fan of making a folder for each Route - it keeps your file structure organized.

// In your NavContainer your StyledLinks are gaining a border on hover.  This is causing everything to bounce around.  Either change to using a outline (so it doesn't impact the flow of the DOM, or use box-sizing border-box, or give them a transparent border of the same width by default (that way on hover the color of the border changes, not the size of the border)

// Your Footer is very clean, get urls on those when you have them.

// I'm pretty sure JobOffer and Freelancer could become one Component with the use of a single prop.  They are very similar.


export default Main;