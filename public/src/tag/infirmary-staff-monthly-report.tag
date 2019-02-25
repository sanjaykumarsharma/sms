<infirmary-staff-monthly-report>
  <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
<section class="is-fluid">
  <h4 class="title has-text-centered" style="color: #ff3860;">Detail of All Staff Illness for the Month of {month}</h4>
  <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Month</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="month_id" id="month_id">
                <option value="01">JANUARY</option>
                <option value="02">FEBRUARY</option>
                <option value="03">MARCH</option>
                <option value="04">APRIL</option>
                <option value="05">MAY</option>
                <option value="06">JUNE</option>
                <option value="07">JULY</option>
                <option value="08">AUGUST</option>
                <option value="09">SEPTEMBER</option>
                <option value="10">OCTOBER</option>
                <option value="11">NOVEMBER</option>
                <option value="12">DECEMBER</option>
            </select>
            </div>
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
          onclick={readStaffMonthlyCaseReport} >Go
          </button>
           <button class="button is-primary has-text-weight-bold is-pulled-right" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
        </button>
        </div>
      </div>
    </div>

  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Name</th>
          <th>Date</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr each={st, i in staffMonthlyCaseReports}>
          <td>{i+1}</td>
          <td>{st.category_name}</td>
          <td>{st.staff_name}</td>
          <td>{st.treatment_date}</td>
          <td>{st.total}</td>
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
       // self.infirmary_staff_view='show_staff_date-wise-case-report-table';
        //self.readInfirmaryCategory()
       // self.readInfirmaryCase()
       // self.readStaffInfirmary()
        console.log("inside staff infirmary")
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
        self.update()
     })
     self.on("unmount", function(){
      // staffinfirmaryStore.off('read_staff_date_wise_case_report_changed', ReadStaffDateWiseCaseReportChanged)
       //  staffinfirmaryStore.off('read_infirmary_category_changed',InfirmaryCategoryChanged)
      staffinfirmaryStore.off('read_staff_monthly_report_changed',ReadStaffMonthlyCaseReportChanged)
     })

     //read courses
    /* self.readStaffInfirmaryDateWiseCaseReport = () => {
         //self.infirmary_staff_view='show_staff_table'
           staffinfirmaryStore.trigger('read_staff_date_wise_case_report', self.refs.read_category_id.value,self.refs.start_date.value,self.refs.end_date.value,)
           //staffStore.trigger('read_staffs', obj)
     }*/
     self.readStaffMonthlyCaseReport = () => {
           self.month = $("#month_id option:selected").text();
           staffinfirmaryStore.trigger('read_staff_monthly_case_report', self.refs.month_id.value)
     }
      /*self.readInfirmaryCategory = () => {
        staffinfirmaryStore.trigger('read_infirmary_category')
     }*/
    

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

    
/*     staffinfirmaryStore.on('read_staff_date_wise_case_report_changed',ReadStaffDateWiseCaseReportChanged)
     function ReadStaffDateWiseCaseReportChanged(staffDateWiseCaseReports){
       console.log(staffDateWiseCaseReports) 
       self.loading = false
       self.staffDateWiseCaseReports = staffDateWiseCaseReports
       self.update()
       console.log(self.staffDateWiseCaseReports)
     }

     staffinfirmaryStore.on('read_infirmary_category_changed',InfirmaryCategoryChanged)
     function InfirmaryCategoryChanged(infirmaryCategories){
       console.log(infirmaryCategories) 
       self.infirmaryCategories = infirmaryCategories
       self.update()
       console.log(self.infirmaryCategories)
     }*/
    staffinfirmaryStore.on('read_staff_monthly_report_changed',ReadStaffMonthlyCaseReportChanged)
     function ReadStaffMonthlyCaseReportChanged(staffMonthlyCaseReports){
       console.log(staffMonthlyCaseReports) 
       self.staffMonthlyCaseReports = staffMonthlyCaseReports
       self.update()
       console.log(self.staffMonthlyCaseReports)
     }

</script>
</infirmary-staff-monthly-report>