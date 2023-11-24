const express = require('express');
const mysql = require('mysql');
const createRouter = require('./routes/index');
const config = require('./config');

const app = express();
const port = 8080;
const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
        return;
    }
    console.log('Соединение с базой данных успешно установлено');
});

const customRouter = createRouter(connection);

app.use(express.json());

app.use(customRouter);

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});