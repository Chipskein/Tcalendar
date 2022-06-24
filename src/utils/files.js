const fs=require('fs');
const path=require('path');
const default_tmp_dir=`${path.resolve()}/tmp`;
module.exports={
    readFile:(filepath)=>{
        const file=fs.readFileSync(filepath);
        return file;
    }
}