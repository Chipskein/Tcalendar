const nodemailerConfig=require('../config/nodemailer');
module.exports={
    sendMail:async (user,subject,text,html)=>{
        const message = {
            from: process.env.NODEMAILER_EMAIL,
            to: user,
            subject: subject,
            text: text,
            html:html
        };
        const mailer=await nodemailerConfig.createTransporter();
        const {response,envelope}=await mailer.sendMail(message);
        if(response){
            console.log(`Email sent to ${envelope.to[0]}`);
        } else{
            console.log(`Email to ${envelope.to[0]} fail`);
        }
    }
}