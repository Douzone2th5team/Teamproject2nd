const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const config = require('../config/configJwt.json').jwt
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const secretKey = config.SECRET_KEY;
const algorithm = config.JWT_ALG;
const expiresIn = config.JWT_EXP;
const issuer = config.JWT_ISSUER;

const option = { algorithm, expiresIn, issuer };

function makeToken(idx,email) {
    const payload = {
        idx: idx,
        email: email,
    };
    const result = {
        //sign메소드를 통해 access token 발급!
        token: jwt.sign(payload, secretKey, option),
        refreshToken: randToken.uid(256)
    };
    return result;
}

function decodePayload(token) {
    let decoded;
    try {
        decoded = jwt.verify(token, secretKey);
    } catch (err) {
        if (err.message === 'jwt expired') {
            console.log('expired token');
            return TOKEN_EXPIRED;
        } else if (err.message === 'invalid token') {
            console.log('invalid token');
            console.log(TOKEN_INVALID);
            return TOKEN_INVALID;
        } else {
            console.log("invalid token");
            return TOKEN_INVALID;
        }
    }
    return decoded;
}

module.exports = { makeToken, decodePayload };