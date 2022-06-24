const fs=require('fs');
const path=require('path');
const default_tmp_dir=`${path.resolve()}/tmp`;
const email_templates_dir=`${path.resolve()}/src/views/email_pages`;
module.exports={
    readFile:(filepath)=>{
        const file=fs.readFileSync(filepath);
        return file.toString();
    },
    replaceValuesFromTxt:(txt,values)=>{
        /*
            values [
                    {type:'user_name',value:''}
                    {type:'user_link',value:''}
                    {type:'user_time',value:''}
                    {type:'user_enterprise',value:''}
            ]
        */
        values.map((obj)=>{
            let type=`\${${obj.type}}`
            txt=txt.replaceAll(type,obj.value)
        })
        return txt;
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