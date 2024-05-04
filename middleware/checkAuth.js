const requireCookie = (req, res, next) => {
    const cookieValue = req.cookies.userToken; 

    if (!cookieValue) {

        return res.redirect('/login'); 
    }

    next();
};

module.exports = requireCookie;
