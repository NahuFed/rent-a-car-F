import "./App.css";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import routes from "./routes/Routes";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
