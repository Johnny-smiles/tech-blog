// adding security to make sure user is logged in before accessing dashboard
const withAuth = (req, res, next) => {
  // if not, dispalyed login screen.
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;