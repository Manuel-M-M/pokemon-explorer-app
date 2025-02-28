import styled from "styled-components";
import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import { Header } from "./components/Header/Header";
import { Loader } from "./components/Loader/Loader";

const PokemonListPage = lazy(() =>
  import("./pages/PokemonListPage/PokemonListPage").then((m) => ({
    default: m.PokemonListPage,
  }))
);
const FavoritesListPage = lazy(() =>
  import("./pages/FavoritesListPage/FavoritesListPage").then((m) => ({
    default: m.FavoritesListPage,
  }))
);
const PokemonDetailsPage = lazy(() =>
  import("./pages/PokemonDetailsPage/PokemonDetailsPage").then((m) => ({
    default: m.PokemonDetailsPage,
  }))
);

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
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <PokemonListPage />
              </Suspense>
            }
          />
          <Route
            path="/favorites"
            element={
              <Suspense fallback={<Loader />}>
                <FavoritesListPage />
              </Suspense>
            }
          />
          <Route
            path="/pokemon/:id"
            element={
              <Suspense fallback={<Loader />}>
                <PokemonDetailsPage />
              </Suspense>
            }
          />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
