<infirmary-staff-bp-weight>
 <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
<section class="is-fluid" show={infirmary_staff_view == 'show_staff_bp_weight_table'}>
  <h2 class="title printOnly_t has-text-centered" style="color: #ff3860;">Staff Weight and B.P Records</h2>
   <h2 class="title no-print has-text-centered" style="color: #ff3860;">Staff Health Detail</h2>
  <div class="box no-print">
      <div class="columns">
        <div class="column">
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
           <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readStaffBPWeight} style="margin-left:5px;margin-right:5px">
              <span class="icon">
                <span class="fas fa-sync-alt"></span>
              </span>
              </button>
            <button class="button is-info is-rounded is-pulled-right is-small ml5" onclick={add_staff_infirmary}>
          <span class="icon">
            <span class="fas fa-plus"></span>
          </span>
          </button>
           <input class="input is-pulled-right" ref="searchInfirmaryStaffBpWeight" onkeyup={filteredInfirmaryStaffBpWeight} type="text" style="width:200px;margin-right:5px;" placeholder="Search">  
        </div>
      </div>
    </div>
 <!--  <div class="level">
    <div class="level-middle">
     
    </div>

    <div class="level-right no-print">
      
    </div>
  </div> -->

  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Emp ID</th>
          <th>Checkup Date</th>
          <th>Time In</th>
          <th>Time Out</th>
          <th>B.P</th>
          <th>Height</th>
          <th>Weight</th>
          <th>B.M.I</th>
          <th class="no-print">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr each={st, i in filteredInfirmaryStaffBpWeights}>
          <td>{i+1}</td>
          <td>{st.name}</td>
          <td>{st.employee_id}</td>
          <td>{st.checkup_date}</td>
          <td>{st.time_in}</td>
          <td>{st.time_out}</td>
          <td>{st.blood_pressure}<!-- {st.upper_bp}/{lower_bp} --></td>
          <td>{st.height}</td>
          <td>{st.weight}</td>
          <td>{st.bmi}</td>
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
<section class="is-fluid" show={infirmary_staff_view =='show_staff_bp_weight_form'}>
  <div class="label">
    <div class="level-left">
      <h2 class="title" style="color: #ff3860;">{title}</h2>
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
         <label class="label">Date</label>
        <input class="input date flatpickr-input form-control input"  ref="checkup_date" placeholder="" tabindex="0" type="text" onkeyup={addEnter}>
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
         <label class="label">Upper B.P</label>
        <input type="text" ref="upper_bp" type="text" class="input" onkeyup={addEnter}>
        </div>
         <div class="column is-one-third">
         <label class="label">Lower B.P</label>
        <input type="text" ref="lower_bp" type="text" class="input" onkeyup={addEnter}>
        </div>
        <div class="column is-one-third">
         <label class="label">Height (Cm)</label>
        <input type="number" ref="height" type="text" class="input" onkeyup={addEnter}>
        </div>
        <div class="column is-one-third">
         <label class="label">Weight (Kg)</label>
        <input type="text" ref="weight" type="text" class="input" onkeyup={calculateBmi}>
        </div>
        <div class="column is-one-third">
         <label class="label">BMI</label>
        <input type="text" ref="bmi" type="text" class="input" onkeyup={addEnter}>
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
        self.infirmary_staff_view='show_staff_bp_weight_table'
        self.readStaffBPWeight()
        self.readEmployee()
        console.log("inside staff BP weight")
        flatpickr(".date", {
          allowInput: true,
          dateFormat: "d/m/Y",
       })
        self.update()
     })
     self.on("unmount", function(){
       staffbpweightStore.off('read_staff_bp_weight_changed', ReadStaffBPWeightChanged)
       staffbpweightStore.off('read_employee_changed', EmployeeChanged)
       staffbpweightStore.off('add_staff_bp_weight_changed', AddStaffBPWeightChanged)
       staffbpweightStore.off('edit_staff_bp_weight_changed',EditStaffBPWeightChanged)
       staffbpweightStore.off('delete_staff_bp_weight_changed',DeleteStaffBPWeightChanged)
       staffbpweightStore.off('csv_export_staff_bp_weight_changed',csvrStaffBpWeightChanged)
     })
       self.filteredInfirmaryStaffBpWeight = ()=>{
        self.filteredInfirmaryStaffBpWeights = self.staffBpWeights.filter(c => {
          return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchInfirmaryStaffBpWeight.value.toLowerCase())>=0
        })
      } 

     self.calculateBmi=()=>{
      self.height=self.refs.height.value
      self.weight=self.refs.weight.value
      console.log(self.height)
      console.log(self.weight)
      self.totalHeight=Number(self.height) * Number(self.height)
      console.log(self.totalHeight)
      self.BMI=self.weight/self.totalHeight
      console.log(self.BMI);
     self.refs.bmi.value=Number((self.BMI) * (10000)).toFixed(2)
     }
     //read courses
     self.readStaffBPWeight = () => {
      self.loading=true
           staffbpweightStore.trigger('read_staff_bp_weight')
           //studentStore.trigger('read_students', obj)
     }
      
     self.readEmployee = () => {
        staffbpweightStore.trigger('read_employee')
     }

     self.downloadCSV = () =>{
      console.log(self.staffBpWeights)
      staffbpweightStore.trigger('csv_export_staff_bp_weight', self.staffBpWeights)
    }

     self.add_staff_infirmary = () => {
        self.title='Create'
        self.infirmary_staff_view='show_staff_bp_weight_form'
       // self.holiday_view=''
     }
    self.close_staff_infirmary_form = () => {
       self.infirmary_staff_view='show_staff_bp_weight_table'
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.height.value=''
       self.refs.weight.value=''
       self.refs.checkup_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.lower_bp.value=''
       self.refs.upper_bp.value=''
       self.refs.bmi.value=''
    }

    self.addEnter = (e) => {
       if(e.which == 13){
         self.add()
       }
    }


      self.add = () => {
       if(!self.refs.staff_id.value){
         toastr.info("Please enter Emp ID No and try again")
       }else{
         self.loading = true
         if(self.title=='Create'){
            console.log('create')
               self.checkup_date=convertDate(self.refs.checkup_date.value)
           staffbpweightStore.trigger('add_staff_bp_weight', self.refs.staff_id.value,   self.checkup_date,self.refs.time_in.value,self.refs.time_out.value, self.refs.upper_bp.value,self.refs.lower_bp.value,self.refs.height.value,self.refs.weight.value,self.refs.bmi.value)
         }else if(self.title=='Update'){
           console.log('update')
           console.log(self.edit_id)
             self.checkup_date=convertDate(self.refs.checkup_date.value)
           staffbpweightStore.trigger('edit_staff_bp_weight', self.refs.staff_id.value,   self.checkup_date,self.refs.time_in.value,self.refs.time_out.value, self.refs.upper_bp.value,self.refs.lower_bp.value,self.refs.height.value,self.refs.weight.value,self.refs.bmi.value,self.edit_id)
         }
       }
     }

    

      self.editEnter = (e) => {
       if(e.which == 13){
         self.edit(e)
       }  
     }

    self.cancelOperation = (e) => {
       self.staffBpWeights.map(ev => {
           ev.confirmDelete = false
           ev.confirmEdit = false
       })
     }

     self.confirmDelete = (e) => {
     	console.log(e.item.st.health_id)
     	console.log("+++++++++++++")
       self.staffBpWeights.map(ev => {
       	console.log(ev.health_id)
         if(ev.health_id != e.item.st.health_id){
           ev.confirmDelete = false
         }else{
           ev.confirmDelete = true
         }
       })
     }

     self.delete = (e) => {
       self.loading = true
       staffbpweightStore.trigger('delete_staff_bp_weight', e.item.st.health_id)
     }

     self.edit = (ev,e) => {
       console.log(ev)
       self.title='Update'
        flatpickr(".date", {
         allowInput: true,
       //  altFormat: "d/m/Y",
         dateFormat: "d/m/Y",
       })

       self.infirmary_staff_view='show_staff_bp_weight_form'
       self.refs.staff_id.value=ev.staff_id
       self.refs.height.value=ev.height
       self.refs.weight.value=ev.weight
       self.refs.checkup_date.value=ev.checkup_date
       self.refs.time_in.value=ev.time_in
       self.refs.time_out.value=ev.time_out
       self.refs.lower_bp.value=ev.lower_bp
       self.refs.upper_bp.value=ev.upper_bp
       self.refs.bmi.value=ev.bmi
       console.log(ev.health_id)
       self.edit_id=ev.health_id
     }
    
     staffbpweightStore.on('add_staff_bp_weight_changed',AddStaffBPWeightChanged)
     function AddStaffBPWeightChanged(staffBpWeights){
       console.log(staffBpWeights) 
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.height.value=''
       self.refs.weight.value=''
       self.refs.checkup_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.upper_bp.value=''
       self.refs.lower_bp.value=''
       self.refs.bmi.value=''
       self.loading = false
       self.staffBpWeights = staffBpWeights
       self.filteredInfirmaryStaffBpWeights = staffBpWeights
       self.update()
       self.readStaffBPWeight()
       console.log(self.staffBpWeights)
     }

     staffbpweightStore.on('edit_staff_bp_weight_changed',EditStaffBPWeightChanged)
     function EditStaffBPWeightChanged(staffBpWeights){
       console.log(staffBpWeights) 
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.height.value=''
       self.refs.weight.value=''
       self.refs.checkup_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.upper_bp.value=''
       self.refs.lower_bp.value=''
       self.refs.bmi.value=''
       self.loading = false
       self.staffBpWeights = staffBpWeights
       self.filteredInfirmaryStaffBpWeights = staffBpWeights
       self.update()
       self.readStaffBPWeight()
      // console.log(self.empsectionsloye_roles)
     }

     staffbpweightStore.on('delete_staff_bp_weight_changed',DeleteStaffBPWeightChanged)
     function DeleteStaffBPWeightChanged(staffBpWeights){
       console.log(staffBpWeights) 
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.height.value=''
       self.refs.weight.value=''
       self.refs.checkup_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.upper_bp.value=''
       self.refs.lower_bp.value=''
       self.refs.bmi.value=''
       self.loading = false
       self.staffBpWeights = staffBpWeights
       self.filteredInfirmaryStaffBpWeights = staffBpWeights
       self.update()
       self.readStaffBPWeight()
       console.log(self.staffBpWeights)
     }

     staffbpweightStore.on('read_staff_bp_weight_changed',ReadStaffBPWeightChanged)
     function ReadStaffBPWeightChanged(staffBpWeights){
       console.log(staffBpWeights) 
       self.title='Create'
       self.refs.staff_id.value=''
       self.refs.height.value=''
       self.refs.weight.value=''
       self.refs.checkup_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.upper_bp.value=''
       self.refs.lower_bp.value=''
       self.refs.bmi.value=''
       self.loading = false
       self.staffBpWeights = staffBpWeights
       self.filteredInfirmaryStaffBpWeights = staffBpWeights
       self.update()
       console.log(self.staffInfirmarys)
     }

    
     staffbpweightStore.on('read_employee_changed',EmployeeChanged)
     function EmployeeChanged(employees){
       console.log(employees) 
       self.employees = employees
       self.update()
       console.log(self.employees)
     }

    staffbpweightStore.on('csv_export_staff_bp_weight_changed',csvrStaffBpWeightChanged)
    function csvrStaffBpWeightChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }

</script>
</infirmary-staff-bp-weight>