var express = require('express');
var router = express.Router();

/* Read Student */

router.post('/read_student', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var student_name = input.student_name
  var session_id = req.cookies.session_id
  req.getConnection(function(err,connection){
       
    var data = {}
    var qry =`select a.student_id, b.standard, c.standard_id, c.section_id, c.section, title, first_name,middle_name, last_name,
              concat(first_name,' ',middle_name, ' ' ,last_name)as name,
              enroll_number,roll_number, reg_number, mobile, f_title, f_name,house_name as house,
              concat(standard,' ',section)as class
              from student_master a
              JOIN student_current_standing d on (a.student_id = d.student_id and a.current_session_id= ${session_id} )
              JOIN section_master c  on d.section_id = c.section_id
              JOIN standard_master b on c.standard_id = b.standard_id
              JOIN parent_master f  on (a.student_id = f.student_id  and f.current_session_id= ${session_id} )
              LEFT JOIN house_master g  on  d.house_id=g.house_id
              where (first_name like '%${student_name}%' || middle_name like '%${student_name}%' || last_name like '%${student_name}%')
              and (a.withdraw='N' || a.withdraw_session > ${session_id} )
              and d.session_id= ${session_id}
              order by first_name,middle_name,last_name `;
/*    console.log(qry);*/
    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.students = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Student Details */

router.get('/read_student_details/:student_id', function(req, res, next) {

  var student_id = req.params.student_id;
  var session_id = req.cookies.session_id

  req.getConnection(function(err,connection){
       
     var data = {}

     var qry = `select a.student_id, b.standard, b.standard_id, g.section_id, g.section, d.house_id, 
                d.house_name,  title, first_name,middle_name, last_name, enroll_number, roll_number,
                reg_number,gender, date_format(dob,'%d/%m/%Y') as dob,
                date_format(doa,'%d/%m/%Y') as doa, date_format(doj,'%d/%m/%Y') as doj,
                hobby, a.blood_group, nationality, aadhar_no,
                p_add_l1, p_add_l2, p_city, p_zip, p_state, p_country,f_name,
                mobile, email
                from student_master a
                LEFT JOIN student_current_standing i on (a.student_id = i.student_id and a.current_session_id= ${session_id} )
                LEFT JOIN section_master g on i.section_id = g.section_id
                LEFT JOIN standard_master b on g.standard_id = b.standard_id 
                LEFT JOIN house_master d on i.house_id = d.house_id
                JOIN parent_master f on (a.student_id = f.student_id and f.current_session_id = ${session_id})  
                join session_master y on a.current_session_id = y.session_id 
                where a.student_id = ${student_id}
                and i.session_id = ${session_id}
                order by first_name, middle_name, last_name`;
     console.log(qry);
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Student Details : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.student_details = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


module.exports = router;
