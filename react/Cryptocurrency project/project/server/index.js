const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validation')

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    method: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "email",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 60*60*24,},
}))

const db = mysql.createConnection({
    user: "sql6411701",
    host: "sql6.freesqldatabase.com",
    password: "UTbqq1H1ys",
    database: "sql6411701"
})

app.get('/user_information', (req, res) => {
    db.query("SELECT * FROM user_information", (err, result) => {
        if (err) {
            console.log(err);
        } else {
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

    bcrypt.hash(password, 10, (err, hashedPassword) => {

        if (err) {
            console.log(err);
        } else {
            db.query("INSERT INTO user_information (fname, lname, email, phone_number, id_card, password) VALUES(?, ?, ?, ?, ?, ?)",
                [fname, lname, email, phone_number, id_card, hashedPassword],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send("Values inserted");
                    }
                })
        }
    })
})

app.get("/user_login", (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
})

app.post('/user_login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM user_information WHERE email= ?;",
        [email],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({ message: "Wrong username/password combination!" });
                    }
                })
            } else {
                res.send({ message: "User doesn't exist" });
            }
        }
    )
})

app.get('/coin_Transaction', (req,res) => {
    //const time_finish = req.body.time_finish;
    //const price = req.body.price;
    db.query("SELECT * FROM coin_transaction_history ORDER BY no_transaction DESC LIMIT 10", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.post('/add_Transaction', (req, res) => {
    const price = req.body.price;
    db.query("INSERT INTO coin_transaction_history (time_finish, price) VALUES(current_time(), ?)",
        [price],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        })
    });

app.listen('3001', () => {
    console.log("Server is running");
})

/*
con.connect(function(err) {
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});
*/