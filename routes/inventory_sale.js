var express = require('express');
var router = express.Router();

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

//read AVialble Quantity

/* Read stock Item listing. */
router.get('/read_qunatity/:id', function(req, res, next) {
    console.log("inside available quatit")
  req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) { 
        if (err) { throw err; }
        var data = {}
        var user='';
        var session_id=req.cookies.session_id
        var item_id=req.params.id
        var start_date=''
        var end_date=''
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
       

       //  console.log(start_date) 

       
      //  var user=req.cookies.session_id['user']
       /* var condition = "";
        if(category_id !=-1){
          condition = `where a.category_id = ${category_id}`;
         }
        var user_condition = "";*/
        //if(session_id['role'] != 'ADMINISTRATOR') user_condition =`and a.created_by = ${user}`;
       // and received_date between :dtf and :dto
        var qry = `select a.item_id, total_received, total_issued, total_sale, unit, a.unit_id, a.rack_id
              from
              (select item_id, c.unit_id,c.rack_id, sum(quantity) as total_received, unit             
              from received_goods c  
              join unit_master d on c.unit_id=d.unit_id
              where item_id = ${item_id}
              and c.received_date between '${start_date}' and '${end_date}'
              group by item_id) a
              left join
              (select issue_item_id as item_id, sum(issue_quantity) as total_issued
              from issue_goods 
              where issue_item_id =  ${item_id}
              and issue_date between '${start_date}' and '${end_date}'
              group by issue_item_id) b
              on a.item_id = b.item_id
              left join
              (select sale_item_id as item_id, sum(sale_quantity) as total_sale 
              from sale_goods 
              where sale_item_id =  ${item_id} 
              and sale_date between '${start_date}' and '${end_date}'
              group by sale_item_id) c
              on a.item_id = c.item_id`; 
        //  console.log(qry)  
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
            data.availableItems = result;
            console.log('success!');
            console.log(data);
            res.send(JSON.stringify(data))
          });
     
     });
    })
  })   
  });

});

/* Read stock Item listing. */
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
         console.log(end_date) 

       
      //  var user=req.cookies.session_id['user']
        var condition = "";
        if(category_id !=-1){
          condition = ` a.sale_category_id = ${category_id}`;
         }
        var user_condition = "";
        //if(session_id['role'] != 'ADMINISTRATOR') user_condition =`and a.created_by = ${user}`;
       // and received_date between :dtf and :dto
        var qry = `select sale_id, sale_item_id as item_id, sale_category_id as category_id, sale_sub_category_id as sub_category_id,
                date_format(sale_date,'%d/%m/%Y') as sa_date, date_format(sale_date,'%Y-%m-%d') as sale_date, sale_date as s_date,
                item_name,category_name, sale_quantity, sale_unit, concat(sale_quantity,' ',sale_unit) as quantity,
                sale_rate,(sale_quantity*sale_rate) as amount, sale_to 
                from sale_goods a
                join inventory_item_master b on a.sale_item_id = b.item_id
                join inventory_category_master c on a.sale_category_id = c.category_id
                where ${condition} ${user_condition} 
                 and sale_date between '${start_date}' and '${end_date}' 
                 order by s_date desc`; 
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
            data.inventorySales = result;
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
          sale_date : input.sale_date,
          sale_category_id : input.category_id,
          sale_sub_category_id : input.sub_category_id,
          sale_item_id : input.item_id,
          sale_to : input.sale_to,
          sale_quantity : input.sale_quantity,
          sale_unit : input.unit_id,
          sale_rate : input.rate,
          creation_date : formatted,
          created_by : req.cookies.role,
          modified_by : req.cookies.role,
          modification_date : formatted,
        };
        
        var query = connection.query("INSERT INTO sale_goods set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting Sale Goods : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.sale_id = rows.insertId;
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
          sale_date : input.sale_date,
          sale_category_id : input.category_id,
          sale_sub_category_id : input.sub_category_id,
          sale_item_id : input.item_id,
          sale_to : input.sale_to,
          sale_quantity : input.sale_quantity,
          sale_unit : input.unit_id,
          sale_rate : input.rate,
          modified_by : req.cookies.role,
          modification_date : formatted,
        };
        
        var query = connection.query("UPDATE sale_goods set ? WHERE sale_id = ?",[values,id], function(err, rows)
        {
  
          if(err){
           console.log("Error inserting item : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.sale_id = id;
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
        console.log("inside Delete")
        var query = connection.query("DELETE from sale_goods WHERE sale_id = ?",[id], function(err, rows)
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

module.exports = router;
