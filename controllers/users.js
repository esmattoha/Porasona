exports.getHome = (req, res, next ) =>{
    res.render('users/home.ejs',{
        pageTitle : 'Home',
        path: '/'
    });
}