require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

const session = require('express-session');
const routers = require('./routes');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,

  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions'
  }),

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

app.use(routers);

app.use(express.static(path.resolve(__dirname, 'public')));

// app.all('*', (req, res) =>{
//     res.status(404).send('<h1>404! Page not found</h1>');
// });

server.listen(3000);
io.on("connection", socket => {
  console.log("Socket conectado:", socket.id);
});
