import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Restaurants from "./pages/Restaurants";
import Contact from "./pages/Contact";
import Galerie from "./pages/Galerie";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/galerie" element={<Galerie />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
