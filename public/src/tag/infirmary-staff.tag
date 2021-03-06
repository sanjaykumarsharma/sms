<infirmary-staff>
  <header></header>
  <loading-bar if={loading}></loading-bar>
<section class="is-fluid" show={infirmary_staff_view == 'show_staff_table'}>
    <h2 class="title has-text-centered" style="color: #ff3860;">Staff Infirmary Detail</h2>
  <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Category</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="read_category_id">
                <option each={infirmaryCategories} value={category_id}>{category_name}
                              </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
          onclick={readStaffInfirmary} >Go
          </button>
            <button class="button is-success has-text-weight-bold is-small ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
              <span class="icon">
                  <i class="far fa-file-excel"></i>
              </span>
           </button>
           <button class="button is-primary has-text-weight-bold is-pulled-right is-small ml5" onclick="window.print()" title="Print">
                <span class="icon">
                   <i class="fas fa-print"></i>
               </span>
           </button>

           <button class="button is-info is-rounded  is-pulled-right is-small ml5" onclick={readStaffInfirmary} style="margin-left:5px;margin-right:5px">
            <span class="icon">
              <span class="fas fa-sync-alt"></span>
            </span>
          </button>
         <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={add_staff_infirmary}>
          <span class="icon">
            <span class="fas fa-plus"></span>
          </span>
         </button>
           <input class="input is-pulled-right" ref="searchInfirmaryStaff" onkeyup={filteredInfirmaryStaff} type="text" style="width:200px;margin-right:5px;" placeholder="Search">    
        </div>
      </div>
    </div>

  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Emp ID</th>
          <th>Case Name</th>
          <th>Date</th>
          <th>Time In</th>
          <th>Time Out</th>
          <th>Treatment</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr each={st, i in filteredInfirmaryStaffs}>
          <td>{i+1}</td>
          <td>{st.name}</td>
          <td>{st.employee_id}</td>
          <td>{st.case_name}</td>
          <td>{st.treatment_date}</td>
          <td>{st.time_in}</td>
          <td>{st.time_out}</td>
          <td>{st.treatment}</td>
          <td class="has-text-right no-print">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={st.confirmDelete}>
              <span><a class="button is-small is-rounded" onclick={edit.bind(this, st)}>Edit</a></span>
              <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            </div>
            <div class="table-buttons" if={st.confirmDelete}>
              <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
              <soan disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</section>
<section class="is-fluid" show={infirmary_staff_view =='show_infirmary_staff_form'}>
  <div class="label">
    <div class="level-left">
      <h2 class="title" style="color: #ff3860;">{title} Staff Infirmary</h2>
    </div>
    <div class="level-right">
      <button class="button" onclick={close_staff_infirmary_form}>Back</button>
    </div>
  </div>
  <div class="box">
    <div class="columns is-variable is-1 is-multiline">
    	<div class="column is-one-third">
        <label class="label">Employee</label>
       	<div class="control">
            <div class="select is-fullwidth">
            <select ref="staff_id" onkeyup={addEnter}>
              <option each={employees} value={emp_id}>{name}
              </option>
            </select>
          </div>
          </div>
        </div>
      <div class="column is-one-third">
      <label class="label" for="class">Category</label>
         <div class="control">
            <div class="select is-fullwidth">
            <select ref="category_id" onkeyup={addEnter}>
              <option each={infirmaryCategories} value={category_id}>{category_name}
              </option>
            </select>
          </div>
          </div>
        </div>
        <div class="column is-one-third">
        <label class="label" for="class">Case</label>
        <div class="control">
            <div class="select is-fullwidth">
            <select ref="case_id" onkeyup={addEnter}>
              <option each={infirmaryCases} value={case_id}>{case_name}
              </option>
            </select>
          </div>
            </div>
        </div>
        
        <div class="column is-one-third">
         <label class="label">Date</label>
        <input class="input date flatpickr-input form-control input"  ref="treatment_date" placeholder="" tabindex="0" 
        type="text" onkeyup={addEnter}>
        </div>
        <div class="column is-one-third">
         <label class="label">Time In</label>
          <input type="text" ref="time_in" type="text" class="input" onkeyup={addEnter}>
        </div>
         <div class="column is-one-third">
         <label class="label">Time Out</label>
          <input type="text" ref="time_out" type="text" class="input" onkeyup={addEnter}>
        </div>
        <div class="column is-one-third">
         <label class="label">Treatment</label>
        <input type="text" ref="treatment" type="text" class="input" onkeyup={addEnter}>
        </div>
    <div class="column is-full">
    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={add} >{title}</button>    
   </div>
  </div>
  </div>
