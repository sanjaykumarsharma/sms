<infirmary-staff-health-card-report>
  <loading-bar if={loading}></loading-bar>
<section class="is-fluid">
  <h4 class="title has-text-centered no-print" style="color: #ff3860;">Yearly Health Report</h4>
 <div class="box  no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Start Date</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
             <input class="input date flatpickr-input form-control input"  ref="start_date" placeholder="" tabindex="0"  type="text" style="width:130px">
          </div>
        </div>
          <div class="column is-narrow">
          <label class="label">End Date</label>
        </div>
         <div class="column is-narrow">
          <div class="control">
              <input class="input date flatpickr-input form-control input"  ref="end_date" placeholder="" tabindex="0"  type="text" style="width:130px">
          </div>
        </div>
          <div class="column is-narrow">
          <label class="label">Employee ID</label>
        </div>
          <div class="column">
          <div class="control">
              <input class="input form-control input"  ref="employee_id" placeholder="" type="text">
          </div>
        </div>
       
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
               onclick={printStaffHealthReport} >Go
          </button>

          <button class="button is-primary has-text-weight-bold is-pulled-right" onclick={printStaffHealthReport} title="Print">
                  <span class="icon" style="margin-right:5px">
                     <i class="fas fa-print"></i></span>
                  Print All
           </button>
         
        </div>
      </div>
    </div>
</section>
<section show={health_view =='show_health'}  each={healthReport, i in staffInfirmaryHealthReports} style="margin-top:20px">
       <header></header>
       <h4 class="title has-text-centered" style="color: #ff3860;background-color:#eee">YEARLY HEALTH RECORD ({session_name}) From {start_date} To {end_date}</h4>
      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
        <tr>
          <th>Employee ID</th>
          <td>{healthReport.employee_id}</td>
          <th>Name</th>
          <td>{healthReport.name}</td>
          <th>Department</th>
          <td>{healthReport.department_name}</td>
          <th>Designation</th>
          <td>{healthReport.designation}</td>
        </tr>
      </table>
      <!--style="max-height:400px;min-height:400px"-->
     <table class="table is-fullwidth is-striped is-hoverable is-bordered"> 
      <thead> 
       <tr>
          <th>Date</th>
          <th>WEIGHT (kg)</th>
          <th>HEIGHT (cm)</th>
          <th>B.P</th>
          <th>B.M.I</th>
        </tr>
      </thead>   
      <tbody>
        <tr each={st, i in healthReport.staffHelathArray}>
          <td>{st.checkup_date}</td>
          <td>{st.weight}</td>
          <td>{st.height}</td>
          <td>{st.blood_pressure}</td>
          <td>{st.bmi}</td>
        </tr>
      </tbody>
    </table>
    <table class="table is-fullwidth is-striped is-bordered">
      <label>Doctor Remark/Advice</label>
       <tr>
        <td colspan="5" style="height:150px"></td>
      </tr>
    </table>
      <table class="table is-fullwidth is-striped is-bordered">
      <label>Doctor's Signature</label>  <label style="margin-left:200px">Note</label> <label class="is-pulled-right">Principle</label>
       <tr>
        <td colspan="5">
         <span> Normal B.P.: 120/80<br>
          B.M.I Range  Underweight=<18.5  Normal=18.5 ? 25  Overweight= 25-30  Obesity => 30 </span>
        </td>
      </tr>
    </table>
      <div class="pagebreak"></div>
    </section>

 
  <!-- staff profile end -->
<script>
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')
        console.log("inside staff infirmary")
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
        self.update()
     })
     self.on("unmount", function(){
      staffinfirmaryStore.off('read_staff_health_report_changed',ReadStaffHealthReportChanged)
     })

  
      self.printStaffHealthReport = () => {
          self.loading=true;
          if(!self.refs.start_date.value){
           toastr.info("Please enter start_date")
         }else if(!self.refs.end_date.value){
           toastr.info("Please enter end_date")
         }else{
          self.loading=true;
          self.start_date=self.refs.start_date.value
          self.end_date=self.refs.end_date.value
           staffinfirmaryStore.trigger('read_staff_health_report', self.refs.employee_id.value,self.refs.start_date.value,self.refs.end_date.value)
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

    staffinfirmaryStore.on('read_staff_health_report_changed',ReadStaffHealthReportChanged)
     function ReadStaffHealthReportChanged(staffInfirmaryHealthReports,session_name){
       console.log(staffInfirmaryHealthReports) 
       self.staffInfirmaryHealthReports = staffInfirmaryHealthReports
       self.staffLength=staffInfirmaryHealthReports.length
       self.session_name=session_name
       console.log("length")
       console.log(self.staffLength)
       self.health_view ='show_health'
       self.loading=false
       self.update()
       console.log("inside health")
       console.log(self.staffInfirmaryHealthReports)
     }

</script>
</infirmary-staff-health-card-report>