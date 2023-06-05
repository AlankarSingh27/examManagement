
const express = require('express');
const mysql = require('mysql2');
const app = express();
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Alankar12@',
  database : 'users'
});

connection.connect();
const sqlCreate="INSERT INTO student (name,email,password,roll) VALUES ('add','dadsdf@f.com','asdsd12','5445654')"
connection.query(sqlCreate, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);

});
// const sqlInsert="INSERT INTO student (name,email,password) VALUES ('add','dadsdf@f.com','asdsd12')"
// connection.query(sqlInsert, function (error, results, fields) {
//   if (error) throw error;
//    console.log('The solution is: ', results);
//
// });
// const sqldelete="Delete from student where name='add'"
// connection.query(sqldelete, function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
//
// });
// const sqlAlter="ALTER TABLE student ADD COLUMN roll varchar(50)";
// connection.query(sqlAlter, function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
//
// });

connection.end();
app.listen(8081, () => {
  console.log("Listening on port 8081");
});

;

