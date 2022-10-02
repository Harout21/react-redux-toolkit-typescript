import styled from "styled-components"

export const StyledHeader = styled.div`
     width: 50%;
     padding: 0 20px;
     text-align: center;
     margin: 0 auto;
     
     h1 {
     margin-top: 0;
     color: ${({theme}) => theme.colors.headerH1};
     margin-left: 0;
     }
 
`;