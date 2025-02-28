import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const Spinner = styled.div`
  animation: ${spin} 1s linear infinite;
  border: 15px solid rgb(0 0 0 / 10%);
  border-radius: 50%;
  border-top: 15px solid black;
  height: 150px;
  width: 150px;
`;

export const Loader: React.FC = () => (
  <LoaderWrapper>
    <Spinner aria-label="Loading..." />
  </LoaderWrapper>
);
