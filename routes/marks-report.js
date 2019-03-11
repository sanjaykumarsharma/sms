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

router.post('/consolidate_tabulation_sheet_csv', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var session_name = req.cookies.session_name
  req.getConnection(function(err,connection){

    var data = {}
    var std = Array();
    var headers = input.headers;
    var reports = input.reports;
    console.log(headers)
    console.log(reports)
    var slips = [1];
    async.forEachOf(slips, function (value, key, callback) {

      for(var i = 0; i < reports.length; i++){
        var obj = {};
        obj['Roll No'] = reports[i].roll_number;
        obj['Enroll No'] = reports[i].enroll_number;
        obj['Student Name'] = reports[i].student_name;
        std.push(obj);
      }
      data.status = 's';
      const fields = ['Roll No','Enroll No','Student Name'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(std);
      var path='./public/csv/consolidatedReport.csv'; 
      data.url = '/csv/consolidatedReport.csv';

      fs.writeFile(path, csv, function(err,data) {
        if (err) {
          throw err;
        }else{ 
          callback() 
        }
      });        
    },function (err) {
      if (err) {
        console.error(err.message);
        data.status = 'e';
        res.send(data)
      }
        data.status = 's';
        res.send(data)
    });   
  });

});


// reade marks entries
router.get('/marks-entries/:exam_type_id/:section_id', function(req, res, next) {

  req.getConnection(function(err,connection){
    var data = {}

    var headers =`select distinct b.subject_id,subject_short_name, min_marks,max_marks
                from marks_entry_master a
                join subject_master b on a.subject_id=b.subject_id 
                join marks_setting c on (a.subject_id=c.subject_id and a.exam_id=c.exam_id and a.section_id=c.section_id)
                where a.section_id=${req.params.section_id}
                and a.exam_id=${req.params.exam_type_id}
                and a.session_id=${req.cookies.session_id}
                order by subject_short_name`;

    var marks = `select * from
              (select d.subject_id,a.student_id, roll_number, enroll_number,
              concat(b.first_name,' ',b.middle_name,' ',b.last_name)as student_name,
              subject_short_name,if(marks = -1,'AB',marks)as marks ,''as grade, e.max_marks,e.min_marks, marking_type,grand_total
              from marks_entry_master a
              join student_master b on (a.student_id=b.student_id and b.current_session_id = ${req.cookies.session_id})
              join student_current_standing c on (b.student_id=c.student_id and a.session_id=c.session_id and b.current_session_id =${req.cookies.session_id}) 
              join subject_master d on a.subject_id=d.subject_id
              join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
              where a.section_id=${req.params.section_id}
              and a.exam_id=${req.params.exam_type_id}
              and e.marking_type='N'
              and a.session_id= ${req.cookies.session_id}

              UNION

              select d.subject_id,a.student_id, roll_number, enroll_number,
              concat(b.first_name,' ',b.middle_name,' ',b.last_name)as student_name,
              subject_short_name,'' as marks, marks_grade as grade, e.max_marks,e.min_marks, marking_type,grand_total
              from marks_entry_master a
              join student_master b on (a.student_id=b.student_id and b.current_session_id = ${req.cookies.session_id})
              join student_current_standing c on (b.student_id=c.student_id and a.session_id=c.session_id and b.current_session_id = ${req.cookies.session_id}) 
              join subject_master d on a.subject_id=d.subject_id
              join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
              where a.section_id=${req.params.section_id}
              and a.exam_id=${req.params.exam_type_id}
              and e.marking_type='G'
              and a.session_id= ${req.cookies.session_id}

              UNION

              select d.subject_id,a.student_id, roll_number, enroll_number,
              concat(b.first_name,' ',b.middle_name,' ',b.last_name)as student_name,
              subject_short_name,if(marks = -1,'AB',marks)as marks , i.grade as grade,e.max_marks,e.min_marks, marking_type,grand_total
              from marks_entry_master a
              join student_master b on (a.student_id=b.student_id and b.current_session_id = ${req.cookies.session_id})
              join student_current_standing c on (b.student_id=c.student_id and a.session_id=c.session_id and b.current_session_id=${req.cookies.session_id})
              join subject_master d on a.subject_id=d.subject_id
              join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
              join grade_master i on a.grade_id = i.grade_id
              where a.section_id=${req.params.section_id}
              and a.exam_id=${req.params.exam_type_id}
              and e.marking_type='NG'
              and a.session_id= ${req.cookies.session_id}) z  
              order by z.student_id`;

    var clasTeacher = `select concat(first_name,' ',middle_name,' ',last_name)as class_teacher
                      from employee a
                      join class_teacher_section b on a.emp_id = b.class_teacher
                      where section_id=${req.params.section_id}
                      and b.session_id = ${req.cookies.session_id} limit 1`;

    var qry = headers+';'+marks+';'+clasTeacher;          

        connection.query(qry,function(err,results){
                
            if(err){
               console.log("Error reading report : %s ",err );
               data.status = 'e';

            }else{
                data.status = 's';
                
                //creating headers according to subject
                var headers={}
                results[0].map(r=>{
                  headers[r.subject_id] = r.subject_short_name + " ("+r.min_marks+"/"+r.max_marks+")"
                })
                   
                //creating marks according to student and subject
                var prev_student_id = "";
                var maxMarks=0;
                var marksObtained=0;
                var obj = {}
                var subjects = {} //subjects_marks
                var marksData = []

                results[1].map(r=>{

                  if(prev_student_id != r.student_id){ //check for different student

                     if(prev_student_id == ""){      // loop runs first time only
                        prev_student_id= r.student_id;
                        obj['roll_number']=r.roll_number;
                        obj['enroll_number']=r.enroll_number;
                        obj['student_name']=r.student_name;
                        
                        if(r.marking_type == 'N') subjects[r.subject_id]= r.marks;
                        if(r.marking_type == 'G') subjects[r.subject_id]= r.grade;
                        if(r.marking_type == 'NG') subjects[r.subject_id]= r.marks+"(" +r.grade +")";

                        if(r.grand_total=='Y'){
                          maxMarks= Number(maxMarks) + Number(r.max_marks);
                          marksObtained= Number(marksObtained) + Number(r.marks);
                        }

                     }else{

                        obj['total']= marksObtained + "/" + maxMarks;
                        obj['percentage']= ((Number(marksObtained)*100)/Number(maxMarks)).toFixed(2)+"%"
                        obj['subjects']=subjects
                        marksData.push(obj);

                        maxMarks=0;
                        marksObtained=0;
                        prev_student_id= r.student_id;
                        obj = {};
                        obj['roll_number']=r.roll_number;
                        obj['enroll_number']=r.enroll_number;
                        obj['student_name']=r.student_name;
                        
                        subjects = {}
                        if(r.marking_type == 'N') subjects[r.subject_id]= r.marks;
                        if(r.marking_type == 'G') subjects[r.subject_id]= r.grade;
                        if(r.marking_type == 'NG') subjects[r.subject_id]= r.marks+"(" +r.grade +")";        
                        if(r.grand_total=='Y'){
                          maxMarks= Number(maxMarks) + Number(r.max_marks);
                          marksObtained= Number(marksObtained) + Number(r.marks);
                        }

                     }

                  }else{

                    prev_student_id= r.student_id;
                    if(r.marking_type == 'N') subjects[r.subject_id]= r.marks;
                    if(r.marking_type == 'G') subjects[r.subject_id]= r.grade;
                    if(r.marking_type == 'NG') subjects[r.subject_id]= r.marks+"(" +r.grade +")";
                    if(r.grand_total=='Y'){
                      maxMarks= Number(maxMarks) + Number(r.max_marks);
                      marksObtained= Number(marksObtained) + Number(r.marks);
                    }

                  }

                })//loop ends here

                obj['total']= marksObtained + "/" + maxMarks;
                obj['percentage']= ((Number(marksObtained)*100)/Number(maxMarks)).toFixed(2)+"%"
                obj['subjects']=subjects
                marksData.push(obj);      

                //arranging subjects marks in same order as header

                
                marksData.map(r=>{

                  var orderedSubjects={}
                  Object.keys(headers).map(h=>{

                    var flag = true;
                    Object.keys(r.subjects).map(s=>{

                      if(Number(h)==Number(s)){
                        orderedSubjects[Number(h)]=r.subjects[Number(h)]
                        flag = false;
                      }

                    })

                    if(flag == true){
                      orderedSubjects[h]= ''
                    }

                  })

                  r['orderedSubjects'] = orderedSubjects;


                })


                data.headers = headers;
                data.reports = marksData;
                data.class_teacher = results[2][0]['class_teacher'];
                res.send(JSON.stringify(data))
            }
         
         }); 
       
  });

});


