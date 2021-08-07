const express = require('express');
const router = express.Router();
const { createValidation } = require('../validators');
const { ensureAuth } = require('../middlewares/authMiddleware');
const { dashboard, create, createPost } = require('../controllers/blogsController');

router.get('/dashboard', ensureAuth, dashboard);
router.get('/create', ensureAuth, create);
router.post('/create', ensureAuth, createValidation, createPost);

module.exports = router;