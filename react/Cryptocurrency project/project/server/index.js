const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validation')


app.use(cors());
app.use(express.json());

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 3600 * 1000 //1 hr
}))

// const ifNotLoggedIn = (req, res, next) => {
//     if(!req.session.isLoggedIn) {
//         return res.render('login-res')
//     }
// }

const db = mysql.createConnection({
    user: "admin",
    host: "128.199.117.34",
    password: "password",
    database: "Uncle"
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
});

/*
con.connect(function(err) {
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});
*/