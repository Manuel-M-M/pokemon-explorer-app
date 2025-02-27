import styled from "styled-components";

const Title = styled.h1`
  color: #3498db;
  font-size: 2rem;
  text-align: center;
`;

function App() {
  return (
    <div>
      <Title data-testid="app-title">Hello world</Title>
    </div>
  );
}

export default App;
