import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.module.css";
import Navbar from "./containers/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Shopping from "./pages/Shopping/Shopping";
import Orders from "./pages/Orders/Orders";
import NotFound from "./pages/NotFound/NotFound";
import { APP_ROUTES } from "./constants/constants";
import { getCategories } from "./services/furnitures";

function App() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setCategoriesData(categories);
        setIsLoaded(true);
      })
      .catch(() => setCategoriesData([]));
  }, []);

  return (
    <BrowserRouter>
      <Navbar categoriesData={categoriesData} />
      <Routes>
        <Route index element={<Home categoriesData={categoriesData} isLoaded={isLoaded} />} />
        <Route path={APP_ROUTES.categories}>
          <Route index element={<Home categoriesData={categoriesData} isLoaded={isLoaded} />} />
          <Route path={APP_ROUTES.category} element={<Shopping />} />
        </Route>
        <Route path={APP_ROUTES.order} element={<Orders categoriesData={categoriesData} isLoaded={isLoaded} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
