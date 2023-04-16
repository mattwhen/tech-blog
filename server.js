const path = require("path");
const express = require("express");
const session = require("express-session");
const expressHandleBars = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/auth");

const sequelize = require("./config/connection");
// Initializes Sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Setup handlebars.js engine with custom helpers
const handlebars = expressHandleBars.create({ helpers });

// Sets up session and connect to our sequelize Database.
const sess = {
  secret: "Super secret secret",
  // Express session will use cookies by default, but we can specify options for those cookies by adding a cookies property to our session options.
  cookie: {
    maxAge: 60 * 10 * 1000, // Set the maximum age for the cookie (and session) to expire after 10 minutes.
    httpOnly: true, // httpOnly tells express-session to only store session cookies when the protocol being used to connect to the server is HTTP.
    secure: false, // Secure tells express-session to only initialize HTTPS if this is set to: TRUE.
    // Running a server WITHOUT encryption will result in cookies NOT showing up in the developer console.
    sameSite: "strict", // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
  },
  resave: false,
  saveUninitialized: true,
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use.
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  // If force: true, this is similar to the SQL query, DROP TABLE IF EXISTS
  app.listen(PORT, () => console.log("Now listening"));
});

module.exports = {};
