<student-info-update>
	<section class=" is-fluid" show={student_view =='close_Info_update'}>
	<h2 class="title has-text-centered" style="color: #ff3860;">Student Info Update</h2>
	<div class="flex items-center mt-2 mb-6 no-print">
		<div class="bg-green py-1 rounded w-10">
			<div class="bg-grey h-px flex-auto"></div>
		</div>
	</div>
	<div class="box">
		<div class="columns">
			<div class="column is-narrow">
				<div class="control">
					<div class="select">
						<select ref="read_standard_id" onchange={getReadSection}>
							<option>Choose Section</option>
							<option each={standards} value={standard_id}>{standard}
                            </option>
						</select>
					</div>
				</div>
			</div>
			<div class="column is-narrow">
				<div class="control">
		        	<div class="select is-fullwidth">
						<select ref="read_section_id">
							<option>Choose Class</option>
							<option each={readfilteredSections} value={section_id}>{section}
                            </option>
						</select>
					</div>
		      	</div>
		    </div>
        	<div class="column is-one-third">
				<input class="input" ref="read_enroll_number" type="text" placeholder="Enter Enroll No">
			</div>
			<div class="column">
				<button class="button is-danger has-text-weight-bold"
				onclick={getStudentData} >Print Student Info
				</button>
			</div>
		</div>
	</div>
</section>

<!-- profile view start -->

<section class=" is-fluid" show={student_view =='open_info_update'}>
	
<center>
<div each={pl, i in students}>

<table class="table is-fullwidth is-bordered">
<caption class="caption"> Student's Information</caption>
</table>
<div class="divider" style="margin-top: 10px;margin-bottom: 10px;">Part - 1</div>
<table class="table is-fullwidth is-bordered">
<tr>
   <td rowspan="3" style="width: 60;">
      <img src="/images/7/student/{pl.student_id}.jpg" height="75" >
   </td>
   <th> Name </th><td>{pl.name} </td>
   <th>Enroll No</th><td> {pl.enroll_number}</td>
</tr><tr>
          <th>Date of Birth </th><td>{pl.dob}</td>
          <th>Reg. No</th><td style='width:150px'>{pl.reg_number} </td>
     </tr><tr> 
          <th style='width:115px;'> Date of Admission</th> <td>{pl.doa}</td>
          <th style='width:100px'> Date of Joining</th><td> {pl.doj} </td>
      </tr>
