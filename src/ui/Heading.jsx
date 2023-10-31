import styled, { css } from "styled-components";

const Heading = styled.h1`
${(props)=> props.type === "h1" && css`
    font-size: 3rem;
    font-weigth: 600;
`}

${(props)=> props.type === "h2" && css`
    font-size: 2rem;
    font-weigth: 500;
`}
${(props)=> props.type === "h4" && css`
    font-size: 2rem;
    font-weigth: 400;
`}
`

export default Heading;