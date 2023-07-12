import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";
import styled from "styled-components";

const About = () => {

  return <>
    <Header/>
    <Main>
      <TextContainer>
        <h1>About Us</h1>
          <p>Carnival is worldwide known as Brazil's biggest touristic attraction. In 2023, the city of Rio de Janeiro had an estimated public of revelers of five million people with more than 500 legally registered street parades around the city in just 4 days.</p>
          <p>Most of these parades (<span> A.K.A. blocos </span>) travel many kilometers and have no specific trajectory, making very hard to find the one parade you wanted to attend to.</p>
          <p>Therefore, this application aims to help millions of people not to get lost and enjoy their time during this beautiful celebration of life!</p>
          <p>The project is a prototype for a real time geolocation app for finding carnival street parade's location in Brazil.</p>
      </TextContainer>
    </Main>
    <Footer/>
  </>
}

const TextContainer = styled.div`
  padding: 0 1em;

  & h1 {
    margin: 0.5em 0;
    font-size: 3em;
    font-weight: 700;
    text-align: center;
  }

  & p{
    font-size: 1.5em;
    padding-bottom: 0.5em;
    text-indent: 1em;
    text-align: justify
  }

  & span{
    font-style: italic;
  }
`

export default About;