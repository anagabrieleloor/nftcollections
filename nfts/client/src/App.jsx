import axios from "axios";
import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import OMB from "./components/ordinalmaxibiz";
import QMC from "./components/quantummiladycats";
import CollectionStats from "./components/stats";
import Contract from "./components/contract";
import Navbar from "./components/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
 

  return (
    <>

    <Navbar />
    <Routes>
      <Route>
        <Route path="/" element={<CollectionStats />} />
        <Route path="/omb" element={<OMB />} />
        <Route path="/qmc" element={<QMC />} />
        <Route path="/collectionbycontract" element={<Contract />} />
      </Route>
    </Routes>
 
    </>
  );
}

export default App;