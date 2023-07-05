import styled from "styled-components";

const SuggestionList = ({ suggestion, name, handleSelect, categories }) => {
  const matchedSuggestions = suggestion.filter((book) => {
    return book.title.toLowerCase().includes(name.toLowerCase());
  });

  return (
    <List>
      {name.length > 1 &&
        matchedSuggestions.map((suggestion) => {
          const firstHalf = suggestion.title.slice(
            0,
            suggestion.title.indexOf(name)
          );
          const secondHalf = suggestion.title.slice(
            suggestion.title.indexOf(name)
          );

          return (
            <Item
              key={suggestion.id}
              onClick={() => handleSelect(suggestion.title)}
              onKeyDown={(event) => {
                event.key === "Enter" && handleSelect(suggestion.title);
              }}
              tabIndex={0}
            >
              <span>
                {firstHalf}
                <strong>{secondHalf}</strong>
                <Italic>
                  {" "}
                  in{" "}
                  <span className="category">
                    {categories[suggestion.categoryId].name}
                  </span>
                </Italic>
              </span>
            </Item>
          );
        })}
    </List>
  );
};

const List = styled.ul`
  box-shadow: -0.3em 0.2em 0.5em lightgray, 0.3em 0.2em 0.5em lightgray;
`;

const Item = styled.li`
  font-size: 0.8em;
  margin: 0.5em;
  padding: 0.2em 0.2em;

  &&:hover {
    background-color: beige;
  }

  &&:focus {
    background-color: beige;
  }
`;
const Italic = styled.span`
  font-style: italic;

  && .category {
    color: purple;
  }
`;

export default SuggestionList;