router.get('/merit-list/:exam_type_id/:section_id', function(req, res, next) {

  req.getConnection(function(err,connection){
    var data = {}

    var qry = `select  a.student_id, roll_number, enroll_number,
               concat(b.first_name,' ',b.middle_name,' ',b.last_name)as student_name,
               subject_short_name, marks,'' as grade, e.max_marks,e.min_marks, marking_type
               from marks_entry_master a
               join student_master b on (a.student_id=b.student_id and b.current_session_id = ${req.cookies.session_id})
               join student_current_standing c on (b.student_id=c.student_id and c.session_id = ${req.cookies.session_id}) 
               join subject_master d on a.subject_id=d.subject_id
               join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id and a.session_id= ${req.cookies.session_id})    
               where a.section_id=${req.params.section_id}
               and b.current_session_id =${req.cookies.session_id}
               and e.grand_total='Y'
               order by student_id`;    

               console.log(qry);

        connection.query(qry,function(err,results)     {
                
            if(err){
               console.log("Error reading report : %s ",err );
               data.status = 'e';

            }else{
              console.log(results);
              count=0;
              prev_student_id = "";
              prev_subject_name="";
              maxMarks=0;
              marksObtained=0;
              var j=1;
              var obj = {};
              var marksData = []

              results.map(r=>{
                 
                if(prev_student_id != r.student_id){ //check for different student

                   if(prev_student_id == ""){      // loop runs first time only
                      prev_student_id= r.student_id;
                      
                      obj['roll_number']=r.roll_number;
                      obj['enroll_number']=r.enroll_number;
                      obj['student_name']=r.student_name;

                      maxMarks= maxMarks + r.max_marks;
                      marksObtained= marksObtained + r.marks;
                   }else{
                      count=1;
                      obj['max_marks']=maxMarks;
                      obj['marks_obtained']=marksObtained;
                      obj['percentage']= ((marksObtained *100)/maxMarks).toFixed(2) + " %";
                      marksData.push(obj);
                      maxMarks=0;
                      marksObtained=0;
                      prev_student_id= r.student_id;
                      obj = {};
                      obj['roll_number']=r.roll_number;
                      obj['enroll_number']=r.enroll_number;
                      obj['student_name']=r.student_name;

                      maxMarks= maxMarks + r.max_marks;
                      marksObtained= marksObtained + r.marks;
                   }
                }else{
                  prev_student_id= r.student_id;
                  maxMarks= maxMarks + r.max_marks;
                  marksObtained= marksObtained + r.marks;
                }

              })

                 obj['max_marks']=maxMarks;
                 obj['marks_obtained']=marksObtained;
                 obj['percentage']= ((marksObtained *100)/maxMarks).toFixed(2) + " %";
                 marksData.push(obj);            

              data.status = 's';
              data.reports = marksData.sort(function(a, b){return b.marks_obtained - a.marks_obtained});;
              res.send(JSON.stringify(data))
            }
         
         }); 
       
  });

});


