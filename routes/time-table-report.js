var express = require('express');
var router = express.Router();

/* Read Course listing. */
router.get('/', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = `select p.teacher_id,concat(p.first_name,'  ',p.middle_name,' ',p.last_name) as teacher, 
                subject_short_name,subject_name, concat(standard,'  ',section) as standard, period_name from

                (SELECT section_id,period_id,day_id,a.subject_id,period_type,teacher_id,first_name,middle_name,last_name
                from time_table_substitution a 
                JOIN employee b on a.teacher_id =b.emp_id
                WHERE not EXISTS ( select *  from time_table b
                where a.section_id=b.section_id and 
                a.period_id=b.period_id and 
                a.day_id=b.day_id and 
                a.period_type=b.period_type and 
                a.teacher_id=b.teacher_id)
                and a.substitution_date = curdate()
                order by first_name,middle_name,last_name) p

                left join subject_master q on p.subject_id = q.subject_id
                left join period_master r on p.period_id = r.period_id
                left join section_master s on p.section_id= s.section_id
                left join standard_master t on s.standard_id= t.standard_id`;

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading summaries : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            
            
            var temp_summaries = []
            var prev_teacher_id = 0
            var prev_teacher = ''
            var obj = []
            var loop = {}

            result.map(r=>{
              if(prev_teacher_id==0){//loop runs first time

                prev_teacher_id = r.teacher_id
                prev_teacher = r.teacher
                obj.push(r)
                loop['teacher'] = r.teacher

              }else if(prev_teacher_id==r.teacher_id){

                obj.push(r)
                prev_teacher_id = r.teacher_id
                prev_teacher = r.teacher

              }else if(prev_teacher_id!=r.teacher_id){
                
                loop['details'] = obj
                temp_summaries.push(loop)
                obj = []
                obj.push(r)
                loop = {}
                loop['teacher'] = r.teacher
                prev_teacher_id = r.teacher_id
                prev_teacher = r.teacher

              }
            })
            loop['details'] = obj
            temp_summaries.push(loop)

            data.summaries = temp_summaries;
            res.send(data)
        }
     
     });
       
  });

});

router.get('/details', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     var qry = ` select teacher,absent_teacher,period_name, standard from

                (select p.teacher_id, p.period_id, p.day_id, concat(p.first_name,'  ',p.middle_name,' ',p.last_name) as teacher, 
                subject_name, concat(standard,'  ',section) as standard, period_name,
                p.subject_id, p.period_type from

                (SELECT section_id,a.period_id,a.day_id,a.subject_id,period_type,teacher_id,first_name,middle_name,last_name
                from time_table_substitution a 
                JOIN employee b on a.teacher_id =b.emp_id
                WHERE not EXISTS ( select *  from time_table b
                where a.section_id=b.section_id and 
                a.period_id=b.period_id and 
                a.day_id=b.day_id and 
                a.period_type=b.period_type and 
                a.teacher_id=b.teacher_id)
                and a.substitution_date = curdate()
                order by first_name,middle_name,last_name) p

                left join subject_master q on p.subject_id = q.subject_id
                left join period_master r on p.period_id = r.period_id
                left join section_master s on p.section_id= s.section_id
                left join standard_master t on s.standard_id= t.standard_id) y

                left join

                (select distinct a.period_id, a.day_id, a.teacher_id, concat(first_name,'  ',middle_name,' ',last_name) as absent_teacher,
                a.subject_id, period_type
                from time_table a
                join employee b on a.teacher_id=b.emp_id
                and a.session_id=${req.cookies.session_id}
                and not EXISTS (select * from time_table_substitution z
                where a.section_id=z.section_id and 
                a.period_id=z.period_id and 
                a.day_id=z.day_id and 
                a.period_type=z.period_type and 
                a.teacher_id=z.teacher_id) ) z on (y.day_id=z.day_id and y.period_id=z.period_id and y.subject_id=z.subject_id and y.period_type=z.period_type)`;

                console.log(qry)

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading summaries : %s ",err );
           data.status = 'e';

        }else{
            data.status = 's';
            data.details = result;
            res.send(data)
        }
     
     });
       
  });

});



module.exports = router;
