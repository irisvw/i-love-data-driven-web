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
    const markdownContent = fs.readFileSync('../i-love-web/posts/2025-03-25.md', 'utf8');
    const testContent = md.render(markdownContent);
    res.render('index.liquid', { content: testContent});
})

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`);
})
