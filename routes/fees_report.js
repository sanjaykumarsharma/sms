var express = require('express');
var router = express.Router();

//===========read_head_wise_fees==============
router.get('/read_head_wise_fees/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
       
     var data = {}
     var condition = "";
     var session_id = req.cookies.session_id
     
  req.getConnection(function(err,connection){
    connection.beginTransaction(function(err) {

      var stdData = []
    
      if (err) { throw err; }   
    var qry =`SELECT head, sum(coalesce(c.amount,0)) as bank FROM 
        fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id 
        and b.receipt_date between '${start_date}' and '${end_date}' and mode != 'Cash')
        JOIN fee_slip_details c on a.fee_slip_id = c.fee_slip_id 
        JOIN fee_head_master d on (d.head_id = c.head_id)   
        where b.session_id=${session_id}
        and b.tuition_fee_only != 'Y'
        group by head
        UNION 
        select 'Fine Received' as head , sum(coalesce(a.fine_recevied, 0)) as bank from
        fee_received a, fee_received_details b
        where a.receipt_id = b.receipt_id
        and b.receipt_date between '${start_date}' and '${end_date}'
        and b.mode != 'Cash'            
        and b.session_id=${session_id}
        UNION
        SELECT 'Tuition Fees' as head, sum(coalesce(b.amounting_to,0)) as cash FROM
        fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id 
        and b.receipt_date between '${start_date}' and '${end_date}' and mode != 'Cash')
        where b.session_id=${session_id}
        and b.tuition_fee_only ='Y'
        UNION 
        select 'Scholarship' as head , sum(coalesce(c.scholorship_amount, 0)*-1) as bank from
        fee_received a, fee_received_details b, fee_scholorship c
        where a.receipt_id = b.receipt_id
        and b.receipt_date between '${start_date}' and '${end_date}'
        and a.fee_slip_id = c.fee_slip_id
        and a.student_id = c.student_id
        and b.mode != 'Cash'         
        and b.session_id=${session_id}
        order by 1`;

  //========== query 2====================

    var qry2 =`SELECT head, sum(coalesce(c.amount,0)) as cash FROM
        fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id 
        and b.receipt_date between '${start_date}' and '${end_date}' and mode = 'Cash')
        JOIN fee_slip_details c on a.fee_slip_id = c.fee_slip_id 
        JOIN fee_head_master d on (d.head_id = c.head_id)
        where b.session_id=${session_id}
        and b.tuition_fee_only != 'Y'
        group by head
        UNION 
        select 'Fine Received' as head , sum(coalesce(a.fine_recevied, 0)) as cash from
        fee_received a, fee_received_details b
        where a.receipt_id = b.receipt_id
        and b.receipt_date between '${start_date}' and '${end_date}'
        and b.mode = 'Cash'
        and b.session_id=${session_id}
        UNION 
        SELECT 'Tuition Fees' as head, sum(coalesce(b.amounting_to,0)) as cash FROM
        fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id 
        and b.receipt_date between '${start_date}' and '${end_date}' and mode = 'Cash')
        where b.session_id=${session_id}
        and b.tuition_fee_only ='Y'
        UNION
        select 'Scholarship' as head , sum(coalesce(c.scholorship_amount, 0)*-1) as cash from
        fee_received a, fee_received_details b, fee_scholorship c
        where a.receipt_id = b.receipt_id
        and b.receipt_date between '${start_date}' and '${end_date}'
        and a.fee_slip_id = c.fee_slip_id
        and a.student_id = c.student_id
        and b.mode = 'Cash'
        and b.session_id=${session_id}
        order by 1`;

     connection.query(qry, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }else{
            /*console.log("======result===============")
            console.log(result)*/
            for(var i=0; i<result.length;i++){
              var count = 0;
              var temp = {}
              temp['head'] = result[i].head
              temp['bank'] = result[i].bank != null ? result[i].bank : 0
              temp['cash'] = 0
              temp['total'] = Number(temp['cash']) + Number(temp['bank'])
              
              if(stdData[result[i].head]){
                temp['bank'] = Number(stdData[result[i].head]['bank']) + Number(temp['bank'])
                temp['cash'] = Number(stdData[result[i].head]['cash']) + Number(temp['cash'])
                temp['total'] = Number(stdData[result[i].head]['cash']) + Number(stdData[result[i].head]['bank'])

                stdData.push(temp)
              }else{
                stdData.push(temp)
              }
            }

          }
      //============= qry2========
       connection.query(qry2, function (error, result2) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }else{
            /*console.log("======result2========")
            console.log(result2)*/
            for(var i=0; i<result2.length;i++){
          /*  $error = 0;
            extract($std);*/
            var temp = {}
            temp['head'] = result2[i].head
            temp['cash'] = result2[i].cash != null ? result2[i].cash : 0
            temp['bank'] = 0
            temp['total'] = Number(temp['cash']) + Number(temp['bank'])
            if(stdData[result2[i].head]){
              temp['cash'] = Number(stdData[result2[i].head]['cash']) + Number(result2[i].cash)
              temp['total'] = Number(stdData[result2[i].head]['total']) + Number(result2[i].cash)
              stdData.push(temp)
            }else{
              stdData.push(temp)
            }
          }

          }

            console.log("----------student data------")
            console.log(stdData)
            data.status = 's';
            data.headWiseData = stdData;
            res.send(data)
    })
       
    })// end of qry1

     })
  })
       

});
//============= read head category wise data =========

router.get('/read_head_category_wise_fees/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
       
     var data = {}
     var condition = "";
     var session_id = req.cookies.session_id
     
  req.getConnection(function(err,connection){
    connection.beginTransaction(function(err) {

      var stdData = []
    
      if (err) { throw err; }   
    // query for cash collection by Bank  
    var qry =`SELECT head, sum(coalesce(c.amount,0)) as cash FROM 
        fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id 
        and b.receipt_date between '${start_date}' and '${end_date}' and mode = 'Bank')
        JOIN fee_slip_details c on a.fee_slip_id = c.fee_slip_id 
        JOIN fee_head_master d on (d.head_id = c.head_id)
        where b.session_id=${session_id}
        and b.tuition_fee_only !='Y'
        group by head
        UNION 
        select 'Fine Received' as head , sum(coalesce(a.fine_recevied, 0)) as cash from
        fee_received a, fee_received_details b
        where a.receipt_id = b.receipt_id
        and b.receipt_date between '${start_date}' and '${end_date}'
        and b.mode = 'Bank'
        and b.session_id=${session_id}
        UNION 
        SELECT 'Tuition Fees' as head, sum(coalesce(b.amounting_to,0)) as cash FROM
        fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id 
        and b.receipt_date between '${start_date}' and '${end_date}' and mode = 'Bank')
        where b.session_id=${session_id}
        and b.tuition_fee_only ='Y'
        UNION 
        select 'Scholarship' as head , sum(coalesce(c.scholorship_amount, 0)*-1) as cash from
        fee_received a, fee_received_details b, fee_scholorship c
        where a.receipt_id = b.receipt_id
        and b.receipt_date between '${start_date}' and '${end_date}'
        and a.fee_slip_id = c.fee_slip_id
        and a.student_id = c.student_id
        and b.mode = 'Bank'
        and b.session_id=${session_id}
        order by 1`;

  /// query for cash collection by Cheque
      var qry2 = `SELECT head, sum(coalesce(c.amount,0)) as cash FROM 
        fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id 
        and b.receipt_date between '${start_date}' and '${end_date}' and mode not in ('Cash', 'Bank'))
        JOIN fee_slip_details c on a.fee_slip_id = c.fee_slip_id 
        JOIN fee_head_master d on (d.head_id = c.head_id)
        where b.session_id=${session_id}
        and b.tuition_fee_only !='Y'
        group by head
        UNION 
        select 'Fine Received' as head , sum(coalesce(a.fine_recevied, 0)) as cash from
        fee_received a, fee_received_details b
        where a.receipt_id = b.receipt_id
        and b.receipt_date between '${start_date}' and '${end_date}'
        and b.mode not in ('Cash', 'Bank')
        and b.session_id=${session_id}
        UNION 
        SELECT 'Tuition Fees' as head, sum(coalesce(b.amounting_to,0)) as cash FROM
        fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id 
        and b.receipt_date between '${start_date}' and '${end_date}' and b.mode not in ('Cash', 'Bank'))
        where b.session_id=${session_id}
        and b.tuition_fee_only ='Y'
        UNION 
        select 'Scholarship' as head , sum(coalesce(c.scholorship_amount, 0)*-1) as cash from
        fee_received a, fee_received_details b, fee_scholorship c
        where a.receipt_id = b.receipt_id
        and b.receipt_date between '${start_date}' and '${end_date}'
        and a.fee_slip_id = c.fee_slip_id
        and a.student_id = c.student_id
        and b.mode not in ('Cash', 'Bank','Online')
        and b.session_id=${session_id}
        order by 1`;
//========= cash collection in school =====
    var qry3 = `SELECT head, sum(coalesce(c.amount,0)) as cash FROM
        fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id 
        and b.receipt_date between '${start_date}' and '${end_date}' and mode = 'Cash')
        JOIN fee_slip_details c on a.fee_slip_id = c.fee_slip_id 
        JOIN fee_head_master d on (d.head_id = c.head_id)
        where b.session_id=${session_id}
        and b.tuition_fee_only !='Y'
        group by head
        UNION 
        select 'Fine Received' as head , sum(coalesce(a.fine_recevied, 0)) as cash from
        fee_received a, fee_received_details b
        where a.receipt_id = b.receipt_id
        and b.receipt_date between '${start_date}' and '${end_date}'
        and b.mode = 'Cash'
        and b.session_id=${session_id}
        UNION 
        SELECT 'Tuition Fees' as head, sum(coalesce(b.amounting_to,0)) as cash FROM
        fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id 
        and b.receipt_date between '${start_date}' and '${end_date}' and mode = 'Cash')
        where b.session_id=${session_id}
        and b.tuition_fee_only ='Y'
        UNION 
        select 'Scholarship' as head , sum(coalesce(c.scholorship_amount, 0)*-1) as cash from
        fee_received a, fee_received_details b, fee_scholorship c
        where a.receipt_id = b.receipt_id
        and b.receipt_date between '${start_date}' and '${end_date}'
        and a.fee_slip_id = c.fee_slip_id
        and a.student_id = c.student_id
        and b.mode = 'Cash'
        and b.session_id=${session_id}
        order by 1`;
  //========= online fees collection =====
    var qry4 = `SELECT head, sum(coalesce(c.amount,0)) as cash FROM
        fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id 
        and b.receipt_date between '${start_date}' and '${end_date}' and mode = 'Online')
        JOIN fee_slip_details c on a.fee_slip_id = c.fee_slip_id 
        JOIN fee_head_master d on (d.head_id = c.head_id)
        where b.session_id=${session_id}
        and b.tuition_fee_only !='Y'
        group by head
        UNION 
        select 'Fine Received' as head , sum(coalesce(a.fine_recevied, 0)) as Online from
        fee_received a, fee_received_details b
        where a.receipt_id = b.receipt_id
        and b.receipt_date between '${start_date}' and '${end_date}'
        and b.mode = 'Online'
        and b.session_id=${session_id}
        UNION 
        SELECT 'Tuition Fees' as head, sum(coalesce(b.amounting_to,0)) as Online FROM
        fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id 
        and b.receipt_date between '${start_date}' and '${end_date}' and mode = 'Online')
        where b.session_id=${session_id}
        and b.tuition_fee_only ='Y'
        UNION 
        select 'Scholarship' as head , sum(coalesce(c.scholorship_amount, 0)*-1) as Online from
        fee_received a, fee_received_details b, fee_scholorship c
        where a.receipt_id = b.receipt_id
        and b.receipt_date between '${start_date}' and '${end_date}'
        and a.fee_slip_id = c.fee_slip_id
        and a.student_id = c.student_id
        and b.mode = 'Online'
        and b.session_id=${session_id}
        order by 1`;          
      var stdData = [];
      var slNo=0;
      var subTotal=0;
      var grandTotal=0;
     connection.query(qry3, function (error, result3) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }else{

            /*console.log("======result4========")
            console.log(result4)*/
            slNo=0;
            subTotal=0;
            var temp = {}
            temp['slNo']="";
            temp['head'] = "Head Wise Collection (Online)";
            temp['cash'] = "-----";
            stdData.push(temp)
            for(var i=0; i<result3.length; i++){
              
              temp = {}
              temp['slNo']=++slNo;
              temp['head'] = result3[i].head;
              temp['cash'] = result3[i].cash != null ? result3[i].cash : 0;
              subTotal=Number(subTotal) +  Number(result3[i].cash)
              stdData.push(temp)
            }
             temp = {}
             temp['slNo']="";
             temp['head'] = "Sub Total"
             temp['cash'] = subTotal
             stdData.push(temp)
             grandTotal = Number(grandTotal) + Number(subTotal)
          
          
          }
      //============= qry1========
       connection.query(qry2, function (error, result2) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }else{
            /*console.log("======result2========")
            console.log(result2)*/
            slNo=0;
            subTotal=0;
            var temp = {}
            temp['slNo']="";
            temp['head'] = "Head Wise Collection (By Cheque)";
            temp['cash'] = "-----";
            stdData.push(temp)
              for(var i=0; i<result2.length;i++){
              temp = {}
              temp['slNo']=++slNo;
              temp['head'] = result2[i].head
              temp['cash'] = result2[i].cash != null ? result2[i].cash : 0;
              subTotal= Number(subTotal) +  Number(result2[i].cash)
              stdData.push(temp)
            }
             temp = {}
             temp['slNo']="";
             temp['head'] = "Sub Total";
             temp['cash'] = subTotal;
             stdData.push(temp)
             grandTotal = Number(grandTotal) + Number(subTotal)

          }

        //============= qry3========
       connection.query(qry3, function (error, result3) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }else{
            /*console.log("======result3========")
            console.log(result3)*/
            slNo=0;
            subTotal=0;
            var temp = {}
            temp['slNo']="";
            temp['head'] = "Head Wise Collection (By Cash)";
            temp['cash'] = "-----";
            stdData.push(temp)
            for(var i=0; i<result3.length; i++){
              
              temp = {}
              temp['slNo']=++slNo;
              temp['head'] = result3[i].head;
              temp['cash'] = result3[i].cash != null ? result3[i].cash : 0;
              subTotal=Number(subTotal) +  Number(result3[i].cash)
              stdData.push(temp)
            }
             temp = {}
             temp['slNo']="";
             temp['head'] = "Sub Total"
             temp['cash'] = subTotal
             stdData.push(temp)
             grandTotal = Number(grandTotal) + Number(subTotal)
          }

          ////============= qry4========
       connection.query(qry, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }else{
            /*console.log("======result===============")
            console.log(result)*/
            var slNo=0;
            var subTotal=0;
            var temp = {}
            temp['slNo']="";
            temp['head'] = "Head Wise Collection (In Bank)";
            temp['cash'] = "-----";
            stdData.push(temp)
            for(var i=0; i<result.length; i++){
              
              var temp = {}
              temp['slNo']= ++slNo;
              temp['head'] = result[i].head
              temp['cash'] = result[i].cash != null ? result[i].cash : 0
              subTotal=Number(subTotal) +  Number(result[i].cash)
              stdData.push(temp)
            }
             var temp = {}
             temp['slNo']="";
             temp['head'] = "Sub Total";
             temp['cash'] = subTotal
             stdData.push(temp)
             grandTotal = Number(grandTotal) + Number(subTotal)
             temp = {}
             temp['slNo']="";
             temp['head'] = "Grand Total";
             temp['cash'] = grandTotal
             stdData.push(temp)

          }

           /* console.log("----------student data------")
            console.log(stdData)*/
            data.status = 's';
            data.headCategoryWiseData = stdData;
            res.send(data)
        })// end of qry4    
      })// end of qry3      
    })// end of qry2
       
    })// end of qry

     })
  })
       

});
//======== read un-assigned students ==========

