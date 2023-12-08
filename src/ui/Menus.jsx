import { createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaEllipsisVertical } from "react-icons/fa6";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position:fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  /* right: 12px; */
  /* top: 100px; */
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
// import React from 'react'
const MenuContext = createContext();

const Menus = ({children}) => {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);
  const close =()=> setOpenId('');
  const open = setOpenId
  return (
    <MenuContext.Provider value={{openId, close, open, position, setPosition}}>{children}</MenuContext.Provider>
  )
}
const Toggle =({id})=>  {
  const {close, open, openId, setPosition} = useContext(MenuContext);
  const buttonRef = useRef(null);

  function handleToggle(e) {
    // const button = buttonRef.current;
    // if (!button) return;

    const rect = e.target.closest("button").getBoundingClientRect();
    // const rect = button.getBoundingClientRect();
    console.log("Rect value",rect)
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8
    })
    openId === '' || openId !== id ? open(id) : close();
  }

  return <StyledToggle onClick={handleToggle}>
    <FaEllipsisVertical />
  </StyledToggle>
}
const List =({id, children})=>  {
  const {openId, position, close} = useContext(MenuContext);
  const ref = useOutsideClick(close);
  console.log('Position',position)
  if(openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>{children}</StyledList>, document.body
  )
}
// -------------------------Stay with button
// const List = ({ id, children }) => {
//   const { openId, close, position } = useContext(MenuContext);
//   const ref = useOutsideClick(close);

//   if (openId !== id) return null;

//   return (
//     <StyledList position={position} ref={ref}>
//       {children}
//     </StyledList>
//   );
// };

const Button =({children, icon, onClick})=> {
  const {close} = useContext(MenuContext);
  function handleClick() {
    onClick?.();
    close()
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>{icon} <span>{children}</span></StyledButton>
    </li>
  )
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus