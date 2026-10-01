const express = require("express");
const app = express();
const { User, Admin } = require("./models/user");
const mongoose = require("mongoose");
const PORT = 3000;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/users")
    .then(() => {
        console.log("Успешное подключение к БД");
    })
    .catch((err) => {
        console.error("Ошибка подключения к БД:", err.message);
        process.exit(1);
    });

    app.post("/addadmin", async (req, res) => {
        const { login, password, age, email} = req.body;
        console.log(req.body);
    
        if (login && password && age && email) {
            try {
                await Admin.create({login, password, age, email});
                res.send(`Регистрация админа успешно пройдена Данные: ${login} password: ${password} age: ${age}`);
            } catch (err) {
                console.error(err);
                res.status(500).send(`Ошибка БД: ${err.message}`);
            }
        } else {
            res.status(400).send("Не все данные заполнены");
        }
    });
    
app.post("/adduser", async (req, res) => {
    const { name, lastname, age } = req.body;
    console.log(req.body);

    if (name && lastname && age) {
        try {
            await User.create({ name, lastname, age });
            res.send(`Регистрация успешно пройдена Name: ${name} lastname: ${lastname} age: ${age}`);
        } catch (err) {
            console.error(err);
            res.status(500).send(`Ошибка БД: ${err.message}`);
        }
    } else {
        res.status(400).send("Не все данные заполнены");
    }
});


app.listen(PORT, () => {
    console.log(`Сервер успешно запущен на порту ${PORT}`);
});
