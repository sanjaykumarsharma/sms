var express = require('express');
var router = express.Router();


/* Read Session listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var session_id = req.cookies.session_id;
     var qry = `select a.fee_plan_id,fee_plan_name,standard,a.session_id
                  from fee_plan_master a
                  LEFT JOIN fee_plan_standard_map b on a.fee_plan_id = b.fee_plan_id
                  LEFT JOIN standard_master c on b.standard_id = c.standard_id
                  JOIN session_master d on (a.session_id = d.session_id and d.session_id=${session_id})
                  order by 1`; 
      
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading feePlans : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
           // data.feePlans = result;
           var plans = [];
            var prev_fee_plan_id = "";
            var prev_fee_plan_name = "";
            var standards = "";
            var i=0;
            var error = 1;
            while(result.length > i){
              error = 0;
               session= result[i].session_id;
              if(result[i].fee_plan_id != prev_fee_plan_id){
                if(prev_fee_plan_id != ""){
                  obj = {};
                  obj.fee_plan_id = prev_fee_plan_id;
                  obj.fee_plan_name = prev_fee_plan_name;
                  obj.standard = standards;
                  plans.push(obj);
                }          
                prev_fee_plan_id = result[i].fee_plan_id;
                prev_fee_plan_name = result[i].fee_plan_name;
                standards = result[i].standard;
              }else{
                standards = standards + "  , " + result[i].standard;
              } 
              i++
            }
          if(error == 0){
            obj = {};
            obj.fee_plan_id = prev_fee_plan_id;
            obj.fee_plan_name = prev_fee_plan_name;
            obj.standard = standards;
            obj.session_id=session;
            plans.push(obj);
          }                                                                           
            data.feePlans = plans;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});
//======== read Fee Slip for Edit ==========
router.get('/readSlipEdit/:id', function(req, res, next) {
  var fee_slip_id = req.params.id;
  console.log("tester")
  req.getConnection(function(err,connection){
       
     var data = {}
     var qry =`select a.head_id, head, coalesce(amount,0) as head_amount
               from fee_head_master a
               left join  fee_slip_details b on a.head_id= b.head_id
               and b.fee_slip_id=?
               order by 1`;
    

     connection.query(qry,[fee_slip_id],function(err,result)     {
        console.log("calling edit read")    
        if(err){
           console.log("Error reading heads : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.feeSlipEditHeads = result;
           //connection.end()
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});





// read Fee Slip Head Detail
router.get('/readFeeSlips/:id', function(req, res, next) {
  var plan_id = req.params.id;
  req.getConnection(function(err,connection){
       
     var data = {}
     qry =`select a.fee_slip_id, fee_slip_name, head, b.amount, total_amount, date_format(last_date,'%Y-%m-%d')as last_date
                  from fee_slip a
                  LEFT JOIN fee_slip_details b on a.fee_slip_id = b.fee_slip_id 
                  LEFT JOIN fee_head_master c  on b.head_id=c.head_id
                  LEFT JOIN fee_plan_master d on a.fee_plan_id = d.fee_plan_id 
                  where a.fee_plan_id = ?
                  order by a.fee_slip_id, b.head_id`;
    

     connection.query(qry,[plan_id],function(err,result)     {
            
        if(err){
           console.log("Error reading fee Slip Heads : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
           // data.feePlans = result;
          var head = []
          var error = 1;
          var prev_slip_name="";
          var prev_sub_total = 0;
          var grand_total = 0;
        
        for(var i=0; i<result.length; i++){
          
        var error = 0;
        if(result[i].fee_slip_name != prev_slip_name){
          if(prev_slip_name != ""){
            obj = {};
            obj.head = "Sub Total";
            obj.amount = prev_sub_total;
            obj.fee_slip_id = '';
            obj.last_date = '';
            head.push(obj);
          }
          obj = {};
          obj.head = "Fee Slip: " + result[i].fee_slip_name;
          obj.amount = "";
          obj.fee_slip_id = result[i].fee_slip_id;
          obj.last_date = result[i].last_date;
          head.push(obj);
          prev_slip_name = result[i].fee_slip_name;
          prev_sub_total = result[i].total_amount;
          grand_total = Number(grand_total) + Number(prev_sub_total);
        }
        obj = {};
        obj.head = result[i].head;
        obj.amount = result[i].amount;
        obj.fee_slip_id = '';
        obj.last_date = '';
        head.push(obj);
      }
      //add the sub total for the last fee slip
      if(error==0){
      obj = {};
      obj.head = "Sub Total";
      obj.amount = Number(prev_sub_total);
      obj.fee_slip_id = '';
      obj.last_date = '';
      head.push(obj);
      
      //add grand total
      obj = {};
      obj.head = "Grand Total";
      obj.amount = grand_total;
      obj.fee_slip_id = '';
      obj.last_date = '';
      head.push(obj);
    } 

      console.log("head length =" + head.length)
            data.feeSlipHeads = head;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/readStandards', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select standard, standard_id 
                from standard_master 
                order by standard_order`; 

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading standard : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.standards = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});
/*======= Map Head with Fee slip and plan ===*/
router.post('/addHeadAmount', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  console.log("input data");
  //console.log(input)
   
  var session_id = req.cookies.session_id;
  var feeHeads = input.feeHeads

  var val = {
            fee_plan_id : input.fee_plan_id,
            fee_slip_name : input.fee_slip_name,
            last_date : input.last_date,
            total_amount : input.total_amount,
            creation_date : formatted,
            modified_by : req.cookies.role,
        };
  var data = []

  req.getConnection(function(err,connection){

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query('INSERT INTO fee_slip set ?', [val], function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        }

        var log = results.insertId;
        var headDetail = [];

        for(i=0;i<feeHeads.length;i++){
             var obj= []
              obj.push(log)
              obj.push(feeHeads[i].head_id)
              obj.push(feeHeads[i].head_amount)
              obj.push(formatted)
              obj.push(req.cookies.role)
              headDetail.push(obj)
          };

        var sql = `INSERT INTO 
                  fee_slip_details (fee_slip_id, head_id, amount, creation_date, modified_by)
                  VALUES ?`;

        connection.query(sql, [headDetail], function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                throw err;
              });
            }
            data.status = 's';
            console.log('success!');
            console.log(data);
            res.send(JSON.stringify(data))
          });
        });

      });
    });  
   
  });        

  console.log('res')


});