</table><table class="table is-fullwidth is-bordered">
      <tr>
          <th>Class / Sec</th><td> {pl.standard} {pl.section}</td>
          <th>House</th><td> {pl.house_name} </td>
          <th>Blood Group</th><td> {pl.blood_group} </td>
          <th>Caste Category</th><td> {pl.category}</td>
      </tr>
      <tr> 
          <th>Community</th><td> {pl.cast} </td>
          <th style='width:55px'>Religion</th><td> {pl.religion} </td>
          <th style='width:95px'>Nationality</th><td> {pl.nationality} </td>
          <th style='width:100px'>Mother Tongue</th><td> {pl.mother_tongue} </td>
      </tr>
      <tr>
          <th>Mobile</th><td> {pl.f_mobile} </td>
          <th>For sms alert</th><td > {pl.mobile} </td>
          <th>Phone(R)</th><td > {pl.f_phone} </td>
          <th>Email</th><td colspan=2> {pl.email} </td>
      </tr>      
      <tr> 
          <th style='width:95px'>Father's Name</th><td colspan=3> {pl.f_name} </td>
          <th>Mother's Name</th><td colspan=3> {pl.m_name} </td>
      </tr>
     </table>
     <h3 style="background-color: #ddd;width: 855;color: #091378;text-align: left;padding-left:5px;-webkit-print-color-adjust: exact;">Permanent Address</h3>
      <table class="table is-fullwidth is-bordered">
      <tr>
          <th style='width:100px'>Address Line 1</th><td colspan=7> {pl.p_add_l1} </td>
      </tr>
      <tr>
          <th style='width:100px'>Address Line 2</th><td colspan=7> {pl.p_add_l2} </td>
      </tr>
      <tr>
          <th style='width:100px'>City </th><td> {pl.p_city} </td>
          <th style='width:50px'>State</th><td> {pl.p_state} </td>
          <th style='width:70px'>Country</th><td style='width:80px'> {pl.p_country} </td>
          <th style='width:40px'>Zip</th><td style='width:70px'> {pl.p_zip} </td>
     </tr>
  </table>
  <h3 style="background-color: #ddd;width: 855;color: #091378;text-align: left;padding-left:5px;-webkit-print-color-adjust: exact;">Correspondence Address</h3>
      <table class="table is-fullwidth is-bordered">
      <tr>
          <th style='width:100px'>Address Line 1</th><td colspan=7> {pl.c_add_l1} </td>
      </tr>
      <tr>
          <th style='width:100px'>Address Line 2</th><td colspan=7> {pl.c_add_l2} </td>
      </tr>
      <tr>
          <th style='width:100px'>City </th><td> {pl.c_city} </td>
          <th style='width:50px'>State</th><td> {pl.c_state} </td>
          <th style='width:70px'>Country</th><td style='width:80px'> {pl.c_country} </td>
          <th style='width:40px'>Zip</th><td style='width:70px'> {pl.c_zip} </td>
     </tr>
     </table>
     <div class='divider' style='margin-top: 10px;margin-bottom: 10px;'>Part - 2</div>

      <table class="table is-fullwidth is-bordered" style='margin-bottom:10px'>
        <tr>
            <th style='width:220px'>Father's Name:</th>
            <td colspan=4> {pl.f_name}</td>
        </tr>
        <tr>
            <th>Occupation: Service (please tick):</th>
            <td><input type=checkbox > State Govt.</td>
            <td><input type=checkbox > Central Govt.</td>
            <td><input type=checkbox > Private</td>
            <td><input type=checkbox > Professional</td>
        </tr>
        <tr>
            <th>Nature of Business (if business):</th>
            <td colspan=2></td>
            <th style='width:100px'>Designation:</th>
            <td></td>
        </tr>
        <tr>
            <th>Professional Detail (if professional):</th>
            <td colspan=2></td>
            <th>Designation:</th>
            <td></td>
        </tr>
        <tr>
            <th>Annual Income Rs:</th>
            <td  colspan=2></td>
            <th>Mobile No:</th>
            <td></td>
        </tr>
        <tr>
            <th>Community:</th>
            <td></td>
            <th>Email:</th>
            <td colspan=2></td>
        </tr>
        <tr>
            <th>Caste Category (please tick):</th>
            <td><input type=checkbox > General</td>
            <td><input type=checkbox > OBC</td>
            <td><input type=checkbox > SC</td>
            <td><input type=checkbox > ST</td>
        </tr>
        <tr>
            <th colspan=2>Permanent Mobile no. for sending SMS (give only one no.):</th>
            <td colspan=3></td>
        </tr>
      </table><table class="table is-fullwidth is-bordered">
        <tr>
            <th style='width:220px'>Mother's Name:</th>
            <td colspan=4>{pl.m_name}</td>
        </tr>
        <tr>
            <th>Occupation: Service (please tick):</th>
            <td><input type=checkbox > State Govt.</td>
            <td><input type=checkbox > Central Govt.</td>
            <td><input type=checkbox > Private</td>
            <td><input type=checkbox > Professional</td>
        </tr>
        <tr>
            <th>Nature of Business (if business):</th>
            <td colspan=2></td>
            <th style='width:100px'>Designation:</th>
            <td></td>
        </tr>
        <tr>
            <th>Professional Detail (if professional):</th>
            <td colspan=2></td>
            <th>Designation:</th>
            <td></td>
        </tr>
        <tr>
            <th>Annual Income Rs:</th>
            <td colspan=4></td>
        </tr>
        <tr>
            <th>Mobile No:</th>
            <td></td>
            <th>Email:</th>
            <td colspan=2></td>
        </tr>
      </table><h3 style="background-color: #ddd;width: 855;color: #091378;text-align: left;padding-left:5px;-webkit-print-color-adjust: exact;">Permanent Address (if changed)</h3>
      <table class="table is-fullwidth is-bordered">
      <tr>
          <th style='width:100px'>Address Line 1</th><td colspan=7></td>
      </tr>
      <tr>
          <th style='width:100px'>Address Line 2</th><td colspan=7></td>
      </tr>
      <tr>
          <th style='width:100px'>City </th><td></td>
          <th style='width:50px'>State</th><td></td>
          <th style='width:70px'>Country</th><td style='width:80px'></td>
          <th style='width:40px'>Zip</th><td style='width:70px'></td>
     </tr>
  </table><h3 style="background-color: #ddd;width: 855;color: #091378;text-align: left;padding-left:5px;-webkit-print-color-adjust: exact;">Correspondence Address (if changed)</h3>
      <table class="table is-fullwidth is-bordered">
      <tr>
          <th style='width:100px'>Address Line 1</th><td colspan=7></td>
      </tr>
      <tr>
          <th style='width:100px'>Address Line 2</th><td colspan=7></td>
      </tr>
      <tr>
          <th style='width:100px'>City </th><td></td>
          <th style='width:50px'>State</th><td></td>
          <th style='width:70px'>Country</th><td style='width:80px'></td>
          <th style='width:40px'>Zip</th><td style='width:70px'></td>
     </tr>
  </table><table class="table is-fullwidth is-bordered">
        <tr>
            <th>Mode of transport for sending student to school (please tick)</th>
            <td><input type=checkbox > Carpool</td>
            <td><input type=checkbox > Parents</td>
            <td><input type=checkbox > Rikshaw</td>
            <td><input type=checkbox > Bus</td>
        </tr>
        <tr>
            <th>Distance from school (please tick)</th>
            <td><input type=checkbox > 1 km</td>
            <td><input type=checkbox > 1-2 km</td>
            <td colspan=2><input type=checkbox > More than 2 km</td>
        </tr>
        </table>
        <table class="table is-fullwidth is-bordered">
        <tr>
            <th>If child is Differently Abled (please tick)</th>
            <td><input type=checkbox > In seeing</td>
            <td><input type=checkbox > In hearing</td>
            <td><input type=checkbox > In speaking</td>
            <td><input type=checkbox > In movement</td>
            <td><input type=checkbox > In mental ability</td>
        </tr>
     </table>
 </div>
 	</center>
     <div class='page-break'></div>
	</section>

	<!-- profile view end -->

