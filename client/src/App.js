import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from './components/Search'
import Saved from './components/Saved'
import Navbar from './components/Navbar'
import SignUp from './components/signup'
import Login from './components/signin'

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Route exact path='/' component={Search}/>
      <Route exact path='/saved' component={Saved}/>
      <Route exact path='/signup' component={SignUp}/>
      <Route exact path='/login' component={Login}/>
    </Router>
    </>
  );
}

export default App;
