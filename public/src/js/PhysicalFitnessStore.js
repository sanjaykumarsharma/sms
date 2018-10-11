function PhysicalFitnessStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.physicalFitness = []

  self.on('read_classes', function() {
    let req = {}
    $.ajax({
      url:'/standard',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_classes_changed', data.standards)
          }else if(data.status == 'e'){
            showToast("standards Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_section', function() {
    let req = {}
    $.ajax({
      url:'/section',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_section_changed', data.sections)
          }else if(data.status == 'e'){
            showToast("section Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_physical_fitness_students', function(section_id,exam_term) {
    $.ajax({
      url:'/physical-fitness/students/'+section_id+'/'+exam_term,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.physicalFitness=data.physicalFitness
            self.trigger('physical_fitness_students_changed', data.physicalFitness)
          }else if(data.status == 'e'){
            showToast("Physical Fitness Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_physical_fitness_details', function(student_id,exam_term) {
    $.ajax({
      url:'/physical-fitness/details/'+student_id+'/'+exam_term,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_physical_fitness_details_changed', data.details)
          }else if(data.status == 'e'){
            showToast("Physical Fitness Details Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('read_physical_fitness_all_details', function(section_id,exam_term) {
    $.ajax({
      url:'/physical-fitness/details-all/'+section_id+'/'+exam_term,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_physical_fitness_details_changed', data.details)
          }else if(data.status == 'e'){
            showToast("Physical Fitness Details Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
  

  self.on('add_physical_fitness', function(obj) {
    $.ajax({
      url:'/physical-fitness/add',
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Physical Fitness Created Successfully ")
            self.trigger('add_physical_fitness_changed')
          }else if(data.status == 'e'){
            showToast("Error adding Physical Fitness. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_physical_fitness', function(student_id,exam_term) {
    $.ajax({
      url:'/physical-fitness/delete/'+student_id+'/'+exam_term,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            toastr.info("Physiacl Fitness Deleted Successfully")
            self.trigger('delete_physical_fitness_changed')
          }else if(data.status == 'e'){
            showToast("Error Deleting Physiacl Fitness. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
