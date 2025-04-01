import express from 'express';
import { Liquid } from 'liquidjs';
import markdownit from 'markdown-it';
import * as fs from 'node:fs';

const md = markdownit();

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const engine = new Liquid();
app.engine('liquid', engine.express());
app.set('views', './views');

app.get('/', async function (req, res) {
    const files = fs.readdirSync('../i-love-data-driven-web/posts');

    res.render('index.liquid', { 
        links: files,
    });
});

app.get('/home', async function (req, res) {
    const files = fs.readdirSync('../i-love-data-driven-web/posts');

    res.render('index.liquid', { 
        links: files,
    });
});

app.get('/garden', async function (req, res) {
    const files = fs.readdirSync('../i-love-data-driven-web/garden');

    res.render('garden.liquid', {
        links: files,
    })
})

app.get('/post/:file', async function (req, res) {
    const file = req.params.file;
    const mdFile = fs.readFileSync(`../i-love-data-driven-web/posts/${file}`, 'utf8');
    const mdContent = md.render(mdFile);

    res.render('post.liquid', { 
        content: mdContent,
    });
});

app.get('/garden/:file', async function (req, res) {
    const file = req.params.file;
    res.sendFile(`garden/${file}`, { root: '.' });
});

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`);
})
