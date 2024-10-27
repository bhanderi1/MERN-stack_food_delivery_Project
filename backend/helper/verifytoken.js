const jwt = require('jsonwebtoken')
const User = require('../Model/user.model')

exports.verifyToken = async (req, res, next) => {
    try {
        let authorization = req.cookies.auth_token;
        console.log("Authorization token:", authorization);

        if (!authorization) {
            req.flash({ message: 'No authorization token provided' });
            return res.status(401).json({ message: 'No authorization token provided' });
        }

        let token = authorization.startsWith("Bearer ") ? authorization.split(" ")[1] : authorization;

        let { userId } = await jwt.verify(token, process.env.JWT_SECRATE);

        let user = await User.findOne({ _id: userId, isDelete: false });

        if (!user) return res.status(404).json({ message: 'User not found' });

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};
