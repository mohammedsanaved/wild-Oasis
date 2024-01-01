import styled from "styled-components";
import {  FaXmark } from "react-icons/fa6";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  /* @media (max-width: 768px) {
    padding: 4.2rem 2rem;
  }  */
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(5px);
  z-index: 1000;
  transition: all .5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    /* Sometimes we need both */
    /* fill:    height: 2.4rem;
 var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
const ModalContext = createContext()

const Modal =({children})=> {
  const [isOpen, setIsOpen] = useState("");
  const close = ()=> setIsOpen("");
  const open = setIsOpen;
  return (
    <ModalContext.Provider value={{isOpen, close, open}}>
      {children}
    </ModalContext.Provider>
  )
}
const Open=({children, opens: opensWindowName})=> {
  const {open} = useContext(ModalContext);
  return cloneElement(children, {onClick: ()=> open(opensWindowName)})
}
const Window = ({children,name }) => {
  const {isOpen, close} = useContext(ModalContext);
  const ref = useOutsideClick(close);
  //------------------this function is use in -useOutsideClick-------------------
  // const ref = useRef();
  // useEffect(()=> {
  //   function handleClick(e) {
  //     if(ref.current && !ref.current.contains(e.target)) 
  //     {console.log("click Outside")}
  //     close();
  //   }
  //   document.addEventListener("click", handleClick, true);
  //   return ()=> document.removeEventListener('click', handleClick, true)
  // }, [close,ref]);
  //--------------------customHook---------------
  if(name !== isOpen) return null;

  return createPortal (
    <Overlay>
    <StyledModal ref={ref}>
      <Button onClick={close}>
      <FaXmark />
      </Button>
      <div>{cloneElement(children, {onCloseModal: close})}</div>
    </StyledModal>
    </Overlay>,
    document.body
  )
}
Modal.Open = Open;
Modal.Window = Window

export default Modal