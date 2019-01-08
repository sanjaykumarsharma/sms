function CertificateStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this
  

  //read Student Family Occupation
 self.on('read_certificate', function() {
    let req = {}
    $.ajax({
      url:'/certificate/read_certificate',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside Report")
            self.certificates = data.certificates
           // console.log(self.studentSummaryReports[0])
            self.trigger('read_certificate_changed', self.certificates)
          }else if(data.status == 'e'){
            showToast("Certificate read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  //read Certificate Data
 self.on('read_certificate_data', function(certificate_id) {
    let req = {}
    $.ajax({
      url:'/certificate/read_certificate_data/'+certificate_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside Report")
            self.certificateData = data.certificateData
           // console.log(self.studentSummaryReports[0])
            self.trigger('read_certificate_data_changed', self.certificateData)
          }else if(data.status == 'e'){
            showToast("Certificate read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 //stdent Group Report

 self.on('read_student', function(standard_id,section_id) {
    let req = {}
    $.ajax({
      url:'/certificate/read_student/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside report")
            self.students = data.students
            console.log(self.students)
            self.trigger('read_student_change', self.students)
          }else if(data.status == 'e'){
            showToast("Students read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 //issued Certificate
 self.on('read_issued_certificate', function(standard_id,section_id) {
    let req = {}
    $.ajax({
      url:'/certificate/read_issued_certificate/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            //self.studentSummaryReports=[]
            console.log("inside report")
            self.issuedCertificates = data.issuedCertificates
            console.log(self.issuedCertificates)
            self.trigger('read_issued_certificate_change', self.issuedCertificates)
          }else if(data.status == 'e'){
            showToast("Issued Certificate read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

 self.on('add_issue_certificate', function(studentData,c_id,standard_id,section_id,certificateKey,c_type) {
    let req = {}
    req.studentData=studentData
    req.c_id=c_id
    req.standard_id=standard_id
    req.section_id=section_id
    req.type=c_type
    req.c_key=certificateKey
    console.log(req)
    $.ajax({
      url:'/certificate/add_issue_certificate',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully")
            self.trigger('print_certificate_changed')
          }else if(data.status == 'e'){
            showToast("Error . Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


 //Add Certificate Store

  self.on('add_certificate', function(certificate_text,certificate_name,new_certificate) {
    let req={}
     req.certificate_text=certificate_text
     req.certificate_name=certificate_name
     req.new_certificate=new_certificate

    $.ajax({
      url:'/certificate/add_certificate',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add Staff after')
            toastr.success("Successfully Inserted")
            self.trigger('add_certificate_changed', data.c_id)
          }else if(data.status == 'e'){
            showToast("Error adding Certificate. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })




}// final end
