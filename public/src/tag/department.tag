<department>
  <section class="is-fluid">
    <h2 class="title" style="color: #ff3860;">Departments</h2>
    <div class="box">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Department</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <input class=" input"
              ref="department_name" type="text">
          </div>
        </div>
        <div class="column is-narrow">
          <label class="label">HOD</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="emp_name">
                <option each={employees} value={name}>{name}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
          onclick={add} >{title}
          </button>
        </div>
      </div>
    </div>
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>Department</th>
          <th>HOD</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in departments}>
          <td>{i + 1}</td>
          <td>{d.department_name}</td>
          <td>{d.hod}</td>
          <td class="has-text-right">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={d.confirmDelete}>
              <span><a class="button is-small is-rounded" onclick={edit.bind(this, d)}>Edit</a></span>
              <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            </div>
            <div class="table-buttons" if={d.confirmDelete}>
              <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
              <soan disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <script>
  var self = this
    self.on("mount", function(){
      self.title='Create'
      self.role = getCookie('role')
      self.readHod()
      self.readDepartment()
      self.update()
    })

     self.on("unmount", function(){
      departmentStore.off('departments_changed', DepartmentChanged)
      departmentStore.off('read_hod_changed', ReadHodChanged)
    })

    //read Department
    self.readDepartment = () => {
       departmentStore.trigger('read_department')
    }
    self.readHod = () => {
       departmentStore.trigger('read_hod')
    }

     self.add = () => {
      if(!self.refs.department_name.value){
        toastr.info("Please enter Department and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          departmentStore.trigger('add_department', self.refs.department_name.value, self.refs.emp_name.value)
        }else if(self.title=='Update'){
          console.log('update')
          departmentStore.trigger('edit_department', self.refs.department_name.value,self.refs.emp_name.value,self.edit_id)
        }
      }
    }

    self.addEnter = (e) => {
      if(e.which == 13){
        self.add()
      }
    }

     self.editEnter = (e) => {
      if(e.which == 13){
        self.edit(e)
      }  
    }

   self.cancelOperation = (e) => {
      self.departments.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.departments.map(d => {
        if(d.department_id != e.item.d.department_id){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      departmentStore.trigger('delete_department', e.item.d.department_id)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.department_name.value = d.department_name
      self.refs.emp_name.value = d.hod
      self.edit_id = d.department_id
    }
    
    departmentStore.on('read_hod_changed',ReadHodChanged)
    function ReadHodChanged(employees){
      self.title='Create'
      self.loading = false
      self.employees = employees
      self.update()
    }

    departmentStore.on('departments_changed',DepartmentChanged)
    function DepartmentChanged(departments){
      self.title='Create'
      self.departments = departments
      self.refs.department_name.value = ''
      self.refs.emp_name.value = ''
      self.loading = false
      self.update()
    }

</script>
</department>