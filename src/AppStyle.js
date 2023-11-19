
import styled from 'styled-components';

export const Wrapper = styled.div`
text-align: center;
background-repeat: repeat;
background-position: center;
// background-image: url(https://catherineasquithgallery.com/uploads/posts/2021-03/1614839954_51-p-fon-dlya-shkolnogo-saita-76.jpg);
background-attachment: fixed;
`;

export const Container = styled.div`
background-color: #ffffff;
max-width: 550px;
margin: 0 auto;
border: 2px solid rgba(0, 0, 0, 0.291);
position: relative;
`;

export const Title = styled.h1`
font-family: sans-serif;
letter-spacing: 2px;
font-size: 36px;
`;

export const Input = styled.input`
    margin: 5px;
    padding: 5px;
    border: 2px solid #05cd51;
    border-radius: 5px;

    ::placeholder {
        color: gray;
        font-style: italic;
    }
}
`;

export const Select = styled.select`
    border: 2px solid #05cd51;
    border-radius: 3px;
	font-size: 14px;
	font-weight: normal;
	text-decoration: none;
	color: #fff;
	background-color: #05cd51;
    margin: 5px;
    padding: 5px;   
`;

export const TableSpend = styled.table`
    max-width: 50%;
	margin: 10px auto;
	font-size: 14px;
    border-collapse: collapse;
`;

export const Td = styled.td`
    padding: 7px;
`;

export const Th = styled.th`
    font-size: 16px;
    padding: 7px;
`;

export const Thead = styled.thead`
    background-color: #a0e899;
}
`;

export const Button = styled.button`
    text-align: center;
	display: inline-block;	
	box-sizing: border-box;
	padding:  7px 9px;
	margin: 5px 5px;
	outline: none;
	border: none;    
	border-radius: 3px;
	font-size: 14px; 
	font-weight: normal;
	text-decoration: none;
	color: #fff;
	background-color: ${(props) => (props.del ? 'red' : '#05cd51')};
	cursor: pointer;
	user-select: none;
	appearance: none;
	touch-action: manipulation;
	
    &:hover {
        box-shadow: 0 2px 2px 0  #cfcfcf, 0 2px 5px 0  #cfcfcf;
        transition: box-shadow .18s ease-out, background .18s ease-out,color .18s ease-out;
    }

    &:focus-visible {
        box-shadow: 0 0 0 3px lightskyblue;
        
    }

    &:active {
        background-color: #058c38 !important;
    }
`; 

export const StatisticWrapper = styled.div`
    margin-top: 30px;
    margin-bottom: 10px;
`;

export const Period = styled.div`
    display: flex;
	justify-content: center;
	margin-top: 10px;
`;

export const Result = styled.div`
    margin-top: 30px;
}
`;