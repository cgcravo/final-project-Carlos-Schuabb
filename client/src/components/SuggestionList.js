import styled from "styled-components";

const SuggestionList = ({ suggestion, name, handleSelect }) => {

  //returns an array of blocos that includes the typed caracteres
  const matchedSuggestions = suggestion.filter((bloco) => {
    return bloco.toLowerCase().includes(name.toLowerCase());
  });

  return (
    <List>
      {name.length > 1 &&
        matchedSuggestions.map((suggestion) => {
          const firstHalf = suggestion.slice(
            0,
            suggestion.indexOf(name)
          );
          const secondHalf = suggestion.slice(
            suggestion.indexOf(name)
          )

          return (
            <Item
              key={suggestion}
              onClick={() => handleSelect(suggestion)}
              onKeyDown={(event) => {
                event.key === "Enter" && handleSelect(suggestion);
              }}
              tabIndex={0}
            >
              <span>
                {firstHalf}
                <SecondHalf>{secondHalf}</SecondHalf>
              </span>
            </Item>
          );
        })}
    </List>
  );
};

const List = styled.ul`
  box-shadow: -0.3em 0.2em 0.5em lightgray, 0.3em 0.2em 0.5em lightgray;
  background-color: white;
  position: absolute;
  width: 40vw;
  border-radius: 0 0 10px 10px;
`;

const SecondHalf = styled.span`
  font-weight: 900;
  font-style: italic;
`

const Item = styled.li`
  font-size: 0.8em;
  margin: 0.5em;
  padding: 0.2em 0.2em;

  &:hover {
    background-color: beige;
  }

  &:focus { 
    background-color: beige;
  }
`;

export default SuggestionList;
