const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "db_project"
})

app.get('/user_information', (req, res) => {
    db.query("SELECT * FROM user_information", (err, result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    })
});

app.post('/add_user', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const id_card = req.body.id_card;
    const password = req.body.password;

    db.query("INSERT INTO user_information (fname, lname, email, phone_number, id_card, password) VALUES(?, ?, ?, ?, ?, ?)",
    [fname, lname, email, phone_number, id_card, password],
    (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    })
})

app.listen('3001', () => {
    console.log("Server is running");
})