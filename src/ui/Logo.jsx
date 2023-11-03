import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  align-items: center;
`;

const Img = styled.img`
  height: 11.6rem;
  width: auto;
  @media (max-width: 768px) {
    /* This media query will hide the text on screens larger than 768px (laptop and tablet viewports) */
    height: 4.9rem;
    padding: .4rem;
    width: auto;
  }
`;


function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-light.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
