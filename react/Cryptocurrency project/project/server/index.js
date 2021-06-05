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
    method: ["GET", "POST", "UPDATE"],
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

// app.get('/user_information', (req, res) => {
//     db.query("SELECT id_card,fname,lname,email,phone_number,role FROM user_information WHERE email=?;", [req.session.user[0].email], (err, result) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(result);
//             localStorage.setItem('userdata', JSON.stringify(result));
//             res.send(result);
//         }
//     })
// });

app.post('/add_user', (req, res) => {
    const fnameTH = req.body.fnameTH;
    const lnameTH = req.body.lnameTH;
    const fnameEN = req.body.fnameEN;
    const lnameEN = req.body.lnameEN;
    const email = req.body.email;
    const password = req.body.password;
    const Birthdate = req.body.Birthdate;
    const Gender = req.body.Gender;
    const Status = req.body.Status;
    const id_card = req.body.id_card;
    const BehindID = req.body.BehindID;
    const Phone = req.body.Phone;
    const Address = req.body.Address;
    const PostCode = req.body.PostCode;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.log(err);
        } else {
            db.query("INSERT INTO user_information(id_card, fnameTH, lnameTH, fnameEN, lnameEN, email, password, Birthdate, Gender, Status, BehindID, Phone, Address ,role,PostCode) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'user',?)",
                [id_card, fnameTH, lnameTH, fnameEN, lnameEN, email, hashedPassword, Birthdate, Gender, Status, BehindID, Phone, Address, PostCode],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        db.query("INSERT INTO THB_transaction_history(id_card, type, value, time, fee) VALUES(?, 1, 0, current_time(), 0);",
                            [id_card],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send("Values inserted");
                                }
                            })
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
        res.send({ loggedIn: true });
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
                        db.query("SELECT id_card,fnameTH,lnameTH,fnameEN,lnameEN,email,Birthdate,Gender,Status,Phone,Address,role,PostCode FROM user_information WHERE email=?;",
                            [email],
                            (err, data) => {
                                if (err) {
                                    res.send(err);
                                } else {
                                    console.log(data);
                                    res.send(data);
                                }
                            }
                        )
                        req.session.user = result;
                        console.log(req.session.user);
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
    const id_card = req.body.id_card;
    const shortname = req.body.shortname;
    const price = req.body.price;
    const price_per_coin = req.body.Price_per_coin;
    db.query("INSERT INTO coin_order(id_card, time_order, shortname, type, price, coin, price_per_coin, status) VALUES(?, current_time(), ?, 0, ?, ?, ?, 0)",
        [id_card, shortname, price, price / price_per_coin, price_per_coin],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        })
});

app.post('/addSell', (req, res) => {
    const id_card = req.body.id_card;
    const shortname = req.body.shortname;
    const coin = req.body.coin;
    const SellPrice_per_coin = req.body.SellPrice_per_coin;
    db.query("INSERT INTO coin_order(id_card, time_order, shortname, type, price, coin, price_per_coin, status) VALUES(?, current_time(), ?, 1, ?, ?, ?, 0)",
        [id_card, shortname, coin * SellPrice_per_coin, coin, SellPrice_per_coin],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        })
});

app.post('/getBuy', (req, res) => {
    const shortname = req.body.shortname;
    db.query("SELECT * FROM buy_order_view WHERE shortname=?;",
    [shortname],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ order: result });
            }
        })
});

app.post('/getSell', (req, res) => {
    const shortname = req.body.shortname;
    db.query("SELECT * FROM sell_order_view WHERE shortname=?;",
    [shortname],
        (err, result) => {
            if (err) {
                res.send({ message: "don't have data" });
            } else {
                res.send({ order: result });
            }
        })
});

