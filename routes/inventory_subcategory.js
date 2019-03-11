var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");

router.post('/csv_export_inventory_subcategory', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function(err,connection){

    var data = {}
    var std = Array();
    var result = input.data;
    console.log(result)
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {

      for(var i = 0; i < result.length; i++){
        var obj = {};
        obj['Department'] = result[i].department;
        obj['Category'] = result[i].category_name;
        obj['Subcategory'] = result[i].sub_category;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Department','Category','Subcategory'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/InventorySubCategory.csv'; 
      data.url = '/csv/InventorySubCategory.csv';

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
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = 'SELECT e.department, e.category_id, sub_category,sub_category_id, category_name FROM inventory_subcategory_master e';
         qry = qry + ' LEFT JOIN inventory_store_department c ON e.department = c.department '; 
         qry = qry + ' LEFT JOIN inventory_category_master d ON e.category_id = d.category_id '; 
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.inventorySubcategories = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Add Event listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
   var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            category_id    : input.category_id,
            department : input.department,
            sub_category : input.sub_category,
            creation_date    : formatted,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("INSERT INTO inventory_subcategory_master set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting subcategory : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.sub_category_id = rows.insertId;
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});


/* Edit Event listing. */
router.post('/edit/:id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
   var now = new Date();
   var jsonDate = now.toJSON();
   var formatted = new Date(jsonDate);
  var id = input.id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            sub_category    : input.sub_category,
            department : input.department,
            category_id : input.category_id,
            modification_date    : formatted,
            modified_by    : req.cookies.user,
        };
        
        var query = connection.query("UPDATE inventory_subcategory_master set ? WHERE sub_category_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting subcategory : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.sub_category_id = id;
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

        var query = connection.query("DELETE from inventory_subcategory_master WHERE sub_category_id = ?",[id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting subcategory : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	        }
         
          
        });
   });

});

module.exports = router;