router.get('/read_un_assigned', function(req, res, next) {
  
  req.getConnection(function(err,connection){
       
     var data = {}
     var condition = "";
     var session_id = req.cookies.session_id
     
     var qry = `select enroll_number, concat(first_name,' ',middle_name,' ',last_name) as name,
        f_name, concat(standard,' ',section)as standard 
        from student_master a
        JOIN student_current_standing b on (a.student_id = b.student_id and a.current_session_id = b.session_id)
        JOIN section_master c on b.section_id = c.section_id
        JOIN standard_master f on c.standard_id = f.standard_id
        JOIN parent_master d on (a.student_id = d.student_id and d.current_session_id = a.current_session_id)
        JOIN fee_plan_student_map e on (a.student_id = e.student_id and a.current_session_id = ${session_id})
        where a.student_id not in(select student_id from fee_plan_student_map where session_id=${session_id})
        and (a.withdraw='N' || a.withdraw_session > ${session_id})
        and b.session_id=${session_id}
        order by c.section_id, a.first_name`;

     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.students = result;
            res.send(data)
        }
     
     });
       
  });

});
///========= read session wise plan report =====

router.get('/read_session_scheme/:session_id', function(req, res, next) {
  
  req.getConnection(function(err,connection){
       var ses_id = req.params.session_id
     var data = {}
     var condition = "";
     var session_id = req.cookies.session_id
     
     var qry = `select a.fee_plan_id, session_name,fee_plan_name, 
        count(a.student_id) as total 
        from fee_plan_student_map a
        join fee_plan_master b on a.fee_plan_id = b.fee_plan_id
        join session_master c on a.session_id = c.session_id
        join student_master d on (a.student_id = d.student_id and d.current_session_id=${session_id})
        where a.session_id = ${ses_id}
        and (withdraw='N' || withdraw_session > ${session_id})
        group by fee_plan_id
        order by fee_plan_name`;

     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.schemes = result;

            //======= grand total ====
            var grand_total=0;
            for (var i = result.length - 1; i >= 0; i--) {
               grand_total = Number(grand_total)+Number(result[i].total);
             } 

            data.grand_total = grand_total; 
            res.send(data)
        }
     
     });
       
  });

});
//======== read issued letter ====================

router.get('/read_issued_fees_letter/:month_id', function(req, res, next) {
  
  req.getConnection(function(err,connection){
       var month_id = req.params.month_id
       var from_date = ''
       var to_date = ''
     var data = {}
     var condition = "";
     var session_id = req.cookies.session_id
     var qry_date =`select date_format(session_start_date, '%Y') as year from session_master where session_id = ${session_id}`;
     connection.query(qry_date, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
           
            var session_year = result[0].year;
            if(month_id<4){
              session_year++;
            }
             from_date = session_year + "-" + month_id + "-" + "01";
             to_date = session_year + "-" + month_id + "-" + "31"; 
        }
     
     
     
     var qry = `select b.student_id, b.enroll_number, concat(first_name, ' ' ,middle_name, ' ',last_name) as name,letter_key,c.letter_id,
              letter_name, concat(standard,' ',section)as standard, date_format(a.creation_date,'%d/%m/%Y') as issue_date, a.modified_by
              from student_letter a
              LEFT JOIN student_master b on (a.student_id = b.student_id and b.current_session_id =${session_id} )
              LEFT JOIN letter_master c on a.letter_id = c.letter_id
              LEFT JOIN student_current_standing d on (b.student_id = d.student_id and b.current_session_id =${session_id} )
              LEFT JOIN section_master e on d.section_id = e.section_id
              LEFT JOIN standard_master f on e.standard_id = f.standard_id
              where a.creation_date <= '${to_date}'
              and a.creation_date >= '${from_date}'
              and d.session_id= ${session_id}
              order by e.section_id, first_name`;
     
     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
            
            data.assignedStudents = result;
            
        }
     
     });
           data.status = 'e';

        }else{
            data.status = 's';
            data.assignedStudents = result;
            res.send(data)
        }
     
     });
       
  });
 });    

});
//========== read assigned students==========
router.get('/read_assigned_students/:fee_plan_id', function(req, res, next) {
  
  req.getConnection(function(err,connection){
       var fee_plan_id = req.params.fee_plan_id
     var data = {}
     var condition = "";
     var session_id = req.cookies.session_id
     
     var qry = `select enroll_number, concat(first_name,' ' ,middle_name,' ', last_name) as name,
        concat(standard,' ', section) as standard,f.standard_id,e.section,mobile, f_mobile, f_phone
        from fee_plan_master a
        join fee_plan_student_map b on a.fee_plan_id= b.fee_plan_id
        join student_master d on (b.student_id = d.student_id and d.current_session_id =${session_id})
        join student_current_standing g on b.student_id = g.student_id
        join section_master e on g. section_id = e.section_id
        join standard_master f on e.standard_id = f.standard_id
        join parent_master h on (d.student_id = h.student_id and h.current_session_id=${session_id})
        where a.fee_plan_id = ${fee_plan_id}
        order by e.section, d.first_name`;

     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.assignedStudents = result;
            res.send(data)
        }
     
     });
       
  });

});
//========== monthly fees report ===============
router.get('/read_date_wise_fees/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;

  req.getConnection(function(err,connection){
       
     var data = {}
     var condition = "";
     var session_id = req.cookies.session_id
     
     var qry = `select date_format(receipt_date, '%d/%m/%Y') as receipt_date, fees, fine,
          scholarship, (fees + fine - scholarship) as total from
          (select receipt_date, sum(amount_due) as fees , sum(fine_recevied) as fine,
          sum(if(scholorship_amount is not null, scholorship_amount, 0)) as scholarship
          from fee_received a
          JOIN fee_received_details b on a.receipt_id = b.receipt_id
          LEFT JOIN fee_scholorship c on (a.student_id = c.student_id and a.fee_slip_id = c.fee_slip_id)
          where b.receipt_date between ? and ?
          and b.session_id=${session_id}
          group by receipt_date ) a
          order by 1`;

     connection.query(qry,[start_date,end_date], function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.dateWiseData = result;
            res.send(data)
        }
     
     });
       
  });

});
//========= advance fees ==========

