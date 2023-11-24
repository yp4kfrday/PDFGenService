# PDFGenService

git clone https://github.com/yp4kfrday/MicroservicePDF.git

npm install

НАСТРОЙКА БД

Прежде чем начать использовать микросервис, убедитесь, что у вас есть MySQL сервер и создайте базу данных. Затем отредактируйте файл config.js, указав параметры подключения к вашей базе данных.

Для запуска микросервиса используйте команду:

npm run dev

Сервер будет запущен на порту 8080.

Ручки (Endpoints)
1. List - Получение PDF-файла с данными из базы данных 
    Метод: GET
    Путь: /list

3. Person - Регистрация пользователя в базе данных
    Метод: POST
    Путь: /person

    Заголовки: Content-Type: application/json

    Тело запроса:

{

  "name": "Имя",

  "surname": "Фамилия"

}

Пример cURL-запроса:

curl -X POST -H "Content-Type: application/json" -d '{"name": "Имя", "surname": "Фамилия"}' http://localhost:8080/person

Зависимости

Проект использует следующие зависимости:

    express: ^4.18.2
    msnodesqlv8: ^4.1.2
    mssql: ^10.0.1
    pdfkit: ^0.14.0
    pdfkit-table: ^0.1.99
    pdfmake: ^0.2.8
    roboto-font: ^0.1.0
