const express = require('express');
const { registerGovernment, loginGovernment,postNewPolicy, getAllPolicies, getUserReports } = require('../controllers/governmentController');
const { authenticate, isGovernment } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerGovernment);
router.post('/login', loginGovernment);
router.post('/post-policy', authenticate, isGovernment, postNewPolicy);
router.get('/policies', getAllPolicies);
router.get('/user-reports', authenticate, isGovernment, getUserReports);

module.exports = router;
