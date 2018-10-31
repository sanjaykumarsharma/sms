var express = require('express');
var router = express.Router();

var pool = require('../db');


/* Read Session listing. */
//======== read fee plan by student =====
router.get('/read_fee_plan/:student_id', function(req, res, next) {
    var student_id = req.params.student_id;
    req.getConnection(function(err, connection) {

        var data = {}
        var session_id = req.cookies.session_id;
        var qry = `select fee_plan_name, g.fee_plan_id  
                 from fee_plan_student_map g ,fee_plan_master i
                 where g.fee_plan_id=i.fee_plan_id
                 and  g.student_id=?
                 and  g.session_id=${session_id}`;
            pool.query(qry, [student_id], function(err, result){
            if (err) {
                console.log("Error reading scholarship fee slip : %s ", err);
                data.status = 'e';
            } else {
                // res.render('customers',{page_title:"Customers - Node.js",data:rows});
                data.status = 's';
                data.fee_plans = result;
                //connection.end()
                res.send(JSON.stringify(data))
            }
        });

    });

});
// ============= read transaction ======
router.get('/read_transaction/:student_id', function(req, res, next) {
    var student_id = req.params.student_id;
    req.getConnection(function(err, connection) {

        var data = {}
        var session_id = req.cookies.session_id;
        var qry =`SELECT fee_slip_name, a.receipt_id,b.mode,
                    b.item_no,b.dated,a.fee_slip_id, date_format(receipt_date,'%d/%m/%Y')as receipt_date, amount_due, 
                    fine_recevied, scholorship_amount , c.scholorship_id,d.bank_name
                    FROM fee_received a
                    JOIN fee_received_details b ON (a.receipt_id = b.receipt_id and a.session_id = ${session_id})
                    JOIN fee_slip e ON a.fee_slip_id = e.fee_slip_id
                    LEFT JOIN fee_scholorship c ON ( a.student_id = c.student_id
                    AND a.fee_slip_id = c.fee_slip_id ) 
                    LEFT JOIN bank_account_master d on b.bank_id=d.bank_account_no
                    WHERE a.student_id = ?
                    order by a.fee_slip_id`;


        pool.query(qry, [student_id], function(err, result) {

            if (err) {
                console.log("Error reading transactions : %s ", err);
                data.status = 'e';

            } else {
                // res.render('customers',{page_title:"Customers - Node.js",data:rows});
                data.status = 's';
                data.transactions = result;
                //connection.end()

                res.send(JSON.stringify(data))
            }

        });

    });

});
//====== students ======
router.get('/read_student/:enroll', function(req, res, next) {
    var enroll = req.params.enroll;
    req.getConnection(function(err, connection) {

        var data = {}
        var session_id = req.cookies.session_id;
        var qry =`select  e.session_id, a.student_id, a.withdraw, a.last_fee_slip_id, d.standard_id, 
                  concat(first_name,' ',middle_name,' ',last_name) as student_name,
                  concat(standard,' ',section)as standard,
                  f_name, m_name  
                  from student_master a 
                  JOIN  student_current_standing b on (a.student_id= b.student_id and a.current_session_id= ${session_id})
                  JOIN  section_master c  on b.section_id= c.section_id
                  JOIN  standard_master d  on c.standard_id= d.standard_id
                  JOIN  session_master e  on b.session_id=e.session_id
                  JOIN  parent_master f on  (a.student_id=f.student_id and f.current_session_id= ${session_id})
                  where enroll_number=?            
                  and   b.session_id=${session_id}`;


        pool.query(qry, [enroll], function(err, result) {

            if (err) {
                console.log("Error reading students : %s ", err);
                data.status = 'e';

            } else {
                // res.render('customers',{page_title:"Customers - Node.js",data:rows});
                data.status = 's';
                data.students = result;
                //connection.end()

                res.send(JSON.stringify(data))
            }

        });

    });

});
//======== read fee slip by student =====
router.get('/read_fee_slip/:student_id', function(req, res, next) {
    var student_id = req.params.student_id;
    req.getConnection(function(err, connection) {

        var data = {}
        var session_id = req.cookies.session_id;
        var qry = `select fee_slip_name, a.fee_slip_id, a.fee_plan_id,
                    date_format(last_date, '%d/%m/%Y') as last_date, total_amount as amount, scholorship_amount
                    from fee_slip a
                    LEFT JOIN fee_plan_student_map c on  a.fee_plan_id = c.fee_plan_id                     
                    LEFT JOIN fee_scholorship f on (a.fee_slip_id = f.fee_slip_id and c.student_id = f.student_id)
                    JOIN session_master g on (g.session_id=c.session_id)
                    where  c.student_id = ${student_id}
                    and g.session_id=${session_id}
                    and a.fee_slip_id not in (select fee_slip_id from fee_received 
                    where student_id = ?
                    and session_id=${session_id})
                    order by 2`;
            pool.query(qry, [student_id], function(err, result){
            if (err) {
                console.log("Error reading scholarship fee slip : %s ", err);
                data.status = 'e';
            } else {
                // res.render('customers',{page_title:"Customers - Node.js",data:rows});
                data.status = 's';
                data.fee_slips = result;
                //connection.end()
                res.send(JSON.stringify(data))
            }
        });

    });

});

