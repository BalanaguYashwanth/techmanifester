import React,{useState} from 'react'
import './App.css'
import Todo from './todo.js'
import Blogs from './blogs'
import Pvideo from './video'
import Home from './components/home'
import { BrowserRouter as Router, Route , Switch, Link} from 'react-router-dom'
import Playcourse from './components/playcourse'
import Login from './components/login'
import Register from './components/register'
import Logout from './components/logout'
import Pricing from './components/pricing'
import About from './components/about'
import Enroll from './components/enroll'
import Admin from './components/secretadmin'
import Updatelist from './components/updatelist'
import AdminRegister from './components/adminregister'
import AdminLogin from './components/adminlogin'
import AdminLogout from './components/adminlogout'


function App(){
  
  return(
    <Router>
    <Switch>
      
      <Route exact path="/">
       { localStorage.getItem('access-token') ?  (<Home />) :  (<Login />) }
      </Route>

      <Route path="/learn/:course">
      { localStorage.getItem('access-token') ?  (<Playcourse />) :  (<Login />) }
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/register">
        <Register />
      </Route>

      <Route exact path="/logout">
      { localStorage.getItem('access-token') ?  (<Logout />) :  (<Login />) }
      </Route>

      <Route exact path="/pricing">
        <Pricing />
      </Route>

      <Route exact path='/about' >
        <About />
      </Route>

      <Route exact path='/enroll'>
        <Enroll />
      </Route>

      <Route  exact path="/secretadmin">
      { localStorage.getItem('admin-token') ? (<Admin />) : (<AdminLogin />) }
      </Route>

      <Route  exact path='/updatelist' >
          { localStorage.getItem('admin-token') ? (<Updatelist />) : (<AdminLogin />) }
      </Route>

      <Route exact path="/adminregister" > 
          <AdminRegister />
      </Route>

      <Route exact path="/adminlogin" >
        <AdminLogin />
      </Route>

      <Route exact path="/adminlogout" >
        { localStorage.getItem('admin-token') ?  (<AdminLogout />) : (<AdminLogin />) }
      </Route>


    </Switch>

    </Router>
  )
}

export default App
