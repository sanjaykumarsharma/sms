function SectionStore() {
  riot.observable(this) // Riot provides our event emitter.
  var self = this

  self.sections = []

  self.on('read_standard', function() {
    console.log('i am in read_sections api call from ajax')
    let req = {}
    $.ajax({
      url:'/section/readStandard',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.standards = data.standards
            self.trigger('read_standard_changed', data.standards)
          }else if(data.status == 'e'){
            showToast("section Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('csv_export_section', function() {
    console.log('i am in csv_export_section api call from ajax')
    let req = {}
    $.ajax({
      url:'/section/csv_export_section',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('csv_export_section_changed', data.url)
          }else if(data.status == 'e'){}
        },
        error: function(data){
          //showToast("", data)
      }
    })
  })

  self.on('read_section', function() {
    console.log('i am in read_section api call from ajax')
    let req = {}
    $.ajax({
      url:'/section/read_section',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.sections = data.sections
            self.trigger('read_section_changed', data.sections)
          }else if(data.status == 'e'){
            showToast("Section Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('delete_section', function(id) {
    $.ajax({
      url:'/section/delete/'+id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            let tempSections = self.sections.filter(c => {
              return c.section_id != id
            })
            self.sections = tempSections
            toastr.info("Section Deleted Successfully")
            self.trigger('delete_section_changed', self.sections)
          }else if(data.status == 'e'){
            showToast("Error Deleting Section. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

  self.on('edit_section', function(section,standard_id,id) {
    let req = {}
    req.section=section
    req.standard_id=standard_id
    req.id=id
    $.ajax({
      url:'/section/edit/'+id,
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          if(data.status == 's'){
            self.sections = self.sections.map(cat => {
              if(cat.section_id == id){
                cat.section_id =id
                cat.section=section
                cat.standard_id=standard_id
                //cat.standard_id=standard_id
              }
              // cat.confirmEdit = false
              return cat
            })
            toastr.success("Section Updated Successfully ")
            self.trigger('edit_section_changed', self.sections)
          }else if(data.status == 'e'){
            showToast("Error updating sections. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
 
  self.on('add_section', function(section,standard_id) {
    let req = {}
    req.section=section
    req.standard_id=standard_id
    $.ajax({
      url:'/section/add',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            console.log('add section section after')
            let obj = {}
            obj.section_id = data.section_id
            obj.section = section
            obj.standard_id = standard_id
           // obj.name = name
            self.sections = [obj, ...self.sections]
            toastr.success("section role Inserserted Successfully ")
            self.trigger('add_section_changed', self.sections)
          }else if(data.status == 'e'){
            showToast("Invalid Username or password. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })

}
