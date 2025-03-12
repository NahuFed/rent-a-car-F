import "./App.css";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import routes from "./routes/Routes";

function renderRoutes(routesArray: any) {
    return routesArray.map((route: any, index: number) => {
        if (route.children) {
            return (
                <Route key={index} path={route.path} element={route.element}>
                    {renderRoutes(route.children)}
                </Route>
            );
        }
        return <Route key={index} path={route.path} element={route.element} />;
    });
}

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              {renderRoutes(routes)}
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
