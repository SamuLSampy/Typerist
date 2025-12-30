require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path')

const session = require('express-session')
const routers = require('./routes')
const mongoose = require('mongoose')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => console.log('Mongo Conectado'))
  .catch(err => console.log('Erro ao conectar mongo>'+err))

app.use((req, res, next) => {
  const lang = req.query.lang || 'pt-BR';
  const translations = require(`./locales/${lang}.json`); 

  res.locals.t = translations;
  res.locals.lang = lang;
  next();
});


app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'src', 'views'));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use(routers)


app.use(express.static(path.resolve(__dirname, 'public')))

// app.all('*', (req, res) =>{
//     res.status(404).send('<h1>404! Page not found</h1>');
// })

app.listen(3000, () => {
  console.log('Acessar http://localhost:3000');
  console.log('Servidor executando na porta 3000');
});
