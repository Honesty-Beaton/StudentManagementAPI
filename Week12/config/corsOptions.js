const whiteList = ["http://127.0.0.1:550","http://localhost:3000", "https://www.google.com/" ];

const corsOptions = {
    origin: (origin, callback) => {
        if(!origin || whiteList.indexOf(origin) !== -1){
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,

}

module.exports = corsOptions;