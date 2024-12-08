const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Настройка CORS
app.use(cors());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/shoppingList', { useNewUrlParser: true, useUnifiedTopology: true });

// Определение схемы и модели
const listSchema = new mongoose.Schema({
    name: String,
    items: [String]
});

const List = mongoose.model('List', listSchema);

// Middleware для парсинга JSON
app.use(bodyParser.json());
app.use(express.static('public'));

// API для получения списков
app.get('/api/lists', async (req, res) => {
    const lists = await List.find();
    res.json(lists);
});

// API для добавления списка
app.post('/api/lists', async (req, res) => {
    const newList = new List(req.body);
    await newList.save();
    res.json(newList);
});

// API для удаления списка
app.delete('/api/lists/:id', async (req, res) => {
    await List.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
