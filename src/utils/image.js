const { uploadFromStream } =require('../apis/imgur');
const { createStream,deleteFile }=require('./files');
module.exports={
    uploadImage:async (file)=>{
        const stream=createStream(file.path);
        const data=await uploadFromStream(stream);
        deleteFile(file.path);
        return data
    }
}