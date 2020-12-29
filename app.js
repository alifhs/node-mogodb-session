const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);  //maybe mongodbstore will use a format that session can understand

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = "mongodb://localhost:27017/eCommerce";

const app = express();
const store = new MongoDBStore({
  uri : MONGODB_URI,
  collection : 'session'
});

app.set('view engine', 'ejs');
// app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const { collection } = require('./models/user');  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'our secret', resave: false, saveUninitialized: false, store: store})); // saveUninitialized if req.session is not changed/modified/added any property  

// console.log(__dirname); full path
// app.use(cookieSession({
//   name: 'session',
//   keys: [/* secret keys */],

//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))

// app.use((req, res, next) => {
//   User.findById('5fe8607d5933f0195c5c0b0e')  
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes); 

app.use(errorController.get404);

// mongoose
//   .connect(
//     // 'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/shop?retryWrites=true'
//   )
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'user',
          email: 'user11@mail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
