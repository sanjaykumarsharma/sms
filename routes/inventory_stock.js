var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");

/* Read Course listing. */
/*router.get('/readEmployee', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT * FROM employees',function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.employees = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});*/

/* Read Event listing. */
router.get('/:id', function(req, res, next) {

  req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) { 
        if (err) { throw err; }
        var data = {}
        var user='';
        var session_id=req.cookies.session_id
        var category_id=req.params.id
        var start_date=''
        var end_date=''
        console.log(category_id)
         var qury=`select session_name, date_format(session_start_date,'%Y-%m-%d') as session_start_date, date_format(session_end_date,'%Y-%m-%d') as session_end_date
            from session_master where session_id = ${session_id}`;
          connection.query(qury,function(err,result){
          if(err){
              return connection.rollback(function() {
              throw err;
               /*console.log("Error reading Session Date item : %s ",err );
               data.status = 'e';*/
             })
          }//else{
            
          start_date=result[0].session_start_date
          end_date=result[0].session_end_date
            
          //} 
       

         console.log(start_date) 

       
        var user=req.cookies.user
        var condition = "";
        if(category_id !=-1){
          condition = `where a.category_id = ${category_id}`;
         }
        var user_condition = "";
        if(req.cookies.user != 'admin') user_condition =` and a.created_by = '${user}' `;
       // and received_date between :dtf and :dto
        var qry = `select received_id,date_format(received_date,'%d/%m/%Y') as received_date, date_format(received_date,'%Y-%m-%d') as r_date,
                item_name,category_name, concat('',a.quantity,' ',unit) as quantity, a.rate,(a.quantity*a.rate)as amount,
                received_from, rack_name, a.quantity as qty, remark,created_by ,a.rack_id,a.unit_id,a.category_id,a.sub_category_id,a.item_id
                from received_goods a
                join inventory_item_master b on a.item_id = b.item_id
                join inventory_category_master c on a.category_id = c.category_id
                join unit_master d on a.unit_id = d.unit_id
                join rack_master e on a.rack_id = e.rack_id
                 ${condition} ${user_condition} 
                 and is_opening = 0
                 and received_date between '${start_date}' and '${end_date}' 
                 order by r_date desc`; 
          console.log(qry)  
         connection.query(qry,function(err,result){
            
          if(err){
           return connection.rollback(function() {
              throw err;
          });

        }
        connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                throw err;
              });
            }
            data.status = 's';
            data.inventoryStocks = result;
            console.log('success!');
            console.log(data);
            res.send(JSON.stringify(data))
          });
     
     });
    })
  })   
  });

});

/* Add Event listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
        var data = {}
        var now = new Date();
        var jsonDate = now.toJSON();
        var formatted = new Date(jsonDate);

        var values = {
          received_date : input.received_date,
          item_id : input.item_id,
          category_id : input.category_id,
          sub_category_id : input.sub_category_id,
          quantity : input.quantity,
          unit_id : input.unit_id,
          rate : input.rate,
          received_from : input.received_from,
          rack_id : input.rack_id,
          remark : input.remark,
          creation_date : formatted,
          created_by : req.cookies.user,
          modification_date : formatted,
          modified_by : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO received_goods set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting Goods : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.received_id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


/* Edit Event listing. */
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}
         var now = new Date();
        var jsonDate = now.toJSON();
        var formatted = new Date(jsonDate);  
        var values = {
            received_date : input.received_date,
           item_id : input.item_id,
           category_id : input.category_id,
           sub_category_id : input.sub_category_id,
           quantity : input.quantity,
           unit_id : input.unit_id,
           rate : input.rate,
           received_from : input.received_from,
           rack_id : input.rack_id,
           remark : input.remark,
           modification_date : formatted,
           modified_by : req.cookies.user,
        };
        
        var query = connection.query("UPDATE received_goods set ? WHERE received_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting item : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.received_id = id;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

/* Delete Event listing. */
router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;

  req.getConnection(function(err,connection){
        var data = {}

        var query = connection.query("DELETE from received_goods WHERE received_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting goods : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

router.post('/csv_export_inventory_stock', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function(err,connection){

    var data = {}
    var std = Array();
    var result = input.data;
    console.log(result)
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {

      for(var i = 0; i < result.length; i++){
        console.log(result[i].referred_by)
        var obj = {};
        obj['Date'] = result[i].received_date;
        obj['Category'] = result[i].category_name;
        obj['Item Name'] = result[i].item_name;
        obj['Quantity'] = result[i].quantity;
        obj['Rate'] = result[i].rate;
        obj['Amount'] = result[i].amount;
        obj['Received From'] = result[i].received_from;
        obj['Rack No'] = result[i].rack_name;
        obj['Remarks'] = result[i].remark;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Date','Category','Item Name','Quantity','Rate','Amount','Received From','Rack No','Remarks'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/receivedGoods.csv'; 
      data.url = '/csv/receivedGoods.csv';

      fs.writeFile(path, csv, function(err,data) {
        if (err) {
          throw err;
        }else{ 
          callback() 
        }
      });        
    },function (err) {
      if (err) {
        console.error(err.message);
        data.status = 'e';
        res.send(data)
      }
        data.status = 's';
        res.send(data)
    });

    });
});

module.exports = router;