router.get('/read_early_fees_payer/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;

  req.getConnection(function(err,connection){
       
     var data = {}
     var condition = "";
     var session_id = req.cookies.session_id
     
     var qry = `select i.fee_slip_name,a.receipt_id, date_format(receipt_date,'%d/%m/%Y') as receipt_date, enroll_number, 
              concat(first_name,' ' ,middle_name,' ', last_name) as name,
              concat(standard, ' ', section) as standard, 
              amount_due , fine_recevied as fine, 
              if(scholorship_amount is not null, scholorship_amount, 0) as scholorship_amount,
              if(scholorship_amount is not null,amount_due + fine_recevied -scholorship_amount ,amount_due + fine_recevied) as total
              from fee_received a
              JOIN fee_received_details b on a.receipt_id = b.receipt_id
              LEFT JOIN   fee_scholorship c on (a.student_id = c.student_id and a.fee_slip_id = c.fee_slip_id)
              JOIN   student_master e on (a.student_id = e.student_id and e.current_session_id =${session_id})
              JOIN   student_current_standing f on (a.student_id = f.student_id and a.session_id=f.session_id)
              LEFT JOIN   section_master g on f.section_id = g.section_id
              LEFT JOIN   standard_master h on g.standard_id = h.standard_id
              LEFT JOIN   fee_slip i on (a.fee_slip_id = i.fee_slip_id and a.fee_plan_id = i.fee_plan_id)
              where  b.receipt_date < i.last_date
              and b.receipt_date between ? and ?
              and b.session_id=${session_id}
              order by g.section_id, name, i.fee_slip_id`;

     connection.query(qry,[start_date,end_date], function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.advanceFees = result;
           //connection.end()
            res.send(data)
        }
     
     });
       
  });

});
//=========== read scholarship list =========
router.get('/getScholarshipList/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;

  req.getConnection(function(err,connection){
       
     var data = {}
     var condition = "";
     var session_id = req.cookies.session_id
     
     var qry = `select concat(first_name,' ' ,middle_name,' ', last_name) as name,d.enroll_number,
              concat(standard,' ', section) as standard,  fee_slip_name, scholorship_amount 
              from 
             (select * from fee_scholorship where session_id=${session_id} ) a
              LEFT JOIN fee_slip b on a.fee_slip_id = b.fee_slip_id
              JOIN student_current_standing c  on (a.student_id = c.student_id and c.session_id=${session_id})
              LEFT JOIN student_master d  on (a.student_id = d.student_id and d.current_session_id = ${session_id})
              LEFT JOIN section_master e  on c.section_id = e.section_id
              LEFT JOIN standard_master f on e.standard_id = f.standard_id
              
              where b.last_date between ? and ?
              order by e.section_id, first_name,b.fee_slip_id`;

     connection.query(qry,[start_date,end_date], function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.scholarships = result;
           //connection.end()
            res.send(data)
        }
     
     });
       
  });

});
//========== read Fees Collection Summary =====
router.post('/read_collection_summary', function(req, res, next) {
  var obj = JSON.parse(JSON.stringify(req.body));

  var start_date = obj.start_date;
  var end_date =  obj.end_date;
  
   var data = {}
  req.getConnection(function(err,connection){
     var condition = "";
     var session_id = req.cookies.session_id

     
      
     var qry = `SELECT coalesce(bank_name, 'School') as bank, mode, 
        sum(amount_due + fine_recevied - coalesce(scholorship_amount, 0) - coalesce(concession_amount, 0)) as amount 
        from fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id 
                and b.receipt_date between '${start_date}' and '${end_date}')
        LEFT JOIN fee_scholorship c on (a.student_id = c.student_id and a.fee_slip_id = c.fee_slip_id)
        LEFT JOIN fee_concession d on (a.student_id = d.student_id and a.fee_slip_id = d.fee_slip_id)
        LEFT JOIN bank_account_master e on b.bank_id = e.bank_account_no
        where b.session_id=${session_id}
        group by bank, mode order by 1`;

   //console.log(qry)
     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{

            var feeData = []
            var prev_bank =''
            console.log(result)
            for(var i = 0;  i < result.length ; i++){                
            var error = 0;
            if(result[i].bank != prev_bank){
              if(prev_bank == ""){
                var temp = {}
                temp['bank'] = result[i].bank
                if(result[i].mode == 'Cash' || result[i].mode == 'Bank'){
                  temp['cash'] = result[i].amount;
                  if(temp['cheque']) temp['cheque'] = 0;
                }else{
                  temp['cheque'] = result[i].amount;
                  if(temp['cash']) temp['cash'] = 0;
                }
              }else{
                temp['total'] = Number(temp['cash']) + Number(temp['cheque'])
                feeData.push(temp)
                temp = {}
                temp['bank'] = result[i].bank
                if(result[i].mode == 'Cash' || result[i].mode == 'Bank'){
                  temp['cash'] = result[i].amount;
                  if(temp['cheque']) temp['cheque'] = 0;
                }else{
                  temp['cheque'] = result[i].amount;
                  if(temp['cash']) temp['cash'] = 0;
                }
              }
              prev_bank = result[i].bank;
            }else{
              if(result[i].mode == 'Cash' || result[i].mode == 'Bank'){
                if(temp['cash']){
                  temp['cash'] = Number(temp['cash']) + Number(result[i].amount)
                }else{
                  temp['cash'] = result[i].amount;
                }
                if(temp['cheque']) temp['cheque'] = 0;
              }else{
                if(temp['cheque']){
                  temp['cheque'] = Number(temp['cheque']) + Number(result[i].amount) 
                }else{
                  temp['cheque'] = result[i].amount;
                }
                if(temp['cash']) temp['cash'] = 0;
              }
            }
          }
          temp['total'] = Number(temp['cash']) + Number(temp['cheque']);
          feeData.push(temp)
          


             data.status = 's';
            data.collectionSummary = feeData;
            

           //connection.end()
            res.send(data)
        }
     
     });
       
  });

});
//============== read outstanding fees ========
  
