function DisciplineDetailStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.mentors = []

  self.on('read_discipline_categories', function() {
    let req = {}
    $.ajax({
      url:'/discipline_detail',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.categories = data.categories
            self.trigger('read_discipline_categories_changed', data.categories)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  self.on('read_discipline_case', function() {
    let req = {}
  
    $.ajax({
      url:'/discipline_detail/read_discipline_case',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.discipline_case = data.discipline_case
            self.trigger('read_discipline_case_changed', data.discipline_case)
          }else if(data.status == 'e'){
            showToast("Case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_discipline', function(obj) {
    let req = {}
    req.data=obj
    $.ajax({
      url:'/discipline_detail/csv_export_discipline',
        contentType: "application/json",
        dataType:"json",
        type:'POST',
        data: JSON.stringify(req),
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_discipline_changed', data.url)
          }else if(data.status == 'e'){
            
          }
        },
        error: function(data){
          
        }
      })
  })

  self.on('read_discipline', function(read_category_id) {
    console.log(read_category_id)
    let req = {}
    req.read_category_id=read_category_id
    $.ajax({
      url:'/discipline_detail/read_discipline/'+read_category_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.disciplines = data.disciplines
            self.trigger('read_discipline_changed', data.disciplines)
          }else if(data.status == 'e'){
            showToast("Discipline Read Error. Please try again.", data)
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

  self.on('add_discipline_detail', function(obj) {
    console.log(obj)
    $.ajax({
      url:'/discipline_detail/add',
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
            self.trigger('add_discipline_detail_changed', self.disciplines)
          }else if(data.status == 'e'){
            showToast("Error adding Discipline. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_for_edit_discipline', function(id) {
    console.log(id)
    let req = {}
    req.id=id
    $.ajax({
      url:'/discipline_detail/read_for_edit_discipline/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.discipline_details = data.discipline_details
            self.trigger('read_for_edit_discipline_changed', data.discipline_details)
          }else if(data.status == 'e'){
            showToast("Discipline Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })


  self.on('edit_discipline_detail', function(obj,id) {
    let req = {}
    console.log(obj)
    //req.id=edit_id
    $.ajax({
      url:'/discipline_detail/edit/'+id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Update")
            self.trigger('edit_discipline_detail_changed', self.disciplines)
          }else if(data.status == 'e'){
            showToast("Error adding Discipline. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_discipline_detail', function(id) {
    $.ajax({
      url:'/discipline_detail/delete_discipline_detail/'+id,
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
            self.trigger('delete_discipline_detail_changed', self.delete_discipline_detail)
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
