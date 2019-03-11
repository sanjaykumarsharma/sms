function CareerStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.on('read_career_interview', function(obj) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    $.ajax({
      url:'/career/read_career_interview/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.career_interview = data.career_interview
            self.trigger('read_career_interview_changed', self.career_interview)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_career_interview', function(obj) {
    console.log('i am in read_categories api call from ajax')
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    $.ajax({
      url:'/career/csv_export_career_interview/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_career_interview_changed', data.url)
          }else if(data.status == 'e'){
          }
        },
        error: function(data){
        }
      })
  })


   self.on('download_cv', function(career_id) {
   
    $.ajax({
      url:'/career/download_cv/'+career_id,
        type:"POST",
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Downloaded")
            self.trigger('download_cv_changed')
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('update_interview', function(obj,interview_id) {
   
    $.ajax({
      url:'/career/update_interview/'+interview_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Updated")
            self.trigger('update_interview_changed')
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_candidate', function(interview_id) {
    $.ajax({
      url:'/career/delete_candidate/'+interview_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            /*let tempItems = self.items.filter(c => {
              return c.interview_id != interview_id
            })
            self.items = tempItems*/
            toastr.info("Candidate Deleted Successfully")
            self.trigger('delete_candidate_changed')
          }else if(data.status == 'e'){
            showToast("Error Deleting Candidate. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_applicant_profile', function(career_id) {
   
    $.ajax({
      url:'/career/read_applicant_profile/'+career_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_applicant_profile_changed',data.applicant_profile_data)
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_interviewed_candidate', function(obj) {
    console.log('i am in read_interviewed_candidate api call from ajax')
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    req.result=obj.result
    $.ajax({
      url:'/career/read_interviewed_candidate/'+obj.start_date+'/'+obj.end_date+'/'+obj.result,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.interviewed_candidate = data.interviewed_candidate
            self.trigger('read_interviewed_candidate_changed', self.interviewed_candidate)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_interviewed_candidate', function(obj) {
    console.log('i am in read_interviewed_candidate api call from ajax')
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    req.result=obj.result
    $.ajax({
      url:'/career/csv_export_interviewed_candidate/'+obj.start_date+'/'+obj.end_date+'/'+obj.result,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_interviewed_candidate_changed', data.url)
          }else if(data.status == 'e'){
           
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('update_interviewed_candidate', function(interview_id) {
    $.ajax({
      url:'/career/update_interviewed_candidate/'+interview_id,
        type:"POST",
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            /*let tempItems = self.items.filter(c => {
              return c.interview_id != interview_id
            })
            self.items = tempItems*/
            toastr.info("Candidate Updated Successfully")
            self.trigger('update_interviewed_candidate_changed')
          }else if(data.status == 'e'){
            showToast("Error Updating Candidate. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_career_feedback_report', function(obj) {
    console.log('i am in read_interviewed_candidate api call from ajax')
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    $.ajax({
      url:'/career/read_career_feedback_report/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.career_feedback_report_data = data.career_feedback_report_data
            self.trigger('read_career_feedback_report_changed', self.career_feedback_report_data)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_career_feedback_report', function(obj) {
    console.log('i am in read_interviewed_candidate api call from ajax')
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    $.ajax({
      url:'/career/csv_export_career_feedback_report/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_career_feedback_report_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('read_applicant_detail', function(obj) {
    console.log('i am in read_applicant_detail api call from ajax')
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    $.ajax({
      url:'/career/read_applicant_detail/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.applicant_details = data.applicant_details
            self.trigger('read_applicant_detail_changed', self.applicant_details)
          }else if(data.status == 'e'){
            showToast("Data Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_applicant_detail', function(obj) {
    console.log('i am in csv_export_applicant_detail api call from ajax')
    let req = {}
    req.start_date=obj.start_date
    req.end_date=obj.end_date
    $.ajax({
      url:'/career/csv_export_applicant_detail/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_applicant_detail_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          //showToast("", data)
        }
      })
  })

  self.on('create_interview_call', function(obj,career_id) {
   
    $.ajax({
      url:'/career/create_interview_call/'+career_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Updated")
            self.trigger('create_interview_call_changed')
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_applicant_detail', function(career_id) {
    $.ajax({
      url:'/career/delete_applicant_detail/'+career_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            /*let tempItems = self.items.filter(c => {
              return c.interview_id != interview_id
            })
            self.items = tempItems*/
            toastr.info("Candidate Deleted Successfully")
            self.trigger('delete_applicant_detail_changed')
          }else if(data.status == 'e'){
            showToast("Error Deleting Candidate. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
      

}
