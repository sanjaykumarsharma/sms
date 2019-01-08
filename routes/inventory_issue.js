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
       

      console.log(start_date) 
      console.log("data") 
      console.log(end_date) 

       
      //  var user=req.cookies.session_id['user']
        /*var condition = "";
        if(category_id !=-1){
          condition = `where a.category_id = ${category_id}`;
         }
        var user_condition = "";*/
        //if(session_id['role'] != 'ADMINISTRATOR') user_condition =`and a.created_by = ${user}`;
       // and received_date between :dtf and :dto
        var qry = `select a.item_id, total_received, total_issued, total_sale, unit, a.unit_id
              from
              (select item_id, c.unit_id, sum(quantity) as total_received, unit             
              from received_goods c  
              join unit_master d on c.unit_id=d.unit_id
              where item_id = ${item_id}
              and c.received_date between '${start_date}' and '${end_date}'
              group by item_id,c.unit_id) a
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
router.get('/:id/:type', function(req, res, next) {

  req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) { 
        if (err) { throw err; }
        var data = {}
        var user='';
        var session_id=req.cookies.session_id
        var user=req.cookies.user
        var category_id=req.params.id
        var issue_type=req.params.type
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

       
      //  var user=req.cookies.session_id['user']
        var condition = "";
        if(category_id !=-1){
          condition = `and a.issue_category_id = ${category_id}`;
         }
        var user_condition = "";
        if(req.cookies.role != 'ADMIN') user_condition =`and a.created_by = '${user}' `;
       // and received_date between :dtf and :dto
        var qry = `select issue_id,  c.category_id, a.issue_sub_category_id as sub_category_id, return_type,
                a.issue_item_id as item_id, date_format(issue_date,'%d/%m/%Y') as issue_date, date_format(issue_date,'%Y-%m-%d') as iss_date,
                item_name,category_name, concat(first_name,' ',middle_name,' ',last_name ) as staff_name,
                issue_to, issue_type, issue_quantity, unit, concat(issue_quantity,' ',unit) as i_quantity, purpose,staff_id 
                from issue_goods a
                join inventory_item_master b on a.issue_item_id = b.item_id
                join inventory_category_master c on a.issue_category_id = c.category_id
                join unit_master e on a.issue_unit = e.unit_id
                left join employee d on a.staff_id = d.emp_id
                where  a.issue_type ='${issue_type}' 
                 ${condition} ${user_condition} 
                 and issue_date between '${start_date}' and '${end_date}' 
                 order by iss_date desc`; 
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
            data.inventoryIssues = result;
            console.log('success!');
            console.log(data);
            res.send(JSON.stringify(data))
          });
     
     });
    })
  })   
  });

});

// read Returnable Item

/* Read stock Item listing. */
router.get('/read_returnable/:id/:type', function(req, res, next) {

  req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) { 
        if (err) { throw err; }
        var data = {}
        var user='';
        var session_id=req.cookies.session_id
        //var category_id=req.params.id
        var issue_type=req.params.type
        var start_date=''
        var end_date=''
        //console.log(category_id)
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
        var category_id=-1;
        if(category_id !=-1){
          condition = `and a.issue_category_id = ${category_id}`;
         }
        var user_condition = "";
        if(req.cookies.role != 'ADMIN') user_condition =`and a.created_by = '${user}' `;
       // and received_date between :dtf and :dto
        var qry = `select issue_id, date_format(issue_date,'%d/%m/%Y') as issued_date, issue_date as r_date,
                item_name,category_name, concat(first_name,' ',middle_name,' ',last_name ) as staff_name,
                issue_to, concat(issue_quantity,' ',unit) as issued_quantity,a.issue_sub_category_id,
                concat(available_quantity,' ',unit) as available_qty, purpose,
                date_format(issue_date,'%Y-/%m-/%d') as issue_date, issue_category_id, issue_unit,
                issue_item_id, issue_type, issue_rack_id, rack_name,
                return_type, staff_id, issue_to, issue_quantity , available_quantity
                from issue_goods a
                join inventory_item_master b on a.issue_item_id = b.item_id
                join inventory_category_master c on a.issue_category_id = c.category_id
                join unit_master e on a.issue_unit = e.unit_id
                left join rack_master f on a.issue_rack_id = f.rack_id
                left join employee d on a.staff_id = d.emp_id
                where a.issue_type = '${issue_type}'
                and return_type='Y'
                and available_quantity>0 
                ${condition} ${user_condition}
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
            data.inventoryReturnableGoods = result;
            console.log('success!');
            console.log(data);
            res.send(JSON.stringify(data))
          });
     
     });
    })
  })   
  });

});