<script>
	
	var self = this
	self.st={}
    self.on("mount", function(){
    	self.role = getCookie('role')
    	self.readStandard()
    	self.readSection()
    	self.student_view = 'close_Info_update'
        self.update()
        flatpickr(".date", {
	    	allowInput: true,
        	dateFormat: "d/m/Y",
  		})
    })
    self.on("unmount", function(){
      studentinfoupdateStore.off('read_standard_changed',StandardChanged)
      studentinfoupdateStore.off('read_section_changed',SectionChanged)
      studentinfoupdateStore.off('read_student_info_update_changed',StudentInfoUpdateChanged)
    })

    self.readStandard = () => {
       studentinfoupdateStore.trigger('read_standard')
    }

    self.readSection = () => {
       studentinfoupdateStore.trigger('read_section')
    }

    self.getReadSection = () => {
    	self.readfilteredSections = []
    	self.readfilteredSections = self.sections.filter(s => {
    		return s.standard_id == self.refs.read_standard_id.value
    	})
    }

     self.getStudentData = () =>{
     	self.student_view = 'open_info_update'
    	if(self.refs.read_enroll_number.value==""){
    		studentinfoupdateStore.trigger('read_student_info_update',self.refs.read_section_id.value,0)
    	}else{
    		studentinfoupdateStore.trigger('read_student_info_update',self.refs.read_section_id.value,
      	    self.refs.read_enroll_number.value)
    	}
      
    }


    studentinfoupdateStore.on('read_standard_changed',StandardChanged)
    function StandardChanged(standards){
      console.log(standards) 
      self.standards = standards
      self.update()
    }

    studentinfoupdateStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      console.log(sections) 
      self.sections = sections
      self.update()
      self.getReadSection()
    }
    studentinfoupdateStore.on('read_student_info_update_changed',StudentInfoUpdateChanged)
    function StudentInfoUpdateChanged(students){
      console.log(students) 
      self.students = students
      self.student_id = students[0].student_id
      console.log("Student id")
      console.log(self.student_id)
      self.update()
      //document.getElementById('pp_box1').src = '/images/7/student/'+self.student_id+'.jpg';
    }
</script>
</student-info-update>