const nodemailerConfig=require('../config/nodemailer');
const { email_templates_dir ,readFile,replaceInsideBodyFromHTML} =require('../utils/files');

async function sendNodemailerMail(user,subject,html){
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
}
function prepareEmail(type,data,server_url){
    const template='template';
    let subject;
    let email_html_body;
    switch(type){
        case "active_user":
            subject="Tcalendar | Ative a sua conta";
            email_html_body=`
                <p>
                    ${data.name} ative seu usuario clicando no <a href="${generateLinkEmail('active_user',data,server_url)}">link</a>
                </p>
            `;
            
            break;
        case "reset_password":
            subject="Tcalendar | Solicitação de nova senha";
            email_html_body=`
                <p>
                    ${data.name} ,Você solicitou uma alteração de senha click no link para prosseguir 
                    <a href="${generateLinkEmail('reset_password',data,server_url)}">link</a>
                </p>;
            `;
            break;
        case "notification_schedule":
            subject="Tcalendar | Notificação Reunião Marcada";
            email_html_body=`
                <p>
                    ${data.name}, você tem uma reunião marcada na agenda do time ${data.time} da empresa ${data.enterprise}
                </p>
            `;
            break;
        case "notification_enterprise":
            subject=`Tcalendar | Você foi adicionado a empresa ${data.enterprise}`;
            email_html_body=`
                <p>
                    ${data.name},Você foi adicionada a empresa ${data.enterprise}
                </p>
            `;            
            break;
        case "team_invite":
            subject=`Tcalendar | Você foi convidado ao time ${data.team} da empresa ${data.enterprise}`;
            email_html_body=`
                <p>Você foi convidado ao time ${data.team} da empresa ${data.enterprise}</p>
                <p><a href=${generateLinkEmail('team_invite',data,server_url)}>aceitar</a><p>
            `;
            break;                
    }
    let template_html=readFile(`${email_templates_dir}/${template}.html`);
    html=replaceInsideBodyFromHTML(template_html,email_html_body)
    return {
        subject,
        html
    }
}
function generateLinkEmail(type,data,server_url){
    let url=`${server_url}`;
    switch(type){
        case "active_user":
            url+=`/users/active?token=${data.token}`
            break;
        case "reset_password":
            url+=`/users/resetpassword?token=${data.token}`
            break;
        case "team_invite":
            url+=`/teams/${data.teamId}/invite/accept?token=${data.token}`
            break;
    }
    return url
}

module.exports={
    sendEmail:async (data,type='active_user')=>{
        const {subject,html}=prepareEmail(type,data,data.server_url);
        await sendNodemailerMail(data.email,subject,html);
    }
}