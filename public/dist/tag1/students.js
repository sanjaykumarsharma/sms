riot.tag2('students', '<section class="container is-fluid" show="{student_view ==\'show_student\'}"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Students</h2> </div> <div class="level-right"> <button class="button is-warning is-rounded" onclick="{add_new_student}"> <span class="icon"> <span class="fas fa-plus"></span> </span> <span>New Student</span> </button> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Course</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="student_course_id"> <option each="{studentCourses}" riot-value="{id}">{course} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">YOA</label> </div> <div class="column is-narrow"> <div class="control"> <input class="form-control input" ref="student_yoa" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getStudentData}">Submit </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-bordered"> <thead> <tr> <th>#</th> <th>Roll no</th> <th>Name</th> <th>Mobilee</th> <th>Email</th> <th>Gender</th> <th>Course</th> <th>YOA</th> <th>Action</th> </tr> </thead> <tbody> <tr each="{st, i in studentDataItems}"> <td></td> <td>{st.roll_no}</td> <td>{st.name}</td> <td>{st.mobile}</td> <td>{st.email}</td> <td>{st.gender}</td> <td>{st.course_id}</td> <td>{st.yoa}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{st.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, st)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{st.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section> <section class="container is-fluid" show="{student_view ==\'add_student\'}"> <div class="label"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">{title} Student</h2> </div> <div class="level-right"> <button class="button" onclick="{close_new_student}">Back</button> </div> </div> <div class="box"> <div class="columns is-variable is-1 is-multiline"> <div class="column is-half"> <div id="pp_box" class="pp-box" onclick="trigger_file_input()"> <div class="icon has-text-danger" onclick="remove_profile_picture(event)"><i class="fas fa-trash"></i></div> </div> <input accept="image/*" class="is-hidden" id="student_picture" name="student_picture" onchange="loadFile(event)" type="file"> </div> <div class="column is-half"> <div class="column is-narrow"> <label class="label" for="student_name">Name</label> <input class="input" ref="name" type="text"> </div> <div class="column is-narrow"> <label class="label" for="student_roll_no">Roll no</label> <input class="input" ref="roll_no" type="text"> </div> </div> <div class="column is-one-third"> <label class="label" for="student_course">Course</label> <div class="control"> <div class="select is-fullwidth"> <select ref="course_id" onchange="{show_appropriate_subjects}"> <option each="{studentCourses}" riot-value="{course}">{course} </option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="student_yoa">YOA</label> <input class="input" ref="yoa" placeholder="" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_doa">DOA</label> <input class="input date flatpickr-input form-control input" ref="doa" placeholder="" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-one-third" id="subject_1_id" show="{subject_id_one}"> <label class="label" for="student_subject_1">Subject 1</label> <div class="control"> <div class="select is-fullwidth"> <select ref="subject_1_id"> <option value="1">Bengali</option> <option value="2">Biological Science</option> <option value="3">Civics</option> <option value="4">Commerce</option> <option value="5">Economics</option> <option value="6">English</option> <option value="7">Geography</option> <option value="8">Hindi</option> <option value="9">History</option> <option value="10">Home Science</option> <option value="11">Mathematics</option> <option value="12">Not Selected</option> <option value="13">Physical Science</option> <option value="14">Sanskrit</option> <option value="15">Santhali</option> <option value="16">Urdu</option> </select> </div> </div> </div> <div class="column is-one-third" id="subject_2_id" show="{subject_id_two}"> <label class="label" for="student_subject_2">Subject 2</label> <div class="control"> <div class="select is-fullwidth"> <select ref="subject_2_id"> <option value="1">Bengali</option> <option value="2">Biological Science</option> <option value="3">Civics</option> <option value="4">Commerce</option> <option value="5">Economics</option> <option value="6">English</option> <option value="7">Geography</option> <option value="8">Hindi</option> <option value="9">History</option> <option value="10">Home Science</option> <option value="11">Mathematics</option> <option value="12">Not Selected</option> <option value="13">Physical Science</option> <option value="14">Sanskrit</option> <option value="15">Santhali</option> <option value="16">Urdu</option> </select> </div> </div> </div> <div class="column is-one-third " id="subject_3_id" show="{subject_id_three}"> <label class="label" for="student_subject_3">Subject 3</label> <div class="control"> <div class="select is-fullwidth"> <select ref="subject_3_id"> <option value="1">Bengali</option> <option value="2">Biological Science</option> <option value="3">Civics</option> <option value="4">Commerce</option> <option value="5">Economics</option> <option value="6">English</option> <option value="7">Geography</option> <option value="8">Hindi</option> <option value="9">History</option> <option value="10">Home Science</option> <option value="11">Mathematics</option> <option value="12">Not Selected</option> <option value="13">Physical Science</option> <option value="14">Sanskrit</option> <option value="15">Santhali</option> <option value="16">Urdu</option> </select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="student_university_registration_no">University Registration No.</label> <input class="input" ref="university_registration_no" type="text"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Candidate Information</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="student_mobile">Mobile</label> <input class="input" ref="mobile" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_email">Email</label> <input class="input" ref="email" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_dob">DOB</label> <input class="input date flatpickr-input" ref="dob" input date flatpickr-input form-control input placeholder="" tabindex="0" type="text" readonly="readonly"> </div> <div class="column is-one-third"> <label class="label" for="student_gender">Gender</label> <div class="control"> <div class="select is-fullwidth"> <select ref="gender" ion><option value="F">Female</option><option value="T">Transgender</option></select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="student_marital_status">Marital Status</label> <div class="control"> <div class="select is-fullwidth"> <select ref="marital_status" s>Single</option><option value="M">Married</option><option value="D">Divorced</option></select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="student_blood_group">Blood Group</label> <div class="control"> <div class="select is-fullwidth"> <select ref="blood_group" tion><option value="A+">A+</option><option value="A-">A-</option><option value="AB+">AB+</option><option value="AB-">AB-</option><option value="B+">B+</option><option value="B-">B-</option><option value="O+">O+</option><option value="O-">O-</option></select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="student_category">Category</label> <div class="control"> <div class="select is-fullwidth"> <select ref="category" al option><option value="SC">SC</option><option value="ST">ST</option><option value="OBC">OBC</option><option value="PH">PH</option></select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="student_religion">Religion</label> <div class="control"> <div class="select is-fullwidth"> <select ref="religion">Hinduism</option><option value="Islam">Islam</option><option value="Sikhism">Sikhism</option><option value="Christianity">Christianity</option><option value="Jainism">Jainism</option><option value="Buddhism">Buddhism</option><option value="Others">Others</option></select> </div> </div> </div> <div class="column is-one-third"> <label class="label" for="student_nationality">Nationality</label> <input class="input" ref="nationality" type="text"> </div> <div class="column is-two-thirds"> <label class="label" for="student_indentification_marks">Identification marks</label> <input class="input" ref="identification_marks" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_aadhaar_card_no">Aadhaar Card No</label> <input class="input" ref="acn" type="text"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Permanent Address</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-full"> <label class="label" for="student_address">Address</label> <input class="input" ref="p_address" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_village">Village</label> <input class="input" ref="p_village" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_post_office">Post Office</label> <input class="input" ref="p_po" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_police_station">Police Station</label> <input class="input" ref="p_ps" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_city">City</label> <input class="input" ref="p_city" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_state">State</label> <input class="input" ref="p_state" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_pincode">Pin Code</label> <input class="input" ref="p_pincode" type="text"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Correspondence Address</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-full"> <label class="label" for="student_address">Address</label> <input class="input" ref="c_address" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_village">Village</label> <input class="input" ref="c_village" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_post_office">Post Office</label> <input class="input" ref="c_po" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_police_station">Police Station</label> <input class="input" ref="c_ps" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_city">City</label> <input class="input" ref="c_city" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_state">State</label> <input class="input" ref="c_state" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_pincode">Pin Code</label> <input class="input" ref="c_pincode" type="text"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Parent/Guardian Information</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-one-third"> <label class="label" for="student_father_name">Father Name</label> <input class="input" ref="father_name" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_father_mobile">Father Mobile</label> <input class="input" ref="father_mobile" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_father_occupation">Father Occupation</label> <input class="input" ref="father_occupation" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_mother_name">Mother Name</label> <input class="input" ref="mother_name" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_mother_mobile">Mother Mobile</label> <input class="input" ref="mother_mobile" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_mother_occupation">Mother Occupation</label> <input class="input" ref="mother_occupation" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_guardian_name">Guardian Name</label> <input class="input" ref="guardian_name" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_guardian_mobile">Guardian Mobile</label> <input class="input" ref="guardian_mobile" type="text"> </div> <div class="column is-one-third"> <label class="label" for="student_guardian_occupation">Guardian Occupation</label> <input class="input" ref="guardian_occupation" type="text"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Class X/Equivalent</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-half"> <label class="label" for="student_x_school">X School</label> <input class="input" ref="x_school" type="text"> </div> <div class="column is-half"> <label class="label" for="student_x_board">X Board</label> <input class="input" ref="x_board" type="text"> </div> <div class="column is-is-one-quarter"> <label class="label" for="student_x_yop">X YOP</label> <input class="input" ref="x_yop" type="number"> </div> <div class="column is-is-one-quarter"> <label class="label" for="student_x_division">X Division</label> <input class="input" ref="x_division" type="text"> </div> <div class="column is-is-one-quarter"> <label class="label" for="student_x_full_marks">X Full Marks</label> <input class="input" ref="x_full_marks" type="number"> </div> <div class="column is-is-one-quarter"> <label class="label" for="student_x_percentage">X Percentage</label> <input class="input" ref="x_percentage" step="any" type="number"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Class XII/Equivalent</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-half"> <label class="label" for="student_xii_school">XII School</label> <input class="input" ref="xii_school" type="text"> </div> <div class="column is-half"> <label class="label" for="student_xii_board">XII Board</label> <input class="input" ref="xii_board" type="text"> </div> <div class="column is-one-quarter"> <label class="label" for="student_xii_yop">XII YOP</label> <input class="input" ref="xii_yop" type="number"> </div> <div class="column is-one-quarter"> <label class="label" for="student_xii_division">XII Division</label> <input class="input" ref="xii_division" type="text"> </div> <div class="column is-one-quarter"> <label class="label" for="student_xii_full_marks">XII Full Marks</label> <input class="input" ref="xii_full_marks" type="number"> </div> <div class="column is-one-quarter"> <label class="label" for="student_xii_percentage">XII Percentage</label> <input class="input" ref="xii_percentage" step="any" type="number"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">UG</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-half"> <label class="label" for="student_ug_college">UG College</label> <input class="input" ref="ug_college" type="text"> </div> <div class="column is-half"> <label class="label" for="student_ug_university">UG University</label> <input class="input" ref="ug_university" type="text"> </div> <div class="column is-one-quarter"> <label class="label" for="student_ug_yop">UG YOP</label> <input class="input" ref="ug_yop" type="number"> </div> <div class="column is-one-quarter"> <label class="label" for="student_ug_division">UG Division</label> <input class="input" ref="ug_division" type="text"> </div> <div class="column is-one-quarter"> <label class="label" for="student_ug_full_marks">UG Full Marks</label> <input class="input" ref="ug_full_marks" type="number"> </div> <div class="column is-one-quarter"> <label class="label" for="student_ug_percentage">UG Percentage</label> <input class="input" ref="ug_percentage" step="any" type="number"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">PG</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-half"> <label class="label" for="student_pg_college">PG College</label> <input class="input" ref="pg_college" type="text"> </div> <div class="column is-half"> <label class="label" for="student_pg_university">PG University</label> <input class="input" ref="pg_university" type="text"> </div> <div class="column is-one-quarter"> <label class="label" for="student_pg_yop">PG YOP</label> <input class="input" ref="pg_yop" type="number"> </div> <div class="column is-one-quarter"> <label class="label" for="student_pg_division">PG Division</label> <input class="input" ref="pg_division" type="text"> </div> <div class="column is-one-quarter"> <label class="label" for="student_pg_full_marks">PG Full Marks</label> <input class="input" ref="pg_full_marks" type="number"> </div> <div class="column is-one-quarter"> <label class="label" for="student_pg_percentage">PG Percentage</label> <input class="input" ref="pg_percentage" step="any" type="number"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Others</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-half"> <label class="label" for="student_ncc">NCC</label> <div class="control"> <div class="select is-fullwidth"> <select class="input" ref="ncc"><option value=""></option><option value="B">B</option><option value="C">C</option></select> </div> </div> </div> <div class="column is-half"> <label class="label" for="student_sports">Sports</label> <div class="control"> <div class="select is-fullwidth"> <select class="input" ref="sports"><option value=""></option><option value="State">State</option><option value="National">National</option></select> </div> </div> </div> <div class="column is-full"> <label class="label" for="student_other_qualifications">Other Qualifications</label> <input class="input" ref="other_qualifications" type="text"> </div> <div class="column is-full"> <h3 class="has-text-weight-bold is-size-4 has-text-link">Latest Teaching Experience</h3> <hr style="margin-top: 0.5em; margin-bottom: 0.5em;"> </div> <div class="column is-half"> <label class="label" for="student_institute_name">Institute Name</label> <input class="input" ref="lte_institute_name" type="text"> </div> <div class="column is-half"> <label class="label" for="student_institute_Address">Institute Address</label> <input class="input" ref="lte_institute_address" type="text"> </div> <div class="column is-one-fifth"> <label class="label" for="student_institute_type">Institute Type</label> <div class="control"> <div class="select is-fullwidth"> <select class="input" ref="lte_institute_type"><option value=""></option><option value="Self Funded">Self Funded</option><option value="Government Aided">Government Aided</option></select> </div> </div> </div> <div class="column is-one-fifth"> <label class="label" for="student_designation">Designation</label> <input class="input" ref="lte_designation" type="text"> </div> <div class="column is-one-fifth"> <label class="label is-capitalized" for="student_years_taught">Years taught</label> <input class="input" ref="lte_years_taught" type="text"> </div> <div class="column is-two-fifths"> <label class="label is-capitalized" for="student_subjects_taught">Subjects taught</label> <input class="input" ref="lte_subjects_taught" type="text"> </div> <div class="column is-full"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </section>', '', '', function(opts) {
'use strict';

var self = this;
self.on("mount", function () {
  self.title = 'Add';
  self.student_view = 'show_student';
  /*subject_id_one =true
  subject_id_two = true
  subject_id_three = true*/
  self.update();
  self.readCourses();
  flatpickr(".date", {
    altInput: true,
    altFormat: "d/m/Y",
    dateFormat: "Y-m-d"
  });
});
self.on("unmount", function () {
  studentStore.off('studnets_changed', StudentsChanged);
});
self.show_appropriate_subjects = function () {
  console.log("call");
  console.log(self.refs.course_id.value);
  /*if(self.refs.student_course_id.value == 1){
  	subject_id_one =true
  subject_id_two = true
  subject_id_three = false
  }else if(self.refs.student_course_id.value == 2){
  	}else if(self.refs.student_course_id.value == 3){
  	}*/
};
self.readCourses = function () {
  console.log('readDepartments for employee tag file');
  studentStore.trigger('read_student_courses');
};
self.add_new_student = function () {
  self.student_view = 'add_student';
  self.update();
  //document.getElementById("username").focus()
};
self.close_new_student = function () {
  self.student_view = 'show_student';
  self.update();
};

//read courses
/*self.readDesignations = () => {
   studentStore.trigger('read_designations')
}*/

self.getStudentData = function () {
  console.log("inside student");
  var obj = {};
  obj['student_course_id'] = self.refs.student_course_id.value;
  obj['student_yoa'] = self.refs.student_yoa.value;
  self.loading = true;
  studentStore.trigger('read_students', obj);
  console.log(obj);
};

self.add = function () {
  if (!self.refs.name.value) {
    toastr.info("Please enter Name and try again");
  } else {
    self.loading = true;
    if (self.title == 'Add') {
      console.log(self.refs.subject_1_id.value);
      studentStore.trigger('add_student', self.refs.name.value, self.refs.roll_no.value, self.refs.course_id.value, self.refs.yoa.value, self.refs.doa.value, self.refs.subject_1_id.value, self.refs.subject_2_id.value, self.refs.subject_3_id.value, self.refs.university_registration_no.value, self.refs.mobile.value, self.refs.email.value, self.refs.dob.value, self.refs.gender.value, self.refs.marital_status.value, self.refs.blood_group.value, self.refs.category.value, self.refs.religion.value, self.refs.nationality.value, self.refs.identification_marks.value, self.refs.acn.value, self.refs.p_address.value, self.refs.p_village.value, self.refs.p_po.value, self.refs.p_ps.value, self.refs.p_city.value, self.refs.p_state.value, self.refs.p_pincode.value, self.refs.c_address.value, self.refs.c_village.value, self.refs.c_po.value, self.refs.c_ps.value, self.refs.c_city.value, self.refs.c_state.value, self.refs.c_pincode.value, self.refs.father_name.value, self.refs.father_mobile.value, self.refs.father_occupation.value, self.refs.mother_name.value, self.refs.mother_mobile.value, self.refs.mother_occupation.value, self.refs.guardian_name.value, self.refs.guardian_mobile.value, self.refs.guardian_occupation.value, self.refs.x_school.value, self.refs.x_board.value, self.refs.x_yop.value, self.refs.x_division.value, self.refs.x_full_marks.value, self.refs.x_percentage.value, self.refs.xii_school.value, self.refs.xii_board.value, self.refs.xii_yop.value, self.refs.xii_division.value, self.refs.xii_full_marks.value, self.refs.xii_percentage.value, self.refs.ug_college.value, self.refs.ug_university.value, self.refs.ug_yop.value, self.refs.ug_division.value, self.refs.ug_full_marks.value, self.refs.ug_percentage.value, self.refs.pg_college.value, self.refs.pg_university.value, self.refs.pg_yop.value, self.refs.pg_division.value, self.refs.pg_full_marks.value, self.refs.pg_percentage.value, self.refs.ncc.value, self.refs.sports.value, self.refs.other_qualifications.value, self.refs.lte_institute_name.value, self.refs.lte_institute_address.value, self.refs.lte_institute_type.value, self.refs.lte_designation.value, self.refs.lte_years_taught.value, self.refs.lte_subjects_taught.value);
    } else if (self.title == 'Update') {
      console.log('update');
      studentStore.trigger('edit_student', self.refs.name.value, self.refs.roll_no.value, self.refs.course_id.value, self.refs.yoa.value, self.refs.doa.value, self.refs.subject_1_id.value, self.refs.subject_2_id.value, self.refs.subject_3_id.value, self.refs.university_registration_no.value, self.refs.mobile.value, self.refs.email.value, self.refs.dob.value, self.refs.gender.value, self.refs.marital_status.value, self.refs.blood_group.value, self.refs.category.value, self.refs.religion.value, self.refs.nationality.value, self.refs.identification_marks.value, self.refs.acn.value, self.refs.p_address.value, self.refs.p_village.value, self.refs.p_po.value, self.refs.p_ps.value, self.refs.p_city.value, self.refs.p_state.value, self.refs.p_pincode.value, self.refs.c_address.value, self.refs.c_village.value, self.refs.c_po.value, self.refs.c_ps.value, self.refs.c_city.value, self.refs.c_state.value, self.refs.c_pincode.value, self.refs.father_name.value, self.refs.father_mobile.value, self.refs.father_occupation.value, self.refs.mother_name.value, self.refs.mother_mobile.value, self.refs.mother_occupation.value, self.refs.guardian_name.value, self.refs.guardian_mobile.value, self.refs.guardian_occupation.value, self.refs.x_school.value, self.refs.x_board.value, self.refs.x_yop.value, self.refs.x_division.value, self.refs.x_full_marks.value, self.refs.x_percentage.value, self.refs.xii_school.value, self.refs.xii_board.value, self.refs.xii_yop.value, self.refs.xii_division.value, self.refs.xii_full_marks.value, self.refs.xii_percentage.value, self.refs.ug_college.value, self.refs.ug_university.value, self.refs.ug_yop.value, self.refs.ug_division.value, self.refs.ug_full_marks.value, self.refs.ug_percentage.value, self.refs.pg_college.value, self.refs.pg_university.value, self.refs.pg_yop.value, self.refs.pg_division.value, self.refs.pg_full_marks.value, self.refs.pg_percentage.value, self.refs.ncc.value, self.refs.sports.value, self.refs.other_qualifications.value, self.refs.lte_institute_name.value, self.refs.lte_institute_address.value, self.refs.lte_institute_type.value, self.refs.lte_designation.value, self.refs.lte_years_taught.value, self.refs.lte_subjects_taught.value, self.edit_id);
    }
  }
};

self.cancelOperation = function (e) {
  self.students.map(function (c) {
    c.confirmDelete = false;
    c.confirmEdit = false;
  });
};

self.confirmDelete = function (e) {
  self.students.map(function (c) {
    if (c.id != e.item.st.id) {
      c.confirmDelete = false;
    } else {
      c.confirmDelete = true;
    }
  });
};

self.delete = function (e) {
  self.loading = true;
  studentStore.trigger('delete_student', e.item.st.id);
};

self.edit = function (st, e) {
  console.log(st);
  self.refs.name.value = st.name;
  self.refs.roll_no.value = st.roll_no;
  self.refs.course_id.value = st.course_id;
  self.refs.yoa.value = st.yoa;
  self.refs.doa.value = st.doa;
  self.refs.subject_1_id.value = st.subject_1_id;
  self.refs.subject_2_id.value = st.subject_2_id;
  self.refs.subject_3_id.value = st.subject_3_id;
  self.refs.university_registration_no.value = st.university_registration_no;
  self.refs.mobile.value = st.mobile;
  self.refs.email.value = st.email;
  self.refs.dob.value = st.dob;
  self.refs.gender.value = st.gender;
  self.refs.marital_status.value = st.marital_status;
  self.refs.blood_group.value = st.blood_group;
  self.refs.category.value = st.category;
  self.refs.religion.value = st.religion;
  self.refs.nationality.value = st.nationality;
  self.refs.identification_marks.value = st.identification_marks;
  self.refs.acn.value = st.acn;
  self.refs.p_address.value = st.p_address;
  self.refs.p_village.value = st.p_village;
  self.refs.p_po.value = st.p_po;
  self.refs.p_ps.value = st.p_ps;
  self.refs.p_city.value = st.p_city;
  self.refs.p_state.value = st.p_state;
  self.refs.p_pincode.value = st.p_pincode;
  self.refs.c_address.value = st.c_address;
  self.refs.c_village.value = st.c_village;
  self.refs.c_po.value = st.c_po;
  self.refs.c_ps.value = st.c_ps;
  self.refs.c_city.value = st.c_city;
  self.refs.c_state.value = st.c_state;
  self.refs.c_pincode.value = st.c_pincode;
  self.refs.father_name.value = st.father_name;
  self.refs.father_mobile.value = st.father_mobile;
  self.refs.father_occupation.value = st.father_occupation;
  self.refs.mother_name.value = st.mother_name;
  self.refs.mother_mobile.value = st.mother_mobile;
  self.refs.mother_occupation.value = st.mother_occupation;
  self.refs.guardian_name.value = st.guardian_name;
  self.refs.guardian_mobile.value = st.guardian_mobile;
  self.refs.guardian_occupation.value = st.guardian_occupation;
  self.refs.x_school.value = st.x_school;
  self.refs.x_board.value = st.x_board;
  self.refs.x_yop.value = st.x_yop;
  self.refs.x_division.value = st.x_division;
  self.refs.x_full_marks.value = st.x_full_marks;
  self.refs.x_percentage.value = st.x_percentage;
  self.refs.xii_school.value = st.xii_school;
  self.refs.xii_board.value = st.xii_board;
  self.refs.xii_yop.value = st.xii_yop;
  self.refs.xii_division.value = st.xii_division;
  self.refs.xii_full_marks.value = st.xii_full_marks;
  self.refs.xii_percentage.value = st.xii_percentage;
  self.refs.ug_college.value = st.ug_college;
  self.refs.ug_university.value = st.ug_university;
  self.refs.ug_yop.value = st.ug_yop;
  self.refs.ug_division.value = st.ug_division;
  self.refs.ug_full_marks.value = st.ug_full_marks;
  self.refs.ug_percentage.value = st.ug_percentage;
  self.refs.pg_college.value = st.pg_college;
  self.refs.pg_university.value = st.pg_university;
  self.refs.pg_yop.value = st.pg_yop;
  self.refs.pg_division.value = st.pg_division;
  self.refs.pg_full_marks.value = st.pg_full_marks;
  self.refs.pg_percentage.value = st.pg_percentage;
  self.refs.ncc.value = st.ncc;
  self.refs.sports.value = st.sports;
  self.refs.other_qualifications.value = st.other_qualifications;
  self.refs.lte_institute_name.value = st.lte_institute_name;
  self.refs.lte_institute_address.value = st.lte_institute_address;
  self.refs.lte_institute_type.value = st.lte_institute_type;
  self.refs.lte_designation.value = st.lte_designation;
  self.refs.lte_years_taught.value = st.lte_years_taught;
  self.refs.lte_subjects_taught.value = st.lte_subjects_taught;
  self.student_view = 'add_student';
  self.title = 'Update';
  self.edit_id = st.id;
};

studentStore.on('students_changed', StudentsChanged);
function StudentsChanged(students) {
  self.title = 'Add';
  self.loading = false;
  self.students = students;
  self.studentDataItems = [];
  self.studentDataItems = students;
  self.refs.name.value = '';
  self.refs.roll_no.value = '';
  self.refs.course_id.value = '';
  self.refs.yoa.value = '';
  self.refs.doa.value = '';
  self.refs.subject_1_id.value = '';
  self.refs.subject_2_id.value = '';
  self.refs.subject_3_id.value = '';
  self.refs.university_registration_no.value = '';
  self.refs.mobile.value = '';
  self.refs.email.value = '';
  self.refs.dob.value = '';
  self.refs.gender.value = '';
  self.refs.marital_status.value = '';
  self.refs.blood_group.value = '';
  self.refs.category.value = '';
  self.refs.religion.value = '';
  self.refs.nationality.value = '';
  self.refs.identification_marks.value = '';
  self.refs.acn.value = '';
  self.refs.p_address.value = '';
  self.refs.p_village.value = '';
  self.refs.p_po.value = '';
  self.refs.p_ps.value = '';
  self.refs.p_city.value = '';
  self.refs.p_state.value = '';
  self.refs.p_pincode.value = '';
  self.refs.c_address.value = '';
  self.refs.c_village.value = '';
  self.refs.c_po.value = '';
  self.refs.c_ps.value = '';
  self.refs.c_city.value = '';
  self.refs.c_state.value = '';
  self.refs.c_pincode.value = '';
  self.refs.father_name.value = '';
  self.refs.father_mobile.value = '';
  self.refs.father_occupation.value = '';
  self.refs.mother_name.value = '';
  self.refs.mother_mobile.value = '';
  self.refs.mother_occupation.value = '';
  self.refs.guardian_name.value = '';
  self.refs.guardian_mobile.value = '';
  self.refs.guardian_occupation.value = '';
  self.refs.x_school.value = '';
  self.refs.x_board.value = '';
  self.refs.x_yop.value = '';
  self.refs.x_division.value = '';
  self.refs.x_full_marks.value = '';
  self.refs.x_percentage.value = '';
  self.refs.xii_school.value = '';
  self.refs.xii_board.value = '';
  self.refs.xii_yop.value = '';
  self.refs.xii_division.value = '';
  self.refs.xii_full_marks.value = '';
  self.refs.xii_percentage.value = '';
  self.refs.ug_college.value = '';
  self.refs.ug_university.value = '';
  self.refs.ug_yop.value = '';
  self.refs.ug_division.value = '';
  self.refs.ug_full_marks.value = '';
  self.refs.ug_percentage.value = '';
  self.refs.pg_college.value = '';
  self.refs.pg_university.value = '';
  self.refs.pg_yop.value = '';
  self.refs.pg_division.value = '';
  self.refs.pg_full_marks.value = '';
  self.refs.pg_percentage.value = '';
  self.refs.ncc.value = '';
  self.refs.sports.value = '';
  self.refs.other_qualifications.value = '';
  self.refs.lte_institute_name.value = '';
  self.refs.lte_institute_address.value = '';
  self.refs.lte_institute_type.value = '';
  self.refs.lte_designation.value = '';
  self.refs.lte_years_taught.value = '';
  self.refs.lte_subjects_taught.value = '';

  self.update();
  console.log(self.studentDataItems);
  console.log('self.studentDataItems');
}

studentStore.on('student_courses_changed', CourseChanged);
function CourseChanged(student_courses) {
  console.log('courses_changed1');
  console.log(student_courses);
  self.studentCourses = [];
  self.studentCourses = student_courses;
  self.update();
}
});