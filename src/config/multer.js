const path=require('path');
const multer=require('multer');
const multer_config={
    dest:`${path.resolve()}/tmp`
}
const upload=multer(multer_config);
module.exports={upload}