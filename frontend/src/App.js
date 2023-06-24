import { useEffect, useState } from "react";
import {Routes, Route} from 'react-router-dom';
import Header from "./component/Layout/Header/Header.js";
import Footer from "./component/Layout/Footer/Footer.js";
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js"
import './App.css';

function App() {
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
   <>
    <Header />
  <Routes>
  <Route path='/' element={<Home/>} />
  </Routes>
  <Footer />
  </>
  );
}

export default App;
