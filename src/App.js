import React from "react";
import { Routes, Route, useMatch} from "react-router-dom";
import axios from "axios";
import Main from "./component/Main";
import Galeri from "./component/Galeri";

import Hizmetler from "./component/Hizmetler";
import Urunler from "./component/Urunler";
import Hakkimizda from "./component/Hakkimizda";
import Dashboard from "./component/Dasboard";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Login from "./component/Login";
import ScrollTop from "./component/ScrollTop";
import Redirect from "./component/Redirect";


//post kontrol ve login/logout ayarları
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
})

function App() {
  const path = useMatch("dashboard/*");
  const loginPath = useMatch("login");
  const loginToken = localStorage.getItem("auth_token");

  if (loginPath) {
    return (<Routes>
      <Route path="login" element={<Login />} />
    </Routes>)
  };

  if (path === null) {
    return (
      <>
        <ScrollTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="hizmetler" element={<Hizmetler />} />
          <Route path="galeri" element={<Galeri />} />
          <Route path="urunler" element={<Urunler />} />
          <Route path="hakkimizda" element={<Hakkimizda />} />

          <Route path="*" element={<Redirect />} />
        </Routes>
        <Footer />

      </>
    );
  } else {
    return (
      <Routes>
        {loginToken ?
          <Route path="dashboard/*" element={<Dashboard />} /> :
          <Route path="*" element={<Redirect />} />
        }

      </Routes>
    );
  }

}

export default App;
