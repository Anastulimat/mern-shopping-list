const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //Check for token
    if(!token) {
        res.status(401).json({message: 'No token, authorization denied !'});
    }

    try
    {
        //Verify token
        //Add user from payload
        req.user = jwt.verify(token, config.get('jwtSecret'));
        next();
    }
    catch (e)
    {
        res.stat(400).json({message: 'Token is not valid'});
    }
}

module.exports = auth;