import React from "react";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";
import SideChat from "./components/SideChat";

function App() {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <SideChat />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default App;
