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

//characters
export const Sprite = styled.div`
  position: absolute;
  background: url("assets/character.png");
  image-rendering: pixelated;
  background-size: 512px 512px;
  background-repeat: no-repeat;
  height: 128px;
  width: 128px;
  /* border: solid; */
`;
