import styled from "styled-components";
import { CiCircleRemove } from "react-icons/ci";

const FavoritesList = ({ userFavorites, goToHandler, deleteHandler}) => {

  return(
    <>
    {userFavorites.map((favorite) => {
      
      return (
      <Favorite key={favorite}>
        <h2>{favorite}</h2>
        <ButtonsContainer>
          <GoButton onClick={()=>goToHandler(favorite)}>Go!</GoButton>
          <StyledCiCircleRemove size={30} onClick={()=>deleteHandler(favorite)}/>
        </ButtonsContainer>
      </Favorite>
      )
    })}
    </>
  )
}

const Favorite = styled.div`
  width: 80%;
  height: 3em;
  margin: 0.5em 0;
  border: solid black 0.05em;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow:10px 5px 5px gray;

  & h2{
    font-size: 1.5;
    color: black;
    padding-left: 1em;
  }

`;

const ButtonsContainer = styled.div`
  width: 5em;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-evenly;
  transition: 0.1s ease-in-out;

`

const StyledCiCircleRemove = styled(CiCircleRemove)`
  color: red;
  transition: 0.1s ease-in-out;

  & :hover, :active{
    scale: 1.10;
    cursor: pointer;
  }
`

const GoButton = styled.button`
  font-family: var(--main-font-family);
  height: 2em;
  color: black;
  text-decoration: none;
  text-align: center;
  font-size: 1em;
  border-radius:1em;
  border: 1px solid black;
  transition: 0.5s ease-in-out;
  box-shadow:2px 2px 5px gray;

  & :hover, :active{
    scale: 1.10;
    cursor: pointer;
  }
`

export default FavoritesList;