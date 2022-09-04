import React, { useState } from 'react'; 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/home/index';
import Movie from './pages/movie/movie';
import Watch from './pages/movie/watch.js';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './components/Footer/FooterElements'
import Favorites from './pages/favorites/favorites';
import Browse from './pages/Browse/Browse';
import './App.css'; 
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';


const App = ()=> {

  const [isOpen, setIsOpen] = useState(false)

    const toggle = ()=>{
        setIsOpen(!isOpen)
    }
  return (


    <Router>
      <Sidebar isOpen={isOpen} toggle={toggle}/>
        <Navbar toggle={toggle}/>    
      <Switch>
     
        <Route path='/login' component={LoginForm}/>
        <Route path='/register' component={RegisterForm}/>
        <Route path='/' component={Home} exact/>
        <Route path='/movie/:id' component={Movie} exact/>
        <Route path='/watch/:id' component={Watch} exact/>
        <Route exact path='/favorites' component={Favorites}/>
        <Route path='/browse' component={Browse} exact/>

   
  </Switch>
      <Footer/>
	</Router>
 
 
  );
}

export default App;