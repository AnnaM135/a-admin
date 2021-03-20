import React, { Component } from 'react'
import {BrowserRouter,Route,Link} from "react-router-dom"
import Login from './components/Login';
import Home from './components/Home';
import {createStore} from "redux"
import {Provider} from 'react-redux'
import reducers from "./store/reducers"
import Services from "./components/Services"





let store =createStore(reducers) 

export class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <BrowserRouter>
          <nav className="navbar navbar-expand-sm bg-light">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to='/login'>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/home'>Home</Link>
              </li>
            </ul>
          </nav>
          <Route path='/login' exact component={Login} /> 
          <Route path='/home' exact component={Home} /> 
          <Route path = "/services" exact component = {Services}/>

        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
