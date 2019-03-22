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
                group by subject_id,a.section_id`;
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
          var sectionsObj = {}
          var graphData = []

          //getting unique subject and sections
          result.map(r=>{
            if(subjects.indexOf(r.subject_short_name)==-1){
              subjects.push(r.subject_short_name)
            }
            if(sections.indexOf(r.section)==-1){
              sections.push(r.section)
            }
          })   

          //data accoring to range
          // range_data.map(c=>{
          //     var obj = {}
          //     obj['range']=`${c.min_marks} - ${c.max_marks}`
          //     result.map(r=>{
                
          //       if(Number(c.min_marks)==Number(r.min_marks) && Number(c.max_marks)==Number(r.max_marks)){
          //         var s_name = r.subject_short_name + '|' + r.section
          //         obj[s_name] = r.count
          //       }

          //     })
          //     graphData.push(obj)
          // })


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


          //data according to subject

        /*  range_data.map(c=>{ //range
              graphDataBlock.map(sub=>{ //blocks of four
            

              var obj = {}
              obj['range']=`${c.min_marks} - ${c.max_marks}`

              sub.subjects.map(s=>{ //subjects
                
                var sectionsObj ={}
                sections.map(sec=>{ //sections

                  var sec_count=0
                  result.map(r=>{
                    
                    if(c.min_marks==r.min_marks && c.max_marks==r.max_marks && s==r.subject_short_name && sec==r.section){
                      sectionsObj[sec]=r.count
                      sec_count=1
                    }

                  })

                  if(sec_count==0) sectionsObj[sec]=''

                })

                obj[s]=sectionsObj

              })

              graphData.push(obj)
            })


          })
*/
           



          // console.log(subjects)
          // console.log(sections)
          
          data.status = 's';
          data.sections = sections;
          data.subjects = graphDataBlock;
          data.graphData = graphData;
          data.subject_first = subjects[0];
          res.send(data)
        }
      });
    });
  });


module.exports = router;
