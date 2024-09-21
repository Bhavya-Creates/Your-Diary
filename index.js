const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 2000;

let diaryHistory = [];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/history", (req, res) => {
    res.render('history', { diaries: diaryHistory });
});

app.post('/submit-diary', (req, res) => {
    const newDiary = {
        content: req.body.diaryContent,
        date: new Date().toLocaleDateString()
    };

    if (newDiary.content) {
        diaryHistory.push(newDiary);
        res.redirect('/history');
    } else {
        res.status(400).send('Error: Diary content is empty');
    }
});

app.post('/delete-diary', (req, res) => {
    const index = parseInt(req.body.index, 10);

    if (index >= 0 && index < diaryHistory.length) {
        diaryHistory.splice(index, 1);
    }

    res.redirect('/history');
});

app.get('/your-diaries', (req, res) => {
    res.redirect('/history');
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});