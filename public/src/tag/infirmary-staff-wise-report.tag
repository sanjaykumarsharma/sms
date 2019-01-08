<infirmary-staff-wise-report>
  <header></header>
  <loading-bar if={loading}></loading-bar>
<section class="is-fluid">
  <div class="box">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Employee</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="staff_id">
                <option each={employees} value={emp_id}>{name}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-narrow">
          <label class="label">Start Date</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
             <input class="input date flatpickr-input form-control input"  ref="start_date" placeholder="" tabindex="0"  type="text">
          </div>
        </div>
          <div class="column is-narrow">
          <label class="label">End Date</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
              <input class="input date flatpickr-input form-control input"  ref="end_date" placeholder="" tabindex="0"  type="text">
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
          onclick={readStaffWiseReport} >Go
          </button>
          <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
        </button>
        </div>
      </div>
    </div>
  <div class="level">
    <div class="level-left">
      <h4 class="title" style="color: #ff3860;">Staff Wise Report</h4>
    </div>

    <!-- <div class="level-right">
      <button class="button is-warning is-rounded" onclick={add_student_infirmary}>
      <span class="icon">
        <span class="fas fa-plus"></span>
      </span>
      <span>Student Date Wise Case Re</span>
      </button>
    </div> -->
  </div>

  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Checkip Date</th>
          <th>Weight</th>
          <th>B.P</th>
          <th>B.M.I/th>
        </tr>
      </thead>
      <tbody>
        <tr each={st, i in staffWiseReports}>
          <td>{i+1}</td>
          <td>{st.checkup_date}</td>
          <td>{st.weight}</td>
          <td>{st.blood_presure}</td>
          <td>{st.bmi}</td>
          
        </tr>
      </tbody>
    </table>
</section>
 
  <!-- student profile end -->
<script>
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')
        self.readEmployee()
       // self.readInfirmaryCase()
       // self.readStudentInfirmary()
        console.log("inside BP")
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
        self.update()
     })
     self.on("unmount", function(){
       staffbpweightStore.off('read_staff_wise_report_changed', ReadStaffWiseReportChanged)
       staffbpweightStore.off('read_epmloyee_changed',EmployeeChanged)
     })

     //read courses
     self.readStaffWiseReport = () => {
           staffbpweightStore.trigger('read_staff_wise_report', self.refs.staff_id.value,self.refs.start_date.value,self.refs.end_date.value,)
           //studentStore.trigger('read_students', obj)
     }
      self.readEmployee = () => {
        staffbpweightStore.trigger('read_employee')
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

    
     staffbpweightStore.on('read_staff_wise_report_changed',ReadStaffWiseReportChanged)
     function ReadStaffWiseReportChanged(staffWiseReports){
       console.log(staffWiseReports) 
       self.loading = false
       self.staffWiseReports = staffWiseReports
       self.update()
       console.log(self.staffWiseReports)
     }

     staffbpweightStore.on('read_employee_changed',EmployeeChanged)
     function EmployeeChanged(employees){
       console.log(employees) 
       self.employees = employees
       self.update()
       console.log(self.employees)
     }

</script>
</infirmary-staff-wise-report>