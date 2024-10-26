const express = require('express');
const { createUnsafeArea, getUnsafeAreas, getUnsafeAreaById, updateUnsafeArea, deleteUnsafeArea } = require('../controllers/unsafeAreaController');
const { authenticate, isGovernment } = require('../middlewares/authMiddleware');
const { reportUnsafeArea } = require('../controllers/userController');

const router = express.Router();

router.post('/', authenticate, isGovernment, createUnsafeArea);
router.get('/', getUnsafeAreas);
router.get('/:id', getUnsafeAreaById);
router.put('/:id', authenticate, isGovernment, updateUnsafeArea);
router.delete('/:id', authenticate, isGovernment, deleteUnsafeArea);
router.post('/report-unsafe-area', authenticate, reportUnsafeArea);

module.exports = router;
