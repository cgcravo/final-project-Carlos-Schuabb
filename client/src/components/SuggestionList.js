import styled from "styled-components";

const SuggestionList = ({ suggestion, name, handleSelect }) => {

  // const matchedSuggestions = suggestion.filter((bloco) => {
  //   return bloco.name.toLowerCase().includes(name.toLowerCase());
  // });

  // return (
    // <List>
    //   {name.length > 1 &&
    //     matchedSuggestions.map((suggestion) => {
    //       const firstHalf = suggestion.name.slice(
    //         0,
    //         suggestion.title.indexOf(name)
    //       );
    //       const secondHalf = suggestion.name.slice(
    //         suggestion.title.indexOf(name)
    // )

          // return (
    //         <Item
    //           key={suggestion.id}
    //           onClick={() => handleSelect(suggestion.name)}
    //           onKeyDown={(event) => {
    //             event.key === "Enter" && handleSelect(suggestion.name);
    //           }}
    //           tabIndex={0}
    //         >
    //           <span>
    //             {firstHalf}
    //             <strong>{secondHalf}</strong>
    //             <Italic>
    //               {" "}
    //               in{" "}
    //               <span className="address">
    //                 {suggestion.address}
    //               </span>
    //             </Italic>
    //           </span>
    //         </Item>
    //       );
    //     })}
    // </List>
  // );
};

// const List = styled.ul`
//   box-shadow: -0.3em 0.2em 0.5em lightgray, 0.3em 0.2em 0.5em lightgray;
// `;

// const Item = styled.li`
//   font-size: 0.8em;
//   margin: 0.5em;
//   padding: 0.2em 0.2em;

//   &&:hover {
//     background-color: beige;
//   }

//   &&:focus {
//     background-color: beige;
//   }
// `;
// const Italic = styled.span`
//   font-style: italic;

//   && .address {
//     color: purple;
//   }
// `;

export default SuggestionList;