</section>
 
  <!-- student profile end -->
<script>
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')
        self.infirmary_staff_view='show_staff_table'
        self.readInfirmaryCategory()
        self.readInfirmaryCase()
        self.readEmployee()
        console.log("inside staff infirmary")
        flatpickr(".date", {
         allowInput: true,
          dateFormat: "d/m/Y",
       })
        self.update()
     })
     self.on("unmount", function(){
       staffinfirmaryStore.off('read_staff_infirmary_changed', ReadStaffInfirmaryChanged)
       staffinfirmaryStore.off('read_infirmary_category_changed',InfirmaryCategoryChanged)
       staffinfirmaryStore.off('read_infirmary_case_changed',InfirmaryCaseChanged)
       staffinfirmaryStore.off('read_employee_changed',EmployeeChanged)
       staffinfirmaryStore.off('add_staff_infirmary_changed', AddStaffInfirmaryChanged)
       staffinfirmaryStore.off('edit_staff_infirmary_changed',EditStaffInfirmaryChanged)
     //  staffinfirmaryStore.off('read_new_event_changed',NewEventChanged)
       staffinfirmaryStore.off('delete_staff_infirmary_changed',DeleteStaffInfirmaryChanged)
       staffinfirmaryStore.off('csv_export_infirmary_staff_changed',csvStaffInfirmaryChanged)
     })

      self.filteredInfirmaryStaff = ()=>{
        self.filteredInfirmaryStaffs = self.staffInfirmarys.filter(c => {
          return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchInfirmaryStaff.value.toLowerCase())>=0
        })
      } 

     //read courses
     self.readStaffInfirmary = () => {
         self.infirmary_staff_view='show_staff_table'
         self.loading=true
           staffinfirmaryStore.trigger('read_staff_infirmary', self.refs.read_category_id.value)
           //studentStore.trigger('read_students', obj)
     }
      self.readInfirmaryCategory = () => {
        staffinfirmaryStore.trigger('read_infirmary_category')
     }
     self.readEmployee = () => {
        staffinfirmaryStore.trigger('read_employee')
     }
     self.readInfirmaryCase = () => {
        staffinfirmaryStore.trigger('read_infirmary_case')
     }

     self.add_staff_infirmary = () => {
        self.infirmary_staff_view='show_infirmary_staff_form'
       // self.holiday_view=''
     }
    self.close_staff_infirmary_form = () => {
        self.infirmary_staff_view='show_staff_table'
       // self.readStudentInfirmary()
    }


    self.addEnter = (e) => {
       if(e.which == 13){
         self.add()
       }
     }

      self.add = () => {
         self.infirmaryCases.map(ev => {
              if(ev.case_id==self.refs.case_id.value){
               self.case_name=ev.case_name;
              }
            })
       if(!self.refs.staff_id.value){
         toastr.info("Please enter Emp ID No and try again")
       }else{
         self.loading = true
         if(self.title=='Create'){
            console.log('create')
             self.treatment_date=convertDate(self.refs.treatment_date.value)
           staffinfirmaryStore.trigger('add_staff_infirmary', self.refs.staff_id.value,self.refs.category_id.value,self.refs.case_id.value,self.treatment_date,self.refs.time_in.value,self.refs.time_out.value, self.refs.treatment.value, self.case_name)
         }else if(self.title=='Update'){
           console.log('update')
           console.log(self.edit_id)
            self.treatment_date=convertDate(self.refs.treatment_date.value)
           staffinfirmaryStore.trigger('edit_staff_infirmary',  self.refs.staff_id.value,self.refs.category_id.value,self.refs.case_id.value,self.treatment_date,self.refs.time_in.value,self.refs.time_out.value, self.refs.treatment.value,self.edit_id,self.case_name)
         }
       }
     }


      self.editEnter = (e) => {
       if(e.which == 13){
         self.edit(e)
       }  
     }

    self.cancelOperation = (e) => {
       self.staffInfirmarys.map(ev => {
           ev.confirmDelete = false
           ev.confirmEdit = false
       })
     }

     self.confirmDelete = (e) => {
     	console.log(e.item.st.staff_infirmary_id)
     	console.log("+++++++++++++")
       self.staffInfirmarys.map(ev => {
       	console.log(ev.staff_infirmary_id)
         if(ev.staff_infirmary_id != e.item.st.staff_infirmary_id){
           ev.confirmDelete = false
         }else{
           ev.confirmDelete = true
         }
       })
     }

     self.delete = (e) => {
       self.loading = true
       staffinfirmaryStore.trigger('delete_staff_infirmary', e.item.st.staff_infirmary_id)
     }

     self.edit = (ev,e) => {
       console.log(ev)
       self.title='Update'
        flatpickr(".date", {
          allowInput: true,
          dateFormat: "d/m/Y",
       })

       self.infirmary_staff_view='show_infirmary_staff_form'
       self.refs.staff_id.value=ev.staff_id
       self.refs.category_id.value=ev.category_id
       self.refs.case_id.value=ev.case_id
       self.refs.treatment_date.value=ev.treatment_date
       self.refs.time_in.value=ev.time_in
       self.refs.time_out.value=ev.time_out
       self.refs.treatment.value=ev.treatment
       console.log(ev.staff_infirmary_id)
       self.edit_id=ev.staff_infirmary_id
     }

    self.downloadCSV = () =>{
      staffinfirmaryStore.trigger('csv_export_infirmary_staff', self.staffInfirmarys)
    }
    
     staffinfirmaryStore.on('add_staff_infirmary_changed',AddStaffInfirmaryChanged)
     function AddStaffInfirmaryChanged(staffInfirmarys){
       console.log(staffInfirmarys) 
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.staffInfirmarys = staffInfirmarys
       self.filteredInfirmaryStaffs = staffInfirmarys
       self.update()
       self.readStaffInfirmary()
       console.log(self.staffInfirmarys)
     }

     staffinfirmaryStore.on('edit_staff_infirmary_changed',EditStaffInfirmaryChanged)
     function EditStaffInfirmaryChanged(staffInfirmarys){
       console.log(staffInfirmarys) 
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.staffInfirmarys = staffInfirmarys
       self.filteredInfirmaryStaffs = staffInfirmarys
       self.update()
       self.readStaffInfirmary()
      // console.log(self.empsectionsloye_roles)
     }

     staffinfirmaryStore.on('delete_staff_infirmary_changed',DeleteStaffInfirmaryChanged)
     function DeleteStaffInfirmaryChanged(staffInfirmarys){
       console.log(staffInfirmarys) 
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.staffInfirmarys = staffInfirmarys
       self.filteredInfirmaryStaffs = staffInfirmarys
       self.update()
       self.readStaffInfirmary()
       console.log(self.staffInfirmarys)
     }

     staffinfirmaryStore.on('read_staff_infirmary_changed',ReadStaffInfirmaryChanged)
     function ReadStaffInfirmaryChanged(staffInfirmarys){
       console.log(staffInfirmarys) 
       self.title='Create'
      self.refs.staff_id.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.staffInfirmarys = staffInfirmarys
       self.filteredInfirmaryStaffs = staffInfirmarys
       self.update()
       console.log(self.staffInfirmarys)
     }

     staffinfirmaryStore.on('read_infirmary_category_changed',InfirmaryCategoryChanged)
     function InfirmaryCategoryChanged(infirmaryCategories){
       console.log(infirmaryCategories) 
       self.infirmaryCategories = infirmaryCategories
       self.update()
       console.log(self.infirmaryCategories)
     }
    staffinfirmaryStore.on('read_infirmary_case_changed',InfirmaryCaseChanged)
     function InfirmaryCaseChanged(infirmaryCases){
       console.log(infirmaryCases) 
       self.infirmaryCases = infirmaryCases
       self.update()
       console.log(self.infirmaryCases)
     }
     staffinfirmaryStore.on('read_employee_changed',EmployeeChanged)
     function EmployeeChanged(employees){
       console.log(employees) 
       self.employees = employees
       self.update()
       console.log(self.employees)
     }

    staffinfirmaryStore.on('csv_export_infirmary_staff_changed',csvStaffInfirmaryChanged)
    function csvStaffInfirmaryChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }

</script>
</infirmary-staff>