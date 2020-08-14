exports.get404 = (req, res, next) => {
  res.render("404", { isLogin: res.user });
};
