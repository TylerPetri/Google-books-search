import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Vanta from './components/Vanta/Vanta'


function App() {
  return (
    <>
      <Router>
        <Vanta/>
      </Router>
    </>
  );
}

export default App;
