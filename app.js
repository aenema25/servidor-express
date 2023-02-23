
require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const handlebars = require('express-handlebars');
const fs = require('fs')

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");
const ProductsClass = require('./utils/ProductManager');
const { connected } = require('process');
const database = require('./db/connect');
const io = new Server(server);

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


// view engine setup
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars.engine());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

app.use('/api', productsRouter);
app.use('/user', usersRouter);


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

app.get('/products', (req, res) => {
  res.render('products');
});

app.get('/cart', (req, res) => {
  res.render('cart');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

io.on('connection', (socket) => {
  socket.on('list products', (msg) => {
    io.emit('list products', ProductsClass.getProducts())
  });

  fs.watchFile('./utils/data.json', { persistent: true }, () => {
    io.emit('list products', ProductsClass.getProducts())
  })
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
module.exports = server

module.exports = {
  app: app,
  server: server,
};
