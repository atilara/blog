function adminAuth(req, res, next) {
  // Dá continuidade a rota, passa a requisição adiante para rota
  if (req.session.user != undefined) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = adminAuth;
