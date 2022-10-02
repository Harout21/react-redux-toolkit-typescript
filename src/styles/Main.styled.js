import styled from "styled-components"

export const StyledMain = styled.div`
    background-color: ${({theme}) => theme.colors.main};
    width: 100%;
    min-height: 100vh;
    padding: 35px;
    box-sizing: border-box;
    text-align: center;
    margin: 0 ;
    font-family: 'Roboto', sans-serif;
`;