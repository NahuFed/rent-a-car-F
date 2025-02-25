
import "./App.css";
import Home from "./pages/home/Home";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Services from "./pages/home/Services";
import Contact from "./components/Contact";

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </main>
    <Footer />
    </BrowserRouter>
    </> 


  );
}

export default App;
