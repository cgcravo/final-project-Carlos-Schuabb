import Header from "../Header.js";
import Main from "../Main.js";
import Footer from "../Footer.js";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext.js";
import { UserLocationContext } from "../../context/UserLocationContext.js";
import { useNavigate } from "react-router-dom";
// import { DateTimePicker } from 'react-datetime-picker';//stretch

import styled from "styled-components";

const New = () => {
  const { currentUser } = useContext(UserContext);
  const { userLat, userLng } = useContext(UserLocationContext);
  const [radio, setRadio] = useState(null);
  // const [date, setDate] = useState(new Date());//stretch
  // const [formData, setFormData] = useState({});//will use when after addig more fields to the form
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);

  const Navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      Navigate("/Home");
    }
  }, []);

  //will use it when add more fields to the form
  // const handleChange = (key, value) => {
  //   setFormData({
  //       ...formData,
  //       [key]: value
  //   })
  // }

  const handleSubmit = (event) => {

    event.preventDefault()

    let body = {};
    if(radio === "auto"){
      console.log("this is the radio",radio)
      body = {name: name, address:"NA", lat: userLat, lng: userLng, admId: currentUser.sub, admName: currentUser.nickname}
    } else if (radio === "manual"){
      console.log("this is the radio",radio)
      body = {name: name, address: address, lat: "NA", lng: "NA", admId: currentUser.sub, admName: currentUser.nickname}
    } else{
      return window.alert("Select a method");
    }

    fetch("/new-bloco", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      })
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 201) {
          window.alert(parse.message);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  return (
    <>
      <Header />
      <Main>
        <Container>
          <StyledForm onSubmit={handleSubmit}>
            <NameContainer>
              <label htmlFor="address">
                <span>Bloco's Name:</span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(event) =>
                    setName(event.target.value)
                    // handleChange(event.target.id, event.target.value)//will use it when add more fields to the form 
                  }
                />
              </label>
            </NameContainer>

            <RadioContainer>
              <label htmlFor="auto">
                Use my location
                <input
                  type="radio"
                  id="auto"
                  name="location"
                  value="auto"
                  className="auto"
                  onChange={(event) => {
                    setRadio(event.target.value);
                  }}
                />
              </label>

              <label htmlFor="manual">
                Enter address manually
                <input
                  type="radio"
                  id="manual"
                  name="location"
                  value="manual"
                  className="manual"
                  onChange={(event) => {
                    setRadio(event.target.value);
                  }}
                />
              </label>
            </RadioContainer>
            {/* stretch */}
{/* 
            {!radio && (<>
              <DateTimePicker value={date} onChange={(event) =>{
                      setDate(event.target.value);
                      handleChange("date-time", date)}
                    }/>
            </>)} */}

            {radio === "manual" && (
              <AddressContainer>
                <label htmlFor="address">
                  <span>Address:</span>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    onChange={(event) =>
                      setAddress(event.target.value)
                      // handleChange(event.target.id, event.target.value)//will use it when add more fields to the form 
                    }
                  />
                </label>
              </AddressContainer>
            )}
            

            <SubmitButton type="submit">Submit</SubmitButton>
          </StyledForm>
        </Container>
      </Main>
      <Footer />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled.form`
  width: 80%;
  border: 0.1em solid black;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 1em;
  /* display: table; */

  & input {
    width: 40%;
    height: 20px;
  }
`;

const NameContainer = styled.div`
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* display: table-row; */

  & label{
    width: 100%;
    margin: 0;
    /* display: table-cell; */
  }
  
  & input{
    margin: 0;
    position: right;
    width: 60%;
    /* display: table-cell; */
  }

  & span{
    font-size: 1.2em;
    padding: 1em, 0;
    margin-right: 1em;
    text-align: left;
  }
`

const RadioContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1em 0;
  /* display: table-row; */

  & .auto,
  .manual {
    width: 1em;
    margin: 0em 0em 0em 1em;
  }

  & label {
    font-size: 1.2em;
  }
`;

const AddressContainer = styled.div`
  width: 100%;
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  & label{
    width: 100%;
    margin: 0;
    /* display: table-cell; */
  }
  
  & input{
    margin: 0;
    width: 60%;
    /* display: table-cell; */
  }

  & span{
    font-size: 1.2em;
    padding: 1em, 0;
    margin-right: 1em;
    text-align: left;
  }
`
const SubmitButton = styled.button`
  width: 40%;
  margin: 0 auto;
`

export default New;
