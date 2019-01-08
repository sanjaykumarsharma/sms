<infirmary-lab-test>
  <header></header>
  <loading-bar if={loading}></loading-bar>
<section class="is-fluid" show={infirmary_staff_view == 'show_staff_table'}>
    <h2 class="title has-text-centered" style="color: #ff3860;">Staff Lab Test Detail</h2>
  <div class="box no-print">
      <div class="columns">
        <div class="column">
           <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                <span class="icon">
                   <i class="fas fa-print"></i>
               </span>
           </button>

           <button class="button is-info is-rounded  is-pulled-right" onclick={readStaffLabTest} style="margin-left:5px;margin-right:5px">
            <span class="icon">
              <span class="fas fa-sync-alt"></span>
            </span>
          </button>
         <button class="button is-warning is-rounded is-pulled-right" onclick={add_staff_infirmary}>
          <span class="icon">
            <span class="fas fa-plus"></span>
          </span>
         </button>

        </div>
      </div>
    </div>

  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Emp ID</th>
          <th>Name</th>
          <th>Heamoglobin</th>
          <th>Platelet</th>
          <th>Creatinine</th>
          <th>Blood sugar (F)</th>
          <th>Blood sugar (PP)</th>
          <th>Triglyceride</th>
          <th>Total Cholesterol</th>
          <th>SGPT</th>
          <th>SGOT</th>
          <th>Systolic BP</th>
          <th>Diastolic BP</th>
          <th class="has-text-centered">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr each={st, i in staffInfirmaryLabTests}>
          <td>{i+1}</td>
          <td>{st.employee_id}</td>
          <td>{st.first_name} {st.middle_name} {st.last_name}</td>
          <td>{st.heamoglobin}</td>
          <td>{st.platelet}</td>
          <td>{st.creatinine}</td>
          <td>{st.blood_sugar_f}</td>
          <td>{st.blood_sugar_p}</td>
          <td>{st.triglyceride}</td>
          <td>{st.total_cholesterol}</td>
          <td>{st.sgpt}</td>
          <td>{st.sgot}</td>
          <td>{st.systolic_bp}</td>
          <td>{st.diastolic_bp}</td>
          <td class="no-print">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={st.confirmDelete}>
              <span><a class="button is-small is-rounded" onclick={edit.bind(this, st)}>Edit</a></span>
              <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
              <span><a class="button is-small is-rounded has-text-success" onclick={printProfile.bind(this, st)}>Profile</a>
              </span> 
            </div>
            <div class="table-buttons" if={st.confirmDelete}>
              <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
              <span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</section>
