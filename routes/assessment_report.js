var express = require('express');
var router = express.Router();

/* Read Exam Type listing. */
router.get('/exam-type/:standard_id', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select a.exam_type,a.exam_type_id
                from exam_type a
                join exam_scheme_standard_map b on a.scheme_id=b.scheme_id
                join exam_scheme_master c on a.scheme_id = c.scheme_id 
                where b.standard_id=${req.params.standard_id}
                and c.session_id = (select session_id from session_master where session_id = ${req.cookies.session_id})
                order by 2`;

         console.log(qry)
     
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
           res.send(JSON.stringify(data))
        }else{
            data.status = 's';
            data.examTypes = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

module.exports = router;
