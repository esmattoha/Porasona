const express = require('express');
const { check, body } = require('express-validator/check');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-Auth');
const router = express.Router();

router.get('/quiz', isAuth, adminController.getAdminQuiz);

router.post('/quiz',
    [
        body('title')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Title have to be atleast 3 charecter!.')
            .isAlpha().withMessage('title must be alphabet letters.'),
        body('description')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Description have to be atleast 6 charecter!.'),
        body('totalQuestion')
            .isLength({ min: 1 })
            .withMessage('totalQuestion Skiped!!')
            .isNumeric()
            .withMessage('totalQuestion must be an integer!'),
        body('marks')
            .isLength({ min: 1 })
            .withMessage('Marks Skiped!!')
            .isFloat()
            .withMessage('Marks must be a number!'),
    ],
    isAuth,
    adminController.postAdminQuiz);

router.get('/questions', isAuth, adminController.getAdminQuestions);

router.post('/questions',
    [
        body('question')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Question have to be atleast 3 charecter!.')
            .isAlpha().withMessage('Question must be alphabet letters.'),
        [
            body('op1')
                .trim()
                .isLength({ min: 1})
                .withMessage('op1 have to be atleast 1 charecter!.')
                .isAlphanumeric()
                .withMessage('op1 must be alphabet letters and special charecter!'),
            body('op2')
                .trim()
                .isLength({ min: 1})
                .withMessage('op2 have to be atleast 1 charecter!.')
                .isAlphanumeric()
                .withMessage('op2 must be alphabet letters and special charecter!'),
            body('op3')
                .trim()
                .isLength({ min: 1})
                .withMessage('op3 have to be atleast 1 charecter!.')
                .isAlphanumeric()
                .withMessage('op3 must be alphabet letters and special charecter!'),
            body('op4')
                .trim()
                .isLength({ min: 1})
                .withMessage('op4 have to be atleast 1 charecter!.')
                .isAlphanumeric()
                .withMessage('op4 must be alphabet letters and special charecter!'),
         ],
         body('answer')
            .trim()
            .isLength({ min: 1})
            .withMessage('Answer have to be atleast 1 charecter!.')
            .isAlphanumeric()
            .withMessage('Answer must be alphabet letters and special charecter!')
    ],
    isAuth, adminController.postAdminQuestions);



module.exports = router;