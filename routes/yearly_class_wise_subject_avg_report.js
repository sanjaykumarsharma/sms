var express = require('express');
var router = express.Router();


router.get('/read_year_wise_class_subject_avg_report/:standard_id/:term_id', function(req, res, next) {

  req.getConnection(function(err,connection){
    var standard_id= req.params.standard_id;
    var data = {}
    var subjects = [];
    var sessions = [];
    var graphData = [];
     var qry = `select subject_id, subject_name, round(avg(total_marks)) as avg, session_name 
                from(
                SELECT a.student_id, a.subject_id, subject_name, sum(if(marks=-1,null,marks)) as total_marks, session_name, a.session_id
                FROM marks_entry_master a
                join subject_master b on a.subject_id = b.subject_id
                join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
                join exam_type d on e.exam_id = d.exam_type_id
                join section_master c on a.section_id=c.section_id
                join standard_master f on c.standard_id=f.standard_id
                join session_master g on a.session_id = g.session_id
                join student_master k on (a.student_id = k.student_id and a.session_id = k.current_session_id and k.withdraw ='N')
                where e.marking_type in ('N','NG')
                and f.standard_id= ${req.params.standard_id}
                and a.session_id in (5,6,7)
                and assessment ="${req.params.term_id}"
                group by subject_id, a.student_id, a.session_id) z 
                group by z.subject_id, z.session_id
                order by  z.subject_id, z.session_id`;

      console.log(qry)
     
      connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading category : %s ",err );
           data.status = 'e';
        }else{
          result.map(r=>{
            if(subjects.indexOf(r.subject_name)==-1){
              subjects.push(r.subject_name)
            }
            if(sessions.indexOf(r.session_name)==-1){
              sessions.push(r.session_name)
            }
            var obj={}
            if(standard_id ==8 || standard_id ==9 || standard_id ==10 || standard_id ==11){
              var percentage = 0;
              var percentage = Number(((r.avg/150)*100).toFixed(2));
              
              obj['subject_name'] = r.subject_name;
              obj['session_name'] = r.session_name;
              obj['percentage'] = r.avg + '  (' +percentage +'%)';
            }else{
              obj['subject_name'] = r.subject_name;
              obj['session_name'] = r.session_name;
              obj['percentage'] = r.avg ;
            }
            graphData.push(obj)
          })  
       
           var finalData=[]
           subjects.map(s=>{

               var obj = {}
               var session = {}
               graphData.map(d=>{
                 if(s==d.subject_name){
                  obj['subject_name']=d.subject_name
                  session[d.session_name]=d.percentage
                 }
               })
               obj['sessions']=session
               finalData.push(obj)
           })

           //order by session

            data.status = 's';
            data.sessions = sessions;
            data.subjects = subjects;
            data.graphData = finalData;
            res.send(data);
        }
     
     });
       
  });

});

module.exports = router;
