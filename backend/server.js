const express = require('express');
const mysql = require('mysql2');
var cors = require('cors')
require('dotenv').config();
 const userRouter=require('./router/userRouter');
 const loginRouter=require('./router/loginRouter');

const app = express();
app.use(express.json());
app.use(cors())



 app.use('/users',userRouter);
 app.use('/user',loginRouter);

app.listen(8081, () => {
  console.log(`Listening on port 8081`);
});



