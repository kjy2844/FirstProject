const express = require('express');
const app = express();
const Vote = require('./models/vote.js');
const router = require('./server/router.js')(app, Vote);
const autoIncrement = require('mongoose-auto-increment');

/* DB connection setting */
const mongoose = require('mongoose');
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('DB connection good.');
})
mongoose.connect("mongodb://localhost/DB_FirstProject", { useNewUrlParser: true });
autoIncrement.initialize(mongoose.connection);

// Middleware setting
app.use(express.static('public/views'));
//app.use(express.static('public/scripts'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);


const server = app.listen(8000, () => {
  console.log('server is running at port 8000');
});