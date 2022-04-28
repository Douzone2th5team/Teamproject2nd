const express = require('express');
const app = express();
const { google } = require('googleapis');
const googleClient = require('../config/google.json').web;

const scopes = [
    'https://www.googleapis.com/auth/plus.me'
];

const oauth2Client =new google.auth.OAuth2(
    googleClient.client_id,
    googleClient.client_secret,
    googleClient.redirect_uri[0]
);

const url = oauth2Client.generateAuthUrl({
    access_type:'offline',
    scope: scopes
});

function getGooglePlusApi(auth) {
    return google.plus({ version:'v1', auth });
}

app.get((req, res) => {
    console.log(url)
    res.redirect(url);
})

async function googleLogin(code) {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    oauth2Client.on('tokens', (token) => {
        if(tokens.refresh_token){
            console.log("리프레시 토큰 :", tokens.refresh_token);
        }
        console.log("액세스 토큰:", tokens.access_token);
    });
    const plus = getGooglePlusApi(oauth2Client);
    const res = await plus.people.get({ userId:'me' });
    console.log(`Hello ${res.data.displayName}! ${res.data.id}`);
    return res.data.displayName;
}


app.get("/auth/google/callback", async function (req, res) {
    const displayName = await googleLogin(req.query.code);
    console.log(displayName);
    res.redirect("http://localhost:3000");
});

module.exports = {googleLogin, url}