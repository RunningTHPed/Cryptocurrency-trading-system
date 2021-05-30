import React, { Component } from 'react';
import {useEffect, useState} from 'react';
import Axios from 'axios';
import './App.css';
import './styles.css';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import { Redirect } from 'react-router'
import Navbar from './component/Navbar';
import Login from './component/Login';
import Register from './component/Register';
import Chart from './component/Chart';
import dashboard from './component/dashboard';
import Bitcoin from './component/Bitcoin';

// เทรดกับพลเพื่อคนอย่างแต๋น 
function App() {

    const [loggedIn, setLoggedIn] = useState("");

    useEffect(()=>{
        Axios.get("http://localhost:3001/user_login").then((response)=>{
            setLoggedIn(response.data.loggedIn);
        });
    }, []);

    return (
            <Router>
                <div className='App'>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={Login}>
                            {loggedIn == true && <Redirect to = "/chart" />}
                        </Route>
                        <Route path='/chart' exact component={Chart} />
                        <Route path='/register' component={Register} />
                        <Route path='/login' component={Login}>
                            {loggedIn == true && <Redirect to = "/chart" />}
                        </Route>
                        <Route path='/dashboard' exact component={dashboard} />
                        <Route path='/Bitcoin' exact component={Bitcoin} />
                    </Switch>
                </div>
            </Router>
    );
}

export default App;
