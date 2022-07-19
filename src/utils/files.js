const fs=require('fs');
const path=require('path');
const default_tmp_dir=`${path.resolve()}/tmp`;
const email_templates_dir=`${path.resolve()}/src/views/email_pages`;
module.exports={
    readFile:(filepath)=>{
        const file=fs.readFileSync(filepath);
        return file.toString();
    },
    replaceInsideBodyFromHTML:(template_html,html)=>{
        return template_html.replace('${html}',html);
    },
    deleteFile:(path)=>{
        const fileExists=fs.existsSync(path);
        if(fileExists) fs.unlinkSync(path);
    },
    createStream:(path)=>{
        const stream=fs.createReadStream(path);
        return stream
    },
    email_templates_dir,
    default_tmp_dir
}