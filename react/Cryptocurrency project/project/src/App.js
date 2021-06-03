import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';
import './styles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router'
import Navbar from './component/Navbar';
import Footer from './component/Footer-fixed';
import Login from './component/Login';
import Register from './component/Register';
import Chart from './component/Chart';
import Dashboard from './component/Dashboard';
import Funds from './component/Funds';
import Payment from './component/Payment';
import Addpayment from './component/Add-payment';
import Detail from './component/Detail';
import Bitcoin from './component/Bitcoin';
import EditDetail from './component/Edit-detail';
import Deposit from './component/Deposit';
import Withdraw from './component/Withdraw';
import Analysis from './component/Analysis';

// เทรดกับพลเพื่อคนอย่างแต๋น 
function App() {

        //get role from localStorage
        let userData = JSON.parse(localStorage.getItem("userdata"));
        const [role, setRole] = useState("guest");
        useEffect(() => {
            if(userData != null){
                setRole(userData.role);
            }
        })

    const [loggedIn, setLoggedIn] = useState("");

    useEffect(() => {
        Axios.get("http://localhost:3001/user_login").then((response) => {
            setLoggedIn(response.data.loggedIn);
        });
    }, []);

    return (
        <Router>
            <div className='App'>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Login}>
                        {loggedIn === true && <Redirect to="/dashboard" />}
                    </Route>

                    <Route path='/market' exact component={Chart} />

                    <Route path='/register' component={Register} />

                    <Route path='/login' component={Login}>
                        {loggedIn === true && <Redirect to="/dashboard" />}
                    </Route>

                    <Route path='/dashboard' exact component={Dashboard}>
                        {loggedIn === false && <Redirect to="/login" />}
                    </Route>

                    <Route path='/Bitcoin' exact component={Bitcoin}>
                        {loggedIn === false && <Redirect to="/login" />}
                    </Route>

                    <Route path='/funds' exact component={Funds}>
                        {loggedIn === false && <Redirect to="/login" />}
                    </Route>
                    <Route path='/deposit' exact component={Deposit}>
                        {loggedIn === false && <Redirect to="/login" />}
                    </Route>
                    <Route path='/withdraw' exact component={Withdraw}>
                        {loggedIn === false && <Redirect to="/login" />}
                    </Route>
                    <Route path='/account' exact component={Detail}>
                        {loggedIn === false && <Redirect to="/login" />}
                    </Route>
                    <Route path='/account/payment' exact component={Payment}>
                        {loggedIn === false && <Redirect to="/login" />}
                    </Route>
                    <Route path='/account/detail' exact component={Detail}>
                        {loggedIn === false && <Redirect to="/login" />}
                    </Route>
                    <Route path='/account/payment/add' exact component={Addpayment}>
                        {loggedIn === false && <Redirect to="/login" />}
                    </Route>
                    <Route path='/account/detail/edit' exact component={EditDetail}>
                        {loggedIn === false && <Redirect to="/login" />}
                    </Route>

                    <Route path='/analysis' component={Analysis} />
                    
                </Switch>
            </div>
        </Router>
    );
}

export default App;
