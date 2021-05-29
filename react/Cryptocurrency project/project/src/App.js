import React, { Component } from 'react';
import './App.css';
import './styles.css';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Navbar from './component/Navbar';
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';
import Chart from './component/Chart';
import dashboard from './component/dashboard';


// เทรดกับพลเพื่อคนอย่างแต๋น 
function App() {
  return (
        <Router>
            <div className='App'>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/chart' exact component={Chart} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/dashboard' exact component={dashboard} />
                </Switch>
            </div>
        </Router>
  );
}

export default App;
