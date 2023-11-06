import styled, { css } from "styled-components";

const Heading = styled.h1`
${(props)=> props.type === "h1" && css`
    font-size: 3rem;
    font-weigth: 600;
  }
`}

${(props)=> props.type === "h2" && css`
    font-size: 2rem;
    font-weigth: 500;
    
  }
`}
${(props)=> props.type === "h4" && css`
    font-size: 2rem;
    font-weigth: 400;
    height: 1.4rem;
  } */
`}
@media (max-width: 768px) {
    /* This media query will hide the text on screens larger than 768px (laptop and tablet viewports) */
    font-size: 2.5rem
  }
`


export default Heading;