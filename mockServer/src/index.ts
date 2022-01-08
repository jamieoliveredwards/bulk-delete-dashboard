import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

let emails = Array(20).fill(0).map((_, i) => ({
    id: i,
    name: `Email ${i + 1}`
}));

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use((req, res, next) => {
    console.log(req.headers.authorization);
    return next();
});

app.get('/emails', (req, res) => res.json(emails));

app.delete('/emails/:id', (req, res) => {
    emails = emails.filter(email => email.id !== +req.params.id);
    return res.json(emails);
});

app.listen(8080, () => console.log('Listening on port 8080'));
