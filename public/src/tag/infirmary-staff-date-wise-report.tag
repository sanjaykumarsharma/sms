<infirmary-staff-date-wise-report>
  <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
<section class="is-fluid">
     <h2 class="title  has-text-centered" style="color: #ff3860;">Staff Weight and B.P Record<br>
    From: <span style="color:#000">{sdate}</span> To: <span style="color:#000">{edate}</span>
     </h2>
  <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Start Date</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
             <input class="input date flatpickr-input form-control input" style="width:150px"  ref="start_date" placeholder="" tabindex="0"  type="text">
          </div>
        </div>
          <div class="column is-narrow">
          <label class="label">End Date</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
              <input class="input date flatpickr-input form-control input" style="width:150px"  ref="end_date" placeholder="" tabindex="0"  type="text">
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
          onclick={readStaffBPWeightDateWiseReport} >Go
          </button>

           <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
            </button>

            <button class="button is-info is-rounded is-pulled-right" onclick={readStaffInfirmary} style="margin-left:5px;margin-right:5px">
                <span class="icon">
                  <span class="fas fa-sync-alt"></span>
                </span>
                </button>
        </div>
      </div>
    </div>

  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>DOB</th>
          <th>Employee ID</th>
          <th>Check up Date</th>
          <th>Weight</th>
          <th>B.P</th>
          <th>B.M.I</th>
        <!--   <th>Action</th> -->
        </tr>
      </thead>
      <tbody>
        <tr each={st, i in staffDateWiseBpWeightReports}>
          <td>{i+1}</td>
          <td>{st.name}</td>
          <td>{st.dob}</td>
          <td>{st.employee_id}</td>
          <td>{st.checkup_date}</td>
          <td>{st.weight}</td>
          <td>{st.blood_pressure}</td>
          <td>{st.bmi}</td>
        </tr>
      </tbody>
    </table>
</section>


  <!-- staff profile end -->
<script>
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')
        flatpickr(".date", {
        allowInput: true,
          dateFormat: "d/m/Y",
      })
        self.update()
     })
     self.on("unmount", function(){
         staffbpweightStore.off('read_staff_bp_weight_date_wise_report_changed', ReadStafBpWeightDateWiseReportChanged)
     })

     //read courses
     self.readStaffBPWeightDateWiseReport = () => {
           // self.category_name = $("#read_category_id option:selected").text();
            self.start_date=convertDate(self.refs.start_date.value)
            self.end_date=convertDate(self.refs.end_date.value)
            self.sdate=self.refs.start_date.value
            self.edate=self.refs.end_date.value
            self.loading=true
           staffbpweightStore.trigger('read_staff_date_wise_bp_report',self.start_date,self.end_date)
           //staffStore.trigger('read_staffs', obj)
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

    
     staffbpweightStore.on('read_staff_bp_weight_date_wise_report_changed',ReadStafBpWeightDateWiseReportChanged)
     function ReadStafBpWeightDateWiseReportChanged(staffDateWiseBpWeightReports){
       console.log(staffDateWiseBpWeightReports) 
       self.loading = false
       self.staffDateWiseBpWeightReports = staffDateWiseBpWeightReports
       self.update()
       console.log(self.staffDateWiseBpWeightReports)
     }

   

</script>
</infirmary-staff-date-wise-report>