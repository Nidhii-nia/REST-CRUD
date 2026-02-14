// import fs from "fs";

// const fsPromise = fs.promises;

// async  function log(logData) {
//     try{
//         logData = `\n${new Date().toLocaleString() } "Log Data" ${logData}`;

//        await fsPromise.writeFile("logs.txt",logData,{flag : 'a'});
//     }catch(e){
//         console.log(e);
//     }
// }

import winston from "winston";

const loggerMiddleware = (req,res,next) => {
    let logData = `\n${new Date().toString()} \nreq URL:${req.url} \nreqBody:${JSON.stringify(req.body)}`;
const winstonLog = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: {service:'request-logging'},
    transports: [
        new winston.transports.File({filename:'logs.txt'})
    ]
})

winstonLog.info(logData);
    next();
}



export default loggerMiddleware;