router.get('/read_outstanding_fees/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;

  req.getConnection(function(err,connection){
       
     var data = {}
     var condition = "";
     var session_id = req.cookies.session_id
     
     var qry = `select distinct e.student_id, gender, fee_slip_name,b.fee_slip_id, enroll_number,roll_number, 
        concat(first_name, ' ', middle_name, ' ', last_name)as student_name,e.last_fee_slip_id,
        concat(standard, ' ', section) as standard, f_name, concat(f_mobile,' (F)') as f_mobile, f_phone, mobile, total_amount as fees,
        f_add_l1, f_add_l2, concat(f_city,' - ',f_zip) as f_city, f_state
        from fee_plan_student_map a
        JOIN fee_slip b on a.fee_plan_id = b.fee_plan_id
        JOIN fee_plan_master c on (a.fee_plan_id = c.fee_plan_id and c.session_id = ${session_id})
        LEFT JOIN fee_received d on (a.fee_plan_id = d.fee_plan_id and a.student_id = d.student_id 
                and b.fee_slip_id = d.fee_slip_id)
        JOIN student_master e on (a.student_id = e.student_id and e.current_session_id =${session_id} )
        JOIN student_current_standing f on a.student_id = f.student_id
        JOIN section_master g on f.section_id = g.section_id
        JOIN standard_master h on g.standard_id = h.standard_id
        JOIN parent_master i on (a.student_id = i.student_id  and i.current_session_id = ${session_id})
        LEFT JOIN fee_scholorship j on (a.student_id = j.student_id and b.fee_slip_id = j.fee_slip_id)
        where receipt_id is null
        and (e.withdraw='N' || e.withdraw_session > ${session_id})
        and f.session_id= ${session_id}
        and b.last_date <='${end_date}'
        and b.last_date >='${start_date}'
        and (b.fee_slip_id <= e.last_fee_slip_id or e.last_fee_slip_id is null)
        order by g.section_id, student_name, b.fee_slip_id`;

     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{

      var prev_enroll_number = "";
      var prev_student_id = "";
      var prev_gender = "";
      var prev_standard = "";
      var prev_sub_total = 0;
      var sub_total = 0 ;
      var grand_total = 0;
      var slNo = 0;
      var count=0;
      var outstandingData = []
        for(var i = 0; i<result.length; i++){
      //var error = 0;
       if(result[i].enroll_number !=prev_enroll_number){
           if(prev_enroll_number !=""){
              var obj = {}
              obj['slNo'] = ++slNo;
              obj['student_id'] = prev_student_id;
              obj['gender'] = prev_gender;
              obj['enroll_number'] = prev_enroll_number;
              obj['roll_number'] =roll_number;
              obj['standard']= standard;
              obj['student_name'] = student_name;
              obj['f_name'] = f_name;
              obj['f_mobile'] = f_mobile;
              obj['mobile'] = mobile;
              if(result[i].last_fee_slip_id == null){
                obj['fee_slip_name'] = fee_slip_name;
              }else if(result[i].last_fee_slip_id >= result[i].fee_slip_id){      
                obj['fee_slip_name'] = fee_slip_name;
              }
            //  obj['fee_slip_name'] = fee_slip_name;
              obj['fees'] = fees;
              obj['f_add_l1'] = f_add_l1;
              obj['f_add_l2'] = f_add_l2;
              obj['f_city'] = f_city;
           //   obj['f_zip'] = $f_zip;
              obj['f_state'] = f_state;
              outstandingData.push(obj)
           }
            prev_student_id = result[i].student_id
            prev_gender = result[i].gender
            prev_enroll_number = result[i].enroll_number
           var roll_number = result[i].roll_number
            /* for last fee slip id */
            
            if(result[i].last_fee_slip_id == null){
               var  fee_slip_name = result[i].fee_slip_name;
            }else if(result[i].last_fee_slip_id >= result[i].fee_slip_id){      
               var fee_slip_name = result[i].fee_slip_name;
            } 
            
            
           // fee_slip_name = result[i].fee_slip_name
            var standard=result[i].standard
            var student_name = result[i].student_name
            var f_name = result[i].f_name
            var f_mobile = result[i].f_mobile
            var mobile = result[i].mobile
            var f_add_l1 = result[i].f_add_l1
            var f_add_l2 = result[i].f_add_l2
            var f_city = result[i].f_city
          //  $f_zip = result[i].f_zip
            var f_state = result[i].f_state
            var fees = result[i].fees               
          }else{  
               if(result[i].last_fee_slip_id == null){
                var fee_slip_name = fee_slip_name + ", " + result[i].fee_slip_name
                  fees=Number(fees) + Number(result[i].fees)
               }else if(result[i].last_fee_slip_id >= result[i].fee_slip_id){       
                  var fee_slip_name = fee_slip_name + ", " + result[i].fee_slip_name
                  var fees=Number(fees) + Number(result[i].fees)
               }else{
                  var fee_slip_name = "";
                  var fees=Number(fees) + Number(result[i].fees)
               }                      
          }      
                    
           if(result[i].standard != prev_standard){
              if(prev_standard != ""){


                obj = {}
                obj["fee_slip_name"] = "Sub Total";  
                obj["fees"] = prev_sub_total;
                grand_total = grand_total + prev_sub_total; 
                outstandingData.push(obj)           
               }  
                obj = {}
                obj["student_name"] = "Class: " + result[i].standard;               
                outstandingData.push(obj)
                prev_standard = result[i].standard
                prev_sub_total=result[i].fees       
              }
             else{           
                  sub_total = result[i].fees
                  prev_sub_total =Number(prev_sub_total) + Number(sub_total)   
              }

      } 
      /*if(error == 0){
          obj = {}
          obj['slNo'] = ++slNo;
          obj['student_id'] = prev_student_id;
          obj['gender'] = prev_gender;
          obj['enroll_number'] = prev_enroll_number;
          obj['roll_number'] = roll_number;
          obj['standard']= standard;
          obj['student_name'] = student_name;
          obj['f_name'] = f_name;
          obj['f_mobile'] = f_mobile;
          obj['mobile'] = mobile;
          if(result[i].last_fee_slip_id == null){
            obj['fee_slip_name'] = fee_slip_name;
          }else if(result[i].last_fee_slip_id >= result[i].fee_slip_id){      
            obj['fee_slip_name'] = fee_slip_name;
          }
          obj['f_add_l1'] = f_add_l1;
          obj['f_add_l2'] = f_add_l2;
          obj['f_city'] = f_city;
        //  obj['f_zip'] = $f_zip;
          obj['f_state'] = f_state;
          obj['fees'] = fees;
          outstandingData.push(obj)
        }*/                 
      //add the sub total for the last Class
      obj = {}
      obj["fee_slip_name"] = "Sub Total";
      obj["fees"] = prev_sub_total;
      outstandingData.push(obj)
      
      //add grand total
      obj = {}
      obj["fee_slip_name"] = "Grand Total";
      obj["fees"] = Number(grand_total) + Number(prev_sub_total)  
      outstandingData.push(obj)    

//=================return =====
            data.status = 's';
            data.outstandingData = outstandingData;
           //connection.end()
            res.send(data)
        }
     
     });
       
  });

});
//========== read fees register ===============
router.get('/read_fees_register/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;

  req.getConnection(function(err,connection){
       
     var data = {}
     var condition = "";
     var session_id = req.cookies.session_id
     
     var qry = `select date_format(receipt_date, '%d/%m/%Y') as receipt_date, a.receipt_id, e.enroll_number,
              concat(e.first_name, ' ', e.middle_name,' ',  e.last_name) as name,
              concat(h.standard, ' ', g.section)as class, i.fee_slip_name, b.mode,item_no,      
              amount_due , fine_recevied as fine,j.bank_name,   
              if(scholorship_amount is not null, scholorship_amount, 0) as scholorship_amount,
              if(scholorship_amount is not null,amount_due + fine_recevied -scholorship_amount ,amount_due + fine_recevied) as total
              from fee_received a
              LEFT JOIN  fee_received_details b on a.receipt_id = b.receipt_id
              LEFT JOIN  fee_scholorship c on (a.student_id = c.student_id and a.fee_slip_id = c.fee_slip_id)
              LEFT JOIN  student_master e on (a.student_id = e.student_id and e.current_session_id =${session_id})
              LEFT JOIN  student_current_standing f on ( a.student_id = f.student_id  and a.session_id = f.session_id)
              LEFT JOIN  section_master g on f.section_id = g.section_id
              LEFT JOIN  standard_master h on g.standard_id = h.standard_id
              LEFT JOIN  fee_slip i on (a.fee_slip_id = i.fee_slip_id and a.fee_plan_id = i.fee_plan_id)   
              LEFT JOIN  bank_account_master j on b.bank_id = j.bank_account_no   
              where b.receipt_date between ? and ?  
              and a.session_id=${session_id}
              order by 1, mode,2,i.fee_slip_id`;
     
     connection.query(qry,[start_date,end_date], function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
          
    var prev_receipt_id="";
    var pre_mode="";
    var prev_standard = "";
    var prev_receipt_date = "";
    var grand_amount = 0;
    var grand_fine = 0;
    var grand_scholorship = 0;
    var grand_total = 0;
    var count=0;
    var slNo =0;
    var error = 1;
    var registerData = []

   
    //********************** blank fields *********************         
    var obj = {}
    obj['slNo'] = "SlNo";
    obj["receipt_date"]="Date";
    obj['receipt_id'] = "Recpt No";
    obj["enroll_number"] = "Enrol No";
    obj["name"] = "Name";
    obj['fee_slip_name'] = "Month";
    obj["class"] = "Class";
    obj["bank_name"] = "Bank Name";
    obj["item_no"] = "Cheq No";
    obj["mode"] = "";
    obj["amount_due"] = "Fee";
    obj["fine"] = "Fine";
    obj["scholorship_amount"] = "Scholarship";
    obj["total"] = "Total";  
    registerData.push(obj)
    var step =0;
   //////////////////////////////////////
    for(var i=0; i<result.length; i++){
      var error = 0;
        if(step==0){
          step=1;
          var obj = {}
          obj['slNo'] = "";
          obj["receipt_date"]="";
          obj['receipt_id'] = "";
          obj["enroll_number"] = "";
          if(result[i].mode =='Bank') obj["name"] = "Cash Collection By Bank";
          if(result[i].mode =='Cash') obj["name"] = "Cash Collection By School" ;
          if(result[i].mode =='Cheque') obj["name"] = "Cheque Collection By Bank";
          if(result[i].mode =='Draft') obj["name"] = "Fees Collection by Draft";
          if(result[i].mode =='Online') obj["name"] = "Online Fees Collection";
          obj['fee_slip_name'] = "";
          obj["class"] = "";
          obj["bank_name"] = "";
          obj["item_no"] = "";
          obj["mode"] = "";
          obj["amount_due"] = "-----";
          obj["fine"] = "-----";
          obj["scholorship_amount"] = "-----";
          obj["total"] = "-----";  
          registerData.push(obj)
        }
      if(result[i].receipt_id != prev_receipt_id){
            if(prev_receipt_id != "" ){
                 var obj = {}
                 obj['slNo'] = ++slNo;
                 obj["receipt_id"] = prev_receipt_id;
                 obj["fee_slip_name"] = prev_fee_slip_name;
                 obj["receipt_date"]=prev_receipt_date;
                 obj["enroll_number"] = prev_enroll_number;
                 obj["name"] = prev_name;
                 obj["class"] = prev_class;
                 obj["standard"] = prev_standard;
                 obj["bank_name"] = prev_bank_name;
                 obj["item_no"] = prev_item_no;
                 obj["mode"] = prev_mode;
                 obj["amount_due"] = prev_amount_due;
                 obj["fine"] = prev_fine;
                 obj["scholorship_amount"] = prev_scholorship_amount;
                 obj["total"] = prev_total;           
                 registerData.push(obj)
            }
        if(result[i].mode!= pre_mode || result[i].receipt_date != prev_receipt_date){
              if(pre_mode != "" || prev_receipt_date!= ""){
                  slNo=0;
                  var obj = {}
                  obj["fee_slip_name"] = "Sub Total";  
                  obj["amount_due"] = prev_sub_amount ;
                  obj["fine"] = prev_sub_fine;
                  obj["scholorship_amount"] = prev_sub_scholorship;
                  obj["total"] = prev_sub_total;
                  grand_amount = Number(grand_amount) + Number(prev_sub_amount)
                  grand_fine = Number(grand_fine) + Number(prev_sub_fine) 
                  grand_scholorship = Number(grand_scholorship) + Number(prev_sub_scholorship)
                  grand_total = Number(grand_total) + Number(prev_sub_total)
                  registerData.push(obj)

                  for(var j=0; j<=2; j++){
                      var obj = {}
                      obj['slNo'] = "";
                      obj['receipt_id'] = "";
                      obj['fee_slip_name'] = "";
                      obj["receipt_date"]="";
                      obj["enroll_number"] = "";
                      obj["name"] = "";
                      obj["class"] = "";
                      obj["bank_name"] = "";
                      obj["item_no"] = "";
                      obj["mode"] = "";
                      obj["amount_due"] = "-----";
                      obj["fine"] = "-----";
                      obj["scholorship_amount"] = "-----";
                      obj["total"] = "-----";   
                      registerData.push(obj)
                      if(j==1 && count==0){
                          var obj = {}
                          obj['slNo'] = "";
                          obj["receipt_date"]="";
                          obj['receipt_id'] = "";
                          obj["enroll_number"] = "";
                          if(result[i].mode =='Bank') obj["name"] = "Cash Collection By Bank";
                          if(result[i].mode =='Cash') obj["name"] = "Cash Collection By School";
                          if(result[i].mode =='Cheque') obj["name"] = "Cheque Collection By Bank";
                          if(result[i].mode =='Draft') obj["name"] = "Fees Collection by Draft";
                          if(result[i].mode =='Online') obj["name"] = "Online Fees Collection";
                          obj['fee_slip_name'] = "";
                          obj["class"] = "";
                          obj["bank_name"] = "";
                          obj["item_no"] = "";
                          obj["mode"] = "";
                          obj["amount_due"] = "-----";
                          obj["fine"] = "-----";
                          obj["scholorship_amount"] = "-----";
                          obj["total"] = "-----";  
                          registerData.push(obj)
                          
                          var obj = {}
                          obj['slNo'] = "SlNo";
                          obj["receipt_date"]="Date";
                          obj['receipt_id'] = "Recpt No";
                          obj["enroll_number"] = "Enrol No";
                          obj["name"] = "Name";
                          obj['fee_slip_name'] = "Month";
                          obj["class"] = "Class";
                          obj["bank_name"] = "Bank Name";
                          obj["item_no"] = "Cheq No";
                          obj["mode"] = "";
                          obj["amount_due"] = "Fee";
                          obj["fine"] = "Fine";
                          obj["scholorship_amount"] = "Scholorship";
                          obj["total"] = "Total";  
                          registerData.push(obj)  
                      }
                      if(j==1 && count==1){ 
                          var obj = {}
                          obj['slNo'] = "";
                          obj["receipt_date"]="";
                          obj['receipt_id'] = "";
                          obj["enroll_number"] = "";
                          if(result[i].mode =='Bank') obj["name"] = "Cash Collection By Bank";
                          if(result[i].mode =='Cash') obj["name"] = "Cash Collection By School" ;
                          if(result[i].mode =='Cheque') obj["name"] = "Cheque Collection By Bank" ;
                          if(result[i].mode =='Draft') obj["name"] = "Fees Collection by Draft";
                          if(result[i].mode =='Online') obj["name"] = "Online Fees Collection";
                          obj['fee_slip_name'] = "";
                          obj["class"] = "";
                          obj["bank_name"] = "";
                          obj["item_no"] = "";
                          obj["mode"] = "";
                          obj["amount_due"] = "-----";
                          obj["fine"] = "-----";
                          obj["scholorship_amount"] = "-----";
                          obj["total"] = "-----";  
                          registerData.push(obj)
                          
                          var obj = {}
                          obj['slNo'] = "SlNo";
                          obj["receipt_date"]="Date";
                          obj['receipt_id'] = "Recpt No";
                          obj["enroll_number"] = "Enrol No";
                          obj["name"] = "Name";
                          obj['fee_slip_name'] = "Month";
                          obj["class"] = "Class";
                          obj["bank_name"] = "Bank Name";
                          obj["item_no"] = "Cheq No";
                          obj["mode"] = "";
                          obj["amount_due"] = "Fee";
                          obj["fine"] = "Fine";
                          obj["scholorship_amount"] = "Scholorship";
                          obj["total"] = "Total";  
                          registerData.push(obj)
                         
                      }
                  }           
                  count=1;
                   //********************** blank fields *********************         
                 }       
                  pre_mode = result[i].mode
                  prev_receipt_date = result[i].receipt_date
                  prev_sub_amount=result[i].amount_due
                  prev_sub_fine=result[i].fine
                  prev_sub_scholorship=result[i].scholorship_amount
                  prev_sub_total=result[i].total       
                }else{   
                  prev_sub_amount= Number(prev_sub_amount) + Number(result[i].amount_due)
                  prev_sub_fine= Number(prev_sub_fine) + Number(result[i].fine)
                  prev_sub_scholorship= Number(prev_sub_scholorship) +  Number(result[i].scholorship_amount)            
                  prev_sub_total = Number(prev_sub_total) + Number(result[i].total)   
               }
        
            prev_receipt_id = result[i].receipt_id
            prev_fee_slip_name = result[i].fee_slip_name
            prev_receipt_date = result[i].receipt_date
            prev_enroll_number =  result[i].enroll_number
            prev_name = result[i].name
            prev_class= result[i].class
            prev_bank_name = result[i].bank_name
            prev_item_no=result[i].item_no
            prev_mode= result[i].mode
            prev_amount_due= result[i].amount_due
            prev_fine= result[i].fine
            prev_scholorship_amount= result[i].scholorship_amount
            prev_total= result[i].total   

      }else{
              prev_fee_slip_name= Number(prev_fee_slip_name) + ", " + Number(result[i].fee_slip_name)
              prev_amount_due= Number(prev_amount_due) + Number(result[i].amount_due) 
              prev_fine = Number(prev_fine) +  Number(result[i].fine)
              prev_scholorship_amount = Number(prev_scholorship_amount) + Number(result[i].scholorship_amount)
              prev_total = Number(prev_total) +  Number(result[i].total)   
                           
              prev_sub_amount= Number(prev_sub_amount) + Number(result[i].amount_due)
              prev_sub_fine= Number(prev_sub_fine) + Number(result[i].fine)
              prev_sub_scholorship= Number(prev_sub_scholorship) +  Number(result[i].scholorship_amount)            
              prev_sub_total = Number(prev_sub_total) + Number(result[i].total)   
      }       
      
    }

     if(error == 0){
      var obj = {}
      obj['slNo'] = ++slNo;
      obj['receipt_id'] = prev_receipt_id;
      obj['fee_slip_name'] = prev_fee_slip_name;
      obj["receipt_date"]=prev_receipt_date;
      obj["enroll_number"] = prev_enroll_number;
      obj["name"] = prev_name;
      obj["class"] = prev_class;
      obj["bank_name"] = prev_bank_name;
      obj["item_no"] = prev_item_no;
      obj["mode"] = prev_mode;
      obj["amount_due"] = prev_amount_due;
      obj["fine"] = prev_fine;
      obj["scholorship_amount"] = prev_scholorship_amount;
      obj["total"] = prev_total;   
      registerData.push(obj)
    }             
    //add the sub total for the last Class
    var obj = {}
    obj["fee_slip_name"] = "Sub Total"
    obj["amount_due"] = prev_sub_amount
    obj["fine"] = prev_sub_fine
    obj["scholorship_amount"] = prev_sub_scholorship
    obj["total"] = prev_sub_total
    registerData.push(obj)

    //add grand total
    var obj = {}
    obj["fee_slip_name"] = "Grand Total";
    obj["amount_due"] = Number(grand_amount) + Number(prev_sub_amount)
    obj["fine"] = Number(grand_fine) + Number(prev_sub_fine)
    obj["scholorship_amount"] = Number(grand_scholorship) + Number(prev_sub_scholorship)
    obj["total"] = Number(grand_total) + Number(prev_sub_total)  
    registerData.push(obj)           


    /*day total*/
    data1= []
    prev_date='';
    total_amount_due=0;
    total_fine=0;
    total_scholorship_amount=0;
    total=0;
    // console.log("==========Registered Data ========")
    //console.log(registerData)

    registerData.map(k=>{

      if(k.receipt_date!=undefined){

        if(k.receipt_date !='' && k.receipt_date !='Date'){
          if(prev_date==''){//loops runs the first time
            prev_date=k.receipt_date
            total_amount_due=k.amount_due
            total_fine=k.fine
            total_scholorship_amount=k.scholorship_amount
            total=k.total
            data1.push(k)
          }else if(prev_date==k.receipt_date){
            total_amount_due= Number(total_amount_due) + Number(k.amount_due)
            total_fine=Number(total_fine) + Number(k.fine)
            total_scholorship_amount= Number(total_scholorship_amount) + Number(k.scholorship_amount)
            total=Number(total) + Number(k.total)
            data1.push(k)
          }else if(prev_date != k.receipt_date){

            var obj = {}
            obj["fee_slip_name"] = "Day Total";
            obj["amount_due"] = total_amount_due
            obj["fine"] = total_fine
            obj["scholorship_amount"] = total_scholorship_amount
            obj["total"] = total
            data1.push(obj)

            prev_date=k.receipt_date
            total_amount_due=k.amount_due
            total_fine=k.fine
            total_scholorship_amount=k.scholorship_amount
            total=k.total
            data1.push(k)
          }
          
        }else{
            data1.push(k)
        }
      }else{
        data1.push(k)
      } 
    })


    var obj = {}
    obj["fee_slip_name"] = "Day Total";
    obj["amount_due"] = total_amount_due;
    obj["fine"] = total_fine;
    obj["scholorship_amount"] = total_scholorship_amount;
    obj["total"] = total;
    data1.push(obj)

    var reversed = data1.reverse()
    
    var i=0;
    var j=0;
    var flag=0;
    var data2=[]
    var obj = {}

    for( var m = 0; m<reversed.length; m++) {
      if(reversed[m].fee_slip_name=='Day Total'){
       var obj = {}
       obj=reversed[m];
       if( i>0){
         j=0;
       }
       flag++;
      }else{
        if(i==1){
          data2.push(obj)

        }
        
        if(j==3 && flag>1){
          data2.push(obj)
        }
   

        data2.push(reversed[m])
        i++;
        if(i>1){
          j++;
        }
      }
      
    }

    data3 = data2.reverse()   

            data.status = 's';
            data.registerData = data3
           //connection.end()
            res.send(data)
        }
     
     });
       
  });

});
//========== monthly fees report ===============
router.get('/read_monthly_fees/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;

  req.getConnection(function(err,connection){
       
     var data = {}
     var condition = "";
     var session_id = req.cookies.session_id
     
     var qry = `select date_format(receipt_date, '%M') as month, sum(fees) as fees, sum(fine) as fine,
        sum(scholarship) as scholarship, sum(fees + fine - scholarship ) as total 
        from
        (select receipt_date, sum(amount_due) as fees , sum(fine_recevied) as fine,
          sum(if(scholorship_amount is not null, scholorship_amount, 0)) as scholarship
          from fee_received a
          JOIN fee_received_details b on a.receipt_id = b.receipt_id
          LEFT JOIN fee_scholorship c on (a.student_id = c.student_id and a.fee_slip_id = c.fee_slip_id)
          where b.receipt_date between ? and ?
          and b.session_id=${session_id}
          group by receipt_date ) a
          group by month
          order by receipt_date`;

     connection.query(qry,[start_date,end_date], function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.monthlyData = result;
           //connection.end()
            res.send(data)
        }
     
     });
       
  });

});
//============ read daily fees collection ===========
//========== monthly fees report ===============
router.get('/read_daily_fees/:start_date/:end_date', function(req, res, next) {
  var start_date = req.params.start_date;
  var end_date = req.params.end_date;
  var session_id = req.cookies.session_id
  var data = {}

  req.getConnection(function(err,connection){
    connection.beginTransaction(function(err) {
      if (err) { throw err; }

      var qry = `select date_format(receipt_date, '%d/%m/%Y') as receipt_date, a.receipt_id, e.enroll_number,
                concat(e.first_name, ' ', e.middle_name,' ',  e.last_name) as name,
                concat(h.standard, ' ', g.section)as class, i.fee_slip_name, b.mode,item_no,      
                amount_due , fine_recevied as fine,j.bank_name,   
                if(scholorship_amount is not null, scholorship_amount, 0) as scholorship_amount,
                if(scholorship_amount is not null,amount_due + fine_recevied -scholorship_amount ,amount_due + fine_recevied) as total
                from fee_received a
                LEFT JOIN  fee_received_details b on a.receipt_id = b.receipt_id
                LEFT JOIN  fee_scholorship c on (a.student_id = c.student_id and a.fee_slip_id = c.fee_slip_id)
                LEFT JOIN  student_master e on (a.student_id = e.student_id and e.current_session_id = ${session_id})
                LEFT JOIN  student_current_standing f on (a.student_id = f.student_id  and a.session_id = f.session_id)
                LEFT JOIN  section_master g on f.section_id = g.section_id
                LEFT JOIN  standard_master h on g.standard_id = h.standard_id
                LEFT JOIN  fee_slip i on (a.fee_slip_id = i.fee_slip_id and a.fee_plan_id = i.fee_plan_id)   
                LEFT JOIN  bank_account_master j on b.bank_id = j.bank_account_no   
                where b.receipt_date between '${start_date}' and '${end_date}'
                and mode='Online'
                and a.session_id=${session_id}
                order by mode,2,i.fee_slip_id`;
      
      var qry1 = `select date_format(receipt_date, '%d/%m/%Y') as receipt_date, a.receipt_id, e.enroll_number,
                concat(e.first_name, ' ', e.middle_name,' ',  e.last_name) as name,
                concat(h.standard, ' ', g.section)as class, i.fee_slip_name, b.mode,item_no,      
                amount_due , fine_recevied as fine,j.bank_name,   
                if(scholorship_amount is not null, scholorship_amount, 0) as scholorship_amount,
                if(scholorship_amount is not null,amount_due + fine_recevied -scholorship_amount ,amount_due + fine_recevied) as total
                from fee_received a
                LEFT JOIN  fee_received_details b on a.receipt_id = b.receipt_id
                LEFT JOIN  fee_scholorship c on (a.student_id = c.student_id and a.fee_slip_id = c.fee_slip_id)
                LEFT JOIN  student_master e on (a.student_id = e.student_id and e.current_session_id = ${session_id})
                LEFT JOIN  student_current_standing f on (a.student_id = f.student_id  and a.session_id = f.session_id)
                LEFT JOIN  section_master g on f.section_id = g.section_id
                LEFT JOIN  standard_master h on g.standard_id = h.standard_id
                LEFT JOIN  fee_slip i on (a.fee_slip_id = i.fee_slip_id and a.fee_plan_id = i.fee_plan_id)   
                LEFT JOIN  bank_account_master j on b.bank_id = j.bank_account_no   
                where b.receipt_date between '${start_date}' and '${end_date}'  
                and mode='Bank'
                and a.session_id=${session_id}
                order by mode,2,i.fee_slip_id`;
      
      var qry2 = `select date_format(receipt_date, '%d/%m/%Y') as receipt_date, a.receipt_id, e.enroll_number,
                concat(e.first_name, ' ', e.middle_name,' ',  e.last_name) as name,
                concat(h.standard, ' ', g.section)as class, i.fee_slip_name, b.mode,item_no,      
                amount_due , fine_recevied as fine,j.bank_name,   
                if(scholorship_amount is not null, scholorship_amount, 0) as scholorship_amount,
                if(scholorship_amount is not null,amount_due + fine_recevied -scholorship_amount ,amount_due + fine_recevied) as total
                from fee_received a
                LEFT JOIN  fee_received_details b on a.receipt_id = b.receipt_id
                LEFT JOIN  fee_scholorship c on (a.student_id = c.student_id and a.fee_slip_id = c.fee_slip_id)
                LEFT JOIN  student_master e on (a.student_id = e.student_id and e.current_session_id = ${session_id})
                LEFT JOIN  student_current_standing f on (a.student_id = f.student_id  and a.session_id = f.session_id)
                LEFT JOIN  section_master g on f.section_id = g.section_id
                LEFT JOIN  standard_master h on g.standard_id = h.standard_id
                LEFT JOIN  fee_slip i on (a.fee_slip_id = i.fee_slip_id and a.fee_plan_id = i.fee_plan_id)   
                LEFT JOIN  bank_account_master j on b.bank_id = j.bank_account_no   
                where b.receipt_date between '${start_date}' and '${end_date}'  
                and mode='Cheque'
                and a.session_id=${session_id}
                order by mode,2,i.fee_slip_id`;
      
       var qry3=`select date_format(receipt_date, '%d/%m/%Y') as receipt_date, a.receipt_id, e.enroll_number,
                concat(e.first_name, ' ', e.middle_name,' ',  e.last_name) as name,
                concat(h.standard, ' ', g.section)as class, i.fee_slip_name, b.mode,item_no,      
                amount_due , fine_recevied as fine,j.bank_name,   
                if(scholorship_amount is not null, scholorship_amount, 0) as scholorship_amount,
                if(scholorship_amount is not null,amount_due + fine_recevied -scholorship_amount ,amount_due + fine_recevied) as total
                from fee_received a
                LEFT JOIN  fee_received_details b on a.receipt_id = b.receipt_id
                LEFT JOIN  fee_scholorship c on (a.student_id = c.student_id and a.fee_slip_id = c.fee_slip_id)
                LEFT JOIN  student_master e on (a.student_id = e.student_id and e.current_session_id = ${session_id})
                LEFT JOIN  student_current_standing f on (a.student_id = f.student_id  and a.session_id = f.session_id)
                LEFT JOIN  section_master g on f.section_id = g.section_id
                LEFT JOIN  standard_master h on g.standard_id = h.standard_id
                LEFT JOIN  fee_slip i on (a.fee_slip_id = i.fee_slip_id and a.fee_plan_id = i.fee_plan_id)   
                LEFT JOIN  bank_account_master j on b.bank_id = j.bank_account_no   
                where b.receipt_date between '${start_date}' and '${end_date}'  
                and mode='Draft'
                and a.session_id=${session_id}
                order by mode,2,i.fee_slip_id`   
      
        var qry4=`select date_format(receipt_date, '%d/%m/%Y') as receipt_date, a.receipt_id, e.enroll_number,
                concat(e.first_name, ' ', e.middle_name,' ',  e.last_name) as name,
                concat(h.standard, ' ', g.section)as class, i.fee_slip_name, b.mode,item_no,      
                amount_due , fine_recevied as fine,j.bank_name,   
                if(scholorship_amount is not null, scholorship_amount, 0) as scholorship_amount,
                if(scholorship_amount is not null,amount_due + fine_recevied -scholorship_amount ,amount_due + fine_recevied) as total
                from fee_received a
                LEFT JOIN  fee_received_details b on a.receipt_id = b.receipt_id
                LEFT JOIN  fee_scholorship c on (a.student_id = c.student_id and a.fee_slip_id = c.fee_slip_id)
                LEFT JOIN  student_master e on (a.student_id = e.student_id and e.current_session_id = ${session_id})
                LEFT JOIN  student_current_standing f on (a.student_id = f.student_id  and a.session_id = f.session_id)
                LEFT JOIN  section_master g on f.section_id = g.section_id
                LEFT JOIN  standard_master h on g.standard_id = h.standard_id
                LEFT JOIN  fee_slip i on (a.fee_slip_id = i.fee_slip_id and a.fee_plan_id = i.fee_plan_id)   
                LEFT JOIN  bank_account_master j on b.bank_id = j.bank_account_no   
                where b.receipt_date between '${start_date}' and '${end_date}'
                and mode='Cash'
                and a.session_id=${session_id}
                order by mode,2,i.fee_slip_id`;  
      
       connection.query(qry, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });

          }else{
           var dailyData = []
          obj = {}
          obj['slNo'] = "";
          obj["receipt_date"]="";
          obj['receipt_id'] = "";
          obj["enroll_number"] = "";
          obj["name"] = "Cash Collection By Bank";
          obj['fee_slip_name'] = "";
          obj["class"] = "";
          obj["bank_name"] = "";
          obj["item_no"] = "";
          obj["mode"] = "";
          obj["amount_due"] = "";
          obj["fine"] = "";
          obj["scholorship_amount"] = "";
          obj["total"] = "";  
          dailyData.push(obj)
          obj = {}
          obj['slNo'] = "SlNo";
          obj["receipt_date"]="Date";
          obj['receipt_id'] = "Recpt No";
          obj["enroll_number"] = "Enrol No";
          obj["name"] = "Name";
          obj['fee_slip_name'] = "Month";
          obj["class"] = "Class";
          obj["bank_name"] = "Bank Name";
          obj["item_no"] = "Cheq No";
          obj["mode"] = "";
          obj["amount_due"] = "Fee";
          obj["fine"] = "Fine";
          obj["scholorship_amount"] = "Scholorship";
          obj["total"] = "Total";  
          dailyData.push(obj)

          var online_sub_total=0; 
          var sub_total_amount_due=0; 
          var sub_total_fine = 0;
          var sub_total_scholorship_amount = 0;
          var grand_amount_due = 0
          var  grand_total_fine = 0
          var  grand_scholorship_amount= 0
          var grand_total=0

          var slNo=1 
          console.log("result")
          console.log(result);
          for (var i=0; i<result.length; i++) {
            obj = {}
            obj['slNo'] = slNo;
            obj["receipt_date"]=result[i].receipt_date
            obj['receipt_id'] = result[i].receipt_id
            obj["enroll_number"] = result[i].enroll_number
            obj["name"] = result[i].name
            obj['fee_slip_name'] = result[i].fee_slip_name
            obj["class"] = result[i].class
            obj["bank_name"] = result[i].bank_name
            obj["item_no"] = result[i].item_no
            obj["mode"] = result[i].mode
            obj["amount_due"] = result[i].amount_due
            obj["fine"] = result[i].fine
            obj["scholorship_amount"] = result[i].scholorship_amount
            obj["total"] = result[i].total  

           sub_total_amount_due=Number(sub_total_amount_due) + Number(result[i].amount_due) 
           sub_total_fine = Number(sub_total_fine) +  Number(result[i].fine)
           sub_total_scholorship_amount = Number(sub_total_scholorship_amount) + Number(result[i].scholorship_amount)
           online_sub_total=Number(online_sub_total)+Number(result[i].total)
           
           grand_amount_due = Number(grand_amount_due) + Number(result[i].amount_due)
           grand_total_fine = Number(grand_total_fine) + Number(result[i].fine)
           grand_scholorship_amount= Number(grand_scholorship_amount) + Number(result[i].scholorship_amount)
           grand_total=Number(grand_total)+Number(result[i].total)
            
            dailyData.push(obj)
            slNo++;

          }
             
      }
//============ for quer1-------------------
      connection.query(qry1, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });

          }else{
            
          obj = {}
          obj['slNo'] = "";
          obj["receipt_date"]="";
          obj['receipt_id'] = "";
          obj["enroll_number"] = "";
          obj["name"] = "Online Fees Collection";
          obj['fee_slip_name'] = "";
          obj["class"] = "";
          obj["bank_name"] = "";
          obj["item_no"] = "";
          obj["mode"] = "";
          obj["amount_due"] = "";
          obj["fine"] = "";
          obj["scholorship_amount"] = "";
          obj["total"] = "";  
          dailyData.push(obj)
          obj = {}
          obj['slNo'] = "SlNo";
          obj["receipt_date"]="Date";
          obj['receipt_id'] = "Recpt No";
          obj["enroll_number"] = "Enrol No";
          obj["name"] = "Name";
          obj['fee_slip_name'] = "Month";
          obj["class"] = "Class";
          obj["bank_name"] = "Bank Name";
          obj["item_no"] = "Cheq No";
          obj["mode"] = "";
          obj["amount_due"] = "Fee";
          obj["fine"] = "Fine";
          obj["scholorship_amount"] = "Scholorship";
          obj["total"] = "Total";  
          dailyData.push(obj)

          var online_sub_total=0; 
          var sub_total_amount_due=0; 
          var sub_total_fine = 0;
          var sub_total_scholorship_amount = 0;
          var grand_amount_due = 0
          var  grand_total_fine = 0
          var  grand_scholorship_amount= 0
          var grand_total=0

          var slNo=1 
          console.log("result")
          console.log(result);
          for (var i=0; i<result.length; i++) {
            obj = {}
            obj['slNo'] = slNo;
            obj["receipt_date"]=result[i].receipt_date
            obj['receipt_id'] = result[i].receipt_id
            obj["enroll_number"] = result[i].enroll_number
            obj["name"] = result[i].name
            obj['fee_slip_name'] = result[i].fee_slip_name
            obj["class"] = result[i].class
            obj["bank_name"] = result[i].bank_name
            obj["item_no"] = result[i].item_no
            obj["mode"] = result[i].mode
            obj["amount_due"] = result[i].amount_due
            obj["fine"] = result[i].fine
            obj["scholorship_amount"] = result[i].scholorship_amount
            obj["total"] = result[i].total  

           sub_total_amount_due=Number(sub_total_amount_due) + Number(result[i].amount_due) 
           sub_total_fine = Number(sub_total_fine) +  Number(result[i].fine)
           sub_total_scholorship_amount = Number(sub_total_scholorship_amount) + Number(result[i].scholorship_amount)
           online_sub_total=Number(online_sub_total)+Number(result[i].total)
           
           grand_amount_due = Number(grand_amount_due) + Number(result[i].amount_due)
           grand_total_fine = Number(grand_total_fine) + Number(result[i].fine)
           grand_scholorship_amount= Number(grand_scholorship_amount) + Number(result[i].scholorship_amount)
           grand_total=Number(grand_total)+Number(result[i].total)
            
            dailyData.push(obj)
            slNo++;

          }
        
          
      } 

    }); //second query end
