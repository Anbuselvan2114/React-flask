import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Corpus from "./pages/Corpus";
import MapWithGPS from "./pages/MapWithGPS";
import MainLayout from './pages/MainLayout';


function App() {
  return (
  <BrowserRouter>
     <div className="App">
         <div id="page-body">
            <Routes>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/" element={<MainLayout><Home/></MainLayout>}/>
                <Route path="/Corpus" element={<MainLayout><Corpus/></MainLayout>} />
                <Route path="/MapWithGPS" element={<MainLayout><MapWithGPS/></MainLayout>} />
            </Routes>
         </div>
     </div>
    </BrowserRouter>
  );
}

export default App;

