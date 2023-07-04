import React, { useState } from "react"
import { styled } from "styled-components"
import { GiHamburgerMenu } from 'react-icons/gi'
import { NavLink } from "react-router-dom"


const Burger = () => {

  const [open, setOpen] = useState(false)

  return (
  <Container>
      <BurgerContainer onClick={() => {setOpen(!open)}}>
        <GiHamburgerMenu  size = {20} />
      </BurgerContainer>
      <Menu className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
          <ul>
              <Item to = "/home">Home</Item>
              <Item to = "/find-all-blocos">All Blocos</Item>
              <Item to = "/new-bloco">New Bloco</Item>
              <Item to = "/my-blocos">My Blocos</Item>
              <Item to = "/favorite-blocos">Favorites</Item>
              <Item to = "/about">About</Item>
          </ul>
          <XButton onClick={() => {setOpen(false)}}>x</XButton>
      </Menu>
  </Container>
  )
}

const Container = styled.div`
  color: white;
`
const BurgerContainer = styled.div`
  cursor: pointer;
`
const Menu = styled.div`
    position: absolute;
    top:0;
    left:0;
    background-color: rgba(0,0,0,0.8);
    color: white;
    transition: all 0.5s ease-in-out;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index:10;
    ul{
        display: flex;
        flex-direction: column;
    }
    &:active {
      opacity: 1;
      visibility: visible;

    }
    &.inactive {
      opacity: 0;
      visibility: hidden;
    }
`
const Item = styled(NavLink)`
  text-decoration: none;
  text-align: center;
  font-size: 2.5em;
  margin: 0.4em 0;
  color: white;
  transition: 0.1s ease-in-out;

  &:hover, :active{
    scale: 1.25;
    cursor: pointer;
    border-bottom: 0.05em solid rgba(254,254,254,0.5);
  }
`
const XButton = styled.button`
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 10;
  font-size: 2.5em;
  color: white;
  border: none;
  background-color: rgba(0,0,0,0.001);

  &:hover, :active{
    scale: 1.25;
    cursor: pointer;
    border-bottom: 0.05em solid rgba(254,254,254,0.5);
  }
`

export default Burger;