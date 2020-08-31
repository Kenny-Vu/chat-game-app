import React from "react";
import styled from "styled-components";

const Spinner = () => {
  return <Loader>Loading...</Loader>;
};

const Loader = styled.div`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Spinner;
