import styled from 'styled-components';

export const Wrapper = styled.div`
text-align: center;
`;

export const Container = styled.div`
    background-color: #ffffff;
    max-width: 550px;
    margin: 10px auto;
    border: 2px solid rgba(0, 0, 0, 0.291);
    border-radius: 10px;
    position: relative;
    padding: 10px;
`;

export const Title = styled.h1`
    font-family: sans-serif;
    letter-spacing: 2px;
    font-size: 34px;
    text-shadow: black 1px 0 2px;

    @media(max-width: 460px) {
        font-size: 30px;
    }
`;

export const Input = styled.input`
    margin: 5px;
    padding: 5px;
    border: 2px solid #298735;
    border-radius: 15px;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);

    ::placeholder {
        color: gray;
        font-style: italic;
    }
}
`;

export const Select = styled.select`
    border-radius: 15px;
	font-size: 14px;
	font-weight: normal;
	text-decoration: none;
	color: #fff;
	background-color: ${(props) => props.slct ? 'rgba(130, 130, 130, 0.7)' : '#1a5722'};
    margin: 5px;
    padding: 8px;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.616);
    
    @media(max-width: 460px) {
        font-size: 12px;
    }
`;

export const TableSpend = styled.table`
    max-width: 50%;
	margin: 15px auto 30px auto;
	font-size: 14px;
    border-collapse: collapse;
    border: 1px solid black;
    @media(max-width: 460px) {
        font-size: 12px;
    }
`;

export const Td = styled.td`
    padding: 6px 7px;
    border: 1px solid black;
    @media(max-width: 460px) {
        padding: 2px 4px;
    }
`;

export const Th = styled.th`
    font-size: 16px;
    padding: 7px;
    border: 1.5px solid black;
    @media(max-width: 460px) {
        padding: 2px 4px;
        font-size: 14px;
    }
`;

export const Thead = styled.thead`
    background-color: rgb(130, 130, 130, 0.7);
}
`;

export const Button = styled.button`
    text-align: center;
	display: inline-block;	
	box-sizing: border-box;
	padding:  ${(props) => (props.add ? '10px 50px' : '8px 10px')};
    padding:  ${(props) => (props.del ? '5px 6px' : '')};
	margin: 5px 5px;
	outline: none;
	border: none;    
	border-radius: 15px;
	font-size: 14px; 
	font-weight: normal;
	text-decoration: none;
	color: #fff;
	background-color: ${(props) => (props.del ? 'white' : '#298735')};
	cursor: pointer;
	user-select: none;
	appearance: none;
	touch-action: manipulation;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.616);

    @media(max-width: 460px) {
        font-size: 12px; 
    }
	
    &:hover {
        background-color: ${(props) => (props.del ? 'red' : '#1a5722')};
    }

    &:focus-visible {
        box-shadow: 0 0 0 3px lightskyblue;
        
    }

    &:active {
        background-color: #058c38 !important;
    }
`; 

export const StatisticWrapper = styled.div`
    margin-top: 10px;
`;

export const Period = styled.div`
    display: flex;
	justify-content: center;
	margin-top: 10px;
`;

export const Result = styled.div`
    max-width: 400px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 10px;

    @media(max-width: 460px) {
        font-size: 14px;
        margin-top:8px;
    }
}
`;