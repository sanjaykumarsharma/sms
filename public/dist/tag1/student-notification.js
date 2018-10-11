riot.tag2('student-notification', '<section class="container is-fluid"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Students</h2> </div> </div> <div class="box"> <div class="columns"> <div class="column is-narrow"> <label class="label">Course</label> </div> <div class="column is-narrow"> <div class="control"> <div class="select"> <select ref="student_course"> <option each="{studentCourses}" riot-value="{course}">{course} </option> </select> </div> </div> </div> <div class="column is-narrow"> <label class="label">YOA</label> </div> <div class="column is-narrow"> <div class="control"> <input class="form-control input" ref="student_yoa" type="text"> </div> </div> <div class="column"> <button class="button is-danger has-text-weight-bold" onclick="{getStudentData}">Submit </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable is-narrow"> <thead> <tr> <th>#</th> <th></th> <th>Roll no</th> <th>Name</th> <th>Mobile</th> <th>Email</th> <th>Gender</th> <th>Course</th> <th>YOA</th> <th style="text-align:center;"> <input type="checkbox" checked="{selected}" id="checkStudentName" onclick="{selectAll}"> </th> </tr> </thead> <tbody> <tr each="{st, i in students}"> <td>{i+1}</td> <td></td> <td>{st.roll_no}</td> <td>{st.name}</td> <td>{st.mobile}</td> <td>{st.email}</td> <td>{st.gender}</td> <td>{st.course}</td> <td>{st.yoa}</td> <td style="width:2%; text-align:center;"><input type="checkbox" checked="{selected}" id="{\'addStudentName\' + st.mobile}" onclick="{selectStudent.bind(this,st)}"></td> </tr> </tbody> </table> <textarea class="textarea" id="student_sms_text" ref="student_sms_text" placeholder="SMS TEXT"></textarea><br> <button class="button is-danger is-pulled-right" onclick="{sendStudentNotification}">Send SMS</button> </section>', '', '', function(opts) {
'use strict';

var self = this;
self.on("mount", function () {
  self.addAllCheckBox = true;
  self.addCheckBox = true;
  // self.SendSms=true
  self.update();
  /*flatpickr(".date", {
  altInput: true,
  altFormat: "d/m/Y",
  dateFormat: "Y-m-d",
  })*/
  self.readCourses();
});
self.readCourses = function () {
  console.log('readCourses for student tag file');
  studentNotificationStore.trigger('read_student_courses');
};
self.on("unmount", function () {
  studentNotificationStore.off('students_changed', StudentChanged);
  studentNotificationStore.off('student_sms_changed', SendSmsChanged);
});

self.getStudentData = function () {
  console.log("inside student");
  var obj = {};
  obj['course'] = self.refs.student_course.value;
  obj['student_yoa'] = self.refs.student_yoa.value;
  self.loading = true;
  studentNotificationStore.trigger('read_students', obj);
  console.log(obj);
};

/* self.getNotificationEmployee = ()=>{
 	console.log("inside Employee")
 	console.log("Hello")
 	console.log(self.refs.read_employee_department_id.value)
 	studentNotificationStore.trigger('read_students', self.refs.read_employee_department_id.value)
 }
*/

self.selectAll = function () {
  if ($(checkStudentName).prop("checked") == true) {
    self.students.map(function (i) {
      var addStudentName = '#addStudentName' + i.mobile;
      $(addStudentName).prop('checked', true);
      if ($(addStudentName).is(':checked')) {
        i.selected = true;
        console.log(i.mobile);
        // self.SendSms=false;
      } else {
        i.selected = false;
      }
    });
  } else if ($(checkStudentName).prop("checked") == false) {
    self.students.map(function (i) {
      var addStudentName = '#addStudentName' + i.mobile;
      $(addStudentName).prop('checked', false);
      if ($(addStudentName).is(':checked')) {
        i.selected = true;
      } else {
        i.selected = false;
      }
      console.log(i.mobile);
      //self.SendSms=true;
    });
  }
};

self.selectStudent = function (item, e) {
  self.students.map(function (i) {
    if (item.mobile == i.mobile) {
      i.selected = !i.selected;
      console.log(i.selected);
      if (i.selected == true) {
        console.log(i.mobile);
      } else if (i.selected == false) {
        console.log("hiiiii hellooooo");
      }
    }
  });
};

self.sendStudentNotification = function () {
  self.students.map(function (q) {
    if (q.selected) {
      if (mobile == '') {
        mobile = q.mobile;
      } else {
        mobile = mobile + ',' + q.mobile;
      }
    }
  });

  console.log(mobile);
  if (mobile == '') {
    toastr.info('Please select at least one student and try again');
  } else {
    studentNotificationStore.trigger('send_sms', mobile, self.refs.student_sms_text.value);
  }
};

studentNotificationStore.on('read_student_notification_changed', function (students) {
  self.loading = false;
  self.students = students;
  self.update();
});

studentNotificationStore.on('student_courses_changed', CourseChanged);
function CourseChanged(student_courses) {
  console.log('courses_changed1');
  console.log(student_courses);
  self.studentCourses = [];
  self.studentCourses = student_courses;
  self.update();
}
studentNotificationStore.on('students_changed', StudentChanged);
function StudentChanged(students) {
  console.log('courses_changed1');
  console.log(students);
  self.students = [];
  self.students = students;
  self.update();
}

studentNotificationStore.on('student_sms_changed', SendSmsChanged);
function SendSmsChanged() {
  toastr.success('sms send successfully');
  self.refs.student_sms_text.value = '';
  self.update();
}
});