const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const app = express();

const conn = require("./db/conn");

// models
const Tought = require("./models/Tought");
const User = require("./models/User");

// import Routes
const toughtsRoutes = require("./routes/toughtsRoutes");

// import controller
const { showToughts } = require("./controllers/ToughtController");
const ToughtController = require("./controllers/ToughtController");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// session middleware
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
)

// flash messages
app.use(flash());

// public path
app.use(express.static("public"));

// Routes
app.use("/toughts", toughtsRoutes);
app.get("/", ToughtController.showToughts);

// set session to res
app.use((req, res, next) => {
  if (req.session.useId) {
    res.locals.session = req.session;
  }

  next();
});

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
