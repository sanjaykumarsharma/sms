var express = require('express');
var router = express.Router();
var multer = require('multer')
var fs = require('fs');


/* Read Signature */

router.get('/read_signature', function(req, res, next) {

  req.getConnection(function(err,connection){
       
     var data = {}

     var qry = `select  type, IF(is_active = 0, 'No', 'Yes') as active
                from signature_image`;

     connection.query(qry,function(err,result)     {
            
        if(err){
           console.log("Error reading Signature : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.signature = result;
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Add Signature */

router.post('/add_signature', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  req.getConnection(function(err,connection){
       
     var data = {}
     var values = {
        type    : input.type,
        creation_date    : formatted,
        modification_date    : formatted,
        modified_by    : req.cookies.user,
      };

     var query = connection.query("INSERT INTO signature_image set ? ",values, function(err, result)    {

      var log = result.type;
      console.log(query);
            
        if(err){
           console.log("Error reading Signature : %s ",err );
           data.status = 'e';

        }else{
          // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            data.status = 's';
            data.signature = result;
            data.type=input.type
            console.log(data.type);
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Edit Signature. */
router.post('/edit_signature/:type/:old_type', function(req, res, next) {

  var old_type = req.params.old_type;
  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  var data = {}

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        var old_type = req.params.old_type;
        if (err) { throw err; }
        var qry = `delete from signature_image where type = '${old_type}' `;
        console.log(qry);
        connection.query(qry, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

         //**********Update Signature Master  ***************************
          var values = {
              type    : input.type,
              creation_date    : formatted,
              modification_date    : formatted,
              modified_by    : req.cookies.user,
            };

          connection.query("INSERT INTO signature_image set ? ",values, function(error, result)
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

                //rename code
                fs.rename('./public/images/7/signatureImages/'+req.params.old_type+'.jpg', './public/images/7/signatureImages/'+req.params.type+'.jpg', function(err) {
                   if ( err ) console.log('ERROR: ' + err);
                });
                data.status = 's';
                console.log('success!');
                console.log(data);
                data.signature = result;
                data.type=input.type
                res.send(JSON.stringify(data))

              });
          });

        });//end of ection con
      });
    });
  });

/* Delete Signature */

router.post('/delete_signature/:type', function(req, res, next) {

  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  req.getConnection(function(err,connection){
       
     var data = {}
     var type = req.params.type;

     var qry = `delete from signature_image 
                where type = '${type}' `;

     var query = connection.query(qry, function(err, result)    {
      console.log(query);
            
        if(err){
           console.log("Error Deleting Signature : %s ",err );
           data.status = 'e';

        }else{
            //Delete Image Form Folder code
            fs.unlink('./public/images/7/signatureImages/'+req.params.type+'.jpg', (err) => {
              if (err) throw err; console.log('path/file.txt was deleted');
            });
            data.status = 's';
           //connection.end()

            res.send(JSON.stringify(data))
        }
     
     });
       
  });

});

/* Active Signature. */
router.post('/active_signature/:type', function(req, res, next) {

  var type = req.params.type;
  var input = JSON.parse(JSON.stringify(req.body));
  var now = new Date();
  var jsonDate = now.toJSON();
  var formatted = new Date(jsonDate);

  var data = {}

    req.getConnection(function(err,connection){
      connection.beginTransaction(function(err) {
        
        var old_val=0;
        var current_val=1;

        if (err) { throw err; }
        var qry = `update signature_image set is_active= ${old_val} `;
        console.log(qry);
        connection.query(qry, function (error, result) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

          var qry = `update signature_image set is_active= ${current_val}
                     where type= '${type}' `;
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
                console.log('success!');
                console.log(data);
                data.active_signature = result;
                res.send(JSON.stringify(data))

              });
          });

        });//end of ection con
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

// Signature Image Upload
const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/'+req.params.folder_name);
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

router.post('/upload_signature_image/:folder_name/:image_name', upload.single('signature_picture'), function(req, res, next) {
  console.log('inside uploading images');
  res.send('ok')
});


// image upload end *******************************************************


module.exports = router;
