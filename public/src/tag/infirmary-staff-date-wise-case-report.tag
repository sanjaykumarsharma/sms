<infirmary-staff-date-wise-case-report>
<section class="is-fluid" show={infirmary_staff_view == 'show_staff_date-wise-case-report-table'}>
  <div class="box">
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
          onclick={readStaffInfirmaryDateWiseCaseReport} >Go
          </button>
        </div>
      </div>
    </div>
  <div class="level">
    <div class="level-left">
      <h4 class="title" style="color: #ff3860;">Staff Date Wise Case Report</h4>
    </div>

    <!-- <div class="level-right">
      <button class="button is-warning is-rounded" onclick={add_staff_infirmary}>
      <span class="icon">
        <span class="fas fa-plus"></span>
      </span>
      <span>Staff Date Wise Case Re</span>
      </button>
    </div> -->
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
        <!--   <th>Action</th> -->
        </tr>
      </thead>
      <tbody>
        <tr each={st, i in staffDateWiseCaseReports}>
          <td>{i+1}</td>
          <td>{st.name}</td>
          <td>{st.employee_id}</td>
          <td>{st.case_name}</td>
          <td>{st.t_date}</td>
          <td>{st.time_in}</td>
          <td>{st.time_out}</td>
          <td>{st.treatment}</td>
          <!-- <td class="has-text-right">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={st.confirmDelete}>
              <span><a class="button is-small is-rounded" onclick={edit.bind(this, st)}>Edit</a></span>
              <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            </div>
            <div class="table-buttons" if={st.confirmDelete}>
              <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
              <soan disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
            </div>
          </td> -->
        </tr>
      </tbody>
    </table>
</section>

<!-- <section class="is-fluid" show={infirmary_staff_view == 'show_staff_monthly_report_table'}>
  <div class="box">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Month</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="month_id">
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
        </div>
      </div>
    </div>
  <div class="level">
    <div class="level-left">
      <h4 class="title" style="color: #ff3860;">Staff Monthly Case Report</h4>
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
          <td>{st.name}</td>
          <td>{st.treatment_date}</td>
          <td>{st.total}</td>
        </tr>
      </tbody>
    </table>
</section> -->
 
  <!-- staff profile end -->
<script>
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')
        self.infirmary_staff_view='show_staff_date-wise-case-report-table';
        self.readInfirmaryCategory()
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
       staffinfirmaryStore.off('read_staff_date_wise_case_report_changed', ReadStaffDateWiseCaseReportChanged)
         staffinfirmaryStore.off('read_infirmary_category_changed',InfirmaryCategoryChanged)
        // staffinfirmaryStore.off('read_staff_monthly_report_changed',ReadStaffMonthlyCaseReportChanged)
     })

     //read courses
     self.readStaffInfirmaryDateWiseCaseReport = () => {
         //self.infirmary_staff_view='show_staff_table'
           staffinfirmaryStore.trigger('read_staff_date_wise_case_report', self.refs.read_category_id.value,self.refs.start_date.value,self.refs.end_date.value,)
           //staffStore.trigger('read_staffs', obj)
     }
     /*self.readStaffMonthlyCaseReport = () => {
         //  self.infirmary_staff_view='show_staff_monthly_report_table'
           staffinfirmaryStore.trigger('read_staff_monthly_case_report', self.refs.month_id.value)
     }*/
      self.readInfirmaryCategory = () => {
        staffinfirmaryStore.trigger('read_infirmary_category')
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

    
     staffinfirmaryStore.on('read_staff_date_wise_case_report_changed',ReadStaffDateWiseCaseReportChanged)
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
     }
    /*staffinfirmaryStore.on('read_staff_monthly_report_changed',ReadStaffMonthlyCaseReportChanged)
     function ReadStaffMonthlyCaseReportChanged(staffMonthlyCaseReports){
       console.log(staffMonthlyCaseReports) 
       self.staffMonthlyCaseReports = staffMonthlyCaseReports
       self.update()
       console.log(self.staffMonthlyCaseReports)
     }*/

</script>
</infirmary-staff-date-wise-case-report>