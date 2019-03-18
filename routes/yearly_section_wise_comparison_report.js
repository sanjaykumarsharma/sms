var express = require('express');
var router = express.Router();


router.get('/read_subjects/:standard_id', function(req, res, next) {
  var standard_id = req.params.standard_id
  var session_id = req.cookies.session_id
  req.getConnection(function(err,connection){
    var data = {}
    var qry =`select distinct b.session_id, b.subject_id, subject_name
              from student_group a 
              JOIN group_subject_map b on (a.group_id=b.group_id and b.session_id= ${session_id})
              JOIN  subject_master c on b.subject_id=c.subject_id 
              where a.standard_id= ${standard_id}
              order by subject_name`;

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

router.post('/read_yearly_section_wise_comparison_report', function(req, res, next) {

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
  var standard_id =values_data.standard_id
  var range_data = input.searchdata.marksRangeArray
  var sessions = [];
  var sections = [];
  var graphData = [];

    req.getConnection(function(err,connection){
      range_data.map(c=>{
        if(qry == ''){
          qry =`SELECT  count(marks) as count, section, a.session_name from 
                (SELECT a.section_id, a.session_id, session_name,
                a.student_id, a.subject_id, 
                round((sum(marks)/sum(max_marks)*100))as marks, section
                FROM marks_entry_master a
                join marks_setting b on (a.exam_id = b.exam_id )
                join exam_type c on b.exam_id = c.exam_type_id
                join section_master d on a.section_id=d.section_id
                join standard_master e on d.standard_id=e.standard_id
                join session_master f on a.session_id = f.session_id
                join student_master g on (a.student_id = g.student_id and a.session_id = g.current_session_id and g.withdraw ='N')
                where a.subject_id = ${subject_id}
                and e.standard_id =${standard_id}
                and marking_type in('NG','N')
                and a.session_id in (5,6,7)
                and assessment ="${term_id}"
                group by a.section_id, a.session_id, a.student_id
                ) a, session_master b
                where a.session_id = b.session_id
                and marks between '${c.min_marks}' and '${c.max_marks}'
                group by a.section_id, a.session_id
                order by b.session_id,a.section_id`;
        }else{
          qry = qry+' UNION ALL '+`SELECT  count(marks) as count, section, a.session_name from 
                (SELECT a.section_id, a.session_id, session_name,
                a.student_id, a.subject_id, 
                round((sum(marks)/sum(max_marks)*100))as marks, section
                FROM marks_entry_master a
                join marks_setting b on (a.exam_id = b.exam_id )
                join exam_type c on b.exam_id = c.exam_type_id
                join section_master d on a.section_id=d.section_id
                join standard_master e on d.standard_id=e.standard_id
                join session_master f on a.session_id = f.session_id
                join student_master g on (a.student_id = g.student_id and a.session_id = g.current_session_id and g.withdraw ='N')
                where a.subject_id = ${subject_id}
                and e.standard_id =${standard_id}
                and marking_type in('NG','N')
                and a.session_id in (5,6,7)
                and assessment ="${term_id}"
                group by a.section_id, a.session_id, a.student_id
                ) a, session_master b
                where a.session_id = b.session_id
                and marks between '${c.min_marks}' and '${c.max_marks}'
                group by a.section_id, a.session_id
                order by b.session_id,a.section_id`;
        }
      })
      
      console.log(qry)
      connection.query(qry,function(err,result)     {      
        if(err){
          console.log("Error reading Student : %s ",err );
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