//========== FOR QUERY 3rd ===================
      connection.query(qry2, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });

          }else{
            
          obj = {}
          obj['slNo'] = "";
          obj["receipt_date"]="";
          obj['receipt_id'] = "";
          obj["enroll_number"] = "";
          obj["name"] = "Cheque Collection By Bank";
          obj['fee_slip_name'] = "";
          obj["class"] = "";
          obj["bank_name"] = "";
          obj["item_no"] = "";
          obj["mode"] = "";
          obj["amount_due"] = "";
          obj["fine"] = "";
          obj["scholorship_amount"] = "";
          obj["total"] = "";  
          dailyData.push(obj)
          obj = {}
          obj['slNo'] = "SlNo";
          obj["receipt_date"]="Date";
          obj['receipt_id'] = "Recpt No";
          obj["enroll_number"] = "Enrol No";
          obj["name"] = "Name";
          obj['fee_slip_name'] = "Month";
          obj["class"] = "Class";
          obj["bank_name"] = "Bank Name";
          obj["item_no"] = "Cheq No";
          obj["mode"] = "";
          obj["amount_due"] = "Fee";
          obj["fine"] = "Fine";
          obj["scholorship_amount"] = "Scholorship";
          obj["total"] = "Total";  
          dailyData.push(obj)

          var online_sub_total=0; 
          var sub_total_amount_due=0; 
          var sub_total_fine = 0;
          var sub_total_scholorship_amount = 0;
          var grand_amount_due = 0
          var  grand_total_fine = 0
          var  grand_scholorship_amount= 0
          var grand_total=0

          var slNo=1 
          console.log("result")
          console.log(result);
          for (var i=0; i<result.length; i++) {
            obj = {}
            obj['slNo'] = slNo;
            obj["receipt_date"]=result[i].receipt_date
            obj['receipt_id'] = result[i].receipt_id
            obj["enroll_number"] = result[i].enroll_number
            obj["name"] = result[i].name
            obj['fee_slip_name'] = result[i].fee_slip_name
            obj["class"] = result[i].class
            obj["bank_name"] = result[i].bank_name
            obj["item_no"] = result[i].item_no
            obj["mode"] = result[i].mode
            obj["amount_due"] = result[i].amount_due
            obj["fine"] = result[i].fine
            obj["scholorship_amount"] = result[i].scholorship_amount
            obj["total"] = result[i].total  

           sub_total_amount_due=Number(sub_total_amount_due) + Number(result[i].amount_due) 
           sub_total_fine = Number(sub_total_fine) +  Number(result[i].fine)
           sub_total_scholorship_amount = Number(sub_total_scholorship_amount) + Number(result[i].scholorship_amount)
           online_sub_total=Number(online_sub_total)+Number(result[i].total)
           
           grand_amount_due = Number(grand_amount_due) + Number(result[i].amount_due)
           grand_total_fine = Number(grand_total_fine) + Number(result[i].fine)
           grand_scholorship_amount= Number(grand_scholorship_amount) + Number(result[i].scholorship_amount)
           grand_total=Number(grand_total)+Number(result[i].total)
            
            dailyData.push(obj)
            slNo++;

          }
        
          
      } 

    }); //third query end

