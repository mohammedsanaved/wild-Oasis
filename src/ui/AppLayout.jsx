import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  @media (max-width: 768px) {
    grid-template-columns: 9rem 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
  @media (max-width: 768px) {
    /* This media query will hide the text on screens larger than 768px (laptop and tablet viewports) */
    /* overflow-x: scroll; */
    overflow: scroll;
    /* overflow-x: scroll; */
    padding: 2rem 3.8rem 4.4rem;
  }
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
        <Outlet />
        </Container>
      </Main> 
    </StyledAppLayout>
  );
}

export default AppLayout;