app.post('/getSellDataDESC', (req, res) => {
    const shortname = req.body.shortname;
    db.query("SELECT * FROM Uncle.sell_order_view WHERE shortname=? ORDER BY price_per_coin DESC;",
        [shortname],
        (err, result) => {
            if (err) {
                res.send({ message: "don't have data" });
            } else {
                res.send({ order: result });
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
    const IDCard = req.body.IDCard;
    const DepositMoney = req.body.DepositMoney;

    console.log(IDCard);
    console.log(DepositMoney);

    db.query("SELECT * FROM Uncle.Payment_information WHERE id_card = ?;",
        [IDCard],
        (err, value) => {
            if (value == 0) {
                console.log(err);
                res.send({ message: "Currently unable to deposit, please add a bank account on the settings page." });
            } else {
                db.query("INSERT INTO THB_transaction_history(id_card, type, value, time, fee) VALUES(?, 1, ?, current_time(), 0);",
                    [IDCard, DepositMoney],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            res.send({ message: "Error Deposit." });
                        } else {
                            res.send(result);
                        }
                    }
                )
            }
        }
    )

    
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
            if (result == 0) {
                db.query("SELECT * FROM Payment_information WHERE id_card = ?;",
                    [IDCard],
                    (err,result) => {
                        if (result == 0) {
                            db.query("INSERT INTO Payment_information(account_id, bankshortname, id_card, branch, account_name, status) VALUES(?, ?, ?, ?, ?, 'PRIMARY')",
                                [AccountNumber, BankName, IDCard, BranchName, AccountName],
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        res.send("Error insert data.");
                                    } else {
                                        res.send(result);
                                    }
                                }
                            )
                        } else {
                            db.query("INSERT INTO Payment_information(account_id, bankshortname, id_card, branch, account_name) VALUES(?, ?, ?, ?, ?)",
                                [AccountNumber, BankName, IDCard, BranchName, AccountName],
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        res.send("Error insert data.");
                                    } else {
                                        res.send(result);
                                    }
                                }
                            )
                        }
                    }
                )
            }
            else {
                res.send({ message: "This account is already in use." });
            }
        }
    )
});

