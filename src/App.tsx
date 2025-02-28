import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokemonListPage } from "./pages/PokemonListPage/PokemonListPage";
import { GlobalStyles } from "./styles/globalStyles";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 1182px
  overflow-x: hidden;
  width: 100%;
`;

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <AppContainer>
        <Routes>
          <Route path="/" element={<PokemonListPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