//========= read fine =====
router.get('/', function(req, res, next) {

  var data = {}
   var session_id = req.cookies.session_id;  
  var qry = `select fine_type,fine_grace_preiod, fine_amount
                    from fine_master
                    where session_id=${session_id}
                    order by 1`; 

  pool.query(qry,function(err,result)     {
      
  if(err){
     console.log("Error reading fines : %s ",err );
     data.status = 'e';

  }else{
    // res.render('customers',{page_title:"Customers - Node.js",data:rows});
      data.status = 's';
      data.fines = result;
     //connection.end()

      res.send(JSON.stringify(data))
  }

  });

});

/* Add Event listing. */
router.post('/add', function(req, res, next) {

    var input = JSON.parse(JSON.stringify(req.body));

    var now = new Date();
    var jsonDate = now.toJSON();
    var formatted = new Date(jsonDate);
    var modified_by = req.cookies.role;
    var session_id = req.cookies.session_id;
    var slips = input.feeSlips;

      var val = {
            mode : input.mode,
            item_no :input.item_no, 
            drawn_on :input.drawn_on, 
            amounting_to :input.amounting_to,
            dated : input.dated,
            bank_id : input.bank_id, 
            receipt_date : input.receipt_date,
            tuition_fee_only : input.tuition_fee_only, 
            remarks : input.remarks, 
            session_id :session_id, 
            creation_date : formatted,
            modified_by : req.cookies.role,
        };
  var data = {}

  req.getConnection(function(err,connection){

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query('INSERT INTO fee_received_details set ?', [val], function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        }

        var receipt_id = results.insertId;
        var feeSlips = [];

        for(i=0;i<slips.length;i++){
             var obj= []
              obj.push(receipt_id)
              obj.push(input.fee_plan_id)
              obj.push(slips[i].fee_slip_id)
              obj.push(input.student_id)
              obj.push(slips[i].a_due)
              obj.push(input.fine_due)
              obj.push(input.fine_recevied)
              obj.push(input.fine_adjusted)
              obj.push(session_id)
              obj.push(formatted)
              obj.push(req.cookies.role)
              feeSlips.push(obj)
          };

        var sql = `INSERT INTO 
                  fee_received (receipt_id, fee_plan_id, fee_slip_id, student_id, amount_due, 
                  fine_due, fine_recevied, fine_adjusted, session_id, creation_date, modified_by)
                  VALUES ?`;

        connection.query(sql, [feeSlips], function (error, results, fields) {
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
            res.send(data)

          });

        });

      });
    });  
   
  });      
 
});


/* Edit Event listing. */
router.post('/edit/:bank_ac', function(req, res, next) {

    var input = JSON.parse(JSON.stringify(req.body));
    var bank_ac = input.bank_ac;

    req.getConnection(function(err, connection) {
        var data = {}

        var values = {
            bank_account_no: input.bank_account_no,
            bank_name: input.bank_name,
            branch: input.branch,
        };

        var query = connection.query("UPDATE bank_account_master set ? WHERE bank_account_no = ?", [values, bank_ac], function(err, rows) {

            if (err) {
                console.log("Error updating bank : %s ", err);
                data.status = 'e';

            } else {
                data.status = 's';
                data.id = rows.insertId;
                res.send(JSON.stringify(data))
            }


        });
    });

});

/* Delete Event listing. */
router.get('/delete/:id', function(req, res, next) {

    var receipt_id = req.params.id

  req.getConnection(function(err,connection){

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query('delete from fee_received where receipt_id = ?', [receipt_id], function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        }


        var sql = `delete from fee_received_details where receipt_id = ?`;

        connection.query(sql, [receipt_id], function (error, results, fields) {
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
            res.send(data)

          });

        });

      });
    });  
   
  });
    

});


module.exports = router;