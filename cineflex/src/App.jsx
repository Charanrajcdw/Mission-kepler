import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.module.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AllMovies from "./pages/AllMovies/AllMovies";
import NowShowing from "./pages/NowShowing/NowShowing";
import Navbar from "./containers/Navbar/Navbar";
import { ROUTE_PATHS } from "./constants";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={ROUTE_PATHS.home} element={<Home />} />
        <Route path={ROUTE_PATHS.login} element={<Login />} />
        <Route path={ROUTE_PATHS.allMovies} element={<AllMovies />} />
        <Route path={ROUTE_PATHS.showTime} element={<NowShowing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
