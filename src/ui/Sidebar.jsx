// import React from 'react'
import styled from 'styled-components'
import Logo from "./Logo"
import MainNav from './MainNav'

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    grid-row: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    @media (max-width: 768px) {
    /* This media query will hide the text on screens larger than 768px (laptop and tablet viewports) */
    padding: 1.2rem 1.2rem;
    gap:1.5rem;
    align-items: flex-start;
    width: fit-content;
    max-width: 100%;
  }
  
`
const Sidebar = () => {
  return (
    <StyledSidebar>
        <Logo />
        <MainNav />
    </StyledSidebar>
  )
}

export default Sidebar;