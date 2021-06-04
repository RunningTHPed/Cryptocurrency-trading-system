import React, { Component } from 'react'
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, state } from 'react'
import Footer from './Footer-fixed';
import { Modal, Button } from 'react-bootstrap';

function Payment() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [DataPayment, setDataPayment] = useState([]);
    const [AccountID, setAccountID] = useState("");
    const [Bank, setBank] = useState("");
    

    let userData = JSON.parse(localStorage.getItem("userdata"));

    const EditPayment = () => {
        Axios.post('http://localhost:3001/set_primary_account', {
            AccountID: AccountID,
            Bank: Bank,
            IDCard: userData.id_card
        }).then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            } else {
                console.log(response);
                window.location = "/account/payment"
            }
        })
    }

    const DeletePayment = () => {
        Axios.post('http://localhost:3001/delete_bank_account', {
            AccountID: AccountID,
            Bank: Bank,
        }).then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            } else {
                console.log(response);
                window.location = "/account/payment"
            }
        })
    }

    const getPayment = async () => {
        try {
            const res = await Axios.post('http://localhost:3001/Data_Payment', {
                IDCard: userData.id_card
            });
            console.log(res.data);
            setDataPayment(res.data);
        }
        catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        getPayment();
    }, []);



    const mystyle = {
        position: "absolute",
        cursor: "inherit"
    };

    return (
        <div>
            <div className="container dashboard_view">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link a-color" aria-current="page" href="/account/detail">DETAIL ACCOUNT</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/account/payment">BANK ACCOUNT</a>
                    </li>
                </ul>
                <div className="background-cc">
                    <div className="pt-4 p-3">
                        <h1>BANK ACCOUNTS</h1>
                        <h4>Select account below to make changes</h4>
                    </div>
                    <div>
                        <a class="btn btn-outline-success btn-add-paymnet" href="/account/payment/add" role="button">ADD BANK ACCOUNTS</a>
                    </div>
                    <table className="table table-striped table-background table-center mt-3">
                        <thead>
                            <tr>
                                <th scope="col">SELECT</th>
                                <th scope="col">BANK</th>
                                <th scope="col">ACCOUNT</th>
                                <th scope="col">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                DataPayment.map(pleum =>
                                (
                                    <tr>
                                        <td>
                                            <div className="form-check">
                                                <input style={mystyle} className="form-check-input" type="radio" value={pleum.account_id}
                                                    onChange={(event) => {
                                                        setAccountID(event.target.value)
                                                    }}
                                                />
                                                <input type="hidden" value={pleum.bankshortname}
                                                    onChange={(event) => {
                                                        setBank(event.target.value)
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            {pleum.bankshortname}
                                        </td>
                                        <td>
                                            {pleum.account_name} {pleum.account_id}
                                        </td>
                                        <td>
                                            {pleum.status}
                                        </td>
                                    </tr>
                                )
                                )
                            }
                        </tbody>
                    </table>
                    <div>
                        <a class="btn btn-success btn-margin-payment" href="/account/payment" role="button" onClick={EditPayment} >MAKE PRIMARY</a>
                        <a class="btn btn-danger btn-margin-payment" href="#" role="button" onClick={handleShow} >REMOVE</a>
                    </div>
                </div>
            </div>
            <Footer />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={DeletePayment}>
                    Remove
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Payment;