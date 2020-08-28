import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
    margin: 0;
	padding: 0;
	border: 0;
	box-sizing: border-box;
	overflow: hidden;
	font-family: "nunito"
}`;

export const Button = styled.button`
  background: #4287f5;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
`;
