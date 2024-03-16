const admins = require('../Modals/adminSchema');
const users = require('../Modals/userSchema')
const movies = require('../Modals/movieSchema')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    console.log("inside userController : register function");
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    try {
        const existingUser = await users.findOne({ email: email });
        console.log("Existing user==");
        console.log(existingUser)

        if (existingUser) {
            res.status(406).json('Account already existing,please login !')
        } else {
            const newUser = new users({
                username: username,
                email: email,
                password: password
            })
            await newUser.save()
            res.status(200).json("registeration request received successfully")
        }

    } catch (err) {
        res.status(401).json('Resgister request faild due to ', err)
    }

}


exports.login = async (req, res) => {
    console.log("login function")
    const { email, password } = req.body
    try {
        const existinguser = await users.findOne({ email: email, password: password })
        if (existinguser) {
            const token = jwt.sign({ userId: existinguser._id }, 'superkey123')
            console.log('usertoken= ', token)
            res.status(200).json({
                existinguser: existinguser,
                token: token
            })
            res.status(200).json("login successfull")
        } else {
            res.status(406).json("invalid email or password")
        }
    } catch (err) {
        // res.status(401).json("login request faild due to ", err)
        res.status(400)
    }
}


exports.dash = async (req, res) => {
    console.log("dash=====")
}

exports.adminlogin = async (req, res) => {
    console.log("admin login function");
    const { username, password } = req.body;
    try {
        const existingUserad = await admins.findOne({ username: username, password: password });
        if (existingUserad) {
            const tokenad = jwt.sign({ adminId: existingUserad._id }, 'superkey123');
            console.log("admin token:", tokenad);
            return res.status(200).json({
                existingUserad: existingUserad,
                tokenad: tokenad,
                message: "Login successful"
            });
        } else {
            console.log("User not found or incorrect password.");
            return res.status(406).json("Invalid email or password");
        }
    } catch (err) {
        console.error("Login request failed due to:", err);
        return res.status(500).json("Login request failed");
    }
};



exports.addmovie = async (req, res) => {
    console.log("inside ad movie controll");

    const userid = req.payload;
    console.log(userid)
    const Image = req.file.filename;
    const { title, year } = req.body;
    try {
        const existingProject = await movies.findOne({ title: title });
        if (existingProject) {
            res.status(406).json("movie already exist, upload a new one")
        } else {
            const newmovie = new movies({
                title: title,
                Image: Image,
                userid: userid
            })
            await newmovie.save();
            res.status(200).json("movie added successfully")
        }
    } catch (err) {
        return res.status(500).json({ message: "Unable to add movie due to an error.", error: err.toString() });
    }

};


exports.getallmovies = async (req, res) => {
    try {
        const allmovie = await movies.find()
        res.status(200).json(allmovie)
    } catch (err) {
        res.status(401).json("request faild due to ", err)
    }
}