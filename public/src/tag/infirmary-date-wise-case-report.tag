<infirmary-date-wise-case-report>
  <print-header></print-header> 
  <loading-bar if={loading}></loading-bar>
  <section class="is-fluid">
      <h2 class="title has-text-centered" style="color: #ff3860;">Student Wise Infirmary Case Report<br>
             <span style='font-size:18px'> Session : {session_name} <br>
             Category: {category_name} From: {start_date} To: {end_date}</span>
      </h2> 
  <div class="box  no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Category</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="read_category_id" id="category_id" style="width:200px">
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
             <input class="input date flatpickr-input form-control input"  ref="start_date" placeholder="" tabindex="0"  type="text" style="width:100px">
          </div>
        </div>
          <div class="column is-narrow">
          <label class="label">End Date</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
              <input class="input date flatpickr-input form-control input"  ref="end_date" placeholder="" tabindex="0"  type="text" style="width:100px">
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
               onclick={readStudentInfirmaryDateWiseCaseReport} >Go
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
          <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readStudentInfirmaryDateWiseCaseReport} style="margin-left:34;margin-right:4px">
              <span class="icon">
                <span class="fas fa-sync-alt"></span>
              </span>
          </button>
        <input class="input is-pulled-right" ref="searchInfirmaryStudentDateWiseCaseReport" onkeyup={filteredInfirmaryStudentDateWiseCaseReport} type="text" style="width:200px;margin-right:5px;" placeholder="Search" >

         
        </div>
      </div>
    </div>
<!--   <div class="level">
    <div class="level-left">
      <h4 class="title" style="color: #ff3860;">Student Date Wise Case Report</h4>
    </div>
     <div class="level-right no-print">
     
    </div>
  </div> -->

  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Enroll No</th>
          <th>Class</th>
          <th>Case Name</th>
          <th>Date</th>
          <th>Time In</th>
          <th>Time Out</th>
          <th>Treatment</th>
        <!--   <th>Action</th> -->
        </tr>
      </thead>
      <tbody>
        <tr each={st, i in filteredInfirmaryStudentDateWiseCaseReports}>
          <td>{i+1}</td>
          <td>{st.student_name}</td>
          <td>{st.enroll_number}</td>
          <td>{st.standard}</td>
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
 
  <!-- student profile end -->
<script>
   var self = this
        self.on("mount", function(){
        self.title='Create'
        self.role = getCookie('role')
        self.readInfirmaryCategory()
       // self.readInfirmaryCase()
       // self.readStudentInfirmary()
        console.log("inside student infirmary")
        flatpickr(".date", {
          allowInput: true,
          dateFormat: "d/m/Y",
       })
        self.update()
     })
     self.on("unmount", function(){
       studentinfirmaryStore.off('read_student_date_wise_case_report_changed', ReadStudentDateWiseCaseReportChanged)
       studentinfirmaryStore.off('read_infirmary_category_changed',InfirmaryCategoryChanged)
       studentinfirmaryStore.off('csv_export_date_wise_case_report_changed',csvDateWiseCaseReportChanged)
     })
     self.filteredInfirmaryStudentDateWiseCaseReport = ()=>{
        self.filteredInfirmaryStudentDateWiseCaseReports = self.studentDateWiseCaseReports.filter(c => {
          return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchInfirmaryStudentDateWiseCaseReport.value.toLowerCase())>=0
        })
      } 
     //read courses
     self.readStudentInfirmaryDateWiseCaseReport = () => {
            self.loading=true
            self.infirmary_student_view='show_student_table'
            self.category_name = $("#category_id option:selected").text();
            self.start_date=self.refs.start_date.value,
            self.end_date=self.refs.end_date.value
            self.s_date=convertDate(self.refs.start_date.value)  
            self.e_date=convertDate(self.refs.end_date.value)  

           studentinfirmaryStore.trigger('read_student_date_wise_case_report', self.refs.read_category_id.value, self.s_date,self.e_date)
           //studentStore.trigger('read_students', obj)
     }
      self.readInfirmaryCategory = () => {
        studentinfirmaryStore.trigger('read_infirmary_category')
      }
      self.downloadCSV = () =>{
        studentinfirmaryStore.trigger('csv_export_date_wise_case_report', self.studentDateWiseCaseReports)
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

    
    studentinfirmaryStore.on('read_student_date_wise_case_report_changed',ReadStudentDateWiseCaseReportChanged)
    function ReadStudentDateWiseCaseReportChanged(studentDateWiseCaseReports,session_name){
       console.log(studentDateWiseCaseReports) 
       self.loading = false
       self.studentDateWiseCaseReports = studentDateWiseCaseReports
       self.filteredInfirmaryStudentDateWiseCaseReports = studentDateWiseCaseReports
       self.session_name=session_name
       self.update()
       console.log(self.studentDateWiseCaseReports)
     }

    studentinfirmaryStore.on('read_infirmary_category_changed',InfirmaryCategoryChanged)
    function InfirmaryCategoryChanged(infirmaryCategories){
       console.log(infirmaryCategories) 
       self.infirmaryCategories = infirmaryCategories
       self.loading=false
       self.update()
       console.log(self.infirmaryCategories)
     }

    studentinfirmaryStore.on('csv_export_date_wise_case_report_changed',csvDateWiseCaseReportChanged)
    function csvDateWiseCaseReportChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }

</script>
</infirmary-date-wise-case-report>