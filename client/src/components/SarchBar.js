import { HiMagnifyingGlass } from "react-icons/hi2";
import { styled } from "styled-components";

const SearchBar = () => {

  return(
    <StyledForm>
      <Input placeholder="Find a Bloco!" />
      <SubmitButton type="submit">
        <HiMagnifyingGlass size={18} />
      </SubmitButton>
    </StyledForm>
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