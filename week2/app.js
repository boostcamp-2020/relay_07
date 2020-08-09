const path = require("path");

const express = require("express");
const sequelize = require("./util/database");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const app = express();

const store = new MySQLStore({
  host: "host-ip",
  port: "port-number",
  user: "user-id",
  password: "password",
  database: "dbName",
  clearExpired: true,
});

// model
const User = require("./models/user");
const Post = require("./models/post");
const School = require("./models/school");

// template engine setting ~ ejs
app.set("view engine", "ejs");
// view base directory setting ~ views
app.set("views", "views");

// file loader
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "dplandplan",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// locals
app.use(async (req, res, next) => {
  res.locals.pageTitle = "Relay 07 I Love School";

  if (!req.session.user) return next();

  const user = await User.findByPk(req.session.user.id);

  const school = await School.findByPk(user.schoolId);
  user.school = school;
  req.user = user;
  next();
});

// router
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

// db relation
// user:school = M:1
User.belongsTo(School);
School.hasMany(User);
// user:post = 1:M
Post.belongsTo(User);
User.hasMany(Post);

// routing
app.use(authRoutes);
app.use(postRoutes);

// error 404 controller
const errorController = require("./controllers/error");

// error 404 route
app.use(errorController.get404);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .then((err) => console.log(err));
