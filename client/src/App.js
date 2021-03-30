import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from './components/search/Search'
import Saved from './components/saved/Saved'
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Route exact path='/' component={Search}/>
      <Route exact path='/saved' component={Saved}/>
    </Router>
    </>
  );
}

export default App;
