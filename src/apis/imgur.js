const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios').default;
const clientId=process.env.IMGUR_CLIENT_ID;
const imgurUploadURL='https://api.imgur.com/3/upload';
module.exports={
    UploadImage:async (file) =>{
        const data = new FormData();
        data.append('image',fs.createReadStream(file.path));
        const config = {
            method: 'post',
            url: imgurUploadURL,
            headers: { 
                'Authorization': `Client-ID ${clientId}`,
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                ...data.getHeaders()
            },
            data:data
        };
        const response=await axios.request(config);
        fs.unlinkSync(file.path);
        return response.data.data
    },     
}