import React, { Component } from 'react';
import {useEffect, useState} from 'react';
import Axios from 'axios';
import './App.css';
import './styles.css';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import { Redirect } from 'react-router'
import Navbar from './component/Navbar';
import Footer from './component/Footer-fixed';
import Login from './component/Login';
import Register from './component/Register';
import Chart from './component/Chart';
import dashboard from './component/dashboard';
import Funds from './component/Funds';
import Payment from './component/Payment';
import Addpayment from './component/Add-payment';
import Detail from './component/Detail';
import Bitcoin from './component/Bitcoin';
import EditDetail from './component/Edit-detail';

// เทรดกับพลเพื่อคนอย่างแต๋น 
function App() {
  return (
        <Router>
            <div className='App'>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Login} />
                        {loggedIn == true && <Redirect to = "/dashboard" />}
                    <Route path='/market' exact component={Chart} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                        {loggedIn == true && <Redirect to = "/dashboard" />}
                    <Route path='/dashboard' exact component={dashboard} />
                    <Route path='/market/BTC' exact component={Bitcoin} />
                    <Route path='/funds' exact component={Funds} />
                    <Route path='/account/payment' exact component={Payment} />
                    <Route path='/account/detail' exact component={Detail} />
                    <Route path='/account/payment/add' exact component={Addpayment} />
                    <Route path='/account/detail/edit' exact component={EditDetail} />
                </Switch>
            </div>
        </Router>
  );
}

export default App;
