const nodemailerConfig=require('../config/nodemailer');
const { email_templates_dir ,readFile,replaceValuesFromTxt} =require('../utils/files');
module.exports={
    sendNodemailerMail:async (user,subject,html)=>{
        const message = {
            from: process.env.NODEMAILER_EMAIL,
            to: user,
            subject: subject,
            html:html
        };
        const mailer=await nodemailerConfig.createTransporter();
        const {response,envelope}=await mailer.sendMail(message);
        if(response){
            console.log(`Email sent to ${envelope.to[0]}`);
        } else{
            console.log(`Email to ${envelope.to[0]} fail`);
        }
    },
    prepareEmail:(type,data,server_url)=>{
        let template;
        let subject;
        let values;
        let link;
        switch(type){
            case "active_user":
                template='active_user';
                subject="Tcalendar | Ative a sua conta";
                link=module.exports.generateLinkEmail('active_user',data,server_url);
                values=[{type:"user_name",value:data.name},{type:"user_link",value:link}]
                break;
            case "reset_password":
                template='reset_password';
                subject="Tcalendar | Solicitação de nova senha";
                link=module.exports.generateLinkEmail('reset_passwod',data,server_url);
                values=[{type:"user_name",value:data.name},{type:"user_link",value:link}]
                break;
            case "notification_schedule":
                template='notification_schedule';
                subject="Tcalendar | Notificação Reunião Marcada";
                values=[{type:"user_name",value:data.name},{type:"user_time",value:data.time},{type:"user_enterprise",value:data.enterprise}];
                break;
        }
        let html=readFile(`${email_templates_dir}/${template}.html`);
        html=replaceValuesFromTxt(html,values)
        return {
            subject,
            html
        }
    },
    generateLinkEmail:(type,data,server_url)=>{
        let url=`${server_url}`;
        switch(type){
            case "active_user":
                url+=`/users/active?token=${data.token}`
                break;
            case "reset_password":
                url+=`/users/reset?token=${data.token}`
                break;
        }
        return url
    },
    sendEmail:async (data)=>{
        const {subject,html}=module.exports.prepareEmail('active_user',data,data.server_url);
        await module.exports.sendNodemailerMail(data.email,subject,html);
    }
}