import styled from "styled-components";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { PokemonListPage } from "./pages/PokemonListPage/PokemonListPage";
import { FavoritesListPage } from "./pages/FavoritesListPage/FavoritesListPage";
import { GlobalStyles } from "./styles/globalStyles";
import { Header } from "./components/Header/Header";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 1182px
  overflow-x: hidden;
  width: 100%;
`;

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<PokemonListPage />} />
          <Route path="/favorites" element={<FavoritesListPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
