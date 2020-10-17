const crypto = require('crypto');
const { validationResult } = require('express-validator/check');
const Questions = require('../models/questions');
const Quiz = require('../models/quiz');

exports.getAdminQuiz = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('admin/quiz.ejs', {
        path: '/admin/quiz',
        pageTitle: 'Admin Quiz',
        errorMessage: message,
        oldInput: {
            title: '',
            description: '',
            totalQuestion: '',
            marks: ''
        },
        validationErrors: []
    });
    
};
exports.getAdminQuestions = (req, res, next) => {
    const quizId = req.query.quizId;
    let totalQ = 0;
    Quiz.findOne({ _id: quizId }).then(quiz => {
        console.log(quiz)
        totalQ = quiz.totalQuestion
        Questions.find().where('quizId', quizId).then(questions => {
            if (totalQ === questions.length) {
                res.send('<h2> Question overloaded!!</h2><br>')
            } else {
                let message = req.flash('error');
                if (message.length > 0) {
                    message = message[0];
                } else {
                    message = null;
                }
                res.render('admin/questions.ejs', {
                    path: '/admin/questions',
                    pageTitle: 'Admin Questions',
                    quizId: quizId,
                    errorMessage: message,
                    oldInput: {
                        title: '',
                        op1: '',
                        op2: '',
                        op3: '',
                        op4:'',
                        answer:''
                    },
                    validationErrors: []
                });
                // res.render('admin/questions.ejs', {
                //     pageTitle: 'Admin Questions',
                //     path: '/admin/questions',
                //     quizId: quizId
                // })
            }
        })
            .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 406;
                return next(error, 'Something went wrong');
            })
    }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 406;
        return next(error, 'Something went wrong');
    })




};
exports.postAdminQuiz = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const totalQuestion = req.body.totalQuestion;
    const marks = req.body.marks;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('admin/quiz.ejs', {
            path: '/admin/quiz',
            pageTitle: 'Admin Quiz',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                title:title,
                description: description,
                totalQuestion: totalQuestion,
                marks: marks
            },
            validationErrors: errors.array()
        });
    }
    const quiz = new Quiz({
        title: title,
        description: description,
        totalQuestion: totalQuestion,
        marks: marks
    });
    quiz.save()
        .then(result => {
            res.redirect('/admin/questions?quizId=' + result._id);
        })
        .catch(err => {
            console.log(err);
        });

};
exports.postAdminQuestions = (req, res, next) => {
    const title = req.body.title;
    const op1 = req.body.op1;
    const op2 = req.body.op2;
    const op3 = req.body.op3;
    const op4 = req.body.op4;
    const answer = req.body.answer;
    const quizId = req.body.quizId;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('admin/quiz.ejs', {
            path: '/admin/quiz',
            pageTitle: 'Admin Quiz',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                title:title,
                op1:op1,
                op2:op2,
                op3:op3,
                op4:op4,
                answer:answer
            },
            validationErrors: errors.array()
        });
    }
    const question = new Questions({
        title: title,
        options: {
            op1: op1,
            op2: op2,
            op3: op3,
            op4: op4
        },
        answer: answer,
        quizId: quizId
    });
    question.save()
        .then(result => {
            res.redirect('/admin/questions?quizId=' + quizId);
        })
        .catch(err => {
            console.log(err);
        });
};
