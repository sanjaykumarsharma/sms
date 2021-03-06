var express = require('express');
var router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var http = require('http');
var async = require("async");


router.post('/csv_export_issued_goods_report', function(req, res, next) {
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
        obj['Date'] = result[i].issue_date;
        obj['Item Name'] = result[i].item_name;
        obj['To Whom'] = result[i].staff_name;
        obj['Quantity'] = result[i].quantity;
        obj['Purpose'] = result[i].purpose;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Date','Item Name','To Whom','Quantity','Purpose'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/issueGoodsReport.csv'; 
      data.url = '/csv/issueGoodsReport.csv';

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

router.post('/csv_export_inventory_person_wise_issued_goods_report', function(req, res, next) {
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
        obj['Date'] = result[i].issue_date;
        obj['Item Name'] = result[i].item_name;
        obj['Quantity'] = result[i].quantity;
        obj['Purpose'] = result[i].purpose;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Date','Item Name','Quantity','Purpose'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/inventoryPersonWiseIssuedReport.csv'; 
      data.url = '/csv/inventoryPersonWiseIssuedReport.csv';

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

router.post('/csv_export_inventory_sale_goods_report', function(req, res, next) {
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
        obj['Date'] = result[i].sale_date;
        obj['Category'] = result[i].category_name;
        obj['Item Name'] = result[i].item_name;
        obj['Quantity'] = result[i].quantity;
        obj['Rate'] = result[i].sale_rate;
        obj['Amount'] = result[i].amount;
        obj['Sale To'] = result[i].sale_to;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Date','Category','Item Name','Quantity','Rate','Amount','Sale To'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/soldItem.csv'; 
      data.url = '/csv/soldItem.csv';

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

router.post('/csv_export_inventory_return_goods_report', function(req, res, next) {
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
        obj['Date'] = result[i].issue_date;
        obj['Category'] = result[i].category_name;
        obj['Item Name'] = result[i].item_name;
        obj['To Whom'] = result[i].return_to;
        obj['Quantity'] = result[i].quantity;
        obj['Return Date'] = result[i].return_date;
        obj['Remarks'] = result[i].return_remarks;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Date','Category','Item Name','To Whom','Quantity','Return Date','Remarks'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/returnItem.csv'; 
      data.url = '/csv/returnItem.csv';

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

router.post('/csv_export_inventory_received_goods_report', function(req, res, next) {
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
        obj['Category'] = result[i].category_name;
        obj['Item Name'] = result[i].item_name;
        obj['Quantity'] = result[i].quantity;
        obj['Rate'] = result[i].rate;
        obj['Amount'] = result[i].amount;
        obj['Rack'] = result[i].rack_name;
        obj['Remarks'] = result[i].remark;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Category','Item Name','Quantity','Rate','Amount','Rack','Remarks'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/inventoryReceivedGoodsReport.csv'; 
      data.url = '/csv/inventoryReceivedGoodsReport.csv';

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
router.get('/read_received_from', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qury=`select received_from
                from received_goods
                where is_opening = 0 
                group by received_from`;
          connection.query(qury,function(err,result){
          if(err){
              console.log("Error reading data : %s ",err );
               data.status = 'e'; 
          }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.receivedFromArray = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.post('/read_inventory_received_goods_report', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function(err,connection){
       
        var data = {}
        var user_condition="";
        var person = "";
       // var session_id=req.cookies.session_id
        var role=req.cookies.role
        var user=req.cookies.user
        var received_from=input.received_from;
        var start_date=input.start_date
        var end_date=input.end_date
       if(received_from !="All") person =` and received_from= '${received_from}' `;
       if(req.cookies.user != 'admin') user_condition = ` and a.created_by = '${user}' `;
     var qury=`select date_format(received_date,'%d/%m/%Y')as received_date,received_date as r_date,
                item_name,category_name, concat('',quantity,' ',unit)as quantity, rate,(quantity*rate)as amount,
                rack_name, remark 
                from received_goods a
                join inventory_item_master b on a.item_id = b.item_id
                join inventory_category_master c on a.category_id = c.category_id
                left join unit_master d on a.unit_id = d.unit_id
                left join rack_master e on a.rack_id = e.rack_id
                where received_date between '${start_date}' and '${end_date}'
                ${person} ${user_condition}
                and is_opening = 0
                order by r_date desc`;
          connection.query(qury,function(err,result){
            console.log(qury)
          if(err){
               console.log("Error reading data : %s ",err );
                data.status = 'e';
          }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.inventoryReceivedGoodsReports = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// read Issued Goods

router.get('/read_inventory_issued_goods_report/:issue_type/:start_date/:end_date', function(req, res, next) {

  req.getConnection(function(err,connection){
       
        var data = {}
        var user_condition="";
       // var user = "";
        var user=req.cookies.user
        var role=req.cookies.role
        var start_date=req.params.start_date
        var end_date=req.params.end_date
        var issue_type=req.params.issue_type
        if(req.cookies.role != 'ADMIN') user_condition = `and a.created_by = '${user}' `;
     var qury=`select date_format(issue_date,'%d/%m/%Y')as issue_date,issue_date as r_date,
                item_name,category_name, concat('',issue_quantity,' ',unit)as quantity,
                concat(first_name,' ',middle_name,' ',last_name) as staff_name,
                issue_to, purpose 
                from issue_goods a
                join inventory_item_master b on a.issue_item_id = b.item_id
                join inventory_category_master c on a.issue_category_id = c.category_id
                left join unit_master d on a.issue_unit = d.unit_id
                left join employee e on a.staff_id = e.emp_id
                where a.issue_type ='${issue_type}'
                ${user_condition}
                and issue_date between '${start_date}' and '${end_date}'
                order by r_date desc`;
          connection.query(qury,function(err,result){
            console.log(qury)
          if(err){
               console.log("Error reading data : %s ",err );
                data.status = 'e';
          }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.inventoryIssuedGoodsReports = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// read Issue to peson

router.get('/read_inventory_issue_to/:issue_type', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var issue_type=req.params.issue_type
           if(issue_type=='Staff'){
              var qury=`select distinct (staff_id) as issue_to  , first_name, concat(first_name,' ',middle_name,' ',last_name) as name 
              from issue_goods a
              left join  employee b on a.staff_id = b.emp_id 
              where issue_type='${issue_type}'
              order by first_name `;
           }else{
            var qury=`select distinct issue_to , issue_to as name from issue_goods 
              where issue_type='${issue_type}'
              order by 1`;
           }
     
          connection.query(qury,function(err,result){
          if(err){
              console.log("Error reading data : %s ",err );
               data.status = 'e'; 
          }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.issuedPersons = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// read Issued Goods person wise

router.get('/read_inventory_person_wise_issued_goods_report/:issue_type/:issue_to/:start_date/:end_date', function(req, res, next) {

  req.getConnection(function(err,connection){
       
        var data = {}
        var user_condition="";
        //var user = "";
        var user=req.cookies.user
        var role=req.cookies.role
        var start_date=req.params.start_date
        var end_date=req.params.end_date
        var issue_type=req.params.issue_type
        var issue_to=req.params.issue_to
      if(req.cookies.role != 'ADMIN') user_condition = `and a.created_by = '${user}' `;
      if(issue_type=='Staff'){
            var qury=`select date_format(issue_date,'%d/%m/%Y')as issue_date,issue_date as r_date,
                item_name,category_name, concat('',issue_quantity,' ',unit)as quantity,
                concat(first_name,' ',middle_name,' ',last_name) as staff_name,
                issue_to, purpose 
                from issue_goods a
                join inventory_item_master b on a.issue_item_id = b.item_id
                join inventory_category_master c on a.issue_category_id = c.category_id
                left join unit_master d on a.issue_unit = d.unit_id
                left join employee e on a.staff_id = e.emp_id
                where a.issue_type ='${issue_type}'
                 ${user_condition}
                and issue_date between '${start_date}' and '${end_date}'
                and staff_id =${issue_to}
                order by r_date desc`;
      }else{
          var qury=`select date_format(issue_date,'%d/%m/%Y')as issue_date,issue_date as r_date,
                item_name,category_name, concat('',issue_quantity,' ',unit)as quantity,
                issue_to, purpose 
                from issue_goods a
                join inventory_item_master b on a.issue_item_id = b.item_id
                join inventory_category_master c on a.issue_category_id = c.category_id
                left join unit_master d on a.issue_unit = d.unit_id
                where a.issue_type ='${issue_type}'
                ${user_condition}
                and issue_date between '${start_date}' and '${end_date}'
                and issue_to ='${issue_to}'
                order by r_date desc`;
          }        


          connection.query(qury,function(err,result){
            console.log(qury)
          if(err){
               console.log("Error reading data : %s ",err );
                data.status = 'e';
          }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.inventoryPersonWiseIssuedGoodsReports = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

 // read category wise item

router.get('/read_inventory_item/:category_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var category_id=req.params.category_id
          
              var qury=`select distinct item_id , item_name  
              from inventory_item_master
              where category_id=${category_id}
              order by item_name asc  `;
     
          connection.query(qury,function(err,result){
          if(err){
              console.log("Error reading data : %s ",err );
               data.status = 'e'; 
          }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.inventoryItems = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});
// item wise issued goods

router.get('/read_inventory_item_wise_issued_goods_report/:category_id/:item_id/:start_date/:end_date', function(req, res, next) {

  req.getConnection(function(err,connection){
       
        var data = {}
        var user_condition="";
        var user=req.cookies.user
        var role=req.cookies.role
        var start_date=req.params.start_date
        var end_date=req.params.end_date
        var category_id=req.params.category_id
        var item_id=req.params.item_id
        var condtion = "";
          if(item_id =="-1") condtion =` and a.issue_item_id =${item_id}`;
          if(req.cookies.role != 'ADMIN') user_condition = `and a.created_by = '${user}' `;
          
     var qury=`select date_format(issue_date,'%d/%m/%Y')as issue_date,issue_date as r_date,
                item_name,category_name, concat('',issue_quantity,' ',unit)as quantity,
                IF(issue_type='Staff', concat(first_name,' ',middle_name,' ',last_name), issue_to) as staff_name,
                issue_to, purpose 
                from issue_goods a
                join inventory_item_master b on a.issue_item_id = b.item_id
                join inventory_category_master c on a.issue_category_id = c.category_id
                left join unit_master d on a.issue_unit = d.unit_id
                left join employee e on a.staff_id = e.emp_id
                where a.issue_category_id =${category_id}
                ${condtion}  ${user_condition}
                and issue_date between  '${start_date}' and  '${end_date}'
                order by r_date desc`;
          connection.query(qury,function(err,result){
            console.log(qury)
          if(err){
               console.log("Error reading data : %s ",err );
                data.status = 'e';
          }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.inventoryItemWiseIssuedGoodsReports = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });
});  

// Sale goods report

router.get('/read_inventory_sale_goods_report/:start_date/:end_date', function(req, res, next) {

  req.getConnection(function(err,connection){
       
        var data = {}
        var user_condition="";
        var user=req.cookies.user
        var role=req.cookies.role
        var start_date=req.params.start_date
        var end_date=req.params.end_date

        if(req.cookies.role != 'ADMIN') user_condition = ` and a.created_by = '${user}' `;
          
     var qury=`select date_format(sale_date,'%d/%m/%Y')as sale_date, sale_date as r_date,
              item_name, category_name, concat(sale_quantity,' ',sale_unit) as quantity,
              sale_rate, (sale_quantity*sale_rate)as amount, sale_to 
              from sale_goods a
              join inventory_item_master b on a.sale_item_id = b.item_id
              join inventory_category_master c on a.sale_category_id = c.category_id
              where sale_date between '${start_date}' and  '${end_date}'
               ${user_condition}
               order by r_date desc`;
          connection.query(qury,function(err,result){
            console.log(qury)
          if(err){
               console.log("Error reading data : %s ",err );
                data.status = 'e';
          }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.inventorySaleGoodsReports = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });
});  

// Sale goods report

router.get('/read_inventory_return_goods_report/:start_date/:end_date', function(req, res, next) {

  req.getConnection(function(err,connection){
       
        var data = {}
        var user_condition="";
        var user=req.cookies.user
        var role=req.cookies.role
        var start_date=req.params.start_date
        var end_date=req.params.end_date

    if(req.cookies.role != 'ADMIN') user_condition = ` and a.created_by = '${user}' `;
          
     var qury=`select date_format(return_date,'%d/%m/%Y')as return_date, return_date as r_date,
              item_name, category_name, concat(return_quantity,' ',unit) as quantity,
              return_to, return_remarks, date_format(issue_date,'%d/%m/%Y')as issue_date 
              from return_goods a
              left join issue_goods b on a.issue_id = b.issue_id
              join inventory_item_master c on b.issue_item_id = c.item_id
              join inventory_category_master d on b.issue_category_id = d.category_id
              left join unit_master e on b.issue_unit = e.unit_id
              where return_date between '${start_date}' and  '${end_date}'
               ${user_condition}
               order by r_date desc`;
          connection.query(qury,function(err,result){
            console.log(qury)
          if(err){
               console.log("Error reading data : %s ",err );
                data.status = 'e';
          }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.inventoryReturnGoodsReports = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });
});  

module.exports = router;
 