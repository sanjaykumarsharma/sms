var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

router.get('/roles', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT distinct role FROM employee_role',function(err,result)     {
            
        if(err){
           console.log("Error reading roles : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.roles = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* GET users listing. */
router.post('/login', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
       
     var data = {}


     //login for admin
      if(input.role=='ADMIN'){
        var qry = `SELECT username, "ADMIN" as role FROM user WHERE username ="${input.username}" and  password = md5("${input.password}") limit 1` ;
     }else if(input.role=='Teacher'){
        var qry = `select employee_id as username, "Teacher" as role, emp_id, concat(first_name,' ',middle_name,' ',last_name)as name 
                  from employee 
                  where emp_type_id = 14
                  and status = 1
                  and employee_id = "${input.username}" 
                  and password= md5("${input.password}")
                  ` ;
     }else if(input.role=='Class Teacher'){
        var qry = `select employee_id as username,section_id, "Class Teacher" as role, a.emp_id, concat(first_name,' ',middle_name,' ',last_name)as name 
                from employee a
                JOIN class_teacher_section b on a.emp_id=b.class_teacher
                and b.session_id = (select session_id from session_master where is_current=1)
                where emp_type_id = 14
                and status = 1
                and is_active="Y"
                and  employee_id = "${input.username}" 
                and password= md5("${input.password}")
                ` ;
     }else{//login for employee
        var qry =`select e.employee_id as username, role,e.emp_id
                  from employee e 
                  join employee_role er on e.employee_id=er.employee_id
                  WHERE e.employee_id ="${input.username}" 
                  and  password = md5("${input.password}")
                  and role="${input.role}"
                  and e.status = 1
                  limit 1 `;
     }
     

     //console.log(qry)

     connection.query(qry,function(err,result)     {
            
        if(err){

           console.log("Error login : %s ",err );
           data.status = 'e';

        }else{

        	//res.render('customers',{page_title:"Customers - Node.js",data:rows});
        	if(result.length==1){
            	var session_id=''
              connection.query('select session_id, session_name from session_master where is_current=1',function(err,sessions)     {
                    if(err){
                       console.log("Error getting session_id : %s ",err );
                       data.status = 'e';
                    }else{
                      // req.session.cookie.session_id = sessions[0]['session_id'];
                      /*console.log('session_id')
                      console.log(sessions[0]['session_id'])*/
                      session_id = sessions[0]['session_id']
                      console.log("session name = "+ sessions[0]['session_name'])
                      session_name = sessions[0]['session_name']
                      console.log('session_id')
                      console.log(session_id)
                      jwt.sign({data}, 'secretkey', { expiresIn: '10h' }, (err, token) => {
                          res.cookie('token', token)
                          res.cookie('role', result[0].role)
                          res.cookie('session_id', session_id)
                          res.cookie('session_name', session_name)
                          res.cookie('user', result[0].username)
                          res.cookie('emp_id', result[0].emp_id)
                          res.cookie('section_id', result[0].section_id)
                          //res.cookie('role', result[0].role)

                          res.json({
                              status:'s',
                              token: token,
                              result: result[0],
                          });
                      });
                    }
                });

        	}else{
				data.status = 'e';   
				res.send(JSON.stringify(data))     		
        	}

            
        }
     
     });
       
  });

});

router.get('/logout', function(req, res, next) {
  
  // console.log('Cookies: ', req.cookies.token)
  // res.clearCookie('token')
  // console.log('Cookies after clear: ', req.cookies.token)
  res.clearCookie('token');
  res.clearCookie('role');
  var data = {};
  data.status = 's';   
  res.send(JSON.stringify(data))        

});

router.post('/change-password', function(req, res, next) {
  //ALTER TABLE user CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `update user set password=md5('${input.new_password}')
                where  username='${req.cookies.user}' and password=md5('${input.old_password}')`;
     connection.query(qry,function(err,result){
            
        if(err){
           console.log("Error changing password : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.rows = result.affectedRows;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

module.exports = router;
