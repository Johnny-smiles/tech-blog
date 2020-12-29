// linking express npm
const router = require('express').Router();
// linking home routes js file
const homeRoutes = require('./home-routes.js');
// linking api route folder
const apiRoutes = require('./api');
// linking dashboard js file
const dashboardRoutes = require('./dashboard-routes.js');

// formating syntax for dashboard api  
router.use('/dashboard', dashboardRoutes);
// formating syntax for routes api
router.use('/api', apiRoutes);
// formating syntax for home api
router.use('/', homeRoutes);
// requiring request/response for each api
router.use((req, res) => {
  res.status(404).end();
});

// exporting settings
module.exports = router;
