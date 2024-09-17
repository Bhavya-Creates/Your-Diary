const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 1000;
let diaryHistory = [];

app.set('views', __dirname); // Assuming views are in the root directory
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index"); // Render index.ejs
});

app.get("/history", (req, res) => {
    res.render('history', { diaries: diaryHistory }); // Ensure the variable name matches
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
    res.redirect('/history'); // Redirect to the correct route
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
