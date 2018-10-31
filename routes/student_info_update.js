var express = require('express');
var router = express.Router();
var multer = require('multer')

/* Read Standard */

router.get('/read_standard', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT standard_id, standard FROM standard_master',function(err,result)     {
            
        if(err){
           console.log("Error reading Standard : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.standards = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Read Section */

router.get('/read_section', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}
     connection.query('SELECT standard_id, section_id, section FROM section_master',function(err,result)     {
            
        if(err){
           console.log("Error reading Section : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.sections = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

router.get('/read_student_info_update/:read_section_id/:read_enroll_number', function(req, res, next) {

  var section_id = req.params.read_section_id;
  var enroll_number = req.params.read_enroll_number;
  var session_id = req.cookies.session_id
  console.log("hiiii");

  req.getConnection(function(err,connection){
       
    var data = {}
    if(enroll_number!="0"){
      var qry =` select a.student_id, b.standard, g.section, d.house_name,
                 concat (first_name, ' ', middle_name, ' ', last_name) as name,
                 enroll_number,roll_number, reg_number,gender, e.category_name, date_format(dob,'%d/%m/%Y') as dob,
                 date_format(doa,'%d/%m/%Y') as doa, date_format(doj,'%d/%m/%Y') as doj, date_format(withdraw_date,'%d/%m/%Y') as withdraw_date,
                 mother_tongue, last_school, last_class, admission_for_class, hobby, blood_group, nationality, cast, 
                 h.religion_id, h.religion,
                 c_add_l1, c_add_l2, c_city, c_zip, c_state, c_country,
                 p_add_l1, p_add_l2, p_city, p_zip, p_state, p_country, is_permanent,
                 mobile, residence_phone, fax, staff_child, staff_name, student_type, email,
                 f_title, f_name,f_mobile,f_phone,  
                 m_title, m_name
                 from student_master a
                 JOIN student_current_standing i on (a.student_id = i.student_id and a.current_session_id = ${session_id})
                 LEFT JOIN section_master g on i.section_id = g.section_id
                 LEFT JOIN standard_master b on g.standard_id = b.standard_id 
                 LEFT JOIN student_group c on i.group_id = c.group_id
                 LEFT JOIN house_master d on i.house_id = d.house_id
                 LEFT JOIN category_master e on a.category_id = e.category_id
                 JOIN parent_master f on (a.student_id = f.student_id  and f.current_session_id = ${session_id})
                 LEFT JOIN religion_master h on a.religion_id = h.religion_id
                 where i.section_id = ${section_id} and a.enroll_number = ${enroll_number}
                 and (a.withdraw='N' or a.withdraw_session > ${session_id})
                 and i.session_id=${session_id}
                 order by first_name,middle_name,last_name `;
    }else{
      var qry =` select a.student_id, b.standard, g.section, d.house_name,
                 concat (first_name, ' ', middle_name, ' ', last_name) as name,
                 enroll_number,roll_number, reg_number,gender, e.category_name, date_format(dob,'%d/%m/%Y') as dob,
                 date_format(doa,'%d/%m/%Y') as doa, date_format(doj,'%d/%m/%Y') as doj, date_format(withdraw_date,'%d/%m/%Y') as withdraw_date,
                 mother_tongue, last_school, last_class, admission_for_class, hobby, blood_group, nationality, cast, 
                 h.religion_id, h.religion,
                 c_add_l1, c_add_l2, c_city, c_zip, c_state, c_country,
                 p_add_l1, p_add_l2, p_city, p_zip, p_state, p_country, is_permanent,
                 mobile, residence_phone, fax, staff_child, staff_name, student_type, email,
                 f_title, f_name,f_mobile,f_phone,  
                 m_title, m_name
                 from student_master a
                 JOIN student_current_standing i on (a.student_id = i.student_id and a.current_session_id = ${session_id})
                 LEFT JOIN section_master g on i.section_id = g.section_id
                 LEFT JOIN standard_master b on g.standard_id = b.standard_id 
                 LEFT JOIN student_group c on i.group_id = c.group_id
                 LEFT JOIN house_master d on i.house_id = d.house_id
                 LEFT JOIN category_master e on a.category_id = e.category_id
                 JOIN parent_master f on (a.student_id = f.student_id  and f.current_session_id = ${session_id})
                 LEFT JOIN religion_master h on a.religion_id = h.religion_id
                 where i.section_id = ${section_id}
                 and (a.withdraw='N' or a.withdraw_session > ${session_id})
                 and i.session_id=${session_id}
                 order by first_name,middle_name,last_name `;
    }
    connection.query(qry,function(err,result)     {
            
      if(err){
        console.log("Error reading Student : %s ",err );
        data.status = 'e';

      }else{
        // res.render('customers',{page_title:"Customers - Node.js",data:rows});
        data.status = 's';
        data.students = result;
        //connection.end()

        res.send(JSON.stringify(data))
        }
     
     });
       
  });

});



/* Print List */
router.get('/print_list/:read_standard_id/:read_section_id', function(req, res, next) {
 
  var standard_id = req.params.read_standard_id;
  var section_id = req.params.read_section_id;
  var input = JSON.parse(JSON.stringify(req.body));
  var session_id=req.cookies.session_id;
  var data = {}


    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        if (err) { throw err; }

          var qry = `select a.student_id, b.standard, c.standard_id, c.section_id, c.section, title, first_name,middle_name, last_name,
                     concat(first_name,' ',middle_name, ' ' ,last_name)as name,session_name,
                     enroll_number,roll_number, reg_number, mobile, f_title, f_name,house_name as house
                     from student_master a
                     JOIN student_current_standing d on (a.student_id = d.student_id and a.current_session_id= ${session_id} )
                     JOIN section_master c  on d.section_id = c.section_id
                     JOIN standard_master b on c.standard_id = b.standard_id
                     JOIN parent_master f  on (a.student_id = f.student_id and f.current_session_id= ${session_id} )
                     LEFT JOIN house_master g  on  d.house_id=g.house_id
                     join session_master y on a.current_session_id = y.session_id 
                     where c.standard_id= ${standard_id} and c.section_id= ${section_id}
                     and (a.withdraw='N' || a.withdraw_session > ${session_id} )
                     and d.session_id= ${session_id}
                     order by first_name,middle_name,last_name,enroll_number `;

          /*var qry = `select a.student_id, b.standard, c.standard_id, c.section_id, c.section, title,
                     first_name,middle_name, last_name,
                     concat(first_name,' ',middle_name, ' ' ,last_name)as name,
                     enroll_number,roll_number, reg_number, mobile, f_title, f_name,house_name as house
                     from student_master a
                     JOIN student_current_standing d on (a.student_id = d.student_id and a.current_session_id= ${session_id} )
                     JOIN section_master c  on d.section_id = c.section_id
                     JOIN standard_master b on c.standard_id = b.standard_id
                     JOIN parent_master f  on (a.student_id = f.student_id and f.current_session_id= ${session_id} )
                     LEFT JOIN house_master g  on  d.house_id = g.house_id
                     where c.standard_id= ${standard_id} and c.section_id= ${section_id}
                     and (a.withdraw='N' || a.withdraw_session > ${session_id} )
                     and d.session_id= ${session_id}
                     order by first_name,middle_name,last_name,enroll_number `;*/
          

          connection.query(qry, function(error, result)
          {
              if (error) {
                return connection.rollback(function() {
                  throw error;
                });
              }

          
              connection.commit(function(err) {
                if (err) {
                  return connection.rollback(function() {
                    throw err;
                  });
                }
                data.status = 's';
                data.print_list = result;
                console.log('success!');
                console.log(data);
                res.send(JSON.stringify(data))

              });
          });
      });
    });
  });

  // image upload start******************************************************
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Student Image Upload
const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/'+req.cookies.session_id+'/'+req.params.folder_name);
    },
    filename: function(req, file, cb) {
      image_name= req.params.image_name+'.jpg';
      cb(null, image_name);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post('/upload_student_image/:folder_name/:image_name', upload.single('student_profile_picture'), function(req, res, next) {
  console.log('inside uploading images');
  res.send('ok')
});

// Father Image Upload

const upload_father = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/'+req.cookies.session_id+'/'+req.params.folder_name);
    },
    filename: function(req, file, cb) {
      image_name= req.params.image_name+'.jpg';
      cb(null, image_name);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


router.post('/upload_father_image/:folder_name/:image_name', upload_father.single('father_profile_picture'), function(req, res, next) {
  console.log('inside uploading images');
  res.send('ok')
});

// Mother Image Upload
const upload_mother = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/'+req.cookies.session_id+'/'+req.params.folder_name);
    },
    filename: function(req, file, cb) {
      image_name= req.params.image_name+'.jpg';
      cb(null, image_name);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


router.post('/upload_mother_image/:folder_name/:image_name', upload_mother.single('mother_profile_picture'), function(req, res, next) {
  console.log('inside uploading images');
  res.send('ok')
});

// Guardian Image Upload
const upload_guardian = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/'+req.cookies.session_id+'/'+req.params.folder_name);
    },
    filename: function(req, file, cb) {
      image_name= req.params.image_name+'.jpg';
      cb(null, image_name);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 5
    },
  fileFilter: fileFilter
});


router.post('/upload_guardian_image/:folder_name/:image_name', upload_guardian.single('guardian_profile_picture'), function(req, res, next) {
  console.log('inside uploading images');
  res.send('ok')
});
// image upload end *******************************************************


module.exports = router;
