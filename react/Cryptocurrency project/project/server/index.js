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
let hour = 3600000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    method: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "user",
    secret: "hello",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}))

const db = mysql.createConnection({
    user: "admin",
    host: "128.199.117.34",
    password: "password",
    database: "Uncle"
})

app.get('/user_information', (req, res) => {
    db.query("SELECT id_card,fname,lname,email,phone_number,role FROM user_information WHERE email=?;", [req.session.user[0].email], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
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
            db.query("INSERT INTO user_information (id_card, fname, lname, email, password, phone_number, role) VALUES(?, ?, ?, ?, ?, ?, 'user')",
                [id_card, fname, lname, email, hashedPassword, phone_number],
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

app.get('/user_logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy(function (err) { });
        res.send({ logOut: true });
    } else {
        res.send({ logOut: false });
    }

})

app.get("/user_login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
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

app.post('/addOrder', (req, res) => {
    const price = req.body.price;
    const price_per_coin = req.body.Price_per_coin;
    db.query("INSERT INTO coin_order(time_order, type, price,coin,price_per_coin,status) VALUES(current_time(), 0, ?, ?, ?, 0)",
        [price, price / price_per_coin, price_per_coin],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        })
});

app.post('/addSell', (req, res) => {
    const coin = req.body.coin;
    const SellPrice_per_coin = req.body.SellPrice_per_coin;


    db.query("INSERT INTO coin_order(time_order, type, price,coin,price_per_coin,status) VALUES(current_time() , 1, ?, ?, ?, 0)",
        [coin * SellPrice_per_coin, coin, SellPrice_per_coin],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        })
});

app.get('/getBuy', (req, res) => {
    db.query("SELECT * FROM buy_order_view;",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.get('/getSell', (req, res) => {
    db.query("SELECT * FROM sell_order_view;",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.get('/coin_Transaction', (req, res) => {
    //const time_finish = req.body.time_finish;
    //const price = req.body.price;
    //db.query("SELECT * FROM coin_transaction_history ORDER BY no_transaction DESC LIMIT 10", (err, result) => {
    db.query("select time_order,coin,price from sell_order_view as sell where exists (select * from buy_order_view as buy where sell.price_per_coin  = buy.price_per_coin);",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.post('/Data_Payment', (req, res) => {
    const IDCard = req.body.IDCard;

    db.query("SELECT * FROM Uncle.Payment_information WHERE id_card = ?;",
        [IDCard],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.post('/Data_Payment_id', (req, res) => {
    const IDCard = req.body.IDCard;

    db.query("SELECT * FROM Uncle.Payment_information WHERE id_card = ? AND status = 'PRIMARY';",
        [IDCard],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.post('/deposit_money', (req, res) => {
    const AccountID = req.body.AccountID;
    const DepositMoney = req.body.DepositMoney;

    console.log(AccountID);
    console.log(DepositMoney);

    db.query("INSERT INTO THB_transaction_history(account_id, type, value, time, fee) VALUES(?, 1, ?, current_time(), 0);",
        [AccountID, DepositMoney],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.post('/add_payment', (req, res) => {
    const BranchName = req.body.BranchName;
    const AccountName = req.body.AccountName;
    const AccountNumber = req.body.AccountNumber;
    const BankName = req.body.BankName;
    const IDCard = req.body.IDCard;

    db.query("SELECT * FROM Payment_information WHERE account_id = ? AND bankshortname = ?;",
        [AccountNumber, BankName],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            else {
                if (result.length == 0) {
                    db.query("INSERT INTO Payment_information(account_id, bankshortname, id_card, branch, account_name) VALUES(?, ?, ?, ?, ?)",
                        [AccountNumber, BankName, IDCard, BranchName, AccountName],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                res.send("Error insert data.");
                            } else {
                                res.send(result);
                            }
                        })
                } else {
                    res.send({ message: "This account is already in use." });
                }
            }

        }
    )





});



// app.post('/add_coin_Transaction', (req, res) => {
//     const coin = req.body.coin;
//     const SellPrice_per_coin = req.body.SellPrice_per_coin;
//     db.query("INSERT INTO coin_order(time_order, type, price,coin,price_per_coin,status) VALUES(current_time() , 1, ?, ?, ?, 0)",
//         [coin * SellPrice_per_coin, coin, SellPrice_per_coin],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send("Values inserted");
//             }
//         })
// });

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