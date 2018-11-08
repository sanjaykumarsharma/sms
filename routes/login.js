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
        var qry = 'SELECT username, "ADMIN" as role FROM user WHERE username ="'+input.username+'" and  password = md5("'+input.password+'") limit 1' ;
     }else{//login for employee
        var qry = 'select name, username, role from employees e ';
            qry = qry + 'join employee_role_map er on e.id=er.emp_id ';
            qry = qry + 'join roles r on er.role_id=r.id ';
            qry = qry + 'WHERE username ="'+input.username+'" and  password = md5("'+input.password+'") limit 1'
     }
     

     console.log('qry')

     connection.query(qry,function(err,result)     {
            
        if(err){

           console.log("Error login : %s ",err );
           data.status = 'e';

        }else{

        	//res.render('customers',{page_title:"Customers - Node.js",data:rows});
        	if(result.length==1){
            	var session_id=''
              connection.query('select session_id from session_master where is_current=1',function(err,sessions)     {
                    if(err){
                       console.log("Error getting session_id : %s ",err );
                       data.status = 'e';
                    }else{
                      // req.session.cookie.session_id = sessions[0]['session_id'];
                      console.log('session_id')
                      console.log(sessions[0]['session_id'])
                      session_id = sessions[0]['session_id']
                      console.log('session_id')
                      console.log(session_id)
                      jwt.sign({data}, 'secretkey', { expiresIn: '10h' }, (err, token) => {
                          res.cookie('token', token)
                          res.cookie('role', result[0]['role'])
                          res.cookie('session_id', session_id)
                          res.cookie('user', result[0].username)
                          res.cookie('role', result[0].role)

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

module.exports = router;
