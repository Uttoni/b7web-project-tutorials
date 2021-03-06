const express = require('express');
const homeControler = require('../controllers/homeController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController.js');
const imageMiddleware = require('../middlewares/imageMiddleware');

const router = express.Router();

router.get('/', homeControler.userMiddlware, homeControler.index);
router.get('/users/login', userController.login);
router.get('/users/register', userController.register);

router.get('/post/add', postController.add);
router.post('/post/add',
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.addAction
);

router.get('/post/:slug/edit', postController.edit);
router.post('/post/:slug/edit',
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.editAction
);

router.get('/post/:slug', postController.view);

module.exports = router;