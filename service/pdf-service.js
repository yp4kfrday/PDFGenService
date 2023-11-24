const fs = require('fs');
const pdfMake = require('pdfmake');
const moment = require('moment');

const pdfQueue = [];

function addPersonToPDF(person) {
    pdfQueue.push(person);
}

function buildPDF(res, data) {
    const fonts = {
        Roboto: {
            normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
            bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
            italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
            bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf',
        },
    };

    const printer = new pdfMake(fonts);
    const docDefinition = {
        content: [
            { text: 'Queue List', style: 'header' },
            {
                table: {
                    headerRows: 1,
                    widths: ['*', '*', '*'],
                    body: [
                        ['Name', 'Surname', 'Time_added'],
                        ...data.map(row => [row[0], row[1], moment(row[2]).format('YYYY-MM-DD HH:mm:ss')]),
                    ],
                },
            },
        ],
        styles: {
            header: {
                fontSize: 22,
                bold: true,
                margin: [0, 0, 0, 10],
            },
        },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const writeStream = fs.createWriteStream('../queue-list.pdf');
    pdfDoc.pipe(writeStream);
    pdfDoc.pipe(res);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=queue-list.pdf`);

    pdfDoc.end();
}

module.exports = { addPersonToPDF, buildPDF };