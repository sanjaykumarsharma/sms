<attendance-entry>
	<section class=" is-fluid">
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
  								<option each={standards} value={standard_id}>{standard}
  			                    </option>
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
					</div>
				</div>
			</div>
		</div>
		<table class="table is-fullwidth is-striped is-hoverable is-narrow">
			<thead>
				<tr>
					<th>#</th>
					<th>Enroll Number</th>
					<th>Name</th>
					<th style="text-align:center;">
					    <input type="checkbox" id="checkStudentName" 
					     onclick={selectAll}>
			    </th>
					
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in attendanceData}>
					<td>{i+1}</td>
					<td>{st.enroll_number}</td>
					<td>{st.name} </td>
					<td style="width:2%; text-align:center;"><input type="checkbox" checked={st.done} id="{ 'addStudentName' + st.student_id}" 
          				onclick={ selectStudent.bind(this,st) }>
          			</td>
				</tr>
			</tbody>
		</table>
		<button class="button is-danger" onclick={addAttendance}>Add</button>
	</section>
	
<!-- End Other Information -->
<script>
	
	var self = this
    self.on("mount", function(){
    	self.title='Add'
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
       attendanceStore.off('add_attendance_data_changed',AddAttendanceDataChanged)
       studentStore.off('read_standard_changed',StandardChanged)
       studentStore.off('read_section_changed',SectionChanged)
    })
    self.readStandard = () => {
       studentStore.trigger('read_standard')
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
      self.studentArray.push(item.student_id)
      console.log(self.studentArray)
    }



    studentStore.on('read_standard_changed',StandardChanged)
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
     
    attendanceStore.on('read_attendance_data_changed',ReadAttendanceDataChanged)
    function ReadAttendanceDataChanged(attendanceData){
      //console.log(attendanceData) 
      self.title='Create'
      self.loading = false
      self.attendanceData = attendanceData
      self.attendanceData.map(i=>{
      if(i.attendance==0){
        i.done = false; //RoleId1
        //i.student_id = self.student_id
        $('addStudentName' + i.student_id ).prop('checked', false);
      }else{
        i.done = true;
        $('addStudentName' + i.student_id ).prop('checked', true);
      } 
      })
      self.update()
      //console.log(self.employeeTypes)
    }

    attendanceStore.on('add_attendance_data_changed',AddAttendanceDataChanged)
    function AddAttendanceDataChanged(){
      //console.log(attendanceData) 
     // self.title='Create'
      self.loading = false
     // self.attendanceData = attendanceData
      self.attendanceData.map(i=>{
        i.done = false; 
        $('addStudentName' + i.student_id ).prop('checked', false);
        // } 
      })
      self.update()
    }
    

    
</script>
</attendance-entry>