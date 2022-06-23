const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    process.env.NODEMAILER_CLIENT_ID, 
    process.env.NODEMAILER_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({refresh_token: process.env.NODEMAILER_REFRESH_TOKEN});
const transporter=async function (){
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
module.exports={
  sendMail:async (user,subject,text,html)=>{
      const message = {
          from: process.env.NODEMAILER_EMAIL,
          to: user,
          subject: subject,
          text: text,
          html:html
      };
      const mailer=await transporter();
      const {response,envelope}=await mailer.sendMail(message);
      if(response){
          console.log(`Email sent to ${envelope.to[0]}`);
      } else{
          console.log(`Email to ${envelope.to[0]} fail`);
      }
  }
}
