import { HiMagnifyingGlass } from "react-icons/hi2";
import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuggestionList from "./SuggestionList";

const SearchBar = () => {

  const [name, setName] = useState("")

  const Navigate = useNavigate()

  //CHANGE IT FOR THE RIGHT ID
  const handleSelect = (suggestion) => {
    Navigate(`/find-a-bloco/${suggestion}`)
  }

  return(
    <>
    <StyledForm>
      <Input placeholder="Find a Bloco!" type="text" value={name} onChange={(ev) => {setName(ev.target.value)}} onKeyDown={(ev) => {ev.key === "Enter" && handleSelect(ev.target.value)}}/>
      <SubmitButton type="submit">
        <HiMagnifyingGlass size={18} />
      </SubmitButton>
    </StyledForm>
    <SuggestionList suggestion={suggestion} name={name} handleSelect={handleSelect} categories={categories}/>
    </>
  )
}

const StyledForm = styled.form`
  display: flex;
  align-items: center;
`
const Input = styled.input`
  width: 40vw;
  height: 2em;
  border: none;
  border-radius: 1em;
  text-align: center;
  &:hover, :active{
    border: none;
  }
  &:focus{
    border: none;
    outline: 0.03em solid blue;
  }
`;

const SubmitButton = styled.button`
  border: none;
  background-color: rgba(0,0,0,0.001);
  color: white;
  cursor: pointer;
`;

export default SearchBar;