import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./containers/Navbar/Navbar";
import "./App.css";
import Home from "./pages/Home/Home";
import Shopping from "./pages/Shopping/Shopping";
import Orders from "./pages/Orders/Orders";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Home />} />
        <Route path="/categories/:category" element={<Shopping />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
