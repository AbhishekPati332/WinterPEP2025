const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const hospitalRoute = require('./routers/hospital');
const hosDetail = require('./routers/hosDetails');
const User = require('./routers/User');

require('./config/db');
require('./config/cloudinary');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}))


app.use('/api/v1/hospital',hospitalRoute);
app.use('/api/v1/hospitalDetail',hosDetail);
app.use('/api/v1/auth',User);


app.get('/',(req,res)=>{
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})