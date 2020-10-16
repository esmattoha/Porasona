const express = require('express');
// const { check, body } = require('express-validator/check');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-Auth');
const router = express.Router();

router.get('/quiz' ,isAuth, adminController.getAdminQuiz);

router.post('/quiz',isAuth ,adminController.postAdminQuiz);

router.get('/questions',isAuth , adminController.getAdminQuestions);

router.post('/questions', isAuth, adminController.postAdminQuestions);



module.exports = router;