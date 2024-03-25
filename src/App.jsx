import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { loginRoutes, normalRoutes } from "./routes/routes";
import AuthTemplate from "./templates/AuthTemplate";
import GlobalTemplate from "./templates/GlobalTemplate";
import Splash from "./pages/Splash";
import { useContext, Suspense } from "react";
import { GlobalContext } from "./context/GlobalContext";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CookiesAndPolicy from "./pages/CookiesAndPolicy";
import GlobalLoader from "./components/global/GlobalLoader";

function App() {
  const { isLoggedIn } = useContext(GlobalContext);

  return (
    <>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/cookie-policy" element={<CookiesAndPolicy />} />

          {loginRoutes?.map((route, key) => {
            return (
              <Route
                key={key}
                path={route?.url}
                element={<AuthTemplate page={route?.page} />}
              />
            );
          })}

          {normalRoutes?.map((route, key) => {
            return (
              <Route
                key={key}
                path={route?.url}
                element={
                  <GlobalTemplate page={route?.page} name={route?.name} />
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
