const express = require('express');
const router = express.Router();
const { createValidation } = require('../validators');
const { ensureAuth } = require('../middlewares/authMiddleware');
const { dashboard, create, createPost, deleteBlog } = require('../controllers/blogsController');

router.get('/dashboard', ensureAuth, dashboard);
router.get('/create', ensureAuth, create);
router.post('/create', ensureAuth, createValidation, createPost);
router.get('/delete/:id', ensureAuth, deleteBlog);

module.exports = router;