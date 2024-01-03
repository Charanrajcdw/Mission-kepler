import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.module.css";
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const AllMovies = lazy(() => import("./pages/AllMovies/AllMovies"));
const NowShowing = lazy(() => import("./pages/NowShowing/NowShowing"));
import NotFound from "./pages/NotFound/NotFound";
import Navbar from "./containers/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Loader from "./components/Loader/Loader";
import UserContextProvider from "./contexts/user.context";
import MovieContextProvider from "./contexts/movie.context";
import { ROUTE_PATHS } from "./constants";

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <MovieContextProvider>
          <Navbar />
          <Routes>
            <Route path={ROUTE_PATHS.home} element={<Suspense fallback={<Loader/>}><Home /></Suspense>} />
            <Route path={ROUTE_PATHS.login} element={<Suspense fallback={<Loader/>}><Login /></Suspense>} />
            <Route path={ROUTE_PATHS.allMovies} element={<Suspense fallback={<Loader/>}><AllMovies /></Suspense>} />
            <Route path={ROUTE_PATHS.home} element={<ProtectedRoute />}>
              <Route path={ROUTE_PATHS.showTime} element={<Suspense fallback={<Loader/>}><NowShowing /></Suspense>} />
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </MovieContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default App;
