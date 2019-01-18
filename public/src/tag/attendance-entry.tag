<attendance-entry>
  <header></header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid" show={atendance_view =='show_atendance'}>
		<div class="level">
			<div class="level-left">
				<h2 class="title" style="color: #ff3860;">Attendance</h2>
			</div>
		</div>
		<div class="box">
			<div class="columns">
				<div class="column is-narrow">
  					<div class="control">
  						<div class="select">
  							<select ref="standard_id" onchange={getReadSection}>
  								<option>Select Standard</option>
  								<option each={standards} value={standard_id}>{standard}</option>
  							</select>
  						</div>
  					</div>
  				</div>
  				<div class="column is-narrow">
  					<div class="control">
  						<div class="select">
  							<select ref="section_id">
  								<option>Select Section</option>
  								<option each={readfilteredSections} value={section_id}>{section}
  			          </option>
  							</select>
  						</div>
  					</div>
  				</div>
				<div class="column is-narrow">
                <label class="label">Date</label>
                </div>
		        <div class="column is-narrow">
		          <div class="control">
		             <input class="input date flatpickr-input form-control input"  ref="start_date" placeholder="" tabindex="0"  type="text">
		          </div>
		        </div>
		        <div class="column is-narrow">
					 <div class="control">
               <button class="button is-danger has-text-weight-bold" onclick={readAttendanceData}>Go</button>
					 	   <button class="button has-text-weight-bold" onclick={showHolidayList}>Holiday List</button>
					</div>
				</div>
			</div>
		</div>
    <div style="height:400px; overflow-x: scroll; overflow-y:scroll ;border:solid #000 3px;margin-bottom:10px"> 
  		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
  			<thead>
  				<tr>
  					<th>#</th>
  					<th>Enroll Number</th>
  					<th>Name</th>
  					<th style="text-align:center;" if={role!='ADMIN'}>
  					    <input type="checkbox" id="checkStudentName" 
  					     onclick={selectAll}>
  			    </th>
            <th  if={role=='ADMIN'} style="text-align:center;">Attendance</th>
  				</tr>
  			</thead>
  			<tbody>
  				<tr each={st, i in attendanceData}>
  					<td>{i+1}</td>
  					<td>{st.enroll_number}</td>
  					<td>{st.name}</td>
  					<td style="width:2%; text-align:center;" if={role!='ADMIN'}><input type="checkbox" checked={st.done} id="{ 'addStudentName' + st.student_id}" 
            				onclick={ selectStudent.bind(this,st) }></td>
            <td if={role=='ADMIN'} style="text-align:center">{st.attendance_value}</td>        
  				</tr>
  			</tbody>
  		</table>
  </div>
		<button if={role!='ADMIN'} class="button  is-pulled-right" onclick={addAttendance}>Submit</button>
    <span class="is-pulled-right" style="font-size:16px;margin-right:15px;margin-top:10px">
        <span>P: <b>{present}</b> </span>
        <span>Ab: <b>{absent}</b></span>
    </span>
    <button if={role=='ADMIN'} class="button is-danger" onclick={deleteAttendance}>Delete</button>
	</section>

  <section  show={atendance_view =='show_holiday_list'}>
    <table class="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
        <tr>
          <th>#</th>
          <th>Event</th>
          <th> Date From</th>
          <th> Date To</th>
          <th> Holiday</th>
        </tr>
      </thead>
      <tbody>
        <tr each={st, i in holidayLists}>
          <td>{i+1}</td>
          <td>{st.event_name}</td>
          <td>{st.start_date} </td>
          <td>{st.end_date} </td>
          <td>{st.holiday} </td>
        </tr>
      </tbody>
    </table>
      <button  class="button is-danger" onclick={hideHolidayList}>Cancel</button>
  </section>
	
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
      self.atendance_view='show_atendance'
    	self.role = getCookie('role') 
    	self.readStandard()
    	self.readSection()
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "Y-m-d",
  		})
    })

    self.on("unmount", function(){
       attendanceStore.off('read_attendance_data_changed',ReadAttendanceDataChanged)
       attendanceStore.off('read_holiday_list_changed',ReadHolidayListChanged)
       attendanceStore.off('add_attendance_data_changed',AddAttendanceDataChanged)
       attendanceStore.off('delete_attendance_data_changed',DeleteAttendanceDataChanged)
       standardStore.off('standard_changed',StandardChanged)
       studentStore.off('read_section_changed',SectionChanged)
    })

    self.hideHolidayList=()=>{
       self.atendance_view='show_atendance'
    }

    self.deleteAttendance=()=>{
        attendanceStore.trigger('delete_attendance', self.attendanceData,self.refs.start_date.value)
    }

    self.readStandard = () => {
       standardStore.trigger('read_standard')
    }
    self.showHolidayList = () => {
        self.loading=true
        self.atendance_view ='show_holiday_list'
        attendanceStore.trigger('read_holiday_list')
    }

      self.countPresentAbsent=()=>{
        console.log("inside present absent")
           var total_present=0
           var total_absent=0
           self.present=0
           self.absent=0
        self.attendanceData.map(i=>{
            if(i.done==false){
               total_absent++
               self.absent=total_absent
          /*    console.log(self.absent)
              $('addStudentName' + i.student_id ).prop('checked', false);*/
            }else{
               // i.done = true;
              /*$('addStudentName' + i.student_id ).prop('checked', true);
               i.attendance_value='P'*/
               total_present++
               self.present=total_present
               console.log(self.present)
            } 
        })
      }

    self.addAttendance=()=>{
    	let studentData=[]
        self.attendanceData.map( q => {
        	let a={}
	        if(q.done==true){
	        	a.attendance='1'
	        	a.student_id=q.student_id
	            studentData.push(a)
	          }else{
	          	a.attendance='0'
	        	a.student_id=q.student_id
	            studentData.push(a)
	          }
        })
        console.log(studentData)
        attendanceStore.trigger('add_attendance_data', studentData,self.refs.start_date.value)  
    }

    self.readSection = () => {
       studentStore.trigger('read_section')
    }

    self.getReadSection = () => {
    	self.readfilteredSections = []
    	self.readfilteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.standard_id.value
    	})
    }
    

    self.readAttendanceData = () => {
      self.loading=true
      var start_date=self.refs.start_date.value
      var date1 = new Date(start_date)
      var date2 = new Date()
      // time difference
         var timeDiff = (date2.getTime() - date1.getTime());

         // days difference
         var diffDays =Math.ceil(timeDiff / (1000 * 3600 * 24));

         var day = date1.getDay();

        if(day==0){
          toastr.info("No Attendance on Sunday")
          return
         }else if(diffDays>0){
            console.log(diffDays)
         }else{
           toastr.info("No attendance in Advance date")
            return
         }
     
       attendanceStore.trigger('read_attendance_data', self.refs.standard_id.value,self.refs.section_id.value,self.refs.start_date.value)  
    }

    self.selectAll = () => {
      self.studentArray = []
      if($('#checkStudentName').is(":checked")){
        self.attendanceData.map(i=>{
            i.done = true;
            $('addStudentName'+i.student_id).prop('checked', true);
            self.studentArray.push(i.student_id);
            console.log(self.studentArray)
          })
      }else{
        self.attendanceData.map(i=>{
            i.done = false;
            $('addStudentName'+i.student_id).prop('checked', false);
        })
     }
      //console.log(self.attendanceData)
    }
    self.selectStudent = (item,event) => {
      item.done=!event.item.st.done
      self.studentArray=[]
      self.studentArray.push(item.student_id)
      console.log(self.studentArray)
       self.countPresentAbsent()
    }



    standardStore.on('standard_changed',StandardChanged)
      function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    studentStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
      self.getReadSection()
    }

    attendanceStore.on('read_holiday_list_changed',ReadHolidayListChanged)
    function ReadHolidayListChanged(holidayLists){
      console.log(holidayLists) 
      self.holidayLists = holidayLists
       self.loading=false
      self.update()
    }  

    // delete attendance data

    attendanceStore.on('delete_attendance_data_changed',DeleteAttendanceDataChanged)
    function DeleteAttendanceDataChanged(){
       self.attendanceData=[]
       self.loading=false
       self.update()
    }
     
    attendanceStore.on('read_attendance_data_changed',ReadAttendanceDataChanged)
    function ReadAttendanceDataChanged(attendanceData){
      //console.log(attendanceData) 
      self.title='Create'
      self.loading = false
      if(attendanceData!='No Data Found'){
          self.attendanceData = attendanceData
           var total_present=0
           var total_absent=0
           self.present=0
           self.absent=0
          self.attendanceData.map(i=>{
          if(i.attendance==0){
            i.done = false; 
            i.attendance_value='Ab'
             total_absent++
             self.absent=total_absent
            console.log(self.absent)
            $('addStudentName' + i.student_id ).prop('checked', false);
          }else{
            i.done = true;
            $('addStudentName' + i.student_id ).prop('checked', true);
             i.attendance_value='P'
             total_present++
             self.present=total_present
             console.log(self.present)
          } 
          })
       }
      self.update()
      //console.log(self.employeeTypes)
    }

    attendanceStore.on('add_attendance_data_changed',AddAttendanceDataChanged)
    function AddAttendanceDataChanged(){
      self.loading = false
      /*self.attendanceData.map(i=>{
        i.done = false; 
        $('addStudentName' + i.student_id ).prop('checked', false);
      })*/
      self.update()
    }

    

    
</script>
</attendance-entry>