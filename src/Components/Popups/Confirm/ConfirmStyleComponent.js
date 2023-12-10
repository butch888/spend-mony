import styled from "styled-components";

export const ConfirmWrapper = styled.div`
    border: 1.5px solid #05cd51; 
    width: 400px;
    margin: 0 auto;
    padding-top: 15px;
    border-radius: 5px;
    position: absolute;
    left: 14%;
    top: 110px;
    background-color: #fffbe6;

    @media(max-width: 460px) {
        width: 300px;
        font-size: 14px;
        padding: 0px 4px;
    }
`;