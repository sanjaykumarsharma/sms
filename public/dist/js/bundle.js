'use strict';

function ActivityCategoryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.categories = [];

  self.on('read_categories', function () {
    console.log('i am in read_courses api call from ajax');
    var req = {};
    $.ajax({
      url: '/activity_category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_category', function (category_id) {
    $.ajax({
      url: '/activity_category/delete/' + category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempCategories = self.categories.filter(function (c) {
            return c.category_id != category_id;
          });
          self.categories = tempCategories;
          toastr.info("Category Deleted Successfully");
          self.trigger('categories_changed', self.categories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Category. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_category', function (category_name, category_id) {
    var req = {};
    req.category_name = category_name;
    req.category_id = category_id;
    $.ajax({
      url: '/activity_category/edit/' + category_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.categories = self.categories.map(function (cat) {
            if (cat.category_id == category_id) {
              cat.category_id = category_id;
              cat.category_name = category_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Category Updated Successfully ");
          self.trigger('categories_changed', self.categories);
        } else if (data.status == 'e') {
          showToast("Error updating Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_category', function (category_name) {
    var req = {};
    req.category_name = category_name;
    $.ajax({
      url: '/activity_category/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add category after');
          var obj = {};
          obj.category_id = data.category_id;
          obj.category_name = category_name;
          self.categories = [obj].concat(self.categories);
          toastr.success("Category Inserserted Successfully ");
          self.trigger('categories_changed', self.categories);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function ActivityEventStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.events = [];

  self.on('read_categories', function () {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    $.ajax({
      url: '/activity_event',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_events', function () {
    console.log('i am in read_events api call from ajax');
    var req = {};
    $.ajax({
      url: '/activity_event/read_event',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.events = data.events;
          self.trigger('read_event_changed', data.events);
        } else if (data.status == 'e') {
          showToast("Events Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_event', function (event_id) {
    $.ajax({
      url: '/activity_event/delete/' + event_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempEvents = self.events.filter(function (c) {
            return c.event_id != event_id;
          });
          self.events = tempEvents;
          toastr.info("Event Deleted Successfully");
          self.trigger('delete_event_changed', self.events);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_event', function (event_name, category_id, event_id) {
    var req = {};
    req.event_name = event_name;
    req.category_id = category_id;
    req.event_id = event_id;
    $.ajax({
      url: '/activity_event/edit/' + event_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.events = self.events.map(function (cat) {
            if (cat.event_id == event_id) {
              cat.event_id = event_id;
              cat.event_name = event_name;
              cat.category_id = category_id;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Event Updated Successfully ");
          self.trigger('edit_event_changed', self.events);
        } else if (data.status == 'e') {
          showToast("Error updating Event. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_event', function (event_name, category_id) {
    var req = {};
    req.event_name = event_name;
    req.category_id = category_id;
    $.ajax({
      url: '/activity_event/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add event after');
          var obj = {};
          obj.event_id = data.event_id;
          obj.event_name = event_name;
          obj.category_id = category_id;
          self.events = [obj].concat(self.events);
          toastr.success("Event Inserserted Successfully ");
          self.trigger('add_event_changed', self.events);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function ActivityItemStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.items = [];

  self.on('read_items', function () {
    console.log('i am in read_courses api call from ajax');
    var req = {};
    $.ajax({
      url: '/activity_item',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.items = data.items;
          self.trigger('items_changed', data.items);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_item', function (item_id) {
    $.ajax({
      url: '/activity_item/delete/' + item_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempItems = self.items.filter(function (c) {
            return c.item_id != item_id;
          });
          self.items = tempItems;
          toastr.info("Item Deleted Successfully");
          self.trigger('items_changed', self.items);
        } else if (data.status == 'e') {
          showToast("Error Deleting Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_item', function (item_name, item_id) {
    var req = {};
    req.item_name = item_name;
    req.item_id = item_id;
    $.ajax({
      url: '/activity_item/edit/' + item_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.items = self.items.map(function (cat) {
            if (cat.item_id == item_id) {
              cat.item_id = item_id;
              cat.item_name = item_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Item Updated Successfully ");
          self.trigger('items_changed', self.items);
        } else if (data.status == 'e') {
          showToast("Error updating Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_item', function (item_name) {
    var req = {};
    req.item_name = item_name;
    $.ajax({
      url: '/activity_item/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add item after');
          var obj = {};
          obj.id = data.id;
          obj.item_name = item_name;
          self.items = [obj].concat(self.items);
          toastr.success("Item Inserserted Successfully ");
          self.trigger('items_changed', self.items);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function ActivityStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.events = [];

  self.on('read_categories', function () {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    $.ajax({
      url: '/activity',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  self.on('read_activity_by_category', function (obj) {
    console.log('i am in read_activity_by_category api call from ajax');
    var req = {};
    req.category_id = obj.category_id;
    $.ajax({
      url: '/activity/read_activity_by_category/' + obj.category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.activities = data.activities;
          self.trigger('read_activity_by_category_changed', data.activities);
        } else if (data.status == 'e') {
          showToast("Activities Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_events_by_category', function (category_id) {
    console.log('i am in read_events_by_category api call from ajax');
    console.log(category_id);
    var req = {};
    $.ajax({
      url: '/activity/read_event/' + category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.events = data.events;
          self.trigger('read_events_by_category_changed', data.events);
        } else if (data.status == 'e') {
          showToast("Events Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_items', function () {
    console.log('i am in read_events_by_category api call from ajax');
    var req = {};
    $.ajax({
      url: '/activity/read_item',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.items = data.items;
          self.trigger('read_items_changed', data.items);
        } else if (data.status == 'e') {
          showToast("Events Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_staff', function () {
    console.log('i am in read_events_by_category api call from ajax');
    var req = {};
    $.ajax({
      url: '/activity/read_staff',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.staff = data.staff;
          self.trigger('read_staff_changed', data.staff);
        } else if (data.status == 'e') {
          showToast("Staff Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_categories', function () {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    $.ajax({
      url: '/activity',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_activity', function (obj) {
    console.log(obj);
    $.ajax({
      url: '/activity/add',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add activity after');
          toastr.success("Successfully Inserted");
          self.trigger('add_activity_changed', self.activities);
        } else if (data.status == 'e') {
          showToast("Error adding Employee. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_data_for_update', function (activity_id) {
    console.log('i am in read_data_for_update api call from ajax');
    console.log(activity_id);
    var req = {};
    $.ajax({
      url: '/activity/read_update_activity/' + activity_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.update_activity = data.update_activity;
          self.trigger('read_data_for_update_changed', data.update_activity, data.update_employee_activity);
        } else if (data.status == 'e') {
          showToast("Events Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
"use strict";

var showToast = function showToast(msg, data) {
  if (msg == "" || !msg) {
    msg = "Something went wrong";
  }
  toastr.error(msg + data);
  console.log("[ERROR:]");
  console.log(data);
};

var convertDate = function convertDate(inputDate) {
  //inputDate(d/m/Y) => output(Y-m-d)
  console.log('converting date format');
  if (inputDate == "" || !inputDate) {
    inputDate = "";
  } else {
    var d = inputDate.split("/");
    console.log(d[2] + '-' + d[1] + '-' + d[0]);
    return d[2] + '-' + d[1] + '-' + d[0];
  }
};

function getCookie(c_name) {
  var i,
      x,
      y,
      ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == c_name) {
      return unescape(y);
    }
  }
}

var loginStore = new LoginStore();
RiotControl.addStore(loginStore);

var examSchemeStore = new ExamSchemeStore();
RiotControl.addStore(examSchemeStore);

var gradeStore = new GradeStore();
RiotControl.addStore(gradeStore);

var marksManagerStore = new MarksManagerStore();
RiotControl.addStore(marksManagerStore);

var marksEntryStore = new MarksEntryStore();
RiotControl.addStore(marksEntryStore);

var marksReportStore = new MarksReportStore();
RiotControl.addStore(marksReportStore);

var maturityDevelopmentStore = new MaturityDevelopmentStore();
RiotControl.addStore(maturityDevelopmentStore);

var resultActivationStore = new ResultActivationStore();
RiotControl.addStore(resultActivationStore);

var physicalFitnessStore = new PhysicalFitnessStore();
RiotControl.addStore(physicalFitnessStore);

var examSubjectGroupMapStore = new ExamSubjectGroupMapStore();
RiotControl.addStore(examSubjectGroupMapStore);

//student
var studentAssignHouseStore = new StudentAssignHouseStore();
RiotControl.addStore(studentAssignHouseStore);

var studentGroupStudentStore = new StudentGroupStudentStore();
RiotControl.addStore(studentGroupStudentStore);

//****************************************************ghulam
var sessionStore = new SessionStore();
RiotControl.addStore(sessionStore);

var bankStore = new BankStore();
RiotControl.addStore(bankStore);

var fineStore = new FineStore();
RiotControl.addStore(fineStore);

var feeHeadStore = new FeeHeadStore();
RiotControl.addStore(feeHeadStore);

var feePlanStore = new FeePlanStore();
RiotControl.addStore(feePlanStore);

var applyPlanStore = new ApplyPlanStore();
RiotControl.addStore(applyPlanStore);

var feeSlipStore = new FeeSlipStore();
RiotControl.addStore(feeSlipStore);

var scholarshipStore = new ScholarshipStore();
RiotControl.addStore(scholarshipStore);

//bodhi
var activityitemStore = new ActivityItemStore();
RiotControl.addStore(activityitemStore);

var activitycategoryStore = new ActivityCategoryStore();
RiotControl.addStore(activitycategoryStore);

var activityeventStore = new ActivityEventStore();
RiotControl.addStore(activityeventStore);

var activityStore = new ActivityStore();
RiotControl.addStore(activityStore);

var classTeacherStore = new ClassTeacherStore();
RiotControl.addStore(classTeacherStore);

var mentorcategoryStore = new MentorCategoryStore();
RiotControl.addStore(mentorcategoryStore);

var mentorcaseStore = new MentorCaseStore();
RiotControl.addStore(mentorcaseStore);

var mentordetailStore = new MentorDetailStore();
RiotControl.addStore(mentordetailStore);

var mentorReportStore = new MentorReportStore();
RiotControl.addStore(mentorReportStore);

var disciplinecategoryStore = new DisciplineCategoryStore();
RiotControl.addStore(disciplinecategoryStore);

var disciplinecaseStore = new DisciplineCaseStore();
RiotControl.addStore(disciplinecaseStore);

var disciplinedetailStore = new DisciplineDetailStore();
RiotControl.addStore(disciplinedetailStore);

var disciplineReportStore = new DisciplineReportStore();
RiotControl.addStore(disciplineReportStore);

var studentStore = new StudentStore();
RiotControl.addStore(studentStore);

//tarique
var roleStore = new RoleStore();
RiotControl.addStore(roleStore);

var itemStore = new ItemStore();
RiotControl.addStore(itemStore);

var employeeTypeStore = new employeeTypeStore();
RiotControl.addStore(employeeTypeStore);

var designationStore = new DesignationStore();
RiotControl.addStore(designationStore);

var levelStore = new LevelStore();
RiotControl.addStore(levelStore);

var countryStore = new CountryStore();
RiotControl.addStore(countryStore);

var cityStore = new CityStore();
RiotControl.addStore(cityStore);

var stateStore = new StateStore();
RiotControl.addStore(stateStore);

var religionStore = new ReligionStore();
RiotControl.addStore(religionStore);

var areaStore = new AreaStore();
RiotControl.addStore(areaStore);

var standardStore = new StandardStore();
RiotControl.addStore(standardStore);

var sectionStore = new SectionStore();
RiotControl.addStore(sectionStore);

var clubStore = new ClubStore();
RiotControl.addStore(clubStore);

var parentgroupStore = new ParentGroupStore();
RiotControl.addStore(parentgroupStore);

var remarkStore = new RemarkStore();
RiotControl.addStore(remarkStore);

var inventorydepartmentStore = new InventoryDepartmentStore();
RiotControl.addStore(inventorydepartmentStore);

var employmentStatusStore = new EmploymentStatusStore();
RiotControl.addStore(employmentStatusStore);

var employeeRoleStore = new EmployeeRoleStore();
RiotControl.addStore(employeeRoleStore);

var eventTypeStore = new EventTypeStore();
RiotControl.addStore(eventTypeStore);

var neweventStore = new NewEventStore();
RiotControl.addStore(neweventStore);

var classholidayStore = new ClassHolidayStore();
RiotControl.addStore(classholidayStore);

var categoryStore = new CategoryStore();
RiotControl.addStore(categoryStore);

var infirmarycategoryStore = new InfirmaryCategoryStore();
RiotControl.addStore(infirmarycategoryStore);

var studentinfirmaryStore = new StudentInfirmaryStore();
RiotControl.addStore(studentinfirmaryStore);

var staffinfirmaryStore = new StaffInfirmaryStore();
RiotControl.addStore(staffinfirmaryStore);

var staffbpweightStore = new StaffBPWeightStore();
RiotControl.addStore(staffbpweightStore);

var infirmarycaseStore = new InfirmaryCaseStore();
RiotControl.addStore(infirmarycaseStore);

var eventStore = new EventStore();
RiotControl.addStore(eventStore);

var inventoryRackStore = new InventoryRackStore();
RiotControl.addStore(inventoryRackStore);

var inventoryUnitStore = new InventoryUnitStore();
RiotControl.addStore(inventoryUnitStore);

var inventoryCategoryStore = new InventoryCategoryStore();
RiotControl.addStore(inventoryCategoryStore);

var inventorySubcategoryStore = new InventorySubCategoryStore();
RiotControl.addStore(inventorySubcategoryStore);

var inventoryItemStore = new InventoryItemStore();
RiotControl.addStore(inventoryItemStore);

var inventoryStockStore = new InventoryStockStore();
RiotControl.addStore(inventoryStockStore);

var inventoryIssueStore = new InventoryIssueStore();
RiotControl.addStore(inventoryIssueStore);

var inventorySaleStore = new InventorySaleStore();
RiotControl.addStore(inventorySaleStore);

var currentPage = null;

var goTo = function goTo(path1, path2, path3) {
  riot.mount('main-nav', { selected_nav_item: path1 });
  if (currentPage) {
    currentPage.unmount(true);
  }
  switch (path1) {
    case 'login':
      currentPage = riot.mount('div#view', 'login')[0];
      break;
    case 'exam-scheme':
      currentPage = riot.mount('div#view', 'exam-scheme')[0];
      break;
    case 'grade':
      currentPage = riot.mount('div#view', 'grade')[0];
      break;
    case 'marks-manager':
      currentPage = riot.mount('div#view', 'marks-manager')[0];
      break;
    case 'marks-entry':
      currentPage = riot.mount('div#view', 'marks-entry')[0];
      break;
    case 'maturity-development':
      currentPage = riot.mount('div#view', 'maturity-development')[0];
      break;
    case 'result-activation':
      currentPage = riot.mount('div#view', 'result-activation')[0];
      break;
    case 'physical-fitness':
      currentPage = riot.mount('div#view', 'physical-fitness')[0];
      break;
    case 'subject-group-map':
      currentPage = riot.mount('div#view', 'subject-group-map')[0];
      break;
    case 'marks-report':
      currentPage = riot.mount('div#view', 'marks-report', { selected_marks_report: path2 })[0];
      switch (path2) {
        case 'consolidate-tabulation-sheet':
          riot.mount("div#marks-report-view", 'consolidate-tabulation-sheet');
          break;
        case 'merit-list':
          riot.mount("div#marks-report-view", 'merit-list');
          break;
        case 'top-five':
          riot.mount("div#marks-report-view", 'top-five');
          break;
        case 'first-assessment-report-card':
          riot.mount("div#marks-report-view", 'first-assessment-report-card');
          break;
        case 'final-assessment-report-card':
          riot.mount("div#marks-report-view", 'final-assessment-report-card');
          break;
        default:
          riot.mount("div#marks-report-view", 'consolidate-tabulation-sheet');
      }
      break;
    case 'student-assign-house':
      currentPage = riot.mount('div#view', 'student-assign-house')[0];
      break;
    case 'student-group-student':
      currentPage = riot.mount('div#view', 'student-group-student')[0];
      break;
    case 'fee-bill':
      currentPage = riot.mount('div#view', 'bill', { selected_master: path2 })[0];
      switch (path2) {
        case 'fee-head':
          riot.mount("div#bill-view", 'fee-head');
          break;
        case 'fee-slip':
          riot.mount("div#bill-view", 'fee-slip');
          break;
        case 'fee-plan':
          riot.mount("div#bill-view", 'fee-plan');
          break;
        case 'apply-fee-plan':
          riot.mount("div#bill-view", 'apply-fee-plan');
          break;
        case 'copy-fee-plan':
          riot.mount("div#bill-view", 'copy-fee-plan');
          break;
        default:
          riot.mount("div#bill-view", 'fee-head');
      }
      break;
    case 'scholarship':
      currentPage = riot.mount('div#view', 'scholarship', { selected_master: path1 })[0];
      switch (path2) {
        case 'scholarship':
          riot.mount("div#setting-view", 'scholarship');
          break;
      }
      break;
    case 'fees-setting':
      currentPage = riot.mount('div#view', 'fees-setting', { selected_master: path2 })[0];
      switch (path2) {
        case 'fine-setting':
          riot.mount("div#setting-view", 'fine-setting');
          break;
        case 'bank-account-setting':
          riot.mount("div#setting-view", 'bank-account-setting');
          break;
        case 'session-setting':
          riot.mount("div#setting-view", 'session-setting');
          break;
        default:
          riot.mount("div#setting-view", 'fine-setting');
      }
      break;
    case 'activity-detail':
      currentPage = riot.mount('div#view', 'activity-detail')[0];
      break;
    case 'activity-setting':
      currentPage = riot.mount('div#view', 'activity-setting', { selected_master: path2 })[0];
      switch (path2) {
        case 'activity-item':
          riot.mount("div#activity-setting-view", 'activity-item');
          break;
        case 'activity-event':
          riot.mount("div#activity-setting-view", 'activity-event');
          break;
        case 'activity-category':
          riot.mount("div#activity-setting-view", 'activity-category');
          break;
        default:
          riot.mount("div#activity-setting-view", 'activity-item');
      }
      break;
    case 'mentor-detail':
      currentPage = riot.mount('div#view', 'mentor-detail')[0];
      break;
    case 'mentor-setting':
      currentPage = riot.mount('div#view', 'mentor-setting', { selected_master: path2 })[0];
      switch (path2) {
        case 'mentor-category':
          riot.mount("div#mentor-setting-view", 'mentor-category');
          break;
        case 'mentor-case':
          riot.mount("div#mentor-setting-view", 'mentor-case');
          break;
        default:
          riot.mount("div#mentor-setting-view", 'mentor-category');
      }
      break;
    case 'mentor-report':
      currentPage = riot.mount('div#view', 'mentor-report', { selected_master: path2 })[0];
      switch (path2) {
        case 'mentor-case-wise-report':
          riot.mount("div#mentor-report-view", 'mentor-case-wise-report');
          break;
        case 'mentor-class-wise-report':
          riot.mount("div#mentor-report-view", 'mentor-class-wise-report');
          break;
        case 'mentor-date-wise-case-report':
          riot.mount("div#mentor-report-view", 'mentor-date-wise-case-report');
          break;
        default:
          riot.mount("div#mentor-report-view", 'mentor-case-wise-report');
      }
      break;
    case 'discipline-detail':
      currentPage = riot.mount('div#view', 'discipline-detail')[0];
      break;
    case 'student':
      currentPage = riot.mount('div#view', 'student')[0];
      break;
    case 'discipline-setting':
      currentPage = riot.mount('div#view', 'discipline-setting', { selected_master: path2 })[0];
      switch (path2) {
        case 'discipline-category':
          riot.mount("div#discipline-setting-view", 'discipline-category');
          break;
        case 'discipline-case':
          riot.mount("div#discipline-setting-view", 'discipline-case');
          break;
        default:
          riot.mount("div#discipline-setting-view", 'discipline-category');
      }
      break;
    case 'discipline-report':
      currentPage = riot.mount('div#view', 'discipline-report', { selected_master: path2 })[0];
      switch (path2) {
        case 'discipline-case-wise-report':
          riot.mount("div#discipline-report-view", 'discipline-case-wise-report');
          break;
        case 'discipline-class-wise-report':
          riot.mount("div#discipline-report-view", 'discipline-class-wise-report');
          break;
        case 'discipline-date-wise-case-report':
          riot.mount("div#discipline-report-view", 'discipline-date-wise-case-report');
          break;
        default:
          riot.mount("div#discipline-report-view", 'discipline-case-wise-report');
      }
      break;
    //tarique
    case 'inventory-stock':
      currentPage = riot.mount('div#view', 'inventory-stock')[0];
      break;
    case 'inventory-sale':
      currentPage = riot.mount('div#view', 'inventory-sale')[0];
      break;
    case 'inventory-issue':
      currentPage = riot.mount('div#view', 'inventory-issue')[0];
      break;
    case 'setting':
      currentPage = riot.mount('div#view', 'setting', { selected_master: path2 })[0];
      switch (path2) {
        case 'item':
          riot.mount("div#setting-view", 'item');
          break;
        case 'event':
          riot.mount("div#setting-view", 'event');
          break;
        case 'category':
          riot.mount("div#setting-view", 'category');
          break;
        default:
          riot.mount("div#setting-view", 'item');
      }
      break;
    case 'infirmary-setting':
      currentPage = riot.mount('div#view', 'infirmary-setting', { selected_master: path2 })[0];
      switch (path2) {
        case 'infirmary-category':
          riot.mount("div#infirmary-setting-view", 'infirmary-category');
          break;
        case 'infirmary-case':
          riot.mount("div#infirmary-setting-view", 'infirmary-case');
          break;
        default:
          riot.mount("div#infirmary-setting-view", 'infirmary-case');
      }
      break;
    case 'inventory-setting':
      currentPage = riot.mount('div#view', 'inventory-setting', { selected_master: path2 })[0];
      switch (path2) {
        case 'inventory-rack':
          riot.mount("div#inventory-setting-view", 'inventory-rack');
          break;
        case 'inventory-unit':
          riot.mount("div#inventory-setting-view", 'inventory-unit');
          break;
        case 'inventory-subcategory':
          riot.mount("div#inventory-setting-view", 'inventory-subcategory');
          break;
        case 'inventory-category':
          riot.mount("div#inventory-setting-view", 'inventory-category');
          break;
        case 'inventory-item':
          riot.mount("div#inventory-setting-view", 'inventory-item');
          break;
        default:
          riot.mount("div#inventory-setting-view", 'inventory-rack');
      }
      break;
    case 'master':
      currentPage = riot.mount('div#view', 'master', { selected_master: path2 })[0];
      switch (path2) {
        case 'employee-type':
          riot.mount("div#master-view", 'employee-type');
          break;
        case 'designation':
          riot.mount("div#master-view", 'designations');
          break;
        case 'department':
          riot.mount("div#master-view", 'department');
          break;
        case 'level':
          riot.mount("div#master-view", 'level');
          break;
        case 'employment-status':
          riot.mount("div#master-view", 'employment-status');
          break;

        case 'role':
          riot.mount("div#master-view", 'role');
          break;
        case 'country':
          riot.mount("div#master-view", 'country');
          break;
        case 'city':
          riot.mount("div#master-view", 'city');
          break;
        case 'state':
          riot.mount("div#master-view", 'state');
          break;
        case 'religion':
          riot.mount("div#master-view", 'religion');
          break;
        case 'area':
          riot.mount("div#master-view", 'area');
          break;
        case 'standard':
          riot.mount("div#master-view", 'standard');
          break;
        case 'section-master':
          riot.mount("div#master-view", 'section-master');
          break;
        case 'club':
          riot.mount("div#master-view", 'club');
          break;
        case 'parentgroup':
          riot.mount("div#master-view", 'parentgroup');
          break;
        case 'remark':
          riot.mount("div#master-view", 'remark');
          break;
        case 'inventory-department':
          riot.mount("div#master-view", 'inventory-department');
          break;
        case 'event-master':
          currentPage = riot.mount('div#master-view', 'event-master', { selected_event_master: path3 })[0];
          switch (path3) {
            case 'event-type':
              riot.mount("div#event-master-view", 'event-type');
              break;
            case 'new-event':
              riot.mount("div#event-master-view", 'new-event');
              break;
            case 'class-holiday':
              riot.mount("div#event-master-view", 'class-holiday');
              break;
            default:
              riot.mount("div#event-master-view", 'event-type');

          }
          break;
        default:
          riot.mount("div#master-view", 'employee-type');
      }
      break;
    case 'infirmary':
      currentPage = riot.mount('div#view', 'infirmary', { selected_master: path2 })[0];
      switch (path2) {
        case 'infirmary-student':
          riot.mount("div#infirmary-view", 'infirmary-student');
          break;
        case 'student-report':
          riot.mount("div#infirmary-view", 'infirmary-student');
          break;
        case 'infirmary-staff':
          riot.mount("div#infirmary-view", 'infirmary-staff');
          break;
        case 'infirmary-staff-bp-weight':
          riot.mount("div#infirmary-view", 'infirmary-staff-bp-weight');
          break;
        case 'infirmary-student-report':
          currentPage = riot.mount('div#infirmary-view', 'infirmary-student-report', { selected_infirmary_student_report: path3 })[0];
          switch (path3) {
            case 'infirmary-date-wise-case-report':
              riot.mount("div#infirmary-student-report-view", 'infirmary-date-wise-case-report');
              console.log("inside main");
              break;
            case 'class-wise-report':
              riot.mount("div#infirmary-student-report-view", 'class-wise-report');
              break;
            case 'case-wise-report':
              riot.mount("div#infirmary-student-report-view", 'case-wise-report');
              break;
            default:
              riot.mount("div#infirmary-student-report-view", 'infirmary-date-wise-case-report');

          }

          break;

        // infirmary staff report
        case 'infirmary-staff-report':
          currentPage = riot.mount('div#infirmary-view', 'infirmary-staff-report', { selected_infirmary_staff_report: path3 })[0];
          switch (path3) {
            case 'infirmary-staff-date-wise-case-report':
              riot.mount("div#infirmary-staff-report-view", 'infirmary-staff-date-wise-case-report');
              console.log("inside main");
              break;
            case 'infirmary-staff-monthly-report':
              riot.mount("div#infirmary-staff-report-view", 'infirmary-staff-monthly-report');
              break;
            case 'infirmary-staff-health-card-report':
              riot.mount("div#infirmary-staff-report-view", 'infirmary-staff-health-card-report');
              break;
            default:
              riot.mount("div#infirmary-staff-report-view", 'infirmary-staff-date-wise-case-report');

          }
          break;
        // infirmary staff report
        case 'infirmary-staff-bp-weight-report':
          currentPage = riot.mount('div#infirmary-view', 'infirmary-staff-bp-weight-report', { selected_infirmary_staff_bp_weight_report: path3 })[0];
          switch (path3) {
            // console.log("inside3");
            case 'infirmary-staff-wise-report':
              riot.mount("div#infirmary-staff-bp-weight-report-view", 'infirmary-staff-wise-report');
              // console.log("inside bp");
              break;
            case 'infirmary-staff-monthly-report':
              riot.mount("div#infirmary-staff-bp-weight-report-view", 'infirmary-staff-monthly-report');
              break;
            case 'infirmary-staff-health-card-report':
              riot.mount("div#infirmary-staff-bp-weight-report-view", 'infirmary-staff-health-card-report');
              break;
            default:
              riot.mount("div#infirmary-staff-bp-weight-report-view", 'infirmary-staff-wise-report');

          }
          break;
        default:
          console.log("inside default");
          riot.mount("div#infirmary-view", 'infirmary-student');
      }
      break;
    default:
      currentPage = riot.mount('div#view', 'master/employee-type')[0];
  }
};

route.stop();
route.start(true);
route(goTo);

// riot.route.stop()
// riot.route.start(true)
// riot.route(goTo);
'use strict';

function ApplyPlanStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.students = [];

  self.on('read_students', function (id) {
    console.log('i am in read Student Plan api call from ajax');
    var req = {};
    $.ajax({
      url: '/apply_fee_plans/readStudents/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_apply_changed', data.students);
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  //========Read Fee Plan By Standard =========
  self.on('read_plan_standard', function (id) {
    console.log('i am in read Fee  Plan By Standard api call from ajax');
    var req = {};
    $.ajax({
      url: '/apply_fee_plans/readPlanByStandard/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.plans = data.plans;
          self.trigger('read_plan_changed', data.plans);
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  //=====read Standards ===

  self.on('read_standards', function () {
    console.log('i am in read Standards api call from ajax');
    var req = {};
    $.ajax({
      url: '/apply_fee_plans/readStandards',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Standard Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  //=====read Sections ===

  self.on('read_sections', function () {
    console.log('i am in read sections api call from ajax');
    var req = {};
    $.ajax({
      url: '/apply_fee_plans/readSections',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Sections Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('apply_fee_plan', function (obj) {

    console.log(obj);
    $.ajax({
      url: '/apply_fee_plans/add',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add apply plan after');
          /*let obj = {}
          obj.id = data.id
          obj.head = head
          self.feePlans = [obj, ...self.feePlans]*/
          toastr.success("Plan Inserserted Successfully ");
          //self.trigger('ApplyPlanChanged', self.students)
          self.trigger('ApplyPlanChanged');
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  /*=========Remove Plan========*/
  self.on('remove_fee_plan', function (obj) {

    console.log(obj);
    $.ajax({
      url: '/apply_fee_plans/remove',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('remove applied plan after');
          toastr.success("Plan removed Successfully ");
          //self.trigger('ApplyPlanChanged', self.students)
          self.trigger('ApplyPlanChanged');
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_plan', function (id) {
    $.ajax({
      url: '/fee_plans/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempPlans = self.feePlans.filter(function (c) {
            return c.head_id != id;
          });
          self.feePlans = tempPlans;
          toastr.info("Fee Plan Deleted Successfully");
          self.trigger('fee_plan_changed', self.feePlans);
        } else if (data.status == 'e') {
          showToast("Error Deleting Plan. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_head', function (head, id) {
    var req = {};
    req.head = head;
    req.head_id = id;
    $.ajax({
      url: '/fee_heads/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.heads = self.heads.map(function (cat) {
            if (cat.head_id == id) {
              cat.head_id = id;
              cat.head = head;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Category Updated Successfully ");
          self.trigger('heads_changed', self.heads);
        } else if (data.status == 'e') {
          showToast("Error updating Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function AreaStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.areas = [];

  self.on('read_area', function () {
    console.log('i am in read_area api call from ajax');
    var req = {};
    $.ajax({
      url: '/area',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.areas = data.areas;
          self.trigger('area_changed', data.areas);
        } else if (data.status == 'e') {
          showToast("area Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_area', function (id) {
    $.ajax({
      url: '/area/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempArea = self.areas.filter(function (c) {
            return c.area != id;
          });
          self.areas = tempArea;
          self.trigger('area_changed', self.areas);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_area', function (area, id) {
    var req = {};
    req.area = area;
    req.id = id;
    $.ajax({
      url: '/area/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.areas = self.areas.map(function (cat) {
            if (cat.area == id) {
              cat.area = area;
            }
            // cat.confirmEdit = false
            return cat;
          });
          self.trigger('area_changed', self.areas);
        } else if (data.status == 'e') {
          showToast("Error updating Course. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_area', function (area) {
    var req = {};
    req.area = area;
    $.ajax({
      url: '/area/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add area after');
          var obj = {};
          obj.area = area;
          self.areas = [obj].concat(self.areas);
          self.trigger('area_changed', self.areas);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function BankStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.banks = [];

  self.on('read_bank', function () {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    $.ajax({
      url: '/bank',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.banks = data.banks;
          self.trigger('read_bank_changed', data.banks);
        } else if (data.status == 'e') {
          showToast("Bank Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add', function (bank_account_no, bank_name, branch) {
    var req = {};
    req.bank_account_no = bank_account_no;
    req.bank_name = bank_name;
    req.branch = branch;
    $.ajax({
      url: '/bank/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add event after');
          var obj = {};
          obj.id = data.id;
          obj.bank_account_no = bank_account_no;
          obj.bank_name = bank_name;
          obj.branch = branch;
          self.banks = [obj].concat(self.banks);
          toastr.success("Session Inserserted Successfully ");
          self.trigger('add_bank_changed', self.banks);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('bank_edit', function (bank_account_no, bank_name, branch, bank_ac_no) {
    var req = {};
    req.bank_account_no = bank_account_no;
    req.bank_name = bank_name;
    req.branch = branch;
    req.bank_ac_no = bank_ac_no;
    $.ajax({
      url: '/bank/edit/' + bank_ac_no,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.banks = self.banks.map(function (cat) {
            if (cat.bank_account_no == bank_ac_no) {
              cat.bank_ac_no = bank_ac_no;
              cat.bank_account_no = bank_account_no;
              cat.bank_name = bank_name;
              cat.branch = branch;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Session Updated Successfully ");
          self.trigger('bank_edit_changed', self.banks);
        } else if (data.status == 'e') {
          showToast("Error updating Event. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete', function (bank_account_no) {
    $.ajax({
      url: '/bank/delete/' + bank_account_no,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempSession = self.banks.filter(function (c) {
            return c.bank_account_no != bank_account_no;
          });
          self.banks = tempSession;
          toastr.info("Session Deleted Successfully");
          self.trigger('delete_event_changed', self.banks);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function CategoryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.categories = [];

  self.on('read_categories', function () {
    console.log('i am in read_courses api call from ajax');
    var req = {};
    $.ajax({
      url: '/category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_category', function (category_id) {
    $.ajax({
      url: '/category/delete/' + category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempCategories = self.categories.filter(function (c) {
            return c.category_id != category_id;
          });
          self.categories = tempCategories;
          toastr.info("Category Deleted Successfully");
          self.trigger('categories_changed', self.categories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Category. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_category', function (category_name, category_id) {
    var req = {};
    req.category_name = category_name;
    req.category_id = category_id;
    $.ajax({
      url: '/category/edit/' + category_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.categories = self.categories.map(function (cat) {
            if (cat.category_id == category_id) {
              cat.category_id = category_id;
              cat.category_name = category_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Category Updated Successfully ");
          self.trigger('categories_changed', self.categories);
        } else if (data.status == 'e') {
          showToast("Error updating Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_category', function (category_name) {
    var req = {};
    req.category_name = category_name;
    $.ajax({
      url: '/category/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add category after');
          var obj = {};
          obj.category_id = data.category_id;
          obj.category_name = category_name;
          self.categories = [obj].concat(self.categories);
          toastr.success("Category Inserserted Successfully ");
          self.trigger('categories_changed', self.categories);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function CityStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.cities = [];

  self.on('read_city', function () {
    console.log('i am in read_city api call from ajax');
    var req = {};
    $.ajax({
      url: '/city',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.cities = data.cities;
          self.trigger('city_changed', data.cities);
        } else if (data.status == 'e') {
          showToast("level Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_city', function (id) {
    $.ajax({
      url: '/city/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempCity = self.cities.filter(function (c) {
            return c.city != id;
          });
          self.cities = tempCity;
          self.trigger('city_changed', self.cities);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_city', function (city, code, id) {
    var req = {};
    req.city = city;
    req.code = code;
    req.id = id;
    $.ajax({
      url: '/city/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.cities = self.cities.map(function (cat) {
            if (cat.city == id) {
              cat.city = city;
              cat.code = code;
            }
            // cat.confirmEdit = false
            return cat;
          });
          self.trigger('city_changed', self.cities);
        } else if (data.status == 'e') {
          showToast("Error updating Course. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_city', function (city, code) {
    var req = {};
    req.city = city;
    req.code = code;
    $.ajax({
      url: '/city/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add city after');
          var obj = {};
          //obj.level_id = data.level_id
          obj.city = city;
          obj.code = code;
          self.cities = [obj].concat(self.cities);
          self.trigger('city_changed', self.cities);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function ClassHolidayStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.classHolidays = [];

  self.on('read_standard', function () {
    console.log('i am in standard api call from ajax');
    var req = {};
    $.ajax({
      url: '/class_holiday/readStandard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_class_holiday', function () {
    console.log('i am in read_class_holiday api call from ajax');
    var req = {};
    $.ajax({
      url: '/class_holiday/read_class_holiday',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log("inside read");
          self.classHolidays = data.classHolidays;
          self.trigger('read_class_holiday_changed', data.classHolidays);
        } else if (data.status == 'e') {
          showToast("Event Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_class_holiday', function (id) {
    $.ajax({
      url: '/class_holiday/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempClassHolidays = self.classHolidays.filter(function (c) {
            return c.event_id != id;
          });
          self.classHolidays = tempClassHolidays;
          toastr.info("Event Deleted Successfully");
          self.trigger('delete_class_holiday_changed', self.classHolidays);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_class_holiday', function (event_name, section_id, start_date, end_date, description, id) {
    var req = {};
    req.section_id = section_id, req.event_name = event_name, req.start_date = start_date, req.end_date = end_date, req.description = description, req.id = id;
    $.ajax({
      url: '/class_holiday/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.classHolidays = self.classHolidays.map(function (cat) {
            if (cat.event_id == id) {
              cat.event_id = data.event_id;
              cat.event_name = event_name;
              cat.section_id = section_id;
              cat.start_date = start_date;
              cat.end_date = end_date;
              cat.description = description;
              //cat.standard_id=standard_id
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Class holiday Updated Successfully ");
          self.trigger('edit_class_holiday_changed', self.classHolidays);
        } else if (data.status == 'e') {
          showToast("Error updating events. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_class_holiday', function (event_name, section_id, start_date, end_date, description, holiday) {
    var req = {};
    req.section_id = section_id, req.event_name = event_name, req.start_date = start_date, req.end_date = end_date, req.description = description, req.holiday = holiday, console.log(holiday);
    $.ajax({
      url: '/class_holiday/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add class holiday after');
          var obj = {};
          obj.event_id = data.event_id;
          obj.event_name = event_name;
          obj.section_id = section_id;
          obj.start_date = start_date;
          obj.end_date = end_date;
          obj.description = description;
          // obj.name = name
          self.classHolidays = [obj].concat(self.classHolidays);
          toastr.success("class holiday Inserserted Successfully ");
          self.trigger('add_class_holiday_changed', self.classHolidays);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function ClassTeacherStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.events = [];

  self.on('read_standard', function () {
    console.log('i am in read_standard api call from ajax');
    var req = {};
    $.ajax({
      url: '/classteacher',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.standard = data.standard;
          self.trigger('read_standard_changed', data.standard);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  self.on('read_section_by_standard', function (standard_id) {
    console.log('i am in read_events_by_category api call from ajax');
    console.log(standard_id);
    var req = {};
    $.ajax({
      url: '/classteacher/read_section/' + standard_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.section = data.section;
          self.trigger('read_section_by_standardchanged', data.section);
        } else if (data.status == 'e') {
          showToast("Events Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function ClubStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.clubs = [];

  self.on('read_club', function () {
    console.log('i am in read_events api call from ajax');
    var req = {};
    $.ajax({
      url: '/club/read_club',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.clubs = data.clubs;
          self.trigger('read_club_changed', data.clubs);
        } else if (data.status == 'e') {
          showToast("Club Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_club', function (id) {
    $.ajax({
      url: '/club/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempClubs = self.clubs.filter(function (c) {
            return c.id != id;
          });
          self.clubs = tempClubs;
          toastr.info("Club Deleted Successfully");
          self.trigger('delete_club_changed', self.clubs);
        } else if (data.status == 'e') {
          showToast("Error Deleting Club. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_club', function (club_name, captain, club_detail, id) {
    var req = {};
    req.club_name = club_name;
    req.captain = captain;
    req.club_detail = club_detail;
    req.id = id;
    $.ajax({
      url: '/club/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.clubs = self.clubs.map(function (cat) {
            if (cat.club_id == id) {
              cat.club_id = id;
              cat.club_name = club_name;
              cat.captain = captain;
              cat.club_detail = club_detail;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Club Updated Successfully ");
          self.trigger('edit_club_changed', self.clubs);
        } else if (data.status == 'e') {
          showToast("Error updating clubs. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_club', function (club_name, captain, club_detail) {
    var req = {};
    req.club_name = club_name;
    req.captain = captain;
    req.club_detail = club_detail;
    $.ajax({
      url: '/club/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Club role after');
          var obj = {};
          obj.club_id = data.id;
          obj.club_name = club_name;
          obj.captain = captain;
          obj.club_detail = club_detail;
          // obj.name = name
          self.clubs = [obj].concat(self.clubs);
          toastr.success("club Inserserted Successfully ");
          self.trigger('add_club_changed', self.clubs);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function CountryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.countries = [];

  self.on('read_country', function () {
    console.log('i am in read_level api call from ajax');
    var req = {};
    $.ajax({
      url: '/country',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.countries = data.countries;
          self.trigger('country_changed', data.countries);
        } else if (data.status == 'e') {
          showToast("level Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_country', function (id) {
    $.ajax({
      url: '/country/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempCountry = self.countries.filter(function (c) {
            return c.country != id;
          });
          self.countries = tempCountry;
          self.trigger('country_changed', self.countries);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_country', function (country, code, id) {
    var req = {};
    req.country = country;
    req.code = code;
    req.id = id;
    $.ajax({
      url: '/country/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.countries = self.countries.map(function (cat) {
            if (cat.country == id) {
              cat.country = country;
              cat.code = code;
            }
            // cat.confirmEdit = false
            return cat;
          });
          self.trigger('country_changed', self.countries);
        } else if (data.status == 'e') {
          showToast("Error updating Course. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_country', function (country, code) {
    var req = {};
    req.country = country;
    req.code = code;
    $.ajax({
      url: '/country/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add country after');
          var obj = {};
          //obj.level_id = data.level_id
          obj.country = country;
          obj.code = code;
          self.countries = [obj].concat(self.countries);
          self.trigger('country_changed', self.countries);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function CourseStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.courses = [];

  self.on('read_courses', function () {
    console.log('i am in read_courses api call from ajax');
    var req = {};
    $.ajax({
      url: '/courses',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.courses = data.courses;
          self.trigger('courses_changed', data.courses);
        } else if (data.status == 'e') {
          showToast("Course Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_course', function (id) {
    $.ajax({
      url: '/courses/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempCourses = self.courses.filter(function (c) {
            return c.id != id;
          });
          self.courses = tempCourses;
          toastr.info("Course Deleted Successfully");
          self.trigger('courses_changed', self.courses);
        } else if (data.status == 'e') {
          showToast("Error Deleting Course. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_course', function (course, course_full_name, id) {
    var req = {};
    req.course = course;
    req.course_full_name = course_full_name;
    req.id = id;
    $.ajax({
      url: '/courses/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.courses = self.courses.map(function (cat) {
            if (cat.id == id) {
              cat.id = id;
              cat.course = course;
              cat.course_full_name = course_full_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Course Updated Successfully ");
          self.trigger('courses_changed', self.courses);
        } else if (data.status == 'e') {
          showToast("Error updating Course. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_course', function (course, full_name) {
    var req = {};
    req.course = course;
    req.full_name = full_name;
    $.ajax({
      url: '/courses/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add course after');
          var obj = {};
          obj.id = data.id;
          obj.course = course;
          obj.course_full_name = full_name;
          self.courses = [obj].concat(self.courses);
          toastr.success("Course Inserserted Successfully ");
          self.trigger('courses_changed', self.courses);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function DesignationStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.designations = [];

  self.on('read_designations', function () {
    console.log('i am in read_designations api call from ajax');
    var req = {};
    $.ajax({
      url: '/designations',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.designations = data.designations;
          self.trigger('designations_changed', data.designations);
        } else if (data.status == 'e') {
          showToast("Course Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_designation', function (id) {
    $.ajax({
      url: '/designations/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempdesignations = self.designations.filter(function (c) {
            return c.designation_id != id;
          });
          self.designations = tempdesignations;
          self.trigger('designations_changed', self.designations);
        } else if (data.status == 'e') {
          showToast("Error Deleting Course. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_designation', function (designation, id) {
    var req = {};
    req.designation = designation;
    req.id = id;
    $.ajax({
      url: '/designations/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.designations = self.designations.map(function (cat) {
            if (cat.designation_id == id) {
              cat.designation_id = id;
              cat.designation = designation;
            }
            // cat.confirmEdit = false
            return cat;
          });
          self.trigger('designations_changed', self.designations);
        } else if (data.status == 'e') {
          showToast("Error updating Course. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_designation', function (designation) {
    var req = {};
    req.designation = designation;
    $.ajax({
      url: '/designations/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add designation after');
          var obj = {};
          obj.id = data.id;
          obj.designation = designation;
          self.designations = [obj].concat(self.designations);
          self.trigger('designations_changed', self.designations);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function DisciplineCaseStore() {
  riot.observable(this); // Riot provides our Case emitter.
  var self = this;

  self.discipline_case = [];

  self.on('read_discipline_category', function () {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    $.ajax({
      url: '/discipline_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_discipline_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_discipline_case', function () {
    console.log('i am in add_case api call from ajax');
    var req = {};
    $.ajax({
      url: '/discipline_case/read_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.discipline_case = data.discipline_case;
          self.trigger('read_discipline_case_changed', data.discipline_case);
        } else if (data.status == 'e') {
          showToast("Error Reading Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_discipline_case', function (case_id) {
    $.ajax({
      url: '/discipline_case/delete/' + case_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempCase = self.discipline_case.filter(function (c) {
            return c.case_id != case_id;
          });
          self.discipline_case = tempCase;
          toastr.info("Case Deleted Successfully");
          self.trigger('delete_discipline_case_changed', self.discipline_case);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_discipline_case', function (case_name, category_id, case_id) {
    var req = {};
    req.case_name = case_name;
    req.category_id = category_id;
    req.case_id = case_id;
    $.ajax({
      url: '/discipline_case/edit/' + case_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.discipline_case = self.discipline_case.map(function (cat) {
            if (cat.case_id == case_id) {
              cat.case_id = case_id;
              cat.case_name = case_name;
              cat.category_id = category_id;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Case Updated Successfully ");
          self.trigger('edit_discipline_case_changed', self.discipline_case);
        } else if (data.status == 'e') {
          showToast("Error updating Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_discipline_case', function (case_name, category_id) {
    var req = {};
    req.case_name = case_name;
    req.category_id = category_id;
    $.ajax({
      url: '/discipline_case/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          var obj = {};
          obj.case_id = data.case_id;
          obj.case_name = case_name;
          obj.category_id = category_id;
          self.discipline_case = [obj].concat(self.discipline_case);
          toastr.success("Case Inserserted Successfully ");
          self.trigger('add_discipline_case_changed', self.discipline_case);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function DisciplineCategoryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.discipline_categories = [];

  self.on('read_discipline_category', function () {
    console.log('i am in read_courses api call from ajax');
    var req = {};
    $.ajax({
      url: '/discipline_category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.discipline_categories = data.discipline_categories;
          self.trigger('discipline_category_changed', data.discipline_categories);
        } else if (data.status == 'e') {
          showToast("Category Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_discipline_category', function (category_id) {
    $.ajax({
      url: '/discipline_category/delete/' + category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempDisciplineCategories = self.discipline_categories.filter(function (c) {
            return c.category_id != category_id;
          });
          self.discipline_categories = tempDisciplineCategories;
          toastr.info("Category Deleted Successfully");
          self.trigger('discipline_category_changed', self.discipline_categories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Category. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_discipline_category', function (category_name, category_id) {
    var req = {};
    req.category_name = category_name;
    req.category_id = category_id;
    $.ajax({
      url: '/discipline_category/edit/' + category_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.discipline_categories = self.discipline_categories.map(function (cat) {
            if (cat.category_id == category_id) {
              cat.category_id = category_id;
              cat.category_name = category_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Category Updated Successfully ");
          self.trigger('discipline_category_changed', self.discipline_categories);
        } else if (data.status == 'e') {
          showToast("Error updating Category. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_discipline_category', function (category_name) {
    var req = {};
    req.category_name = category_name;
    $.ajax({
      url: '/discipline_category/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add item after');
          var obj = {};
          obj.category_id = data.category_id;
          obj.category_name = category_name;
          self.discipline_categories = [obj].concat(self.discipline_categories);
          toastr.success("Category Inserserted Successfully ");
          self.trigger('discipline_category_changed', self.discipline_categories);
        } else if (data.status == 'e') {
          showToast("Error adding Category. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function DisciplineDetailStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.mentors = [];

  self.on('read_discipline_categories', function () {
    var req = {};
    $.ajax({
      url: '/discipline_detail',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_discipline_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  self.on('read_discipline_case', function () {
    var req = {};

    $.ajax({
      url: '/discipline_detail/read_discipline_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.discipline_case = data.discipline_case;
          self.trigger('read_discipline_case_changed', data.discipline_case);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_discipline', function (read_category_id) {
    console.log(read_category_id);
    var req = {};
    req.read_category_id = read_category_id;
    $.ajax({
      url: '/discipline_detail/read_discipline/' + read_category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.disciplines = data.disciplines;
          self.trigger('read_discipline_changed', data.disciplines);
        } else if (data.status == 'e') {
          showToast("Discipline Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_for_edit_mentor', function (id) {
    console.log(id);
    var req = {};
    req.id = id;
    $.ajax({
      url: '/mentor_detail/read_for_edit_mentor/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.mentor_details = data.mentor_details;
          self.trigger('read_for_edit_mentor_changed', data.mentor_details);
        } else if (data.status == 'e') {
          showToast("Mentor Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_discipline_detail', function (obj) {
    console.log(obj);
    $.ajax({
      url: '/discipline_detail/add',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add activity after');
          var cat = {};
          cat.id = id;
          cat.referred_by = obj.referred_by;
          cat.enroll_number = obj.enroll_number;
          cat.category_id = obj.category_id;
          cat.case_id = obj.case_id;
          cat.consult_date = obj.consult_date;
          cat.time_in = obj.time_in;
          cat.time_out = obj.time_out;
          cat.diagnosis = obj.diagnosis;
          cat.suggestion = obj.suggestion;
          self.disciplines = [cat].concat(self.disciplines);
          toastr.success("Successfully Inserted");
          self.trigger('add_discipline_detail_changed', self.disciplines);
        } else if (data.status == 'e') {
          showToast("Error adding Discipline. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_for_edit_discipline', function (id) {
    console.log(id);
    var req = {};
    req.id = id;
    $.ajax({
      url: '/discipline_detail/read_for_edit_discipline/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.discipline_details = data.discipline_details;
          self.trigger('read_for_edit_discipline_changed', data.discipline_details);
        } else if (data.status == 'e') {
          showToast("Discipline Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_discipline_detail', function (obj, id) {
    var req = {};
    console.log(obj);
    //req.id=edit_id
    $.ajax({
      url: '/discipline_detail/edit/' + id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.disciplines = self.disciplines.map(function (cat) {
            if (cat.id == id) {
              cat.id = id;
              cat.referred_by = obj.referred_by;
              cat.enroll_number = obj.enroll_number;
              cat.category_id = obj.category_id;
              /*self.mentors.map(i=>{
              if(item.case_id==i.case_id){
                  var case_name = e.item
                }
              })*/
              cat.case_id = obj.case_id;
              cat.consult_date = obj.consult_date;
              cat.time_in = obj.time_in;
              cat.time_out = obj.time_out;
              cat.diagnosis = obj.diagnosis;
              cat.suggestion = obj.suggestion;
            }
            return cat;
          });
          toastr.success("Successfully Update");
          self.trigger('edit_discipline_detail_changed', self.disciplines);
        } else if (data.status == 'e') {
          showToast("Error adding Discipline. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_discipline_detail', function (id) {
    $.ajax({
      url: '/discipline_detail/delete_discipline_detail/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          /*let tempcaseDetails = self.delete_case_details.filter(c => {
            return c.id != id
          })
          self.delete_case_details = tempcaseDetails*/
          toastr.success("Successfully Deleted");
          self.trigger('delete_discipline_detail_changed', self.delete_discipline_detail);
        } else if (data.status == 'e') {
          showToast("Error Deleting Mentor Details. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function DisciplineReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  /*self.case_wise_reports = []*/

  self.on('read_case_wise_report', function (obj) {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/discipline_report/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.case_wise_reports = data.case_wise_reports;
          self.trigger('read_case_wise_report_changed', data.case_wise_reports, data.grand_total);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_date_wise_case_report', function (obj, category_id) {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    req.category_id = category_id;
    $.ajax({
      url: '/discipline_report/read_date_wise_case_report/' + obj.start_date + '/' + obj.end_date + '/' + category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.date_wise_case_report = data.date_wise_case_report;
          self.trigger('read_date_wise_case_report_changed', data.date_wise_case_report);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_standard', function () {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    $.ajax({
      url: '/discipline_report/read_standard/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    $.ajax({
      url: '/discipline_report/read_section/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_session', function () {
    console.log('i am in read_session api call from ajax');
    var req = {};
    $.ajax({
      url: '/discipline_report/read_session/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.sessions = data.sessions;
          self.trigger('read_session_changed', data.sessions);
        } else if (data.status == 'e') {
          showToast("Session Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_class_wise_report', function (standard_id, section_id, session_id) {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    req.session_id = session_id;
    $.ajax({
      url: '/discipline_report/read_class_wise_report/' + standard_id + '/' + section_id + '/' + session_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.class_wise_case_report = data.class_wise_case_report;
          self.trigger('read_class_wise_report_changed', data.class_wise_case_report, data.grand_total);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function EmployeeRoleStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.employeeRoles = [];

  self.on('read_employees', function () {
    console.log('i am in read_employees api call from ajax');
    var req = {};
    $.ajax({
      url: '/role/readEmployee',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.employees = data.employees;
          self.trigger('read_employees_changed', data.employees);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_employee_roles', function () {
    console.log('i am in read_events api call from ajax');
    var req = {};
    $.ajax({
      url: '/role/read_employee_roles',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.employeeRoles = data.employeeRoles;
          self.trigger('read_employee_role_changed', data.employeeRoles);
        } else if (data.status == 'e') {
          showToast("Events Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_employee_role', function (id) {
    $.ajax({
      url: '/role/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempEmployeeRoles = self.employeeRoles.filter(function (c) {
            return c.id != id;
          });
          self.employeeRoles = tempEmployeeRoles;
          toastr.info("Event Deleted Successfully");
          self.trigger('delete_employee_role_changed', self.employeeRoles);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_employee_role', function (role, employee_id, id) {
    var req = {};
    req.role = role;
    req.employee_id = employee_id;
    req.id = id;
    $.ajax({
      url: '/role/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.employeeRoles = self.employeeRoles.map(function (cat) {
            if (cat.role_id == id) {
              cat.role_id = id;
              cat.role = role;
              cat.employee_id = employee_id;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Event Updated Successfully ");
          self.trigger('edit_employee_role_changed', self.employeeRoles);
        } else if (data.status == 'e') {
          showToast("Error updating employeeRoles. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_employee_role', function (role, employee_id) {
    var req = {};
    req.role = role;
    req.employee_id = employee_id;
    $.ajax({
      url: '/role/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add employee role after');
          var obj = {};
          obj.role_id = data.role_id;
          obj.role = role;
          obj.employee_id = employee_id;
          // obj.name = name
          self.employeeRoles = [obj].concat(self.employeeRoles);
          toastr.success("employee role Inserserted Successfully ");
          self.trigger('add_employee_role_changed', self.employeeRoles);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function employeeTypeStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.employeeTypes = [];

  self.on('read_employeeTypes', function () {
    console.log('i am in read_employee Types api call from ajax');
    var req = {};
    $.ajax({
      url: '/employee_type',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.employeeTypes = data.employeeTypes;
          self.trigger('employeeTypes_changed', data.employeeTypes);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_employeeType', function (id) {
    $.ajax({
      url: '/employee_type/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempEmployeeTypes = self.employeeTypes.filter(function (c) {
            return c.emp_type_id != id;
          });
          self.employeeTypes = tempEmployeeTypes;
          toastr.info("Item Deleted Successfully");
          self.trigger('employeeTypes_changed', self.employeeTypes);
        } else if (data.status == 'e') {
          showToast("Error Deleting Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_employeeType', function (employee_type, id) {
    var req = {};
    req.employee_type = employee_type;
    req.id = id;
    $.ajax({
      url: '/employee_type/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.employeeTypes = self.employeeTypes.map(function (cat) {
            if (cat.emp_type_id == id) {
              cat.emp_type_id = id;
              cat.emp_type = employee_type;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Employee Type Updated Successfully ");
          self.trigger('employeeTypes_changed', self.employeeTypes);
        } else if (data.status == 'e') {
          showToast("Error updating Employee Type. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_employeeType', function (employee_type) {
    var req = {};
    req.employee_type = employee_type;
    $.ajax({
      url: '/employee_type/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add employee type after');
          var obj = {};
          obj.emp_type_id = data.emp_type_id;
          obj.emp_type = employee_type;
          self.employeeTypes = [obj].concat(self.employeeTypes);
          toastr.success("Employee Type Inserserted Successfully ");
          self.trigger('employeeTypes_changed', self.employeeTypes);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function EmploymentStatusStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.employmentStatus = [];

  self.on('read_employment_status', function () {
    console.log('i am in read_employment_status api call from ajax');
    var req = {};
    $.ajax({
      url: '/employment_status',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.employmentStatus = data.employmentStatus;
          self.trigger('employment_status_changed', data.employmentStatus);
        } else if (data.status == 'e') {
          showToast("level Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_employment_status', function (id) {
    $.ajax({
      url: '/employment_status/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempEmploymentStatus = self.employmentStatus.filter(function (c) {
            return c.employment_status_id != id;
          });
          self.employmentStatus = tempEmploymentStatus;
          self.trigger('employment_status_changed', self.employmentStatus);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_employment_status', function (employment_status, id) {
    var req = {};
    req.employment_status = employment_status;
    req.id = id;
    $.ajax({
      url: '/employment_status/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.employmentStatus = self.employmentStatus.map(function (cat) {
            if (cat.employment_status_id == id) {
              cat.employment_status_id = id;
              cat.employment_status = employment_status;
            }
            // cat.confirmEdit = false
            return cat;
          });
          self.trigger('employment_status_changed', self.employmentStatus);
        } else if (data.status == 'e') {
          showToast("Error updating Course. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_employment_status', function (employment_status) {
    var req = {};
    req.employment_status = employment_status;
    $.ajax({
      url: '/employment_status/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add employment_status after');
          var obj = {};
          obj.employment_status_id = data.employment_status_id;
          obj.employment_status = employment_status;
          self.employmentStatus = [obj].concat(self.employmentStatus);
          self.trigger('employment_status_changed', self.employmentStatus);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function EventStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.events = [];

  self.on('read_categories', function () {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    $.ajax({
      url: '/event',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_events', function () {
    console.log('i am in read_events api call from ajax');
    var req = {};
    $.ajax({
      url: '/event/read_event',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.events = data.events;
          self.trigger('read_event_changed', data.events);
        } else if (data.status == 'e') {
          showToast("Events Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_event', function (event_id) {
    $.ajax({
      url: '/event/delete/' + event_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempEvents = self.events.filter(function (c) {
            return c.event_id != event_id;
          });
          self.events = tempEvents;
          toastr.info("Event Deleted Successfully");
          self.trigger('delete_event_changed', self.events);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_event', function (event_name, category_id, event_id) {
    var req = {};
    req.event_name = event_name;
    req.category_id = category_id;
    req.event_id = event_id;
    $.ajax({
      url: '/event/edit/' + event_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.events = self.events.map(function (cat) {
            if (cat.event_id == event_id) {
              cat.event_id = event_id;
              cat.event_name = event_name;
              cat.category_id = category_id;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Event Updated Successfully ");
          self.trigger('edit_event_changed', self.events);
        } else if (data.status == 'e') {
          showToast("Error updating Event. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_event', function (event_name, category_id) {
    var req = {};
    req.event_name = event_name;
    req.category_id = category_id;
    $.ajax({
      url: '/event/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add event after');
          var obj = {};
          obj.event_id = data.event_id;
          obj.event_name = event_name;
          obj.category_id = category_id;
          self.events = [obj].concat(self.events);
          toastr.success("Event Inserserted Successfully ");
          self.trigger('add_event_changed', self.events);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function EventTypeStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.eventTypes = [];

  self.on('read_eventTypes', function () {
    console.log('i am in read_event Types api call from ajax');
    var req = {};
    $.ajax({
      url: '/event_type',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.eventTypes = data.eventTypes;
          self.trigger('eventTypes_changed', data.eventTypes);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_eventType', function (id) {
    $.ajax({
      url: '/event_type/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempEventTypes = self.eventTypes.filter(function (c) {
            return c.event_type_id != id;
          });
          self.eventTypes = tempEventTypes;
          toastr.info("Item Deleted Successfully");
          self.trigger('eventTypes_changed', self.eventTypes);
        } else if (data.status == 'e') {
          showToast("Error Deleting Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_eventType', function (event_type, id) {
    var req = {};
    req.event_type = event_type;
    req.id = id;
    $.ajax({
      url: '/event_type/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.eventTypes = self.eventTypes.map(function (cat) {
            if (cat.event_type_id == id) {
              cat.event_type_id = id;
              cat.event_type = event_type;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Event Type Updated Successfully ");
          self.trigger('eventTypes_changed', self.eventTypes);
        } else if (data.status == 'e') {
          showToast("Error updating Event Type. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_eventType', function (event_type) {
    var req = {};
    req.event_type = event_type;
    $.ajax({
      url: '/event_type/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Event type after');
          var obj = {};
          obj.event_type_id = data.event_type_id;
          obj.event_type = event_type;
          self.eventTypes = [obj].concat(self.eventTypes);
          toastr.success("Event Type Inserserted Successfully ");
          self.trigger('eventTypes_changed', self.eventTypes);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function ExamSchemeStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.examSchemes = [];

  self.on('read_exam_schemes', function () {
    var req = {};
    $.ajax({
      url: '/exam-scheme',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.examSchemes = data.examSchemes;
          self.trigger('exam_scheme_changed', data.examSchemes);
        } else if (data.status == 'e') {
          showToast("Exam Scheme Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_exam_scheme', function (scheme_name) {
    var req = {};
    req.scheme_name = scheme_name;
    $.ajax({
      url: '/exam-scheme/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          var obj = {};
          obj.scheme_id = data.scheme_id;
          obj.scheme_name = scheme_name;
          self.examSchemes = [obj].concat(self.examSchemes);
          toastr.success("Exam Scheme Created Successfully ");
          self.trigger('add_exam_scheme_changed', self.examSchemes);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('update_exam_scheme', function (scheme_name, scheme_id) {
    var req = {};
    req.scheme_name = scheme_name;
    req.scheme_id = scheme_id;
    $.ajax({
      url: '/exam-scheme/edit/' + scheme_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.examSchemes = self.examSchemes.map(function (cat) {
            if (cat.scheme_id == scheme_id) {
              cat.scheme_id = scheme_id;
              cat.scheme_name = scheme_name;
            }
            cat.confirmEdit = false;
            return cat;
          });
          toastr.success("Exam Scheme Updated Successfully ");
          self.trigger('add_exam_scheme_changed', self.examSchemes); // same trigger, as Add Exam Scheme
        } else if (data.status == 'e') {
          showToast("Error updating Exam Scheme. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_exam_scheme', function (scheme_id) {
    $.ajax({
      url: '/exam-scheme/delete/' + scheme_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempExamScheme = self.examSchemes.filter(function (c) {
            return c.scheme_id != scheme_id;
          });
          self.examSchemes = tempExamScheme;
          toastr.info("Exam Scheme Deleted Successfully");
          self.trigger('delete_exam_scheme_changed', self.examSchemes);
        } else if (data.status == 'e') {
          showToast("Error Deleting Exam Scheme. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************exams start*****************************************************************/
  self.exams = [];
  self.on('read_exams', function (scheme_id) {
    var req = {};
    $.ajax({
      url: '/exam-scheme/exams/' + scheme_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.exams = data.exams;
          self.trigger('read_exams_changed', data.exams);
        } else if (data.status == 'e') {
          showToast("Exams Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_exam', function (obj) {
    $.ajax({
      url: '/exam-scheme/add-exam',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          var ob = {};
          ob.exam_type_id = data.exam_type_id;
          ob.exam_type = obj.exam_type;
          ob.start_date = obj.start_date;
          ob.end_date = obj.end_date;
          ob.last_login_date = obj.last_login_date;
          ob.assessment = obj.assessment;
          ob.exam_group = obj.exam_group;
          self.exams = [ob].concat(self.exams);
          toastr.success("Exam Created Successfully ");
          self.trigger('add_exam_changed', self.exams);
        } else if (data.status == 'e') {
          showToast("Error adding . Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_exam', function (exam_type_id) {
    $.ajax({
      url: '/exam-scheme/delete-exam/' + exam_type_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempExams = self.exams.filter(function (c) {
            return c.exam_type_id != exam_type_id;
          });
          self.exams = tempExams;
          toastr.info("Exam Deleted Successfully");
          self.trigger('delete_exam_changed', self.exams);
        } else if (data.status == 'e') {
          showToast("Error Deleting Exam. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('update_exam', function (obj, exam_type_id) {
    $.ajax({
      url: '/exam-scheme/edit-exam/' + exam_type_id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.exams = self.exams.map(function (ob) {
            if (ob.exam_type_id == exam_type_id) {
              ob.exam_type_id = exam_type_id;
              ob.exam_type = obj.exam_type;
              ob.start_date = obj.start_date;
              ob.end_date = obj.end_date;
              ob.last_login_date = obj.last_login_date;
              ob.assessment = obj.assessment;
              ob.exam_group = obj.exam_group;
            }
            ob.confirmEdit = false;
            return ob;
          });
          toastr.success("Exam Updated Successfully ");
          self.trigger('add_exam_changed', self.exams); // same trigger, as Add Exam
        } else if (data.status == 'e') {
          showToast("Error updating Exam. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************classes start*****************************************************************/
  self.on('read_classes', function (scheme_id) {
    var req = {};
    $.ajax({
      url: '/exam-scheme/classes/' + scheme_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.freeClasses, data.assignedClasses);
        } else if (data.status == 'e') {
          showToast("Exam Scheme Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('assign_standard', function (scheme_id, standards) {
    var obj = {};
    obj['scheme_id'] = scheme_id;
    obj['standards'] = standards;
    $.ajax({
      url: '/exam-scheme/assign-standard/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          toastr.success("Classes assigned successfully ");
          self.trigger('assign_standard_changed', standards);
        } else if (data.status == 'e') {
          showToast("Error assigning classes. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('free_up_standard', function (scheme_id, standards) {
    var obj = {};
    obj['scheme_id'] = scheme_id;
    obj['standards'] = standards;
    $.ajax({
      url: '/exam-scheme/free-up-standard/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {

          toastr.success("Classes freed successfully ");
          self.trigger('assign_standard_changed', standards);
        } else if (data.status == 'e') {
          showToast("Error while free up classes. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function ExamSubjectGroupMapStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.subjectGroupMaps = [];

  self.on('read_subject_groups', function () {
    var req = {};
    $.ajax({
      url: '/exam-subject-group-map',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.subjectGroupMaps = data.subjectGroupMaps;
          self.trigger('subject_group_changed', data.subjectGroupMaps);
        } else if (data.status == 'e') {
          showToast("Exam Scheme Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_subject_group', function (subject_group) {
    var req = {};
    req.subject_group = subject_group;
    $.ajax({
      url: '/exam-subject-group-map/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          var obj = {};
          obj.id = data.id;
          obj.subject_group = subject_group;
          self.subjectGroupMaps = [obj].concat(self.subjectGroupMaps);
          toastr.success("Exam Scheme Created Successfully ");
          self.trigger('add_subject_group_changed', self.subjectGroupMaps);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('update_subject_group', function (subject_group, id) {
    var req = {};
    req.subject_group = subject_group;
    req.id = id;
    $.ajax({
      url: '/exam-subject-group-map/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.subjectGroupMaps = self.subjectGroupMaps.map(function (cat) {
            if (cat.id == id) {
              cat.id = id;
              cat.subject_group = subject_group;
            }
            cat.confirmEdit = false;
            return cat;
          });
          toastr.success("Exam Scheme Updated Successfully ");
          self.trigger('add_subject_group_changed', self.subjectGroupMaps); // same trigger, as Add Exam Scheme
        } else if (data.status == 'e') {
          showToast("Error updating Exam Scheme. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_subject_group', function (id) {
    $.ajax({
      url: '/exam-subject-group-map/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempExamScheme = self.subjectGroupMaps.filter(function (c) {
            return c.id != id;
          });
          self.subjectGroupMaps = tempExamScheme;
          toastr.info("Exam Scheme Deleted Successfully");
          self.trigger('delete_subject_group_changed', self.subjectGroupMaps);
        } else if (data.status == 'e') {
          showToast("Error Deleting Exam Scheme. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************subjects start*****************************************************************/
  self.on('read_subjects', function (id) {
    var req = {};
    $.ajax({
      url: '/exam-subject-group-map/subjects/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_subjects_changed', data.freeSubjects, data.assignedSubjects);
        } else if (data.status == 'e') {
          showToast("Exam Scheme Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('assign_subjects', function (id, subjects) {
    var obj = {};
    obj['id'] = id;
    obj['subjects'] = subjects;
    $.ajax({
      url: '/exam-subject-group-map/assign-subjects/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          toastr.success("Subjects assigned successfully ");
          self.trigger('assign_subjects_changed', subjects);
        } else if (data.status == 'e') {
          showToast("Error assigning subjects. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('free_up_subject', function (id, subjects) {
    var obj = {};
    obj['id'] = id;
    obj['subjects'] = subjects;
    $.ajax({
      url: '/exam-subject-group-map/free-up-subject/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {

          toastr.success("Subjects freed successfully ");
          self.trigger('assign_subjects_changed', subjects);
        } else if (data.status == 'e') {
          showToast("Error while free up subjects. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function FeeHeadStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.heads = [];

  self.on('read_heads', function () {
    console.log('i am in read heads api call from ajax');
    var req = {};
    $.ajax({
      url: '/fee_heads',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.heads = data.heads;
          self.trigger('heads_changed', data.heads);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_head', function (id) {
    $.ajax({
      url: '/fee_heads/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempHeads = self.heads.filter(function (c) {
            return c.head_id != id;
          });
          self.heads = tempHeads;
          toastr.info("Head Deleted Successfully");
          self.trigger('heads_changed', self.heads);
        } else if (data.status == 'e') {
          showToast("Error Deleting Head. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_head', function (head, id) {
    var req = {};
    req.head = head;
    req.head_id = id;
    $.ajax({
      url: '/fee_heads/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.heads = self.heads.map(function (cat) {
            if (cat.head_id == id) {
              cat.head_id = id;
              cat.head = head;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Category Updated Successfully ");
          self.trigger('heads_changed', self.heads);
        } else if (data.status == 'e') {
          showToast("Error updating Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_head', function (head) {
    var req = {};
    req.head = head;
    $.ajax({
      url: '/fee_heads/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add head after');
          var obj = {};
          obj.id = data.id;
          obj.head = head;
          self.heads = [obj].concat(self.heads);
          toastr.success("Head Inserserted Successfully ");
          self.trigger('heads_changed', self.heads);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function FeePlanStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.feePlans = [];

  self.on('read_fee_plans', function () {
    console.log('i am in read Fee Plan api call from ajax');
    var req = {};
    $.ajax({
      url: '/fee_plans',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.feePlans = data.feePlans;
          self.trigger('fee_plan_changed', data.feePlans);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  /*======== Read Fee Heads =======*/
  self.on('read_heads', function () {
    console.log('i am in read heads api call from ajax');
    var req = {};
    $.ajax({
      url: '/fee_heads',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.heads = data.heads;
          self.trigger('heads_changed', data.heads);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  /*======== Read Fee Slip for edit ====*/
  self.on('read_fee_slip_edit', function (id) {
    console.log('i am in read Fee Slip Edit  api call from ajax');
    var req = {};
    $.ajax({
      url: '/fee_plans/readSlipEdit/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.feeSlipEditHeads = data.feeSlipEditHeads;
          console.log("======Head====");
          console.log(data.feeSlipEditHeads);
          self.trigger('fee_slip_read_edit_changed', data.feeSlipEditHeads);
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  /*====== Read Fee Slips */
  self.on('read_slips', function () {
    console.log('i am in read slips api call from ajax');
    var req = {};
    $.ajax({
      url: '/fee_slips',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.slips = data.slips;
          self.trigger('slips_changed', data.slips);
        } else if (data.status == 'e') {
          showToast("Slip Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  //=====read Standards ===

  self.on('read_standards', function () {
    console.log('i am in read Standards api call from ajax');
    var req = {};
    $.ajax({
      url: '/fee_plans/readStandards',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  //============= Fee Slip Head =========    
  self.on('read_fee_slip_head', function (id) {
    console.log('i am in read Fee Slip Head  api call from ajax');
    var req = {};
    $.ajax({
      url: '/fee_plans/readFeeSlips/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          if (data.feeSlipHeads.length > 0) {
            self.feeSlipHeads = data.feeSlipHeads;
            self.trigger('fee_slip_head_changed', data.feeSlipHeads);
          } else {
            showToast("Map Fee Head first and try again.", data);
          }
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  //=========== Add add_head_amount=============
  self.on('add_head_amount', function (obj) {

    console.log(obj);
    $.ajax({
      url: '/fee_plans/addHeadAmount',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add head amount after');
          //let obj = {}
          /*obj.id = data.id
          obj.head = head*/
          //self.feePlans = [obj, ...self.feePlans]
          toastr.success("head amount  Inserserted Successfully, wish to insert more");
          self.trigger('map_fee_head_changed');
        } else if (data.status == 'e') {
          showToast("Error in Mapping Heads. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  //=========== Add add_head_amount=============
  self.on('edit_head_amount', function (obj) {
    $.ajax({
      url: '/fee_plans/editHeadAmount/' + obj.fee_slip_id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("head amount  updated Successfully, wish to insert more");
          self.trigger('map_fee_head_changed');
        } else if (data.status == 'e') {
          showToast("Error in Mapping Heads. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  /*========== end add head amount ===========*/

  self.on('add_plan', function (obj) {

    console.log(obj);
    $.ajax({
      url: '/fee_plans/add',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add plan after');
          var _obj = {};
          /*obj.id = data.id
          obj.head = head*/
          self.feePlans = [_obj].concat(self.feePlans);
          toastr.success("Plan Inserserted Successfully ");
          self.trigger('add_fee_plan_changed', self.feePlans);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_plan', function (id) {
    $.ajax({
      url: '/fee_plans/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempPlans = self.feePlans.filter(function (c) {
            return c.fee_plan_id != id;
          });
          self.feePlans = tempPlans;
          toastr.info("Fee Plan Deleted Successfully");
          self.trigger('fee_plan_changed', self.feePlans);
        } else if (data.status == 'e') {
          showToast("Error Deleting Plan. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  //==== delete fee slip id =====
  self.on('delete_fee_slip', function (id) {
    $.ajax({
      url: '/fee_plans/delete_fee_slip/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {

          //self.feePlans = tempPlans
          toastr.info("Fee Slip Deleted Successfully");
          self.trigger('fee_slip_delete_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Plan. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_head', function (head, id) {
    var req = {};
    req.head = head;
    req.head_id = id;
    $.ajax({
      url: '/fee_heads/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.heads = self.heads.map(function (cat) {
            if (cat.head_id == id) {
              cat.head_id = id;
              cat.head = head;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Category Updated Successfully ");
          self.trigger('heads_changed', self.heads);
        } else if (data.status == 'e') {
          showToast("Error updating Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function FeeSlipStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.slips = [];

  self.on('read_slips', function () {
    console.log('i am in read slips api call from ajax');
    var req = {};
    $.ajax({
      url: '/fee_slips',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.slips = data.slips;
          self.trigger('slips_changed', data.slips);
        } else if (data.status == 'e') {
          showToast("Slip Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_slip', function (fee_slip_name) {
    $.ajax({
      url: '/fee_slips/delete/' + fee_slip_name,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempSlips = self.slips.filter(function (c) {
            return c.fee_slip_name != fee_slip_name;
          });
          self.slips = tempSlips;
          toastr.info("Slip Deleted Successfully");
          self.trigger('slips_changed', self.slips);
        } else if (data.status == 'e') {
          showToast("Error Deleting Head. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_slip', function (fee_slip_name, old_fee_slip_name) {
    var req = {};
    console.log("old" + old_fee_slip_name);
    req.fee_slip_name = fee_slip_name;
    req.old_fee_slip_name = old_fee_slip_name;
    $.ajax({
      url: '/fee_slips/edit',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.slips = self.slips.map(function (cat) {
            if (cat.fee_slip_name == old_fee_slip_name) {
              cat.fee_slip_name = fee_slip_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Slip Updated Successfully ");
          self.trigger('slips_changed', self.slips);
        } else if (data.status == 'e') {
          showToast("Error updating Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_slip', function (fee_slip_name) {
    var req = {};
    req.fee_slip_name = fee_slip_name;
    $.ajax({
      url: '/fee_slips/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add fee slip after');
          var obj = {};
          obj.fee_slip_name = fee_slip_name;
          self.slips = [obj].concat(self.slips);
          toastr.success("Slip Inserserted Successfully ");
          self.trigger('slips_changed', self.slips);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function FineStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.fines = [];

  self.on('read_fine_setting', function () {
    console.log('i am in read api call from ajax');
    var req = {};
    $.ajax({
      url: '/fine_setting',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.fines = data.fines;
          self.trigger('read_fine_changed', data.fines);
        } else if (data.status == 'e') {
          showToast("Fine Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add', function (fine_grace_preiod, fine_amount, fine_type) {
    var req = {};
    req.fine_type = fine_type;
    req.fine_grace_preiod = fine_grace_preiod;
    req.fine_amount = fine_amount;
    $.ajax({
      url: '/fine_setting/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add event after');
          var obj = {};
          obj.id = data.id;
          obj.fine_type = fine_type;
          obj.fine_grace_preiod = fine_grace_preiod;
          obj.fine_amount = fine_amount;
          self.fines = [obj].concat(self.fines);
          toastr.success("Fine Inserserted Successfully ");
          self.trigger('add_bank_changed', self.fines);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function GradeStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.grades = [];

  self.on('read_exam_schemes', function () {
    var req = {};
    $.ajax({
      url: '/exam-scheme',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('exam_scheme_changed', data.examSchemes);
        } else if (data.status == 'e') {
          showToast("Exam Scheme Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_exam_types', function (scheme_id) {
    $.ajax({
      url: '/grade/exam-type/' + scheme_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('exam_type_changed', data.examTypes);
        } else if (data.status == 'e') {
          showToast("Exam Type Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_grades', function (scheme_id, exam_type_id) {
    $.ajax({
      url: '/grade/exam-type/' + scheme_id + '/' + exam_type_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.grades = data.grades;
          self.trigger('grades_changed', data.grades);
        } else if (data.status == 'e') {
          showToast("Grade Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_grade', function (obj) {
    $.ajax({
      url: '/grade/add',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          var ob = {};
          ob.grade_id = data.grade_id;
          ob.min_marks = obj.min_marks;
          ob.max_marks = obj.max_marks;
          ob.grade = obj.grade;
          self.grades = [ob].concat(self.grades);
          toastr.success("Grade Created Successfully ");
          self.trigger('add_grade_changed', self.grades);
        } else if (data.status == 'e') {
          showToast("Error adding grade. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('update_grade', function (obj, grade_id) {
    $.ajax({
      url: '/grade/edit/' + grade_id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.grades = self.grades.map(function (cat) {
            if (cat.grade_id == grade_id) {
              cat.grade_id = grade_id;
              cat.max_marks = obj.max_marks;
              cat.min_marks = obj.min_marks;
              cat.grade = obj.grade;
            }
            cat.confirmEdit = false;
            return cat;
          });
          toastr.success("Grade Updated Successfully ");
          self.trigger('add_grade_changed', self.grades); // same trigger, as Add Exam Scheme
        } else if (data.status == 'e') {
          showToast("Error updating grade. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_grade', function (grade_id) {
    $.ajax({
      url: '/grade/delete/' + grade_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempExamScheme = self.grades.filter(function (c) {
            return c.grade_id != grade_id;
          });
          self.grades = tempExamScheme;
          toastr.info("Grade Deleted Successfully");
          self.trigger('delete_grade_changed', self.grades);
        } else if (data.status == 'e') {
          showToast("Error Deleting Grade. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function InfirmaryCaseStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.infirmaryCases = [];
  self.infirmaryCategories = [];
  self.on('read_infirmary_category', function () {
    console.log('i am in read_sections api call from ajax');
    var req = {};
    $.ajax({
      url: '/infirmary_case/readInfirmaryCategory',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCategories = data.infirmaryCategories;
          self.trigger('read_infirmary_category_changed', data.infirmaryCategories);
        } else if (data.status == 'e') {
          showToast("case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_infirmary_case', function () {
    console.log('i am in read_section api call from ajax');
    var req = {};
    $.ajax({
      url: '/infirmary_case/read_infirmary_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCases = data.infirmaryCases;
          self.trigger('read_infirmary_case_changed', data.infirmaryCases);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_infirmary_case', function (id) {
    $.ajax({
      url: '/infirmary_case/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempInfarmaryCases = self.infirmaryCases.filter(function (c) {
            return c.case_id != id;
          });
          self.infirmaryCases = tempInfarmaryCases;
          toastr.info("Case Deleted Successfully");
          self.trigger('delete_infirmary_case_changed', self.infirmaryCases);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_infirmary_case', function (case_name, category_id, id) {
    var req = {};
    req.case_name = case_name;
    req.category_id = category_id;
    req.id = id;
    $.ajax({
      url: '/infirmary_case/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.infirmaryCases = self.infirmaryCases.map(function (cat) {
            if (cat.case_id == id) {
              cat.case_id = id;
              cat.case_name = case_name;
              cat.category_id = category_id;
              //cat.standard_id=standard_id
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Case Updated Successfully ");
          self.trigger('edit_infirmary_case_changed', self.infirmaryCases);
        } else if (data.status == 'e') {
          showToast("Error updating Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_infirmary_case', function (case_name, category_id) {
    var req = {};
    req.case_name = case_name;
    req.category_id = category_id;
    $.ajax({
      url: '/infirmary_case/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add case  after');
          var obj = {};
          obj.case_id = data.case_id;
          obj.case_name = case_name;
          obj.category_id = category_id;
          // obj.name = name
          self.infirmaryCases = [obj].concat(self.infirmaryCases);
          toastr.success("Case  Inserserted Successfully ");
          self.trigger('add_infirmary_case_changed', self.infirmaryCases);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function InfirmaryCategoryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.infirmaryCategories = [];

  self.on('read_categories', function () {
    console.log('i am in read_courses api call from ajax');
    var req = {};
    $.ajax({
      url: '/infirmary_category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCategories = data.infirmaryCategories;
          self.trigger('categories_changed', data.infirmaryCategories);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_category', function (id) {
    $.ajax({
      url: '/infirmary_category/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempCategories = self.infirmaryCategories.filter(function (c) {
            return c.category_id != id;
          });
          self.infirmaryCategories = tempCategories;
          toastr.info("Category Deleted Successfully");
          self.trigger('categories_changed', self.infirmaryCategories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Category. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_category', function (category_name, id) {
    var req = {};
    req.category_name = category_name;
    req.id = id;
    $.ajax({
      url: '/infirmary_category/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.infirmaryCategories = self.infirmaryCategories.map(function (cat) {
            if (cat.category_id == id) {
              cat.category_id = id;
              cat.category_name = category_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Category Updated Successfully ");
          self.trigger('categories_changed', self.infirmaryCategories);
        } else if (data.status == 'e') {
          showToast("Error updating Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_category', function (category_name) {
    var req = {};
    req.category_name = category_name;
    $.ajax({
      url: '/infirmary_category/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add category after');
          var obj = {};
          obj.category_id = data.id;
          obj.category_name = category_name;
          self.infirmaryCategories = [obj].concat(self.infirmaryCategories);
          toastr.success("Category Inserserted Successfully ");
          self.trigger('categories_changed', self.infirmaryCategories);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function InventoryCategoryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventoryCategories = [];
  /*self.inventoryDepartments=[]
   self.on('read_inventorydepartment', function() {
   console.log('i am in inventorydepartment api call from ajax')
   let req = {}
   $.ajax({
     url:'/inventory_department/read_inventorydepartment',
       contentType: "application/json",
       dataType:"json",
       headers: {"Authorization": getCookie('token')},
       success: function(data){
         console.log(data)
         if(data.status == 's'){
           self.inventoryDepartments = data.inventoryDepartments
           self.trigger('read_inventorydepartment_changed', data.inventoryDepartments)
         }else if(data.status == 'e'){
           showToast("Department Read Error. Please try again.", data)
         }
       },
       error: function(data){
         showToast("", data)
       }
     })
  })*/

  self.on('read_inventory_category', function () {
    console.log('i am in category api call from ajax');
    var req = {};
    $.ajax({
      url: '/inventory_category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryCategories = data.inventoryCategories;
          self.trigger('read_inventory_category_changed', data.inventoryCategories);
        } else if (data.status == 'e') {
          showToast("Roles Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_inventory_category', function (id) {
    $.ajax({
      url: '/inventory_category/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempInventoryCategory = self.inventoryCategories.filter(function (c) {
            return c.category_id != id;
          });
          self.inventoryCategories = tempInventoryCategory;
          toastr.info("Category Deleted Successfully");
          self.trigger('delete_inventory_category_changed', self.inventoryCategories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Category. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_category', function (department, category_name, id) {
    var req = {};
    req.department = department;
    req.category_name = category_name;
    req.id = id;
    $.ajax({
      url: '/inventory_category/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.inventoryCategories = self.inventoryCategories.map(function (cat) {
            if (cat.category_id == id) {
              cat.category_id = id;
              cat.category_name = category_name;
              cat.department = department;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Category Updated Successfully ");
          self.trigger('edit_inventory_category_changed', self.inventoryCategories);
        } else if (data.status == 'e') {
          showToast("Error updating Category. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_category', function (department, category_name) {
    var req = {};
    req.department = department;
    req.category_name = category_name;
    $.ajax({
      url: '/inventory_category/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add role after');
          var obj = {};
          obj.category_id = data.category_id;
          obj.category_name = category_name;
          obj.department = department;
          self.inventoryCategories = [obj].concat(self.inventoryCategories);
          toastr.success("Categeory Inserserted Successfully ");
          self.trigger('add_inventory_category_changed', self.inventoryCategories);
        } else if (data.status == 'e') {
          showToast("Error adding Categeory. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function InventoryDepartmentStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventoryDepartments = [];

  self.on('read_inventorydepartment', function () {
    console.log('i am in inventorydepartment api call from ajax');
    var req = {};
    $.ajax({
      url: '/inventory_department/read_inventorydepartment',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryDepartments = data.inventoryDepartments;
          self.trigger('read_inventorydepartment_changed', data.inventoryDepartments);
        } else if (data.status == 'e') {
          showToast("Department Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_inventorydepartment', function (id) {
    $.ajax({
      url: '/inventory_department/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempInventoryDepartment = self.inventoryDepartments.filter(function (c) {
            return c.department != id;
          });
          self.inventoryDepartments = tempInventoryDepartment;
          toastr.info("Department Deleted Successfully");
          self.trigger('delete_inventorydepartment_changed', self.inventoryDepartments);
        } else if (data.status == 'e') {
          showToast("Error Deleting Department. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventorydepartment', function (department, id) {
    var req = {};
    req.department = department;
    req.id = id;
    $.ajax({
      url: '/inventory_department/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.inventoryDepartments = self.inventoryDepartments.map(function (cat) {
            if (cat.department == id) {
              cat.department = department;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Department  Updated Successfully ");
          self.trigger('edit_inventorydepartment_changed', self.inventoryDepartments);
        } else if (data.status == 'e') {
          showToast("Error updating Department. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventorydepartment', function (department) {
    var req = {};
    req.department = department;
    $.ajax({
      url: '/inventory_department/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add department after');
          var obj = {};
          obj.department = department;
          // obj.name = name
          self.inventoryDepartments = [obj].concat(self.inventoryDepartments);
          toastr.success("Department Inserserted Successfully ");
          self.trigger('add_inventorydepartment_changed', self.inventoryDepartments);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function InventoryIssueStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventoryIssues = [];

  //read Inventory Isseu

  self.on('read_inventory_issue', function (id, type) {
    console.log("item_id");
    console.log(id);
    //console.log('i am in stock api call from ajax')
    var req = {};
    $.ajax({
      url: '/inventory_issue/' + id + '/' + type,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryIssues = data.inventoryIssues;
          self.trigger('read_inventory_issue_changed', data.inventoryIssues);
        } else if (data.status == 'e') {
          showToast("Item Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  //read available Item Quantity

  self.on('read_inventory_available_quantity', function (id) {
    console.log("item_id");
    console.log(id);
    if (id == '') {
      return;
    }
    var req = {};
    $.ajax({
      url: '/inventory_issue/read_qunatity/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.availableItems = data.availableItems;
          self.trigger('read_inventory_available_quantity_changed', data.availableItems);
        } else if (data.status == 'e') {
          showToast("Item Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_inventory_issue', function (id) {
    console.log("delet");
    console.log('i am in delete api call from ajax');
    $.ajax({
      url: '/inventory_issue/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempInventoryIssues = self.inventoryIssues.filter(function (c) {
            return c.issue_id != id;
          });
          self.inventoryIssues = tempInventoryIssues;
          toastr.info("Issue Deleted Successfully");
          self.trigger('delete_inventory_issue_changed', self.inventoryIssues);
        } else if (data.status == 'e') {
          showToast("Error Deleting Issue Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_issue', function (issue_date, category_id, sub_category_id, item_id, return_type, issue_type, issue_to, staff_id, available_quantity, issue_quantity, unit_id, purpose, rack_id, id) {
    var req = {};
    req.issue_date = issue_date, req.category_id = category_id, req.sub_category_id = sub_category_id, req.item_id = item_id, req.return_type = return_type, req.issue_type = issue_type, req.issue_to = issue_to, req.staff_id = staff_id, req.available_quantity = available_quantity, req.issue_quantity = issue_quantity, req.unit_id = unit_id, req.purpose = purpose, req.rack_id = rack_id, req.id = id;
    $.ajax({
      url: '/inventory_issue/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.inventoryIssues = self.inventoryIssues.map(function (cat) {
            if (cat.received_id == id) {
              cat.received_date = received_date;
              cat.category_id = category_id;
              cat.sub_category_id = sub_category_id;
              cat.item_id = item_id;
              cat.unit_id = unit_id;
              cat.received_date = received_date;
              cat.received_from = received_from;
              cat.rate = rate;
              cat.quantity = quantity;
              cat.rack_id = rack_id;
              cat.remark = remark;
              cat.received_id = id;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Stock Item Updated Successfully ");
          self.trigger('edit_inventory_issue_changed', self.inventoryIssues);
        } else if (data.status == 'e') {
          showToast("Error updating Stock Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_issue', function (issue_date, category_id, sub_category_id, item_id, return_type, issue_type, issue_to, staff_id, available_quantity, issue_quantity, unit_id, purpose, rack_id) {
    var req = {};
    req.issue_date = issue_date, req.category_id = category_id, req.sub_category_id = sub_category_id, req.item_id = item_id, req.return_type = return_type, req.issue_type = issue_type, req.issue_to = issue_to, req.staff_id = staff_id, req.available_quantity = available_quantity, req.issue_quantity = issue_quantity, req.unit_id = unit_id, req.purpose = purpose, req.rack_id = rack_id, $.ajax({
      url: '/inventory_issue/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Issue after');
          var obj = {};
          obj.issue_id = data.issue_id;
          obj.issue_date = issue_date, obj.category_id = category_id, obj.sub_category_id = sub_category_id, obj.item_id = item_id, obj.return_type = return_type, obj.issue_type = issue_type, obj.issue_to = issue_to, obj.staff_id = staff_id, obj.available_quantity = available_quantity, obj.issue_quantity = issue_quantity, obj.unit_id = unit_id, obj.purpose = purpose, obj.rack_id = rack_id,
          // obj.category_id = category_id
          self.inventoryIssues = [obj].concat(self.inventoryIssues);
          toastr.success("Issue Item Inserserted Successfully ");
          self.trigger('add_inventory_issue_changed', self.inventoryIssues);
        } else if (data.status == 'e') {
          showToast("Error adding Issue Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function InventoryItemStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventoryItems = [];

  //read Inventory Item

  self.on('read_inventory_item', function () {
    console.log('i am in Item api call from ajax');
    var req = {};
    $.ajax({
      url: '/inventory_item',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryItems = data.inventoryItems;
          self.trigger('read_inventory_item_changed', data.inventoryItems);
        } else if (data.status == 'e') {
          showToast("Item Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_inventory_item', function (id) {
    $.ajax({
      url: '/inventory_item/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempInventoryItems = self.inventoryItems.filter(function (c) {
            return c.item_id != id;
          });
          self.inventoryItems = tempInventoryItems;
          toastr.info("Item Deleted Successfully");
          self.trigger('delete_inventory_item_changed', self.inventoryItems);
        } else if (data.status == 'e') {
          showToast("Error Deleting Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_item', function (department, category_id, sub_category_id, item_name, id) {
    var req = {};
    req.department = department;
    req.category_id = category_id;
    req.sub_category_id = sub_category_id;
    req.item_name = item_name;
    req.id = id;
    $.ajax({
      url: '/inventory_item/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.inventoryItems = self.inventoryItems.map(function (cat) {
            if (cat.item_id == id) {
              cat.item_id = id;
              cat.category_id = category_id;
              cat.department = department;
              cat.sub_category_id = sub_category_id;
              cat.item_name = item_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Item Updated Successfully ");
          self.trigger('edit_inventory_item_changed', self.inventoryItems);
        } else if (data.status == 'e') {
          showToast("Error updating Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_item', function (department, category_id, sub_category_id, item_name) {
    var req = {};
    req.department = department;
    req.category_id = category_id;
    req.sub_category_id = sub_category_id;
    req.item_name = item_name;
    $.ajax({
      url: '/inventory_item/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Categeory after');
          var obj = {};
          obj.item_id = data.item_id;
          obj.sub_category_id = sub_category_id;
          obj.department = department;
          obj.category_id = category_id;
          obj.item_name = item_name;
          // obj.category_id = category_id
          self.inventoryItems = [obj].concat(self.inventoryItems);
          toastr.success("Item Inserserted Successfully ");
          self.trigger('add_inventory_item_changed', self.inventoryItems);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function InventoryRackStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventoryRacks = [];

  self.on('read_inventory_rack', function () {
    console.log('i am in Rack Master api call from ajax');
    var req = {};
    $.ajax({
      url: '/inventory_rack',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryRacks = data.inventoryRacks;
          self.trigger('inventoryRack_changed', data.inventoryRacks);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_inventory_rack', function (id) {
    $.ajax({
      url: '/inventory_rack/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempRacks = self.inventoryRacks.filter(function (c) {
            return c.rack_id != id;
          });
          self.inventoryRacks = tempRacks;
          toastr.info("Racks Deleted Successfully");
          self.trigger('inventoryRack_changed', self.inventoryRacks);
        } else if (data.status == 'e') {
          showToast("Error Deleting Rack. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_rack', function (rack_name, id) {
    var req = {};
    req.rack_name = rack_name;
    req.id = id;
    $.ajax({
      url: '/inventory_rack/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.inventoryRacks = self.inventoryRacks.map(function (cat) {
            if (cat.rack_id == id) {
              cat.rack_id = id;
              cat.rack_name = rack_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Rack Updated Successfully ");
          self.trigger('inventoryRack_changed', self.inventoryRacks);
        } else if (data.status == 'e') {
          showToast("Error updating Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_rack', function (rack_name) {
    var req = {};
    req.rack_name = rack_name;
    $.ajax({
      url: '/inventory_rack/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add rack after');
          var obj = {};
          obj.rack_id = data.rack_id;
          obj.rack_name = rack_name;
          self.inventoryRacks = [obj].concat(self.inventoryRacks);
          toastr.success("Rack Inserserted Successfully ");
          self.trigger('inventoryRack_changed', self.inventoryRacks);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function InventorySaleStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventorySales = [];

  //read Inventory Isseu

  self.on('read_inventory_sale', function (id) {
    // console.log(id)
    console.log('i am in sale api call from ajax');
    var req = {};
    $.ajax({
      url: '/inventory_sale/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.inventorySales = data.inventorySales;
          self.trigger('read_inventory_sale_changed', data.inventorySales);
        } else if (data.status == 'e') {
          showToast("Item Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  //read available Item Quantity

  /*self.on('read_inventory_available_quantity', function(id) {
     console.log(id)
     console.log('i am in reading quantity api call from ajax')
     let req = {}
     $.ajax({
       url:'/inventory_sale/read_available_qunatity/'+id,
         contentType: "application/json",
         dataType:"json",
         headers: {"Authorization": getCookie('token')},
         success: function(data){
           console.log(data)
           if(data.status == 's'){
             self.availableItems = data.availableItems
             self.trigger('read_inventory_available_quantity_changed', data.availableItems)
           }else if(data.status == 'e'){
             showToast("Item Read Error. Please try again.", data)
           }
         },
         error: function(data){
           showToast("", data)
         }
       })
   }) */

  self.on('delete_inventory_sale', function (id) {
    console.log("delet");
    console.log('i am in delete api call from ajax');
    $.ajax({
      url: '/inventory_sale/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempInventoryIssues = self.inventorySales.filter(function (c) {
            return c.sale_id != id;
          });
          self.inventorySales = tempInventoryIssues;
          toastr.info("Issue Deleted Successfully");
          self.trigger('delete_inventory_sale_changed', self.inventorySales);
        } else if (data.status == 'e') {
          showToast("Error Deleting Issue Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_sale', function (sale_date, category_id, sub_category_id, item_id, sale_to, available_quantity, sale_quantity, unit_id, rate, id) {
    var req = {};
    req.sale_date = sale_date, req.category_id = category_id, req.sub_category_id = sub_category_id, req.item_id = item_id, req.sale_to = sale_to, req.available_quantity = available_quantity, req.sale_quantity = sale_quantity, req.unit_id = unit_id, req.rate = rate, req.id = id;
    $.ajax({
      url: '/inventory_sale/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.inventorySales = self.inventorySales.map(function (cat) {
            if (cat.received_id == id) {
              cat.sale_date = sale_date, cat.category_id = category_id, cat.sub_category_id = sub_category_id, cat.item_id = item_id, cat.sale_to = sale_to, cat.available_quantity = available_quantity, cat.sale_quantity = sale_quantity, cat.unit_id = unit_id, cat.rate = rate, cat.sale_id = id;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Sale Item Updated Successfully ");
          self.trigger('edit_inventory_sale_changed', self.inventorySales);
        } else if (data.status == 'e') {
          showToast("Error updating Sale Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  self.on('add_inventory_sale', function (sale_date, category_id, sub_category_id, item_id, sale_to, available_quantity, sale_quantity, unit_id, rate) {
    var req = {};
    req.sale_date = sale_date, req.category_id = category_id, req.sub_category_id = sub_category_id, req.item_id = item_id, req.sale_to = sale_to, req.available_quantity = available_quantity, req.sale_quantity = sale_quantity, req.unit_id = unit_id, req.rate = rate, $.ajax({
      url: '/inventory_sale/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Issue after');
          var obj = {};
          obj.sale_id = data.sale_id;
          req.sale_date = sale_date, req.category_id = category_id, req.sub_category_id = sub_category_id, req.item_id = item_id, req.sale_to = sale_to, req.available_quantity = available_quantity, req.sale_quantity = sale_quantity, req.unit_id = unit_id, req.rate = rate,
          // obj.category_id = category_id
          self.inventorySales = [obj].concat(self.inventorySales);
          toastr.success("Sale Item Inserserted Successfully ");
          self.trigger('add_inventory_sale_changed', self.inventorySales);
        } else if (data.status == 'e') {
          showToast("Error adding Issue Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function InventoryStockStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventoryStocks = [];

  //read Inventory Item

  self.on('read_inventory_stock', function (id) {
    console.log(id);
    console.log('i am in stock api call from ajax');
    var req = {};
    $.ajax({
      url: '/inventory_stock/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryStocks = data.inventoryStocks;
          self.trigger('read_inventory_stock_changed', data.inventoryStocks);
        } else if (data.status == 'e') {
          showToast("Item Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_inventory_stock', function (id) {
    $.ajax({
      url: '/inventory_stock/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempInventoryStocks = self.inventoryStocks.filter(function (c) {
            return c.received_id != id;
          });
          self.inventoryStocks = tempInventoryStocks;
          toastr.info("Stock Deleted Successfully");
          self.trigger('delete_inventory_stock_changed', self.inventoryStocks);
        } else if (data.status == 'e') {
          showToast("Error Deleting IStock Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_stock', function (received_date, category_id, sub_category_id, item_id, rate, quantity, unit_id, received_from, rack_id, remark, id) {
    var req = {};
    req.received_date = received_date;
    req.category_id = category_id;
    req.sub_category_id = sub_category_id;
    req.item_id = item_id;
    req.unit_id = unit_id;
    req.received_date = received_date;
    req.received_from = received_from;
    req.rate = rate;
    req.quantity = quantity;
    req.rack_id = rack_id;
    req.remark = remark;
    req.id = id;
    $.ajax({
      url: '/inventory_stock/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.inventoryStocks = self.inventoryStocks.map(function (cat) {
            if (cat.received_id == id) {
              cat.received_date = received_date;
              cat.category_id = category_id;
              cat.sub_category_id = sub_category_id;
              cat.item_id = item_id;
              cat.unit_id = unit_id;
              cat.received_date = received_date;
              cat.received_from = received_from;
              cat.rate = rate;
              cat.quantity = quantity;
              cat.rack_id = rack_id;
              cat.remark = remark;
              cat.received_id = id;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Stock Item Updated Successfully ");
          self.trigger('edit_inventory_stock_changed', self.inventoryStocks);
        } else if (data.status == 'e') {
          showToast("Error updating Stock Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_stock', function (received_date, category_id, sub_category_id, item_id, rate, quantity, unit_id, received_from, rack_id, remark) {
    var req = {};
    req.received_date = received_date;
    req.category_id = category_id;
    req.sub_category_id = sub_category_id;
    req.item_id = item_id;
    req.unit_id = unit_id;
    req.received_date = received_date;
    req.received_from = received_from;
    req.rate = rate;
    req.quantity = quantity;
    req.remark = remark;
    req.rack_id = rack_id;
    $.ajax({
      url: '/inventory_stock/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Stock after');
          var obj = {};
          obj.received_from = data.received_from;
          obj.received_date = received_date;
          obj.category_id = category_id;
          obj.sub_category_id = sub_category_id;
          obj.item_id = item_id;
          obj.unit_id = unit_id;
          obj.received_date = received_date;
          obj.received_from = received_from;
          obj.rate = rate;
          obj.quantity = quantity;
          obj.remark = remark;
          obj.rack_id = rack_id;
          // obj.category_id = category_id
          self.inventoryStocks = [obj].concat(self.inventoryStocks);
          toastr.success("Stock Item Inserserted Successfully ");
          self.trigger('add_inventory_stock_changed', self.inventoryStocks);
        } else if (data.status == 'e') {
          showToast("Error adding Stock Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function InventorySubCategoryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventorySubcategories = [];

  self.on('read_inventory_subcategory', function () {
    console.log('i am in subcategory api call from ajax');
    var req = {};
    $.ajax({
      url: '/inventory_subcategory',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.inventorySubcategories = data.inventorySubcategories;
          self.trigger('read_inventory_subcategory_changed', data.inventorySubcategories);
        } else if (data.status == 'e') {
          showToast("Subcategory Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_inventory_subcategory', function (id) {
    $.ajax({
      url: '/inventory_subcategory/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempInventorySubcategory = self.inventorySubcategories.filter(function (c) {
            return c.sub_category_id != id;
          });
          self.inventorySubcategories = tempInventorySubcategory;
          toastr.info("Subcategory Deleted Successfully");
          self.trigger('delete_inventory_subcategory_changed', self.inventorySubcategories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Subcategory. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_subcategory', function (department, category_id, sub_category, id) {
    var req = {};
    req.department = department;
    req.category_id = category_id;
    req.sub_category = sub_category;
    req.id = id;
    $.ajax({
      url: '/inventory_subcategory/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.inventorySubcategories = self.inventorySubcategories.map(function (cat) {
            if (cat.sub_category_id == id) {
              cat.sub_category_id = id;
              cat.category_id = category_id;
              cat.department = department;
              cat.sub_category = sub_category;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Subcategory Updated Successfully ");
          self.trigger('edit_inventory_subcategory_changed', self.inventorySubcategories);
        } else if (data.status == 'e') {
          showToast("Error updating Subcategory. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_subcategory', function (department, category_id, sub_category) {
    var req = {};
    req.department = department;
    req.category_id = category_id;
    req.sub_category = sub_category;
    $.ajax({
      url: '/inventory_subcategory/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Categeory after');
          var obj = {};
          obj.sub_category_id = data.sub_category_id;
          obj.sub_category = sub_category;
          obj.department = department;
          obj.category_id = category_id;
          // obj.category_id = category_id
          self.inventorySubcategories = [obj].concat(self.inventorySubcategories);
          toastr.success("Subcategeory Inserserted Successfully ");
          self.trigger('add_inventory_subcategory_changed', self.inventorySubcategories);
        } else if (data.status == 'e') {
          showToast("Error adding Subcategeory. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function InventoryUnitStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventoryUnits = [];

  self.on('read_inventory_unit', function () {
    console.log('i am in Unit Master api call from ajax');
    var req = {};
    $.ajax({
      url: '/inventory_unit',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryUnits = data.inventoryUnits;
          self.trigger('inventoryUnit_changed', data.inventoryUnits);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_inventory_unit', function (id) {
    $.ajax({
      url: '/inventory_unit/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempUnits = self.inventoryUnits.filter(function (c) {
            return c.unit_id != id;
          });
          self.inventoryUnits = tempUnits;
          toastr.info("Units Deleted Successfully");
          self.trigger('inventoryUnit_changed', self.inventoryUnits);
        } else if (data.status == 'e') {
          showToast("Error Deleting Unit. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_unit', function (unit, id) {
    var req = {};
    req.unit = unit;
    req.id = id;
    $.ajax({
      url: '/inventory_unit/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.inventoryUnits = self.inventoryUnits.map(function (cat) {
            if (cat.unit_id == id) {
              cat.unit_id = id;
              cat.unit = unit;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Unit Updated Successfully ");
          self.trigger('inventoryUnit_changed', self.inventoryUnits);
        } else if (data.status == 'e') {
          showToast("Error updating Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_unit', function (unit) {
    var req = {};
    req.unit = unit;
    $.ajax({
      url: '/inventory_unit/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add unit after');
          var obj = {};
          obj.unit_id = data.unit_id;
          obj.unit = unit;
          self.inventoryUnits = [obj].concat(self.inventoryUnits);
          toastr.success("Unit Inserserted Successfully ");
          self.trigger('inventoryUnit_changed', self.inventoryUnits);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function ItemStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.items = [];

  self.on('read_items', function () {
    console.log('i am in read_courses api call from ajax');
    var req = {};
    $.ajax({
      url: '/item',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.items = data.items;
          self.trigger('items_changed', data.items);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_item', function (item_id) {
    $.ajax({
      url: '/item/delete/' + item_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempItems = self.items.filter(function (c) {
            return c.item_id != item_id;
          });
          self.items = tempItems;
          toastr.info("Item Deleted Successfully");
          self.trigger('items_changed', self.items);
        } else if (data.status == 'e') {
          showToast("Error Deleting Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_item', function (item_name, item_id) {
    var req = {};
    req.item_name = item_name;
    req.item_id = item_id;
    $.ajax({
      url: '/item/edit/' + item_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.items = self.items.map(function (cat) {
            if (cat.item_id == item_id) {
              cat.item_id = item_id;
              cat.item_name = item_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Item Updated Successfully ");
          self.trigger('items_changed', self.items);
        } else if (data.status == 'e') {
          showToast("Error updating Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_item', function (item_name) {
    var req = {};
    req.item_name = item_name;
    $.ajax({
      url: '/item/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add item after');
          var obj = {};
          obj.id = data.id;
          obj.item_name = item_name;
          self.items = [obj].concat(self.items);
          toastr.success("Item Inserserted Successfully ");
          self.trigger('items_changed', self.items);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function LevelStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.levels = [];

  self.on('read_level', function () {
    console.log('i am in read_level api call from ajax');
    var req = {};
    $.ajax({
      url: '/level',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.levels = data.levels;
          self.trigger('level_changed', data.levels);
        } else if (data.status == 'e') {
          showToast("level Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_level', function (id) {
    $.ajax({
      url: '/level/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempLevel = self.levels.filter(function (c) {
            return c.level_id != id;
          });
          self.levels = tempLevel;
          self.trigger('level_changed', self.levels);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_level', function (level, id) {
    var req = {};
    req.level = level;
    req.id = id;
    $.ajax({
      url: '/level/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.levels = self.levels.map(function (cat) {
            if (cat.level_id == id) {
              cat.level_id = id;
              cat.level = level;
            }
            // cat.confirmEdit = false
            return cat;
          });
          self.trigger('level_changed', self.levels);
        } else if (data.status == 'e') {
          showToast("Error updating Course. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_level', function (level) {
    var req = {};
    req.level = level;
    $.ajax({
      url: '/level/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add level after');
          var obj = {};
          obj.level_id = data.level_id;
          obj.level = level;
          self.levels = [obj].concat(self.levels);
          self.trigger('level_changed', self.levels);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function LoginStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_roles', function () {
    console.log('i am in read_roles api call from ajax');
    var req = {};
    $.ajax({
      url: '/login/roles',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.roles = data.roles;
          self.trigger('roles_for_login_changed', data.roles);
        } else if (data.status == 'e') {
          showToast("Roles Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('check_login', function (Username, password, role) {
    var req = {};
    req.username = Username;
    req.password = password;
    req.role = role;
    console.log(req);
    $.ajax({
      url: '/login/login',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      success: function success(data) {
        console.log(data);
        console.log(document.cookie);
        console.log(getCookie('token'));
        if (data.status == 's') {
          console.log('login after');
          self.trigger('login_changed');
          self.trigger('login_changed_main_nav', data.result);
          self.trigger('login_changed_footer', data.result);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('logout', function () {
    $.ajax({
      url: '/login/logout',
      contentType: "application/json",
      dataType: "json",
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('logout');
          self.trigger('logOut_changed');
        } else if (data.status == 'e') {
          showToast("Error in Logout.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function MarksEntryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.marksEntry = [];

  self.on('read_classes', function () {
    var req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    var req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_exam_types', function (standard_id) {
    $.ajax({
      url: '/marks-entry/exam-type/' + standard_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('exam_types_changed', data.examTypes);
        } else if (data.status == 'e') {
          showToast("Exam Type Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_subjects', function (standard_id, section_id) {
    $.ajax({
      url: '/marks-entry/subjects/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('subjects_changed', data.subjects);
        } else if (data.status == 'e') {
          showToast("Subjects Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_marks_limit', function (section_id, subject_id, exam_type_id) {
    $.ajax({
      url: '/marks-entry/marks-limit/' + section_id + '/' + subject_id + '/' + exam_type_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('marks_limit_changed', data.marksLimit);
        } else if (data.status == 'e') {
          showToast("Marks Limit Read Error. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_marks_entries', function (exam_type_id, section_id, subject_id, marking_type) {
    $.ajax({
      url: '/marks-entry/marks-entries/' + exam_type_id + '/' + section_id + '/' + subject_id + '/' + marking_type,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('marks_entries_changed', data.marksEntries, data.students);
        } else if (data.status == 'e') {
          showToast("Marks Entries Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_marks_entries', function (obj) {
    $.ajax({
      url: '/marks-entry/add',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          // toastr.success("Marks Entries Successfull")
          self.trigger('add_marks_entries_changed');
        } else if (data.status == 'e') {
          showToast("Error adding Marks Entries. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('update_marks_entries', function (obj, id) {
    $.ajax({
      url: '/marks-entry/edit/' + id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          toastr.success("Marks Entries Updated Successfully ");
          self.trigger('add_marks_entries_changed'); // same trigger, as Add Exam Scheme
        } else if (data.status == 'e') {
          showToast("Error updating Marks Entries. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_marks_entries', function (id) {
    $.ajax({
      url: '/marks-entry/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          toastr.info("Marks Entry Deleted Successfully");
          self.trigger('delete_marks_entries_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Marks Entry. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function MarksManagerStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.marksSettings = [];

  self.on('read_classes', function () {
    var req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    var req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_exam_types', function (standard_id) {
    $.ajax({
      url: '/marks-manager/exam-type/' + standard_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('exam_types_changed', data.examTypes);
        } else if (data.status == 'e') {
          showToast("Exam Type Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_subjects', function (standard_id, section_id) {
    $.ajax({
      url: '/marks-manager/subjects/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('subjects_changed', data.subjects);
        } else if (data.status == 'e') {
          showToast("Subjects Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_marks_settings', function (section_id, exam_type_id) {
    $.ajax({
      url: '/marks-manager/marks-settings/' + section_id + '/' + exam_type_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.marksSettings = data.marksSettings;
          self.trigger('marks_settings_changed', data.marksSettings);
        } else if (data.status == 'e') {
          showToast("Marks Settings Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_marks_settings', function (obj) {
    $.ajax({
      url: '/marks-manager/add',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Marks Settings Created Successfully ");
          self.trigger('add_marks_settings_changed');
        } else if (data.status == 'e') {
          showToast("Error adding Marks Settings. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('update_grade_settings', function (obj, marks_id) {
    $.ajax({
      url: '/marks-manager/edit/' + marks_id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          toastr.success("Marks Settings Updated Successfully ");
          self.trigger('add_marks_settings_changed'); // same trigger, as Add Exam Scheme
        } else if (data.status == 'e') {
          showToast("Error updating Marks Settings. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_marks_settings', function (marks_id) {
    $.ajax({
      url: '/marks-manager/delete/' + marks_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempExamScheme = self.marksSettings.filter(function (c) {
            return c.marks_id != marks_id;
          });
          self.marksSettings = tempExamScheme;
          toastr.info("Marks Manager Deleted Successfully");
          self.trigger('delete_marks_settings_changed', self.marksSettings);
        } else if (data.status == 'e') {
          showToast("Error Deleting Marks Manager. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function MarksReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.marksEntry = [];

  self.on('read_classes', function () {
    var req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    var req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_exam_types', function (standard_id) {
    $.ajax({
      url: '/marks-report/exam-type/' + standard_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('exam_types_changed', data.examTypes);
        } else if (data.status == 'e') {
          showToast("Exam Type Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_consolidate_tabulation_sheet', function (exam_type_id, section_id) {
    $.ajax({
      url: '/marks-report/marks-entries/' + exam_type_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_consolidate_tabulation_sheet_changed', data.reports);
        } else if (data.status == 'e') {
          showToast("Marks Entries Read Error. Please try again.", data.message);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function MaturityDevelopmentStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.maturityDevelopments = [];

  self.on('read_classes', function () {
    var req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    var req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_maturity_development_students', function (section_id, exam_term) {
    $.ajax({
      url: '/maturity-development/students/' + section_id + '/' + exam_term,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.maturityDevelopments = data.maturityDevelopments;
          self.trigger('maturity_development_students_changed', data.maturityDevelopments);
        } else if (data.status == 'e') {
          showToast("Maturity Development Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_maturity_development_details', function (student_id, exam_term) {
    $.ajax({
      url: '/maturity-development/details/' + student_id + '/' + exam_term,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_maturity_development_details_changed', data.details);
        } else if (data.status == 'e') {
          showToast("Maturity Development Details Read Error. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_maturity_developments', function (obj) {
    $.ajax({
      url: '/maturity-development/add',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Maturity Development Created Successfully ");
          self.trigger('add_maturity_developments_changed');
        } else if (data.status == 'e') {
          showToast("Error adding Maturity Development. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_maturity_development_update', function (student_id, exam_term) {
    $.ajax({
      url: '/maturity-development/read-for-update/' + student_id + '/' + exam_term,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('maturity_development_student_update_changed', data.details);
        } else if (data.status == 'e') {
          showToast("Maturity Development Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('update_maturity_developments', function (obj, id) {
    $.ajax({
      url: '/maturity-development/edit/' + id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          toastr.success("Maturity Development Updated Successfully ");
          self.trigger('add_maturity_developments_changed'); // same trigger, as Add Exam Scheme
        } else if (data.status == 'e') {
          showToast("Error updating Maturity Development. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_maturity_developments', function (student_id, exam_term) {
    $.ajax({
      url: '/maturity-development/delete/' + student_id + '/' + exam_term,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          toastr.info("Marks Manager Deleted Successfully");
          self.trigger('delete_maturity_developments_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Marks Manager. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function MentorCaseStore() {
  riot.observable(this); // Riot provides our Case emitter.
  var self = this;

  self.mentor_case = [];

  self.on('read_categories', function () {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    $.ajax({
      url: '/mentor_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_case', function () {
    console.log('i am in add_case api call from ajax');
    var req = {};
    $.ajax({
      url: '/mentor_case/read_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.mentor_case = data.mentor_case;
          self.trigger('read_case_changed', data.mentor_case);
        } else if (data.status == 'e') {
          showToast("Error Reading Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_case', function (case_id) {
    $.ajax({
      url: '/mentor_case/delete/' + case_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempCase = self.mentor_case.filter(function (c) {
            return c.case_id != case_id;
          });
          self.mentor_case = tempCase;
          toastr.info("Case Deleted Successfully");
          self.trigger('delete_case_changed', self.mentor_case);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_case', function (case_name, category_id, case_id) {
    var req = {};
    req.case_name = case_name;
    req.category_id = category_id;
    req.case_id = case_id;
    $.ajax({
      url: '/mentor_case/edit/' + case_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.mentor_case = self.mentor_case.map(function (cat) {
            if (cat.case_id == case_id) {
              cat.case_id = case_id;
              cat.case_name = case_name;
              cat.category_id = category_id;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Case Updated Successfully ");
          self.trigger('edit_case_changed', self.mentor_case);
        } else if (data.status == 'e') {
          showToast("Error updating Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_case', function (case_name, category_id) {
    var req = {};
    req.case_name = case_name;
    req.category_id = category_id;
    $.ajax({
      url: '/mentor_case/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          var obj = {};
          obj.case_id = data.case_id;
          obj.case_name = case_name;
          obj.category_id = category_id;
          self.mentor_case = [obj].concat(self.mentor_case);
          toastr.success("Case Inserserted Successfully ");
          self.trigger('add_case_changed', self.mentor_case);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function MentorCategoryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.mentor_categories = [];

  self.on('read_mentor_category', function () {
    console.log('i am in read_courses api call from ajax');
    var req = {};
    $.ajax({
      url: '/mentor_category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.mentor_categories = data.mentor_categories;
          self.trigger('mentor_category_changed', data.mentor_categories);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_mentor_category', function (category_id) {
    $.ajax({
      url: '/mentor_category/delete/' + category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempMentorCategories = self.mentor_categories.filter(function (c) {
            return c.category_id != category_id;
          });
          self.mentor_categories = tempMentorCategories;
          toastr.info("Category Deleted Successfully");
          self.trigger('mentor_category_changed', self.mentor_categories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_mentor_category', function (category_name, category_id) {
    var req = {};
    req.category_name = category_name;
    req.category_id = category_id;
    $.ajax({
      url: '/mentor_category/edit/' + category_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.mentor_categories = self.mentor_categories.map(function (cat) {
            if (cat.category_id == category_id) {
              cat.category_id = category_id;
              cat.category_name = category_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Category Updated Successfully ");
          self.trigger('mentor_category_changed', self.mentor_categories);
        } else if (data.status == 'e') {
          showToast("Error updating Item. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_mentor_category', function (category_name) {
    var req = {};
    req.category_name = category_name;
    $.ajax({
      url: '/mentor_category/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add item after');
          var obj = {};
          obj.category_id = data.category_id;
          obj.category_name = category_name;
          self.mentor_categories = [obj].concat(self.mentor_categories);
          toastr.success("Category Inserserted Successfully ");
          self.trigger('mentor_category_changed', self.mentor_categories);
        } else if (data.status == 'e') {
          showToast("Error adding Category. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function MentorDetailStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.mentors = [];

  self.on('read_mentor_categories', function () {
    var req = {};
    $.ajax({
      url: '/mentor_detail',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_mentor_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  self.on('read_case', function () {
    var req = {};

    $.ajax({
      url: '/mentor_detail/read_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.mentor_case = data.mentor_case;
          self.trigger('read_case_changed', data.mentor_case);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_mentor', function (read_category_id) {
    console.log(read_category_id);
    var req = {};
    req.read_category_id = read_category_id;
    $.ajax({
      url: '/mentor_detail/read_mentor/' + read_category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.mentors = data.mentors;
          self.trigger('read_mentor_changed', data.mentors);
        } else if (data.status == 'e') {
          showToast("Mentor Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_for_edit_mentor', function (id) {
    console.log(id);
    var req = {};
    req.id = id;
    $.ajax({
      url: '/mentor_detail/read_for_edit_mentor/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.mentor_details = data.mentor_details;
          self.trigger('read_for_edit_mentor_changed', data.mentor_details);
        } else if (data.status == 'e') {
          showToast("Mentor Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  self.on('read_mentor_case', function (id, enroll_number) {
    console.log(id);
    console.log(enroll_number);
    var req = {};
    req.id = id;
    req.enroll_number = enroll_number;
    $.ajax({
      url: '/mentor_detail/read_mentor_case/' + id + '/' + enroll_number,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.mentor_case_details = data.mentor_case_details;
          self.trigger('read_mentor_case_changed', data.mentor_case_details);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_for_edit_case', function (id) {
    console.log(id);
    var req = {};
    req.id = id;
    $.ajax({
      url: '/mentor_detail/read_for_edit_case/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.update_case_details_for_update = data.update_case_details_for_update;
          self.trigger('read_for_edit_case_changed', data.update_case_details_for_update);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_mentor_detail', function (obj) {
    console.log(obj);
    $.ajax({
      url: '/mentor_detail/add',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add activity after');
          toastr.success("Successfully Inserted");
          self.trigger('add_mentor_detail_changed', self.mentors);
        } else if (data.status == 'e') {
          showToast("Error adding Mentor. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_case_detail', function (obj) {
    console.log(obj);
    $.ajax({
      url: '/mentor_detail/add_case_detail',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Case after');
          toastr.success("Successfully Inserted");
          self.trigger('add_case_detail_changed', self.case_details);
        } else if (data.status == 'e') {
          showToast("Error adding Mentor. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_mentor_detail', function (obj, id) {
    var req = {};
    console.log(obj);
    //req.id=edit_id
    $.ajax({
      url: '/mentor_detail/edit/' + id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.mentors = self.mentors.map(function (cat) {
            if (cat.id == id) {
              cat.id = id;
              cat.referred_by = obj.referred_by;
              cat.enroll_number = obj.enroll_number;
              cat.category_id = obj.category_id;
              /*self.mentors.map(i=>{
              if(item.case_id==i.case_id){
                  var case_name = e.item
                }
              })*/
              cat.case_id = obj.case_id;
              cat.consult_date = obj.consult_date;
              cat.time_in = obj.time_in;
              cat.time_out = obj.time_out;
              cat.diagnosis = obj.diagnosis;
              cat.suggestion = obj.suggestion;
            }
            return cat;
          });
          toastr.success("Successfully Update");
          self.trigger('edit_mentor_detail_changed', self.mentors);
        } else if (data.status == 'e') {
          showToast("Error adding Mentor. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_case_detail', function (obj, edit_case_id) {
    var req = {};
    console.log(obj);
    //req.id=edit_id
    $.ajax({
      url: '/mentor_detail/edit_case_detail/' + edit_case_id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          /*self.edit_case_details = self.edit_case_details.map(cat => {
            if(cat.id == id){
                cat.id = id
                cat.visitor=obj.visitor
                cat.visit_date=obj.v_date
                cat.time_in=obj.time_in
                cat.time_out=obj.time_out
                cat.status=obj.status
                cat.suggestion=obj.suggestion
            }
            return cat
          })*/
          toastr.success("Successfully Update");
          self.trigger('edit_case_detail_changed', self.edit_case_details);
        } else if (data.status == 'e') {
          showToast("Error Updating Case Details. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_case_details', function (id) {
    $.ajax({
      url: '/mentor_detail/delete_case_details/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          /*let tempcaseDetails = self.delete_case_details.filter(c => {
            return c.id != id
          })
          self.delete_case_details = tempcaseDetails*/
          toastr.success("Successfully Deleted");
          self.trigger('delete_case_details_changed', self.delete_case_details);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case Details. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_mentor_detail', function (id) {
    $.ajax({
      url: '/mentor_detail/delete_mentor_detail/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          /*let tempcaseDetails = self.delete_case_details.filter(c => {
            return c.id != id
          })
          self.delete_case_details = tempcaseDetails*/
          toastr.success("Successfully Deleted");
          self.trigger('delete_mentor_detail_changed', self.delete_mentor_detail);
        } else if (data.status == 'e') {
          showToast("Error Deleting Mentor Details. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function MentorReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  /*self.case_wise_reports = []*/

  self.on('read_case_wise_report', function (obj) {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/mentor_report/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.case_wise_reports = data.case_wise_reports;
          self.trigger('read_case_wise_report_changed', data.case_wise_reports, data.grand_total);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_date_wise_case_report', function (obj, category_id) {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    req.category_id = category_id;
    $.ajax({
      url: '/mentor_report/read_date_wise_case_report/' + obj.start_date + '/' + obj.end_date + '/' + category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.date_wise_case_report = data.date_wise_case_report;
          self.trigger('read_date_wise_case_report_changed', data.date_wise_case_report);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_standard', function () {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    $.ajax({
      url: '/mentor_report/read_standard/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    $.ajax({
      url: '/mentor_report/read_section/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_session', function () {
    console.log('i am in read_session api call from ajax');
    var req = {};
    $.ajax({
      url: '/mentor_report/read_session/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.sessions = data.sessions;
          self.trigger('read_session_changed', data.sessions);
        } else if (data.status == 'e') {
          showToast("Session Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_class_wise_report', function (standard_id, section_id, session_id) {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    req.session_id = session_id;
    $.ajax({
      url: '/mentor_report/read_class_wise_report/' + standard_id + '/' + section_id + '/' + session_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.class_wise_case_report = data.class_wise_case_report;
          self.trigger('read_class_wise_report_changed', data.class_wise_case_report, data.grand_total);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function NewEventStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.newEvents = [];

  self.on('read_event_type', function () {
    console.log('i am in read_sections api call from ajax');
    var req = {};
    $.ajax({
      url: '/new_event/readEventType',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.eventTypes = data.eventTypes;
          self.trigger('read_event_type_changed', data.eventTypes);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_new_event', function () {
    console.log('i am in read_new_event api call from ajax');
    var req = {};
    $.ajax({
      url: '/new_event/read_new_event',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log("inside read");
          self.newEvents = data.newEvents;
          self.trigger('read_new_event_changed', data.newEvents);
        } else if (data.status == 'e') {
          showToast("Event Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_new_event', function (id) {
    $.ajax({
      url: '/new_event/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempNewEvents = self.newEvents.filter(function (c) {
            return c.event_id != id;
          });
          self.newEvents = tempNewEvents;
          toastr.info("Event Deleted Successfully");
          self.trigger('delete_new_event_changed', self.newEvents);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_new_event', function (event_type_id, event_name, start_date, end_date, detail, holiday, id) {
    var req = {};
    req.event_type_id = event_type_id, req.event_name = event_name, req.start_date = start_date, req.end_date = end_date, req.detail = detail, req.holiday = holiday, req.id = id;
    $.ajax({
      url: '/new_event/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.newEvents = self.newEvents.map(function (cat) {
            if (cat.event_id == id) {
              cat.event_id = data.event_id;
              cat.event_name = event_name;
              cat.event_type_id = event_type_id;
              cat.start_date = start_date;
              cat.end_date = end_date;
              cat.detail = detail;
              //cat.standard_id=standard_id
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("SeEvent Updated Successfully ");
          self.trigger('edit_new_event_changed', self.newEvents);
        } else if (data.status == 'e') {
          showToast("Error updating events. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_new_event', function (event_type_id, event_name, start_date, end_date, detail, holiday) {
    var req = {};
    req.event_type_id = event_type_id, req.event_name = event_name, req.start_date = start_date, req.end_date = end_date, req.detail = detail, req.holiday = holiday, $.ajax({
      url: '/new_event/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add event after');
          var obj = {};
          obj.event_id = data.event_id;
          obj.event_name = event_name;
          obj.event_type_id = event_type_id;
          obj.start_date = start_date;
          obj.end_date = end_date;
          obj.detail = detail;
          // obj.name = name
          self.newEvents = [obj].concat(self.newEvents);
          toastr.success("event Inserserted Successfully ");
          self.trigger('add_new_event_changed', self.newEvents);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function ParentGroupStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.parentGroups = [];

  self.on('read_parentgroup', function () {
    console.log('i am in parent Group api call from ajax');
    var req = {};
    $.ajax({
      url: '/parent_group/read_parentgroup',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.parentGroups = data.parentGroups;
          self.trigger('read_parentgroup_changed', data.parentGroups);
        } else if (data.status == 'e') {
          showToast("Club Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_parentgroup', function (id) {
    $.ajax({
      url: '/parent_group/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempParentGroups = self.parentGroups.filter(function (c) {
            return c.pgroup_id != id;
          });
          self.parentGroups = tempParentGroups;
          toastr.info("Club Deleted Successfully");
          self.trigger('delete_parentgroup_changed', self.parentGroups);
        } else if (data.status == 'e') {
          showToast("Error Deleting Club. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_parentgroup', function (pgroup_name, pgroup_detail, pgroup_id) {
    var req = {};
    req.pgroup_name = pgroup_name;
    req.pgroup_detail = pgroup_detail;
    req.id = pgroup_id;
    $.ajax({
      url: '/parent_group/edit/' + pgroup_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.parentGroups = self.parentGroups.map(function (cat) {
            if (cat.pgroup_id == pgroup_id) {
              cat.pgroup_id = pgroup_id;
              cat.pgroup_name = pgroup_name;
              cat.pgroup_detail = pgroup_detail;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Prent Group Updated Successfully ");
          self.trigger('edit_parentgroup_changed', self.parentGroups);
        } else if (data.status == 'e') {
          showToast("Error updating parentGroups. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_parentgroup', function (pgroup_name, pgroup_detail) {
    var req = {};
    req.pgroup_name = pgroup_name;
    req.pgroup_detail = pgroup_detail;
    $.ajax({
      url: '/parent_group/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Club role after');
          var obj = {};
          obj.pgroup_id = data.id;
          obj.pgroup_name = pgroup_name;
          obj.pgroup_detail = pgroup_detail;
          // obj.name = name
          self.parentGroups = [obj].concat(self.parentGroups);
          toastr.success("parent group Inserserted Successfully ");
          self.trigger('add_parentgroup_changed', self.parentGroups);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function PhysicalFitnessStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.physicalFitness = [];

  self.on('read_classes', function () {
    var req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    var req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_physical_fitness_students', function (section_id, exam_term) {
    $.ajax({
      url: '/physical-fitness/students/' + section_id + '/' + exam_term,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.physicalFitness = data.physicalFitness;
          self.trigger('physical_fitness_students_changed', data.physicalFitness);
        } else if (data.status == 'e') {
          showToast("Physical Fitness Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_physical_fitness_details', function (student_id, exam_term) {
    $.ajax({
      url: '/physical-fitness/details/' + student_id + '/' + exam_term,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_physical_fitness_details_changed', data.details);
        } else if (data.status == 'e') {
          showToast("Physical Fitness Details Read Error. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_physical_fitness_all_details', function (section_id, exam_term) {
    $.ajax({
      url: '/physical-fitness/details-all/' + section_id + '/' + exam_term,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_physical_fitness_details_changed', data.details);
        } else if (data.status == 'e') {
          showToast("Physical Fitness Details Read Error. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_physical_fitness', function (obj) {
    $.ajax({
      url: '/physical-fitness/add',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Physical Fitness Created Successfully ");
          self.trigger('add_physical_fitness_changed');
        } else if (data.status == 'e') {
          showToast("Error adding Physical Fitness. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_physical_fitness', function (student_id, exam_term) {
    $.ajax({
      url: '/physical-fitness/delete/' + student_id + '/' + exam_term,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          toastr.info("Physiacl Fitness Deleted Successfully");
          self.trigger('delete_physical_fitness_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Physiacl Fitness. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function ReligionStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.religions = [];

  self.on('read_religion', function () {
    console.log('i am in read_religion api call from ajax');
    var req = {};
    $.ajax({
      url: '/religion',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.religions = data.religions;
          self.trigger('religion_changed', data.religions);
        } else if (data.status == 'e') {
          showToast("religion Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_religion', function (id) {
    $.ajax({
      url: '/religion/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempReligion = self.religions.filter(function (c) {
            return c.religion_id != id;
          });
          self.religions = tempReligion;
          self.trigger('religion_changed', self.religions);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_religion', function (religion, id) {
    var req = {};
    req.religion = religion;
    req.id = id;
    $.ajax({
      url: '/religion/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.religions = self.religions.map(function (cat) {
            if (cat.religion == id) {
              cat.religion = religion;
              cat.religion_id = id;
            }
            // cat.confirmEdit = false
            return cat;
          });
          self.trigger('religion_changed', self.religions);
        } else if (data.status == 'e') {
          showToast("Error updating Course. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_religion', function (religion) {
    var req = {};
    req.religion = religion;
    $.ajax({
      url: '/religion/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add religion after');
          var obj = {};
          obj.religion_id = data.religion_id;
          obj.religion = religion;
          self.religions = [obj].concat(self.religions);
          self.trigger('religion_changed', self.religions);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function RemarkStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.remarks = [];

  self.on('read_remark', function () {
    console.log('i am in remark api call from ajax');
    var req = {};
    $.ajax({
      url: '/remark/read_remark',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.remarks = data.remarks;
          self.trigger('read_remark_changed', data.remarks);
        } else if (data.status == 'e') {
          showToast("Club Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_remark', function (id) {
    $.ajax({
      url: '/remark/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempRemarks = self.remarks.filter(function (c) {
            return c.remark_id != id;
          });
          self.remarks = tempRemarks;
          toastr.info("Remark Deleted Successfully");
          self.trigger('delete_remark_changed', self.remarks);
        } else if (data.status == 'e') {
          showToast("Error Deleting Remark. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_remark', function (remark, short_remark, remark_id) {
    var req = {};
    req.remark = remark;
    req.short_remark = short_remark;
    req.id = remark_id;
    $.ajax({
      url: '/remark/edit/' + remark_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.remarks = self.remarks.map(function (cat) {
            if (cat.remark_id == remark_id) {
              cat.remark_id = remark_id;
              cat.remark = remark;
              cat.short_remark = short_remark;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Reamrk  Updated Successfully ");
          self.trigger('edit_remark_changed', self.remarks);
        } else if (data.status == 'e') {
          showToast("Error updating remarks. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_remark', function (remark, short_remark) {
    var req = {};
    req.remark = remark;
    req.short_remark = short_remark;
    $.ajax({
      url: '/remark/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Remark after');
          var obj = {};
          obj.remark_id = data.id;
          obj.remark = remark;
          obj.short_remark = short_remark;
          // obj.name = name
          self.remarks = [obj].concat(self.remarks);
          toastr.success("Remark Inserserted Successfully ");
          self.trigger('add_remark_changed', self.remarks);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function ResultActivationStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.maturityDevelopments = [];

  self.on('read_result_activation', function () {
    var req = {};
    $.ajax({
      url: '/result-activation',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_result_activation_changed', data.classes);
        } else if (data.status == 'e') {
          showToast("result activation read error. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('result_activation_update', function (obj) {
    $.ajax({
      url: '/result-activation/update',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Update Successfull");
          self.trigger('result_activation_update_changed');
        } else if (data.status == 'e') {
          showToast("Error updating result activation. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function RoleStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.roles = [];

  self.on('read_roles', function () {
    console.log('i am in read_roles api call from ajax');
    var req = {};
    $.ajax({
      url: '/roles',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.roles = data.roles;
          self.trigger('roles_changed', data.roles);
        } else if (data.status == 'e') {
          showToast("Roles Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_role', function (id) {
    $.ajax({
      url: '/roles/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var temproles = self.roles.filter(function (c) {
            return c.id != id;
          });
          self.roles = temproles;
          toastr.info("Roles Deleted Successfully");
          self.trigger('roles_changed', self.roles);
        } else if (data.status == 'e') {
          showToast("Error Deleting Course. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_role', function (role, id) {
    var req = {};
    req.role = role;
    req.id = id;
    $.ajax({
      url: '/roles/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.roles = self.roles.map(function (cat) {
            if (cat.id == id) {
              cat.id = id;
              cat.role = role;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Roles Updated Successfully ");
          self.trigger('roles_changed', self.roles);
        } else if (data.status == 'e') {
          showToast("Error updating Role. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_role', function (role) {
    var req = {};
    req.role = role;
    $.ajax({
      url: '/roles/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add role after');
          var obj = {};
          obj.id = data.id;
          obj.role = role;
          self.roles = [obj].concat(self.roles);
          toastr.success("Roles Inserserted Successfully ");
          self.trigger('roles_changed', self.roles);
        } else if (data.status == 'e') {
          showToast("Error adding Role. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function ScholarshipStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.banks = [];

  self.on('read_scholar_student', function () {
    console.log('i am in scholar students api call from ajax');
    var req = {};
    $.ajax({
      url: '/scholarship',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_scholar_student_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Scholar Students Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  //=====read student ====
  self.on('read_student', function (enrol) {
    console.log('i am in read Student for scholar api call from ajax');
    var req = {};
    $.ajax({
      url: '/scholarship/read_student/' + enrol,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.scholarStudent = data.student;
          self.trigger('read_student_changed', data.student);
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  //========== read feeslip students ===
  self.on('read_scholarship_slip', function (student_id) {
    console.log('i am in read scholar fee slip api call from ajax');
    var req = {};
    $.ajax({
      url: '/scholarship/read_fee_slip/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.scholarSlips = data.scholarSlips;
          self.trigger('read_scholar_feeslip_changed', data.scholarSlips);
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_scholarship_amount', function (obj) {
    console.log("inside add");
    console.log(obj);
    $.ajax({
      url: '/scholarship/add',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('scholarship after');

          toastr.success("Scholarship  Inserserted Successfully, wish to insert more");
          self.trigger('add_scholarship_head_changed');
        } else if (data.status == 'e') {
          showToast("Error in Mapping Heads. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('bank_edit', function (bank_account_no, bank_name, branch, bank_ac_no) {
    var req = {};
    req.bank_account_no = bank_account_no;
    req.bank_name = bank_name;
    req.branch = branch;
    req.bank_ac_no = bank_ac_no;
    $.ajax({
      url: '/bank/edit/' + bank_ac_no,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.banks = self.banks.map(function (cat) {
            if (cat.bank_account_no == bank_ac_no) {
              cat.bank_ac_no = bank_ac_no;
              cat.bank_account_no = bank_account_no;
              cat.bank_name = bank_name;
              cat.branch = branch;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Session Updated Successfully ");
          self.trigger('bank_edit_changed', self.banks);
        } else if (data.status == 'e') {
          showToast("Error updating Event. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete', function (bank_account_no) {
    $.ajax({
      url: '/bank/delete/' + bank_account_no,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempSession = self.banks.filter(function (c) {
            return c.bank_account_no != bank_account_no;
          });
          self.banks = tempSession;
          toastr.info("Session Deleted Successfully");
          self.trigger('delete_event_changed', self.banks);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function SectionStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.sections = [];

  self.on('read_standard', function () {
    console.log('i am in read_sections api call from ajax');
    var req = {};
    $.ajax({
      url: '/section/readStandard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    console.log('i am in read_section api call from ajax');
    var req = {};
    $.ajax({
      url: '/section/read_section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Section Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_section', function (id) {
    $.ajax({
      url: '/section/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempSections = self.sections.filter(function (c) {
            return c.section_id != id;
          });
          self.sections = tempSections;
          toastr.info("Section Deleted Successfully");
          self.trigger('delete_section_changed', self.sections);
        } else if (data.status == 'e') {
          showToast("Error Deleting Section. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_section', function (section, standard_id, id) {
    var req = {};
    req.section = section;
    req.standard_id = standard_id;
    req.id = id;
    $.ajax({
      url: '/section/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.sections = self.sections.map(function (cat) {
            if (cat.section_id == id) {
              cat.section_id = id;
              cat.section = section;
              cat.standard_id = standard_id;
              //cat.standard_id=standard_id
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Section Updated Successfully ");
          self.trigger('edit_section_changed', self.sections);
        } else if (data.status == 'e') {
          showToast("Error updating sections. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_section', function (section, standard_id) {
    var req = {};
    req.section = section;
    req.standard_id = standard_id;
    $.ajax({
      url: '/section/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add section section after');
          var obj = {};
          obj.section_id = data.section_id;
          obj.section = section;
          obj.standard_id = standard_id;
          // obj.name = name
          self.sections = [obj].concat(self.sections);
          toastr.success("section role Inserserted Successfully ");
          self.trigger('add_section_changed', self.sections);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function SessionStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.sessions = [];

  self.on('read_session', function () {
    console.log('i am in read_categories api call from ajax');
    var req = {};
    $.ajax({
      url: '/fees_session',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.sessions = data.sessions;
          self.trigger('read_session_changed', data.sessions);
        } else if (data.status == 'e') {
          showToast("Session Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_session', function (session_name, session_start_date, session_end_date) {
    var req = {};
    req.session_name = session_name;
    req.session_start_date = session_start_date;
    req.session_end_date = session_end_date;
    $.ajax({
      url: '/fees_session/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add event after');
          var obj = {};
          obj.id = data.id;
          obj.session_name = session_name;
          obj.session_start_date = session_start_date;
          obj.session_end_date = session_end_date;
          self.sessions = [obj].concat(self.sessions);
          toastr.success("Session Inserserted Successfully ");
          self.trigger('add_session_changed', self.sessions);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_session', function (session_name, session_start_date, session_end_date, session_id) {
    var req = {};
    req.session_name = session_name;
    req.session_start_date = session_start_date;
    req.session_end_date = session_end_date;
    req.session_id = session_id;
    $.ajax({
      url: '/fees_session/edit/' + session_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.sessions = self.sessions.map(function (cat) {
            if (cat.session_id == session_id) {
              cat.session_id = session_id;
              cat.session_name = session_name;
              cat.session_start_date = session_start_date;
              cat.session_end_date = session_end_date;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Session Updated Successfully ");
          self.trigger('edit_session_changed', self.sessions);
        } else if (data.status == 'e') {
          showToast("Error updating Event. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_session', function (session_id) {
    $.ajax({
      url: '/fees_session/delete/' + session_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempSession = self.sessions.filter(function (c) {
            return c.session_id != session_id;
          });
          self.sessions = tempSession;
          toastr.info("Session Deleted Successfully");
          self.trigger('delete_event_changed', self.sessions);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('current_session', function (session_id) {
    $.ajax({
      url: '/fees_session/markCurrent/' + session_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempSession = self.sessions.filter(function (c) {
            return c.session_id != session_id;
          });
          self.sessions = tempSession;
          toastr.info("Session Marked Successfully");
          self.trigger('marked_event_changed', self.sessions);
        } else if (data.status == 'e') {
          showToast("Error in Marked Current Session. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function StaffBPWeightStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.staffWiseReports = [];
  self.employees = [];

  self.on('read_employee', function () {
    console.log('i am in employee  api call from ajax');
    var req = {};
    $.ajax({
      url: '/infirmary_staff/read_employee',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.employees = data.employees;
          self.trigger('read_employee_changed', data.employees);
        } else if (data.status == 'e') {
          showToast("case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_staff_wise_report', function (staff_id, start_date, end_date) {
    var req = {};
    req.staff_id = staff_id;
    req.start_date = start_date;
    req.end_date = end_date;
    $.ajax({
      url: '/staff_bp_weight/read_staff_wise_report',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully ");
          self.staffWiseReports = data.staffWiseReports;
          self.trigger('read_staff_wise_report_changed', self.staffWiseReports);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_staff_bp_weight', function (id) {
    console.log('i am in read_section api call from ajax');
    var req = {};
    $.ajax({
      url: '/staff_bp_weight/read_staff_bp_weight',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.staffBPWeights = data.staffBPWeights;
          self.trigger('read_staff_bp_weight_changed', data.staffBPWeights);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  // read Staff Infirmary date wise case report which have tag file name infirmary-staff-date-wise-repor


  self.on('delete_staff_bp_weight', function (id) {
    $.ajax({
      url: '/staff_bp_weight/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempStaffBPWeight = self.staffBPWeights.filter(function (c) {
            return c.health_id != id;
          });
          self.staffBPWeights = tempStaffBPWeight;
          toastr.info("Infirmary Deleted Successfully");
          self.trigger('delete_staff_bp_weight_changed', self.staffBPWeights);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_staff_bp_weight', function (staff_id, checkup_date, time_in, time_out, upper_bp, lower_bp, height, weight, bmi, id) {
    var req = {};
    req.staff_id = staff_id;
    req.height = height;
    req.weight = weight;
    req.checkup_date = checkup_date;
    req.time_in = time_in;
    req.time_out = time_out;
    req.upper_bp = upper_bp;
    req.lower_bp = lower_bp;
    req.bmi = bmi;
    console.log(id);
    req.id = id;
    $.ajax({
      url: '/staff_bp_weight/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.staffBPWeights = self.staffBPWeights.map(function (cat) {
            if (cat.health_id == id) {
              cat.staff_id = staff_id;
              cat.height = height;
              cat.weight = weight;
              cat.health_id = id;
              cat.checkup_date = checkup_date;
              cat.time_in = time_in;
              cat.time_out = time_out;
              cat.upper_bp = upper_bp;
              cat.lower_bp = lower_bp;
              cat.bmi = bmi;
              //cat.standard_id=standard_id
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Infirmary Updated Successfully ");
          self.trigger('edit_staff_bp_weight_changed', self.staffInfirmarys);
        } else if (data.status == 'e') {
          showToast("Error updating Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_staff_bp_weight', function (staff_id, checkup_date, time_in, time_out, upper_bp, lower_bp, height, weight, bmi) {
    var req = {};
    req.staff_id = staff_id;
    req.height = height;
    req.weight = weight;
    req.checkup_date = checkup_date;
    req.time_in = time_in;
    req.time_out = time_out;
    req.upper_bp = upper_bp;
    req.lower_bp = lower_bp;
    req.bmi = bmi;
    $.ajax({
      url: '/staff_bp_weight/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add bp weight  after');
          var obj = {};
          obj.staff_id = staff_id;
          obj.height = height;
          obj.weight = weight;
          obj.checkup_date = checkup_date;
          obj.time_in = time_in;
          obj.time_out = time_out;
          obj.upper_bp = upper_bp;
          obj.lower_bp = lower_bp;
          obj.bmi = bmi;
          //bmi=bmi
          self.staffBPWeights = [obj].concat(self.staffBPWeights);
          toastr.success("staff weight  Inserserted Successfully ");
          self.trigger('add_staff_bp_weight_changed', self.staffBPWeights);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function StaffInfirmaryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.infirmaryCases = [];
  self.infirmaryCategories = [];
  self.staffInfirmarys = [];
  self.employees = [];

  self.on('read_employee', function () {
    console.log('i am in read_sections api call from ajax');
    var req = {};
    $.ajax({
      url: '/infirmary_staff/read_employee',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.employees = data.employees;
          self.trigger('read_employee_changed', data.employees);
        } else if (data.status == 'e') {
          showToast("case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  self.on('read_infirmary_category', function () {
    console.log('i am in read_sections api call from ajax');
    var req = {};
    $.ajax({
      url: '/infirmary_staff/readInfirmaryCategory',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCategories = data.infirmaryCategories;
          self.trigger('read_infirmary_category_changed', data.infirmaryCategories);
        } else if (data.status == 'e') {
          showToast("case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  /*self.on('read_staff_date_wise_case_report', function(category_id,start_date,end_date) {
    console.log('i am in read_staff_date_wise_case_report')
         let req = {}
           req.category_id=category_id
           req.start_date=start_date
           req.end_date=end_date
        url:'/infirmary_staff/readCaseReport',
        type:"POST",
        data: JSON.stringify(req),
         contentType: "application/json",
         dataType:"json",
         headers: {"Authorization": getCookie('token')},
          success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.staffDateWiseCaseReports = data.staffDateWiseCaseReports
            self.trigger('read_staff_date_wise_case_report_changed', data.staffDateWiseCaseReports)
          }else if(data.status == 'e'){
            showToast("case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/

  /*self.on('read_staff_date_wise_case_report', function(category_id,start_date,end_date) {
      let req = {}
       req.category_id=category_id
       req.start_date=start_date
       req.end_date=end_date
      $.ajax({
         url:'/infirmary_staff/readCaseReport',
          type:"POST",
          data: JSON.stringify(req),
          contentType: "application/json",
          dataType:"json",
          headers: {"Authorization": getCookie('token')},
          success: function(data){
            console.log(data)
            if(data.status == 's'){
              toastr.success("Successfully ")
              self.staffDateWiseCaseReports = data.staffDateWiseCaseReports
              self.trigger('read_staff_date_wise_case_report_changed', self.staffDateWiseCaseReports)
            }else if(data.status == 'e'){
              showToast("Invalid Username or password. Please try again.", data)
            }
          },
          error: function(data){
            showToast("", data)
          }
        })
    })
  */

  self.on('read_infirmary_case', function () {
    console.log('i am in read_section api call from ajax');
    var req = {};
    $.ajax({
      url: '/infirmary_staff/read_infirmary_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCases = data.infirmaryCases;
          self.trigger('read_infirmary_case_changed', data.infirmaryCases);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  // Read staff Monthly Case Report

  self.on('read_staff_monthly_case_report', function (month_id) {
    console.log('i am in monthly case api call from ajax');
    var req = {};
    $.ajax({
      url: '/infirmary_staff/read_staff_monthly_case_report/' + month_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.staffMonthlyReport = data.staffMonthlyReport;
          self.trigger('read_staff_monthly_report_changed', data.staffMonthlyReport);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_staff_infirmary', function (id) {
    console.log('i am in read_section api call from ajax');
    var req = {};
    $.ajax({
      url: '/infirmary_staff/read_staff_infirmary/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.staffInfirmarys = data.staffInfirmarys;
          self.trigger('read_staff_infirmary_changed', data.staffInfirmarys);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  // read Staff Infirmary date wise case report which have tag file name infirmary-staff-date-wise-repor
  self.on('read_staff_date_wise_case_report', function (category_id, start_date, end_date) {
    var req = {};
    req.category_id = category_id;
    req.start_date = start_date;
    req.end_date = end_date;
    $.ajax({
      url: '/infirmary_staff/readStaffCaseReport',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully ");
          self.staffDateWiseCaseReports = data.staffDateWiseCaseReports;
          self.trigger('read_staff_date_wise_case_report_changed', self.staffDateWiseCaseReports);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_staff_infirmary', function (id) {
    $.ajax({
      url: '/infirmary_staff/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempStaffInfirmary = self.staffInfirmarys.filter(function (c) {
            return c.infirmary_id != id;
          });
          self.staffInfirmarys = tempStaffInfirmary;
          toastr.info("Infirmary Deleted Successfully");
          self.trigger('delete_staff_infirmary_changed', self.staffInfirmarys);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_staff_infirmary', function (staff_id, category_id, case_id, treatment_date, time_in, time_out, treatment, id, case_name) {
    var req = {};
    req.staff_id = staff_id;
    req.category_id = category_id;
    req.case_id = case_id;
    req.treatment_date = treatment_date;
    req.time_in = time_in;
    req.time_out = time_out;
    req.treatment = treatment;
    req.case_name = case_name;
    console.log(id);
    req.id = id;
    $.ajax({
      url: '/infirmary_staff/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.staffInfirmarys = self.staffInfirmarys.map(function (cat) {
            if (cat.staff_infirmary_id == id) {
              cat.staff_id = staff_id;
              cat.category_id = category_id;
              cat.case_id = case_id;
              cat.staff_infirmary_id = id;
              cat.treatment_date = treatment_date;
              cat.time_in = time_in;
              cat.time_out = time_out;
              cat.treatment = treatment;
              //cat.standard_id=standard_id
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Infirmary Updated Successfully ");
          self.trigger('edit_staff_infirmary_changed', self.staffInfirmarys);
        } else if (data.status == 'e') {
          showToast("Error updating Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_staff_infirmary', function (staff_id, category_id, case_id, treatment_date, time_in, time_out, treatment, case_name) {
    var req = {};
    req.staff_id = staff_id;
    req.category_id = category_id;
    req.case_id = case_id;
    req.treatment_date = treatment_date;
    req.time_in = time_in;
    req.time_out = time_out;
    req.treatment = treatment;
    req.case_name = case_name;
    $.ajax({
      url: '/infirmary_staff/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add case  after');
          var obj = {};
          obj.staff_id = staff_id;
          obj.category_id = category_id;
          obj.case_id = case_id;
          obj.staff_infirmary_id = data.staff_infirmary_id;
          obj.treatment_date = treatment_date;
          obj.time_in = time_in;
          obj.time_out = time_out;
          obj.treatment = treatment;
          //  obj.treatment=treatment
          // obj.name = name
          self.staffInfirmarys = [obj].concat(self.staffInfirmarys);
          toastr.success("Infirmary  Inserserted Successfully ");
          self.trigger('add_staff_infirmary_changed', self.staffInfirmarys);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function StandardStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.standards = [];

  self.on('read_standard', function () {
    console.log('i am in read_standard api call from ajax');
    var req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standard Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_standard', function (id) {
    $.ajax({
      url: '/standard/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempStandard = self.standards.filter(function (c) {
            return c.standard_id != id;
          });
          self.standards = tempStandard;
          self.trigger('standard_changed', self.standards);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_standard', function (standard, id) {
    var req = {};
    req.standard = standard;
    req.id = id;
    $.ajax({
      url: '/standard/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.standards = self.standards.map(function (cat) {
            if (cat.standard_id == id) {
              cat.standard = standard;
              cat.standard_id = id;
            }
            // cat.confirmEdit = false
            return cat;
          });
          self.trigger('standard_changed', self.standards);
        } else if (data.status == 'e') {
          showToast("Error updating Course. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_standard', function (standard) {
    var req = {};
    req.standard = standard;
    $.ajax({
      url: '/standard/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add standard after');
          var obj = {};
          obj.standard_id = data.standard_id;
          obj.standard = standard;
          self.standards = [obj].concat(self.standards);
          self.trigger('standard_changed', self.standards);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function StateStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.states = [];

  self.on('read_state', function () {
    console.log('i am in read_state api call from ajax');
    var req = {};
    $.ajax({
      url: '/state',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.states = data.states;
          self.trigger('state_changed', data.states);
        } else if (data.status == 'e') {
          showToast("level Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_state', function (id) {
    $.ajax({
      url: '/state/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempState = self.states.filter(function (c) {
            return c.state != id;
          });
          self.states = tempState;
          self.trigger('state_changed', self.states);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_state', function (state, id) {
    var req = {};
    req.state = state;
    req.id = id;
    $.ajax({
      url: '/state/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.states = self.states.map(function (cat) {
            if (cat.state == id) {
              cat.state = state;
            }
            // cat.confirmEdit = false
            return cat;
          });
          self.trigger('state_changed', self.states);
        } else if (data.status == 'e') {
          showToast("Error updating Course. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_state', function (state) {
    var req = {};
    req.state = state;
    $.ajax({
      url: '/state/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add state after');
          var obj = {};
          //obj.level_id = data.level_id
          obj.state = state;
          self.states = [obj].concat(self.states);
          self.trigger('state_changed', self.states);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function StudentAssignHouseStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.houses = [];

  self.on('read_houses', function () {
    var req = {};
    $.ajax({
      url: '/student-assign-house',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.houses = data.houses;
          self.trigger('house_changed', data.houses);
        } else if (data.status == 'e') {
          showToast("House Read Error. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_house', function (house) {
    var req = {};
    req.house = house;
    $.ajax({
      url: '/student-assign-house/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          var obj = {};
          obj.id = data.id;
          obj.house = house;
          self.houses = [obj].concat(self.houses);
          toastr.success("House Created Successfully ");
          self.trigger('add_house_changed', self.houses);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('update_house', function (house, id) {
    var req = {};
    req.house = house;
    req.id = id;
    $.ajax({
      url: '/student-assign-house/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.houses = self.houses.map(function (cat) {
            if (cat.house_id == id) {
              cat.house_id = id;
              cat.house_name = house;
            }
            cat.confirmEdit = false;
            return cat;
          });
          toastr.success("House Updated Successfully ");
          self.trigger('add_house_changed', self.houses); // same trigger, as Add House
        } else if (data.status == 'e') {
          showToast("Error updating House. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_house', function (id) {
    $.ajax({
      url: '/student-assign-house/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempExamScheme = self.houses.filter(function (c) {
            return c.house_id != id;
          });
          self.houses = tempExamScheme;
          toastr.info("House Deleted Successfully");
          self.trigger('delete_house_changed', self.houses);
        } else if (data.status == 'e') {
          showToast("Error Deleting House. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************students start*****************************************************************/

  self.on('read_classes', function () {
    var req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    var req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_students', function (house_id, standard_id, section_id) {
    var req = {};
    $.ajax({
      url: '/student-assign-house/students/' + house_id + '/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_students_changed', data.freeStudents, data.assignedStudents);
        } else if (data.status == 'e') {
          showToast("House Read Error. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('assign_students', function (house_id, students) {
    var obj = {};
    obj['house_id'] = house_id;
    obj['students'] = students;
    $.ajax({
      url: '/student-assign-house/assign-students/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          toastr.success("Students assigned successfully ");
          self.trigger('assign_students_changed', students);
        } else if (data.status == 'e') {
          showToast("Error assigning students. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('free_up_student', function (house_id, students) {
    var obj = {};
    obj['house_id'] = house_id;
    obj['students'] = students;
    $.ajax({
      url: '/student-assign-house/free-up-student/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {

          toastr.success("Students freed successfully ");
          self.trigger('assign_students_changed', students);
        } else if (data.status == 'e') {
          showToast("Error while free up students. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student_by_house', function (house_id) {
    var req = {};
    $.ajax({
      url: '/student-assign-house/students_by_house/' + house_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_student_by_house_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Students Read Error. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('update_house_captain', function (house_id, captain_id, vice_captain_id) {
    var req = {};
    $.ajax({
      url: '/student-assign-house/update-captain/' + house_id + '/' + captain_id + '/' + vice_captain_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          toastr.success("House Captain Updated Successfully ");
          self.trigger('update_house_captain_changed');
        } else if (data.status == 'e') {
          showToast("Error updating house captain. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student_by_house_details', function (house_id) {
    var req = {};
    $.ajax({
      url: '/student-assign-house/students_by_house_details/' + house_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_student_by_house_details_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Students Read Error. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function StudentGroupStudentStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.houses = [];

  self.on('read_houses', function () {
    var req = {};
    $.ajax({
      url: '/student-group-student',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.houses = data.houses;
          self.trigger('house_changed', data.houses);
        } else if (data.status == 'e') {
          showToast("House Read Error. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_house', function (house) {
    var req = {};
    req.house = house;
    $.ajax({
      url: '/student-group-student/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          var obj = {};
          obj.id = data.id;
          obj.house = house;
          self.houses = [obj].concat(self.houses);
          toastr.success("House Created Successfully ");
          self.trigger('add_house_changed', self.houses);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('update_house', function (house, id) {
    var req = {};
    req.house = house;
    req.id = id;
    $.ajax({
      url: '/student-group-student/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.houses = self.houses.map(function (cat) {
            if (cat.house_id == id) {
              cat.house_id = id;
              cat.house_name = house;
            }
            cat.confirmEdit = false;
            return cat;
          });
          toastr.success("House Updated Successfully ");
          self.trigger('add_house_changed', self.houses); // same trigger, as Add House
        } else if (data.status == 'e') {
          showToast("Error updating House. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_house', function (id) {
    $.ajax({
      url: '/student-group-student/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempExamScheme = self.houses.filter(function (c) {
            return c.house_id != id;
          });
          self.houses = tempExamScheme;
          toastr.info("House Deleted Successfully");
          self.trigger('delete_house_changed', self.houses);
        } else if (data.status == 'e') {
          showToast("Error Deleting House. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************students start*****************************************************************/

  self.on('read_classes', function () {
    var req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    var req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_students', function (house_id, standard_id, section_id) {
    var req = {};
    $.ajax({
      url: '/student-group-student/students/' + house_id + '/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_students_changed', data.freeStudents, data.assignedStudents);
        } else if (data.status == 'e') {
          showToast("House Read Error. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('assign_students', function (house_id, students) {
    var obj = {};
    obj['house_id'] = house_id;
    obj['students'] = students;
    $.ajax({
      url: '/student-group-student/assign-students/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          toastr.success("Students assigned successfully ");
          self.trigger('assign_students_changed', students);
        } else if (data.status == 'e') {
          showToast("Error assigning students. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('free_up_student', function (house_id, students) {
    var obj = {};
    obj['house_id'] = house_id;
    obj['students'] = students;
    $.ajax({
      url: '/student-group-student/free-up-student/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {

          toastr.success("Students freed successfully ");
          self.trigger('assign_students_changed', students);
        } else if (data.status == 'e') {
          showToast("Error while free up students. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student_by_house', function (house_id) {
    var req = {};
    $.ajax({
      url: '/student-group-student/students_by_house/' + house_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_student_by_house_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Students Read Error. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('update_house_captain', function (house_id, captain_id, vice_captain_id) {
    var req = {};
    $.ajax({
      url: '/student-group-student/update-captain/' + house_id + '/' + captain_id + '/' + vice_captain_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          toastr.success("House Captain Updated Successfully ");
          self.trigger('update_house_captain_changed');
        } else if (data.status == 'e') {
          showToast("Error updating house captain. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student_by_house_details', function (house_id) {
    var req = {};
    $.ajax({
      url: '/student-group-student/students_by_house_details/' + house_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_student_by_house_details_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Students Read Error. Please try again.", data.messaage);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function StudentInfirmaryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.infirmaryCases = [];
  self.infirmaryCategories = [];
  self.studentInfirmarys = [];
  self.on('read_infirmary_category', function () {
    console.log('i am in read_sections api call from ajax');
    var req = {};
    $.ajax({
      url: '/infirmary_student/readInfirmaryCategory',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCategories = data.infirmaryCategories;
          self.trigger('read_infirmary_category_changed', data.infirmaryCategories);
        } else if (data.status == 'e') {
          showToast("case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  /*self.on('read_student_date_wise_case_report', function(category_id,start_date,end_date) {
    console.log('i am in read_student_date_wise_case_report')
         let req = {}
           req.category_id=category_id
           req.start_date=start_date
           req.end_date=end_date
        url:'/infirmary_student/readCaseReport',
        type:"POST",
        data: JSON.stringify(req),
         contentType: "application/json",
         dataType:"json",
         headers: {"Authorization": getCookie('token')},
          success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.studentDateWiseCaseReports = data.studentDateWiseCaseReports
            self.trigger('read_student_date_wise_case_report_changed', data.studentDateWiseCaseReports)
          }else if(data.status == 'e'){
            showToast("case Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/

  self.on('read_student_date_wise_case_report', function (category_id, start_date, end_date) {
    var req = {};
    req.category_id = category_id;
    req.start_date = start_date;
    req.end_date = end_date;
    $.ajax({
      url: '/infirmary_student/readCaseReport',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully ");
          self.studentDateWiseCaseReports = data.studentDateWiseCaseReports;
          self.trigger('read_student_date_wise_case_report_changed', self.studentDateWiseCaseReports);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_infirmary_case', function () {
    console.log('i am in read_section api call from ajax');
    var req = {};
    $.ajax({
      url: '/infirmary_student/read_infirmary_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCases = data.infirmaryCases;
          self.trigger('read_infirmary_case_changed', data.infirmaryCases);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
  self.on('read_student_infirmary', function (id) {
    console.log('i am in read_section api call from ajax');
    var req = {};
    $.ajax({
      url: '/infirmary_student/read_student_infirmary/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.studentInfirmarys = data.studentInfirmarys;
          self.trigger('read_student_infirmary_changed', data.studentInfirmarys);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_student_infirmary', function (id) {
    $.ajax({
      url: '/infirmary_student/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          var tempStudentInfirmary = self.studentInfirmarys.filter(function (c) {
            return c.infirmary_id != id;
          });
          self.studentInfirmarys = tempStudentInfirmary;
          toastr.info("Infirmary Deleted Successfully");
          self.trigger('delete_student_infirmary_changed', self.studentInfirmarys);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_student_infirmary', function (enroll_number, category_id, case_id, treatment_date, time_in, time_out, treatment, sent_home, id, case_name) {
    var req = {};
    console.log(id);
    req.enroll_number = enroll_number;
    req.category_id = category_id;
    req.case_id = case_id;
    req.treatment_date = treatment_date;
    req.time_in = time_in;
    req.time_out = time_out;
    req.treatment = treatment;
    req.sent_home = sent_home;
    req.case_name = case_name;
    req.id = id;
    $.ajax({
      url: '/infirmary_student/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        if (data.status == 's') {
          self.studentInfirmarys = self.studentInfirmarys.map(function (cat) {
            if (cat.infirmary_id == id) {
              cat.enroll_number = enroll_number;
              cat.category_id = category_id;
              cat.case_id = case_id;
              cat.infirmary_id = id;
              cat.treatment_date = treatment_date;
              cat.time_in = time_in;
              cat.time_out = time_out;
              cat.treatment = treatment;
              cat.sent_home = sent_home;
              //cat.standard_id=standard_id
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Infirmary Updated Successfully ");
          self.trigger('edit_student_infirmary_changed', self.studentInfirmarys);
        } else if (data.status == 'e') {
          showToast("Error updating Case. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_student_infirmary', function (enroll_number, category_id, case_id, treatment_date, time_in, time_out, treatment, sent_home, case_name) {
    var req = {};
    req.enroll_number = enroll_number;
    req.category_id = category_id;
    req.case_id = case_id;
    req.treatment_date = treatment_date;
    req.time_in = time_in;
    req.time_out = time_out;
    req.treatment = treatment;
    req.sent_home = sent_home;
    req.case_name = case_name;
    $.ajax({
      url: '/infirmary_student/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add case  after');
          var obj = {};
          obj.enroll_number = enroll_number;
          obj.category_id = category_id;
          obj.case_id = case_id;
          obj.infirmary_id = infirmary_id;
          obj.treatment_date = treatment_date;
          obj.time_in = time_in;
          obj.time_out = time_out;
          obj.treatment = treatment;
          //  obj.treatment=treatment
          obj.sent_home = sent_home;
          // obj.name = name
          self.studentInfirmarys = [obj].concat(self.studentInfirmarys);
          toastr.success("Infirmary  Inserserted Successfully ");
          self.trigger('add_student_infirmary_changed', self.studentInfirmarys);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
'use strict';

function StudentStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_standard', function () {
    var req = {};
    $.ajax({
      url: '/student/read_standard/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Standard Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    var req = {};
    $.ajax({
      url: '/student/read_section/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Section Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_house', function () {
    var req = {};
    $.ajax({
      url: '/student/read_house/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.houses = data.houses;
          self.trigger('read_house_changed', data.houses);
        } else if (data.status == 'e') {
          showToast("House Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_cast', function () {
    var req = {};
    $.ajax({
      url: '/student/read_cast/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.cast = data.cast;
          self.trigger('read_cast_changed', data.cast);
        } else if (data.status == 'e') {
          showToast("Cast Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_religion', function () {
    var req = {};
    $.ajax({
      url: '/student/read_religion/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.religion = data.religion;
          self.trigger('read_religion_changed', data.religion);
        } else if (data.status == 'e') {
          showToast("Religion Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student', function (read_standard_id, read_section_id, read_enroll_number) {
    console.log(read_standard_id);
    console.log(read_section_id);
    console.log(read_enroll_number);
    var req = {};
    req.read_standard_id = read_standard_id;
    req.read_section_id = read_section_id;
    req.read_enroll_number = read_enroll_number;
    $.ajax({
      url: '/student/read_student/' + read_standard_id + '/' + read_section_id + '/' + read_enroll_number,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_student_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('read_for_edit_student', function (student_id) {
    console.log(student_id);
    var req = {};
    req.student_id = student_id;

    $.ajax({
      url: '/student/read_for_edit_student/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          self.student_details = data.student_details;
          self.trigger('read_for_edit_student_changed', data.student_details);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });

  self.on('add_student', function (obj) {
    $.ajax({
      url: '/student/add',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function success(data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Student after');
          toastr.success("Successfully Inserted");
          self.trigger('add_student_changed', self.students);
        } else if (data.status == 'e') {
          showToast("Error adding Student. Please try again.", data);
        }
      },
      error: function error(data) {
        showToast("", data);
      }
    });
  });
}
