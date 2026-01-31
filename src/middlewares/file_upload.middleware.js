import multer from "multer";
import path from "path";

const storageconfig = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,path.join(process.cwd(),"public","files"));
    },
    filename: (req,file,cb) =>{
        const fileName = file.originalname+"-"+ Date.now();
        cb(null,fileName);
    }
})

const uploadFile = multer({
    storage:storageconfig,
})

export default uploadFile;