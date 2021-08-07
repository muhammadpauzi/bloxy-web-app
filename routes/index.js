const express = require('express');
const router = express.Router();
const { home, blog } = require('../controllers/indexController');

router.get('/', home);
router.get('/blog/:slug', blog);

module.exports = router;