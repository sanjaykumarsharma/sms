function MentorDetailStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.mentors = []

  self.on('read_mentor_categories', function() {
    let req = {}
    $.ajax({
      url:'/mentor_detail',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.categories = data.categories
            self.trigger('read_mentor_categories_changed', data.categories)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('read_case', function() {
    let req = {}
  
    $.ajax({
      url:'/mentor_detail/read_case',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.mentor_case = data.mentor_case
            self.trigger('read_case_changed', data.mentor_case)
          }else if(data.status == 'e'){
            showToast("Case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_mentor', function(read_category_id) {
    console.log(read_category_id)
    let req = {}
    req.read_category_id=read_category_id
    $.ajax({
      url:'/mentor_detail/csv_export_mentor/'+read_category_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
        }
      })
  })

  self.on('read_mentor', function(read_category_id) {
    console.log(read_category_id)
    let req = {}
    req.read_category_id=read_category_id
    $.ajax({
      url:'/mentor_detail/read_mentor/'+read_category_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.mentors = data.mentors
            self.trigger('read_mentor_changed', data.mentors)
          }else if(data.status == 'e'){
            showToast("Mentor Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_for_edit_mentor', function(id) {
    console.log(id)
    let req = {}
    req.id=id
    $.ajax({
      url:'/mentor_detail/read_for_edit_mentor/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.mentor_details = data.mentor_details
            self.trigger('read_for_edit_mentor_changed', data.mentor_details)
          }else if(data.status == 'e'){
            showToast("Mentor Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('read_mentor_case', function(id,enroll_number) {
    console.log(id)
    console.log(enroll_number)
    let req = {}
    req.id=id
    req.enroll_number=enroll_number
    $.ajax({
      url:'/mentor_detail/read_mentor_case/'+id+'/'+enroll_number,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.mentor_case_details = data.mentor_case_details
            self.trigger('read_mentor_case_changed', data.mentor_case_details)
          }else if(data.status == 'e'){
            showToast("Case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_mentor_case_csv', function(id,enroll_number) {
    console.log(id)
    console.log(enroll_number)
    let req = {}
    req.id=id
    req.enroll_number=enroll_number
    $.ajax({
      url:'/mentor_detail/read_mentor_case_csv/'+id+'/'+enroll_number,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){

          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
        }
      })
  })

  self.on('read_for_edit_case', function(id) {
    console.log(id)
    let req = {}
    req.id=id
    $.ajax({
      url:'/mentor_detail/read_for_edit_case/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.update_case_details_for_update = data.update_case_details_for_update
            self.trigger('read_for_edit_case_changed', data.update_case_details_for_update)
          }else if(data.status == 'e'){
            showToast("Case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_mentor_detail', function(obj) {
    console.log(obj)
    $.ajax({
      url:'/mentor_detail/add',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add activity after')
            toastr.success("Successfully Inserted")
            self.trigger('add_mentor_detail_changed', self.mentors)
          }else if(data.status == 'e'){
            showToast("Error adding Mentor. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('add_case_detail', function(obj) {
    console.log(obj)
    $.ajax({
      url:'/mentor_detail/add_case_detail',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add Case after')
            toastr.success("Successfully Inserted")
            self.trigger('add_case_detail_changed', self.case_details)
          }else if(data.status == 'e'){
            showToast("Error adding Mentor. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_mentor_detail', function(obj,id) {
    let req = {}
    console.log(obj)
    //req.id=edit_id
    $.ajax({
      url:'/mentor_detail/edit/'+id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.mentors = self.mentors.map(cat => {
              if(cat.id == id){
                  cat.id = id
                  cat.referred_by=obj.referred_by
                  cat.enroll_number=obj.enroll_number
                  cat.category_id=obj.category_id
                  /*self.mentors.map(i=>{
                  if(item.case_id==i.case_id){
                      var case_name = e.item
                    }
                  })*/
                  cat.case_id=obj.case_id
                  cat.consult_date=obj.consult_date
                  cat.time_in=obj.time_in
                  cat.time_out=obj.time_out
                  cat.diagnosis=obj.diagnosis
                  cat.suggestion=obj.suggestion
              }
              return cat
            })
            toastr.success("Successfully Update")
            self.trigger('edit_mentor_detail_changed', self.mentors)
          }else if(data.status == 'e'){
            showToast("Error adding Mentor. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_case_detail', function(obj,edit_case_id) {
    let req = {}
    console.log(obj)
    //req.id=edit_id
    $.ajax({
      url:'/mentor_detail/edit_case_detail/'+edit_case_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            /*self.edit_case_details = self.edit_case_details.map(cat => {
              if(cat.id == id){
                  cat.id = id
                  cat.visitor=obj.visitor
                  cat.visit_date=obj.v_date
                  cat.time_in=obj.time_in
                  cat.time_out=obj.time_out
                  cat.status=obj.status
                  cat.suggestion=obj.suggestion
              }
              return cat
            })*/
            toastr.success("Successfully Update")
            self.trigger('edit_case_detail_changed', self.edit_case_details)
          }else if(data.status == 'e'){
            showToast("Error Updating Case Details. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_case_details', function(id) {
    $.ajax({
      url:'/mentor_detail/delete_case_details/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            /*let tempcaseDetails = self.delete_case_details.filter(c => {
              return c.id != id
            })
            self.delete_case_details = tempcaseDetails*/
            toastr.success("Successfully Deleted")
            self.trigger('delete_case_details_changed', self.delete_case_details)
          }else if(data.status == 'e'){
            showToast("Error Deleting Case Details. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_mentor_detail', function(id) {
    $.ajax({
      url:'/mentor_detail/delete_mentor_detail/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            /*let tempcaseDetails = self.delete_case_details.filter(c => {
              return c.id != id
            })
            self.delete_case_details = tempcaseDetails*/
            toastr.success("Successfully Deleted")
            self.trigger('delete_mentor_detail_changed', self.delete_mentor_detail)
          }else if(data.status == 'e'){
            showToast("Error Deleting Mentor Details. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
