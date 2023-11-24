const express = require('express');
const pdfService = require('../service/pdf-service');

function createRouter(mysql) {
    const customRouter = express.Router();

    const queue = [];

    customRouter.post('/person', (req, res) => {
        const { name, surname } = req.body;

        if (!name || !surname) {
            return res.status(400).json({ error: 'Имя и фамилия обязательны.' });
        }

        const person = {
            name,
            surname,
            time_added: new Date(),
        };

        mysql.query('INSERT INTO users SET ?', person, (err, result) => {
            if (err) {
                console.error('Ошибка вставки пользователя:', err);
                return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
            }

            return res.status(201).json(person);
        });
    });

    customRouter.get('/list', (req, res) => {
        mysql.query('SELECT * FROM users', (err, results) => {
            if (err) throw err;

            const pdfData = results.map(user => [user.name, user.surname, user.time_added]);

            pdfService.buildPDF(
                res,
                pdfData,
                'queue-list.pdf'
            );
        });
    });

    return customRouter;
}

module.exports = createRouter;