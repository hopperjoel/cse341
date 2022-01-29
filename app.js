
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const PORT = process.env.port || 5000

const errorController = require('./controllers/errors');
//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
//const cors = require('cors');

const app = express();

// const corsOptions = {
//   origin: "https://cse341.herokuapp.com/",
//     optionsSuccessStatus: 200
// };

//app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://hopperjoel:Huevitos132@cluster0.fvl7e.mongodb.net/shop?retryWrites=true&w=majority";

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findById('61f59a417c527364988fc425')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404)

// mongoConnect(client => {
//     app.listen(4000);
// })

mongoose
  .connect(
    MONGODB_URL //options
  )
   .then(result => {
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            name: 'Max',
            email: 'max@test.com',
            cart: {
              items: []
            }
          });
          user.save();
        }
      });
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });



/*
const server = http.createServer(app);

server.listen(3000);
*/