//========== FOR QUERY 4th ===================
      connection.query(qry3, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });

          }else{
            
          obj = {}
          obj['slNo'] = "";
          obj["receipt_date"]="";
          obj['receipt_id'] = "";
          obj["enroll_number"] = "";
          obj["name"] = "Fees Collection by Draft";
          obj['fee_slip_name'] = "";
          obj["class"] = "";
          obj["bank_name"] = "";
          obj["item_no"] = "";
          obj["mode"] = "";
          obj["amount_due"] = "";
          obj["fine"] = "";
          obj["scholorship_amount"] = "";
          obj["total"] = "";  
          dailyData.push(obj)
          obj = {}
          obj['slNo'] = "SlNo";
          obj["receipt_date"]="Date";
          obj['receipt_id'] = "Recpt No";
          obj["enroll_number"] = "Enrol No";
          obj["name"] = "Name";
          obj['fee_slip_name'] = "Month";
          obj["class"] = "Class";
          obj["bank_name"] = "Bank Name";
          obj["item_no"] = "Cheq No";
          obj["mode"] = "";
          obj["amount_due"] = "Fee";
          obj["fine"] = "Fine";
          obj["scholorship_amount"] = "Scholorship";
          obj["total"] = "Total";  
          dailyData.push(obj)

          var online_sub_total=0; 
          var sub_total_amount_due=0; 
          var sub_total_fine = 0;
          var sub_total_scholorship_amount = 0;
          var grand_amount_due = 0
          var  grand_total_fine = 0
          var  grand_scholorship_amount= 0
          var grand_total=0

          var slNo=1 
          console.log("result")
          console.log(result);
          for (var i=0; i<result.length; i++) {
            obj = {}
            obj['slNo'] = slNo;
            obj["receipt_date"]=result[i].receipt_date
            obj['receipt_id'] = result[i].receipt_id
            obj["enroll_number"] = result[i].enroll_number
            obj["name"] = result[i].name
            obj['fee_slip_name'] = result[i].fee_slip_name
            obj["class"] = result[i].class
            obj["bank_name"] = result[i].bank_name
            obj["item_no"] = result[i].item_no
            obj["mode"] = result[i].mode
            obj["amount_due"] = result[i].amount_due
            obj["fine"] = result[i].fine
            obj["scholorship_amount"] = result[i].scholorship_amount
            obj["total"] = result[i].total  

           sub_total_amount_due=Number(sub_total_amount_due) + Number(result[i].amount_due) 
           sub_total_fine = Number(sub_total_fine) +  Number(result[i].fine)
           sub_total_scholorship_amount = Number(sub_total_scholorship_amount) + Number(result[i].scholorship_amount)
           online_sub_total=Number(online_sub_total)+Number(result[i].total)
           
           grand_amount_due = Number(grand_amount_due) + Number(result[i].amount_due)
           grand_total_fine = Number(grand_total_fine) + Number(result[i].fine)
           grand_scholorship_amount= Number(grand_scholorship_amount) + Number(result[i].scholorship_amount)
           grand_total=Number(grand_total)+Number(result[i].total)
            
            dailyData.push(obj)
            slNo++;

          }
        
          
      } 

    }); //fourth query end  

