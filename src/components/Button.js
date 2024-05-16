import styled from 'styled-components';

export const ButtonContainer = styled.button`
text-transform: capitalize;
font-size: 1rem;
background: transparent;
border: 1px solid var(--lightBlue);
font-weight: 600;
border-color: ${props => props.cart ? "var(--mainYellow)" : "rgb(5, 54, 69)"};
border-radius: 0.25rem;
color: ${props => props.cart ? "var(--mainYellow)" : "rgb(5, 54, 69)"};
padding: 5px 10px;
cursor: pointer;
margin: 0.2rem 0.5rem 0.2rem 0;
transition: 0.3s;
&:hover{
    background: ${props => props.cart ? "var(--mainYellow)" : "rgb(5, 54, 69)"};
    color: #FFF;
}
:focus{
    outline: none;
}
`; 