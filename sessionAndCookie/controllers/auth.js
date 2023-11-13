exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  // 다른 요청에서는 사용할 수 없다.
  // req.isLoggedIn = true;
  // 브라우저 쿠키를 사용한다.
  // res.setHeader("Set-Cookie", "loggedIn=true");
  // 세션사용부
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