/* Add Inventory Returnable Goods. */
router.post('/add_inventory_return_goods', function(req, res, next) {
    console.log(req)
    var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) { 
        if (err) { throw err; }
        var data = {}
        var now = new Date();
        var jsonDate = now.toJSON();
        var formatted = new Date(jsonDate);
        var available_quantity='';
       // console.log(input.obj.issue_id)
        var issue_id=input.obj.issue_id;
        var issued_quantity='';
        var balance='';
        

         var values = {
          issue_id : input.obj.issue_id,
          return_date : input.return_date,
          return_to : input.return_to,
          return_quantity : input.return_quantity,
          return_remarks : input.remark,
          creation_date : formatted,
          created_by : req.cookies.role,
          modified_by : req.cookies.role,
          modification_date : formatted,
        };
          
         var values1 = {
          received_date : input.return_date,
          item_id : input.obj.item_id,
          category_id : input.obj.category_id,
          sub_category_id : input.obj.sub_category_id,
          quantity : input.return_quantity,
          unit_id : input.obj.unit,
          rate : 0,
          received_from : input.return_to,
          rack_id : input.obj.rack_id,
          remark : input.remark,
          creation_date : formatted,
          created_by : req.cookies.role,
          modified_by : req.cookies.role,
        };
         var qury=`select available_quantity from issue_goods where issue_id=${issue_id}`;
          connection.query(qury,function(err,result){
          if(err){
              return connection.rollback(function() {
               throw err;
              
             });
          }
            
          available_quantity=result[0].available_quantity
          issued_quantity=input.return_quantity
          balance = Number(available_quantity) - Number(issued_quantity)

              var qury1=`update issue_goods set 
                         available_quantity=${balance},
                         modification_date=${formatted},
                         modified_by='${modified_by}'
                         where issue_id=${issue_id}`;
                connection.query(qury1,function(err,result){
                if(err){
                    return connection.rollback(function() {
                     throw err;
                    
                   });
                }
              })  ;
              connection.query("INSERT INTO return_goods set ? ",values, function(err, rows){
              
                    if(err){
                     return connection.rollback(function() {
                        throw err;
                         
                       });

                   }
               }) ;   
               connection.query("INSERT INTO received_goods set ? ",values1, function(err, rows){
                      if (err) {
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
                      //  data.inventoryReturnableGoods = result;
                        console.log('success!');
                        console.log(data);
                        res.send(JSON.stringify(data))
                   }) ;    
             //}) ;
          });
      
     }); //first query end
});// being transaction
}); // ist connection 
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
          issue_date : input.issue_date,
          issue_category_id : input.category_id,
          issue_sub_category_id : input.sub_category_id,
          issue_item_id : input.item_id,
          return_type : input.return_type,
          issue_type : input.issue_type,
          issue_to : input.issue_to,
          staff_id : input.staff_id,
          available_quantity : input.available_quantity,
          issue_quantity : input.issue_quantity,
          issue_unit : input.unit_id,
          purpose : input.purpose,
          issue_rack_id : input.rack_id,
          creation_date : formatted,
          created_by : req.cookies.role,
          modified_by : req.cookies.role,
          modification_date : formatted,
        };
        
        var query = connection.query("INSERT INTO issue_goods set ? ",values, function(err, rows)
        {
  
          if(err){
           console.log("Error inserting Goods : %s ",err );
           data.status = 'e';

	       }else{
	            data.status = 's';
	            data.issue_id = rows.insertId;
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
          issue_date : input.issue_date,
          issue_category_id : input.category_id,
          issue_sub_category_id : input.sub_category_id,
          issue_item_id : input.item_id,
          return_type : input.return_type,
          issue_type : input.issue_type,
          issue_to : input.issue_to,
          staff_id : input.staff_id,
          available_quantity : input.available_quantity,
          issue_quantity : input.issue_quantity,
          issue_unit : input.unit_id,
          purpose : input.purpose,
          issue_rack_id : input.rack_id,
          modified_by : req.cookies.role,
          modification_date : formatted,
        };
        
        var query = connection.query("UPDATE issue_goods set ? WHERE issue_id = ?",[values,id], function(err, rows)
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
        console.log("inside Delete")
        var query = connection.query("DELETE from issue_goods WHERE issue_id = ?",[id], function(err, rows)
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
