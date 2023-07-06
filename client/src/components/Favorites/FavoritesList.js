import styled from "styled-components";
import { CiCircleRemove } from "react-icons/ci";

const FavoritesList = ({ userFavorites, goToHandler, deleteHandler}) => {

  return(
    <>
    {userFavorites.map((favorite) => {
      <Favorite>
        <h2>{favorite}</h2>
        <ButtonsContainer>
          <GoButton value={favorite} onClick={(event)=>goToHandler(event.target.value)}>Go!</GoButton>
          <CiCircleRemove value={favorite} size={18} onClick={(event)=>deleteHandler(event.target.value)}/>
        </ButtonsContainer>
      </Favorite>
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
  justify-content: space-around;
  align-items: center;

  &h2{
    font-size: 2em;
    font-weight: 600;
    color: black;
  }
`;

const ButtonsContainer = styled.div`
  width: 5em;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-evenly;
`

const GoButton = styled.button`
  width: 2em;
  height: 2em;
`

export default FavoritesList;