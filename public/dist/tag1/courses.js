riot.tag2('courses', '<section class="container is-fluid"> <h2 class="title" style="color: #ff3860;">Courses</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-one-quarter"> <label class="label" for="course">Course</label> <input type="text" ref="addCourseInput" class="input"> </div> <div class="column is-half"> <label class="label" for="course_full_name">Full name</label> <input class="input" type="text" ref="addCourseFullNameInput"> </div> <div class="column is-narrow"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title} </button> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>Course</th> <th>Full Name</th> <th></th> </tr> </thead> <tbody> <tr each="{c, i in courseDataItems}"> <td>{c.course}</td> <td>{c.course_full_name}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{c.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, c)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{c.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
"use strict";

var self = this;
self.on("mount", function () {
  self.title = 'Create';
  self.update();
  self.readCourses();
});

self.on("unmount", function () {
  courseStore.off('courses_changed', CoursesChanged);
});

//read courses
self.readCourses = function () {
  courseStore.trigger('read_courses');
};

self.add = function () {
  if (!self.refs.addCourseInput.value) {
    toastr.info("Please enter Course and try again");
  } else if (!self.refs.addCourseFullNameInput.value) {
    toastr.info("Please enter Full Name and try again");
  } else {
    self.loading = true;
    if (self.title == 'Create') {
      console.log('create');
      courseStore.trigger('add_course', self.refs.addCourseInput.value, self.refs.addCourseFullNameInput.value);
    } else if (self.title == 'Update') {
      console.log('update');
      courseStore.trigger('edit_course', self.refs.addCourseInput.value, self.refs.addCourseFullNameInput.value, self.edit_id);
    }
  }
};

self.cancelOperation = function (e) {
  self.courses.map(function (c) {
    c.confirmDelete = false;
    c.confirmEdit = false;
  });
};

self.confirmDelete = function (e) {
  self.courses.map(function (c) {
    if (c.id != e.item.c.id) {
      c.confirmDelete = false;
    } else {
      c.confirmDelete = true;
    }
  });
};

self.delete = function (e) {
  self.loading = true;
  courseStore.trigger('delete_course', e.item.c.id);
};

self.edit = function (c, e) {
  console.log(c);
  self.title = 'Update';
  self.refs.addCourseInput.value = c.course;
  self.refs.addCourseFullNameInput.value = c.course_full_name;
  self.edit_id = c.id;
};

courseStore.on('courses_changed', CoursesChanged);
function CoursesChanged(courses) {
  console.log('courses_changed1');
  console.log(courses);
  self.title = 'Create';
  self.refs.addCourseInput.value = '';
  self.refs.addCourseFullNameInput.value = '';
  self.loading = false;
  self.courses = courses;
  self.courseDataItems = [];
  self.courseDataItems = courses;
  self.update();
  console.log(self.courseDataItems);
  console.log('self.courseDataItems');
}
});