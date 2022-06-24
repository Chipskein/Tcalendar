const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    process.env.NODEMAILER_CLIENT_ID, 
    process.env.NODEMAILER_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({refresh_token: process.env.NODEMAILER_REFRESH_TOKEN});

module.exports={
  createTransporter:async function (){
    const { token } = await oauth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          type: "OAuth2",
          user: process.env.NODEMAILER_EMAIL, 
          clientId: process.env.NODEMAILER_CLIENT_ID,
          clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
          refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
          accessToken: token
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    return transporter
  }
}
