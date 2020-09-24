const mysql= require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
var http = require('http').createServer(app)
Math.floor(Math.random() * 100) + 1;

app.use(bodyparser.json());

var mysqlConnection=mysql.createConnection({
    host:'sql12.freemysqlhosting.net',
    user : 'sql12367178',
    password: 'IdGjME75U3',
    database :'sql12367178',
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection succeeded.');
    else
    console.log('DB connection failed \n Error : '+ JSON.stringify(err,undefined,2));
});

 http.listen(process.env.PORT);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/pizza',(req,res)=>{
    mysqlConnection.query('SELECT * FROM orderdetails',(err,rows,fields)=>{
        if(!err)
         res.json(rows)
        else
        console.log(err);
    });
});


app.post('/web',(req,res)=>{

    if(flag === 1)
    {   
        responseObj={
            "fulfillmentText": rows[0].Order_Status ,"fulfillmentMessages":[{"text": {
                       "text": [rows[0].Order_Status] } }],"source":""
       }

       return res.json(responseObj)
    }

    if(req.body.queryResult.action === "ordering"){
        size= req.body.queryResult.parameters['size']
        name = req.body.queryResult.parameters['name']
        quantity = req.body.queryResult.parameters['quantity']
        pizname = req.body.queryResult.parameters['pizza']
        topping = req.body.queryResult.parameters['toppings']
        address = req.body.queryResult.parameters['address']
        number = req.body.queryResult.parameters['number']
        status = "Ordered"
        
        mysqlConnection.query("insert into orderdetails(Order_Id,Cust_Name,Item_Name,Quantity,Order_Status, mob_no, toppings, address) values(?,?,?,?,?,?,?,?)", [v,name, pizname, quantity,status, number, topping, address],(err)=>{
            if(err)
                console.log(err)

        })
        
    }

    if(req.body.queryResult.action === "status"){
        mysqlConnection.query("Select Order_Status from orderdetails where Order_Id=(?)", [v-1],(err,rows)=>{
            console.log(rows)
            
            if(rows.length > 0)
            responseObj={
            "fulfillmentText": rows[0].Order_Status ,"fulfillmentMessages":[{"text": {
                       "text": [rows[0].Order_Status] } }],"source":""
       }
            else
             responseObj={
                "fulfillmentText": "Unordered","fulfillmentMessages":[{"text": {
                           "text": ["Unordered"] } }],"source":""
           }
          

           console.log(responseObj)
           return res.json(responseObj) 
      })
       

    }

})




