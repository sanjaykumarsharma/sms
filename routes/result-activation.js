var express = require('express');
var router = express.Router();

// read classes
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select a.standard_id,standard, b.section_id, 
                section,active_section  
                from standard_master a
                join section_master b on a.standard_id = b.standard_id
                order by 1`;

     console.log(qry)
     
     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading class for activation : ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
        }else{
            data.status = 's';
            data.classes = result;
            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

// update
router.post('/update', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  console.log(input);

  req.getConnection(function(err,connection){

        var today = new Date();
        var data = {}
        var sql = '';

        //var qry = `update section_master set active_section='${input.active_section}' where section_id=${input.section_id}`;

        input.map(c=>{
        if(sql == ''){
          sql = `update section_master set active_section='${c.active_section}'
                 where section_id='${c.section_id}'`;
        }else{
          sql = sql+';'+`update section_master set active_section='${c.active_section}'
                where section_id='${c.section_id}'`;
        }
      }) 
        console.log(sql);
        
        connection.query(sql, function(err, rows)
        {
  
          if(err){
           console.log("Error updating marks activation : ",err );
           data.status = 'e';
           data.error = err
           data.messaage = err.sqlMessage
           res.send(JSON.stringify(data))
	      }else{
	            data.status = 's';
	            res.send(JSON.stringify(data))
	      }
          
        });


   });

});
 

module.exports = router;