/* Add Event listing. */
router.post('/add', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  console.log("input data");
  //console.log(input)
   
  var session_id = req.cookies.session_id;
  var standards = input.standards

  var val = {
            fee_plan_name : input.fee_plan_name,
            fee_plan_description : input.fee_plan_description,
            session_id : session_id,
            creation_date : formatted,
            modified_by : req.cookies.role,
        };
  var data = []

  req.getConnection(function(err,connection){

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query('INSERT INTO fee_plan_master set ?', [val], function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        }

        var log = results.insertId;
        var standardValues = [];

        for(i=0;i<standards.length;i++){
             var obj= []
              obj.push(log)
              obj.push(standards[i].standard_id)
              obj.push(session_id)
              obj.push(formatted)
              obj.push(req.cookies.role)
              standardValues.push(obj)
          };

        var sql = `INSERT INTO 
                  fee_plan_standard_map (fee_plan_id, standard_id, session_id, creation_date, modified_by)
                  VALUES ?`;

        connection.query(sql, [standardValues], function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                throw err;
              });
            }
            data.status = 's';
            console.log('success!');
            console.log(data);
            res.send(JSON.stringify(data))
          });
        });

      });
    });  
   
  });        

  console.log('res')


});


/* Edit Event listing. */
router.post('/edit/:head_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var head_id = input.head_id;

  req.getConnection(function(err,connection){
        var data = {}

        var values = {
            head    : input.head,
        };
        
        var query = connection.query("UPDATE fee_head_master set ? WHERE head_id = ?",[values,head_id], function(err, rows)
        {
  
          if(err){
           console.log("Error updating head : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

/*========= Edit Fee Slip ============*/
router.post('/editHeadAmount/:slip_id', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  console.log("input data");
  //console.log(input)
   
  var slip_id = req.params.slip_id;
  var feeHeads = input.feeHeads

  var val = {
            last_date : input.last_date,
            total_amount : input.total_amount,
            creation_date : formatted,
            modified_by : req.cookies.role,
        };
  var data = []

  req.getConnection(function(err,connection){

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
        
        var q =`UPDATE fee_slip set last_date = '${input.last_date}',
                total_amount=${input.total_amount},
                modified_by='${req.cookies.role}' WHERE fee_slip_id = ${req.params.slip_id}`;

        console.log(q)

        connection.query(q, function(err, rows)
        {
        if (err) {
          return connection.rollback(function() {
            throw err;
          });
        }

     var sqlDel = `DELETE from fee_slip_details WHERE fee_slip_id = ?`;

        connection.query(sqlDel, [slip_id], function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
        var headDetail = [];
        for(i=0;i<feeHeads.length;i++){
             var obj= []
              obj.push(slip_id)
              obj.push(feeHeads[i].head_id)
              obj.push(feeHeads[i].head_amount)
              obj.push(formatted)
              obj.push(req.cookies.role)
              headDetail.push(obj)
          };

       var sql = `INSERT INTO fee_slip_details (fee_slip_id, head_id, amount, creation_date, modified_by)
                  VALUES ?`;

        connection.query(sql, [headDetail], function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                throw err;
              });
            }
            data.status = 's';
            console.log('success!');
            console.log(data);
            res.send(JSON.stringify(data))
          });
        });
       });

      });
    });  
   
  });        

  console.log('res')


});

/* Delete Event listing. */
router.get('/delete/:fee_plan_id', function(req, res, next) {
 
  var fee_plan_id = req.params.fee_plan_id;

  req.getConnection(function(err,connection){
        var data = {}
      
        var query = connection.query("DELETE from fee_plan_master WHERE fee_plan_id = ?",[fee_plan_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting plans : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});

//===== Delete Fee Slip=========

router.get('/delete_fee_slip/:fee_slip_id', function(req, res, next) {
 
  var fee_slip_id = req.params.fee_slip_id;

  req.getConnection(function(err,connection){
        var data = {}
      
        var query = connection.query("delete from fee_slip where fee_slip_id = ?",[fee_slip_id], function(err, rows)
        {
  
          if(err){
           console.log("Error deleting fee slip : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              res.send(JSON.stringify(data))
          }
         
          
        });
   });

});


module.exports = router;