<section class="is-fluid" show={infirmary_staff_view =='show_infirmary_staff_form'}>
  <div class="label">
    <div class="level-left">
      <h2 class="title" style="color: #ff3860;">{title} Staff Lab Test </h2>
    </div>
    <div class="level-right">
      <button class="button" onclick={close_staff_infirmary_form}>Back</button>
    </div>
  </div>
  <div class="box">
    <div class="columns">
      <div class="column is-2">
        <label class="label">Employee</label>
      </div>
        <div class="column is-2">
            <div class="select is-fullwidth">
            <select ref="emp_id">
              <option each={employees} value={emp_id}>{name}
              </option>
            </select>
          </div>
          </div>
        </div>

     <div class="columns">
        <div class="column is-2">
          <label class="label" for="class">Heamoglobin : </label>
        </div>

         <div class="column is-2">
          <div class="control">
             <input class="input form-control input"  ref="heamoglobin" >
          </div>
        </div>
        <div class="column is-2">
          <label class="label" for="class">Platelet : </label>
        </div>

         <div class="column is-2">
          <div class="control">
             <input class="input form-control input"  ref="platelet" >
          </div>
        </div>
   <!--  </div>


      <div class="columns"> -->
        <div class="column is-2">
          <label class="label" for="class">Creatinine:</label>
        </div>

         <div class="column is-2">
          <div class="control">
             <input class="input form-control input"  ref="creatinine" >
          </div>
        </div>
      </div>
      <div class="columns"> 
        <div class="column is-2">
          <label class="label" for="class">Blood Sugar (F):</label>
        </div>

         <div class="column is-2">
          <div class="control">
             <input class="input form-control input"  ref="blood_sugar_f" >
          </div>
        </div>
    
        <div class="column is-2">
          <label class="label" for="class">Blood Sugar (PP):</label>
        </div>

         <div class="column is-2">
          <div class="control">
             <input class="input form-control input"  ref="blood_sugar_p" >
          </div>
        </div>
        <div class="column is-2">
          <label class="label" for="class">Triglyceride:</label>
        </div>

         <div class="column is-2">
          <div class="control">
             <input class="input form-control input"  ref="triglyceride" >
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-2">
          <label class="label" for="class">Total Cholesterol:</label>
        </div>

         <div class="column is-2">
          <div class="control">
             <input class="input form-control input"  ref="total_cholesterol" >
          </div>
        </div>
        <div class="column is-2">
          <label class="label" for="class">SGPT:</label>
        </div>

         <div class="column is-2">
          <div class="control">
             <input class="input form-control input"  ref="sgpt" >
          </div>
        </div>
      
        <div class="column is-2">
          <label class="label" for="class">SGOT:</label>
        </div>

         <div class="column is-2">
          <div class="control">
             <input class="input form-control input"  ref="sgot" >
          </div>
        </div>
      </div>
      <div class="columns"> 
        <div class="column is-2">
          <label class="label" for="class">Systolic BP:</label>
        </div>
         <div class="column is-2">
          <div class="control">
             <input class="input form-control input"  ref="systolic_bp" >
          </div>
        </div>
        <div class="column is-2">
          <label class="label" for="class">Diastolic BP:</label>
        </div>

         <div class="column is-2">
          <div class="control">
             <input class="input form-control input"  ref="diastolic_bp" >
          </div>
        </div>
      </div>
      
    <div class="column is-full">
    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={add} >{title}</button>    
   </div>
  </div>

   <div class="box" each={in, i in staffInfirmaryTest}>
     <label class="label" for="class">Diastolic BP: {i}</label>
     <input class="input form-control input"  id="platelet{i}" >
     <span><a class="button is-small is-rounded " onclick={remove.bind(this, i)}>remove</a></span>

   </div>
</section>

