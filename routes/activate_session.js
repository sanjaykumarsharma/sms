var express = require('express');
var router = express.Router();


/* Read Session listing. */
router.get('/read_session', function(req, res, next) {
  var session_id = req.cookies.session_id

  req.getConnection(function(err,connection){
       
     var data = {}
     
     var qry = `select session_id,session_name,date_format(session_start_date, '%d/%m/%Y') as session_start_date,
                date_format(session_end_date, '%d/%m/%Y') as session_end_date,is_current, 'No' as is_active
                from session_master 
                order by 1 desc `
      connection.query(qry,function(err,result)     {
        console.log(result)
        
        for(var i = 0; i < result.length; i++){
          var session_id = result[i].session_id;
          if(result[i].is_current == 1){
            result[i].is_active = 'Yes';
            session_id = result[i].session_id;
          }
        }
            
        if(err){
          console.log("Error reading session : %s ",err );
          data.status = 'e';
        }else{
        	// res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.sessions = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});


/* Marked as current session*/
router.get('/current_session/:session_id', function(req, res, next) {

  var session_id = req.params.session_id;

  req.getConnection(function(err,connection){
        var data = {}
        var old_session=0;
        var current=1;
        var query = connection.query("UPDATE session_master set is_current= ?",[old_session], function(err, rows)
        {
          if(err){
           console.log("Error updating session : %s ",err );
           data.status = 'e';

         }else{
              data.status = 's';
              //res.send(JSON.stringify(data))
          }
        });

          var query1 =connection.query("UPDATE session_master set is_current= ? WHERE session_id = ?",[current,session_id], function(err, rows)
            {
              console.log(query1);
              if(err){
               console.log("Error updating session : %s ",err );
               data.status = 'e';

              }else{
                data.status = 's';
                res.send(JSON.stringify(data))
              }
          });
   });

});


module.exports = router;
