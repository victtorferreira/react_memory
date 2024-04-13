import styled from "styled-components";

export const container = styled.div `
    width: 100%;
    max-width: 750px;
    margin: auto;
    display: flex;
    padding: 50px 0;

    @media(max-width: 750px) {
        flex-direction: column;
    }
`;

export const Info = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;

    @media(max-width: 750px) {
        margin-bottom: 50px;
        
    }
`;

export const LogoLink = styled.a `
    display: block;
    text-align: center;
`;

export const InfoArea = styled.div `
    width: 100%;
    margin: 10px 0;
    text-align: center;

    @media(max-width: 750px) {
        display: flex;
        justify-content: center;
        
        
    }
    
`;

export const GridArea = styled.div `
    flex: 1;
    display: flex;
    justify-content: flex-end;

    @media(max-width: 750px) {
        justify-content: center;
        margin: 0 20px;
        
    }

`;

export const Grid = styled.div `
    width: 430px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    @media(max-width: 750px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;