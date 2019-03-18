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

router.post('/read_assessment_report', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);
  var data = {}
  var qry = '';
  var values_data = input.searchdata
  var exam_type_id =values_data.exam_type_id
  var min_marks =''
  var max_marks =''
  var standard_id =values_data.standard_id
  var range_data = input.searchdata.marksRangeArray
  var subjects = [];
  var sections = [];
  var graphData = [];

    req.getConnection(function(err,connection){
      range_data.map(c=>{
        if(qry == ''){
          qry =`SELECT  ${c.min_marks} as min_marks, ${c.max_marks} as max_marks, section_id, a.subject_id, subject_name, subject_short_name , count(marks) as count, section from 
                (SELECT a.section_id, student_id, subject_id, sum(marks)as marks,
                section, standard
                FROM marks_entry_master a
                join section_master b on a.section_id=b.section_id
                join standard_master c on b.standard_id=c.standard_id
                where exam_id in (${exam_type_id})
                and c.standard_id =${standard_id}
                and marks_grade is null
                group by a.section_id, subject_id, student_id
                ) a, subject_master b
                where a.subject_id = b.subject_id
                and marks between '${c.min_marks}' and '${c.max_marks}'
                group by subject_name,a.section_id`;
        }else{
          qry = qry+' UNION ALL '+`SELECT  ${c.min_marks} as min_marks, ${c.max_marks} as max_marks, section_id, a.subject_id, subject_name, subject_short_name , count(marks) as count, section from 
                (SELECT a.section_id, student_id, subject_id, sum(marks)as marks,
                section, standard
                FROM marks_entry_master a
                join section_master b on a.section_id=b.section_id
                join standard_master c on b.standard_id=c.standard_id
                where exam_id in (${exam_type_id})
                and c.standard_id =${standard_id}
                and marks_grade is null
                group by a.section_id, subject_id, student_id
                ) a, subject_master b
                where a.subject_id = b.subject_id
                and marks between '${c.min_marks}' and '${c.max_marks}'
                group by subject_name,a.section_id`;
        }
      }) 

      qry = `select min_marks, max_marks, section_id, subject_id, subject_name, subject_short_name , count, section
             from ( ` + qry + ` ) xx order by subject_id,section_id`
      
      console.log(qry)
      connection.query(qry,function(err,result)     {      
        if(err){
          console.log("Error reading Student : %s ",err );
          data.status = 'e';
        }else{


          var prev_subject_id = ''
          var obj = {}
          var sectionsObj = {}

          result.map(r=>{
            if(subjects.indexOf(r.subject_short_name)==-1){
              subjects.push(r.subject_short_name)
            }
            if(sections.indexOf(r.section)==-1){
              sections.push(r.section)
            }
            // var obj={}
            // obj[r.min_marks + '-' + r.max_marks + "|" + r.subject_short_name + "|" + r.section] = r.count;
            // graphData.push(obj)

            
            // if(prev_subject_id==''){//loop runs first time
            //   prev_subject_id=r.subject_id
            //   obj['subject_name']=r.subject_short_name
            //   obj['range']=r.min_marks + '-' + r.max_marks
            //   obj[r.section]=r.count
            // }else if(prev_subject_id==r.subject_id){
            //   obj['range']=r.min_marks + '-' + r.max_marks
            //   obj[r.section]=r.count
            // }else{
            //   graphData.push(obj)

            //   prev_subject_id=r.subject_id
            //   obj = {}
            //   obj['subject_name']=r.subject_short_name
            //   obj['range']=r.min_marks + '-' + r.max_marks
            //   obj[r.section]=r.count
            // }

          })   

          graphData.push(obj)

          var graphDataBlock=[]
          var tempArray =[]
          //converting data in blocks of 4
          var count=0
          subjects.map(g=>{
            count++
            if(count<=4){
              tempArray.push(g)
            }else{
              graphDataBlock.push({'subjects':tempArray})
              count=1
              tempArray =[]
              tempArray.push(g)
            }
          })
  
          graphDataBlock.push({'subjects':tempArray})


          // console.log(subjects)
          // console.log(sections)
          
          data.status = 's';
          data.sections = sections;
          data.subjects = graphDataBlock;
          data.graphData = result;
          res.send(data)
        }
      });
    });
  });


module.exports = router;