app.post('/summary_money', (req, res) => {
    const IDCard = req.body.IDCard;

    db.query("SELECT SUM(value) as mySum FROM Uncle.THB_transaction_history where id_card = ?;",
        [IDCard],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.post('/summary_money_order', (req, res) => {
    const id_card = req.body.id_card;

    db.query("SELECT SUM(price) AS price_sum FROM Uncle.buy_order_view WHERE id_card = ?;",
        [id_card],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.post('/withdraw_money', (req, res) => {
    const IDCard = req.body.IDCard;
    const WithdrawMoney = req.body.WithdrawMoney;
    const Availible = req.body.Availible;
    const sum = Availible - WithdrawMoney;

    if (sum >= 0) {
        db.query("INSERT INTO THB_transaction_history(id_card, type, value, time, fee) VALUES(?, 0, -?, current_time(), 0);",
            [IDCard, WithdrawMoney],
            (err, result) => {
                if (err) {
                    res.send({ message: "Withdraw error." });
                } else {
                    res.send(result);
                }
            })
    }
    else {
        res.send({ message: "The amount in the system is insufficient to withdraw." });
    }

});

app.post('/edit_detail', (req, res) => {
    const IDCard = req.body.IDCard;
    const Status = req.body.Status;
    const Phone = req.body.Phone;
    const Address = req.body.Address;
    const PostCode = req.body.PostCode;

    db.query("UPDATE `Uncle`.`user_information` SET `Status` = ?, `Phone` = ?, `Address` = ?, `PostCode` = ? WHERE (`id_card` = ?);",
        [Status, Phone, Address, IDCard, PostCode],
        (err, result) => {
            if (err) {
                res.send({ message: "Withdraw error." });
            } else {
                db.query("SELECT id_card,fnameTH,lnameTH,fnameEN,lnameEN,email,Birthdate,Gender,Status,Phone,Address,role,PostCode FROM user_information WHERE id_card=?;",
                    [IDCard],
                    (err, data) => {
                        if (err) {
                            res.send(err);
                        } else {
                            console.log(data);
                            res.send(data);
                        }
                    }
                )
            }
        }
    )
})

app.post('/add_coin_Transaction', (req, res) => {
    const no_order = req.body.no_order;
    const type = req.body.type;
    const value = req.body.value;
    const price = req.body.price;
    const shortname = req.body.shortname;
    db.query("INSERT INTO coin_transaction_history ( id_card, time_order, shortname, value, price, type, fee, no_order ) SELECT id_card, time_order, ?, ?, ?, ?, ?, no FROM coin_order WHERE no=?",
        [shortname, value, price, type, 0, no_order],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ message: "transaction was inserted" });
            }
        })
});

app.post('/updateStatus', (req, res) => {
    const no = req.body.no;
    db.query("UPDATE coin_order SET status=1 WHERE no=?",
        [no],
        (err) => {
            if (err) {
                console.error(err);
            } else {
                res.send({ message: "Update status complete." });
            }
        })
});

app.post('/updateCoin', (req, res) => {
    const coin = req.body.coin;
    const no = req.body.no;
    db.query("UPDATE coin_order SET coin=? WHERE no=?",
        [coin, no],
        (err) => {
            if (err) {
                console.error(err);
            } else {
                res.send({ message: "Update coin complete." });
            }
        })
});

app.post('/set_primary_account', (req, res) => {
    const AccountID = req.body.AccountID;
    const Bank = req.body.Bank;
    const IDCard = req.body.IDCard;

    db.query("UPDATE `Uncle`.`Payment_information` SET `status` = '' WHERE id_card = ?;",
        [IDCard],
        (err, result) => {
            if (err) {
                res.send({ message: "Withdraw error." });
            } else {
                db.query("UPDATE `Uncle`.`Payment_information` SET `status` = 'PRIMARY' WHERE `account_id` = ?;",
                    [AccountID],
                    (err, data) => {
                        if (err) {
                            res.send(err);
                        } else {
                            console.log(data);
                            res.send(result);
                        }
                    }
                )
            }
        }
    )
});

app.post('/delete_bank_account', (req, res) => {
    const AccountID = req.body.AccountID;
    const Bank = req.body.Bank;

    db.query("DELETE FROM `Uncle`.`Payment_information` WHERE `account_id` = ?;",
        [AccountID],
        (err, result) => {
            if (err) {
                res.send({ message: "Withdraw error." });
            } else {
                res.send(result);
            }
        }
    )
});


app.post('/coin_Transaction', (req, res) => {
    const shortname = req.body.shortname;
    //const time_finish = req.body.time_finish;
    //const price = req.body.price;
    db.query("SELECT * FROM coin_transaction_history WHERE Type = 1 AND shortname=? LIMIT 10",
    [shortname],
    (err, result) => {
        //db.query("SELECT time_order,coin,price FROM sell_order_view AS sell WHERE EXISTS (SELECT * FROM buy_order_view AS buy WHERE sell.price_per_coin  = buy.price_per_coin);",
        //(err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get('/coin_order_buy', (req, res) => {
    //const time_finish = req.body.time_finish;
    //const price = req.body.price;
    db.query("SELECT * FROM coin_orderWHERE Type = 0", (err, result) => {
        //db.query("SELECT time_order,coin,price FROM sell_order_view AS sell WHERE EXISTS (SELECT * FROM buy_order_view AS buy WHERE sell.price_per_coin  = buy.price_per_coin);",
        //(err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get('/bank_analysis', (req, res) => {
    //const time_finish = req.body.time_finish;
    //const price = req.body.price;
    db.query("SELECT bankshortname,COUNT(bankshortname) as amount FROM Payment_information group by bankshortname; ", (err, result) => {
        //db.query("SELECT time_order,coin,price FROM sell_order_view AS sell WHERE EXISTS (SELECT * FROM buy_order_view AS buy WHERE sell.price_per_coin  = buy.price_per_coin);",
        //(err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get('/customer_analysis', (req, res) => {
    //const time_finish = req.body.time_finish;
    //const price = req.body.price;
    db.query("SELECT post_info.province,count(id_card) as amount FROM user_information as user_info join Post_information as post_info USING (postcode) group by user_info.PostCode; ", (err, result) => {
        //db.query("SELECT time_order,coin,price FROM sell_order_view AS sell WHERE EXISTS (SELECT * FROM buy_order_view AS buy WHERE sell.price_per_coin  = buy.price_per_coin);",
        //(err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.post('/deposit_coin', (req, res) => {
    const id_card = req.body.id_card;
    const value = req.body.value;
    const shortname = req.body.shortname;

    db.query("INSERT INTO Coin_deposite_withdraw(id_card, value, shortname) VALUES(?, ?, ?);",
        [id_card, value, shortname],
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ message: "Add coin complete." });
            }
        })
});

app.post('/summary_coin_deposit', (req, res) => {
    const id_card = req.body.id_card;
    const shortname = req.body.shortname;

    db.query("SELECT SUM(value) AS coin_sum FROM Uncle.Coin_deposite_withdraw WHERE id_card = ? AND shortname = ?;",
        [id_card, shortname],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.get('/coin_analysis', (req, res) => {
    //const time_finish = req.body.time_finish;
    //const price = req.body.price;
    db.query("SELECT shortname,MAX(price) as max ,MIN(price) as min FROM coin_transaction_history group by shortname; ", (err, result) => {
    //db.query("SELECT time_order,coin,price FROM sell_order_view AS sell WHERE EXISTS (SELECT * FROM buy_order_view AS buy WHERE sell.price_per_coin  = buy.price_per_coin);",
        //(err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.post('/summary_coin_order', (req, res) => {
    const id_card = req.body.id_card;
    const shortname = req.body.shortname;

    db.query("SELECT SUM(coin) AS coin_sum FROM Uncle.sell_order_view WHERE id_card = ? AND shortname = ?;",
        [id_card, shortname],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.post('/summary_coin_history_sell', (req, res) => {
    const id_card = req.body.id_card;
    const shortname = req.body.shortname;

    db.query("SELECT SUM(price/value) AS coin_sum FROM Uncle.coin_transaction_history WHERE id_card = ? AND shortname = ? AND type=1;",
        [id_card, shortname],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.post('/summary_coin_history_buy', (req, res) => {
    const id_card = req.body.id_card;
    const shortname = req.body.shortname;

    db.query("SELECT SUM(price/value) AS coin_sum FROM Uncle.coin_transaction_history WHERE id_card = ? AND shortname = ? AND type=0;",
        [id_card, shortname],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.post('/summary_money_history_sell', (req, res) => {
    const id_card = req.body.id_card;

    db.query("SELECT SUM(price) AS mySum FROM Uncle.coin_transaction_history WHERE id_card = ? AND type=1;",
        [id_card],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.post('/summary_money_history_buy', (req, res) => {
    const id_card = req.body.id_card;

    db.query("SELECT SUM(price) AS mySum FROM Uncle.coin_transaction_history WHERE id_card = ? AND type=0;",
        [id_card],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.listen('3001', () => {
    console.log("Server is running");
});

app.post('/get_detail_coin', (req, res) => {
    db.query("SELECT shortname, MAX(value) as max, MIN(value) as min FROM Uncle.coin_transaction_history where DATE(time_finish) = DATE(now()) group by shortname;",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
});

/*
#Analysis dashboard
SELECT shortname,MAX(price),MIN(price)
FROM dummy_coin_transaction
group by shortname;

#Analysis insight 1
SELECT bankshortname,COUNT(bankshortname)
FROM Payment_information
group by bankshortname;

#Analysis insight 2
...
จำนวนคนเล่นในแต่ละจังหวัด
*/