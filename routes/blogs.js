const express = require('express');
const router = express.Router();
const { createValidation, editValidation } = require('../validators');
const { ensureAuth } = require('../middlewares/authMiddleware');
const { dashboard, create, createPost, deleteBlog, edit, editPost } = require('../controllers/blogsController');

router.get('/dashboard', ensureAuth, dashboard);
router.get('/create', ensureAuth, create);
router.post('/create', ensureAuth, createValidation, createPost);
router.get('/delete/:id', ensureAuth, deleteBlog);
router.get('/edit/:id', ensureAuth, edit);
router.post('/edit/:id', ensureAuth, editValidation, editPost);

module.exports = router;