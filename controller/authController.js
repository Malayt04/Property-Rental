const User = require('../models/User.js');


const getUserSignUp = (req, res) => {
    res.render('signup');
}

const postSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });

        res.cookie('userToken', user._id.toString());
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const getUserLogin = (req, res) => {
    res.render('login');
}

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validUser = await User.findOne({ email });
        console.log(validUser);
    
        if (!validUser) {
            return res.status(400).send("User not found");
        }
    
        if (password !== validUser.password) {
            return res.status(400).send("Invalid password");
        }
        res.cookie('userToken', validUser._id.toString());
        res.json({ validUser });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
};

const logout = (req, res) => {
    res.clearCookie('userToken');
    res.redirect('/login');
};



module.exports = {
    getUserLogin,
    postLogin,
    getUserSignUp,
    postSignUp,
    logout
}