//========== FOR QUERY 4th ===================
      connection.query(qry4, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });

          }else{
            
          obj = {}
          obj['slNo'] = "";
          obj["receipt_date"]="";
          obj['receipt_id'] = "";
          obj["enroll_number"] = "";
          obj["name"] = "Fees Collection by School";
          obj['fee_slip_name'] = "";
          obj["class"] = "";
          obj["bank_name"] = "";
          obj["item_no"] = "";
          obj["mode"] = "";
          obj["amount_due"] = "";
          obj["fine"] = "";
          obj["scholorship_amount"] = "";
          obj["total"] = "";  
          dailyData.push(obj)
          obj = {}
          obj['slNo'] = "SlNo";
          obj["receipt_date"]="Date";
          obj['receipt_id'] = "Recpt No";
          obj["enroll_number"] = "Enrol No";
          obj["name"] = "Name";
          obj['fee_slip_name'] = "Month";
          obj["class"] = "Class";
          obj["bank_name"] = "Bank Name";
          obj["item_no"] = "Cheq No";
          obj["mode"] = "";
          obj["amount_due"] = "Fee";
          obj["fine"] = "Fine";
          obj["scholorship_amount"] = "Scholorship";
          obj["total"] = "Total";  
          dailyData.push(obj)

          var online_sub_total=0; 
          var sub_total_amount_due=0; 
          var sub_total_fine = 0;
          var sub_total_scholorship_amount = 0;
          var grand_amount_due = 0
          var  grand_total_fine = 0
          var  grand_scholorship_amount= 0
          var grand_total=0

          var slNo=1 
          console.log("result")
          console.log(result);
          for (var i=0; i<result.length; i++) {
            obj = {}
            obj['slNo'] = slNo;
            obj["receipt_date"]=result[i].receipt_date
            obj['receipt_id'] = result[i].receipt_id
            obj["enroll_number"] = result[i].enroll_number
            obj["name"] = result[i].name
            obj['fee_slip_name'] = result[i].fee_slip_name
            obj["class"] = result[i].class
            obj["bank_name"] = result[i].bank_name
            obj["item_no"] = result[i].item_no
            obj["mode"] = result[i].mode
            obj["amount_due"] = result[i].amount_due
            obj["fine"] = result[i].fine
            obj["scholorship_amount"] = result[i].scholorship_amount
            obj["total"] = result[i].total  

           sub_total_amount_due=Number(sub_total_amount_due) + Number(result[i].amount_due) 
           sub_total_fine = Number(sub_total_fine) +  Number(result[i].fine)
           sub_total_scholorship_amount = Number(sub_total_scholorship_amount) + Number(result[i].scholorship_amount)
           online_sub_total=Number(online_sub_total)+Number(result[i].total)
           
           grand_amount_due = Number(grand_amount_due) + Number(result[i].amount_due)
           grand_total_fine = Number(grand_total_fine) + Number(result[i].fine)
           grand_scholorship_amount= Number(grand_scholorship_amount) + Number(result[i].scholorship_amount)
           grand_total=Number(grand_total)+Number(result[i].total)
            
            dailyData.push(obj)
            slNo++;

          }
        
          data.status = 's';
          data.dailyData = dailyData;
          res.send(data)  
      } 

    }); //5th query end        
         
    
     });  
















    });     
  });

});


//=========== read outstanding by class ===========

router.post('/read_outstanding_classwise', function(req, res, next) {
  var obj = JSON.parse(JSON.stringify(req.body));

  var section_id =  obj.section_id;
  var standard_id =  obj.standard_id;
  var month_id = obj.month_id
   var data = {}

    req.getConnection(function(err,connection){
     var from_date = ''
     var to_date = ''
     var condition = "";
     var session_id = req.cookies.session_id
     var qry_date =`select date_format(session_start_date, '%Y') as year from session_master where session_id = ${session_id}`;
     connection.query(qry_date, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
           
            var session_year = result[0].year;
            if(month_id<4){
              session_year++;
            }
             from_date = session_year + "-" + month_id + "-" + "01";
             to_date = session_year + "-" + month_id + "-" + "31"; 
        }
      
      var condition = "";
     var session_id = req.cookies.session_id

     if(standard_id == -1 && section_id== -1) condition = ``;
      else if(standard_id != -1 && section_id==-1) condition = `and f.standard_id=${standard_id}`;
      else if(standard_id==-1 && section_id!=-1)condition = `and f.standard_id=${standard_id} and f.section_id=${section_id}`;    
     
     
     var qry = `select e.student_id, gender,roll_number, enroll_number, concat(first_name, ' ', middle_name, ' ', last_name)as student_name,
        concat(standard,' ',section) as standard, f_name, f_mobile, mobile, total_amount as fees,
        last_date, fee_slip_name as month, f_add_l1, f_add_l2, concat(f_city,' - ',f_zip) as f_city, f_state
        from    
        fee_plan_student_map a
        JOIN fee_slip b on a.fee_plan_id = b.fee_plan_id
        JOIN fee_plan_master c on (a.fee_plan_id = c.fee_plan_id and c.session_id = (select session_id from session_master where session_id = ${session_id}))
        LEFT JOIN fee_received d on (a.fee_plan_id = d.fee_plan_id and a.student_id = d.student_id 
                and b.fee_slip_id = d.fee_slip_id)
        JOIN student_master e on (a.student_id = e.student_id and e.current_session_id = ${session_id})
        JOIN student_current_standing f on a.student_id = f.student_id
        JOIN section_master g on f.section_id = g.section_id
        JOIN standard_master h on g.standard_id = h.standard_id
        JOIN parent_master i on (a.student_id = i.student_id and i.current_session_id=${session_id})
        LEFT JOIN fee_scholorship j on (a.student_id = j.student_id and b.fee_slip_id = j.fee_slip_id)  
        where receipt_id is null
        and b.last_date <= '${to_date}'
        and b.last_date >= '${from_date}'
        and (e.withdraw='N' || e.withdraw_session > ${session_id})
        and f.session_id= ${session_id}
        ${condition}
        order by  g.section_id, student_name, b.fee_slip_id`;
     
     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );connection.query(qry, function(err, result)     
     {
            
        
     });
           data.status = 'e';

        }else{
            data.status = 's';
            data.outstandingFees = result;
            res.send(data)
        }
     
     });
       
  });
 });    
  
});
//========== read classwise advance fees ==========
router.post('/read_advance_classwise', function(req, res, next) {
  var obj = JSON.parse(JSON.stringify(req.body));

   var standard_id =  obj.standard_id;
   var data = {}
    req.getConnection(function(err,connection){
     var condition = "";
     var session_id = req.cookies.session_id
      if(standard_id == -1)   condition = ``;
      if(standard_id != -1)   condition = `and h.standard_id=${standard_id}`;
      //else "Invalid class section combination selected";
     var qry = `select concat(standard, ' ', section) as class, fee_slip_name, sum(total_amount) as fees
      from    
      fee_plan_student_map a
      JOIN fee_slip b on a.fee_plan_id = b.fee_plan_id
      JOIN fee_plan_master c on (a.fee_plan_id = c.fee_plan_id and c.session_id =  ${session_id})
      LEFT JOIN fee_received d on (a.fee_plan_id = d.fee_plan_id and a.student_id = d.student_id 
              and b.fee_slip_id = d.fee_slip_id)
      join fee_received_details m on  d.receipt_id = m.receipt_id
      JOIN student_master e on (a.student_id = e.student_id and e.current_session_id =${session_id})
      JOIN student_current_standing f on a.student_id = f.student_id
      JOIN section_master g on f.section_id = g.section_id
      JOIN standard_master h on g.standard_id = h.standard_id
      JOIN parent_master i on (a.student_id = i.student_id and i.current_session_id = ${session_id})
      LEFT JOIN fee_scholorship j on (a.student_id = j.student_id and b.fee_slip_id = j.fee_slip_id)  
      where receipt_date < b.last_date
      and (e.withdraw='N' || e.withdraw_session > ${session_id})
      and f.session_id= ${session_id}
     ${condition}
      group by class, fee_slip_name 
      order by g.section_id, b.fee_slip_id`;

    //console.log(qry)
     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
        var prev_class="";
        var prev_fee_slip_name="";
        var row_total="";
        var slNo=0;
        var error = 1;
        var total = 0
        var row_data = Array();
        var full_data = Array();
        var colNames ={}
        colNames['SlNo']='SlNo';
        colNames['Class']='Class';
        colNames['Apr']='Apr'; 
        colNames['May']='May';   
        colNames['Jun']='Jun';   
        colNames['Jul']='Jul';   
        colNames['Aug']='Aug';   
        colNames['Sep']='Sep';   
        colNames['Oct']='Oct';   
        colNames['Nov']='Nov';   
        colNames['Dec']='Dec';   
        colNames['Jan']='Jan';   
        colNames['FebMar']='FebMar';   
        colNames['Total']='Total';
        full_data.push(colNames);
    
    //totals
    var totals = {};
    var data={};
     totals['Apr'] = 0; 
     totals['May'] = 0;   
     totals['Jun'] = 0;   
     totals['Jul'] = 0;   
     totals['Aug'] = 0;   
     totals['Sep'] = 0;   
     totals['Oct'] = 0;   
     totals['Nov'] = 0;   
     totals['Dec'] = 0;   
     totals['Jan'] = 0;   
     totals['FebMar'] = 0;   
     totals['Total'] = 0;
    for(var i=0; i<result.length ; i++){
          error = 0;
        if(result[i].class!= prev_class){
          if(prev_class != "" ){
            data['SlNo'] = ++slNo;
            data["Total"] = Number(row_total)
            totals['Total'] =Number(totals['Total']) + Number(row_total)
            full_data.push(data);
            var data = {};
    

            row_total = 0;                                        
          }                         
        }
        prev_class = result[i].class;
        prev_fees =Number(result[i].fees);
        row_total =Number(row_total) + Number(result[i].fees)
        data['Class'] = result[i].class; 
        data[result[i].fee_slip_name] =result[i].fees;
        total = Number(total) + Number(result[i].fees);
        totals[result[i].fee_slip_name] =total
      }
       if(error == 0){  
            console.log("inside error 0")       
          data['SlNo'] = ++slNo;
          data["Total"] = Number(row_total)
          totals['Total'] =Number(totals['Total']) + Number(row_total)
          full_data.push(data);
          totals['SlNo'] = '';
          totals['Class'] = "Grand Total";
          full_data.push(totals);  
       }       
  
            
           
            var ytz={}
            ytz.status = 's';
            ytz.classWiseAdvanceFees = full_data;
            
           //connection.end()
            res.send(ytz)
        }
     
     });
       
  
    });    
  
});
//====================read_due_classwise ==========
router.post('/read_due_classwise', function(req, res, next) {
  var obj = JSON.parse(JSON.stringify(req.body));

   var standard_id =  obj.standard_id;
   var data = {}
    req.getConnection(function(err,connection){
     var condition = "";
     var session_id = req.cookies.session_id
      if(standard_id == -1)   condition = ``;
      if(standard_id != -1)   condition = `and h.standard_id=${standard_id}`;
      //else "Invalid class section combination selected";
     var qry = `select concat(standard, ' ', section) as class, fee_slip_name, sum(total_amount) as fees
        from    
        fee_plan_student_map a
        JOIN fee_slip b on a.fee_plan_id = b.fee_plan_id
        JOIN fee_plan_master c on (a.fee_plan_id = c.fee_plan_id and c.session_id =  ${session_id})
        LEFT JOIN fee_received d on (a.fee_plan_id = d.fee_plan_id and a.student_id = d.student_id 
                and b.fee_slip_id = d.fee_slip_id)
        JOIN student_master e on (a.student_id = e.student_id and e.current_session_id =${session_id})
        JOIN student_current_standing f on a.student_id = f.student_id
        JOIN section_master g on f.section_id = g.section_id
        JOIN standard_master h on g.standard_id = h.standard_id
        JOIN parent_master i on (a.student_id = i.student_id and i.current_session_id =${session_id})
        LEFT JOIN fee_scholorship j on (a.student_id = j.student_id and b.fee_slip_id = j.fee_slip_id)  
        where receipt_id is null
        and (b.fee_slip_id <= e.last_fee_slip_id or e.last_fee_slip_id is null)
        and (e.withdraw='N' || e.withdraw_session > ${session_id})
        and f.session_id= ${session_id}
        ${condition}
        group by standard, fee_slip_name 
        order by g.section_id, b.fee_slip_id`;

    //console.log(qry)
     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
            /*console.log("========= result ==========");
            console.log(result)*/
            var prev_class="";
        var prev_fee_slip_name="";
        var row_total="";
        var slNo=0;
        var error = 1;
        var total = 0;
        var row_data = Array();
        var full_data = Array();
        var colNames ={}
        colNames['SlNo']='SlNo';
        colNames['Class']='Class';
        colNames['Apr']='Apr'; 
        colNames['May']='May';   
        colNames['Jun']='Jun';   
        colNames['Jul']='Jul';   
        colNames['Aug']='Aug';   
        colNames['Sep']='Sep';   
        colNames['Oct']='Oct';   
        colNames['Nov']='Nov';   
        colNames['Dec']='Dec';   
        colNames['Jan']='Jan';   
        colNames['FebMar']='FebMar';   
        colNames['Total']='Total';
        full_data.push(colNames);
    
    //totals
    var totals = {};
    var data={};
     totals['Apr'] = 0; 
     totals['May'] = 0;   
     totals['Jun'] = 0;   
     totals['Jul'] = 0;   
     totals['Aug'] = 0;   
     totals['Sep'] = 0;   
     totals['Oct'] = 0;   
     totals['Nov'] = 0;   
     totals['Dec'] = 0;   
     totals['Jan'] = 0;   
     totals['FebMar'] = 0;   
     totals['Total'] = 0;
    for(var i=0; i<result.length ; i++){
          error = 0;
        if(result[i].class!= prev_class){
          if(prev_class != "" ){
            data['SlNo'] = ++slNo;
            data["Total"] = Number(row_total)
            totals['Total'] =Number(totals['Total']) + Number(row_total)
            full_data.push(data);
            var data = {};
    

            row_total = 0;                                        
          }                         
        }
        prev_class = result[i].class;
        prev_fees =result[i].fees;
        row_total =Number(row_total) + Number(result[i].fees)
        data['Class'] = result[i].class; 
        data[result[i].fee_slip_name] =result[i].fees;
        total = Number(total) + Number(result[i].fees);
        totals[result[i].fee_slip_name] =total
      }
       if(error == 0){  
            console.log("inside error 0")       
          data['SlNo'] = ++slNo;
          data["Total"] = Number(row_total)
          totals['Total'] = Number(totals['Total']) + Number(row_total);
          full_data.push(data);
          totals['SlNo'] = '';
          totals['Class'] = "Grand Total";
          full_data.push(totals);  
       }       

            var xyz = {}
            xyz.status = 's';
            xyz.classWiseDueFees = full_data;
            
           //connection.end()
            res.send(xyz)
        }
     
     });
       
  
    });    
  
});
//========== read estimated fees report ==============