<section class="is-fluid" show={infirmary_staff_view == 'show_infirmary_print_form'}>
  <div class="level no-print">
      <div class="level-left">
      </div>
      <div class="level-right">
        <button class="button is-primary has-text-weight-bold ml5 is-small" onclick="window.print()">
          <span class="icon">
            <i class="fas fa-print"></i>
          </span>
        </button>
        <button class="button is-warning has-text-weight-bold ml5 is-small " onclick={close_infirmary_staff_view}>
            <span class="icon">
                  <span class="fas fa-arrow-left"></span>
              </span>
          </button>

      </div>
    </div>
    <h2 class="title has-text-centered" style="color: #ff3860;">Staff Lab Test Detail</h2>
  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
    <tr>
      <th>Emp ID</th>
      <td class="has-text-weight-bold">{employee_id}</td>
      <th>Name</th>
      <td colspan="3" class="has-text-weight-bold">{first_name} {middle_name} {last_name}</td>
    </tr>
         <tr>
          <th style="width:140px">Test Name</th>
          <th style="width:90px">Result</th>
          <th class="has-background-danger"></th>
          <th class="has-background-warning"></th>
          <th class="has-background-success"></th>
          <th>UNIT</th>
     
        </tr>
        <tr show={gender_male}>
          <th>Heamoglobin</th>
          <td>{heamoglobin}</td>
          <td> < 6 </td>
          <td>7-11</td>
          <td>12-16</td>
          <td>gm/dl</td>
        </tr>
        <tr show={gender_female}>
          <th>Heamoglobin</th>
          <td>{heamoglobin}</td>
          <td> < 6 </td>
          <td>7-10</td>
          <td>11-15</td>
          <td>gm/dl</td>
        </tr>
        <tr>
          <th>Platelet</th>
          <td>{platelet}</td>
          <td> < 0.25</td>
          <td>0.25-1.4</td>
          <td>1.5-4.0</td>
          <td>lakh/cmm</td>
        </tr>
        <tr>
          <th>Creatinine</th>
          <td>{creatinine}</td>
          <td> > 3.0</td>
          <td>1.2-3.0</td>
          <td>0.6-1.1</td>
          <td>mg/dl</td>
        </tr>
        <tr>
          <th>Blood sugar (F)</th>
          <td>{blood_sugar_f}</td>
          <td> < 60 OR > 140</td>
          <td>60-69 OR 111-140</td>
          <td>70-100</td>
          <td>mg/dl</td>
        </tr>
        <tr>
          <th>Blood sugar (PP)</th>
          <td>{blood_sugar_p}</td>
          <td> > 160</td>
          <td>141-160</td>
          <td>70-140</td>
          <td>mg/dl</td>
        </tr>
        <tr>
          <th>Triglyceride</th>
          <td>{triglyceride}</td>
          <td> > 165 </td>
          <td> - </td>
          <td>60-165</td>
          <td>mg/dl</td>
        </tr>
         <tr>
          <th>Total Cholesterol</th>
          <td>{total_cholesterol}</td>
          <td> > 220</td>
          <td> - </td>
          <td>150-220</td>
          <td>mg/dl</td>
        </tr>
        <tr>
          <th>SGPT</th>
          <td>{sgpt}</td>
          <td> > 100 </td>
          <td>50-100</td>
          <td> Upto 49</td>
          <td>U/L</td>
        </tr>
        <tr>
          <th>SGOT</th>
          <td>{sgot}</td>
          <td> > 100</td>
          <td>47-100</td>
          <td>Upto 46</td>
          <td>U/L</td>
        </tr>
        <tr>
          <th>Systolic BP</th>
          <td>{systolic_bp}</td>
          <td> < 90 OR > 150 </td>
          <td>90-100 OR 140-150</td>
          <td>100-140</td>
          <td>mm of HG</td>
        </tr>
        <tr>
           <th>Diastolic BP</th>
           <td>{diastolic_bp}</td>
           <td> < 60 OR > 100</td>
           <td>60-70 OR 90-100</td>
           <td>70-90</td>
           <td>mm of HG</td>
        </tr>
    </table>
</section>
 
  <!-- student profile end -->
