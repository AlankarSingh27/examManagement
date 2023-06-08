const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
 const userRouter=require('./router/userRouter');
 const adminRouter=require('./router/adminRouter');

const app = express();
app.use(express.json());



 app.use('/users',userRouter);
 app.use('/admin',adminRouter);

app.listen(8081, () => {
  console.log(`Listening on port 8081`);
});

;

