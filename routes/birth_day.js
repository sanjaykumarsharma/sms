var express = require('express');
var router = express.Router();
var multer = require('multer')



/* Search Student */

router.post('/read_birth_day', function(req, res, next) {
 var input = JSON.parse(JSON.stringify(req.body));
  var dayType = input.dayType
  var Type = input.type_id
  var session_id = req.cookies.session_id
  console.log("hi");
        
        if(dayType=='toDay'){
           var someDate = new Date();
           //var numberOfDaysToAdd = 1;
           //someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
            someDate.setDate(someDate.getDate()); 
           // console.log(someDate);
            var dd = someDate.getDate();
            var mm = someDate.getMonth() + 1;
            var y = someDate.getFullYear();

           var todayDate = y + '-'+ mm + '-'+ dd;
           var start_date=todayDate
           var end_date=todayDate
           console.log(todayDate);
        }
        if(dayType=='Tomorrow'){
             var someDate = new Date();
             var numberOfDaysToAdd = 1;
             someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
           // console.log(someDate);
            var dd = someDate.getDate();
            var mm = someDate.getMonth() + 1;
            var y = someDate.getFullYear();

           var tomorrowDate = y + '-'+ mm + '-'+ dd;
           var start_date=tomorrowDate
           var end_date=tomorrowDate
           console.log(tomorrowDate);
        }
        if(dayType=='Month'){
             var someDate = new Date();
             //var numberOfDaysToAdd = 1;
             someDate.setDate(someDate.getDate()); 
           // console.log(someDate);
            var sd = 01;
            var ed = 31;
            var mm = someDate.getMonth() + 1;
            var y = someDate.getFullYear();

           var month_start_date = y + '-'+ mm + '-'+ sd;
           var month_end_date=y + '-'+ mm + '-'+ ed;
          
            var start_date=month_start_date
            var end_date=month_end_date
            
            console.log(start_date);
            console.log(end_date);
        }

        if(dayType=='DateRange'){
           start_date = input.s_date
           end_date = input.e_date
            console.log(start_date);
            console.log(end_date);
        }



  req.getConnection(function(err,connection){
       
    var data = {}
    if(Type=='All'){
      var qry =`select a.student_id as id, a.enroll_number as enroll_id, b.standard as 'group', c.section as 'category', concat (first_name, ' ',middle_name,' ' ,last_name) as name, 'Student' as type,

        date_format(dob,'%d/%m/%Y') as dob, dob as date_of_birth

        from student_master a

        LEFT JOIN student_current_standing d on (a.student_id = d.student_id and a.current_session_id = ${session_id})

        LEFT JOIN section_master c on  d.section_id = c.section_id

        LEFT JOIN standard_master b on c.standard_id = b.standard_id

        where month(a.dob) between month('${start_date}') and month('${end_date}')

        and dayofmonth(a.dob) between dayofmonth('${start_date}') and dayofmonth('${end_date}')

        and dayofyear(a.dob) between dayofyear('${start_date}') and dayofyear('${end_date}')

        and d.session_id= ${session_id}

        and (a.withdraw='N' || a.withdraw_session > ${session_id})

        UNION ALL

        select emp_id as 'id', employee_id as enroll_id, b.designation as 'group', c.department_name as 'category', concat (first_name, ' ',middle_name,' ' ,last_name) as name, 'Teacher' as type , 

        date_format(dob,'%d/%m/%Y') as dob , dob as date_of_birth

        from employee a

        LEFT JOIN designation_master b on a.designation_id = b.designation_id

        LEFT JOIN department_master c on a.department_id = c.department_id 

        where month(a.dob) between month('${start_date}') and month('${end_date}')

        and dayofyear(concat(year(curDate()), '-',month(a.dob),'-', day(a.dob))) between dayofyear('${start_date}') and dayofyear('${end_date}')

        and a.is_active='Y'

        order by dob`;
      }else if(Type=='Student'){
        var qry=`select a.student_id as id, a.enroll_number as enroll_id, b.standard as 'group', c.section as 'category', concat (first_name, ' ',middle_name,' ' ,last_name) as name, 'Student' as type,

        date_format(dob,'%d/%m/%Y') as dob, dob as date_of_birth

        from student_master a

        LEFT JOIN student_current_standing d on (a.student_id = d.student_id and a.current_session_id = ${session_id})

        LEFT JOIN section_master c on  d.section_id = c.section_id

        LEFT JOIN standard_master b on c.standard_id = b.standard_id

        where month(a.dob) between month('${start_date}') and month('${end_date}')

        and dayofmonth(a.dob) between dayofmonth('${start_date}') and dayofmonth('${end_date}')

        and dayofyear(concat(year(curDate()), '-',month(a.dob),'-', day(a.dob))) between dayofyear('${start_date}') and dayofyear('${end_date}')

        and d.session_id=(select session_id from session_master where session_id = ${session_id})

        and (a.withdraw='N' || a.withdraw_session > ${session_id})

        order by dob`;
      }else if(Type=='Staff'){
        var qry=`select emp_id as 'id', employee_id as enroll_id, b.designation as 'group', c.department_name as 'category', concat (first_name, ' ',middle_name,' ' ,last_name) as name, 'Teacher' as type , 

        date_format(dob,'%d/%m/%Y') as dob, dob as date_of_birth

        from employee a

        LEFT JOIN designation_master b on a.designation_id = b.designation_id

        LEFT JOIN department_master c on a.department_id = c.department_id 

        where month(a.dob) between month('${start_date}') and month('${end_date}')

        and dayofyear(concat(year(curDate()), '-',month(a.dob),'-', day(a.dob))) between dayofyear('${start_date}') and dayofyear('${end_date}')

        and a.is_active='Y'

        order by dob`;
      }
    connection.query(qry,function(err,result)     {
         console.log(qry)   
      if(err){
        console.log("Error reading Birth Day Data : %s ",err );
        data.status = 'e';

      }else{
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.birthDayData = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});



module.exports = router;