<script>
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')
        self.infirmary_staff_view='show_staff_table'

        self.readEmployee()
        self.readStaffLabTest()
        console.log("inside staff infirmary")
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
         self.gender_female=false
         self.gender_male=false
  
        self.update()
     })
     self.on("unmount", function(){
       staffinfirmaryStore.off('read_staff_infirmary_lab_test_changed', ReadStaffInfirmaryLabTestChanged)
       staffinfirmaryStore.off('add_staff_infirmary_lab_test_changed', AddStaffInfirmaryLabTestChanged)
       staffinfirmaryStore.off('edit_staff_infirmary_lab_test_changed',EditStaffInfirmaryLabTestChanged)
       staffinfirmaryStore.off('delete_staff_infirmary_lab_test_changed',DeleteStaffInfirmaryLabTestChanged)
       staffinfirmaryStore.off('read_employee_changed',EmployeeChanged)
     })

     //read courses
     self.readStaffLabTest = () => {
         self.infirmary_staff_view='show_staff_table'
         self.loading=true
         staffinfirmaryStore.trigger('read_staff_lab_test')
           //studentStore.trigger('read_students', obj)
     }
    

      self.readEmployee = () => {
        staffinfirmaryStore.trigger('read_employee')
      }

     self.add_staff_infirmary = () => {
        self.infirmary_staff_view='show_infirmary_staff_form'
       // self.holiday_view=''
     }
    self.close_staff_infirmary_form = () => {
        self.infirmary_staff_view='show_staff_table'
       // self.readStudentInfirmary()
    }
       
     

      self.add = () => {
       if(!self.refs.emp_id.value){
         toastr.info("Please enter Emp ID No and try again")
       }else{
         self.loading = true
         if(self.title=='Create'){
            console.log('create')

           staffinfirmaryStore.trigger('add_staff_lab_test_infirmary', self.refs.emp_id.value,self.refs.heamoglobin.value,self.refs.platelet.value,self.refs.creatinine.value,self.refs.blood_sugar_f.value,self.refs.blood_sugar_p.value,self.refs.triglyceride.value,self.refs.total_cholesterol.value,self.refs.sgpt.value,self.refs.sgot.value,self.refs.systolic_bp.value,self.refs.diastolic_bp.value)
         }else if(self.title=='Update'){
           console.log('update')
           console.log(self.edit_id)
           staffinfirmaryStore.trigger('edit_staff_lab_test_infirmary',  self.refs.emp_id.value,self.refs.heamoglobin.value,self.refs.platelet.value,self.refs.creatinine.value,self.refs.blood_sugar_f.value,self.refs.blood_sugar_p.value,self.refs.triglyceride.value,self.refs.total_cholesterol.value,self.refs.sgpt.value,self.refs.sgot.value,self.refs.systolic_bp.value,self.refs.diastolic_bp.value,self.edit_id)
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
       self.staffInfirmaryLabTests.map(ev => {
           ev.confirmDelete = false
           ev.confirmEdit = false
       })
     }

     self.confirmDelete = (e) => {
      console.log(e.item.st.lab_id)
      console.log("+++++++++++++")
       self.staffInfirmaryLabTests.map(ev => {
        console.log(ev.lab_id)
         if(ev.lab_id != e.item.st.lab_id){
           ev.confirmDelete = false
         }else{
           ev.confirmDelete = true
         }
       })
     }

     self.delete = (e) => {
       self.loading = true
       staffinfirmaryStore.trigger('delete_lab_test', e.item.st.lab_id)
     }

     self.edit = (ev,e) => {
       console.log(ev)
       self.title='Update'
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })

          self.infirmary_staff_view='show_infirmary_staff_form'
          self.refs.emp_id.value=ev.emp_id
          self.refs.heamoglobin.value=ev.heamoglobin
          self.refs.platelet.value=ev.platelet
          self.refs.creatinine.value=ev.creatinine
          self.refs.blood_sugar_f.value=ev.blood_sugar_f
          self.refs.blood_sugar_p.value=ev.blood_sugar_p
          self.refs.triglyceride.value=ev.triglyceride
          self.refs.total_cholesterol.value=ev.total_cholesterol
          self.refs.sgpt.value=ev.sgpt
          self.refs.sgot.value=ev.sgot
          self.refs.systolic_bp.value=ev.systolic_bp
          self.refs.diastolic_bp.value=ev.diastolic_bp
          self.edit_id=ev.lab_id
     }
     // Print Profile
      self.printProfile = (ev,e) => {
           console.log(ev)
          self.infirmary_staff_view='show_infirmary_print_form'
          self.gender = ev.gender

          if(self.gender=='M'){
             self.gender_male=true
             self.gender_female=false
          }else{
              self.gender_female=true
              self.gender_male=false
          }
          self.emp_id=ev.emp_id
          self.employee_id=ev.employee_id
          self.first_name=ev.first_name
          self.middle_name=ev.middle_name
          self.last_name=ev.last_name
          self.heamoglobin=ev.heamoglobin
          self.platelet=ev.platelet
          self.creatinine=ev.creatinine
          self.blood_sugar_f=ev.blood_sugar_f
          self.blood_sugar_p=ev.blood_sugar_p
          self.triglyceride=ev.triglyceride
          self.total_cholesterol=ev.total_cholesterol
          self.sgpt=ev.sgpt
          self.sgot=ev.sgot
          self.systolic_bp=ev.systolic_bp
          self.diastolic_bp=ev.diastolic_bp
          self.update()
      }
      self.close_infirmary_staff_view= () =>{
        self.infirmary_staff_view='show_staff_table'
      }
    
     staffinfirmaryStore.on('add_staff_infirmary_lab_test_changed',AddStaffInfirmaryLabTestChanged)
     function AddStaffInfirmaryLabTestChanged(staffInfirmaryLabTests){
       console.log(staffInfirmaryLabTests) 
       self.title='Create'
          self.refs.emp_id.value=""
          self.refs.heamoglobin.value=""
          self.refs.platelet.value=""
          self.refs.creatinine.value=""
          self.refs.blood_sugar_f.value=""
          self.refs.blood_sugar_p.value=""
          self.refs.triglyceride.value=""
          self.refs.total_cholesterol.value=""
          self.refs.sgpt.value=""
          self.refs.sgot.value=""
          self.refs.systolic_bp.value=""
          self.refs.diastolic_bp.value=""
         self.loading = false
         self.staffInfirmaryLabTests = staffInfirmaryLabTests
        self.update()
      //  self.readStaffInfirmary()
       console.log(self.staffInfirmaryLabTests)
     }

     staffinfirmaryStore.on('edit_staff_infirmary_lab_test_changed',EditStaffInfirmaryLabTestChanged)
     function EditStaffInfirmaryLabTestChanged(staffInfirmaryLabTests){
       console.log(staffInfirmaryLabTests) 
          self.title='Create'
          self.refs.emp_id.value=""
          self.refs.heamoglobin.value=""
          self.refs.platelet.value=""
          self.refs.creatinine.value=""
          self.refs.blood_sugar_f.value=""
          self.refs.blood_sugar_p.value=""
          self.refs.triglyceride.value=""
          self.refs.total_cholesterol.value=""
          self.refs.sgpt.value=""
          self.refs.sgot.value=""
          self.refs.systolic_bp.value=""
          self.refs.diastolic_bp.value=""
          self.loading = false
          self.staffInfirmaryLabTests = staffInfirmaryLabTests
          self.update()
      // self.readStaffInfirmary()
      // console.log(self.empsectionsloye_roles)
     }

     staffinfirmaryStore.on('delete_staff_infirmary_lab_test_changed',DeleteStaffInfirmaryLabTestChanged)
     function DeleteStaffInfirmaryLabTestChanged(staffInfirmaryLabTests){
       console.log(staffInfirmaryLabTests) 
        self.title='Create'
        self.refs.emp_id.value=""
        self.refs.heamoglobin.value=""
        self.refs.platelet.value=""
        self.refs.creatinine.value=""
        self.refs.blood_sugar_f.value=""
        self.refs.blood_sugar_p.value=""
        self.refs.triglyceride.value=""
        self.refs.total_cholesterol.value=""
        self.refs.sgpt.value=""
        self.refs.sgot.value=""
        self.refs.systolic_bp.value=""
        self.refs.diastolic_bp.value=""
        self.loading = false
        self.staffInfirmaryLabTests = staffInfirmaryLabTests
        self.update()
     // self.readStudentInfirmary()
       console.log(self.staffInfirmaryLabTests)
     }

     staffinfirmaryStore.on('read_staff_infirmary_lab_test_changed',ReadStaffInfirmaryLabTestChanged)
     function ReadStaffInfirmaryLabTestChanged(staffInfirmaryLabTests){
        console.log(staffInfirmaryLabTests) 
          self.title='Create'
          self.refs.emp_id.value=""
          self.refs.heamoglobin.value=""
          self.refs.platelet.value=""
          self.refs.creatinine.value=""
          self.refs.blood_sugar_f.value=""
          self.refs.blood_sugar_p.value=""
          self.refs.triglyceride.value=""
          self.refs.total_cholesterol.value=""
          self.refs.sgpt.value=""
          self.refs.sgot.value=""
          self.refs.systolic_bp.value=""
          self.refs.diastolic_bp.value=""
          self.loading = false
          self.staffInfirmaryLabTests = staffInfirmaryLabTests
          self.update()
        console.log(self.staffInfirmaryLabTests)
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

</script>
</infirmary-lab-test>