router.post('/read_estimated_fees', function(req, res, next) {
  var obj = JSON.parse(JSON.stringify(req.body));

  var start_date = obj.start_date;
  var end_date =  obj.end_date;
  var section_id =  obj.section_id;
  var standard_id =  obj.standard_id;
   var data = {}
  req.getConnection(function(err,connection){
     var condition = "";
     var session_id = req.cookies.session_id

     if(standard_id == -1 && section_id== -1) condition = ``;
      else if(standard_id != -1 && section_id==-1) condition = `and f.standard_id=${standard_id}`;
      else if(standard_id==-1 && section_id!=-1)condition = `and f.standard_id=${standard_id} and f.section_id=${section_id}`;
      //else "Invalid class section combination selected";
      
     var qry = `select '' as total, '' as fees , '' as scholarship,
    sum(c.amount) as total_fees
    from
    (select * from fee_plan_student_map where session_id=${session_id}) a
    JOIN fee_slip b on (a.fee_plan_id = b.fee_plan_id )
    join fee_slip_details c on b.fee_slip_id = c.fee_slip_id
    join student_current_standing d on (a.student_id=d.student_id and a.session_id=d.session_id)
    join student_master e on ( d.student_id=e.student_id and e.current_session_id = ${session_id} and (withdraw='N' || withdraw_session > ${session_id} ))
    LEFT JOIN section_master f on d.section_id=f.section_id
    where b.last_date between ${start_date} and ${end_date} 
    ${condition}
    
    Union
    select 'Total' as total,sum(amount_due) as amount_due , 
                sum(if(scholorship_amount is not null, scholorship_amount, 0)) as scholarship_amount, '' as total_fees
                from fee_received a
                LEFT JOIN  fee_received_details b on a.receipt_id = b.receipt_id
                LEFT JOIN  fee_scholorship c on (a.student_id = c.student_id and a.fee_slip_id = c.fee_slip_id)
                LEFT JOIN  student_master e on (a.student_id = e.student_id  and e.current_session_id = ${session_id})
                LEFT JOIN  student_current_standing f on ( a.student_id = f.student_id  and a.session_id = f.session_id)
                LEFT JOIN  section_master g on f.section_id = g.section_id
                LEFT JOIN  fee_slip i on (a.fee_slip_id = i.fee_slip_id and a.fee_plan_id = i.fee_plan_id)   
                where i.last_date between ${start_date} and ${end_date}
              ${condition}
                and a.session_id=${session_id}
  group by total`;

    //console.log(qry)
     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
            /*console.log("========= result ==========");
            console.log(result)*/
            var total = 0;
            var stdData = []
            for(var i = 0;  i < result.length ; i++){
              var temp = {}
              if(result[i].total_fees !=""){
                temp['total'] = "TOTAL FEES";
                temp['total_fees'] = result[i].total_fees
                stdData.push(temp);
                total =Number(total) + Number(result[i].total_fees)
              }
              if(result[i].fees !==""){
                temp['total'] = "RECEIVED AMOUNT";
                temp['total_fees'] = result[i].fees
                stdData.push(temp);
                total =Number(total) - Number(result[i].fees)
              }
              if (result[i].scholarship != ""){
                 temp['total'] = "SCHOLARSHIP";
                 temp['total_fees'] = result[i].scholarship
                 stdData.push(temp);
                 total =Number(total) - Number(result[i].scholarship)
              }
               
            }
            temp = {}
            temp['total'] = "NET FEES DUE";
            temp['total_fees'] =total;
            stdData.push(temp)


            data.status = 's';
            data.estimatedFees = stdData;
            
           //connection.end()
            res.send(data)
        }
     
     });
       
  });

});
// ======== Read Bank Wise Fees =========
router.post('/read_bank_wise_fees', function(req, res, next) {
  var obj = JSON.parse(JSON.stringify(req.body));

  var start_date = obj.start_date;
  var end_date =  obj.end_date;
  var bank_id =  obj.bank_id;
  var mode =  obj.mode;
   var data = {}
  req.getConnection(function(err,connection){
     var condition = "";
     var session_id = req.cookies.session_id

     if(bank_id == -1 && mode== "All") condition = ``;
      else if(bank_id != -1 && mode=="Cash") condition = `and b.bank_id is NULL and b.mode='${mode}'`;
      else if(bank_id==-1 && mode=="Online")condition = `and b.mode='${mode}'`;
      else if(bank_id!=-1 && mode=="Online")condition = `and b.mode='${mode}' and b.bank_id='${bank_id}'`; 
      else if(bank_id == -1 && mode=="Bank") condition = `and b.mode='${mode}'`;
      else if(bank_id == -1 && mode=="Cheque") condition = `and b.mode='${mode}'`;
      else if(bank_id != -1 && mode=="Cheque") condition = `and b.mode='${mode}' and b.bank_id='${bank_id}'`;
      else if(bank_id != -1 && mode=="All") condition = `and b.bank_id = '${bank_id}'`;
      else if(bank_id != -1 && mode=="Bank") condition = `and b.bank_id = '${bank_id}' and b.mode='${mode}'`;
      
     var qry = `SELECT enroll_number, a.receipt_id, concat(first_name,' ', middle_name, ' ', last_name) as student_name,
        concat(standard, ' ', section) as class, coalesce(bank_name, 'School') as bank, mode, 
        coalesce(item_no, '') as item_no, date_format(receipt_date,'%d/%m/%Y')as receipt_date,  fee_slip_name, 
        amount_due as fees, fine_recevied as fine, coalesce(scholorship_amount, 0) as scholarship,
        (amount_due + fine_recevied - coalesce(scholorship_amount, 0)) as total 
        FROM fee_received a
        JOIN fee_received_details b on (a.receipt_id = b.receipt_id and b.receipt_date between ? and ? ${condition}) 
        JOIN student_master c on (a.student_id = c.student_id and c.current_session_id = ${session_id})
        JOIN student_current_standing d on (a.student_id = d.student_id and b.session_id=d.session_id)
        JOIN section_master e on d.section_id = e.section_id 
        JOIN standard_master f on e.standard_id = f.standard_id 
        LEFT JOIN bank_account_master g on b.bank_id = g.bank_account_no 
        LEFT JOIN fee_scholorship h on (a.fee_slip_id = h.fee_slip_id and a.student_id = h.student_id) 
        JOIN fee_slip i on a.fee_slip_id = i.fee_slip_id
        where b.session_id= ${session_id}
        order by receipt_date,  a.receipt_id,class, i.fee_slip_id`;

    console.log(qry)
     connection.query(qry,[start_date,end_date], function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
          //var data ={}
          console.log("result")
          console.log(result)
            data.status = 's';
            data.bankWiseFees = result;
            
           //connection.end()
            res.send(data)
        }
     
     });
       
  });

});
/* Read banks */

router.get('/read_banks', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     
     var qry = `select bank_account_no as bank_id, bank_name as bank 
                from bank_account_master 
                order by 2`;

     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.banks = result;
           //connection.end()
            res.send(data)
        }
     
     });

  });

});

/* Read Mode*/

router.get('/read_mode', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     
     var qry = `select mode from fee_received_details group by mode`;

     connection.query(qry, function(err, result)     
     {
            
        if(err){
           console.log("Error reading event : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.modes = result;
           //connection.end()
            res.send(data)
        }
     
     });

  });

});


router.get('/read_class_wise_report/:standard_id/:section_id/:session_id', function(req, res, next) {
  var standard_id = req.params.standard_id;
  var section_id = req.params.section_id;
  var session_id = req.params.session_id;
  console.log("HERE")

  req.getConnection(function(err,connection){
       
     var data = {}
     var condition = "";
     var created_by = req.cookies.user
     var active_session_id = req.cookies.session_id
     console.log(session_id)
     var category_condition="";

      if(standard_id == -1 && section_id==-1)   condition = "";

      if(standard_id != -1 && section_id==-1)   condition = ` and d.standard_id = ${standard_id} `;

      if(standard_id != -1 && section_id!=-1)   condition = ` and  d.standard_id= ${standard_id} and d.section_id= ${section_id} `;
     /*if(req.cookies.role != 'ADMIN') $condition = ` and created_by = '${created_by}' `;*/

     var roleCondition = "";

      if(req.cookies.role != "ADMIN") roleCondition = ` and a.created_by =  '${created_by}' `;

      if(req.cookies.role != "ADMIN" && condition !="") roleCondition = ` and  a.created_by = '${created_by}' `;


     var qry = `select category_name, count(*) as total
                from mentor a
                left join student_master b on (a.enroll_number = b.enroll_number and b.current_session_id = ${active_session_id} )
                left join student_current_standing c on (b.student_id = c.student_id and a.session_id = c.session_id and b.current_session_id = ${active_session_id} )
                left join section_master d on c.section_id = d.section_id
                left join standard_master f on d.standard_id = f.standard_id 
                join mentor_category_master e on a.category_id = e.category_id
                where a.session_id = ?
                ${condition} ${roleCondition}
                group by category_name `;

     connection.query(qry,[session_id], function(err, result)
     {
            
        if(err){
           console.log("Error reading Date Wise Case Report : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.class_wise_case_report = result;

            var grand_total=0;
            for (var i = result.length - 1; i >= 0; i--) {
               grand_total = grand_total+result[i].total;
             } 

            data.grand_total = grand_total; 
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


module.exports = router;
