const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const PORT = process.env.port || 5000;

const errorController = require("./controllers/errors");
//const mongoConnect = require('./util/database').mongoConnect;
const User = require("./models/user");
const cors = require("cors");
const MONGODB_URI =
  "mongodb+srv://hopperjoel:Huevitos132@cluster0.fvl7e.mongodb.net/shop"; //query: ?retryWrites=true&w=majority

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collections: "sessions",
});

const csrfProtection = csrf()

const corsOptions = {
  origin: "https://joel-hopper-cse-341.herokuapp.com/",
  optionsSuccessStatus: 200,
};

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  family: 4,
};

const MONGODB_URL = process.env.MONGODB_URL || MONGODB_URI;

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ 
    secret: "secret sauce", 
    resave: false, 
    saveUninitialized: false,
    store: store
    // can add cookie: options as well since this sets the cookie
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
  .then(user => {
    if (!user) {
      return next();
    }
    req.user = user
    next()
  })
  .catch(err => {next(new Error(err))
  });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
})

// app.use((req, res, next) => {
//   User.findById("61f59a417c527364988fc425")
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.ridirect('/500');
});

// mongoConnect(client => {
//     app.listen(4000);
// })

mongoose
  .connect(MONGODB_URL, options)
  .then((result) => {
    // User.findOne().then((user) => {
    //   if (!user) {
    //     const user = new User({
    //       name: "Max",
    //       email: "max@test.com",
    //       cart: {
    //         items: [],
    //       },
    //     });
    //     user.save();
    //   }
    // });
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });

/*
const server = http.createServer(app);

server.listen(3000);
*/
