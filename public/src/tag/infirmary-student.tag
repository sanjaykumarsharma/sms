<infirmary-student>
   <header></header>
  <loading-bar if={loading}></loading-bar>
   <section class="is-fluid" show={infirmary_student_view == 'show_student_table'}>
      <h2 class="title has-text-centered" style="color: #ff3860;">Student Infirmary Details<br>
      Category : {category_name}</h2>
    <div class="box no-print">
      <div class="columns">
        <div class="column is-narrow">
          <label class="label">Category</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="read_category_id" id="read_category_id">
                <option each={infirmaryCategories} value={category_id}>{category_name}
                              </option>
              </select>
            </div>
          </div>
        </div> 
        <div class="column is-narrow">
          <label class="label">Session</label>
        </div>
        <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="sessionId" id="sessionId">
                <option each={sessions} value={session_id}>{session_name}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column">
          <button class="button is-danger has-text-weight-bold"
          onclick={readStudentInfirmary} >Go
          </button>
        </div>
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
        
            <button class="button is-warning is-rounded is-pulled-right is-small ml5" onclick={readStudentInfirmary} style="margin-left:5px;margin-right:5px">
              <span class="icon">
                <span class="fas fa-sync-alt"></span>
              </span>
          </button>

          <button class="button is-info is-rounded is-pulled-right is-small ml5" onclick={add_student_infirmary}>
              <span class="icon">
            <span class="fas fa-plus"></span>
            </span>
          </button>
          <input class="input is-pulled-right" ref="searchInfirmaryStudent" onkeyup={filteredInfirmaryStudent} type="text" style="width:200px;margin-right:5px;" placeholder="Search" >     
        </div>
      </div>
    </div>

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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr each={st, i in filteredInfirmaryStudents}>
          <td>{i+1}</td>
          <td>{st.student_name}</td>
          <td>{st.enroll_number}</td>
          <td>{st.standard}</td>
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
<section class="is-fluid" show={infirmary_student_view =='show_infirmary_student_form'}>
  <div class="label">
    <div class="level-left">
      <h2 class="title" style="color: #ff3860;">{title} Student Infirmary</h2>
    </div>
    <div class="level-right">
      <button class="button" onclick={close_student_infirmary_form}>Back</button>
    </div>
  </div>
  <div class="box">
    <div class="columns is-variable is-1 is-multiline">
    	<div class="column is-one-third">
        <label class="label">Enroll No</label>
       		<input type="text" ref="enroll_number" type="text" class="input" onkeyup={addEnter}>
        </div>
      <div class="column is-one-third">
      <label class="label" for="class">Category</label>
        <div class="control">
            <div class="select is-fullwidth">
            <select ref="category_id" id="category_id" onkeyup={addEnter} onchange={filterInfiramryCase}>
              <option></option>  
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
            <select ref="case_id" id="case_id" onkeyup={addEnter}>
              <option each={filterInfirmaryCases} value={case_id}>{case_name}
                            </option>
            </select>
          </div>
            </div>
        </div>
        
        <div class="column is-one-third">
         <label class="label">Date</label>
        <input class="input date flatpickr-input form-control input"  ref="treatment_date" placeholder="" tabindex="0" 
        type="text">
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
         <div class="column is-one-third">
         <label class="label">Sent Home</label>
               <input type="checkbox" id="sent_home_check_box" onkeyup={addEnter}>
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
        self.infirmary_student_view='show_student_table'
        self.readInfirmaryCategory()
        self.readInfirmaryCase()
        self.readSession()

       // self.close_student_infirmary_form()
        console.log("inside student infirmary")
        flatpickr(".date", {
          allowInput: true,
          dateFormat: "d/m/Y",
       })
        self.update()
     })
     self.on("unmount", function(){
       studentinfirmaryStore.off('add_student_infirmary_changed', AddStudentInfirmaryChanged)
       studentinfirmaryStore.off('read_student_infirmary_changed', ReadStudentInfirmaryChanged)
     //  studentinfirmaryStore.off('read_new_event_changed',NewEventChanged)
       studentinfirmaryStore.off('read_infirmary_category_changed',InfirmaryCategoryChanged)
       studentinfirmaryStore.off('read_infirmary_case_changed',InfirmaryCaseChanged)
       studentinfirmaryStore.off('edit_student_infirmary_changed',EditStudentInfirmaryChanged)
       studentinfirmaryStore.off('delete_student_infirmary_changed',DeleteStudentInfirmaryChanged)
       studentinfirmaryStore.off('csv_export_infirmary_changed',csvStudentInfirmaryChanged)
        sessionStore.off('read_session_changed', ReadSessionChanged)
     })


    self.filteredInfirmaryStudent = ()=>{
      self.filteredInfirmaryStudents = self.studentInfirmarys.filter(c => {
        return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchInfirmaryStudent.value.toLowerCase())>=0
      })
    } 

    self.readSession = () => {
       sessionStore.trigger('read_session')
    }
     //read courses
     self.readStudentInfirmary = () => {
         self.loading=true
         console.log(self.refs.sessionId.value)
         self.category_name = $("#read_category_id option:selected").text();
         self.infirmary_student_view='show_student_table'
         studentinfirmaryStore.trigger('read_student_infirmary', self.refs.read_category_id.value,self.refs.sessionId.value)
           //studentStore.trigger('read_students', obj)
     }
     self.readInfirmaryCase = () => {
        studentinfirmaryStore.trigger('read_infirmary_case')
     }
    self.readInfirmaryCategory = () => {
        studentinfirmaryStore.trigger('read_infirmary_category')
      //  self.update()
       // self.filterInfiramryCase()
     }

    self.filterInfiramryCase = () => {
      self.filterInfirmaryCases = []
      self.filterInfirmaryCases = self.infirmaryCases.filter(s => {
        return s.category_id == self.refs.category_id.value
      })
    }

     self.add_student_infirmary = () => {
        self.infirmary_student_view='show_infirmary_student_form'
       // self.holiday_view=''
     }
    self.close_student_infirmary_form = () => {
        self.infirmary_student_view='show_student_table'
        self.refs.enroll_number.value=''
        self.refs.category_id.value=''
        self.refs.case_id.value=''
        self.refs.treatment_date.value=''
        self.refs.time_in.value=''
        self.refs.time_out.value=''
        self.refs.treatment.value=''
     
    }

    self.addEnter = (e) => {
       if(e.which == 13){
         self.add()
       }
     }


      self.add = () => {
        self.category_id=self.refs.category_id.value;
      	if($('#sent_home_check_box').is(":checked")){
      		self.sent_home=1;
      	}else{
      		self.sent_home=0;
      	}
         self.infirmaryCases.map(ev => {
              if(ev.category_id==self.refs.category_id.value){
               self.case_name=ev.case_name;
              }
            })
       if(!self.refs.enroll_number.value){
         toastr.info("Please enter Enroll No and try again")
       }else{
         self.loading = true
         if(self.title=='Create'){
             self.category = $("#category_id option:selected").text();
             self.case= $("#case_id option:selected").text();
            self.treatment_date=convertDate(self.refs.treatment_date.value)
           studentinfirmaryStore.trigger('add_student_infirmary', self.refs.enroll_number.value,self.refs.category_id.value,self.refs.case_id.value, self.treatment_date,self.refs.time_in.value,self.refs.time_out.value, self.refs.treatment.value, self.sent_home,self.case_name, self.category)
         }else if(self.title=='Update'){
           self.treatment_date=convertDate(self.refs.treatment_date.value)
           self.category = $("#category_id option:selected").text();
           self.case= $("#case_id option:selected").text();
           studentinfirmaryStore.trigger('edit_student_infirmary',  self.refs.enroll_number.value,self.refs.category_id.value,self.refs.case_id.value, self.treatment_date,self.refs.time_in.value,self.refs.time_out.value, self.refs.treatment.value, self.sent_home,self.edit_id,self.case_name,self.category)
         }
       }
     }

    

      self.editEnter = (e) => {
       if(e.which == 13){
         self.edit(e)
       }  
     }

    self.cancelOperation = (e) => {
       self.studentInfirmarys.map(ev => {
           ev.confirmDelete = false
           ev.confirmEdit = false
       })
     }

     self.confirmDelete = (e) => {
     	console.log(e.item.st.infirmary_id)
     	console.log("+++++++++++++")
       self.studentInfirmarys.map(ev => {
       	console.log(ev.infirmary_id)
         if(ev.infirmary_id != e.item.st.infirmary_id){
           ev.confirmDelete = false
         }else{
           ev.confirmDelete = true
         }
       })
     }

     self.delete = (e) => {
       self.loading = true
       studentinfirmaryStore.trigger('delete_student_infirmary', e.item.st.infirmary_id)
     }

     self.edit = (ev,e) => {
       console.log(ev)
       self.title='Update'
          flatpickr(".date", {
          allowInput: true,
          dateFormat: "d/m/Y",
       })

       self.infirmary_student_view='show_infirmary_student_form'
       self.refs.enroll_number.value=ev.enroll_number
       self.refs.category_id.value=ev.category_id
       self.refs.case_id.value=ev.case_id
       self.refs.treatment_date.value= ev.treatment_date
       self.refs.time_in.value=ev.time_in
       self.refs.time_out.value=ev.time_out
       self.refs.treatment.value=ev.treatment
       self.sent_home
       self.filterInfiramryCase()
       self.update()
       if(ev.sent_home==1){
       	 $('#sent_home_check_box').prop('checked',true)
       }else{
       	 $('#sent_home_check_box').prop('checked',false)
       }
       self.edit_id = ev.infirmary_id
     }

    self.downloadCSV = () =>{
      studentinfirmaryStore.trigger('csv_export_infirmary', self.studentInfirmarys)
    }

    studentinfirmaryStore.on('add_student_infirmary_changed',AddStudentInfirmaryChanged)
     function AddStudentInfirmaryChanged(studentInfirmarys){
       console.log(studentInfirmarys) 
       self.title='Create'
       self.refs.enroll_number.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.studentInfirmarys = studentInfirmarys
       self.filteredInfirmaryStudents = studentInfirmarys
       self.update()
       self.refs.read_category_id.value=self.category_id
       self.readStudentInfirmary ();
       console.log(self.studentInfirmarys)
     }

    studentinfirmaryStore.on('edit_student_infirmary_changed',EditStudentInfirmaryChanged)
     function EditStudentInfirmaryChanged(studentInfirmarys){
       console.log(studentInfirmarys) 
       self.title='Create'
       self.refs.enroll_number.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.studentInfirmarys = studentInfirmarys
       self.filteredInfirmaryStudents = studentInfirmarys
       self.update()
       self.readStudentInfirmary()
      // console.log(self.empsectionsloye_roles)
    }

    studentinfirmaryStore.on('delete_student_infirmary_changed',DeleteStudentInfirmaryChanged)
     function DeleteStudentInfirmaryChanged(studentInfirmarys){
       console.log(studentInfirmarys) 
       self.title='Create'
       self.refs.enroll_number.value=''
       self.refs.category_id.value=''
       self.refs.case_id.value=''
       self.refs.treatment_date.value=''
       self.refs.time_in.value=''
       self.refs.time_out.value=''
       self.refs.treatment.value=''
       self.loading = false
       self.studentInfirmarys = studentInfirmarys
       self.filteredInfirmaryStudents = studentInfirmarys
       self.update()
       self.readStudentInfirmary()
       console.log(self.studentInfirmarys)
     }

    studentinfirmaryStore.on('read_student_infirmary_changed',ReadStudentInfirmaryChanged)
      function ReadStudentInfirmaryChanged(studentInfirmarys){
       console.log(studentInfirmarys) 
        self.title='Create'
        self.refs.enroll_number.value=''
        self.refs.category_id.value=''
        self.refs.case_id.value=''
        self.refs.treatment_date.value=''
        self.refs.time_in.value=''
        self.refs.time_out.value=''
        self.refs.treatment.value=''
        self.loading = false
        self.studentInfirmarys = studentInfirmarys
        self.filteredInfirmaryStudents = studentInfirmarys
        self.update()
        console.log(self.studentInfirmarys)
    }

    studentinfirmaryStore.on('read_infirmary_category_changed',InfirmaryCategoryChanged)
     function InfirmaryCategoryChanged(infirmaryCategories){
       console.log(infirmaryCategories) 
       self.infirmaryCategories = infirmaryCategories
       self.update()
       console.log(self.infirmaryCategories)
     }
    studentinfirmaryStore.on('read_infirmary_case_changed',InfirmaryCaseChanged)
     function InfirmaryCaseChanged(infirmaryCases){
       console.log(infirmaryCases) 
       self.infirmaryCases = infirmaryCases
       self.update()
       console.log(self.infirmaryCases)
     }

    studentinfirmaryStore.on('csv_export_infirmary_changed',csvStudentInfirmaryChanged)
    function csvStudentInfirmaryChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
     }

    sessionStore.on('read_session_changed',ReadSessionChanged)
    function ReadSessionChanged(sessions){
      console.log(sessions) 
      self.title='Create'
      self.loading = false
      self.sessions = sessions
      self.update()
      console.log(self.sessions)
    }

</script>
</infirmary-student>