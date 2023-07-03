require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const handlebars = require('express-handlebars');
const fs = require('fs')
const app = express();
const cors = require('cors')

const productsRouter = require('./routes/products.routes');
const githubRouter = require('./routes/github.routes');
const usersRouter = require('./routes/users.routes');
const mocksRouter = require('./routes/mocks.routes');

const server = http.createServer(app);
const { Server } = require("socket.io");
const ProductsClass = require('./utils/ProductManager');
const database = require('./db/connect');
const io = new Server(server);

const initializePassport = require("./config/passport.config");
const session = require('express-session');
const passport = require('passport');


database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})


// // view engine setup
// app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// app.engine('handlebars', handlebars.engine());

initializePassport()

app.use(passport.initialize())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(session({
  secret: "CoderHouseSecret",
  saveUninitialized: false
}))
app.use(cors({
  origin: '*',
  credentials: true
}))

app.use('/api/products', productsRouter);
app.use('/api/github', githubRouter);
app.use('/user', usersRouter);
app.use('/api/mocks', mocksRouter);

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
