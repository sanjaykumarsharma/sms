<threesixty-degree-view>
	<section class=" is-fluid" show={student_view =='show_student'}>	
  		<h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Student 360 Degree View</h2>
	    <div class="level box no-print">
	      	<div class="level-left">
		        <div class="columns">
		          <div class="column is-narrow">
		            <label class="label">Enter Student Name.</label>
		          </div>
		          <div class="column is-full">
		            <input class="input" type="text" id="enter_value" ref="enter_value" onkeyup={addEnter}>
		          </div>
		            <div class="column">
		              <button class="button is-danger has-text-weight-bold " onclick={readStudent} >GO</button>
		            </div>
		        </div>
	      	</div>
	    </div>
		<table class="table is-fullwidth is-bordered is-hoverable">
			<thead>
				<tr>
					<th>Sl no</th>
					<th>Roll no</th>
					<th>Student Name</th>
					<th>Class</th>
					<th>Enroll No</th>
					<th>Registration No</th>
					<th>SMS</th>
					<th>Father's Name</th>
					<th class="no-print" style="">Action</th>
				</tr>
			</thead>
			<tbody>
				<tr each={st, i in students}>
					<td>{i +1}</td>
					<td>{st.roll_number}</td>
					<td>{st.name}</td>
					<td>{st.class}</td>
					<td>{st.enroll_number}</td>
					<td>{st.reg_number}</td>
					<td>{st.mobile}</td>
					<td>{st.f_name}</td>
					<td class="has-text-right no-print">
						<span><a class="button is-small" onclick={view_profile.bind(this, st.student_id)} title="View Details">
		              	<i class="fa fa-eye" aria-hidden="true"></i>
		              </a></span>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
	<section class=" is-fluid" show={student_view =='student_grid_view'}>
		<div class="level no-print">
			<div class="level-left">
				<h2 class="title has-text-danger is-size-5">Profile of {st.first_name} {st.middle_name} {st.last_name}</h2>
			</div>
			<div class="level-right">
		    	<button class="button is-warning has-text-weight-bold ml5" onclick={close_student_details}>
		    		<span class="icon">
          				<span class="fas fa-arrow-left"></span>
        			</span>
		    	</button>
			</div>
		</div>
		<table class="table is-fullwidth is-bordered print-friendly">
			<tr>
				<td rowspan="4" colspan="2" >
					<img id="pp_box1" width="90" height="90" >
				</td> 
				<td colspan="2"  style="background-color:#efefef"><h>Student\'s Information</td>
				<td colspan="3"><h>Contact Information</td>
			</tr>
			<tr>
				<th>Date of Admission</th>
				<td>{st.doa}</td>
				<th>Father's Name</th>
				<td colspan=2>{st.f_name}</td>
			</tr>
			<tr>
				<th>Date of Joining</th>
				<td>{st.doj} </td>
				<th>Mother's Name</th>
				<td colspan=2>{st.m_name}</td>
			</tr>
			<tr>
				<th>Date of Birth</th>
				<td>{st.dob}</td>
				<th>Permanent Address </th>
				<td colspan="2">{st.p_add_l1} {st.p_add_l2}</td>
			</tr>
 			<tr>
				<th> Name </th>
				<td> {st.first_name}   {st.middle_name}   {st.last_name}</td>
				<th>Nationality</th>
				<td>{st.nationality}</td><th>city </th><td colspan=2> {st.p_city}</td>
			</tr>
			<tr>  
				<th>Enroll No.</th>
				<td> {st.enroll_number}</td>
				<th>Gender</th>
				<td>{st.gender}</td>
				<th>State</th>
				<td colspan=2>{st.p_state}</td> 
			</tr>
		</table>
	</section>

	<script>
	var self = this
    self.st={};
    self.on("mount", function(){
      self.loading = false;
      self.role = getCookie('role')
      self.student_view = 'show_student'
      self.students=[];
      self.update()
    })
    self.on("unmount", function(){
      threesixtyDegreeViewStore.off('read_student_changed',StudentsChanged)
      threesixtyDegreeViewStore.off('read_student_details_changed',StudentDetailsChanged)
    })

    //read Student
    self.readStudent = () =>{
    	var obj={}
    	if(!self.refs.enter_value.value){
    		toastr.error("Please enter Name and try again")
    		return;
    	}else{
    		self.loading = true
    		obj['student_name']=self.refs.enter_value.value
    		threesixtyDegreeViewStore.trigger('read_student', obj)
    	}
    }

    self.addEnter = (e) => {
      if(e.which == 13){
        self.readStudent()
      }
    }
    self.view_profile = (c,st) => {
    	self.student_id = c
    	self.student_view = 'student_grid_view'
    	threesixtyDegreeViewStore.trigger('read_student_details', self.student_id)
    	document.getElementById('pp_box1').src = '/images/'+self.session_id+'/studentImages/'+c+'.jpg';
    }
    self.close_student_details = () => {
    	self.student_view = 'show_student'	
    }
    threesixtyDegreeViewStore.on('read_student_details_changed',StudentDetailsChanged)
    function StudentDetailsChanged(student_details,session_id){
    	self.session_id = session_id
    	console.log(self.session_id)
    	self.st=student_details[0]
      	self.student_details = student_details
      	self.update()
    }
    threesixtyDegreeViewStore.on('read_student_changed',StudentsChanged)
    function StudentsChanged(students){
      self.loading = false
      self.students = students
      console.log(students) 
      if(self.students.length==0){
      	toastr.info("No Data Found!")
      }
      self.update()
    }

	</script>
</threesixty-degree-view>