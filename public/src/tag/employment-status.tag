<employment-status>
	<section class="is-fluid">
    <h2 class="title" style="color: #ff3860;">Employment Status</h2>
    <div class="flex items-center mt-2 mb-6 no-print">
      <div class="bg-green py-1 rounded w-10">
        <div class="bg-grey h-px flex-auto"></div>
      </div>
    </div>
    <div class="box">
      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label" for="employment_status">Employment Status</label>
            <div class="control">
              <input class="input" type="text" ref="addEmploymentStatusInput"
              onkeyup={addEnter}>
            </div>
          </div>
        </div>
        <div class="column is-narrow">
          <div class="field">
            <div class="control">
              <button class="button is-danger has-text-weight-bold adjusted-top"
                   onclick={add} >{title}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>Employment Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={d, i in employmentStatus}>
          <td>{i + 1}</td>
          <td>{d.employment_status}</td>
          <td class="has-text-right">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={d.confirmDelete}>
              <span><a class="button is-small is-rounded" onclick={edit.bind(this, d)}>Edit</a></span>
              <span if={role=='ADMIN'}> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
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
      self.update()
      self.readEmploymentStatus()
    })

     self.on("unmount", function(){
      employmentStatusStore.off('employment_status_changed', EmploymentStatusChanged)
    })

    //read courses
    self.readEmploymentStatus = () => {
       employmentStatusStore.trigger('read_employment_status')
    }

     self.add = () => {
      if(!self.refs.addEmploymentStatusInput.value){
        toastr.info("Please enter Levle and try again")
      }else{
        self.loading = true
        if(self.title=='Create'){
          console.log('create')
          employmentStatusStore.trigger('add_employment_status', self.refs.addEmploymentStatusInput.value)
        }else if(self.title=='Update'){
          console.log('update')
          employmentStatusStore.trigger('edit_employment_status', self.refs.addEmploymentStatusInput.value,
            self.edit_id)
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
      self.employmentStatus.map(d => {
          d.confirmDelete = false
          d.confirmEdit = false
      })
    }

    self.confirmDelete = (e) => {
      self.employmentStatus.map(d => {
        if(d.employment_status_id != e.item.d.employment_status_id){
          d.confirmDelete = false
        }else{
          d.confirmDelete = true
        }
      })
    }

    self.delete = (e) => {
      self.loading = true
      employmentStatusStore.trigger('delete_employment_status', e.item.d.employment_status_id)
    }

    self.edit = (d,e) => {
      console.log(d)
      self.title='Update'
      self.refs.addEmploymentStatusInput.value = d.employment_status
      self.edit_id = d.employment_status_id
    }
    

    employmentStatusStore.on('employment_status_changed',EmploymentStatusChanged)
    function EmploymentStatusChanged(employmentStatus){
      console.log('employment_status_changed1') 
      console.log(employmentStatus) 
      self.title='Create'
      self.refs.addEmploymentStatusInput.value = ''
      self.loading = false
      self.employmentStatus = employmentStatus
      self.update()
      console.log('self.employmentStatus')
    }

</script>
</employment-status>