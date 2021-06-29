const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db')

const app = express();
app.use(bodyParser.json());

db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, result, field) => {
    console.log(result);
});

app.get('/api/values', (req, res) => {
    db.pool.query("SELECT * FROM lists;", (err, result, field) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.json(result);
        }
    });
});

app.post('/api/value', (req, res) => {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}");`,
        (err, result, field) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.json({ success: true, value: req.body.value });
            }
        });
});

app.listen(5000, () => {
    console.log("애플리케이션이 5000번 포트에서 시작되었습니다.");
});
