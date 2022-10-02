import styled from "styled-components"

export const Container = styled.div`
    background-color: ${({theme}) => theme.colors.container};
    padding-top: 10px;
    width: 50%;
    border-radius: 20px;
    padding-bottom: 50px;
    margin: 0 auto;
`;