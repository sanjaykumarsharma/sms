var express = require('express');
var router = express.Router();


router.get('/read_subjects_for_yearly_class_wise_comparison_report/', function(req, res, next) {

  req.getConnection(function(err,connection){
    var data = {}
    var qry =`select subject_id,subject_name,subject_short_name,order_no,department_name,a.department_id
              from subject_master a
              LEFT JOIN department_master b on a.department_id=b.department_id order by 2`;

    console.log(qry)
    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading category : %s ",err );
        data.status = 'e';
      }else{
        data.status = 's';
        data.subjects = result;
        res.send(JSON.stringify(data))
      } 
    });     
  });
});

router.post('/read_yearly_class_wise_comparison_report', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  var data = {}
  var qry = '';
  var values_data = input.searchdata
  var term_id =values_data.term_id
  var subject_id =values_data.subject_id
  var min_marks =''
  var max_marks =''
  var range_data = input.searchdata.marksRangeArray
  var sessions = [];
  var sections = [];
  var graphData = [];

    req.getConnection(function(err,connection){
      range_data.map(c=>{
        if(qry == ''){
          qry =`SELECT ${c.min_marks} as min_marks, ${c.max_marks} as max_marks, sum(count) as count, standard, session_name
                from (
                SELECT  count(marks) as count, short_name as standard, a.session_name, a.standard_id, a.session_id
                from 
                (SELECT a.section_id, a.session_id, session_name,
                a.student_id, a.subject_id, e.standard_id, e.short_name, 
                round((sum(marks)/sum(max_marks)*100))as marks, section
                FROM marks_entry_master a
                join marks_setting b on (a.exam_id = b.exam_id )
                join exam_type c on b.exam_id = c.exam_type_id
                join section_master d on a.section_id=d.section_id
                join standard_master e on d.standard_id=e.standard_id
                join session_master f on a.session_id = f.session_id
                join student_master g on (a.student_id = g.student_id and a.session_id = g.current_session_id and g.withdraw ='N')
                where a.subject_id = ${subject_id}
                and e.standard_id >=4 and e.standard_id <=15
                and marking_type in('NG','N')
                and a.session_id in (5,6,7)
                and assessment ="${term_id}"
                group by a.section_id, a.session_id, a.student_id
                ) a, session_master b
                where a.session_id = b.session_id
                and marks between '${c.min_marks}' and '${c.max_marks}'
                group by a.section_id, a.session_id
                ) z
                group by z.standard_id, z.session_id
                order by z.session_id,z.standard_id`;
        }else{
          qry = qry+' UNION ALL '+`SELECT ${c.min_marks} as min_marks, ${c.max_marks} as max_marks, sum(count) as count, standard, session_name
                from (
                SELECT  count(marks) as count, short_name as standard, a.session_name, a.standard_id, a.session_id
                from 
                (SELECT a.section_id, a.session_id, session_name,
                a.student_id, a.subject_id, e.standard_id, e.short_name, 
                round((sum(marks)/sum(max_marks)*100))as marks, section
                FROM marks_entry_master a
                join marks_setting b on (a.exam_id = b.exam_id )
                join exam_type c on b.exam_id = c.exam_type_id
                join section_master d on a.section_id=d.section_id
                join standard_master e on d.standard_id=e.standard_id
                join session_master f on a.session_id = f.session_id
                join student_master g on (a.student_id = g.student_id and a.session_id = g.current_session_id and g.withdraw ='N')
                where a.subject_id = ${subject_id}
                and e.standard_id >=4 and e.standard_id <=15
                and marking_type in('NG','N')
                and a.session_id in (5,6,7)
                and assessment ="${term_id}"
                group by a.section_id, a.session_id, a.student_id
                ) a, session_master b
                where a.session_id = b.session_id
                and marks between '${c.min_marks}' and '${c.max_marks}'
                group by a.section_id, a.session_id
                ) z
                group by z.standard_id, z.session_id
                order by z.session_id,z.standard_id`;
        }
      })
      qry = `select min_marks, max_marks, section_id, subject_id, subject_name , count, section
             from ( ` + qry + ` ) xx order by subject_id,section_id`
      
      console.log(qry)
      connection.query(qry,function(err,result)     {      
        if(err){
          console.log("Error reading Class Wise Comparison report : %s ",err );
          data.status = 'e';
        }else{
          result.map(r=>{
            if(sessions.indexOf(r.session_name)==-1){
              sessions.push(r.session_name)
            }
            if(sections.indexOf(r.section)==-1){
              sections.push(r.section)
            }

            var obj={}
            obj[r.min_marks + '-' + r.max_marks + "|" + r.session_name + "|" + r.section] = r.count;
            graphData.push(obj)
          })   
          // console.log(subjects)
          // console.log(sections)
          console.log(graphData)
          data.status = 's';
          data.sections = sections;
          data.sessions = sessions;
          data.graphData = graphData;
          res.send(data)
        }
      });
    });
  });




module.exports = router;
