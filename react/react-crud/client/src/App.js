import React from 'react';
import Navbar from './component/Navbar';
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';
import Chart from './component/Chart';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App () {
    return (
        <Router>
            <div className='App'>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/Chart' exact component={Chart} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                </Switch>
            </div>
        </Router>
    )
}

export default App;