router.get('/top-five/:exam_type_id/:section_id', function(req, res, next) {

  req.getConnection(function(err,connection){
    var data = {}

    var qry = `select  a.student_id, roll_number, enroll_number,
              concat(b.first_name,' ',b.middle_name,' ',b.last_name)as student_name,
              d.subject_id,subject_name,subject_short_name, marks,'' as  grade, e.max_marks,e.min_marks, marking_type,grand_total
              from marks_entry_master a
              join student_master b on (a.student_id=b.student_id  and b.current_session_id = ${req.cookies.session_id})
              join student_current_standing c on (b.student_id=c.student_id and b.current_session_id = ${req.cookies.session_id})
              join subject_master d on a.subject_id=d.subject_id
              join marks_setting e on (a.subject_id=e.subject_id and a.exam_id=e.exam_id and a.section_id=e.section_id)
              where a.section_id=${req.params.section_id}
              and a.exam_id=${req.params.exam_type_id}
              and c.session_id=${req.cookies.session_id}
              and e.grand_total='Y'
              order by d.subject_id,marks desc`;

               console.log(qry);

        connection.query(qry,function(err,results)     {
                
            if(err){
               console.log("Error reading report : %s ",err );
               data.status = 'e';

            }else{
              console.log(results);
              var count=0;
              var prev_subject_name="";
              var maxMarks=0;
              var marksObtained=0;
              var j=1;
              
              var obj = {};
              var marksData = []
              var prev_subject_id = "";


              results.map(r=>{
                 
                if(prev_subject_id == ""){      // loop runs first time only
                    prev_subject_id= r.subject_id;
                    obj = {};                           // for header
                    obj['enroll_number']=r.subject_name;      
                    obj['student_name']="";
                    obj['max_marks']="";
                    obj['min_marks']="";
                    obj['marks_obtained']="";
                    obj['percentage']= "";
                    marksData.push(obj);
                                    
                    obj = {};
                    obj['enroll_number']=r.enroll_number;
                    obj['student_name']=r.student_name;
                    obj['max_marks']=r.max_marks;
                    obj['min_marks']=r.min_marks;
                    if(r.marking_type == 'NG' || r.marking_type == 'G'){
                      obj['marks_obtained']=r.grade;
                      obj['percentage']= "---";
                    }else{
                      obj['marks_obtained']=r.marks;
                      obj['percentage']= ((r.marks *100)/r.max_marks).toFixed(2) + " %";
                    }
                    marksData.push(obj);
                    count = count + 1;
                    
              }else{
                if(prev_subject_id == r.subject_id){ //check for different subject
                 prev_subject_id= r.subject_id;
                 if(count < 5) {               
                    obj = {};                
                    obj['enroll_number']=r.enroll_number;
                    obj['student_name']=r.student_name;
                    obj['max_marks']=r.max_marks;
                    obj['min_marks']=r.min_marks;
                    if(r.marking_type == 'NG' || r.marking_type == 'G'){
                      obj['marks_obtained']=r.grade;
                      obj['percentage']= "---";
                    }else{
                      obj['marks_obtained']=r.marks;
                      obj['percentage']= ((r.marks *100)/r.max_marks).toFixed(2) + " %";
                    }
                    marksData.push(obj);
                  }
                    count = count + 1;
                 
                  }else{
                    count=0;
                    obj = {};                           // for header
                    obj['enroll_number']=r.subject_name;      
                    obj['student_name']="";
                    obj['max_marks']="";
                    obj['min_marks']="";
                    obj['marks_obtained']="";
                    obj['percentage']= "";
                    marksData.push(obj);
                    
                    prev_subject_id= r.subject_id;
                    
                    obj = {};
                    obj['enroll_number']=r.enroll_number;
                    obj['student_name']=r.student_name;
                    obj['max_marks']=r.max_marks;
                    obj['min_marks']=r.min_marks;
                    if(r.marking_type == 'NG' || r.marking_type == 'G'){
                      obj['marks_obtained']=r.grade;
                      obj['percentage']= "---";
                    }else{
                      obj['marks_obtained']=r.marks;
                      obj['percentage']= ((r.marks *100)/r.max_marks).toFixed(2) + " %";
                    }
                    marksData.push(obj);
                  
                    count = count + 1; 
                  }
               }

              })

              data.status = 's';
              data.reports = marksData;
              res.send(JSON.stringify(data))
            }
         
         }); 
       
  });

});




module.exports = router;
