const bcrypt = require("bcryptjs");

const School = require("../models/school");
const User = require("../models/user");

exports.getHome = (req, res, next) => {
  res.render("auth/home", {
    isLogin: false,
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  // email 존재 x
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      res.redirect("/");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.user = user;
      return req.session.save((err) => {
        console.log(err);
        res.redirect("/posts");
      });
    }

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

exports.postSignup = async (req, res, next) => {
  const { name, email, password, schoolName, schoolType } = req.body;

  try {
    let school = await School.findOne({
      where: {
        name: schoolName,
        type: schoolType,
      },
    });

    if (!school) {
      school = new School({
        name: schoolName,
        type: schoolType,
      });
      await school.save();
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await school.createUser({
      name,
      email,
      password: hashedPassword,
      score: 0,
    });

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
