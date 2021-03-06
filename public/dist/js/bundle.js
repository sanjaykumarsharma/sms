var showToast = (msg, data) => {
  if (msg == "" || !msg) {
    msg = "Something went wrong";
  }
  toastr.error(msg + data);
  console.log("[ERROR:]");
  console.log(data);
};

var convertDate = inputDate => {
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

var firstAssessmentReportStore = new FirstAssessmentReportStore();
RiotControl.addStore(firstAssessmentReportStore);

var finalAssessmentReportStore = new FinalAssessmentReportStore();
RiotControl.addStore(finalAssessmentReportStore);

//student
var studentAssignHouseStore = new StudentAssignHouseStore();
RiotControl.addStore(studentAssignHouseStore);

var studentStudentGroupStore = new StudentStudentGroupStore();
RiotControl.addStore(studentStudentGroupStore);

var studentAssignSubjectStore = new StudentAssignSubjectStore();
RiotControl.addStore(studentAssignSubjectStore);

var teacherTimeTableStore = new TeacherTimeTableStore();
RiotControl.addStore(teacherTimeTableStore);

var timeTableSubstitutaionStore = new TimeTableSubstitutaionStore();
RiotControl.addStore(timeTableSubstitutaionStore);

var timeTableAdminStore = new TimeTableAdminStore();
RiotControl.addStore(timeTableAdminStore);

var timeTableRoomSettingsStore = new TimeTableRoomSettingsStore();
RiotControl.addStore(timeTableRoomSettingsStore);

var timeTablePeriodSettingsStore = new TimeTablePeriodSettingsStore();
RiotControl.addStore(timeTablePeriodSettingsStore);

var timeTableDaySettingsStore = new TimeTableDaySettingsStore();
RiotControl.addStore(timeTableDaySettingsStore);

var timeTableReportStore = new TimeTableReportStore();
RiotControl.addStore(timeTableReportStore);

var studentWithdrawnStudentStore = new StudentWithdrawnStudentStore();
RiotControl.addStore(studentWithdrawnStudentStore);

var studentAssignSectionStore = new StudentAssignSectionStore();
RiotControl.addStore(studentAssignSectionStore);

var studentLoginSlipStore = new StudentLoginSlipStore();
RiotControl.addStore(studentLoginSlipStore);

var studentSchoolLeavingStore = new StudentSchoolLeavingStore();
RiotControl.addStore(studentSchoolLeavingStore);

var studentResultActivationStore = new StudentResultActivationStore();
RiotControl.addStore(studentResultActivationStore);

var certificateStore = new CertificateStore();
RiotControl.addStore(certificateStore);

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

var feeReceivedStore = new FeeReceivedStore();
RiotControl.addStore(feeReceivedStore);

var feesReportStore = new FeesReportStore();
RiotControl.addStore(feesReportStore);

var feeWithdrawStore = new FeeWithdrawStore();
RiotControl.addStore(feeWithdrawStore);

var promoteStore = new PromoteStore();
RiotControl.addStore(promoteStore);

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

var activityReportStore = new ActivityReportStore();
RiotControl.addStore(activityReportStore);

var studentStore = new StudentStore();
RiotControl.addStore(studentStore);

var studentinfoupdateStore = new StudentInfoUpdateStore();
RiotControl.addStore(studentinfoupdateStore);

var employeeNotificationStore = new EmployeeNotificationStore();
RiotControl.addStore(employeeNotificationStore);

var studentNotificationStore = new StudentNotificationStore();
RiotControl.addStore(studentNotificationStore);

var idSignatureStore = new IdSignatureStore();
RiotControl.addStore(idSignatureStore);

var idCardStore = new IdCardStore();
RiotControl.addStore(idCardStore);

var careerStore = new CareerStore();
RiotControl.addStore(careerStore);

var alumniStore = new AlumniStore();
RiotControl.addStore(alumniStore);

var analysisReportStore = new AnalysisReportStore();
RiotControl.addStore(analysisReportStore);

var threesixtyDegreeViewStore = new ThreesixtyDegreeViewStore();
RiotControl.addStore(threesixtyDegreeViewStore);

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

var subjectStore = new SubjectStore();
RiotControl.addStore(subjectStore);

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

var activatesessionStore = new ActivatesessionStore();
RiotControl.addStore(activatesessionStore);

var inventorydepartmentStore = new InventoryDepartmentStore();
RiotControl.addStore(inventorydepartmentStore);

var departmentStore = new DepartmentStore();
RiotControl.addStore(departmentStore);

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

var inventoryReportStore = new InventoryReportStore();
RiotControl.addStore(inventoryReportStore);

var staffStore = new StaffStore();
RiotControl.addStore(staffStore);

var studentSearchStore = new StudentSearchStore();
RiotControl.addStore(studentSearchStore);

var birthDayStore = new BirthDayStore();
RiotControl.addStore(birthDayStore);

var attendanceStore = new AttendanceStore();
RiotControl.addStore(attendanceStore);

var adminReportStore = new AdminReportStore();
RiotControl.addStore(adminReportStore);

var currentPage = null;

let loginRoute = (path1, path2, path3) => {
  riot.mount('main-nav', { selected_nav_item: path1 });
  if (currentPage) {
    currentPage.unmount(true);
  }
  switch (path1) {
    case 'login':
      currentPage = riot.mount('div#view', 'login')[0];
      break;
  }
};
//========== activity Route Route ===========   
let activityRoute = (path1, path2, path3) => {
  riot.mount('main-nav', { selected_nav_item: path1 });
  if (currentPage) {
    currentPage.unmount(true);
  }
  switch (path1) {
    /*case 'login':
      currentPage = riot.mount('div#view', 'login')[0];
    break;*/
    case 'student-browser':
      riot.mount("div#view", 'student-browser');
      break;
    case 'staff-profile':
      riot.mount("div#view", 'staff-profile');
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
    case 'activity-report':
      currentPage = riot.mount('div#view', 'activity-report', { selected_master: path2 })[0];
      switch (path2) {
        case 'activity-date-wise-report':
          riot.mount("div#activity-report-view", 'activity-date-wise-report');
          break;
        case 'activity-session-wise-report':
          riot.mount("div#activity-report-view", 'activity-session-wise-report');
          break;
        case 'activity-event-wise-report':
          riot.mount("div#activity-report-view", 'activity-event-wise-report');
          break;
        case 'activity-student-event-report':
          riot.mount("div#activity-report-view", 'activity-student-event-report');
          break;
        case 'activity-event-wise-graph-report':
          riot.mount("div#activity-report-view", 'activity-event-wise-graph-report');
          break;
        default:
          riot.mount("div#activity-report-view", 'activity-date-wise-report');
      }
      break;
  }
};

//========== career Route Route ===========   
let careerRoute = (path1, path2, path3) => {
  riot.mount('main-nav', { selected_nav_item: path1 });
  if (currentPage) {
    currentPage.unmount(true);
  }
  switch (path1) {
    /*case 'login':
      currentPage = riot.mount('div#view', 'login')[0];
    break;*/
    case 'staff-profile':
      riot.mount("div#view", 'staff-profile');
      break;
    case 'career-setting':
      currentPage = riot.mount('div#view', 'career-setting', { selected_master: path2 })[0];
      switch (path2) {
        case 'applicant-detail':
          riot.mount("div#career-setting-view", 'applicant-detail');
          break;
        case 'career-interview':
          riot.mount("div#career-setting-view", 'career-interview');
          break;
        case 'interviewed-candidate':
          riot.mount("div#career-setting-view", 'interviewed-candidate');
          break;
        case 'career-report':
          riot.mount("div#career-setting-view", 'career-report');
          break;
        default:
          riot.mount("div#career-setting-view", 'applicant-detail');
      }
      break;
  }
};

//========== Admission Route ===========   
let admissionRoute = (path1, path2, path3) => {
  riot.mount('main-nav', { selected_nav_item: path1 });
  if (currentPage) {
    currentPage.unmount(true);
  }
  switch (path1) {
    /*case 'login':
      currentPage = riot.mount('div#view', 'login')[0];
    break;*/
    case 'student-browser':
      riot.mount("div#view", 'student-browser');
      break;
    case 'staff-profile':
      riot.mount("div#view", 'staff-profile');
      break;
    case 'student':
      currentPage = riot.mount('div#view', 'student')[0];
      break;

  }
};

//========== Mentor Route ===========   
let mentorRoute = (path1, path2, path3) => {
  riot.mount('main-nav', { selected_nav_item: path1 });
  if (currentPage) {
    currentPage.unmount(true);
  }
  switch (path1) {
    /*case 'login':
      currentPage = riot.mount('div#view', 'login')[0];
    break;*/
    case 'student-browser':
      riot.mount("div#view", 'student-browser');
      break;
    case 'staff-profile':
      riot.mount("div#view", 'staff-profile');
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
  }
};

//========== Discipline Route ===========   
let disciplineRoute = (path1, path2, path3) => {
  riot.mount('main-nav', { selected_nav_item: path1 });
  if (currentPage) {
    currentPage.unmount(true);
  }
  switch (path1) {
    /*case 'login':
      currentPage = riot.mount('div#view', 'login')[0];
    break;*/
    case 'staff-profile':
      riot.mount("div#view", 'staff-profile');
      break;
    case 'student-browser':
      riot.mount("div#view", 'student-browser');
      break;
    case 'student':
      currentPage = riot.mount('div#view', 'student')[0];
      break;
    case 'discipline-detail':
      currentPage = riot.mount('div#view', 'discipline-detail')[0];
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
  }
};

//========== Class Teacher Route ===========   
let classTeacherRoute = (path1, path2, path3) => {
  riot.mount('main-nav', { selected_nav_item: path1 });
  if (currentPage) {
    currentPage.unmount(true);
  }
  switch (path1) {
    /*case 'login':
      currentPage = riot.mount('div#view', 'login')[0];
    break;*/
    case 'student-browser':
      riot.mount("div#view", 'student-browser');
      break;
    case 'staff-profile':
      riot.mount("div#view", 'staff-profile');
      break;
    case 'student-school-leaving':
      riot.mount("div#view", 'student-school-leaving');
      break;
    case 'maturity-development':
      riot.mount("div#view", 'maturity-development');
      break;
    case 'physical-fitness':
      riot.mount("div#view", 'physical-fitness');
      break;
    case 'marks-entry':
      riot.mount("div#view", 'marks-entry');
      break;
    case 'marks-manager':
      riot.mount("div#view", 'marks-manager');
      break;
    case 'attendance-entry':
      currentPage = riot.mount('div#view', 'attendance-entry')[0];
      break;
    case 'monthly-attendance':
      riot.mount("div#view", 'monthly-attendance')[0];
      break;
    case 'class-holiday':
      riot.mount("div#view", 'class-holiday')[0];
      break;
    case 'consolidate-tabulation-sheet':
      riot.mount("div#marks-report-view", 'consolidate-tabulation-sheet');
      break;
    case 'teacher-time-table':
      riot.mount("div#view", 'teacher-time-table');
      break;
    case 'marks-report':
      currentPage = riot.mount('div#view', 'marks-report', { selected_marks_report: path2 })[0];
      switch (path2) {
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
          riot.mount("div#marks-report-view", 'merit-list');
      }
      break;
  }
};
//========== Teacher Route ===========   
let teacherRoute = (path1, path2, path3) => {
  riot.mount('main-nav', { selected_nav_item: path1 });
  if (currentPage) {
    currentPage.unmount(true);
  }
  switch (path1) {
    /*case 'login':
      currentPage = riot.mount('div#view', 'login')[0];
    break;*/
    case 'staff-profile':
      riot.mount("div#view", 'staff-profile');
      break;
    case 'student-browser':
      riot.mount("div#view", 'student-browser');
      break;
    case 'teacher-time-table':
      riot.mount("div#view", 'teacher-time-table');
      break;
    case 'marks-entry':
      currentPage = riot.mount('div#view', 'marks-entry')[0];
      break;
    case 'consolidate-tabulation-sheet':
      riot.mount("div#marks-report-view", 'consolidate-tabulation-sheet');
      break;
  }
};

// Inventory Route For Store By Tarique
let inventoryRoute = (path1, path2, path3) => {
  riot.mount('main-nav', { selected_nav_item: path1 });
  if (currentPage) {
    currentPage.unmount(true);
  }
  switch (path1) {
    case 'staff-profile':
      currentPage = riot.mount('div#view', 'staff-profile')[0];
      break;
    case 'inventory-stock':
      currentPage = riot.mount('div#view', 'inventory-stock')[0];
      break;
    case 'inventory-sale':
      currentPage = riot.mount('div#view', 'inventory-sale')[0];
      break;
    case 'inventory-issue':
      currentPage = riot.mount('div#view', 'inventory-issue')[0];
      break;
    case 'inventory-returnable':
      currentPage = riot.mount('div#view', 'inventory-returnable')[0];
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
    case 'inventory-report':
      currentPage = riot.mount('div#view', 'inventory-report', { selected_inventory_report: path2 })[0];
      switch (path2) {
        case 'inventory-received-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-received-goods-report');
          break;
        case 'inventory-issued-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-issued-goods-report');
          break;
        case 'inventory-person-wise-issued-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-person-wise-issued-goods-report');
          break;
        case 'inventory-item-wise-issued-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-item-wise-issued-goods-report');
          break;
        case 'inventory-sales-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-sales-goods-report');
          break;
        case 'inventory-return-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-return-goods-report');
          break;
        case 'inventory-summary-report':
          riot.mount("div#inventory-report-view", 'inventory-summary-report');
          break;
        default:
          riot.mount("div#inventory-report-view", 'inventory-received-goods-report');
      }
      break;
  }
};

// infirmary sub anv Route


let infirmaryRoute = (path1, path2, path3) => {
  riot.mount('main-nav', { selected_nav_item: path1 });
  if (currentPage) {
    currentPage.unmount(true);
  }
  switch (path1) {
    case 'staff-profile':
      currentPage = riot.mount('div#view', 'staff-profile')[0];
      break;

    case 'infirmary-setting':

      currentPage = riot.mount('div#view', 'infirmary-setting', { selected_master: path2 })[0];
      switch (path2) {
        case 'infirmary-category':
          riot.mount("div#infirmary-setting-view", 'infirmary-category')[0];
          break;
        case 'infirmary-case':
          riot.mount("div#infirmary-setting-view", 'infirmary-case')[0];
          break;
        default:
          riot.mount("div#infirmary-setting-view", 'infirmary-case')[0];
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
        case 'infirmary-lab-test':
          riot.mount("div#infirmary-view", 'infirmary-lab-test');
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
            case 'infirmary-student-class-wise-report':
              riot.mount("div#infirmary-student-report-view", 'infirmary-student-class-wise-report');
              break;
            case 'infirmary-student-case-wise-report':
              riot.mount("div#infirmary-student-report-view", 'infirmary-student-case-wise-report');
              break;
            default:
              riot.mount("div#infirmary-student-report-view", 'infirmary-date-wise-case-report');
          }
          break;

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

        case 'infirmary-staff-bp-weight-report':
          currentPage = riot.mount('div#infirmary-view', 'infirmary-staff-bp-weight-report', { selected_infirmary_staff_bp_weight_report: path3 })[0];
          switch (path3) {
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

      }
      break;
  }
};
//======== Admin Route ============== 
let adminRoute = (path1, path2, path3) => {
  riot.mount('main-nav', { selected_nav_item: path1 });
  if (currentPage) {
    currentPage.unmount(true);
  }
  switch (path1) {
    case 'login':
      currentPage = riot.mount('div#view', 'login')[0];
      break;
    case 'threesixty-degree-view':
      currentPage = riot.mount('div#view', 'threesixty-degree-view')[0];
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
    case 'teacher-time-table':
      currentPage = riot.mount('div#view', 'teacher-time-table')[0];
      break;
    case 'time-table-substitutation':
      currentPage = riot.mount('div#view', 'time-table-substitutation')[0];
      break;
    case 'time-table-report-nav':
      currentPage = riot.mount('div#view', 'time-table-report-nav', { selected_time_table_report: path2 })[0];
      switch (path2) {
        case 'time-table-summary-report':
          riot.mount("div#time-table-report-view", 'time-table-summary-report');
          break;
        case 'time-table-detail-report':
          riot.mount("div#time-table-report-view", 'time-table-detail-report');
          break;
        default:
          riot.mount("div#time-table-report-view", 'time-table-summary-report');
      }
      break;
    case 'time-table-admin':
      currentPage = riot.mount('div#view', 'time-table-admin', { selected_time_table_admin: path2 })[0];
      switch (path2) {
        case 'time-table-class-report':
          riot.mount("div#time-table-admin-view", 'time-table-class-report');
          break;
        case 'time-table-room-report':
          riot.mount("div#time-table-admin-view", 'time-table-room-report');
          break;
        case 'time-table-teacher-report':
          riot.mount("div#time-table-admin-view", 'time-table-teacher-report');
          break;
        case 'time-table-assign-teacher':
          riot.mount("div#time-table-admin-view", 'time-table-assign-teacher');
          break;
        case 'time-table-settings':
          currentPage = riot.mount('div#time-table-admin-view', 'time-table-settings', { selected_time_table_settings: path3 })[0];
          switch (path3) {
            case 'time-table-room-settings':
              riot.mount("div#time-table-settings-view", 'time-table-room-settings');
              break;
            case 'time-table-period-settings':
              riot.mount("div#time-table-settings-view", 'time-table-period-settings');
              break;
            case 'time-table-day-settings':
              riot.mount("div#time-table-settings-view", 'time-table-day-settings');
              break;
            default:
              riot.mount("div#time-table-settings-view", 'time-table-room-settings');
          }
          break;
        default:
          riot.mount("div#time-table-admin-view", 'time-table-class-report');
      }
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
          riot.mount("div#marks-report-view", 'merit-list');
      }
      break;
    case 'student-assign-house':
      currentPage = riot.mount('div#view', 'student-assign-house')[0];
      break;
    case 'student-group-student':
      currentPage = riot.mount('div#view', 'student-group-student')[0];
      break;
    case 'student-withdrawn-student':
      currentPage = riot.mount('div#view', 'student-withdrawn-student')[0];
      break;
    case 'promote':
      currentPage = riot.mount('div#view', 'promote')[0];
      break;
    case 'student-assign-subject':
      currentPage = riot.mount('div#view', 'student-assign-subject')[0];
      break;
    case 'student-assign-section':
      currentPage = riot.mount('div#view', 'student-assign-section')[0];
      break;
    case 'student-login-slip':
      currentPage = riot.mount('div#view', 'student-login-slip')[0];
      break;
    case 'student-school-leaving':
      currentPage = riot.mount('div#view', 'student-school-leaving')[0];
      break;
    case 'student-result-activation':
      currentPage = riot.mount('div#view', 'student-result-activation')[0];
      break;
    case 'student-info-update':
      currentPage = riot.mount('div#view', 'student-info-update')[0];
      break;
    case 'id-card':
      currentPage = riot.mount('div#view', 'id-card')[0];
      break;
    case 'id-signature':
      currentPage = riot.mount('div#view', 'id-signature')[0];
      break;
    /*===========qadir start ==========*/
    case 'receive-fees':
      currentPage = riot.mount('div#view', 'receive-fees', { selected_master: path1 })[0];
      switch (path2) {
        case 'receive-fees':
          riot.mount("div#setting-view", 'receive-fees');
          break;
      }
      break;
    case 'fees-withdraw':
      currentPage = riot.mount('div#view', 'fees-withdraw')[0];
      break;

    case 'fee-bill':
      currentPage = riot.mount('div#view', 'bill', { selected_master: path2 })[0];
      console.log("currentPage = ");
      console.log(currentPage);
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
    case 'fees-report':
      currentPage = riot.mount('div#view', 'fees-report', { selected_master: path2 })[0];
      console.log("currentPage = ");
      console.log(currentPage);
      switch (path2) {
        case 'month-wise':
          riot.mount("div#fees-report-view", 'month-wise');
          break;
        case 'daily-collection':
          riot.mount("div#fees-report-view", 'daily-collection');
          break;
        case 'daily-register':
          riot.mount("div#fees-report-view", 'daily-register');
          break;
        case 'bank-wise':
          riot.mount("div#fees-report-view", 'bank-wise');
          break;
        case 'date-wise':
          riot.mount("div#fees-report-view", 'date-wise');
          break;
        case 'head-wise-summary':
          riot.mount("div#fees-report-view", 'head-wise-summary');
          break;
        case 'head-wise':
          riot.mount("div#fees-report-view", 'head-wise');
          break;
        case 'outstanding-fees':
          riot.mount("div#fees-report-view", 'outstanding-fees');
          break;
        case 'outstanding-fees-class':
          riot.mount("div#fees-report-view", 'outstanding-fees-class');
          break;
        case 'due-by-class':
          riot.mount("div#fees-report-view", 'due-by-class');
          break;
        case 'fees-collection-summary':
          riot.mount("div#fees-report-view", 'fees-collection-summary');
          break;
        case 'fees-collection-summary':
          riot.mount("div#fees-report-view", 'fees-collection-summary');
          break;
        case 'estimated-fees':
          riot.mount("div#fees-report-view", 'estimated-fees');
          break;
        case 'advance-by-class':
          riot.mount("div#fees-report-view", 'advance-by-class');
          break;
        case 'advance-fees':
          riot.mount("div#fees-report-view", 'advance-fees');
          break;
        case 'scholarship-list':
          riot.mount("div#fees-report-view", 'scholarship-list');
          break;
        case 'issued-letter':
          riot.mount("div#fees-report-view", 'issued-letter');
          break;
        case 'fees-scheme-report':
          riot.mount("div#fees-report-view", 'fees-scheme-report');
          break;
        case 'fees-scheme-assigned':
          riot.mount("div#fees-report-view", 'fees-scheme-assigned');
          break;
        case 'fees-scheme-unassigned':
          riot.mount("div#fees-report-view", 'fees-scheme-unassigned');
          break;
        default:
          riot.mount("div#fees-report-view", 'month-wise');
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
    /*==============qadir end ======*/
    case 'alumni-setting':
      currentPage = riot.mount('div#view', 'alumni-setting', { selected_master: path2 })[0];
      switch (path2) {
        case 'alumni':
          riot.mount("div#alumni-setting-view", 'alumni');
          break;
        case 'aprrove-alumni':
          riot.mount("div#alumni-setting-view", 'aprrove-alumni');
          break;
        default:
          riot.mount("div#alumni-setting-view", 'alumni');
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
    case 'activity-report':
      currentPage = riot.mount('div#view', 'activity-report', { selected_master: path2 })[0];
      switch (path2) {
        case 'activity-date-wise-report':
          riot.mount("div#activity-report-view", 'activity-date-wise-report');
          break;
        case 'activity-session-wise-report':
          riot.mount("div#activity-report-view", 'activity-session-wise-report');
          break;
        case 'activity-event-wise-report':
          riot.mount("div#activity-report-view", 'activity-event-wise-report');
          break;
        case 'activity-student-event-report':
          riot.mount("div#activity-report-view", 'activity-student-event-report');
          break;
        case 'activity-event-wise-graph-report':
          riot.mount("div#activity-report-view", 'activity-event-wise-graph-report');
          break;
        default:
          riot.mount("div#activity-report-view", 'activity-date-wise-report');
      }
      break;
    case 'employee-notification':
      currentPage = riot.mount('div#view', 'employee-notification')[0];
      break;
    case 'student-notification':
      currentPage = riot.mount('div#view', 'student-notification')[0];
      break;
    case 'student':
      currentPage = riot.mount('div#view', 'student')[0];
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
    case 'analysis-report':
      currentPage = riot.mount('div#view', 'analysis-report', { selected_master: path2 })[0];
      switch (path2) {
        case 'assessment-report':
          riot.mount("div#analysis-report-view", 'assessment-report');
          break;
        case 'yearly-section-wise-comparison-report':
          riot.mount("div#analysis-report-view", 'yearly-section-wise-comparison-report');
          break;
        case 'yearly-class-wise-comparison-report':
          riot.mount("div#analysis-report-view", 'yearly-class-wise-comparison-report');
          break;
        case 'yearly-class-wise-subject-avg-report':
          riot.mount("div#analysis-report-view", 'yearly-class-wise-subject-avg-report');
          break;
        case 'consolidate-tabulation-sheet-report':
          riot.mount("div#analysis-report-view", 'consolidate-tabulation-sheet-report');
          break;
        case 'promotion-sheet-report':
          riot.mount("div#analysis-report-view", 'promotion-sheet-report');
          break;
        case 'subject-wise-failure-report':
          riot.mount("div#analysis-report-view", 'subject-wise-failure-report');
          break;
        case 'student-wise-subject-failure-report':
          riot.mount("div#analysis-report-view", 'student-wise-subject-failure-report');
          break;
        default:
          riot.mount("div#analysis-report-view", 'assessment-report');
      }
      break;
    //tarique
    case 'staff':
      riot.mount("div#view", 'staff');
      break;
    case 'career-setting':
      currentPage = riot.mount('div#view', 'career-setting', { selected_master: path2 })[0];
      switch (path2) {
        case 'applicant-detail':
          riot.mount("div#career-setting-view", 'applicant-detail');
          break;
        case 'career-interview':
          riot.mount("div#career-setting-view", 'career-interview');
          break;
        case 'interviewed-candidate':
          riot.mount("div#career-setting-view", 'interviewed-candidate');
          break;
        case 'career-report':
          riot.mount("div#career-setting-view", 'career-report');
          break;
        default:
          riot.mount("div#career-setting-view", 'applicant-detail');
      }
      break;
    case 'ex-staff':
      riot.mount("div#view", 'ex-staff');
      break;
    case 'approve-staff-profile':
      riot.mount("div#view", 'approve-staff-profile');
      break;
    case 'browse-staff':
      riot.mount("div#view", 'browse-staff');
      break;
    case 'staff-type-report':
      riot.mount("div#view", 'staff-type-report');
      break;
    case 'staff-gender-report':
      riot.mount("div#view", 'staff-gender-report');
      break;
    case 'student-search':
      riot.mount("div#view", 'student-search');
      break;
    case 'student-browser':
      riot.mount("div#view", 'student-browser');
      break;
    case 'occupation-report':
      riot.mount("div#view", 'occupation-report');
      break;
    case 'birthday':
      riot.mount("div#view", 'birthday');
      break;
    case 'attendance-entry':
      riot.mount("div#view", 'attendance-entry');
      break;
    case 'daily-attendance':
      riot.mount("div#view", 'daily-attendance');
      break;
    case 'monthly-attendance':
      riot.mount("div#view", 'monthly-attendance');
      break;
    case 'admin-report':
      currentPage = riot.mount('div#view', 'admin-report', { selected_admin_report: path2 })[0];
      switch (path2) {
        case 'student-summary-report':
          riot.mount("div#admin-report-view", 'student-summary-report');
          break;
        case 'student-strength-report':
          riot.mount("div#admin-report-view", 'student-strength-report');
          break;
        case 'student-category-summary-report':
          riot.mount("div#admin-report-view", 'student-category-summary-report');
          break;
        case 'student-category-strength-report':
          riot.mount("div#admin-report-view", 'student-category-strength-report');
          break;
        case 'student-religion-strength-report':
          riot.mount("div#admin-report-view", 'student-religion-strength-report');
          break;
        case 'student-group-report':
          riot.mount("div#admin-report-view", 'student-group-report');
          break;
        case 'student-house-report':
          riot.mount("div#admin-report-view", 'student-house-report');
          break;
        case 'student-class-teacher-report':
          riot.mount("div#admin-report-view", 'student-class-teacher-report');
          break;
        case 'student-blood-group-report':
          riot.mount("div#admin-report-view", 'student-blood-group-report');
          break;
        case 'udise-report':
          riot.mount("div#admin-report-view", 'udise-report');
          break;
        case 'new-admission-report':
          currentPage = riot.mount('div#admin-report-view', 'new-admission-report', { selected_new_admission_report: path3 })[0];
          switch (path3) {

            case 'new-admission-category-report':
              riot.mount("div#new-admission-report-view", 'new-admission-category-report');
              break;
            case 'new-admission-list-report':
              riot.mount("div#new-admission-report-view", 'new-admission-list-report');
              break;
            default:
              riot.mount("div#new-admission-report-view", 'new-admission-category-report');

          }
          break;
        default:
          riot.mount("div#admin-report-view", 'student-summary-report');
      }
      break;

    case 'inventory-stock':
      currentPage = riot.mount('div#view', 'inventory-stock')[0];
      break;
    case 'inventory-sale':
      currentPage = riot.mount('div#view', 'inventory-sale')[0];
      break;
    case 'inventory-issue':
      currentPage = riot.mount('div#view', 'inventory-issue')[0];
      break;
    case 'inventory-returnable':
      currentPage = riot.mount('div#view', 'inventory-returnable')[0];
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
    case 'inventory-report':
      currentPage = riot.mount('div#view', 'inventory-report', { selected_inventory_report: path2 })[0];
      switch (path2) {
        case 'inventory-received-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-received-goods-report');
          break;
        case 'inventory-issued-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-issued-goods-report');
          break;
        case 'inventory-person-wise-issued-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-person-wise-issued-goods-report');
          break;
        case 'inventory-item-wise-issued-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-item-wise-issued-goods-report');
          break;
        case 'inventory-sales-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-sales-goods-report');
          break;
        case 'inventory-return-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-return-goods-report');
          break;
        default:
          riot.mount("div#inventory-report-view", 'inventory-received-goods-report');
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
        case 'category':
          riot.mount("div#master-view", 'category');
          break;
        case 'subject':
          riot.mount("div#master-view", 'subject');
          break;
        case 'class-teacher-master':
          riot.mount("div#master-view", 'class-teacher-master');
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
        case 'activate-session':
          riot.mount("div#master-view", 'activate-session');
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

    case 'certificate':
      currentPage = riot.mount('div#view', 'certificate', { selected_certificate: path2 })[0];
      switch (path2) {
        case 'issue-certificate':
          riot.mount("div#certificate-view", 'issue-certificate');
          break;
        case 'manage-certificate':
          riot.mount("div#certificate-view", 'manage-certificate');
          break;
        case 'issued-certificate':
          riot.mount("div#certificate-view", 'issued-certificate');
          break;
        default:
          riot.mount("div#certificate-view", 'issue-certificate');
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
        case 'infirmary-lab-test':
          riot.mount("div#infirmary-view", 'infirmary-lab-test');
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
            case 'infirmary-student-class-wise-report':
              riot.mount("div#infirmary-student-report-view", 'infirmary-student-class-wise-report');
              break;
            case 'infirmary-student-case-wise-report':
              riot.mount("div#infirmary-student-report-view", 'infirmary-student-case-wise-report');
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
console.log("===========");
console.log(getCookie('role'));
console.log("===========");

route.stop();
route.start(true);

if (getCookie('role') == 'ADMIN') {
  route(adminRoute);
} else if (getCookie('role') == 'Teacher') {
  console.log("teacherRoute");
  route(teacherRoute);
} else if (getCookie('role') == 'Class Teacher') {
  console.log("class teacher route");
  route(classTeacherRoute);
} else if (getCookie('role') == 'Activity') {
  console.log("activity route");
  route(activityRoute);
} else if (getCookie('role') == 'Career') {
  console.log("career route");
  route(careerRoute);
} else if (getCookie('role') == 'Mentor') {
  console.log("Mentor route");
  route(mentorRoute);
} else if (getCookie('role') == 'Admission') {
  console.log("admission route");
  route(admissionRoute);
} else if (getCookie('role') == 'Discipline') {
  console.log("Discipline route");
  route(disciplineRoute);
} else if (getCookie('role') == 'Store') {
  console.log("showInventoryNavItems route");
  route(inventoryRoute);
} else if (getCookie('role') == 'Infirmary') {
  console.log("showInfirmaryNavItems route");
  route(infirmaryRoute);
} else {
  console.log("unable to access");
  route(loginRoute);
  route("/login");
  // window.location.reload(true);
}
//route(adminRoute);

// riot.route.stop()
// riot.route.start(true)
// riot.route(goTo);
function ActivatesessionStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.sessions = [];

  self.on('read_session', function () {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    $.ajax({
      url: '/activate_session/read_session',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sessions = data.sessions;
          self.trigger('read_session_changed', data.sessions);
        } else if (data.status == 'e') {
          showToast("Session Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('current_session', function (session_id) {
    $.ajax({
      url: '/activate_session/current_session/' + session_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          toastr.info("Session Marked Successfully");
          self.trigger('current_session_changed', self.sessions);
        } else if (data.status == 'e') {
          showToast("Error in Marked Current Session. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ActivityCategoryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.categories = [];

  self.on('csv_export_activity_category', function () {
    let req = {};
    $.ajax({
      url: '/activity_category/csv_export_activity_category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_activity_category_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_categories', function () {
    console.log('i am in read_courses api call from ajax');
    let req = {};
    $.ajax({
      url: '/activity_category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempCategories = self.categories.filter(c => {
            return c.category_id != category_id;
          });
          self.categories = tempCategories;
          toastr.info("Category Deleted Successfully");
          self.trigger('categories_changed', self.categories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Category. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_category', function (category_name, category_id) {
    let req = {};
    req.category_name = category_name;
    req.category_id = category_id;
    $.ajax({
      url: '/activity_category/edit/' + category_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.categories = self.categories.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_category', function (category_name) {
    let req = {};
    req.category_name = category_name;
    $.ajax({
      url: '/activity_category/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add category after');
          let obj = {};
          obj.category_id = data.category_id;
          obj.category_name = category_name;
          self.categories = [obj, ...self.categories];
          toastr.success("Category Inserserted Successfully ");
          self.trigger('categories_changed', self.categories);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ActivityEventStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.events = [];

  self.on('csv_export_activity_event', function () {
    console.log('i am in csv_export_department api call from ajax');
    let req = {};
    $.ajax({
      url: '/activity_event/csv_export_activity_event',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_activity_event_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_categories', function () {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    $.ajax({
      url: '/activity_event',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_events', function () {
    console.log('i am in read_events api call from ajax');
    let req = {};
    $.ajax({
      url: '/activity_event/read_event',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.events = data.events;
          self.trigger('read_event_changed', data.events);
        } else if (data.status == 'e') {
          showToast("Events Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempEvents = self.events.filter(c => {
            return c.event_id != event_id;
          });
          self.events = tempEvents;
          toastr.info("Event Deleted Successfully");
          self.trigger('delete_event_changed', self.events);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_event', function (event_name, category_id, event_id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.events = self.events.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_event', function (event_name, category_id) {
    let req = {};
    req.event_name = event_name;
    req.category_id = category_id;
    $.ajax({
      url: '/activity_event/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add event after');
          let obj = {};
          obj.event_id = data.event_id;
          obj.event_name = event_name;
          obj.category_id = category_id;
          self.events = [obj, ...self.events];
          toastr.success("Event Inserserted Successfully ");
          self.trigger('add_event_changed', self.events);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ActivityItemStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.items = [];

  self.on('csv_export_activity_item', function () {
    console.log('i am in csv_export_department api call from ajax');
    let req = {};
    $.ajax({
      url: '/activity_item/csv_export_activity_item',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {

          self.trigger('csv_export_activity_item_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_items', function () {
    console.log('i am in read_courses api call from ajax');
    let req = {};
    $.ajax({
      url: '/activity_item',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.items = data.items;
          self.trigger('items_changed', data.items);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempItems = self.items.filter(c => {
            return c.item_id != item_id;
          });
          self.items = tempItems;
          toastr.info("Item Deleted Successfully");
          self.trigger('items_changed', self.items);
        } else if (data.status == 'e') {
          showToast("Error Deleting Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_item', function (item_name, item_id) {
    let req = {};
    req.item_name = item_name;
    req.item_id = item_id;
    $.ajax({
      url: '/activity_item/edit/' + item_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.items = self.items.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_item', function (item_name) {
    let req = {};
    req.item_name = item_name;
    $.ajax({
      url: '/activity_item/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add item after');
          let obj = {};
          obj.id = data.id;
          obj.item_name = item_name;
          self.items = [obj, ...self.items];
          toastr.success("Item Inserserted Successfully ");
          self.trigger('items_changed', self.items);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ActivityReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  /*self.case_wise_reports = []*/

  self.on('read_activity_date_wise_report', function (obj) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    req.activity_type = obj.activity_type;
    $.ajax({
      url: '/activity_report/read_activity_date_wise_report/' + obj.start_date + '/' + obj.end_date + '/' + obj.activity_type,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.activity_date_wise_report = data.activity_date_wise_report;
          self.trigger('read_activity_date_wise_report_changed', self.activity_date_wise_report);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_activity_date_wise_report', function (obj) {
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    req.activity_type = obj.activity_type;
    $.ajax({
      url: '/activity_report/csv_activity_date_wise_report/' + obj.start_date + '/' + obj.end_date + '/' + obj.activity_type,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_activity_date_wise_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_activity_session_wise_report', function (activity_type, session_id) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.activity_type = activity_type;
    req.session_id = session_id;
    $.ajax({
      url: '/activity_report/read_activity_session_wise_report/' + activity_type + '/' + session_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.activity_session_wise_report = data.activity_session_wise_report;
          self.trigger('read_activity_session_wise_report_changed', self.activity_session_wise_report);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_activity_session_wise_report', function (activity_type, session_id) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.activity_type = activity_type;
    req.session_id = session_id;
    $.ajax({
      url: '/activity_report/csv_activity_session_wise_report/' + activity_type + '/' + session_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_activity_session_wise_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_activity_event_wise_report', function (activity_type, event_id) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.activity_type = activity_type;
    req.event_id = event_id;
    $.ajax({
      url: '/activity_report/read_activity_event_wise_report/' + activity_type + '/' + event_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.activity_event_wise_report = data.activity_event_wise_report;
          self.trigger('read_activity_event_wise_report_changed', self.activity_event_wise_report);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_activity_event_wise_report', function (activity_type, event_id) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.activity_type = activity_type;
    req.event_id = event_id;
    $.ajax({
      url: '/activity_report/csv_activity_event_wise_report/' + activity_type + '/' + event_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_activity_event_wise_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_activity_event_wise_graph_report', function (activity_type, session_id) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.activity_type = activity_type;
    req.session_id = session_id;
    $.ajax({
      url: '/activity_report/read_activity_event_wise_graph_report/' + activity_type + '/' + session_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_activity_event_wise_graph_report_changed', data.activity_event_wise_graph_report, data.grand_total);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_activity_event_wise_graph_report', function (activity_type, session_id) {
    let req = {};
    req.activity_type = activity_type;
    req.session_id = session_id;
    $.ajax({
      url: '/activity_report/csv_activity_event_wise_graph_report/' + activity_type + '/' + session_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_activity_event_wise_graph_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_student_event_report', function (obj) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/activity_report/read_student_event_report/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.student_event_report = data.student_event_report;
          self.trigger('read_student_event_report_changed', self.student_event_report);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_student_event_report', function (obj) {
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/activity_report/csv_student_event_report/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_student_event_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_session', function () {
    console.log('i am in read_session api call from ajax');
    let req = {};
    $.ajax({
      url: '/activity_report/read_session/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sessions = data.sessions;
          self.trigger('read_session_changed', data.sessions);
        } else if (data.status == 'e') {
          showToast("Session Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_event', function () {
    console.log('i am in read_session api call from ajax');
    let req = {};
    $.ajax({
      url: '/activity_report/read_event/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.events = data.events;
          self.trigger('read_event_changed', data.events);
        } else if (data.status == 'e') {
          showToast("Event Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ActivityStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.events = [];

  self.on('read_activity_categories', function () {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    $.ajax({
      url: '/activity_detail',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_activity_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_activity_event', function () {
    let req = {};

    $.ajax({
      url: '/activity_detail/read_activity_event',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_activity_event_changed', data.activity_event);
        } else if (data.status == 'e') {
          showToast("Event Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_activity_by_category', function (obj) {
    console.log('i am in read_activity_by_category api call from ajax');
    let req = {};
    req.category_id = obj.category_id;
    $.ajax({
      url: '/activity_detail/read_activity_by_category/' + obj.category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.activities = data.activities;
          self.trigger('read_activity_by_category_changed', data.activities, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Activities Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_activity', function (obj) {
    console.log('i am in csv_export_activity api call from ajax');
    let req = {};
    req.category_id = obj.category_id;
    $.ajax({
      url: '/activity_detail/csv_export_activity/' + obj.category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_activity_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_print_event_detail', function (activity_id) {
    console.log('i am in read_data_for_update api call from ajax');
    console.log(activity_id);
    let req = {};
    $.ajax({
      url: '/activity_detail/read_print_event_detail/' + activity_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_print_event_detail_changed', data.print_event_detail, data.teacher);
        } else if (data.status == 'e') {
          showToast("Events Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_items', function () {
    console.log('i am in read_events_by_category api call from ajax');
    let req = {};
    $.ajax({
      url: '/activity_detail/read_item',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.items = data.items;
          self.trigger('read_items_changed', data.items);
        } else if (data.status == 'e') {
          showToast("Events Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_staff', function () {
    console.log('i am in read_events_by_category api call from ajax');
    let req = {};
    $.ajax({
      url: '/activity_detail/read_staff',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_staff_changed', data.staff);
        } else if (data.status == 'e') {
          showToast("Staff Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_activity', function (obj) {
    console.log(obj);
    $.ajax({
      url: '/activity_detail/add',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add activity after');
          toastr.success("Successfully Inserted");
          self.trigger('add_activity_changed', self.activities);
        } else if (data.status == 'e') {
          showToast("Error adding Employee. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_activity', function (obj, activity_id) {
    let req = {};
    console.log(obj);
    console.log(activity_id);
    req.activity_id = activity_id;
    $.ajax({
      url: '/activity_detail/edit_activity/' + activity_id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Update");
          self.trigger('edit_activity_changed');
        } else if (data.status == 'e') {
          showToast("Error Updating Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_data_for_update', function (activity_id) {
    console.log('i am in read_data_for_update api call from ajax');
    console.log(activity_id);
    let req = {};
    $.ajax({
      url: '/activity_detail/read_update_activity/' + activity_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.update_activity = data.update_activity;
          self.trigger('read_data_for_update_changed', data.update_activity, data.employees, data.techer_in_charge);
        } else if (data.status == 'e') {
          showToast("Events Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/activity_detail/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/activity_detail/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('delete_activity', function (activity_id) {
    $.ajax({
      url: '/activity_detail/delete_activity/' + activity_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          /*let tempcaseDetails = self.delete_case_details.filter(c => {
            return c.id != id
          })
          self.delete_case_details = tempcaseDetails*/
          toastr.success("Successfully Deleted");
          self.trigger('delete_activity_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Activity. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_students', function (activity_id, standard_id, section_id) {
    let req = {};
    $.ajax({
      url: '/activity_detail/students/' + activity_id + '/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_students_changed', data.freeStudents, data.assignedStudents);
        } else if (data.status == 'e') {
          showToast("House Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('assign_students', function (activity_id, students) {
    var obj = {};
    obj['activity_id'] = activity_id;
    obj['students'] = students;
    $.ajax({
      url: '/activity_detail/assign_students/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Students assigned successfully ");
          self.trigger('assign_students_changed', students);
        } else if (data.status == 'e') {
          showToast("Error assigning students. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('free_up_student', function (activity_id, students) {
    var obj = {};
    obj['activity_id'] = activity_id;
    obj['students'] = students;
    $.ajax({
      url: '/activity_detail/free_up_student/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {

          toastr.success("Students freed successfully ");
          self.trigger('assign_students_changed', students);
        } else if (data.status == 'e') {
          showToast("Error while free up students. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function AdminReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  /*
    self.on('read_by_field', function(roll_no,student_name,reg_number,f_name,m_name) {
       let req = {}
       req.roll_no=roll_no
       req.student_name=student_name
       req.reg_number=reg_number
       req.f_name=f_name
       req.m_name=m_name
      $.ajax({
        url:'/studentSearch/read_by_field',
          type:"POST",
          data: JSON.stringify(req),
          contentType: "application/json",
          dataType:"json",
          headers: {"Authorization": getCookie('token')},
          success: function(data){
            console.log(data)
            if(data.status == 's'){
               self.searchStudents=data.searchStudents
              toastr.success("Successfully Inserted")
              self.trigger('read_by_field_change', self.searchStudents)
            }else if(data.status == 'e'){
              showToast("Error search Student. Please try again.", data)
            }
          },
          error: function(data){
            showToast("", data)
          }
        })
    })
  */

  //read Student Family Occupation
  self.on('read_occupation', function () {
    let req = {};
    $.ajax({
      url: '/admin_report/read_occupation/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.parentOccupations = data.parentOccupations;
          self.trigger('read_occupation_changed', data.parentOccupations);
        } else if (data.status == 'e') {
          showToast("Occuaption Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //Read Occupation Report

  self.on('read_occupation_report', function (occupation) {
    let req = {};
    $.ajax({
      url: '/admin_report/read_occupation_report/' + occupation,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.occupationReports = data.occupationReports;
          self.trigger('read_occupation_report_change', data.occupationReports);
        } else if (data.status == 'e') {
          showToast("Occuaption Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //read Student Family Occupation
  self.on('read_student_summary_report', function () {
    let req = {};
    $.ajax({
      url: '/admin_report/read_student_summary_report',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside report");
          self.studentSummaryReports = data.studentSummaryReports;
          self.session_name = data.session_name;
          // console.log(self.studentSummaryReports[0])
          self.trigger('read_student_summary_report_changed', self.studentSummaryReports, self.session_name);
        } else if (data.status == 'e') {
          showToast("Student Summary Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('csv_export_student_summary_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/admin_report/csv_export_student_summary_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_student_summary_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });
  //read Student strength 
  self.on('read_student_strength_report', function () {
    let req = {};
    $.ajax({
      url: '/admin_report/read_student_strength_report',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside report");
          self.studentStrengthReports = data.studentStrengthReports;
          self.session_name = data.session_name;
          // console.log(self.studentStrengthReports[0])
          self.trigger('read_student_strength_report_changed', self.studentStrengthReports, self.session_name);
        } else if (data.status == 'e') {
          showToast("Student Strength Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_student_strength_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/admin_report/csv_export_student_strength_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_student_strength_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  //student category summary report
  self.on('read_student_category_summary_report', function (categories) {
    let req = {};
    req.categories = categories;
    $.ajax({
      url: '/admin_report/read_student_category_summary_report',
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      type: "POST",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside report");
          self.studentCategorySummaryReports = data.studentCategorySummaryReports;
          self.session_name = data.session_name;
          console.log(self.studentCategorySummaryReports);
          self.trigger('read_student_category_summary_report_changed', self.studentCategorySummaryReports, self.session_name);
        } else if (data.status == 'e') {
          showToast("Student Category Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_student_category_summary_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/admin_report/csv_export_student_category_summary_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_student_category_summary_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  //student category Strength report
  self.on('read_student_category_strength_report', function (category_id) {
    let req = {};
    $.ajax({
      url: '/admin_report/read_student_category_strength_report/' + category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside report");
          self.studentCategoryStrengthReports = data.studentCategoryStrengthReports;
          self.session_name = data.session_name;
          console.log(self.studentCategoryStrengthReports);
          self.trigger('read_student_category_strength_report_changed', self.studentCategoryStrengthReports, self.session_name);
        } else if (data.status == 'e') {
          showToast("Student Category Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_student_category_strength_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/admin_report/csv_export_student_category_strength_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_student_category_strength_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  // student  religion listing

  self.on('read_student_religion_listing_report', function () {
    let req = {};
    $.ajax({
      url: '/admin_report/read_student_religion_listing_report',
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      type: "POST",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside report");
          self.studentReligionListingReports = data.studentReligionListingReports;
          self.session_name = data.session_name;
          console.log(self.studentReligionListingReports);
          self.trigger('read_student_religion_listing_report_changed', self.studentReligionListingReports, self.session_name);
        } else if (data.status == 'e') {
          showToast("Student Religion Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('csv_export_student_religion_listing_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/admin_report/csv_export_student_religion_listing_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_student_religion_listing_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });
  // student  Blood Grooup listing

  self.on('read_student_blood_group_listing_report', function () {
    let req = {};
    $.ajax({
      url: '/admin_report/read_student_blood_group_listing_report',
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      type: "POST",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside report");
          self.session_name = data.session_name;
          self.studentBloodGroupListingReports = data.studentBloodGroupListingReports;

          /*  var map = {
               'A+'  : "A_plus",
               'A-'  : "A_min",
               'AB+' : "AB_plus",
               'AB-' : "AB_min",
               'B+'  : "B_plus",
               'B-'  : "B_min",
               'O+'  : "O_plus",
               'O-'  : "O_min"
             } 
             
                var tab = {
                   abc:1,
                   def:40,
                   xyz: 50
                 }
                   var map = {
                     abc : "newabc",
                     def : "newdef",
                     xyz : "newxyz"
                 }
                  for (var [key, value] of tab) {
                     key = map[key] || key;
                     tab[key] = value;
                     console.log(tab)   
                 };*/

          /*    for (var [key, value] of  self.studentBloodGroupListingReports) {
                  console.log(key + ' = ' + value);
                    key = map[key] || key;
                   self.studentBloodGroupListingReports[key] = value;
                }*/
          /* self.studentBloodGroupListingReports.map( => {
               key = map[key] || key;
               self.studentBloodGroupListingReports[key] = value;
           })
          */
          /* self.studentBloodGroupListingReports.map(value, key) {
                key.replace(/\+/g,' ')
                self.studentBloodGroupListingReports[key] = value;
            };*/

          console.log(self.studentBloodGroupListingReports);
          self.trigger('read_student_blood_group_listing_report_changed', self.studentBloodGroupListingReports, self.session_name);
        } else if (data.status == 'e') {
          showToast("Student Blood Group Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_student_blood_group_listing_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/admin_report/csv_export_student_blood_group_listing_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_student_blood_group_listing_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  //stdent Group Report

  self.on('read_student_group_report', function (standard_id, section_id) {
    let req = {};
    $.ajax({
      url: '/admin_report/read_student_group_report/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside report");
          self.studentGroupReports = data.studentGroupReports;
          var grandTotal = 0;
          self.studentGroupReports.map(i => {
            grandTotal = Number(grandTotal) + Number(i.total);
          });
          self.trigger('read_student_group_report_change', self.studentGroupReports, grandTotal);
        } else if (data.status == 'e') {
          showToast("Student Group Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('csv_export_student_group_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/admin_report/csv_export_student_group_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_student_group_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  // read Udise Report

  self.on('read_udise_report', function (standard_id, section_id, sesion_id) {
    let req = {};
    $.ajax({
      url: '/admin_report/read_udise_report/' + standard_id + '/' + section_id + '/' + sesion_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside udise report");
          self.udiseReports = data.udiseReports;
          self.trigger('read_udise_report_change', self.udiseReports);
        } else if (data.status == 'e') {
          showToast("UdiseReport Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // read Udise Report

  self.on('read_session', function () {
    let req = {};
    $.ajax({
      url: '/admin_report/read_session',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside session");
          self.sessions = data.sessions;
          self.trigger('read_session_change', self.sessions);
        } else if (data.status == 'e') {
          showToast("session name Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //stdent House Report

  self.on('read_student_house_report', function (standard_id, section_id) {
    let req = {};
    $.ajax({
      url: '/admin_report/read_student_house_report/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside report");
          self.session_name = data.session_name;
          self.studentHouseReports = data.studentHouseReports;
          var grandTotal = 0;
          self.studentHouseReports.map(i => {
            grandTotal = Number(grandTotal) + Number(i.total);
          });
          self.trigger('read_student_house_report_change', self.studentHouseReports, grandTotal, self.session_name);
        } else if (data.status == 'e') {
          showToast("Student House Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_student_house_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/admin_report/csv_export_student_house_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_student_house_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  //stdent Class Teacher Report

  self.on('read_class_teacher_report', function () {
    let req = {};
    $.ajax({
      url: '/admin_report/read_class_teacher_report',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside report");
          self.studentClassTeacherReports = data.studentClassTeacherReports;
          self.session_name = data.session_name;
          console.log(self.studentClassTeacherReports);
          self.trigger('read_class_teacher_report_change', self.studentClassTeacherReports, self.session_name);
        } else if (data.status == 'e') {
          showToast("Student Class teacher Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_student_class_teacher_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/admin_report/csv_export_student_class_teacher_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_student_class_teacher_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  // new stdent list report

  self.on('read_new_student_list_report', function () {
    let req = {};
    $.ajax({
      url: '/admin_report/read_new_student_list_report',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside report");
          self.session_name = getCookie('session_name');
          self.newStudentListReports = data.newStudentListReports;
          console.log(self.newStudentListReports);
          self.trigger('read_new_student_list_report_changed', self.newStudentListReports, self.session_name);
        } else if (data.status == 'e') {
          showToast("Student List Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_new_student_list_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/admin_report/csv_export_new_student_list_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_new_student_list_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  //read new student caTEGORY REPORT
  self.on('read_new_student_category_report', function () {
    let req = {};
    $.ajax({
      url: '/admin_report/read_new_student_category_report',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.session_name = data.session_name;
          self.newStudentCategoryReports = data.newStudentCategoryReports;
          self.trigger('read_new_student_category_report_changed', self.newStudentCategoryReports, self.session_name);
        } else if (data.status == 'e') {
          showToast("New Student Category Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function AlumniStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_alumni', function () {
    console.log('i am in read_courses api call from ajax');
    let req = {};
    $.ajax({
      url: '/alumni/read_alumni',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_alumni_changed', data.alumni);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_approved_alumni_csv', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/alumni/read_approved_alumni_csv',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_approved_alumni_csv_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_alumni_csv', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/alumni/read_alumni_csv',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_alumni_csv_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_approved_alumni', function () {
    console.log('i am in read_courses api call from ajax');
    let req = {};
    $.ajax({
      url: '/alumni/read_approved_alumni',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_approved_alumni_changed', data.alumni);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('approved_alumni', function (approval_date, fees, alumni_id) {
    let req = {};

    $.ajax({
      url: '/alumni/approved_alumni/' + approval_date + '/' + fees + '/' + alumni_id,
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Approved");
          self.trigger('approved_alumni_changed');
        } else if (data.status == 'e') {
          showToast("Error Updating Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_for_edit_alumni', function (alumni_id) {
    let req = {};

    $.ajax({
      url: '/alumni/read_for_edit_alumni/' + alumni_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_for_edit_alumni_changed', data.alumni_details);
        } else if (data.status == 'e') {
          showToast("Error Updating Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_alumni', function (obj, alumni_id) {
    let req = {};
    req.alumni_id = alumni_id;
    $.ajax({
      url: '/alumni/edit_alumni/' + alumni_id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Update");
          self.trigger('edit_alumni_changed');
        } else if (data.status == 'e') {
          showToast("Error Updating Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_alumni', function (alumni_id) {
    let req = {};
    req.alumni_id = alumni_id;

    $.ajax({
      url: '/alumni/delete_alumni/' + alumni_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          /*let tempstudents = self.students.filter(c => {
            return c.student_id != student_id
          })
          self.students = tempstudents*/
          toastr.info("Successfully Deleted");
          self.trigger('delete_alumni_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Alumni. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_alumni_profile', function (alumni_id) {
    let req = {};
    $.ajax({
      url: '/alumni/read_alumni_profile/' + alumni_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_alumni_profile_changed', data.alumni_profile_details);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function AnalysisReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_standard', function () {
    let req = {};
    $.ajax({
      url: '/student/read_standard/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Standard Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('read_subjects', function (standard_id) {
    let req = {};
    $.ajax({
      url: '/yearly_section_wise_comparison_report/read_subjects/' + standard_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_subjects_changed', data.subjects);
        } else if (data.status == 'e') {
          showToast("Standard Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('read_subjects_for_yearly_class_wise_comparison_report', function () {
    let req = {};
    $.ajax({
      url: '/yearly_class_wise_comparison_report/read_subjects_for_yearly_class_wise_comparison_report/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_subjects_for_yearly_class_wise_comparison_report_changed', data.subjects);
        } else if (data.status == 'e') {
          showToast("Standard Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/student/read_section/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_exam_types', function (standard_id) {
    $.ajax({
      url: '/assessment_report/exam-type/' + standard_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('exam_types_changed', data.examTypes);
        } else if (data.status == 'e') {
          showToast("Exam Type Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('subjects_changed', data.subjects);
        } else if (data.status == 'e') {
          showToast("Subjects Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_assessment_report', function (obj) {
    $.ajax({
      url: '/assessment_report/read_assessment_report',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_assessment_report_changed', data.sections, data.subjects, data.graphData);
        } else if (data.status == 'e') {
          showToast("Error Read Assessment Report. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_year_wise_class_subject_avg_report', function (standard_id, term_id) {
    $.ajax({
      url: '/yearly_class_wise_subject_avg_report/read_year_wise_class_subject_avg_report/' + standard_id + '/' + term_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_year_wise_class_subject_avg_report_changed', data.sessions, data.subjects, data.graphData);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_yearly_section_wise_comparison_report', function (obj) {
    $.ajax({
      url: '/yearly_section_wise_comparison_report/read_yearly_section_wise_comparison_report',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_yearly_section_wise_comparison_report_changed', data.sections, data.sessions, data.graphData);
        } else if (data.status == 'e') {
          showToast("Error Read Assessment Report. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_yearly_class_wise_comparison_report', function (obj) {
    $.ajax({
      url: '/yearly_class_wise_comparison_report/read_yearly_class_wise_comparison_report',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_yearly_class_wise_comparison_report_changed', data.sections, data.sessions, data.graphData);
        } else if (data.status == 'e') {
          showToast("Error Read Assessment Report. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_consolidate_tabulation_sheet_report', function (obj) {
    $.ajax({
      url: '/consolidate_tabulation_sheet_report/read_consolidate_tabulation_sheet_report',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_consolidate_tabulation_sheet_report_changed', data.headers, data.reports, data.class_teacher);
        } else if (data.status == 'e') {
          showToast("Error Read Assessment Report. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('read_subject_wise_failure_report', function (obj) {
    $.ajax({
      url: '/subject_wise_failure_report/read_subject_wise_failure_report',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_subject_wise_failure_report_changed', data.report_data);
        } else if (data.status == 'e') {
          showToast("Error Read Assessment Report. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('read_student_wise_subject_failure_report', function (obj) {
    $.ajax({
      url: '/student_wise_subject_failure_report/read_student_wise_subject_failure_report',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_student_wise_subject_failure_report_changed', data.subject_marks);
        } else if (data.status == 'e') {
          showToast("Error Read Assessment Report. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*promotion Sheet*/

  // self.on('read_exam_types_promotion_sheet', function(standard_id) {
  //   $.ajax({
  //     url:'/assessment_report/exam-type/'+standard_id,
  //       contentType: "application/json",
  //       dataType:"json",
  //       headers: {"Authorization": getCookie('token')},
  //       success: function(data){
  //         console.log(data)
  //         if(data.status == 's'){
  //           self.trigger('exam_types_promotion_changed', data.examTypes)
  //         }else if(data.status == 'e'){
  //           showToast("Exam Type Read Error. Please try again.", data)
  //         }
  //       },
  //       error: function(data){
  //         showToast("", data)
  //       }
  //     })
  // })

  self.on('read_promotion_sheet_report', function (obj) {
    $.ajax({
      url: '/promotion-sheet-report/read-promotion-sheet-report',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_promotion_sheet_report_changed', data.subjects, data.students, data.marks, data.marks1);
        } else if (data.status == 'e') {
          showToast("Error Read Assessment Report. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ApplyPlanStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.students = [];

  self.on('read_students', function (id) {
    console.log('i am in read Student Plan api call from ajax');
    let req = {};
    $.ajax({
      url: '/apply_fee_plans/readStudents/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_apply_changed', data.students);
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //========Read Fee Plan By Standard =========
  self.on('read_plan_standard', function (id) {
    console.log('i am in read Fee  Plan By Standard api call from ajax');
    let req = {};
    $.ajax({
      url: '/apply_fee_plans/readPlanByStandard/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.plans = data.plans;
          self.trigger('read_plan_changed', data.plans);
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //=====read Standards ===

  self.on('read_standards', function () {
    console.log('i am in read Standards api call from ajax');
    let req = {};
    $.ajax({
      url: '/apply_fee_plans/readStandards',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Standard Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //=====read Sections ===

  self.on('read_sections', function () {
    console.log('i am in read sections api call from ajax');
    let req = {};
    $.ajax({
      url: '/apply_fee_plans/readSections',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Sections Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
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
      error: function (data) {
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
      success: function (data) {
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
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempPlans = self.feePlans.filter(c => {
            return c.head_id != id;
          });
          self.feePlans = tempPlans;
          toastr.info("Fee Plan Deleted Successfully");
          self.trigger('fee_plan_changed', self.feePlans);
        } else if (data.status == 'e') {
          showToast("Error Deleting Plan. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_head', function (head, id) {
    let req = {};
    req.head = head;
    req.head_id = id;
    $.ajax({
      url: '/fee_heads/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.heads = self.heads.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function AreaStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.areas = [];

  self.on('read_area', function () {
    console.log('i am in read_area api call from ajax');
    let req = {};
    $.ajax({
      url: '/area',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.areas = data.areas;
          self.trigger('area_changed', data.areas);
        } else if (data.status == 'e') {
          showToast("area Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_area', function () {
    console.log('i am in csv_export_area api call from ajax');
    let req = {};
    $.ajax({
      url: '/area/csv_export_area',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_area_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_area', function (id) {
    $.ajax({
      url: '/area/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempArea = self.areas.filter(c => {
            return c.area != id;
          });
          self.areas = tempArea;
          self.trigger('area_changed', self.areas);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_area', function (area, id) {
    let req = {};
    req.area = area;
    req.id = id;
    $.ajax({
      url: '/area/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.areas = self.areas.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_area', function (area) {
    let req = {};
    req.area = area;
    $.ajax({
      url: '/area/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add area after');
          let obj = {};
          obj.area = area;
          self.areas = [obj, ...self.areas];
          self.trigger('area_changed', self.areas);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function AttendanceStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_attendance_data', function (standard_id, section_id, start_date) {
    let req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    req.start_date = start_date;
    console.log("inside Store");
    console.log(req);
    $.ajax({
      url: '/attendance/read_attendance_data',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.attendanceData = data.attendanceData;
          if (self.attendanceData == 'No Data Found') {
            toastr.info("No Data Found");
          }
          // toastr.success("Successfully")
          self.trigger('read_attendance_data_changed', self.attendanceData);
        } else if (data.status == 'e') {
          showToast("Error . Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data.err);
      }
    });
  });

  // Add Attendance
  self.on('add_attendance_data', function (studentData, start_date) {
    let req = {};
    req.studentData = studentData;
    req.start_date = start_date;
    console.log("inside add_attendance_data store");
    console.log(req);
    $.ajax({
      url: '/attendance/add_attendance_data',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          // self.attendanceData=data.attendanceData
          toastr.success("Attendance Taken Successfully");
          self.trigger('add_attendance_data_changed');
        } else if (data.status == 'e') {
          showToast("Error . Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data.err);
      }
    });
  });

  // read daily attendance data

  self.on('read_daily_attendance_data', function (start_date) {
    let req = {};
    req.start_date = start_date;
    console.log("inside raed_attendance_data store");
    console.log(req);
    $.ajax({
      url: '/attendance/read_daily_attendance_data',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.dailyAttendanceData = data.dailyAttendanceData;
          toastr.success("Successfully");
          self.trigger('read_daily_attendance_data_changed', self.dailyAttendanceData);
        } else if (data.status == 'e') {
          showToast("Error . Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data.err);
      }
    });
  });

  //========= read monthly data =======

  self.on('read_monthly_attendance_data', function (obj) {
    $.ajax({
      url: '/attendance/read_monthly_attendance_data',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.monthlyAttendanceData = data.monthlyAttendanceData;
          self.trigger('read_monthly_attendance_data_changed', data.headers, data.student_list);
        } else if (data.status == 'e') {
          showToast("Error in reading data. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // read Holiday list

  self.on('read_holiday_list', function () {
    let req = {};
    $.ajax({
      url: '/attendance/read_holiday_list',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log("inside holiday list");
          self.holidayLists = data.holidayLists;
          self.trigger('read_holiday_list_changed', self.holidayLists);
        } else if (data.status == 'e') {
          showToast("holiday list Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //delete_attendance


  self.on('delete_attendance', function (studentData, start_date) {
    let req = {};
    req.start_date = start_date;
    req.studentData = studentData;
    console.log("inside delete attendance_data store");
    console.log(req);
    $.ajax({
      url: '/attendance/delete_attendance',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Deleted");
          self.trigger('delete_attendance_data_changed');
        } else if (data.status == 'e') {
          showToast("Error . Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data.err);
      }
    });
  });

  self.on('read_year', function (month_id) {
    console.log('i am in read Student Plan api call from ajax');
    let req = {};
    req.month_id = month_id;
    $.ajax({
      url: '/attendance/read_year/' + month_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_year_changed', data.year);
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //read Student Family Occupation
  /*self.on('read_student_summary_report', function() {
     let req = {}
     $.ajax({
       url:'/admin_report/read_student_summary_report',
         contentType: "application/json",
         dataType:"json",
         headers: {"Authorization": getCookie('token')},
         success: function(data){
           console.log(data)
           if(data.status == 's'){
             //self.studentSummaryReports=[]
             console.log("inside report")
             self.studentSummaryReports = data.studentSummaryReports
            // console.log(self.studentSummaryReports[0])
             self.trigger('read_student_summary_report_changed', self.studentSummaryReports)
           }else if(data.status == 'e'){
             showToast("Student Summary Report Read Error. Please try again.", data)
           }
         },
         error: function(data){
           showToast("", data)
         }
       })
   })*/
}
function BankStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.banks = [];

  self.on('read_bank', function () {
    console.log('i am in read bank api call from ajax');
    let req = {};
    $.ajax({
      url: '/bank',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.banks = data.banks;
          self.trigger('read_bank_changed', data.banks);
        } else if (data.status == 'e') {
          showToast("Bank Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add', function (bank_account_no, bank_name, branch) {
    let req = {};
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add event after');
          let obj = {};
          obj.id = data.id;
          obj.bank_account_no = bank_account_no;
          obj.bank_name = bank_name;
          obj.branch = branch;
          self.banks = [obj, ...self.banks];
          toastr.success("Session Inserserted Successfully ");
          self.trigger('add_bank_changed', self.banks);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('bank_edit', function (bank_account_no, bank_name, branch, bank_ac_no) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.banks = self.banks.map(cat => {
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
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempSession = self.banks.filter(c => {
            return c.bank_account_no != bank_account_no;
          });
          self.banks = tempSession;
          toastr.info("Session Deleted Successfully");
          self.trigger('delete_event_changed', self.banks);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function BirthDayStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_birth_day', function (dayType, s_date, e_date, type_id) {
    let req = {};
    req.dayType = dayType;
    req.s_date = s_date;
    req.e_date = e_date;
    req.type_id = type_id;
    console.log("inside Store");
    console.log(req);
    $.ajax({
      url: '/birth_day/read_birth_day',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.birthDayData = data.birthDayData;
          toastr.success("Successfully");
          self.trigger('read_birth_day_changed', self.birthDayData, getCookie('session_id'));
        } else if (data.status == 'e') {
          showToast("Error . Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //read Student Family Occupation
  /*self.on('read_student_summary_report', function() {
     let req = {}
     $.ajax({
       url:'/admin_report/read_student_summary_report',
         contentType: "application/json",
         dataType:"json",
         headers: {"Authorization": getCookie('token')},
         success: function(data){
           console.log(data)
           if(data.status == 's'){
             //self.studentSummaryReports=[]
             console.log("inside report")
             self.studentSummaryReports = data.studentSummaryReports
            // console.log(self.studentSummaryReports[0])
             self.trigger('read_student_summary_report_changed', self.studentSummaryReports)
           }else if(data.status == 'e'){
             showToast("Student Summary Report Read Error. Please try again.", data)
           }
         },
         error: function(data){
           showToast("", data)
         }
       })
   })*/
}
function CareerStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_career_interview', function (obj) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/career/read_career_interview/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.career_interview = data.career_interview;
          self.trigger('read_career_interview_changed', self.career_interview);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_career_interview', function (obj) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/career/csv_export_career_interview/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_career_interview_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('download_cv', function (career_id) {

    $.ajax({
      url: '/career/download_cv/' + career_id,
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Downloaded");
          self.trigger('download_cv_changed');
        } else if (data.status == 'e') {
          showToast("Error Updating Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('update_interview', function (obj, interview_id) {

    $.ajax({
      url: '/career/update_interview/' + interview_id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Updated");
          self.trigger('update_interview_changed');
        } else if (data.status == 'e') {
          showToast("Error Updating Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_candidate', function (interview_id) {
    $.ajax({
      url: '/career/delete_candidate/' + interview_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          /*let tempItems = self.items.filter(c => {
            return c.interview_id != interview_id
          })
          self.items = tempItems*/
          toastr.info("Candidate Deleted Successfully");
          self.trigger('delete_candidate_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Candidate. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_applicant_profile', function (career_id) {

    $.ajax({
      url: '/career/read_applicant_profile/' + career_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_applicant_profile_changed', data.applicant_profile_data);
        } else if (data.status == 'e') {
          showToast("Error Updating Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_interviewed_candidate', function (obj) {
    console.log('i am in read_interviewed_candidate api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    req.result = obj.result;
    $.ajax({
      url: '/career/read_interviewed_candidate/' + obj.start_date + '/' + obj.end_date + '/' + obj.result,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.interviewed_candidate = data.interviewed_candidate;
          self.trigger('read_interviewed_candidate_changed', self.interviewed_candidate);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_interviewed_candidate', function (obj) {
    console.log('i am in read_interviewed_candidate api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    req.result = obj.result;
    $.ajax({
      url: '/career/csv_export_interviewed_candidate/' + obj.start_date + '/' + obj.end_date + '/' + obj.result,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_interviewed_candidate_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('update_interviewed_candidate', function (interview_id) {
    $.ajax({
      url: '/career/update_interviewed_candidate/' + interview_id,
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          /*let tempItems = self.items.filter(c => {
            return c.interview_id != interview_id
          })
          self.items = tempItems*/
          toastr.info("Candidate Updated Successfully");
          self.trigger('update_interviewed_candidate_changed');
        } else if (data.status == 'e') {
          showToast("Error Updating Candidate. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_career_feedback_report', function (obj) {
    console.log('i am in read_interviewed_candidate api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/career/read_career_feedback_report/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.career_feedback_report_data = data.career_feedback_report_data;
          self.trigger('read_career_feedback_report_changed', self.career_feedback_report_data);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_career_feedback_report', function (obj) {
    console.log('i am in read_interviewed_candidate api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/career/csv_export_career_feedback_report/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_career_feedback_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_applicant_detail', function (obj) {
    console.log('i am in read_applicant_detail api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/career/read_applicant_detail/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.applicant_details = data.applicant_details;
          self.trigger('read_applicant_detail_changed', self.applicant_details);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_applicant_detail', function (obj) {
    console.log('i am in csv_export_applicant_detail api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/career/csv_export_applicant_detail/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_applicant_detail_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('create_interview_call', function (obj, career_id) {

    $.ajax({
      url: '/career/create_interview_call/' + career_id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Updated");
          self.trigger('create_interview_call_changed');
        } else if (data.status == 'e') {
          showToast("Error Updating Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_applicant_detail', function (career_id) {
    $.ajax({
      url: '/career/delete_applicant_detail/' + career_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          /*let tempItems = self.items.filter(c => {
            return c.interview_id != interview_id
          })
          self.items = tempItems*/
          toastr.info("Candidate Deleted Successfully");
          self.trigger('delete_applicant_detail_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Candidate. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function CategoryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.categories = [];

  self.on('read_categories', function () {
    console.log('i am in read_courses api call from ajax');
    let req = {};
    $.ajax({
      url: '/category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_category', function () {
    console.log('i am in csv_export_category api call from ajax');
    let req = {};
    $.ajax({
      url: '/category/csv_export_category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_category_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });
  self.on('delete_category', function (category_id) {
    $.ajax({
      url: '/category/delete/' + category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempCategories = self.categories.filter(c => {
            return c.category_id != category_id;
          });
          self.categories = tempCategories;
          toastr.info("Category Deleted Successfully");
          self.trigger('categories_changed', self.categories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Category. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_category', function (category_name, category_id) {
    let req = {};
    req.category_name = category_name;
    req.category_id = category_id;
    $.ajax({
      url: '/category/edit/' + category_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.categories = self.categories.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_category', function (category_name) {
    let req = {};
    req.category_name = category_name;
    $.ajax({
      url: '/category/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add category after');
          let obj = {};
          obj.category_id = data.category_id;
          obj.category_name = category_name;
          self.categories = [obj, ...self.categories];
          toastr.success("Category Inserserted Successfully ");
          self.trigger('categories_changed', self.categories);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function CertificateStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  //read Student Family Occupation
  self.on('read_certificate', function () {
    let req = {};
    $.ajax({
      url: '/certificate/read_certificate',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside Report");
          self.certificates = data.certificates;
          // console.log(self.studentSummaryReports[0])
          self.trigger('read_certificate_changed', self.certificates);
        } else if (data.status == 'e') {
          showToast("Certificate read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //read Certificate Data
  self.on('read_certificate_data', function (certificate_id) {
    let req = {};
    $.ajax({
      url: '/certificate/read_certificate_data/' + certificate_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside Report");
          self.certificateData = data.certificateData;
          // console.log(self.studentSummaryReports[0])
          self.trigger('read_certificate_data_changed', self.certificateData);
        } else if (data.status == 'e') {
          showToast("Certificate read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //stdent Group Report

  self.on('read_student', function (standard_id, section_id) {
    let req = {};
    $.ajax({
      url: '/certificate/read_student/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside report");
          self.students = data.students;
          console.log(self.students);
          self.trigger('read_student_change', self.students);
        } else if (data.status == 'e') {
          showToast("Students read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //issued Certificate
  self.on('read_issued_certificate', function (standard_id, section_id) {
    let req = {};
    $.ajax({
      url: '/certificate/read_issued_certificate/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside report");
          self.issuedCertificates = data.issuedCertificates;
          console.log(self.issuedCertificates);
          self.trigger('read_issued_certificate_change', self.issuedCertificates);
        } else if (data.status == 'e') {
          showToast("Issued Certificate read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_issue_certificate', function (studentData, c_id, standard_id, section_id, certificateKey, c_type) {
    let req = {};
    req.studentData = studentData;
    req.c_id = c_id;
    req.standard_id = standard_id;
    req.section_id = section_id;
    req.type = c_type;
    req.c_key = certificateKey;
    console.log(req);
    $.ajax({
      url: '/certificate/add_issue_certificate',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully");
          self.trigger('print_certificate_changed');
        } else if (data.status == 'e') {
          showToast("Error . Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //Add Certificate Store

  self.on('add_certificate', function (certificate_text, certificate_name, new_certificate) {
    let req = {};
    req.certificate_text = certificate_text;
    req.certificate_name = certificate_name;
    req.new_certificate = new_certificate;

    $.ajax({
      url: '/certificate/add_certificate',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Staff after');
          toastr.success("Successfully Inserted");
          self.trigger('add_certificate_changed', data.c_id);
        } else if (data.status == 'e') {
          showToast("Error adding Certificate. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
} // final end
function CityStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.cities = [];

  self.on('read_city', function () {
    console.log('i am in read_city api call from ajax');
    let req = {};
    $.ajax({
      url: '/city',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.cities = data.cities;
          self.trigger('city_changed', data.cities);
        } else if (data.status == 'e') {
          showToast("level Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_city', function () {
    console.log('i am in csv_export_city api call from ajax');
    let req = {};
    $.ajax({
      url: '/city/csv_export_city',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_city_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_city', function (id) {
    $.ajax({
      url: '/city/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempCity = self.cities.filter(c => {
            return c.city != id;
          });
          self.cities = tempCity;
          self.trigger('city_changed', self.cities);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_city', function (city, code, id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.cities = self.cities.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_city', function (city, code) {
    let req = {};
    req.city = city;
    req.code = code;
    $.ajax({
      url: '/city/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add city after');
          let obj = {};
          //obj.level_id = data.level_id
          obj.city = city;
          obj.code = code;
          self.cities = [obj, ...self.cities];
          self.trigger('city_changed', self.cities);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ClassHolidayStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.classHolidays = [];

  self.on('read_standard', function () {
    console.log('i am in standard api call from ajax');
    let req = {};
    $.ajax({
      url: '/class_holiday/readStandard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('csv_export_class_holiday', function () {
    console.log('i am in csv_export_class_holiday api call from ajax');
    let req = {};
    $.ajax({
      url: '/class_holiday/csv_export_class_holiday',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_class_holiday_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_class_holiday', function () {
    console.log('i am in read_class_holiday api call from ajax');
    let req = {};
    $.ajax({
      url: '/class_holiday/read_class_holiday',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log("inside read");
          self.classHolidays = data.classHolidays;
          self.trigger('read_class_holiday_changed', data.classHolidays);
        } else if (data.status == 'e') {
          showToast("Event Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempClassHolidays = self.classHolidays.filter(c => {
            return c.event_id != id;
          });
          self.classHolidays = tempClassHolidays;
          toastr.info("Event Deleted Successfully");
          self.trigger('delete_class_holiday_changed', self.classHolidays);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_class_holiday', function (event_name, section_id, start_date, end_date, description, id) {
    let req = {};
    req.section_id = section_id, req.event_name = event_name, req.start_date = start_date, req.end_date = end_date, req.description = description, req.id = id;
    $.ajax({
      url: '/class_holiday/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.classHolidays = self.classHolidays.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_class_holiday', function (event_name, section_id, start_date, end_date, description, holiday) {
    let req = {};
    req.section_id = section_id, req.event_name = event_name, req.start_date = start_date, req.end_date = end_date, req.description = description, req.holiday = holiday, console.log(holiday);
    $.ajax({
      url: '/class_holiday/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add class holiday after');
          let obj = {};
          obj.event_id = data.event_id;
          obj.event_name = event_name;
          obj.section_id = section_id;
          obj.start_date = start_date;
          obj.end_date = end_date;
          obj.description = description;
          // obj.name = name
          self.classHolidays = [obj, ...self.classHolidays];
          toastr.success("class holiday Inserserted Successfully ");
          self.trigger('add_class_holiday_changed', self.classHolidays);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ClassTeacherStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.classTeachers = [];

  self.on('read_class_teacher', function () {
    console.log('i am in Class teacher api call from ajax');
    let req = {};
    $.ajax({
      url: '/class_teacher/read_class_teacher',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.classTeachers = data.classTeachers;
          self.trigger('read_class_teacher_changed', data.classTeachers);
        } else if (data.status == 'e') {
          showToast(" Class Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_class_teacher', function () {
    console.log('i am in csv_export_class_teacher api call from ajax');
    let req = {};
    $.ajax({
      url: '/class_teacher/csv_export_class_teacher',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_class_teacher_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.employees = [];

  self.on('read_teaching_staff', function () {
    console.log('i am in teaching Staff api call from ajax');
    let req = {};
    $.ajax({
      url: '/class_teacher/read_teaching_staff',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.employees = data.employees;
          self.trigger('read_teaching_staff_changed', self.employees);
        } else if (data.status == 'e') {
          showToast(" Class Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_class_teacher', function (id) {
    $.ajax({
      url: '/class_teacher/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempClassTeachers = self.classTeachers.filter(c => {
            return c.ts_id != id;
          });
          self.classTeachers = tempClassTeachers;
          toastr.info("Class teacher Deleted Successfully");
          self.trigger('delete_class_teacher_changed', self.classTeachers);
        } else if (data.status == 'e') {
          showToast("Error Deleting Class Teacher. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_class_teacher', function (standard_id, section_id, class_teacher, asst_class_teacher, room_no, id) {
    let req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    req.class_teacher = class_teacher;
    req.asst_class_teacher = asst_class_teacher;
    req.room_no = room_no;
    req.id = id;
    $.ajax({
      url: '/class_teacher/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.classTeachers = self.classTeachers.map(cat => {
            if (cat.ts_id == id) {
              cat.ts_id = id;
              cat.standard_id = standard_id;
              cat.section_id = section_id;
              cat.class_teacher = class_teacher;
              cat.asst_class_teacher = asst_class_teacher;
              cat.room_no = room_no;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Class Teacher Updated Successfully ");
          self.trigger('edit_class_teacher_changed', self.classTeachers);
        } else if (data.status == 'e') {
          showToast("Error updating classTeachers. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_class_teacher', function (standard_id, section_id, class_teacher, asst_class_teacher, room_no) {
    let req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    req.class_teacher = class_teacher;
    req.asst_class_teacher = asst_class_teacher;
    req.room_no = room_no;
    $.ajax({
      url: '/class_teacher/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add subject after');
          let obj = {};
          obj.ts_id = data.id;
          obj.standard_id = standard_id;
          obj.section_id = section_id;
          obj.class_teacher = class_teacher;
          obj.asst_class_teacher = asst_class_teacher;
          obj.room_no = room_no;
          self.classTeachers = [obj, ...self.classTeachers];
          toastr.success("Class teacher Inserserted Successfully ");
          self.trigger('add_class_teacher_changed', self.classTeachers);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ClubStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.clubs = [];

  self.on('read_club', function () {
    console.log('i am in read_events api call from ajax');
    let req = {};
    $.ajax({
      url: '/club/read_club',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.clubs = data.clubs;
          self.trigger('read_club_changed', data.clubs);
        } else if (data.status == 'e') {
          showToast("Club Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempClubs = self.clubs.filter(c => {
            return c.id != id;
          });
          self.clubs = tempClubs;
          toastr.info("Club Deleted Successfully");
          self.trigger('delete_club_changed', self.clubs);
        } else if (data.status == 'e') {
          showToast("Error Deleting Club. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_club', function (club_name, captain, club_detail, id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.clubs = self.clubs.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_club', function (club_name, captain, club_detail) {
    let req = {};
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Club role after');
          let obj = {};
          obj.club_id = data.id;
          obj.club_name = club_name;
          obj.captain = captain;
          obj.club_detail = club_detail;
          // obj.name = name
          self.clubs = [obj, ...self.clubs];
          toastr.success("club Inserserted Successfully ");
          self.trigger('add_club_changed', self.clubs);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function CountryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.countries = [];

  self.on('read_country', function () {
    console.log('i am in read_level api call from ajax');
    let req = {};
    $.ajax({
      url: '/country',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.countries = data.countries;
          self.trigger('country_changed', data.countries);
        } else if (data.status == 'e') {
          showToast("level Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_country', function () {
    console.log('i am in csv_export_country api call from ajax');
    let req = {};
    $.ajax({
      url: '/country/csv_export_country',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_country_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_country', function (id) {
    $.ajax({
      url: '/country/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempCountry = self.countries.filter(c => {
            return c.country != id;
          });
          self.countries = tempCountry;
          self.trigger('country_changed', self.countries);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_country', function (country, code, id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.countries = self.countries.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_country', function (country, code) {
    let req = {};
    req.country = country;
    req.code = code;
    $.ajax({
      url: '/country/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add country after');
          let obj = {};
          //obj.level_id = data.level_id
          obj.country = country;
          obj.code = code;
          self.countries = [obj, ...self.countries];
          self.trigger('country_changed', self.countries);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function CourseStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.courses = [];

  self.on('read_courses', function () {
    console.log('i am in read_courses api call from ajax');
    let req = {};
    $.ajax({
      url: '/courses',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.courses = data.courses;
          self.trigger('courses_changed', data.courses);
        } else if (data.status == 'e') {
          showToast("Course Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempCourses = self.courses.filter(c => {
            return c.id != id;
          });
          self.courses = tempCourses;
          toastr.info("Course Deleted Successfully");
          self.trigger('courses_changed', self.courses);
        } else if (data.status == 'e') {
          showToast("Error Deleting Course. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_course', function (course, course_full_name, id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.courses = self.courses.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_course', function (course, full_name) {
    let req = {};
    req.course = course;
    req.full_name = full_name;
    $.ajax({
      url: '/courses/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add course after');
          let obj = {};
          obj.id = data.id;
          obj.course = course;
          obj.course_full_name = full_name;
          self.courses = [obj, ...self.courses];
          toastr.success("Course Inserserted Successfully ");
          self.trigger('courses_changed', self.courses);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function DepartmentStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.departments = [];

  self.on('read_department', function () {
    console.log('i am in read_department api call from ajax');
    let req = {};
    $.ajax({
      url: '/department/read_department',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.departments = data.departments;
          self.trigger('departments_changed', data.departments);
        } else if (data.status == 'e') {
          showToast("Department Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_Department', function () {
    console.log('i am in csv_export_Department api call from ajax');
    let req = {};
    $.ajax({
      url: '/department/csv_export_Department',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_Department_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.employees = [];

  self.on('read_hod', function () {
    console.log('i am in read_hod api call from ajax');
    let req = {};
    $.ajax({
      url: '/department/read_hod',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.employees = data.employees;
          self.trigger('read_hod_changed', data.employees);
        } else if (data.status == 'e') {
          showToast("HOD Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_department', function (id) {
    $.ajax({
      url: '/department/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempDepartment = self.departments.filter(c => {
            return c.department_id != id;
          });
          self.departments = tempDepartment;
          self.trigger('departments_changed', self.departments);
        } else if (data.status == 'e') {
          showToast("Error Deleting Department. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_department', function (department_name, employee_name, id) {
    let req = {};
    req.department_name = department_name;
    req.employee_name = employee_name;
    req.id = id;
    $.ajax({
      url: '/department/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.departments = self.departments.map(cat => {
            if (cat.department_id == id) {
              cat.department_id = id;
              cat.department_name = department_name;
              cat.emp_name = employee_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          self.trigger('departments_changed', self.departments);
        } else if (data.status == 'e') {
          showToast("Error updating Department. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_department', function (department_name, employee_name) {
    let req = {};
    req.department_name = department_name;
    req.employee_name = employee_name;
    $.ajax({
      url: '/department/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add department after');
          let obj = {};
          obj.department_id = data.id;
          obj.department_name = department_name;
          obj.hod = employee_name;
          self.departments = [obj, ...self.departments];
          self.trigger('departments_changed', self.departments);
        } else if (data.status == 'e') {
          showToast("Error adding Department. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function DesignationStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.designations = [];

  self.on('read_designations', function () {
    console.log('i am in read_designations api call from ajax');
    let req = {};
    $.ajax({
      url: '/designations',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.designations = data.designations;
          self.trigger('designations_changed', data.designations);
        } else if (data.status == 'e') {
          showToast("Course Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_Designation', function () {
    console.log('i am in csv_export_Designation api call from ajax');
    let req = {};
    $.ajax({
      url: '/designations/csv_export_Designation',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_Designation_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_designation', function (id) {
    $.ajax({
      url: '/designations/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempdesignations = self.designations.filter(c => {
            return c.designation_id != id;
          });
          self.designations = tempdesignations;
          self.trigger('designations_changed', self.designations);
        } else if (data.status == 'e') {
          showToast("Error Deleting Course. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_designation', function (designation, id) {
    let req = {};
    req.designation = designation;
    req.id = id;
    $.ajax({
      url: '/designations/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.designations = self.designations.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_designation', function (designation) {
    let req = {};
    req.designation = designation;
    $.ajax({
      url: '/designations/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add designation after');
          let obj = {};
          obj.id = data.id;
          obj.designation = designation;
          self.designations = [obj, ...self.designations];
          self.trigger('designations_changed', self.designations);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function DisciplineCaseStore() {
  riot.observable(this); // Riot provides our Case emitter.
  var self = this;

  self.discipline_case = [];

  self.on('csv_export_discipline_case', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/discipline_case/csv_export_discipline_case',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_discipline_case_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_discipline_category', function () {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    $.ajax({
      url: '/discipline_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_discipline_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_discipline_case', function () {
    console.log('i am in add_case api call from ajax');
    let req = {};
    $.ajax({
      url: '/discipline_case/read_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.discipline_case = data.discipline_case;
          self.trigger('read_discipline_case_changed', data.discipline_case);
        } else if (data.status == 'e') {
          showToast("Error Reading Case. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempCase = self.discipline_case.filter(c => {
            return c.case_id != case_id;
          });
          self.discipline_case = tempCase;
          toastr.info("Case Deleted Successfully");
          self.trigger('delete_discipline_case_changed', self.discipline_case);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_discipline_case', function (case_name, category_id, case_id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.discipline_case = self.discipline_case.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_discipline_case', function (case_name, category_id) {
    let req = {};
    req.case_name = case_name;
    req.category_id = category_id;
    $.ajax({
      url: '/discipline_case/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          let obj = {};
          obj.case_id = data.case_id;
          obj.case_name = case_name;
          obj.category_id = category_id;
          self.discipline_case = [obj, ...self.discipline_case];
          toastr.success("Case Inserserted Successfully ");
          self.trigger('add_discipline_case_changed', self.discipline_case);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function DisciplineCategoryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.discipline_categories = [];

  self.on('csv_export_discipline_category', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/discipline_category/csv_export_discipline_category',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_discipline_category_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_discipline_category', function () {
    console.log('i am in read_courses api call from ajax');
    let req = {};
    $.ajax({
      url: '/discipline_category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.discipline_categories = data.discipline_categories;
          self.trigger('discipline_category_changed', data.discipline_categories);
        } else if (data.status == 'e') {
          showToast("Category Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempDisciplineCategories = self.discipline_categories.filter(c => {
            return c.category_id != category_id;
          });
          self.discipline_categories = tempDisciplineCategories;
          toastr.info("Category Deleted Successfully");
          self.trigger('discipline_category_changed', self.discipline_categories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Category. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_discipline_category', function (category_name, category_id) {
    let req = {};
    req.category_name = category_name;
    req.category_id = category_id;
    $.ajax({
      url: '/discipline_category/edit/' + category_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.discipline_categories = self.discipline_categories.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_discipline_category', function (category_name) {
    let req = {};
    req.category_name = category_name;
    $.ajax({
      url: '/discipline_category/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add item after');
          let obj = {};
          obj.category_id = data.category_id;
          obj.category_name = category_name;
          self.discipline_categories = [obj, ...self.discipline_categories];
          toastr.success("Category Inserserted Successfully ");
          self.trigger('discipline_category_changed', self.discipline_categories);
        } else if (data.status == 'e') {
          showToast("Error adding Category. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function DisciplineDetailStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.mentors = [];

  self.on('read_discipline_categories', function () {
    let req = {};
    $.ajax({
      url: '/discipline_detail',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_discipline_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('read_discipline_case', function () {
    let req = {};

    $.ajax({
      url: '/discipline_detail/read_discipline_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.discipline_case = data.discipline_case;
          self.trigger('read_discipline_case_changed', data.discipline_case);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_discipline', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/discipline_detail/csv_export_discipline',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_discipline_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_discipline', function (read_category_id) {
    console.log(read_category_id);
    let req = {};
    req.read_category_id = read_category_id;
    $.ajax({
      url: '/discipline_detail/read_discipline/' + read_category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.disciplines = data.disciplines;
          self.trigger('read_discipline_changed', data.disciplines);
        } else if (data.status == 'e') {
          showToast("Discipline Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_for_edit_mentor', function (id) {
    console.log(id);
    let req = {};
    req.id = id;
    $.ajax({
      url: '/mentor_detail/read_for_edit_mentor/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.mentor_details = data.mentor_details;
          self.trigger('read_for_edit_mentor_changed', data.mentor_details);
        } else if (data.status == 'e') {
          showToast("Mentor Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add activity after');
          toastr.success("Successfully Inserted");
          self.trigger('add_discipline_detail_changed', self.disciplines);
        } else if (data.status == 'e') {
          showToast("Error adding Discipline. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_for_edit_discipline', function (id) {
    console.log(id);
    let req = {};
    req.id = id;
    $.ajax({
      url: '/discipline_detail/read_for_edit_discipline/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.discipline_details = data.discipline_details;
          self.trigger('read_for_edit_discipline_changed', data.discipline_details);
        } else if (data.status == 'e') {
          showToast("Discipline Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_discipline_detail', function (obj, id) {
    let req = {};
    console.log(obj);
    //req.id=edit_id
    $.ajax({
      url: '/discipline_detail/edit/' + id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Update");
          self.trigger('edit_discipline_detail_changed', self.disciplines);
        } else if (data.status == 'e') {
          showToast("Error adding Discipline. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function DisciplineReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('csv_discipline_case_wise_report', function (obj) {
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/discipline_report/csv_discipline_case_wise_report/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_discipline_case_wise_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_case_wise_report', function (obj) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/discipline_report/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.case_wise_reports = data.case_wise_reports;
          self.trigger('read_case_wise_report_changed', data.case_wise_reports, data.grand_total);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_read_date_wise_case_report', function (obj) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/discipline_report/csv_export_read_date_wise_case_report/csv_export',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_read_date_wise_case_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_date_wise_case_report', function (obj, category_id) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    req.category_id = category_id;
    $.ajax({
      url: '/discipline_report/read_date_wise_case_report/' + obj.start_date + '/' + obj.end_date + '/' + category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.date_wise_case_report = data.date_wise_case_report;
          self.trigger('read_date_wise_case_report_changed', data.date_wise_case_report, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_standard', function () {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    $.ajax({
      url: '/discipline_report/read_standard/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    $.ajax({
      url: '/discipline_report/read_section/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_session', function () {
    console.log('i am in read_session api call from ajax');
    let req = {};
    $.ajax({
      url: '/discipline_report/read_session/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sessions = data.sessions;
          self.trigger('read_session_changed', data.sessions);
        } else if (data.status == 'e') {
          showToast("Session Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_read_class_wise_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/discipline_report/csv_export_read_class_wise_report/',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_read_class_wise_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_export_read_date_wise_case_report', function (obj) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/discipline_report/csv_export_read_date_wise_case_report/csv_export',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_read_date_wise_case_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_class_wise_report', function (standard_id, section_id, session_id) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    req.session_id = session_id;
    $.ajax({
      url: '/discipline_report/read_class_wise_report/' + standard_id + '/' + section_id + '/' + session_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.class_wise_case_report = data.class_wise_case_report;
          self.trigger('read_class_wise_report_changed', data.class_wise_case_report, data.grand_total);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function EmployeeNotificationStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.employees = [];

  self.on('read_staff_departments', function () {
    console.log('i am in read_departments api call from ajax');
    let req = {};
    $.ajax({
      url: '/employee-notification',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log(data.staff_departments);
          self.trigger('staff_departments_changed', data.staff_departments);
        } else if (data.status == 'e') {
          showToast("Staff Department Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_employees', function (emp_type_id) {
    let req = {};
    $.ajax({
      url: '/employee-notification/' + emp_type_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          if (data.employees.length == 0) {
            toastr.info("No Data Found!");
          }
          self.trigger('employees_changed', data.employees);
        } else if (data.status == 'e') {
          console.log('Error' + data.error);
          showToast("Employees Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('send_sms', function (mobile_no, message) {
    let req = {};
    req.mobile_no = mobile_no;
    req.message = message;
    req.type = 'Employee';
    $.ajax({
      url: '/sms/',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('employee_sms_changed');
        } else if (data.status == 'e') {
          showToast("Error sending SMS. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('send_email', function (email, employee_subject, employee_message) {
    let req = {};
    req.email = email;
    req.subject = employee_subject;
    req.message = employee_message;
    req.type = 'Employee';
    $.ajax({
      url: '/email/',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('employee_email_changed');
        } else if (data.status == 'e') {
          showToast("Error sending Email. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function EmployeeRoleStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.employeeRoles = [];

  self.on('read_employees', function () {
    console.log('i am in read_employees api call from ajax');
    let req = {};
    $.ajax({
      url: '/role/readEmployee',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.employees = data.employees;
          self.trigger('read_employees_changed', data.employees);
        } else if (data.status == 'e') {
          showToast("Role Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_Role', function () {
    console.log('i am in csv_export_Role api call from ajax');
    let req = {};
    $.ajax({
      url: '/role/csv_export_Role',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_role_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_employee_roles', function () {
    console.log('i am in read_events api call from ajax');
    let req = {};
    $.ajax({
      url: '/role/read_employee_roles',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.employeeRoles = data.employeeRoles;
          self.trigger('read_employee_role_changed', data.employeeRoles);
        } else if (data.status == 'e') {
          showToast("Role Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempEmployeeRoles = self.employeeRoles.filter(c => {
            return c.id != id;
          });
          self.employeeRoles = tempEmployeeRoles;
          toastr.info("Role Deleted Successfully");
          self.trigger('delete_employee_role_changed', self.employeeRoles);
        } else if (data.status == 'e') {
          showToast("Error Deleting Role. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_employee_role', function (role, employee_id, id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.employeeRoles = self.employeeRoles.map(cat => {
            if (cat.role_id == id) {
              cat.role_id = id;
              cat.role = role;
              cat.employee_id = employee_id;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Role Updated Successfully ");
          self.trigger('edit_employee_role_changed', self.employeeRoles);
        } else if (data.status == 'e') {
          showToast("Error updating employeeRoles. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_employee_role', function (role, employee_id) {
    let req = {};
    req.role = role;
    req.employee_id = employee_id;
    $.ajax({
      url: '/role/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add employee role after');
          let obj = {};
          obj.role_id = data.role_id;
          obj.role = role;
          obj.employee_id = employee_id;
          // obj.name = name
          self.employeeRoles = [obj, ...self.employeeRoles];
          toastr.success("employee role Inserserted Successfully ");
          self.trigger('add_employee_role_changed', self.employeeRoles);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function employeeTypeStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.employeeTypes = [];

  self.on('csv_export_EmployeeType', function () {
    console.log('i am in csv_export_department api call from ajax');
    let req = {};
    $.ajax({
      url: '/employee_type/csv_export_EmployeeType',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_EmployeeType_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_employeeTypes', function () {
    console.log('i am in read_employee Types api call from ajax');
    let req = {};
    $.ajax({
      url: '/employee_type',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.employeeTypes = data.employeeTypes;
          self.emp_id = getCookie('emp_id');
          self.trigger('employeeTypes_changed', data.employeeTypes, self.emp_id);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempEmployeeTypes = self.employeeTypes.filter(c => {
            return c.emp_type_id != id;
          });
          self.employeeTypes = tempEmployeeTypes;
          toastr.info("Item Deleted Successfully");
          self.trigger('employeeTypes_changed', self.employeeTypes);
        } else if (data.status == 'e') {
          showToast("Error Deleting Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_employeeType', function (employee_type, id) {
    let req = {};
    req.employee_type = employee_type;
    req.id = id;
    $.ajax({
      url: '/employee_type/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.employeeTypes = self.employeeTypes.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_employeeType', function (employee_type) {
    let req = {};
    req.employee_type = employee_type;
    $.ajax({
      url: '/employee_type/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add employee type after');
          let obj = {};
          obj.emp_type_id = data.emp_type_id;
          obj.emp_type = employee_type;
          self.employeeTypes = [obj, ...self.employeeTypes];
          toastr.success("Employee Type Inserserted Successfully ");
          self.trigger('employeeTypes_changed', self.employeeTypes);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function EmploymentStatusStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.employmentStatus = [];

  self.on('read_employment_status', function () {
    console.log('i am in read_employment_status api call from ajax');
    let req = {};
    $.ajax({
      url: '/employment_status',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.employmentStatus = data.employmentStatus;
          self.trigger('employment_status_changed', data.employmentStatus);
        } else if (data.status == 'e') {
          showToast("level Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_employmentStatus', function () {
    console.log('i am in csv_export_employmentStatus api call from ajax');
    let req = {};
    $.ajax({
      url: '/employment_status/csv_export_employmentStatus',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_employment_status_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_employment_status', function (id) {
    $.ajax({
      url: '/employment_status/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempEmploymentStatus = self.employmentStatus.filter(c => {
            return c.employment_status_id != id;
          });
          self.employmentStatus = tempEmploymentStatus;
          self.trigger('employment_status_changed', self.employmentStatus);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_employment_status', function (employment_status, id) {
    let req = {};
    req.employment_status = employment_status;
    req.id = id;
    $.ajax({
      url: '/employment_status/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.employmentStatus = self.employmentStatus.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_employment_status', function (employment_status) {
    let req = {};
    req.employment_status = employment_status;
    $.ajax({
      url: '/employment_status/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add employment_status after');
          let obj = {};
          obj.employment_status_id = data.employment_status_id;
          obj.employment_status = employment_status;
          self.employmentStatus = [obj, ...self.employmentStatus];
          self.trigger('employment_status_changed', self.employmentStatus);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function EventStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.events = [];

  self.on('read_categories', function () {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    $.ajax({
      url: '/event',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_events', function () {
    console.log('i am in read_events api call from ajax');
    let req = {};
    $.ajax({
      url: '/event/read_event',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.events = data.events;
          self.trigger('read_event_changed', data.events);
        } else if (data.status == 'e') {
          showToast("Events Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempEvents = self.events.filter(c => {
            return c.event_id != event_id;
          });
          self.events = tempEvents;
          toastr.info("Event Deleted Successfully");
          self.trigger('delete_event_changed', self.events);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_event', function (event_name, category_id, event_id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.events = self.events.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_event', function (event_name, category_id) {
    let req = {};
    req.event_name = event_name;
    req.category_id = category_id;
    $.ajax({
      url: '/event/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add event after');
          let obj = {};
          obj.event_id = data.event_id;
          obj.event_name = event_name;
          obj.category_id = category_id;
          self.events = [obj, ...self.events];
          toastr.success("Event Inserserted Successfully ");
          self.trigger('add_event_changed', self.events);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function EventTypeStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.eventTypes = [];

  self.on('read_eventTypes', function () {
    console.log('i am in read_event Types api call from ajax');
    let req = {};
    $.ajax({
      url: '/event_type',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.eventTypes = data.eventTypes;
          self.trigger('eventTypes_changed', data.eventTypes);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('csv_export_event_type', function () {
    console.log('i am in csv_export_event_type api call from ajax');
    let req = {};
    $.ajax({
      url: '/event_type/csv_export_event_type',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_event_type_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_eventType', function (id) {
    $.ajax({
      url: '/event_type/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempEventTypes = self.eventTypes.filter(c => {
            return c.event_type_id != id;
          });
          self.eventTypes = tempEventTypes;
          toastr.info("Item Deleted Successfully");
          self.trigger('eventTypes_changed', self.eventTypes);
        } else if (data.status == 'e') {
          showToast("Error Deleting Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_eventType', function (event_type, id) {
    let req = {};
    req.event_type = event_type;
    req.id = id;
    $.ajax({
      url: '/event_type/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.eventTypes = self.eventTypes.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_eventType', function (event_type) {
    let req = {};
    req.event_type = event_type;
    $.ajax({
      url: '/event_type/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Event type after');
          let obj = {};
          obj.event_type_id = data.event_type_id;
          obj.event_type = event_type;
          self.eventTypes = [obj, ...self.eventTypes];
          toastr.success("Event Type Inserserted Successfully ");
          self.trigger('eventTypes_changed', self.eventTypes);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ExamSchemeStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.examSchemes = [];

  self.on('read_exam_csv', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/exam-scheme/read_exam_csv',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_exam_csv_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_exam_schemes', function () {
    let req = {};
    $.ajax({
      url: '/exam-scheme',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.examSchemes = data.examSchemes;
          self.trigger('exam_scheme_changed', data.examSchemes);
        } else if (data.status == 'e') {
          showToast("Exam Scheme Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_exam_scheme', function (scheme_name) {
    let req = {};
    req.scheme_name = scheme_name;
    $.ajax({
      url: '/exam-scheme/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          let obj = {};
          obj.scheme_id = data.scheme_id;
          obj.scheme_name = scheme_name;
          self.examSchemes = [obj, ...self.examSchemes];
          toastr.success("Exam Scheme Created Successfully ");
          self.trigger('add_exam_scheme_changed', self.examSchemes);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('update_exam_scheme', function (scheme_name, scheme_id) {
    let req = {};
    req.scheme_name = scheme_name;
    req.scheme_id = scheme_id;
    $.ajax({
      url: '/exam-scheme/edit/' + scheme_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.examSchemes = self.examSchemes.map(cat => {
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
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempExamScheme = self.examSchemes.filter(c => {
            return c.scheme_id != scheme_id;
          });
          self.examSchemes = tempExamScheme;
          toastr.info("Exam Scheme Deleted Successfully");
          self.trigger('delete_exam_scheme_changed', self.examSchemes);
        } else if (data.status == 'e') {
          showToast("Error Deleting Exam Scheme. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************exams start*****************************************************************/
  self.exams = [];
  self.on('read_exams', function (scheme_id) {
    let req = {};
    $.ajax({
      url: '/exam-scheme/exams/' + scheme_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.exams = data.exams;
          self.trigger('read_exams_changed', data.exams);
        } else if (data.status == 'e') {
          showToast("Exams Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          let ob = {};
          ob.exam_type_id = data.exam_type_id;
          ob.exam_type = obj.exam_type;
          ob.start_date = obj.start_date;
          ob.end_date = obj.end_date;
          ob.last_login_date = obj.last_login_date;
          ob.assessment = obj.assessment;
          ob.exam_group = obj.exam_group;
          self.exams = [ob, ...self.exams];
          toastr.success("Exam Created Successfully ");
          self.trigger('add_exam_changed', self.exams);
        } else if (data.status == 'e') {
          showToast("Error adding . Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempExams = self.exams.filter(c => {
            return c.exam_type_id != exam_type_id;
          });
          self.exams = tempExams;
          toastr.info("Exam Deleted Successfully");
          self.trigger('delete_exam_changed', self.exams);
        } else if (data.status == 'e') {
          showToast("Error Deleting Exam. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          self.exams = self.exams.map(ob => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************classes start*****************************************************************/
  self.on('read_classes', function (scheme_id) {
    let req = {};
    $.ajax({
      url: '/exam-scheme/classes/' + scheme_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.freeClasses, data.assignedClasses);
        } else if (data.status == 'e') {
          showToast("Exam Scheme Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Classes assigned successfully ");
          self.trigger('assign_standard_changed', standards);
        } else if (data.status == 'e') {
          showToast("Error assigning classes. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {

          toastr.success("Classes freed successfully ");
          self.trigger('assign_standard_changed', standards);
        } else if (data.status == 'e') {
          showToast("Error while free up classes. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ExamSubjectGroupMapStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.subjectGroupMaps = [];

  self.on('read_subject_groups', function () {
    let req = {};
    $.ajax({
      url: '/exam-subject-group-map',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.subjectGroupMaps = data.subjectGroupMaps;
          self.trigger('subject_group_changed', data.subjectGroupMaps);
        } else if (data.status == 'e') {
          showToast("Exam Scheme Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_subject_group', function (subject_group) {
    let req = {};
    req.subject_group = subject_group;
    $.ajax({
      url: '/exam-subject-group-map/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          let obj = {};
          obj.id = data.id;
          obj.subject_group = subject_group;
          self.subjectGroupMaps = [obj, ...self.subjectGroupMaps];
          toastr.success("Exam Scheme Created Successfully ");
          self.trigger('add_subject_group_changed', self.subjectGroupMaps);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('update_subject_group', function (subject_group, id) {
    let req = {};
    req.subject_group = subject_group;
    req.id = id;
    $.ajax({
      url: '/exam-subject-group-map/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.subjectGroupMaps = self.subjectGroupMaps.map(cat => {
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
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempExamScheme = self.subjectGroupMaps.filter(c => {
            return c.id != id;
          });
          self.subjectGroupMaps = tempExamScheme;
          toastr.info("Exam Scheme Deleted Successfully");
          self.trigger('delete_subject_group_changed', self.subjectGroupMaps);
        } else if (data.status == 'e') {
          showToast("Error Deleting Exam Scheme. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************subjects start*****************************************************************/
  self.on('read_subjects', function (id) {
    let req = {};
    $.ajax({
      url: '/exam-subject-group-map/subjects/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_subjects_changed', data.freeSubjects, data.assignedSubjects);
        } else if (data.status == 'e') {
          showToast("Exam Scheme Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Subjects assigned successfully ");
          self.trigger('assign_subjects_changed', subjects);
        } else if (data.status == 'e') {
          showToast("Error assigning subjects. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {

          toastr.success("Subjects freed successfully ");
          self.trigger('assign_subjects_changed', subjects);
        } else if (data.status == 'e') {
          showToast("Error while free up subjects. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function FeeHeadStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.heads = [];

  self.on('read_heads', function () {
    console.log('i am in read heads api call from ajax');
    let req = {};
    $.ajax({
      url: '/fee_heads',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.heads = data.heads;
          self.trigger('heads_changed', data.heads);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempHeads = self.heads.filter(c => {
            return c.head_id != id;
          });
          self.heads = tempHeads;
          toastr.info("Head Deleted Successfully");
          self.trigger('heads_changed', self.heads);
        } else if (data.status == 'e') {
          showToast("Error Deleting Head. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_head', function (head, id) {
    let req = {};
    req.head = head;
    req.head_id = id;
    $.ajax({
      url: '/fee_heads/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.heads = self.heads.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_head', function (head) {
    let req = {};
    req.head = head;
    $.ajax({
      url: '/fee_heads/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add head after');
          let obj = {};
          obj.id = data.id;
          obj.head = head;
          self.heads = [obj, ...self.heads];
          toastr.success("Head Inserserted Successfully ");
          self.trigger('heads_changed', self.heads);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function FeePlanStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.feePlans = [];

  self.on('read_fee_plans', function () {
    console.log('i am in read Fee Plan api call from ajax');
    let req = {};
    $.ajax({
      url: '/fee_plans',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.feePlans = data.feePlans;
          self.trigger('fee_plan_changed', data.feePlans);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  /*======== Read Fee Heads =======*/
  self.on('read_heads', function () {
    console.log('i am in read heads api call from ajax');
    let req = {};
    $.ajax({
      url: '/fee_heads',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.heads = data.heads;
          self.trigger('heads_changed', data.heads);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  /*======== Read Fee Slip for edit ====*/
  self.on('read_fee_slip_edit', function (id) {
    console.log('i am in read Fee Slip Edit  api call from ajax');
    let req = {};
    $.ajax({
      url: '/fee_plans/readSlipEdit/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });
  /*====== Read Fee Slips */
  self.on('read_slips', function () {
    console.log('i am in read slips api call from ajax');
    let req = {};
    $.ajax({
      url: '/fee_slips',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.slips = data.slips;
          self.trigger('slips_changed', data.slips);
        } else if (data.status == 'e') {
          showToast("Slip Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //=====read Standards ===

  self.on('read_standards', function () {
    console.log('i am in read Standards api call from ajax');
    let req = {};
    $.ajax({
      url: '/fee_plans/readStandards',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //============= Fee Slip Head =========    
  self.on('read_fee_slip_head', function (id) {
    console.log('i am in read Fee Slip Head  api call from ajax');
    let req = {};
    $.ajax({
      url: '/fee_plans/readFeeSlips/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
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
      error: function (data) {
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
      success: function (data) {
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
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("head amount  updated Successfully, wish to insert more");
          self.trigger('map_fee_head_changed');
        } else if (data.status == 'e') {
          showToast("Error in Mapping Heads. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add plan after');
          let obj = {};
          /*obj.id = data.id
          obj.head = head*/
          self.feePlans = [obj, ...self.feePlans];
          toastr.success("Plan Inserserted Successfully ");
          self.trigger('add_fee_plan_changed', self.feePlans);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempPlans = self.feePlans.filter(c => {
            return c.fee_plan_id != id;
          });
          self.feePlans = tempPlans;
          toastr.info("Fee Plan Deleted Successfully");
          self.trigger('fee_plan_changed', self.feePlans);
        } else if (data.status == 'e') {
          showToast("Error Deleting Plan. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {

          //self.feePlans = tempPlans
          toastr.info("Fee Slip Deleted Successfully");
          self.trigger('fee_slip_delete_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Plan. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_head', function (head, id) {
    let req = {};
    req.head = head;
    req.head_id = id;
    $.ajax({
      url: '/fee_heads/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.heads = self.heads.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function FeeReceivedStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.students = [];

  self.on('read_standard', function () {
    let req = {};
    $.ajax({
      url: '/receive_fees/read_standard/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Standard Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/receive_fees/read_section/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('read_student_list', function (standard_id, section_id) {
    console.log(standard_id);
    console.log(section_id);
    let req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    $.ajax({
      url: '/receive_fees/read_student_list/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {

          self.students = data.students;
          self.trigger('read_student_list_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //========= read Fine ========
  self.on('read_fine', function () {
    console.log('i am in read_fine api call from ajax');
    let req = {};
    $.ajax({
      url: '/receive_fees',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {

        if (data.status == 's') {
          self.fines = data.fines;
          self.trigger('read_fine_changed', data.fines);
        } else if (data.status == 'e') {
          showToast("Fine Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //========== read fee slip by students ===
  self.on('read_fee_plan', function (student_id) {
    console.log('i am in read fee fee plan api call from ajax');
    let req = {};
    $.ajax({
      url: '/receive_fees/read_fee_plan/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.fee_plans = data.fee_plans;
          self.trigger('read_fee_plan_changed', data.fee_plans);
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //========== read fees slips mpnth wise==========

  self.on('read_fee_slip_head', function (student_id, fee_slip_id, fee_plan_id) {
    console.log('i am in read Fees Slip Heads api call from ajax');
    let req = {};
    $.ajax({
      url: '/receive_fees/read_fee_slip_head/' + student_id + '/' + fee_slip_id + '/' + fee_plan_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {

          self.trigger('read_slip_head_changed', data.feeSlipHeads);
        } else if (data.status == 'e') {
          showToast("No tranaction available.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //========read_transaction========
  self.on('read_transaction', function (student_id) {
    console.log('i am in read Fees Trancation api call from ajax');
    let req = {};
    $.ajax({
      url: '/receive_fees/read_transaction/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {

        if (data.status == 's') {

          self.transactions = data.transactions;
          self.trigger('read_transaction_changed', data.transactions);
        } else if (data.status == 'e') {
          showToast("No tranaction available.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //=====read student ====
  self.on('read_student', function (enrol) {
    console.log('i am in read Student for Receiving Fees api call from ajax');
    let req = {};
    $.ajax({
      url: '/receive_fees/read_student/' + enrol,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_student_changed', data.students, getCookie('session_id'));
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //=====read student  by Receipt No====
  self.on('read_student_by_receipt_no', function (receipt_id) {
    console.log('i am in read Student for Receiving Fees api call from ajax');
    let req = {};
    $.ajax({
      url: '/receive_fees/read_student_by_receipt_no/' + receipt_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_student_by_receipt_no_changed', data.students);
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //========== read fee slip by students ===
  self.on('read_fee_slip', function (student_id) {
    console.log('i am in read fee fee slip api call from ajax');
    let req = {};
    $.ajax({
      url: '/receive_fees/read_fee_slip/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.fee_slips = data.fee_slips;
          self.trigger('read_feeslip_changed', data.fee_slips);
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_fees', function (obj) {

    $.ajax({
      url: '/receive_fees/add',
      type: "POST",
      async: false,
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('success');

          toastr.success("Fee Received Successfully");
          self.trigger('add_fees_changed');
        } else if (data.status == 'e') {
          showToast("Error in Mapping Heads. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_transaction', function (receipt_id) {
    $.ajax({
      url: '/receive_fees/delete_transaction/' + receipt_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempTransaction = self.transactions.filter(c => {
            return c.receipt_id != receipt_id;
          });
          self.transactions = tempTransaction;
          toastr.info("transaction Deleted Successfully");
          self.trigger('delete_transaction_changed', self.transactions);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function FeeSlipStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.slips = [];

  self.on('read_slips', function () {
    console.log('i am in read slips api call from ajax');
    let req = {};
    $.ajax({
      url: '/fee_slips',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.slips = data.slips;
          self.trigger('slips_changed', data.slips);
        } else if (data.status == 'e') {
          showToast("Slip Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempSlips = self.slips.filter(c => {
            return c.fee_slip_name != fee_slip_name;
          });
          self.slips = tempSlips;
          toastr.info("Slip Deleted Successfully");
          self.trigger('slips_changed', self.slips);
        } else if (data.status == 'e') {
          showToast("Error Deleting Head. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_slip', function (fee_slip_name, old_fee_slip_name) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.slips = self.slips.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_slip', function (fee_slip_name) {
    let req = {};
    req.fee_slip_name = fee_slip_name;
    $.ajax({
      url: '/fee_slips/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add fee slip after');
          let obj = {};
          obj.fee_slip_name = fee_slip_name;
          self.slips = [obj, ...self.slips];
          toastr.success("Slip Inserserted Successfully ");
          self.trigger('slips_changed', self.slips);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function FeesReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  //========= read head wise fees ==========
  self.headWiseData = [];
  self.on('read_head_wise_fees', function (obj) {
    console.log('i am in read head wise fees api call from ajax');
    let req = {};
    /* req.start_date=obj.start_date
     req.end_date=obj.end_date*/
    $.ajax({
      url: '/fees_report/read_head_wise_fees/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);

        if (data.status == 's') {
          console.log("===================");
          console.log(data.headWiseData);
          self.headWiseData = data.headWiseData;
          self.trigger('read_head_wise_changed', data.headWiseData, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("data read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //====== read head category wise fees ======

  self.headCategoryWiseData = [];
  self.on('read_head_category_wise_fees', function (obj) {
    console.log('i am in read head wise fees api call from ajax');
    let req = {};
    /* req.start_date=obj.start_date
     req.end_date=obj.end_date*/
    $.ajax({
      url: '/fees_report/read_head_category_wise_fees/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);

        if (data.status == 's') {
          console.log("===================");
          console.log(data.headCategoryWiseData);
          self.headCategoryWiseData = data.headCategoryWiseData;
          self.trigger('read_head_category_wise_changed', data.headCategoryWiseData, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("data read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //========= read un assigned students ============
  self.on('read_no_scheme', function () {
    console.log('i am in read_no_scheme api call from ajax');
    let req = {};
    $.ajax({
      url: '/fees_report/read_un_assigned',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_no_scheme_changed', data.students, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("students Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //========= read session wise fees plan (scheme)==

  self.on('read_session_scheme', function (session_id) {
    console.log('i am in  read_session_scheme api call from ajax');
    $.ajax({
      url: '/fees_report/read_session_scheme/' + session_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.schemes = data.schemes;
          self.trigger('read_session_scheme_changed', data.schemes, data.grand_total, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Error in reading data. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //========== read Issued Letter =============

  self.on('read_issued_fees_letter', function (month_id) {
    console.log('i am in  read_issued_fees_letter api call from ajax');
    console.log("id =" + month_id);
    $.ajax({
      url: '/fees_report/read_issued_fees_letter/' + month_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.letter_students = data.letter_students;
          self.trigger('read_fees_letter_changed', data.letter_students, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Error in reading data. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //============== read assigned students =========
  self.on('read_assigned_students', function (fee_plan_id) {
    console.log('i am in  read_assigned_students api call from ajax');
    console.log("id =" + fee_plan_id);
    $.ajax({
      url: '/fees_report/read_assigned_students/' + fee_plan_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.assignedStudents = data.assignedStudents;
          self.trigger('read_assigned_student_changed', data.assignedStudents, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Error in reading data. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //======= read datewise fees ===============
  self.dateWiseData = [];
  self.on('read_date_wise_fees', function (obj) {
    console.log('i am in read date wise fees api call from ajax');
    let req = {};
    /* req.start_date=obj.start_date
     req.end_date=obj.end_date*/
    $.ajax({
      url: '/fees_report/read_date_wise_fees/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.dateWiseData = data.dateWiseData;
          self.trigger('read_date_fees_changed', data.dateWiseData, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("data read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //=========== read early fees ========


  self.scholarships = [];
  self.on('read_early_fees_payer', function (obj) {
    console.log('i am in read advanceFees fees api call from ajax');
    let req = {};
    /* req.start_date=obj.start_date
     req.end_date=obj.end_date*/
    $.ajax({
      url: '/fees_report/read_early_fees_payer/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.advanceFees = data.advanceFees;
          self.trigger('read_advanced_fees_changed', data.advanceFees, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("data read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //======= read scholarship list ========

  self.scholarships = [];
  self.on('read_scholarship_list', function (obj) {
    console.log('i am in read scholarship fees api call from ajax');
    let req = {};
    /* req.start_date=obj.start_date
     req.end_date=obj.end_date*/
    $.ajax({
      url: '/fees_report/getScholarshipList/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.scholarships = data.scholarships;
          self.trigger('read_scholarship_list_changed', data.scholarships, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("data read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //=========== read fees collection summary ======
  self.collectionSummary = [];
  self.on('read_collection_summary', function (obj) {
    console.log("path");
    console.log(obj);
    console.log("-------path----");
    $.ajax({
      url: '/fees_report/read_collection_summary',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log("---=======---collection=======-----======");
        console.log(data);
        console.log("---=======---=======-----======");
        if (data.status == 's') {
          self.collectionSummary = data.collectionSummary;
          self.trigger('read_collection_summary_changed', data.collectionSummary, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Error in reading data. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //========= read daily fees collection ======
  self.dailyData = [];
  self.on('read_daily_fees', function (obj) {
    console.log('i am in read daily fees api call from ajax');
    let req = {};
    /* req.start_date=obj.start_date
     req.end_date=obj.end_date*/
    $.ajax({
      url: '/fees_report/read_daily_fees/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.dailyData = data.dailyData;
          self.trigger('read_daily_fees_changed', data.dailyData, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("data read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //======= read fees register ================ 
  self.registerData = [];
  self.on('read_fees_register', function (obj) {
    console.log('i am in read fees register api call from ajax');
    let req = {};
    /* req.start_date=obj.start_date
     req.end_date=obj.end_date*/
    $.ajax({
      url: '/fees_report/read_fees_register/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.registerData = data.registerData;
          self.trigger('read_fees_register_changed', data.registerData, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("data read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //============ read month wise fees============
  self.monthlyData = [];
  self.on('read_monthly_fees', function (obj) {
    console.log('i am in read monthly fees api call from ajax');
    let req = {};
    /* req.start_date=obj.start_date
     req.end_date=obj.end_date*/
    $.ajax({
      url: '/fees_report/read_monthly_fees/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.monthlyData = data.monthlyData;
          self.trigger('read_monthly_fees_changed', data.monthlyData, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("data read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //============ read outstanding by date ==========

  self.outstandingData = [];
  self.on('read_outstanding_fees', function (obj) {
    console.log('i am in read outstanding fees api call from ajax');
    let req = {};
    /* req.start_date=obj.start_date
     req.end_date=obj.end_date*/
    $.ajax({
      url: '/fees_report/read_outstanding_fees/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log("--=000---");
        console.log(data);
        if (data.status == 's') {
          self.outstandingData = data.outstandingData;
          self.trigger('read_outstanding_fees_changed', data.outstandingData, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("data read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //============ read outstanding by class ==========

  self.on('read_outstanding_classwise', function (obj) {
    $.ajax({
      url: '/fees_report/read_outstanding_classwise',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.outstandingFees = data.outstandingFees;
          self.trigger('read_outstanding_classwise_changed', data.outstandingFees, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Error in reading data. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //=========== read read_due_classwise =======
  self.on('read_due_classwise', function (obj) {
    $.ajax({
      url: '/fees_report/read_due_classwise',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log("=========data =========");
        console.log(data);
        if (data.status == 's') {
          self.classWiseDueFees = data.classWiseDueFees;
          self.trigger('read_due_classwise_changed', data.classWiseDueFees, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Error in reading data. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //========== read advance classwise =========

  self.on('read_advance_classwise', function (obj) {
    $.ajax({
      url: '/fees_report/read_advance_classwise',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log("=========data =========");
        console.log(data);
        if (data.status == 's') {
          self.classWiseAdvanceFees = data.classWiseAdvanceFees;
          self.trigger('read_advance_classwise_changed', data.classWiseAdvanceFees, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Error in reading data. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //=============== read estimated fees =============

  self.on('read_estimated_fees', function (obj) {
    $.ajax({
      url: '/fees_report/read_estimated_fees',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log("---=======---=======-----======");
        console.log(data);
        console.log("---=======---=======-----======");
        if (data.status == 's') {
          self.estimatedFees = data.estimatedFees;
          self.trigger('read_estimated_fees_changed', data.estimatedFees, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Error in reading data. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //======= read bank wise fees ==============
  self.on('read_bank_wise_fees', function (obj) {

    $.ajax({
      url: '/fees_report/read_bank_wise_fees',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {

        console.log("---=======---=======-----======");
        if (data.status == 's') {
          self.bankWiseFees = data.bankWiseFees;
          self.trigger('read_bank_wise_changed', data.bankWiseFees, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Error in reading data. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //========read banks===========
  self.on('read_banks', function () {
    console.log('i am in banks api call from ajax');
    let req = {};
    $.ajax({
      url: '/fees_report/read_banks',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.banks = data.banks;
          self.trigger('read_bank_changed', data.banks, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("bank list Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //======= read modes =======  
  self.on('read_mode', function () {
    console.log('i am in mode api call from ajax');
    let req = {};
    $.ajax({
      url: '/fees_report/read_mode',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.modes = data.modes;
          self.trigger('read_mode_changed', data.modes, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("mode list Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*self.dailyFees = []
    self.on('read_daily_fees', function(obj) {
    console.log('i am in read daily fees api call from ajax')
    let req = {}
   
    $.ajax({
      url:'/fees_report/read_daily_fees/'+obj.start_date+'/'+obj.end_date,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.dailyFees = data.dailyFees
            self.trigger('read_monthly_fees_changed', data.dailyFees)
          }else if(data.status == 'e'){
            showToast("Categories Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/

  self.on('csv_export_month_wise', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_export_month_wise',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_month_wise_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  //============== daily fees export =========
  self.on('csv_export_daily_fees', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_export_daily_fees',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_daily_collection_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_assigned_scheme', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_assigned_scheme',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_assigned_scheme_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  //========== fees register ===========

  self.on('csv_fees_register', function (obj) {
    console.log("---inside-----");
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_fees_register',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_register_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_bankwise_collection', function (obj) {

    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_bankwise_collection',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_bank_collection_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_datewise_fees', function (obj) {

    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_datewise_fees',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_datewise_fees_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_headwise_summary', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_headwise_summary',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_headwise_summary_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_headwise_fees', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_headwise_fees',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_headwise_fees_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_outstanding_fees', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_outstanding_fees',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_outstanding_fees_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_outstanding_by_class', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_outstanding_by_class',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_outstanding_byclass_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_dueby_class', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_dueby_class',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_due_byclass_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_fees_collection', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_fees_collection',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_fees_collection_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_estimated_fees', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_estimated_fees',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_estimated_fees_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_advance_fees', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_advance_fees',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_advance_fees_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_scholarship_list', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_scholarship_list',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_scholarshiplist_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });
  self.on('csv_issued_letter', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_issued_letter',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_issued_letter_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_fees_scheme', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_fees_scheme',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_fees_scheme_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });
  self.on('csv_scheme_unassigned', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/fees_report/csv_scheme_unassigned',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_fees_scheme_unassigned_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });
}
function FeeWithdrawStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.students = [];

  //========== read fee slip by students ===
  self.on('read_fee_slip', function (student_id) {
    console.log('i am in read fee fee slip api call from ajax');
    let req = {};
    $.ajax({
      url: '/fees_withdraw/read_fee_slip/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.fee_slips = data.fee_slips;
          self.trigger('read_feeslip_changed', data.fee_slips);
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //=====read student ====
  self.on('read_student', function (enrol) {
    console.log('i am in read Student for Receiving Fees api call from ajax');
    let req = {};
    $.ajax({
      url: '/fees_withdraw/read_student/' + enrol,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_student_changed', data.students, getCookie('session_id'));
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('active_fees', function (fee_slip_id, student_id) {
    let req = {};
    req.fee_slip_id = fee_slip_id;
    req.student_id = student_id;
    $.ajax({
      url: '/fees_withdraw/active_fees/' + fee_slip_id + '/' + student_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Fees Active successfully ");
          self.trigger('active_fees_changed');
        } else if (data.status == 'e') {
          showToast("Error assigning students. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function FinalAssessmentReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_standard', function () {
    let req = {};
    $.ajax({
      url: '/final_assessment_report/read_standard/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_standard_changed', data.standards, data.sections, data.end_date, data.end_date_final);
        } else if (data.status == 'e') {
          showToast("Standard and Sections Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/final_assessment_report/read_section/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student', function (standard_id, section_id) {
    let req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    $.ajax({
      url: '/final_assessment_report/read_student/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_student_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_final_assessment_report_card_one_to_four', function (obj) {
    console.log('i am in read_categories api call from ajax');
    $.ajax({
      url: '/final_assessment_report/read_final_assessment_report_card_one_to_four',
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(obj),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {

          self.trigger('read_final_assessment_report_card_one_to_four_changed', data.marks);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_final_assessment_report_card_five_to_eight', function (obj) {
    console.log('i am in read_categories api call from ajax');
    $.ajax({
      url: '/final_assessment_report/read_final_assessment_report_card_five_to_eight',
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(obj),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {

          self.trigger('read_final_assessment_report_card_five_to_eight_changed', data.marks);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_final_assessment_report_card_nine', function (obj) {
    $.ajax({
      url: '/final_assessment_report/read_final_assessment_report_card_nine',
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(obj),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {

          self.trigger('read_final_assessment_report_card_nine_changed', data.marks);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_final_assessment_report_card_eleven', function (obj) {
    $.ajax({
      url: '/final_assessment_report/read_final_assessment_report_card_eleven',
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(obj),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {

          self.trigger('read_final_assessment_report_card_eleven_changed', data.marks);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function FineStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.fines = [];

  self.on('read_fine_setting', function () {
    console.log('i am in read api call from ajax');
    let req = {};
    $.ajax({
      url: '/fine_setting',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.fines = data.fines;
          self.trigger('read_fine_changed', data.fines);
        } else if (data.status == 'e') {
          showToast("Fine Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add', function (fine_grace_preiod, fine_amount, fine_type) {
    let req = {};
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add event after');
          let obj = {};
          obj.id = data.id;
          obj.fine_type = fine_type;
          obj.fine_grace_preiod = fine_grace_preiod;
          obj.fine_amount = fine_amount;
          self.fines = [obj, ...self.fines];
          toastr.success("Fine Inserserted Successfully ");
          self.trigger('add_bank_changed', self.fines);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function FirstAssessmentReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_standard', function () {
    let req = {};
    $.ajax({
      url: '/first_assessment_report/read_standard/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_standard_changed', data.standards, data.sections, data.end_date);
        } else if (data.status == 'e') {
          showToast("Standard and Sections Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/first_assessment_report/read_section/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student', function (standard_id, section_id) {
    let req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    $.ajax({
      url: '/first_assessment_report/read_student/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_student_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_first_assessment_report_card_one_to_four', function (obj) {
    console.log('i am in read_categories api call from ajax');
    $.ajax({
      url: '/first_assessment_report/read_first_assessment_report_card_one_to_four',
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(obj),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {

          self.trigger('read_first_assessment_report_card_one_to_four_changed', data.marks);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_first_assessment_report_card_five_to_eight', function (obj) {
    console.log('i am in read_categories api call from ajax');
    $.ajax({
      url: '/first_assessment_report/read_first_assessment_report_card_five_to_eight',
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(obj),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {

          self.trigger('read_first_assessment_report_card_five_to_eight_changed', data.marks);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_first_assessment_report_card_nine', function (obj) {
    $.ajax({
      url: '/first_assessment_report/read_first_assessment_report_card_nine',
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(obj),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {

          self.trigger('read_first_assessment_report_card_nine_changed', data.marks);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_first_assessment_report_card_eleven', function (obj) {
    $.ajax({
      url: '/first_assessment_report/read_first_assessment_report_card_eleven',
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(obj),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {

          self.trigger('read_first_assessment_report_card_eleven_changed', data.marks);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function GradeStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.grades = [];

  self.on('read_exam_schemes', function () {
    let req = {};
    $.ajax({
      url: '/exam-scheme',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('exam_scheme_changed', data.examSchemes);
        } else if (data.status == 'e') {
          showToast("Exam Scheme Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('exam_type_changed', data.examTypes);
        } else if (data.status == 'e') {
          showToast("Exam Type Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_grade_csv', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/grade/read_grade_csv/',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_grade_csv_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_grades', function (scheme_id, exam_type_id) {
    $.ajax({
      url: '/grade/exam-type/' + scheme_id + '/' + exam_type_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.grades = data.grades;
          self.trigger('grades_changed', data.grades);
        } else if (data.status == 'e') {
          showToast("Grade Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          let ob = {};
          ob.grade_id = data.grade_id;
          ob.min_marks = obj.min_marks;
          ob.max_marks = obj.max_marks;
          ob.grade = obj.grade;
          self.grades = [ob, ...self.grades];
          toastr.success("Grade Created Successfully ");
          self.trigger('add_grade_changed', self.grades);
        } else if (data.status == 'e') {
          showToast("Error adding grade. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          self.grades = self.grades.map(cat => {
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
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempExamScheme = self.grades.filter(c => {
            return c.grade_id != grade_id;
          });
          self.grades = tempExamScheme;
          toastr.info("Grade Deleted Successfully");
          self.trigger('delete_grade_changed', self.grades);
        } else if (data.status == 'e') {
          showToast("Error Deleting Grade. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function IdCardStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_standard', function () {
    let req = {};
    $.ajax({
      url: '/id_card/read_standard/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Standard Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/id_card/read_section/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student', function (standard_id, section_id, enroll_number) {
    console.log(standard_id);
    console.log(section_id);
    console.log(enroll_number);
    let req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    req.enroll_number = enroll_number;
    $.ajax({
      url: '/id_card/read_student/' + standard_id + '/' + section_id + '/' + enroll_number,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_student_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_id_card', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/id_card/csv_export_id_card',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_id_card_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_id_card', function (student_id) {
    console.log(student_id);
    let req = {};
    req.student_id = student_id;
    $.ajax({
      url: '/id_card/read_id_card/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_id_card_changed', data.students_id_card_details, getCookie('session_id'));
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_escort_card', function (student_id) {
    console.log(student_id);
    let req = {};
    req.student_id = student_id;
    $.ajax({
      url: '/id_card/read_escort_card/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_escort_card_changed', data.students_escort_card_details, getCookie('session_id'));
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function IdSignatureStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.epmloyee_card_setup = [];

  self.on('read_signature', function () {
    let req = {};
    $.ajax({
      url: '/id_signature/read_signature/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.signature = data.signature;
          self.trigger('read_signature_changed', data.signature);
        } else if (data.status == 'e') {
          showToast("Standard Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_signature', function (type) {
    let req = {};
    req.type = type;
    $.ajax({
      url: '/id_signature/add_signature',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add item after');
          toastr.success("Data Inserserted Successfully ");
          self.trigger('add_signature_changed', self.signature, data.type);
        } else if (data.status == 'e') {
          showToast("Error adding Signature. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_signature', function (type, old_type) {
    let req = {};
    req.type = type;
    req.old_type = old_type;
    $.ajax({
      url: '/id_signature/edit_signature/' + type + '/' + old_type,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Data Updated Successfully ");
          self.trigger('edit_signature_changed', self.signature, data.type);
        } else if (data.status == 'e') {
          showToast("Error Updateing Signature. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_signature', function (type) {
    let req = {};
    req.type = type;
    $.ajax({
      url: '/id_signature/delete_signature/' + type,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Data Deleted Successfully ");
          self.trigger('delete_signature_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Signature. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('active_signature', function (type) {
    let req = {};
    req.type = type;
    $.ajax({
      url: '/id_signature/active_signature/' + type,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Data Updated Successfully ");
          self.trigger('active_signature_changed', data.active_signature);
        } else if (data.status == 'e') {
          showToast("Error Updateing Signature. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('upload_signature_image', function (signature_image, type) {
    var form_data = new FormData();
    form_data.append("signature_picture", signature_image);
    $.ajax({
      url: '/id_signature/upload_signature_image/signatureImages/' + type,
      type: "POST",
      dataType: 'script',
      processData: false,
      contentType: false,
      data: form_data,
      headers: { "Authorization": getCookie('token') },
      success: function (image_name) {
        console.log(image_name);
        self.trigger('upload_signature_image_changed', image_name);
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function InfirmaryCaseStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.infirmaryCases = [];
  self.infirmaryCategories = [];

  self.on('csv_export_infirmary_case', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/infirmary_case/csv_export_infirmary_case',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_infirmary_case_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_infirmary_category', function () {
    console.log('i am in read_sections api call from ajax');
    let req = {};
    $.ajax({
      url: '/infirmary_case/readInfirmaryCategory',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCategories = data.infirmaryCategories;
          self.trigger('read_infirmary_category_changed', data.infirmaryCategories);
        } else if (data.status == 'e') {
          showToast("case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_infirmary_case', function () {
    console.log('i am in read_section api call from ajax');
    let req = {};
    $.ajax({
      url: '/infirmary_case/read_infirmary_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCases = data.infirmaryCases;
          self.trigger('read_infirmary_case_changed', data.infirmaryCases);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempInfarmaryCases = self.infirmaryCases.filter(c => {
            return c.case_id != id;
          });
          self.infirmaryCases = tempInfarmaryCases;
          toastr.info("Case Deleted Successfully");
          self.trigger('delete_infirmary_case_changed', self.infirmaryCases);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_infirmary_case', function (case_name, category_id, id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.infirmaryCases = self.infirmaryCases.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_infirmary_case', function (case_name, category_id) {
    let req = {};
    req.case_name = case_name;
    req.category_id = category_id;
    $.ajax({
      url: '/infirmary_case/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add case  after');
          let obj = {};
          obj.case_id = data.case_id;
          obj.case_name = case_name;
          obj.category_id = category_id;
          // obj.name = name
          self.infirmaryCases = [obj, ...self.infirmaryCases];
          toastr.success("Case  Inserserted Successfully ");
          self.trigger('add_infirmary_case_changed', self.infirmaryCases);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function InfirmaryCategoryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.infirmaryCategories = [];

  self.on('csv_export_infirmary_category', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/infirmary_category/csv_export_infirmary_category',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_infirmary_category_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_categories', function () {
    console.log('i am in read_courses api call from ajax');
    let req = {};
    $.ajax({
      url: '/infirmary_category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCategories = data.infirmaryCategories;
          self.trigger('categories_changed', data.infirmaryCategories);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempCategories = self.infirmaryCategories.filter(c => {
            return c.category_id != id;
          });
          self.infirmaryCategories = tempCategories;
          toastr.info("Category Deleted Successfully");
          self.trigger('categories_changed', self.infirmaryCategories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Category. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_category', function (category_name, id) {
    let req = {};
    req.category_name = category_name;
    req.id = id;
    $.ajax({
      url: '/infirmary_category/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.infirmaryCategories = self.infirmaryCategories.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_category', function (category_name) {
    let req = {};
    req.category_name = category_name;
    $.ajax({
      url: '/infirmary_category/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add category after');
          let obj = {};
          obj.category_id = data.id;
          obj.category_name = category_name;
          self.infirmaryCategories = [obj, ...self.infirmaryCategories];
          toastr.success("Category Inserserted Successfully ");
          self.trigger('categories_changed', self.infirmaryCategories);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
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

  self.on('csv_export_inventory_category', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_category/csv_export_inventory_category',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_inventory_category_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_inventory_category', function () {
    console.log('i am in category api call from ajax');
    let req = {};
    $.ajax({
      url: '/inventory_category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryCategories = data.inventoryCategories;
          self.trigger('read_inventory_category_changed', data.inventoryCategories);
        } else if (data.status == 'e') {
          showToast("Roles Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempInventoryCategory = self.inventoryCategories.filter(c => {
            return c.category_id != id;
          });
          self.inventoryCategories = tempInventoryCategory;
          toastr.info("Category Deleted Successfully");
          self.trigger('delete_inventory_category_changed', self.inventoryCategories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Category. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_category', function (department, category_name, id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.inventoryCategories = self.inventoryCategories.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_category', function (department, category_name) {
    let req = {};
    req.department = department;
    req.category_name = category_name;
    $.ajax({
      url: '/inventory_category/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add role after');
          let obj = {};
          obj.category_id = data.category_id;
          obj.category_name = category_name;
          obj.department = department;
          self.inventoryCategories = [obj, ...self.inventoryCategories];
          toastr.success("Categeory Inserserted Successfully ");
          self.trigger('add_inventory_category_changed', self.inventoryCategories);
        } else if (data.status == 'e') {
          showToast("Error adding Categeory. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function InventoryDepartmentStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventoryDepartments = [];

  self.on('read_inventorydepartment', function () {
    console.log('i am in inventorydepartment api call from ajax');
    let req = {};
    $.ajax({
      url: '/inventory_department/read_inventorydepartment',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryDepartments = data.inventoryDepartments;
          self.trigger('read_inventorydepartment_changed', data.inventoryDepartments);
        } else if (data.status == 'e') {
          showToast("Department Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('readFreeStaff', function (id) {
    console.log('i am in readFreeStaff staff api call from ajax');
    let req = {};
    $.ajax({
      url: '/inventory_department/readFreeStaff/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.freeStaffs = data.freeStaffs;
          self.trigger('read_readFreeStaff_changed', data.freeStaffs);
        } else if (data.status == 'e') {
          showToast("read Free Staff Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('readAssignStaff', function () {
    console.log('i am in inventorydepartment api call from ajax');
    let req = {};
    $.ajax({
      url: '/inventory_department/readAssignStaff',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.assignedStaffs = data.assignedStaffs;
          self.trigger('read_readAssignStaff_changed', data.assignedStaffs);
        } else if (data.status == 'e') {
          showToast("Assign Staff Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempInventoryDepartment = self.inventoryDepartments.filter(c => {
            return c.department != id;
          });
          self.inventoryDepartments = tempInventoryDepartment;
          toastr.info("Department Deleted Successfully");
          self.trigger('delete_inventorydepartment_changed', self.inventoryDepartments);
        } else if (data.status == 'e') {
          showToast("Error Deleting Department. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventorydepartment', function (department, id) {
    let req = {};
    req.department = department;
    req.id = id;
    $.ajax({
      url: '/inventory_department/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.inventoryDepartments = self.inventoryDepartments.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventorydepartment', function (department) {
    let req = {};
    req.department = department;
    $.ajax({
      url: '/inventory_department/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add department after');
          let obj = {};
          obj.department = department;
          // obj.name = name
          self.inventoryDepartments = [obj, ...self.inventoryDepartments];
          toastr.success("Department Inserserted Successfully ");
          self.trigger('add_inventorydepartment_changed', self.inventoryDepartments);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('assign_staff', function (department, staffs) {
    var obj = {};
    obj['department'] = department;
    obj['staffs'] = staffs;
    $.ajax({
      url: '/inventory_department/assign_staff',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          toastr.success("staff assigned successfully ");
          self.trigger('assign_staffs_changed', staffs);
        } else if (data.status == 'e') {
          showToast("Error assigning students. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('free_up_staff', function (department, staffs) {
    var obj = {};
    obj['department'] = department;
    obj['staffs'] = staffs;
    $.ajax({
      url: '/inventory_department/free_up_staff',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {

          toastr.success("Staff assigned successfully ");
          self.trigger('assign_staffs_changed', staffs);
        } else if (data.status == 'e') {
          showToast("Error while free up staffs. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function InventoryIssueStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventoryIssues = [];

  self.on('csv_export_returnable_item', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_issue/csv_export_returnable_item',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_returnable_item_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_export_inventory_issue', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_issue/csv_export_inventory_issue',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_inventory_issue_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });
  //read Inventory Isseu

  self.on('read_inventory_issue', function (id, type) {
    console.log("item_id");
    console.log(id);
    //console.log('i am in stock api call from ajax')
    let req = {};
    $.ajax({
      url: '/inventory_issue/' + id + '/' + type,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryIssues = data.inventoryIssues;
          self.trigger('read_inventory_issue_changed', data.inventoryIssues);
        } else if (data.status == 'e') {
          showToast("Item Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('read_inventory_returnable_item', function (id, type) {
    console.log("item_id");
    console.log(id);
    //console.log('i am in stock api call from ajax')
    let req = {};
    $.ajax({
      url: '/inventory_issue/read_returnable/' + id + '/' + type,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryReturnableGoods = data.inventoryReturnableGoods;
          self.trigger('read_inventory_returnable_changed', data.inventoryReturnableGoods);
        } else if (data.status == 'e') {
          showToast("Item Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
    let req = {};
    $.ajax({
      url: '/inventory_issue/read_qunatity/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.availableItems = data.availableItems;
          self.rack_ids = data.rack_ids;
          self.trigger('read_inventory_available_quantity_changed', data.availableItems, self.rack_ids);
        } else if (data.status == 'e') {
          showToast("Item Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      type: 'POST',
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempInventoryIssues = self.inventoryIssues.filter(c => {
            return c.issue_id != id;
          });
          self.inventoryIssues = tempInventoryIssues;
          toastr.info("Issue Item Deleted Successfully");
          self.trigger('delete_inventory_issue_changed', self.inventoryIssues);
        } else if (data.status == 'e') {
          showToast("Error Deleting Issue Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_issue', function (issue_date, category_id, sub_category_id, item_id, return_type, issue_type, issue_to, staff_id, available_quantity, issue_quantity, unit_id, purpose, rack_id, id, category_name, subcategory_name, item_name) {
    let req = {};
    req.issue_date = issue_date, req.category_id = category_id, req.sub_category_id = sub_category_id, req.item_id = item_id, req.return_type = return_type, req.issue_type = issue_type, req.issue_to = issue_to, req.staff_id = staff_id, req.available_quantity = available_quantity, req.issue_quantity = issue_quantity, req.unit_id = unit_id, req.purpose = purpose, req.rack_id = rack_id, req.id = id;
    $.ajax({
      url: '/inventory_issue/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.inventoryIssues = self.inventoryIssues.map(cat => {
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
              cat.category_name = category_name;
              cat.subcategory_name = subcategory_name;
              cat.item_name = item_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Issue item Updated Successfully ");
          self.trigger('edit_inventory_issue_changed', self.inventoryIssues);
        } else if (data.status == 'e') {
          showToast("Error updating Issue Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_issue', function (issue_date, category_id, sub_category_id, item_id, return_type, issue_type, issue_to, staff_id, available_quantity, issue_quantity, unit_id, purpose, rack_id, category_name, subcategory_name, item_name) {
    let req = {};
    req.issue_date = issue_date, req.category_id = category_id, req.sub_category_id = sub_category_id, req.item_id = item_id, req.return_type = return_type, req.issue_type = issue_type, req.issue_to = issue_to, req.staff_id = staff_id, req.available_quantity = available_quantity, req.issue_quantity = issue_quantity, req.unit_id = unit_id, req.purpose = purpose, req.rack_id = rack_id, $.ajax({
      url: '/inventory_issue/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Issue after');
          let obj = {};
          obj.issue_id = data.issue_id;
          obj.issue_date = issue_date, obj.category_id = category_id, obj.sub_category_id = sub_category_id, obj.item_id = item_id, obj.return_type = return_type, obj.issue_type = issue_type, obj.issue_to = issue_to, obj.staff_id = staff_id, obj.available_quantity = available_quantity, obj.issue_quantity = issue_quantity, obj.unit_id = unit_id, obj.purpose = purpose, obj.rack_id = rack_id, obj.category_name = category_name;
          obj.subcategory_name = subcategory_name;
          obj.item_name = item_name;
          // obj.category_id = category_id
          self.inventoryIssues = [obj, ...self.inventoryIssues];
          toastr.success("Issue Item Inserserted Successfully ");
          self.trigger('add_inventory_issue_changed', self.inventoryIssues);
        } else if (data.status == 'e') {
          showToast("Error adding Issue Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // add Retun goods

  self.on('add_inventory_return_goods', function (obj, return_date, return_to, return_quantity, remark) {
    let req = {};
    req.obj = obj, req.return_date = return_date, req.return_to = return_to, req.return_quantity = return_quantity, req.remark = remark,
    /* req.issue_type=issue_type,
     req.issue_to=issue_to,
     req.staff_id=staff_id,
     req.available_quantity=available_quantity,
     req.issue_quantity=issue_quantity,
     req.unit_id=unit_id,
     req.purpose=purpose,
     req.rack_id=rack_id,*/
    $.ajax({
      url: '/inventory_issue/add_inventory_return_goods',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Retun goods after');
          let obj = {};
          obj.return_date = return_date, obj.return_to = return_to, obj.return_quantity = return_quantity, obj.remark = remark,
          /*obj.issue_id=data.issue_id
          obj.issue_date=issue_date,
          obj.category_id=category_id,
          obj.sub_category_id=sub_category_id,
          obj.item_id=item_id,
          obj.return_type=return_type,
          obj.issue_type=issue_type,
          obj.issue_to=issue_to,
          obj.staff_id=staff_id,
          obj.available_quantity=available_quantity,
          obj.issue_quantity=issue_quantity,
          obj.unit_id=unit_id,
          obj.purpose=purpose,
          obj.rack_id=rack_id,*/
          // obj.category_id = category_id
          self.inventoryReturnableGoods = [obj, ...self.inventoryReturnableGoods];
          toastr.success("Issue Item Inserserted Successfully ");
          self.trigger('add_inventory_return_goods_changed', self.inventoryReturnableGoods);
        } else if (data.status == 'e') {
          showToast("Error adding Issue Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function InventoryItemStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventoryItems = [];

  self.on('csv_export_inventory_item', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_item/csv_export_inventory_item',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_inventory_item_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  //read Inventory Item

  self.on('read_inventory_item', function () {
    console.log('i am in Item api call from ajax');
    let req = {};
    $.ajax({
      url: '/inventory_item',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryItems = data.inventoryItems;
          self.trigger('read_inventory_item_changed', data.inventoryItems);
        } else if (data.status == 'e') {
          showToast("Item Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempInventoryItems = self.inventoryItems.filter(c => {
            return c.item_id != id;
          });
          self.inventoryItems = tempInventoryItems;
          toastr.info("Item Deleted Successfully");
          self.trigger('delete_inventory_item_changed', self.inventoryItems);
        } else if (data.status == 'e') {
          showToast("Error Deleting Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_item', function (department, category_id, sub_category_id, item_name, id, category_name, subcategory_name) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.inventoryItems = self.inventoryItems.map(cat => {
            if (cat.item_id == id) {
              cat.item_id = id;
              cat.category_id = category_id;
              cat.department = department;
              cat.sub_category_id = sub_category_id;
              cat.item_name = item_name;
              cat.category_name = category_name;
              cat.sub_category = subcategory_name;
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_item', function (department, category_id, sub_category_id, item_name, category_name, subcategory_name) {
    let req = {};
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Categeory after');
          let obj = {};
          obj.item_id = data.item_id;
          obj.sub_category_id = sub_category_id;
          obj.department = department;
          obj.category_id = category_id;
          obj.item_name = item_name;
          obj.category_name = category_name;
          obj.sub_category = subcategory_name;
          self.inventoryItems = [obj, ...self.inventoryItems];
          toastr.success("Item Inserserted Successfully ");
          self.trigger('add_inventory_item_changed', self.inventoryItems);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function InventoryRackStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventoryRacks = [];

  self.on('csv_export_inventory_rack', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_rack/csv_export_inventory_rack',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_inventory_rack_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_inventory_rack', function () {
    console.log('i am in Rack Master api call from ajax');
    let req = {};
    $.ajax({
      url: '/inventory_rack',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryRacks = data.inventoryRacks;
          self.trigger('inventoryRack_changed', data.inventoryRacks);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempRacks = self.inventoryRacks.filter(c => {
            return c.rack_id != id;
          });
          self.inventoryRacks = tempRacks;
          toastr.info("Racks Deleted Successfully");
          self.trigger('inventoryRack_changed', self.inventoryRacks);
        } else if (data.status == 'e') {
          showToast("Error Deleting Rack. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_rack', function (rack_name, id) {
    let req = {};
    req.rack_name = rack_name;
    req.id = id;
    $.ajax({
      url: '/inventory_rack/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.inventoryRacks = self.inventoryRacks.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_rack', function (rack_name) {
    let req = {};
    req.rack_name = rack_name;
    $.ajax({
      url: '/inventory_rack/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add rack after');
          let obj = {};
          obj.rack_id = data.rack_id;
          obj.rack_name = rack_name;
          self.inventoryRacks = [obj, ...self.inventoryRacks];
          toastr.success("Rack Inserserted Successfully ");
          self.trigger('inventoryRack_changed', self.inventoryRacks);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function InventoryReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.receivedFromArray = [];

  self.on('csv_export_issued_goods_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_report/csv_export_issued_goods_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_issued_goods_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_export_inventory_person_wise_issued_goods_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_report/csv_export_inventory_person_wise_issued_goods_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_inventory_person_wise_issued_goods_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_export_inventory_sale_goods_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_report/csv_export_inventory_sale_goods_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_inventory_sale_goods_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_export_inventory_return_goods_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_report/csv_export_inventory_return_goods_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_inventory_return_goods_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_export_inventory_received_goods_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_report/csv_export_inventory_received_goods_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_inventory_received_goods_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_inventory_received_from', function () {
    console.log('i am in recievd Form api call from ajax');
    let req = {};
    $.ajax({
      url: '/inventory_report/read_received_from',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.receivedFromArray = data.receivedFromArray;
          self.trigger('read_inventory_received_from_changed', data.receivedFromArray);
        } else if (data.status == 'e') {
          showToast("Received From Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //read received goods
  self.on('read_inventory_received_goods_report', function (obj) {
    console.log('i am in recievd Form api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    req.received_from = obj.received_from;
    $.ajax({
      url: '/inventory_report/read_inventory_received_goods_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryReceivedGoodsReports = data.inventoryReceivedGoodsReports;
          self.trigger('read_inventory_received_goods_report_changed', data.inventoryReceivedGoodsReports);
        } else if (data.status == 'e') {
          showToast("Received From Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // read issued goods

  self.on('read_inventory_issued_goods_report', function (issue_type, start_date, end_date) {
    console.log('i am in issued goods  api call from ajax');
    let req = {};
    $.ajax({
      // url:'/inventory_issue/'+id+'/'+type,
      url: '/inventory_report/read_inventory_issued_goods_report/' + issue_type + '/' + start_date + '/' + end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryIssuedGoodsReports = data.inventoryIssuedGoodsReports;
          self.trigger('read_inventory_issued_goods_report_changed', data.inventoryIssuedGoodsReports);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //read Issued Person

  self.on('read_inventory_issue_to', function (issue_type) {
    console.log('i am in issue to Form api call from ajax');
    let req = {};
    $.ajax({
      url: '/inventory_report/read_inventory_issue_to/' + issue_type,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.issuedPersons = data.issuedPersons;
          self.trigger('read_inventory_issue_to_changed', data.issuedPersons);
        } else if (data.status == 'e') {
          showToast("data read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // read issued goods person wise

  self.on('read_inventory_person_wise_issued_goods_report', function (issue_type, issue_to, start_date, end_date) {
    console.log('i am in issued goods  api call from ajax');
    let req = {};
    $.ajax({
      // url:'/inventory_issue/'+id+'/'+type,
      url: '/inventory_report/read_inventory_person_wise_issued_goods_report/' + issue_type + '/' + issue_to + '/' + start_date + '/' + end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryPersonWiseIssuedGoodsReports = data.inventoryPersonWiseIssuedGoodsReports;
          self.trigger('read_inventory_person_wise_issued_goods_report_changed', data.inventoryPersonWiseIssuedGoodsReports);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //read category wise inventory item

  self.inventoryItems = [];

  self.on('read_inventory_item', function (category_id) {
    console.log('i am in recievd Form api call from ajax');
    let req = {};
    $.ajax({
      url: '/inventory_report/read_inventory_item/' + category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryItems = data.inventoryItems;
          self.trigger('read_inventory_item_changed', data.inventoryItems);
        } else if (data.status == 'e') {
          showToast("inventory Item Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // read issued goods Item wise

  self.on('read_inventory_item_wise_issued_goods_report', function (category_id, item_id, start_date, end_date) {
    console.log('i am in issued goods  api call from ajax');
    let req = {};
    $.ajax({
      // url:'/inventory_issue/'+id+'/'+type,
      url: '/inventory_report/read_inventory_item_wise_issued_goods_report/' + category_id + '/' + item_id + '/' + start_date + '/' + end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryItemWiseIssuedGoodsReports = data.inventoryItemWiseIssuedGoodsReports;
          self.trigger('read_inventory_item_wise_issued_goods_report_changed', data.inventoryItemWiseIssuedGoodsReports);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // read Sale goods Item wise

  self.on('read_inventory_sale_goods_report', function (start_date, end_date) {
    console.log('i am in sale goods  api call from ajax');
    let req = {};
    $.ajax({
      // url:'/inventory_issue/'+id+'/'+type,
      url: '/inventory_report/read_inventory_sale_goods_report/' + start_date + '/' + end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventorySaleGoodsReports = data.inventorySaleGoodsReports;
          self.trigger('read_inventory_sale_goods_report_changed', data.inventorySaleGoodsReports);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // read Return goods Item wise

  self.on('read_inventory_return_goods_report', function (start_date, end_date) {
    console.log('i am in return goods  api call from ajax');
    let req = {};
    $.ajax({
      // url:'/inventory_issue/'+id+'/'+type,
      url: '/inventory_report/read_inventory_return_goods_report/' + start_date + '/' + end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryReturnGoodsReports = data.inventoryReturnGoodsReports;
          self.trigger('read_inventory_return_goods_report_changed', data.inventoryReturnGoodsReports);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // read Inventory Summary report

  self.on('read_inventory_summary_report', function (start_date, end_date) {
    console.log('i am in return goods  api call from ajax');
    let req = {};
    $.ajax({
      // url:'/inventory_issue/'+id+'/'+type,
      url: '/inventory_report/read_inventory_summary_report/' + start_date + '/' + end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventorySummaryReports = data.inventorySummaryReports;
          self.trigger('read_inventory_summary_report_changed', data.inventorySummaryReports);
        } else if (data.status == 'e') {
          showToast("Data Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function InventorySaleStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventorySales = [];

  self.on('csv_export_inventory_sale', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_sale/csv_export_inventory_sale',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_inventory_sale_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  //read Inventory Isseu

  self.on('read_inventory_sale', function (id) {
    // console.log(id)
    console.log('i am in sale api call from ajax');
    let req = {};
    $.ajax({
      url: '/inventory_sale/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventorySales = data.inventorySales;
          self.trigger('read_inventory_sale_changed', data.inventorySales);
        } else if (data.status == 'e') {
          showToast("Item Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempInventoryIssues = self.inventorySales.filter(c => {
            return c.sale_id != id;
          });
          self.inventorySales = tempInventoryIssues;
          toastr.info("Sale Item Deleted Successfully");
          self.trigger('delete_inventory_sale_changed', self.inventorySales);
        } else if (data.status == 'e') {
          showToast("Error Deleting Issue Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_sale', function (sale_date, category_id, sub_category_id, item_id, sale_to, available_quantity, sale_quantity, unit_id, rate, id, category_name, subcategory_name, item_name) {
    let req = {};
    req.sale_date = sale_date, req.category_id = category_id, req.sub_category_id = sub_category_id, req.item_id = item_id, req.sale_to = sale_to, req.available_quantity = available_quantity, req.sale_quantity = sale_quantity, req.unit_id = unit_id, req.rate = rate, req.id = id;
    $.ajax({
      url: '/inventory_sale/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.inventorySales = self.inventorySales.map(cat => {
            if (cat.received_id == id) {
              cat.sale_date = sale_date, cat.category_id = category_id, cat.sub_category_id = sub_category_id, cat.item_id = item_id, cat.sale_to = sale_to, cat.available_quantity = available_quantity, cat.sale_quantity = sale_quantity, cat.unit_id = unit_id, cat.rate = rate, cat.sale_id = id;
              cat.category_name = category_name, cat.subcategory_name = subcategory_name, cat.item_name = item_name;
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
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('add_inventory_sale', function (sale_date, category_id, sub_category_id, item_id, sale_to, available_quantity, sale_quantity, unit_id, rate, category_name, subcategory_name, item_name) {
    let req = {};
    req.sale_date = sale_date, req.category_id = category_id, req.sub_category_id = sub_category_id, req.item_id = item_id, req.sale_to = sale_to, req.available_quantity = available_quantity, req.sale_quantity = sale_quantity, req.unit_id = unit_id, req.rate = rate, $.ajax({
      url: '/inventory_sale/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Issue after');
          let obj = {};
          obj.sale_id = data.sale_id;
          req.sale_date = sale_date, req.category_id = category_id, req.sub_category_id = sub_category_id, req.item_id = item_id, req.sale_to = sale_to, req.available_quantity = available_quantity, req.sale_quantity = sale_quantity, req.unit_id = unit_id, req.rate = rate, req.category_name = category_name, req.subcategory_name = subcategory_name, req.item_name = item_name;
          // obj.category_id = category_id
          self.inventorySales = [obj, ...self.inventorySales];
          toastr.success("Sale Item Inserserted Successfully ");
          self.trigger('add_inventory_sale_changed', self.inventorySales);
        } else if (data.status == 'e') {
          showToast("Error adding Issue Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function InventoryStockStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventoryStocks = [];

  self.on('csv_export_inventory_stock', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_stock/csv_export_inventory_stock',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_inventory_stock_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  //read Inventory Item

  self.on('read_inventory_stock', function (id) {
    console.log(id);
    console.log('i am in stock api call from ajax');
    let req = {};
    $.ajax({
      url: '/inventory_stock/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryStocks = data.inventoryStocks;
          self.trigger('read_inventory_stock_changed', data.inventoryStocks);
        } else if (data.status == 'e') {
          showToast("Item Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempInventoryStocks = self.inventoryStocks.filter(c => {
            return c.received_id != id;
          });
          self.inventoryStocks = tempInventoryStocks;
          toastr.info("Stock Deleted Successfully");
          self.trigger('delete_inventory_stock_changed', self.inventoryStocks);
        } else if (data.status == 'e') {
          showToast("Error Deleting IStock Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_stock', function (received_date, category_id, sub_category_id, item_id, rate, quantity, unit_id, received_from, rack_id, remark, id, category_name, subcategory_name, item_name) {
    let req = {};
    // req.received_date=received_date
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
      success: function (data) {
        if (data.status == 's') {
          self.inventoryStocks = self.inventoryStocks.map(cat => {
            if (cat.received_id == id) {
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
              cat.category_name = category_name;
              cat.subcategory_name = subcategory_name;
              cat.item_name = item_name;
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_stock', function (received_date, category_id, sub_category_id, item_id, rate, quantity, unit_id, received_from, rack_id, remark, category_name, subcategory_name, item_name) {
    let req = {};
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Stock after');
          self.category_id = category_id;
          let obj = {};
          obj.received_from = data.received_from;
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
          obj.category_name = category_name;
          obj.subcategory_name = subcategory_name;
          obj.item_name = item_name;
          // obj.category_id = category_id
          self.inventoryStocks = [obj, ...self.inventoryStocks, self.category_id];
          toastr.success("Stock Item Inserserted Successfully ");
          self.trigger('add_inventory_stock_changed', self.inventoryStocks);
        } else if (data.status == 'e') {
          showToast("Error adding Stock Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function InventorySubCategoryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventorySubcategories = [];

  self.on('csv_export_inventory_subcategory', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_subcategory/csv_export_inventory_subcategory',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_inventory_subcategory_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_inventory_subcategory', function () {
    console.log('i am in subcategory api call from ajax');
    let req = {};
    $.ajax({
      url: '/inventory_subcategory',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventorySubcategories = data.inventorySubcategories;
          self.trigger('read_inventory_subcategory_changed', data.inventorySubcategories);
        } else if (data.status == 'e') {
          showToast("Subcategory Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempInventorySubcategory = self.inventorySubcategories.filter(c => {
            return c.sub_category_id != id;
          });
          self.inventorySubcategories = tempInventorySubcategory;
          toastr.info("Subcategory Deleted Successfully");
          self.trigger('delete_inventory_subcategory_changed', self.inventorySubcategories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Subcategory. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_subcategory', function (department, category_id, sub_category, id, category_name) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.inventorySubcategories = self.inventorySubcategories.map(cat => {
            if (cat.sub_category_id == id) {
              cat.sub_category_id = id;
              cat.category_id = category_id;
              cat.department = department;
              cat.sub_category = sub_category;
              cat.category_name = category_name;
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_subcategory', function (department, category_id, sub_category, category_name) {
    let req = {};
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Categeory after');
          let obj = {};
          obj.sub_category_id = data.sub_category_id;
          obj.sub_category = sub_category;
          obj.department = department;
          obj.category_id = category_id;
          obj.category_name = category_name;
          // obj.category_id = category_id
          self.inventorySubcategories = [obj, ...self.inventorySubcategories];
          toastr.success("Subcategeory Inserserted Successfully ");
          self.trigger('add_inventory_subcategory_changed', self.inventorySubcategories);
        } else if (data.status == 'e') {
          showToast("Error adding Subcategeory. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function InventoryUnitStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.inventoryUnits = [];

  self.on('csv_export_inventory_unit', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/inventory_unit/csv_export_inventory_unit',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_inventory_unit_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_inventory_unit', function () {
    console.log('i am in Unit Master api call from ajax');
    let req = {};
    $.ajax({
      url: '/inventory_unit',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.inventoryUnits = data.inventoryUnits;
          self.trigger('inventoryUnit_changed', data.inventoryUnits);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempUnits = self.inventoryUnits.filter(c => {
            return c.unit_id != id;
          });
          self.inventoryUnits = tempUnits;
          toastr.info("Units Deleted Successfully");
          self.trigger('inventoryUnit_changed', self.inventoryUnits);
        } else if (data.status == 'e') {
          showToast("Error Deleting Unit. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_inventory_unit', function (unit, id) {
    let req = {};
    req.unit = unit;
    req.id = id;
    $.ajax({
      url: '/inventory_unit/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.inventoryUnits = self.inventoryUnits.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_inventory_unit', function (unit) {
    let req = {};
    req.unit = unit;
    $.ajax({
      url: '/inventory_unit/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add unit after');
          let obj = {};
          obj.unit_id = data.unit_id;
          obj.unit = unit;
          self.inventoryUnits = [obj, ...self.inventoryUnits];
          toastr.success("Unit Inserserted Successfully ");
          self.trigger('inventoryUnit_changed', self.inventoryUnits);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ItemStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.items = [];

  self.on('read_items', function () {
    console.log('i am in read_courses api call from ajax');
    let req = {};
    $.ajax({
      url: '/item',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.items = data.items;
          self.trigger('items_changed', data.items);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempItems = self.items.filter(c => {
            return c.item_id != item_id;
          });
          self.items = tempItems;
          toastr.info("Item Deleted Successfully");
          self.trigger('items_changed', self.items);
        } else if (data.status == 'e') {
          showToast("Error Deleting Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_item', function (item_name, item_id) {
    let req = {};
    req.item_name = item_name;
    req.item_id = item_id;
    $.ajax({
      url: '/item/edit/' + item_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.items = self.items.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_item', function (item_name) {
    let req = {};
    req.item_name = item_name;
    $.ajax({
      url: '/item/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add item after');
          let obj = {};
          obj.id = data.id;
          obj.item_name = item_name;
          self.items = [obj, ...self.items];
          toastr.success("Item Inserserted Successfully ");
          self.trigger('items_changed', self.items);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function LevelStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.levels = [];

  self.on('read_level', function () {
    console.log('i am in read_level api call from ajax');
    let req = {};
    $.ajax({
      url: '/level',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.levels = data.levels;
          self.trigger('level_changed', data.levels);
        } else if (data.status == 'e') {
          showToast("level Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_Level', function () {
    console.log('i am in csv_export_Level api call from ajax');
    let req = {};
    $.ajax({
      url: '/level/csv_export_Level',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_Level_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_level', function (id) {
    $.ajax({
      url: '/level/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempLevel = self.levels.filter(c => {
            return c.level_id != id;
          });
          self.levels = tempLevel;
          self.trigger('level_changed', self.levels);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_level', function (level, id) {
    let req = {};
    req.level = level;
    req.id = id;
    $.ajax({
      url: '/level/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.levels = self.levels.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_level', function (level) {
    let req = {};
    req.level = level;
    $.ajax({
      url: '/level/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add level after');
          let obj = {};
          obj.level_id = data.level_id;
          obj.level = level;
          self.levels = [obj, ...self.levels];
          self.trigger('level_changed', self.levels);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function LoginStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_roles', function () {
    console.log('i am in read_roles api call from ajax');
    let req = {};
    $.ajax({
      url: '/login/roles',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.roles = data.roles;
          self.trigger('roles_for_login_changed', data.roles);
        } else if (data.status == 'e') {
          showToast("Roles Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('check_login', function (Username, password, role) {
    let req = {};
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
      success: function (data) {
        console.log(data);
        console.log(document.cookie);
        console.log(getCookie('token'));
        if (data.status == 's') {
          console.log('login after');
          self.trigger('login_changed', data.result.role);
          self.trigger('login_changed_main_nav', data.result);
          self.trigger('login_changed_footer', data.result);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('logout', function () {
    $.ajax({
      url: '/login/logout',
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('logout');
          self.trigger('logOut_changed');
        } else if (data.status == 'e') {
          showToast("Error in Logout.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('change_password', function (old_password, new_password) {

    let req = {};
    req.action = 'changePassword';
    req.old_password = old_password;
    req.new_password = new_password;

    $.ajax({
      url: '/login/change-password',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        if (data.status == 's') {
          self.trigger('change_password_completed', data.rows);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function MarksEntryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.marksEntry = [];

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('exam_types_changed', data.examTypes);
        } else if (data.status == 'e') {
          showToast("Exam Type Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('subjects_changed', data.subjects);
        } else if (data.status == 'e') {
          showToast("Subjects Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('marks_limit_changed', data.marksLimit);
        } else if (data.status == 'e') {
          showToast("Marks Limit Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('marks_entries_changed', data.marksEntries, data.students);
        } else if (data.status == 'e') {
          showToast("Marks Entries Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          // toastr.success("Marks Entries Successfull")
          self.trigger('add_marks_entries_changed');
        } else if (data.status == 'e') {
          showToast("Error adding Marks Entries. Please try again.", data.messaage);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Marks Entries Updated Successfully ");
          self.trigger('add_marks_entries_changed'); // same trigger, as Add Exam Scheme
        } else if (data.status == 'e') {
          showToast("Error updating Marks Entries. Please try again.", data.messaage);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          toastr.info("Marks Entry Deleted Successfully");
          self.trigger('delete_marks_entries_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Marks Entry. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function MarksManagerStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.marksSettings = [];

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('exam_types_changed', data.examTypes);
        } else if (data.status == 'e') {
          showToast("Exam Type Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('subjects_changed', data.subjects);
        } else if (data.status == 'e') {
          showToast("Subjects Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.marksSettings = data.marksSettings;
          self.trigger('marks_settings_changed', data.marksSettings);
        } else if (data.status == 'e') {
          showToast("Marks Settings Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Marks Settings Created Successfully ");
          self.trigger('add_marks_settings_changed');
        } else if (data.status == 'e') {
          showToast("Error adding Marks Settings. Please try again.", data.messaage);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Marks Settings Updated Successfully ");
          self.trigger('add_marks_settings_changed'); // same trigger, as Add Exam Scheme
        } else if (data.status == 'e') {
          showToast("Error updating Marks Settings. Please try again.", data.messaage);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempExamScheme = self.marksSettings.filter(c => {
            return c.marks_id != marks_id;
          });
          self.marksSettings = tempExamScheme;
          toastr.info("Marks Manager Deleted Successfully");
          self.trigger('delete_marks_settings_changed', self.marksSettings);
        } else if (data.status == 'e') {
          showToast("Error Deleting Marks Manager. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function MarksReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.marksEntry = [];

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('exam_types_changed', data.examTypes);
        } else if (data.status == 'e') {
          showToast("Exam Type Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_consolidate_tabulation_sheet_changed', data.headers, data.reports, data.class_teacher);
        } else if (data.status == 'e') {
          showToast("Marks Entries Read Error. Please try again.", data.message);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('consolidate_tabulation_sheet_csv', function (headers, reports) {
    let req = {};
    req.headers = headers;
    req.reports = reports;
    $.ajax({
      url: '/marks-report/consolidate_tabulation_sheet_csv',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('consolidate_tabulation_sheet_csv_changed', data.url);
        } else if (data.status == 'e') {
          showToast("Marks Entries Read Error. Please try again.", data.message);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_merit_list', function (exam_type_id, section_id) {
    $.ajax({
      url: '/marks-report/merit-list/' + exam_type_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_merit_list_changed', data.reports);
        } else if (data.status == 'e') {
          showToast("Merit List Read Error. Please try again.", data.message);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_exam_scheme', function (standard_id, section_id) {
    $.ajax({
      url: '/marks-report/exam-type/' + standard_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_exam_scheme_changed', data.examTypes);
        } else if (data.status == 'e') {
          showToast("Exam Scheme Read Error. Please try again.", data.message);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_top_five', function (exam_type_id, section_id) {
    $.ajax({
      url: '/marks-report/top-five/' + exam_type_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_top_five_changed', data.reports);
        } else if (data.status == 'e') {
          showToast("Top Five Read Error. Please try again.", data.message);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function MaturityDevelopmentStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.maturityDevelopments = [];

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.maturityDevelopments = data.maturityDevelopments;
          self.trigger('maturity_development_students_changed', data.maturityDevelopments);
        } else if (data.status == 'e') {
          showToast("Maturity Development Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_maturity_development_details_changed', data.details);
        } else if (data.status == 'e') {
          showToast("Maturity Development Details Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Maturity Development Created Successfully ");
          self.trigger('add_maturity_developments_changed');
        } else if (data.status == 'e') {
          showToast("Error adding Maturity Development. Please try again.", data.messaage);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('maturity_development_student_update_changed', data.details);
        } else if (data.status == 'e') {
          showToast("Maturity Development Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Maturity Development Updated Successfully ");
          self.trigger('add_maturity_developments_changed'); // same trigger, as Add Exam Scheme
        } else if (data.status == 'e') {
          showToast("Error updating Maturity Development. Please try again.", data.messaage);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          toastr.info("Marks Manager Deleted Successfully");
          self.trigger('delete_maturity_developments_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Marks Manager. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function MentorCaseStore() {
  riot.observable(this); // Riot provides our Case emitter.
  var self = this;

  self.mentor_case = [];

  self.on('csv_export_mentor_case', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/mentor_case/csv_export_mentor_case',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_mentor_case_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_categories', function () {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    $.ajax({
      url: '/mentor_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_case', function () {
    console.log('i am in add_case api call from ajax');
    let req = {};
    $.ajax({
      url: '/mentor_case/read_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.mentor_case = data.mentor_case;
          self.trigger('read_case_changed', data.mentor_case);
        } else if (data.status == 'e') {
          showToast("Error Reading Case. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempCase = self.mentor_case.filter(c => {
            return c.case_id != case_id;
          });
          self.mentor_case = tempCase;
          toastr.info("Case Deleted Successfully");
          self.trigger('delete_case_changed', self.mentor_case);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_case', function (case_name, category_id, case_id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.mentor_case = self.mentor_case.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_case', function (case_name, category_id) {
    let req = {};
    req.case_name = case_name;
    req.category_id = category_id;
    $.ajax({
      url: '/mentor_case/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          let obj = {};
          obj.case_id = data.case_id;
          obj.case_name = case_name;
          obj.category_id = category_id;
          self.mentor_case = [obj, ...self.mentor_case];
          toastr.success("Case Inserserted Successfully ");
          self.trigger('add_case_changed', self.mentor_case);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function MentorCategoryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.mentor_categories = [];

  self.on('csv_export_mentor_category', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/mentor_category/csv_export_mentor_category',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_mentor_category_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_mentor_category', function () {
    console.log('i am in read_courses api call from ajax');
    let req = {};
    $.ajax({
      url: '/mentor_category',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.mentor_categories = data.mentor_categories;
          self.trigger('mentor_category_changed', data.mentor_categories);
        } else if (data.status == 'e') {
          showToast("Items Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempMentorCategories = self.mentor_categories.filter(c => {
            return c.category_id != category_id;
          });
          self.mentor_categories = tempMentorCategories;
          toastr.info("Category Deleted Successfully");
          self.trigger('mentor_category_changed', self.mentor_categories);
        } else if (data.status == 'e') {
          showToast("Error Deleting Item. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_mentor_category', function (category_name, category_id) {
    let req = {};
    req.category_name = category_name;
    req.category_id = category_id;
    $.ajax({
      url: '/mentor_category/edit/' + category_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.mentor_categories = self.mentor_categories.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_mentor_category', function (category_name) {
    let req = {};
    req.category_name = category_name;
    $.ajax({
      url: '/mentor_category/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add item after');
          let obj = {};
          obj.category_id = data.category_id;
          obj.category_name = category_name;
          self.mentor_categories = [obj, ...self.mentor_categories];
          toastr.success("Category Inserserted Successfully ");
          self.trigger('mentor_category_changed', self.mentor_categories);
        } else if (data.status == 'e') {
          showToast("Error adding Category. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function MentorDetailStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.mentors = [];

  self.on('read_mentor_categories', function () {
    let req = {};
    $.ajax({
      url: '/mentor_detail',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.categories = data.categories;
          self.trigger('read_mentor_categories_changed', data.categories);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('read_case', function () {
    let req = {};

    $.ajax({
      url: '/mentor_detail/read_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.mentor_case = data.mentor_case;
          self.trigger('read_case_changed', data.mentor_case);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_mentor', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/mentor_detail/csv_export_mentor',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_mentor_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_mentor', function (read_category_id) {
    console.log(read_category_id);
    let req = {};
    req.read_category_id = read_category_id;
    $.ajax({
      url: '/mentor_detail/read_mentor/' + read_category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.mentors = data.mentors;
          self.trigger('read_mentor_changed', data.mentors);
        } else if (data.status == 'e') {
          showToast("Mentor Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_for_edit_mentor', function (id) {
    console.log(id);
    let req = {};
    req.id = id;
    $.ajax({
      url: '/mentor_detail/read_for_edit_mentor/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.mentor_details = data.mentor_details;
          self.trigger('read_for_edit_mentor_changed', data.mentor_details);
        } else if (data.status == 'e') {
          showToast("Mentor Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('read_mentor_case', function (id, enroll_number) {
    console.log(id);
    console.log(enroll_number);
    let req = {};
    req.id = id;
    req.enroll_number = enroll_number;
    $.ajax({
      url: '/mentor_detail/read_mentor_case/' + id + '/' + enroll_number,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.mentor_case_details = data.mentor_case_details;
          self.trigger('read_mentor_case_changed', data.mentor_case_details);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_mentor_case_csv', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/mentor_detail/read_mentor_case_csv',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_mentor_case_csv_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_for_edit_case', function (id) {
    console.log(id);
    let req = {};
    req.id = id;
    $.ajax({
      url: '/mentor_detail/read_for_edit_case/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.update_case_details_for_update = data.update_case_details_for_update;
          self.trigger('read_for_edit_case_changed', data.update_case_details_for_update);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add activity after');
          toastr.success("Successfully Inserted");
          self.trigger('add_mentor_detail_changed', self.mentors);
        } else if (data.status == 'e') {
          showToast("Error adding Mentor. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Case after');
          toastr.success("Successfully Inserted");
          self.trigger('add_case_detail_changed', self.case_details);
        } else if (data.status == 'e') {
          showToast("Error adding Mentor. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_mentor_detail', function (obj, id) {
    let req = {};
    console.log(obj);
    //req.id=edit_id
    $.ajax({
      url: '/mentor_detail/edit/' + id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.mentors = self.mentors.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_case_detail', function (obj, edit_case_id) {
    let req = {};
    console.log(obj);
    //req.id=edit_id
    $.ajax({
      url: '/mentor_detail/edit_case_detail/' + edit_case_id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
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
      error: function (data) {
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
      success: function (data) {
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
      error: function (data) {
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
      success: function (data) {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function MentorReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  /*self.case_wise_reports = []*/

  self.on('read_case_wise_report', function (obj) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/mentor_report/' + obj.start_date + '/' + obj.end_date,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.case_wise_reports = data.case_wise_reports;
          if (data.case_wise_reports == '') {
            toastr.info("No Data Found and try again");
          }
          self.trigger('read_case_wise_report_changed', data.case_wise_reports, data.grand_total);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_mentor_case_wise_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/mentor_report/csv_mentor_case_wise_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_mentor_case_wise_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_date_wise_case_report', function (obj, category_id) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    req.category_id = category_id;
    $.ajax({
      url: '/mentor_report/read_date_wise_case_report/' + obj.start_date + '/' + obj.end_date + '/' + category_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          if (data.date_wise_case_report == '') {
            toastr.info("No Data Found and try again");
          }
          self.trigger('read_date_wise_case_report_changed', data.date_wise_case_report, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_date_wise_case_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/mentor_report/csv_date_wise_case_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_date_wise_case_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_standard', function () {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    $.ajax({
      url: '/mentor_report/read_standard/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    $.ajax({
      url: '/mentor_report/read_section/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_session', function () {
    console.log('i am in read_session api call from ajax');
    let req = {};
    $.ajax({
      url: '/mentor_report/read_session/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sessions = data.sessions;
          self.trigger('read_session_changed', data.sessions);
        } else if (data.status == 'e') {
          showToast("Session Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_class_wise_report', function (standard_id, section_id, session_id) {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    req.session_id = session_id;
    $.ajax({
      url: '/mentor_report/read_class_wise_report/' + standard_id + '/' + section_id + '/' + session_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          if (data.class_wise_case_report == '') {
            toastr.info("No Data Found and try again");
          }
          self.trigger('read_class_wise_report_changed', data.class_wise_case_report, data.grand_total);
        } else if (data.status == 'e') {
          showToast("Categories Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_class_wise_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/mentor_report/csv_class_wise_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_class_wise_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });
}
function NewEventStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.newEvents = [];

  self.on('read_event_type', function () {
    console.log('i am in read_sections api call from ajax');
    let req = {};
    $.ajax({
      url: '/new_event/readEventType',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.eventTypes = data.eventTypes;
          self.trigger('read_event_type_changed', data.eventTypes);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_new_event', function () {
    console.log('i am in csv_export_new_event api call from ajax');
    let req = {};
    $.ajax({
      url: '/new_event/csv_export_new_event',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_new_event_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_new_event', function () {
    console.log('i am in read_new_event api call from ajax');
    let req = {};
    $.ajax({
      url: '/new_event/read_new_event',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log("inside read");
          self.newEvents = data.newEvents;
          self.trigger('read_new_event_changed', data.newEvents);
        } else if (data.status == 'e') {
          showToast("Event Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempNewEvents = self.newEvents.filter(c => {
            return c.event_id != id;
          });
          self.newEvents = tempNewEvents;
          toastr.info("Event Deleted Successfully");
          self.trigger('delete_new_event_changed', self.newEvents);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_new_event', function (event_type_id, event_name, start_date, end_date, detail, holiday, id) {
    let req = {};
    req.event_type_id = event_type_id, req.event_name = event_name, req.start_date = start_date, req.end_date = end_date, req.detail = detail, req.holiday = holiday, req.id = id;
    $.ajax({
      url: '/new_event/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.newEvents = self.newEvents.map(cat => {
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
          toastr.success("Event Updated Successfully ");
          self.trigger('edit_new_event_changed', self.newEvents);
        } else if (data.status == 'e') {
          showToast("Error updating events. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_new_event', function (event_type_id, event_name, start_date, end_date, detail, holiday) {
    let req = {};
    req.event_type_id = event_type_id, req.event_name = event_name, req.start_date = start_date, req.end_date = end_date, req.detail = detail, req.holiday = holiday, $.ajax({
      url: '/new_event/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add event after');
          let obj = {};
          obj.event_id = data.event_id;
          obj.event_name = event_name;
          obj.event_type_id = event_type_id;
          obj.start_date = start_date;
          obj.end_date = end_date;
          obj.detail = detail;
          // obj.name = name
          self.newEvents = [obj, ...self.newEvents];
          toastr.success("event Inserserted Successfully ");
          self.trigger('add_new_event_changed', self.newEvents);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ParentGroupStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.parentGroups = [];

  self.on('read_parentgroup', function () {
    console.log('i am in parent Group api call from ajax');
    let req = {};
    $.ajax({
      url: '/parent_group/read_parentgroup',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.parentGroups = data.parentGroups;
          self.trigger('read_parentgroup_changed', data.parentGroups);
        } else if (data.status == 'e') {
          showToast("Club Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempParentGroups = self.parentGroups.filter(c => {
            return c.pgroup_id != id;
          });
          self.parentGroups = tempParentGroups;
          toastr.info("Club Deleted Successfully");
          self.trigger('delete_parentgroup_changed', self.parentGroups);
        } else if (data.status == 'e') {
          showToast("Error Deleting Club. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_parentgroup', function (pgroup_name, pgroup_detail, pgroup_id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.parentGroups = self.parentGroups.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_parentgroup', function (pgroup_name, pgroup_detail) {
    let req = {};
    req.pgroup_name = pgroup_name;
    req.pgroup_detail = pgroup_detail;
    $.ajax({
      url: '/parent_group/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Club role after');
          let obj = {};
          obj.pgroup_id = data.id;
          obj.pgroup_name = pgroup_name;
          obj.pgroup_detail = pgroup_detail;
          // obj.name = name
          self.parentGroups = [obj, ...self.parentGroups];
          toastr.success("parent group Inserserted Successfully ");
          self.trigger('add_parentgroup_changed', self.parentGroups);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function PhysicalFitnessStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.physicalFitness = [];

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.physicalFitness = data.physicalFitness;
          self.trigger('physical_fitness_students_changed', data.physicalFitness);
        } else if (data.status == 'e') {
          showToast("Physical Fitness Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_physical_fitness_details_changed', data.details);
        } else if (data.status == 'e') {
          showToast("Physical Fitness Details Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_physical_fitness_details_changed', data.details);
        } else if (data.status == 'e') {
          showToast("Physical Fitness Details Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Physical Fitness Created Successfully ");
          self.trigger('add_physical_fitness_changed');
        } else if (data.status == 'e') {
          showToast("Error adding Physical Fitness. Please try again.", data.messaage);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          toastr.info("Physiacl Fitness Deleted Successfully");
          self.trigger('delete_physical_fitness_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Physiacl Fitness. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function PromoteStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.events = [];

  self.on('read_students', function (standard_id, section_id) {
    let req = {};
    $.ajax({
      url: '/promote/students/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_students_changed', data.freeStudents);
        } else if (data.status == 'e') {
          showToast("House Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //======== read promoted students ======

  self.on('read_promoted', function (standard_id, section_id) {
    let req = {};
    $.ajax({
      url: '/promote/read_promoted/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log("---------------");
        console.log(data);
        console.log("---------------");
        if (data.status == 's') {
          self.trigger('read_promoted_student_changed', data.promotedStudents);
        } else if (data.status == 'e') {
          showToast("House Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('free_up_student', function (section_id, students) {
    var obj = {};
    obj['section_id'] = section_id;
    obj['students'] = students;
    $.ajax({
      url: '/promote/free_up_student/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          console.log(data.error_msg);
          self.trigger('free_students_changed', students, data.error_msg);
        } else if (data.status == 'e') {
          showToast("Error while free up students. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('assign_students', function (section_id, students) {
    var obj = {};
    obj['section_id'] = section_id;
    obj['students'] = students;
    $.ajax({
      url: '/promote/assign_students/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          console.log(data.error_msg);
          self.trigger('assign_students_changed', students, data.error_msg);
        } else if (data.status == 'e') {
          showToast("Error while free up students. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('re_shuffle_student', function (st, section_id) {
    let req = {};
    $.ajax({
      url: '/promote/re_shuffle_student/' + section_id,
      type: "POST",
      data: JSON.stringify(st),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Update Successfull");
          self.trigger('re_shuffle_student_changed');
        } else if (data.status == 'e') {
          showToast("Error updating result activation. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*self.on('freeStudents', function(standard_id,section_id) {
    console.log("under read free studer store")
    let req = {}
    $.ajax({
      url:'/promote/freeStudents/'+standard_id+'/'+section_id,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.trigger('read_students_changed', data.freeStudents)
          }else if(data.status == 'e'){
            showToast("House Read Error. Please try again.", data.messaage)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/
}
function ReligionStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.religions = [];

  self.on('read_religion', function () {
    console.log('i am in read_religion api call from ajax');
    let req = {};
    $.ajax({
      url: '/religion',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.religions = data.religions;
          self.trigger('religion_changed', data.religions);
        } else if (data.status == 'e') {
          showToast("religion Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_religion', function () {
    console.log('i am in csv_export_religion api call from ajax');
    let req = {};
    $.ajax({
      url: '/religion/csv_export_religion',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_religion_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_religion', function (id) {
    $.ajax({
      url: '/religion/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempReligion = self.religions.filter(c => {
            return c.religion_id != id;
          });
          self.religions = tempReligion;
          self.trigger('religion_changed', self.religions);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_religion', function (religion, id) {
    let req = {};
    req.religion = religion;
    req.id = id;
    $.ajax({
      url: '/religion/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.religions = self.religions.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_religion', function (religion) {
    let req = {};
    req.religion = religion;
    $.ajax({
      url: '/religion/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add religion after');
          let obj = {};
          obj.religion_id = data.religion_id;
          obj.religion = religion;
          self.religions = [obj, ...self.religions];
          self.trigger('religion_changed', self.religions);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function RemarkStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.remarks = [];

  self.on('read_remark', function () {
    console.log('i am in remark api call from ajax');
    let req = {};
    $.ajax({
      url: '/remark/read_remark',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.remarks = data.remarks;
          self.trigger('read_remark_changed', data.remarks);
        } else if (data.status == 'e') {
          showToast("Club Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempRemarks = self.remarks.filter(c => {
            return c.remark_id != id;
          });
          self.remarks = tempRemarks;
          toastr.info("Remark Deleted Successfully");
          self.trigger('delete_remark_changed', self.remarks);
        } else if (data.status == 'e') {
          showToast("Error Deleting Remark. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_remark', function (remark, short_remark, remark_id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.remarks = self.remarks.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_remark', function (remark, short_remark) {
    let req = {};
    req.remark = remark;
    req.short_remark = short_remark;
    $.ajax({
      url: '/remark/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Remark after');
          let obj = {};
          obj.remark_id = data.id;
          obj.remark = remark;
          obj.short_remark = short_remark;
          // obj.name = name
          self.remarks = [obj, ...self.remarks];
          toastr.success("Remark Inserserted Successfully ");
          self.trigger('add_remark_changed', self.remarks);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ResultActivationStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.maturityDevelopments = [];

  self.on('read_result_activation', function () {
    let req = {};
    $.ajax({
      url: '/result-activation',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_result_activation_changed', data.classes);
        } else if (data.status == 'e') {
          showToast("result activation read error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('result_activation_update', function (st) {
    $.ajax({
      url: '/result-activation/update',
      type: "POST",
      data: JSON.stringify(st),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Update Successfull");
          self.trigger('result_activation_update_changed');
        } else if (data.status == 'e') {
          showToast("Error updating result activation. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function RoleStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.roles = [];

  self.on('read_roles', function () {
    console.log('i am in read_roles api call from ajax');
    let req = {};
    $.ajax({
      url: '/roles',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.roles = data.roles;
          self.trigger('roles_changed', data.roles);
        } else if (data.status == 'e') {
          showToast("Roles Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let temproles = self.roles.filter(c => {
            return c.id != id;
          });
          self.roles = temproles;
          toastr.info("Role Deleted Successfully");
          self.trigger('roles_changed', self.roles);
        } else if (data.status == 'e') {
          showToast("Error Deleting Role. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_role', function (role, id) {
    let req = {};
    req.role = role;
    req.id = id;
    $.ajax({
      url: '/roles/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.roles = self.roles.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_role', function (role) {
    let req = {};
    req.role = role;
    $.ajax({
      url: '/roles/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add role after');
          let obj = {};
          obj.id = data.id;
          obj.role = role;
          self.roles = [obj, ...self.roles];
          toastr.success("Roles Inserserted Successfully ");
          self.trigger('roles_changed', self.roles);
        } else if (data.status == 'e') {
          showToast("Error adding Role. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ScholarshipStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.banks = [];

  self.on('read_scholar_student', function () {
    console.log('i am in scholar students api call from ajax');
    let req = {};
    $.ajax({
      url: '/scholarship',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_scholar_student_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Scholar Students Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //=====read student ====
  self.on('read_student', function (enrol) {
    console.log('i am in read Student for scholar api call from ajax');
    let req = {};
    $.ajax({
      url: '/scholarship/read_student/' + enrol,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.scholarStudent = data.student;
          self.trigger('read_student_changed', data.student, getCookie('session_id'));
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //========== read feeslip students ===
  self.on('read_scholarship_slip', function (student_id) {
    console.log('i am in read scholar fee slip api call from ajax');
    let req = {};
    $.ajax({
      url: '/scholarship/read_fee_slip/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.scholarSlips = data.scholarSlips;
          self.trigger('read_scholar_feeslip_changed', data.scholarSlips);
        } else if (data.status == 'e') {
          showToast("No data found Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('scholarship after');

          toastr.success("Scholarship  Inserserted Successfully, wish to insert more");
          self.trigger('add_scholarship_head_changed');
        } else if (data.status == 'e') {
          showToast("Error in Mapping Heads. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('bank_edit', function (bank_account_no, bank_name, branch, bank_ac_no) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.banks = self.banks.map(cat => {
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
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempSession = self.banks.filter(c => {
            return c.bank_account_no != bank_account_no;
          });
          self.banks = tempSession;
          toastr.info("Session Deleted Successfully");
          self.trigger('delete_event_changed', self.banks);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function SectionStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.sections = [];

  self.on('read_standard', function () {
    console.log('i am in read_sections api call from ajax');
    let req = {};
    $.ajax({
      url: '/section/readStandard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_section', function () {
    console.log('i am in csv_export_section api call from ajax');
    let req = {};
    $.ajax({
      url: '/section/csv_export_section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_section_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_section', function () {
    console.log('i am in read_section api call from ajax');
    let req = {};
    $.ajax({
      url: '/section/read_section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempSections = self.sections.filter(c => {
            return c.section_id != id;
          });
          self.sections = tempSections;
          toastr.info("Section Deleted Successfully");
          self.trigger('delete_section_changed', self.sections);
        } else if (data.status == 'e') {
          showToast("Error Deleting Section. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_section', function (section, standard_id, id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.sections = self.sections.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_section', function (section, standard_id) {
    let req = {};
    req.section = section;
    req.standard_id = standard_id;
    $.ajax({
      url: '/section/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add section section after');
          let obj = {};
          obj.section_id = data.section_id;
          obj.section = section;
          obj.standard_id = standard_id;
          // obj.name = name
          self.sections = [obj, ...self.sections];
          toastr.success("section role Inserserted Successfully ");
          self.trigger('add_section_changed', self.sections);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function SessionStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.sessions = [];

  self.on('read_session', function () {
    console.log('i am in read_categories api call from ajax');
    let req = {};
    $.ajax({
      url: '/fees_session',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sessions = data.sessions;
          self.trigger('read_session_changed', data.sessions);
        } else if (data.status == 'e') {
          showToast("Session Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_session', function (session_name, session_start_date, session_end_date) {
    let req = {};
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add event after');
          let obj = {};
          obj.id = data.id;
          obj.session_name = session_name;
          obj.session_start_date = session_start_date;
          obj.session_end_date = session_end_date;
          self.sessions = [obj, ...self.sessions];
          toastr.success("Session Inserserted Successfully ");
          self.trigger('add_session_changed', self.sessions);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_session', function (session_name, session_start_date, session_end_date, session_id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.sessions = self.sessions.map(cat => {
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
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempSession = self.sessions.filter(c => {
            return c.session_id != session_id;
          });
          self.sessions = tempSession;
          toastr.info("Session Deleted Successfully");
          self.trigger('delete_event_changed', self.sessions);
        } else if (data.status == 'e') {
          showToast("Error Deleting Event. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempSession = self.sessions.filter(c => {
            return c.session_id != session_id;
          });
          self.sessions = tempSession;
          toastr.info("Session Marked Successfully");
          self.trigger('marked_event_changed', self.sessions);
        } else if (data.status == 'e') {
          showToast("Error in Marked Current Session. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StaffBPWeightStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.staffWiseReports = [];
  self.employees = [];

  self.on('csv_export_staff_bp_weight', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/staff_bp_weight/csv_export_staff_bp_weight',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_staff_bp_weight_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_employee', function () {
    console.log('i am in employee  api call from ajax');
    let req = {};
    $.ajax({
      url: '/infirmary_staff/read_employee',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.employees = data.employees;
          self.trigger('read_employee_changed', data.employees);
        } else if (data.status == 'e') {
          showToast("case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_staff_wise_report', function (staff_id, start_date, end_date) {
    let req = {};
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully ");
          self.staffWiseReports = data.staffWiseReports;
          self.trigger('read_staff_wise_report_changed', self.staffWiseReports);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // read Staff date Wsie B.p report 

  self.on('read_staff_date_wise_bp_report', function (start_date, end_date) {
    let req = {};
    req.start_date = start_date;
    req.end_date = end_date;
    $.ajax({
      url: '/staff_bp_weight/read_staff_date_wise_bp_report',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully ");
          self.staffDateWiseBpWeightReports = data.staffDateWiseBpWeightReports;
          self.trigger('read_staff_bp_weight_date_wise_report_changed', self.staffDateWiseBpWeightReports);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_staff_bp_weight', function (id) {
    console.log('i am in read_section api call from ajax');
    let req = {};
    $.ajax({
      url: '/staff_bp_weight/read_staff_bp_weight',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.staffBPWeights = data.staffBPWeights;
          self.trigger('read_staff_bp_weight_changed', data.staffBPWeights);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempStaffBPWeight = self.staffBPWeights.filter(c => {
            return c.health_id != id;
          });
          self.staffBPWeights = tempStaffBPWeight;
          toastr.info("Infirmary Deleted Successfully");
          self.trigger('delete_staff_bp_weight_changed', self.staffBPWeights);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_staff_bp_weight', function (staff_id, checkup_date, time_in, time_out, upper_bp, lower_bp, height, weight, bmi, id) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.staffBPWeights = self.staffBPWeights.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_staff_bp_weight', function (staff_id, checkup_date, time_in, time_out, upper_bp, lower_bp, height, weight, bmi) {
    let req = {};
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add bp weight  after');
          let obj = {};
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
          self.staffBPWeights = [obj, ...self.staffBPWeights];
          toastr.success("staff weight  Inserserted Successfully ");
          self.trigger('add_staff_bp_weight_changed', self.staffBPWeights);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_staff_wise_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/staff_bp_weight/csv_export_staff_wise_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_staff_wise_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });
}
function StaffInfirmaryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.infirmaryCases = [];
  self.infirmaryCategories = [];
  self.staffInfirmarys = [];
  self.employees = [];

  self.on('read_employee', function () {
    console.log('i am in read_sections api call from ajax');
    let req = {};
    $.ajax({
      url: '/infirmary_staff/read_employee',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.employees = data.employees;
          self.trigger('read_employee_changed', data.employees);
        } else if (data.status == 'e') {
          showToast("case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_infirmary_staff', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/infirmary_staff/csv_export_infirmary_staff',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_infirmary_staff_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_export_staff_date_wise_case_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/infirmary_staff/csv_export_staff_date_wise_case_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_staff_date_wise_case_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('csv_export_staff_monthly_case_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/infirmary_staff/csv_export_staff_monthly_case_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_staff_monthly_case_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_infirmary_category', function () {
    console.log('i am in read_sections api call from ajax');
    let req = {};
    $.ajax({
      url: '/infirmary_staff/readInfirmaryCategory',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCategories = data.infirmaryCategories;
          self.trigger('read_infirmary_category_changed', data.infirmaryCategories);
        } else if (data.status == 'e') {
          showToast("case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*
  self.on('read_staff_date_wise_case_report', function(category_id,start_date,end_date) {
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

  //Staff Yearly  Health report

  self.on('read_staff_health_report', function (employee_id, start_date, end_date) {
    let req = {};
    req.employee_id = employee_id;
    req.start_date = start_date;
    req.end_date = end_date;
    $.ajax({
      url: '/infirmary_staff/read_staff_health_report',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          // toastr.success("Successfully ")
          self.staffHealthReports = data.staffHealthReports;
          self.staffInfirmaryHealthReports = [];
          var prev_emp_id = '';
          var prev_name = '';
          var prev_designation = '';
          var prev_checkup_date = '';
          var prev_c_date = '';
          var prev_dob = '';
          var prev_time_in = '';
          var prev_time_out = '';
          var prev_weight = '';
          var prev_blood_pressure = '';
          var prev_bmi = '';
          var prev_height = '';
          var prev_department_name = '';
          var prev_employee_id = '';

          self.staffHealthReports.map(v => {
            console.log("inside store");
            console.log(v);
            if (prev_emp_id == '') {
              //loop runs first time
              self.obj = {};
              self.helathArray = [];
              prev_emp_id = v.emp_id;
              prev_name = v.name;
              prev_designation = v.designation;
              prev_checkup_date = v.checkup_date;
              prev_c_date = v.c_date;
              prev_dob = v.dob;
              prev_time_in = v.time_in;
              prev_time_out = v.time_out;
              prev_weight = v.weight;
              prev_blood_pressure = v.blood_pressure;
              prev_bmi = v.bmi;
              prev_height = v.height;
              prev_department_name = v.department_name;
              prev_employee_id = v.employee_id;

              self.obj.name = v.name;
              self.obj.designation = v.designation;
              self.obj.checkup_date = v.checkup_date;
              self.obj.c_date = v.c_date;
              self.obj.dob = v.dob;
              self.obj.time_in = v.time_in;
              self.obj.time_out = v.time_out;
              self.obj.weight = v.weight;
              self.obj.blood_pressure = v.blood_pressure;
              self.obj.bmi = v.bmi;
              self.obj.height = v.height;
              self.obj.department_name = v.department_name;
              self.obj.employee_id = v.employee_id;
              self.helathArray.push(v);
              self.obj.staffHelathArray = self.helathArray;
            } else if (prev_emp_id == v.emp_id) {
              self.obj = {};
              self.obj.name = v.name;
              self.obj.designation = v.designation;
              self.obj.checkup_date = v.checkup_date;
              self.obj.c_date = v.c_date;
              self.obj.dob = v.dob;
              self.obj.time_in = v.time_in;
              self.obj.time_out = v.time_out;
              self.obj.weight = v.weight;
              self.obj.blood_pressure = v.blood_pressure;
              self.obj.bmi = v.bmi;
              self.obj.height = v.height;
              self.obj.department_name = v.department_name;
              self.obj.employee_id = v.employee_id;
              self.helathArray.push(v);
              self.obj.staffHelathArray = self.helathArray;
              prev_emp_id = v.emp_id;
              prev_name = v.name;
              prev_designation = v.designation;
              prev_checkup_date = v.checkup_date;
              prev_c_date = v.c_date;
              prev_dob = v.dob;
              prev_time_in = v.time_in;
              prev_time_out = v.time_out;
              prev_weight = v.weight;
              prev_blood_pressure = v.blood_pressure;
              prev_bmi = v.bmi;
              prev_height = v.height;
              prev_department_name = v.department_name;
              prev_employee_id = v.employee_id;
            } else {
              self.staffInfirmaryHealthReports.push(self.obj);
              self.helathArray = [];
              self.obj = {};
              prev_emp_id = v.emp_id;
              prev_name = v.name;
              prev_designation = v.designation;
              prev_checkup_date = v.checkup_date;
              prev_c_date = v.c_date;
              prev_dob = v.dob;
              prev_time_in = v.time_in;
              prev_time_out = v.time_out;
              prev_weight = v.weight;
              prev_blood_pressure = v.blood_pressure;
              prev_bmi = v.bmi;
              prev_height = v.height;
              prev_department_name = v.department_name;
              prev_employee_id = v.employee_id;
              self.obj = {};
              self.obj.name = v.name;
              self.obj.designation = v.designation;
              self.obj.checkup_date = v.checkup_date;
              self.obj.c_date = v.c_date;
              self.obj.dob = v.dob;
              self.obj.time_in = v.time_in;
              self.obj.time_out = v.time_out;
              self.obj.weight = v.weight;
              self.obj.blood_pressure = v.blood_pressure;
              self.obj.bmi = v.bmi;
              self.obj.height = v.height;
              self.obj.department_name = v.department_name;
              self.obj.employee_id = v.employee_id;
              self.helathArray.push(v);
              self.obj.staffHelathArray = self.helathArray;
            }
          });
          if (prev_emp_id != '') {
            self.staffInfirmaryHealthReports.push(self.obj);
          }

          self.trigger('read_staff_health_report_changed', self.staffInfirmaryHealthReports, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_infirmary_case', function () {
    console.log('i am in read_section api call from ajax');
    let req = {};
    $.ajax({
      url: '/infirmary_staff/read_infirmary_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCases = data.infirmaryCases;
          self.trigger('read_infirmary_case_changed', data.infirmaryCases);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // Read staff Monthly Case Report

  self.on('read_staff_monthly_case_report', function (month_id) {
    console.log('i am in monthly case api call from ajax');
    let req = {};
    $.ajax({
      url: '/infirmary_staff/read_staff_monthly_case_report/' + month_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.staffMonthlyReport = data.staffMonthlyReport;
          self.trigger('read_staff_monthly_report_changed', data.staffMonthlyReport);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_staff_infirmary', function (id) {
    console.log('i am in read_section api call from ajax');
    let req = {};
    $.ajax({
      url: '/infirmary_staff/read_staff_infirmary/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.staffInfirmarys = data.staffInfirmarys;
          self.trigger('read_staff_infirmary_changed', data.staffInfirmarys);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // read Staff Infirmary date wise case report which have tag file name infirmary-staff-date-wise-repor
  self.on('read_staff_date_wise_case_report', function (category_id, start_date, end_date) {
    let req = {};
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully ");
          self.staffDateWiseCaseReports = data.staffDateWiseCaseReports;
          self.trigger('read_staff_date_wise_case_report_changed', self.staffDateWiseCaseReports);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempStaffInfirmary = self.staffInfirmarys.filter(c => {
            return c.staff_infirmary_id != id;
          });
          self.staffInfirmarys = tempStaffInfirmary;
          toastr.info("Infirmary Deleted Successfully");
          self.trigger('delete_staff_infirmary_changed', self.staffInfirmarys);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_staff_infirmary', function (staff_id, category_id, case_id, treatment_date, time_in, time_out, treatment, id, case_name) {
    let req = {};
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
      success: function (data) {
        if (data.status == 's') {
          self.staffInfirmarys = self.staffInfirmarys.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_staff_infirmary', function (staff_id, category_id, case_id, treatment_date, time_in, time_out, treatment, case_name) {
    let req = {};
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add case  after');
          let obj = {};
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
          self.staffInfirmarys = [obj, ...self.staffInfirmarys];
          toastr.success("Infirmary  Inserserted Successfully ");
          self.trigger('add_staff_infirmary_changed', self.staffInfirmarys);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // read Staff Infirmary lab tets
  self.on('read_staff_lab_test', function () {
    let req = {};
    /*req.category_id=category_id
     req.start_date=start_date
     req.end_date=end_date*/
    $.ajax({
      url: '/infirmary_staff/read_staff_lab_test',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully ");
          self.staffInfirmaryLabTests = data.staffInfirmaryLabTests;
          self.trigger('read_staff_infirmary_lab_test_changed', self.staffInfirmaryLabTests);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // add LAb Test

  self.on('add_staff_lab_test_infirmary', function (emp_id, heamoglobin, platelet, creatinine, blood_sugar_f, blood_sugar_p, triglyceride, total_cholesterol, sgpt, sgot, systolic_bp, diastolic_bp) {
    let req = {};
    req.emp_id = emp_id;
    req.heamoglobin = heamoglobin;
    req.platelet = platelet;
    req.creatinine = creatinine;
    req.blood_sugar_f = blood_sugar_f;
    req.blood_sugar_p = blood_sugar_p;
    req.triglyceride = triglyceride;
    req.total_cholesterol = total_cholesterol;
    req.sgpt = sgpt;
    req.sgot = sgot;
    req.systolic_bp = systolic_bp;
    req.diastolic_bp = diastolic_bp;
    $.ajax({
      url: '/infirmary_staff/add_staff_lab_test_infirmary',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add case  after');
          let obj = {};
          obj.lab_id = data.lab_id;
          obj.emp_id = emp_id;
          obj.heamoglobin = heamoglobin;
          obj.platelet = platelet;
          obj.creatinine = creatinine;
          obj.blood_sugar_f = blood_sugar_f;
          obj.blood_sugar_p = blood_sugar_p;
          obj.triglyceride = triglyceride;
          obj.total_cholesterol = total_cholesterol;
          obj.sgpt = sgpt;
          obj.sgot = sgot;
          obj.systolic_bp = systolic_bp;
          obj.diastolic_bp = diastolic_bp;
          self.staffInfirmaryLabTests = [obj, ...self.staffInfirmaryLabTests];
          toastr.success("Lab Report Inderted Successfully ");
          self.trigger('add_staff_infirmary_lab_test_changed', self.staffInfirmaryLabTests);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // add LAb Test

  self.on('edit_staff_lab_test_infirmary', function (emp_id, heamoglobin, platelet, creatinine, blood_sugar_f, blood_sugar_p, triglyceride, total_cholesterol, sgpt, sgot, systolic_bp, diastolic_bp, id) {
    let req = {};
    req.emp_id = emp_id;
    req.heamoglobin = heamoglobin;
    req.platelet = platelet;
    req.creatinine = creatinine;
    req.blood_sugar_f = blood_sugar_f;
    req.blood_sugar_p = blood_sugar_p;
    req.triglyceride = triglyceride;
    req.total_cholesterol = total_cholesterol;
    req.sgpt = sgpt;
    req.sgot = sgot;
    req.systolic_bp = systolic_bp;
    req.diastolic_bp = diastolic_bp;
    req.id = id;
    $.ajax({
      url: '/infirmary_staff/edit_staff_lab_test_infirmary/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {

          self.staffInfirmarysstaffInfirmaryLabTests = self.staffInfirmaryLabTests.map(cat => {
            if (cat.lab_id == id) {
              cat.lab_id = id;
              cat.emp_id = emp_id;
              cat.heamoglobin = heamoglobin;
              cat.platelet = platelet;
              cat.creatinine = creatinine;
              cat.blood_sugar_f = blood_sugar_f;
              cat.blood_sugar_p = blood_sugar_p;
              cat.triglyceride = triglyceride;
              cat.total_cholesterol = total_cholesterol;
              cat.sgpt = sgpt;
              cat.sgot = sgot;
              cat.systolic_bp = systolic_bp;
              cat.diastolic_bp = diastolic_bp;
            }
            // cat.confirmEdit = false
            return cat;
          });
          //  self.staffInfirmaryLabTests = [obj, ...self.staffInfirmaryLabTests]
          toastr.success("Lab Report Updated Successfully ");
          self.trigger('edit_staff_infirmary_lab_test_changed', self.staffInfirmaryLabTests);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //delete staff lab test
  self.on('delete_lab_test', function (id) {
    $.ajax({
      url: '/infirmary_staff/delete_lab_test/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempStaffInfirmaryLabTests = self.staffInfirmaryLabTests.filter(c => {
            return c.lab_id != id;
          });
          self.staffInfirmaryLabTests = tempStaffInfirmaryLabTests;
          toastr.info("lab test deleted successfully");
          self.trigger('delete_staff_infirmary_lab_test_changed', self.staffInfirmaryLabTests);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
} // end of store
function StaffStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  /*self.on('read_cast', function() {
    let req = {}
    $.ajax({
      url:'/student/read_cast/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.cast = data.cast
            self.trigger('read_cast_changed', data.cast)
          }else if(data.status == 'e'){
            showToast("Cast Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })
    self.on('read_religion', function() {
    let req = {}
    $.ajax({
      url:'/student/read_religion/',
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.religion = data.religion
            self.trigger('read_religion_changed', data.religion)
          }else if(data.status == 'e'){
            showToast("Religion Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/

  /*self.on('read_student', function(read_standard_id,read_section_id,read_enroll_number) {
    console.log(read_standard_id)
    console.log(read_section_id)
    console.log(read_enroll_number)
    let req = {}
    req.read_standard_id=read_standard_id
    req.read_section_id=read_section_id
    req.read_enroll_number=read_enroll_number
    $.ajax({
      url:'/student/read_student/'+read_standard_id+'/'+read_section_id+'/'+read_enroll_number,
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            self.students = data.students
            self.trigger('read_student_changed', data.students)
          }else if(data.status == 'e'){
            showToast("Student Read Error. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/

  self.on('csv_export_ex_staff', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/staff/csv_export_ex_staff',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_ex_staff_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_staff_id_card', function (st) {
    $.ajax({
      url: '/staff/read_staff_id_card',
      contentType: "application/json",
      type: "POST",
      data: JSON.stringify(st),
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_staff_id_card_changed', data.staff_id_card_details, data.image_type);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //Staff TYpe Report

  self.on('read_employee_type_report', function () {
    let req = {};
    $.ajax({
      url: '/staff/read_employee_type_report',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside employee  report");
          self.employeeTypeReports = data.employeeTypeReports;
          var grandTotal = 0;
          self.employeeTypeReports.map(i => {
            grandTotal = Number(grandTotal) + Number(i.total);
          });
          self.trigger('read_employee_type_report_change', self.employeeTypeReports, grandTotal);
        } else if (data.status == 'e') {
          showToast("staff Type Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_employee_gender_report', function (id) {
    let req = {};
    $.ajax({
      url: '/staff/read_employee_gender_report/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          //self.studentSummaryReports=[]
          console.log("inside employee  report");
          self.employeeGenderReports = data.employeeGenderReports;
          var grandTotal = 0;
          self.employeeGenderReports.map(i => {
            grandTotal = Number(grandTotal) + Number(i.total);
          });
          self.trigger('read_employee_gender_report_change', self.employeeGenderReports, grandTotal);
        } else if (data.status == 'e') {
          showToast("staff Gender Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_for_edit_staff', function (emp_id) {
    console.log(emp_id);
    let req = {};
    req.emp_id = emp_id;

    $.ajax({
      url: '/staff/read_for_edit_staff/' + emp_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.staff_details = data.staff_details;
          self.workExperienceArray = data.workExperienceArray;
          self.trigger('read_for_edit_staff_changed', data.staff_details, self.workExperienceArray);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  //read temp Edit Staff
  self.on('read_for_edit_temp_staff', function (emp_id) {
    console.log(emp_id);
    let req = {};
    req.emp_id = emp_id;

    $.ajax({
      url: '/staff/read_for_edit_temp_staff/' + emp_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.staff_details = data.staff_details;
          self.workArray = data.workExperienceArray;
          self.trigger('read_for_edit_staff_changed', data.staff_details, self.workArray);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //read Staff
  var Staffs = [];
  self.on('read_staff', function (employee_type_id, department_id, designation_id, level_id) {
    console.log('i am in staff Form api call from ajax');
    let req = {};
    $.ajax({

      url: '/staff/read_staff/' + employee_type_id + '/' + department_id + '/' + designation_id + '/' + level_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.staffs = data.staffs;
          self.trigger('read_staff_changed', data.staffs);
        } else if (data.status == 'e') {
          showToast("Received From Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('csv_export_staff', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/staff/csv_export_staff',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_staff_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  // read for profile Approved

  //read Staff
  var Staffs = [];
  self.on('read_temp_staff', function (employee_type_id) {
    console.log('i am in temp staff Form api call from ajax');
    let req = {};
    $.ajax({

      url: '/staff/read_temp_staff/' + employee_type_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.staffs = data.staffs;
          self.trigger('read_staff_changed', data.staffs);
        } else if (data.status == 'e') {
          showToast("Received From Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_department', function () {
    let req = {};
    $.ajax({
      url: '/staff/read_department',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.departments = data.departments;
          self.trigger('department_changed', data.departments);
        } else if (data.status == 'e') {
          showToast("departments Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_staff', function (obj) {
    console.log(obj);
    // return;
    $.ajax({
      url: '/staff/add_staff',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Staff after');
          toastr.success("Successfully Inserted");
          self.trigger('add_staff_changed', self.staffs, data.staff_id);
        } else if (data.status == 'e') {
          showToast("Error adding Staff. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*self.on('edit_student', function(obj,student_id) {
    let req = {}
    console.log(obj)
    console.log(student_id)
    req.student_id=student_id
    $.ajax({
      url:'/student/edit_student/'+student_id,
        type:"POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Update")
            self.trigger('edit_student_changed', self.students)
          }else if(data.status == 'e'){
            showToast("Error Updating Student. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/

  // read Ex-staff
  self.on('read_ex_staff', function (emp_type_id) {
    let req = {};
    $.ajax({
      url: '/staff/read_ex_staff/' + emp_type_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.exStaffs = data.exStaffs;
          self.trigger('read_ex_staff_changed', self.exStaffs);
        } else if (data.status == 'e') {
          showToast("Staff Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // read Browse-staff
  self.on('read_browse_staff', function (emp_type_id) {
    let req = {};
    $.ajax({
      url: '/staff/read_browse_staff/' + emp_type_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.browseStaffs = data.browseStaffs;
          self.trigger('read_browse_staff_changed', self.browseStaffs);
        } else if (data.status == 'e') {
          showToast("Staff Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('browse_staff_csv', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/staff/browse_staff_csv',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('browse_staff_csv_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('edit_staff', function (obj, staff_id, editType) {
    let req = {};
    console.log(obj);
    console.log(staff_id);
    console.log(editType);
    req.staff_id = staff_id;
    $.ajax({
      url: '/staff/edit_staff/' + staff_id + '/' + editType,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Update");
          self.trigger('edit_staff_changed', self.staffs);
        } else if (data.status == 'e') {
          showToast("Error Updating staff. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // update temp  staff into main table

  self.on('edit_temp_staff', function (obj, staff_id) {
    let req = {};
    req.staff_id = staff_id;
    $.ajax({
      url: '/staff/edit_temp_staff/' + staff_id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Update");
          self.trigger('edit_staff_changed', self.staffs);
        } else if (data.status == 'e') {
          showToast("Error Updating staff. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('update_staff_status', function (emp_id, leaving_date, remark) {
    let req = {};
    req.emp_id = emp_id;
    req.leaving_date = leaving_date;
    req.remark = remark;
    $.ajax({
      url: '/staff/update_staff_status',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Update");
          self.trigger('update_staff_status_changed');
        } else if (data.status == 'e') {
          showToast("Error Updating staff. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // delete Staff

  self.on('delete_staff', function (id) {
    $.ajax({
      url: '/staff/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempStaffs = self.staffs.filter(c => {
            return c.emp_id != id;
          });
          self.staffs = tempStaffs;
          toastr.info("Staff Deleted Successfully");
          self.trigger('delete_staff_changed', self.staffs);
        } else if (data.status == 'e') {
          showToast("Error Deleting Staff. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //allow Block staff 

  /*self.on('allow_block_staff', function(emp_id,is_active) {
    let req = {}
    req.emp_id=emp_id
    req.is_active=is_active
    
    $.ajax({
      url:'/staff/allow_block_staff',
        type:"POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType:"json",
        headers: {"Authorization": getCookie('token')},
        success: function(data){
          console.log(data)
          if(data.status == 's'){
            toastr.success("Successfully Update")
            self.trigger('allow_block_staff_changed')
          }else if(data.status == 'e'){
            showToast("Error Updating staff. Please try again.", data)
          }
        },
        error: function(data){
          showToast("", data)
        }
      })
  })*/

  self.on('allow_block_staff', function (st) {
    $.ajax({
      url: '/staff/allow_block_staff',
      type: "POST",
      data: JSON.stringify(st),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Update Successfull");
          self.trigger('allow_block_staff_changed');
        } else if (data.status == 'e') {
          showToast("Error updating result activation. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('reset_staff_password', function (emp_id) {
    let req = {};
    req.emp_id = emp_id;
    // req.password=password

    $.ajax({
      url: '/staff/reset_staff_password',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Update");
          self.trigger('reset_staff_password_changed');
        } else if (data.status == 'e') {
          showToast("Error Updating staff. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  // fast edit

  self.on('fast_edit_staff', function (editValues, fast_edit_value) {
    let req = {};
    req.editValues = editValues;
    req.fast_edit_value = fast_edit_value;
    $.ajax({
      url: '/staff/fast_edit_staff',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Update");
          self.trigger('update_staff_fast_edit_changed');
        } else if (data.status == 'e') {
          showToast("Error Updating staff. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('upload_staff_image', function (staff_image, staff_id) {
    var form_data = new FormData();
    form_data.append("staff_profile_picture", staff_image);
    $.ajax({
      url: '/staff/upload_staff_image/empImages/' + staff_id,
      type: "POST",
      dataType: 'script',
      processData: false,
      contentType: false,
      data: form_data,
      headers: { "Authorization": getCookie('token') },
      success: function (image_name) {
        console.log(image_name);
        self.trigger('upload_staff_image_changed', image_name);
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StandardStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.standards = [];

  self.on('read_standard', function () {
    console.log('i am in read_standard api call from ajax');
    let req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standard Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_standard', function () {
    console.log('i am in csv_export_standard api call from ajax');
    let req = {};
    $.ajax({
      url: '/standard/csv_export_standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_standard_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_standard', function (id) {
    $.ajax({
      url: '/standard/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempStandard = self.standards.filter(c => {
            return c.standard_id != id;
          });
          self.standards = tempStandard;
          self.trigger('standard_changed', self.standards);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_standard', function (standard, id) {
    let req = {};
    req.standard = standard;
    req.id = id;
    $.ajax({
      url: '/standard/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.standards = self.standards.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_standard', function (standard) {
    let req = {};
    req.standard = standard;
    $.ajax({
      url: '/standard/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add standard after');
          let obj = {};
          obj.standard_id = data.standard_id;
          obj.standard = standard;
          self.standards = [obj, ...self.standards];
          self.trigger('standard_changed', self.standards);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StateStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.states = [];

  self.on('read_state', function () {
    console.log('i am in read_state api call from ajax');
    let req = {};
    $.ajax({
      url: '/state',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.states = data.states;
          self.trigger('state_changed', data.states);
        } else if (data.status == 'e') {
          showToast("level Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempState = self.states.filter(c => {
            return c.state != id;
          });
          self.states = tempState;
          self.trigger('state_changed', self.states);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_state', function (state, id) {
    let req = {};
    req.state = state;
    req.id = id;
    $.ajax({
      url: '/state/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.states = self.states.map(cat => {
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_state', function (state) {
    let req = {};
    req.state = state;
    $.ajax({
      url: '/state/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add state after');
          let obj = {};
          //obj.level_id = data.level_id
          obj.state = state;
          self.states = [obj, ...self.states];
          self.trigger('state_changed', self.states);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StudentAssignHouseStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.houses = [];

  self.on('read_houses', function () {
    let req = {};
    $.ajax({
      url: '/student-assign-house',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.houses = data.houses;
          self.trigger('house_changed', data.houses);
        } else if (data.status == 'e') {
          showToast("House Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_house', function (house) {
    let req = {};
    req.house = house;
    $.ajax({
      url: '/student-assign-house/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          let obj = {};
          obj.id = data.id;
          obj.house = house;
          self.houses = [obj, ...self.houses];
          toastr.success("House Created Successfully ");
          self.trigger('add_house_changed', self.houses);
        } else if (data.status == 'e') {
          showToast("Error adding Item. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('update_house', function (house, id) {
    let req = {};
    req.house = house;
    req.id = id;
    $.ajax({
      url: '/student-assign-house/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.houses = self.houses.map(cat => {
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
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempExamScheme = self.houses.filter(c => {
            return c.house_id != id;
          });
          self.houses = tempExamScheme;
          toastr.info("House Deleted Successfully");
          self.trigger('delete_house_changed', self.houses);
        } else if (data.status == 'e') {
          showToast("Error Deleting House. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************students start*****************************************************************/

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_students', function (house_id, standard_id, section_id) {
    let req = {};
    $.ajax({
      url: '/student-assign-house/students/' + house_id + '/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_students_changed', data.freeStudents, data.assignedStudents);
        } else if (data.status == 'e') {
          showToast("House Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Students assigned successfully ");
          self.trigger('assign_students_changed', students);
        } else if (data.status == 'e') {
          showToast("Error assigning students. Please try again.", data.messaage);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {

          toastr.success("Students freed successfully ");
          self.trigger('assign_students_changed', students);
        } else if (data.status == 'e') {
          showToast("Error while free up students. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student_by_house', function (house_id) {
    let req = {};
    $.ajax({
      url: '/student-assign-house/students_by_house/' + house_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_student_by_house_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Students Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('update_house_captain', function (house_id, captain_id, vice_captain_id) {
    let req = {};
    $.ajax({
      url: '/student-assign-house/update-captain/' + house_id + '/' + captain_id + '/' + vice_captain_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          toastr.success("House Captain Updated Successfully ");
          self.trigger('update_house_captain_changed');
        } else if (data.status == 'e') {
          showToast("Error updating house captain. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student_by_house_details', function (house_id) {
    let req = {};
    $.ajax({
      url: '/student-assign-house/students_by_house_details/' + house_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_student_by_house_details_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Students Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StudentAssignSectionStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.studentGroups = [];

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************subjects start*****************************************************************/

  self.on('read_students', function (standard_id, section_id, second_section_id) {
    let req = {};
    $.ajax({
      url: '/student-assign-section/students/' + standard_id + '/' + section_id + '/' + second_section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_students_changed', data.freeStudents, data.assignedStudents);
        } else if (data.status == 'e') {
          showToast("AssignSection Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('assign_students', function (section_id, students) {
    var obj = {};
    obj['section_id'] = section_id;
    obj['students'] = students;
    $.ajax({
      url: '/student-assign-section/assign-students/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Sections assigned successfully ");
          self.trigger('assign_students_changed', students);
        } else if (data.status == 'e') {
          showToast("Error assigning students. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('free_up_students', function (section_id, students) {
    var obj = {};
    obj['section_id'] = section_id;
    obj['students'] = students;
    $.ajax({
      url: '/student-assign-section/free-up-students/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {

          toastr.success("Sections assigned successfully ");
          self.trigger('assign_students_changed', students);
        } else if (data.status == 'e') {
          showToast("Error while free up students. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StudentAssignSubjectStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.studentGroups = [];

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************subjects start*****************************************************************/

  self.on('read_subjects', function (standard_id) {
    let req = {};
    $.ajax({
      url: '/student-assign-subject/subjects/' + standard_id + '/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_subjects_changed', data.freeSubjects, data.assignedSubjects);
        } else if (data.status == 'e') {
          showToast("AssignSubject Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('assign_subjects', function (standard_id, subjects) {
    var obj = {};
    obj['standard_id'] = standard_id;
    obj['subjects'] = subjects;
    $.ajax({
      url: '/student-assign-subject/assign-subjects/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Subjects assigned successfully ");
          self.trigger('assign_subjects_changed', subjects);
        } else if (data.status == 'e') {
          showToast("Error assigning subjects. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('free_up_subject', function (standard_id, subjects) {
    var obj = {};
    obj['standard_id'] = standard_id;
    obj['subjects'] = subjects;
    $.ajax({
      url: '/student-assign-subject/free-up-subject/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {

          toastr.success("Subjects freed successfully ");
          self.trigger('assign_subjects_changed', subjects);
        } else if (data.status == 'e') {
          showToast("Error while free up subjects. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StudentStudentGroupStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.studentGroups = [];

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student_groups', function (standard_id, section_id) {
    let req = {};
    $.ajax({
      url: '/student-group-student/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.studentGroups = data.studentGroups;
          self.trigger('read_student_groups_changed', data.studentGroups);
        } else if (data.status == 'e') {
          showToast("StudentGroup Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_student_group', function (req) {
    $.ajax({
      url: '/student-group-student/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          let obj = {};
          obj.group_id = data.group_id;
          obj.group_name = req.group_name;
          obj.group_detail = req.group_detail;
          self.studentGroups = [obj, ...self.studentGroups];
          toastr.success("Student Group Created Successfully ");
          self.trigger('add_student_group_changed', self.studentGroups);
        } else if (data.status == 'e') {
          showToast("Error adding student group. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('update_student_group', function (req, group_id) {
    $.ajax({
      url: '/student-group-student/edit/' + group_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.studentGroups = self.studentGroups.map(cat => {
            if (cat.group_id == group_id) {
              cat.group_id = group_id;
              cat.group_name = req.group_name;
              cat.group_detail = req.group_detail;
            }
            cat.confirmEdit = false;
            return cat;
          });
          toastr.success("Student Group Updated Successfully ");
          self.trigger('add_student_group_changed', self.studentGroups); // same trigger, as Add StudentGroup
        } else if (data.status == 'e') {
          showToast("Error updating StudentGroup. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_student_group', function (group_id) {
    console.log('calling me');
    $.ajax({
      url: '/student-group-student/delete/student-group/' + group_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempStudentGroup = self.studentGroups.filter(c => {
            return c.group_id != group_id;
          });
          self.studentGroups = tempStudentGroup;
          toastr.info("StudentGroup Deleted Successfully");
          self.trigger('delete_student_group_changed', self.studentGroups);
        } else if (data.status == 'e') {
          showToast("Error Deleting StudentGroup. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************students start*****************************************************************/

  self.on('read_students', function (group_id, standard_id, section_id) {
    let req = {};
    $.ajax({
      url: '/student-group-student/students/' + group_id + '/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_students_changed', data.freeStudents, data.assignedStudents);
        } else if (data.status == 'e') {
          showToast("StudentGroup Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('assign_students', function (group_id, students) {
    var obj = {};
    obj['group_id'] = group_id;
    obj['students'] = students;
    $.ajax({
      url: '/student-group-student/assign-students/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Students assigned successfully ");
          self.trigger('assign_students_changed', students);
        } else if (data.status == 'e') {
          showToast("Error assigning students. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('free_up_student', function (group_id, students) {
    var obj = {};
    obj['group_id'] = group_id;
    obj['students'] = students;
    $.ajax({
      url: '/student-group-student/free-up-student/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {

          toastr.success("Students freed successfully ");
          self.trigger('assign_students_changed', students);
        } else if (data.status == 'e') {
          showToast("Error while free up students. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************subjects start*****************************************************************/

  self.on('read_subjects', function (group_id, standard_id, section_id) {
    let req = {};
    $.ajax({
      url: '/student-group-student/subjects/' + group_id + '/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_subjects_changed', data.freeSubjects, data.assignedSubjects);
        } else if (data.status == 'e') {
          showToast("StudentGroup Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('assign_subjects', function (group_id, subjects) {
    var obj = {};
    obj['group_id'] = group_id;
    obj['subjects'] = subjects;
    $.ajax({
      url: '/student-group-student/assign-subjects/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Subjects assigned successfully ");
          self.trigger('assign_subjects_changed', subjects);
        } else if (data.status == 'e') {
          showToast("Error assigning subjects. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('free_up_subject', function (group_id, subjects) {
    var obj = {};
    obj['group_id'] = group_id;
    obj['subjects'] = subjects;
    $.ajax({
      url: '/student-group-student/free-up-subject/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {

          toastr.success("Subjects freed successfully ");
          self.trigger('assign_subjects_changed', subjects);
        } else if (data.status == 'e') {
          showToast("Error while free up subjects. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('save_order_number', function (group_id, subjects) {
    var obj = {};
    obj['group_id'] = group_id;
    obj['subjects'] = subjects;
    $.ajax({
      url: '/student-group-student/save-order-number/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {

          toastr.success("Order number saved successfully ");
          self.trigger('save_order_number_changed', subjects);
        } else if (data.status == 'e') {
          showToast("Error while saving order number. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('copy_order_number', function (group_id) {
    let req = {};
    $.ajax({
      url: '/student-group-student/copy-order-number/' + group_id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          // toastr.success("Copy order number successfull")
          self.trigger('copy_order_number_changed', data.subjects);
        } else if (data.status == 'e') {
          showToast("Error in copy order number. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_subject_groups_for_copy_order_no', function (standard_id, section_id) {
    let req = {};
    $.ajax({
      url: '/student-group-student/' + standard_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_subject_groups_for_copy_order_no_changed', data.studentGroups);
        } else if (data.status == 'e') {
          showToast("StudentGroup Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student_group_details', function (group_id) {
    let req = {};
    $.ajax({
      url: '/student-group-student/student-group-details/read/' + group_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_student_group_details_changed', data.students, data.subjects);
        } else if (data.status == 'e') {
          showToast("Group details Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('hide_group', function (group_id, section_id) {
    let req = {};
    $.ajax({
      url: '/student-group-student/hide-group/' + group_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('hide_group_changed', data.info);
        } else if (data.status == 'e') {
          showToast("Group details Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_hidden_groups', function (section_id) {
    let req = {};
    $.ajax({
      url: '/student-group-student/hidden-group/read-groups/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_hidden_groups_changed', data.studentGroups);
        } else if (data.status == 'e') {
          showToast("Hidden Group Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('unhide_group', function (group_id, section_id) {
    let req = {};
    $.ajax({
      url: '/student-group-student/delete-hidden-group/delete/' + group_id + '/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_unhide_group_changed', data.studentGroups);
        } else if (data.status == 'e') {
          showToast("Hidden Group Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StudentInfirmaryStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.infirmaryCases = [];
  self.infirmaryCategories = [];
  self.studentInfirmarys = [];
  self.on('read_infirmary_category', function () {
    console.log('i am in read_sections api call from ajax');
    let req = {};
    $.ajax({
      url: '/infirmary_student/readInfirmaryCategory',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCategories = data.infirmaryCategories;
          self.trigger('read_infirmary_category_changed', data.infirmaryCategories);
        } else if (data.status == 'e') {
          showToast("case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_infirmary', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/infirmary_student/csv_export_infirmary',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_infirmary_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_student_date_wise_case_report', function (category_id, start_date, end_date) {
    let req = {};
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
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully ");
          self.studentDateWiseCaseReports = data.studentDateWiseCaseReports;

          self.trigger('read_student_date_wise_case_report_changed', self.studentDateWiseCaseReports, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_date_wise_case_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/infirmary_student/csv_export_date_wise_case_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_date_wise_case_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  //read Class Wise student Case Report

  self.on('read_class_wise_report', function (standard_id, section_id) {
    let req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    $.ajax({
      url: '/infirmary_student/read_class_wise_report',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully ");
          self.class_wise_case_report = data.class_wise_case_report;
          self.grand_total = 0;
          self.class_wise_case_report.map(q => {
            self.grand_total = Number(self.grand_total) + Number(q.total);
          });
          //self.grand_total = data.grand_total
          //  , getCookie('session_name')
          self.trigger('read_class_wise_report_changed', self.class_wise_case_report, self.grand_total);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_infirmary_class_wise_case_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/infirmary_student/csv_export_infirmary_class_wise_case_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_infirmary_class_wise_case_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  // infiramry student case wise report

  self.on('read_case_wise_report', function (obj) {
    let req = {};
    req.start_date = obj.start_date;
    req.end_date = obj.end_date;
    $.ajax({
      url: '/infirmary_student/read_case_wise_report',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully ");
          self.case_wise_reports = data.case_wise_reports;
          self.grand_total = 0;
          self.case_wise_reports.map(q => {
            self.grand_total = Number(self.grand_total) + Number(q.total);
          });
          //self.grand_total = data.grand_total
          //  , getCookie('session_name')
          self.trigger('read_case_wise_report_changed', self.case_wise_reports, self.grand_total);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_infirmary_case_wise_report', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/infirmary_student/csv_export_infirmary_case_wise_report',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_infirmary_case_wise_report_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('read_infirmary_case', function () {
    console.log('i am in read_section api call from ajax');
    let req = {};
    $.ajax({
      url: '/infirmary_student/read_infirmary_case',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.infirmaryCases = data.infirmaryCases;
          self.trigger('read_infirmary_case_changed', data.infirmaryCases);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student_infirmary', function (id, session_id) {
    console.log('i am in read_section api call from ajax');
    let req = {};
    $.ajax({
      url: '/infirmary_student/read_student_infirmary/' + id + '/' + session_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.studentInfirmarys = data.studentInfirmarys;
          self.trigger('read_student_infirmary_changed', data.studentInfirmarys);
        } else if (data.status == 'e') {
          showToast("Case Read Error. Please try again.", data);
        }
      },
      error: function (data) {
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
      success: function (data) {
        if (data.status == 's') {
          let tempStudentInfirmary = self.studentInfirmarys.filter(c => {
            return c.infirmary_id != id;
          });
          self.studentInfirmarys = tempStudentInfirmary;
          toastr.info("Infirmary Deleted Successfully");
          self.trigger('delete_student_infirmary_changed', self.studentInfirmarys);
        } else if (data.status == 'e') {
          showToast("Error Deleting Case. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_student_infirmary', function (enroll_number, category_id, case_id, treatment_date, time_in, time_out, treatment, sent_home, id, case_name, category) {
    let req = {};
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
    // req.case=case
    req.category = category;
    req.id = id;
    $.ajax({
      url: '/infirmary_student/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.studentInfirmarys = self.studentInfirmarys.map(cat => {
            if (cat.infirmary_id == id) {
              cat.enroll_number = enroll_number;
              cat.category_id = category_id;
              cat.category_name = category;
              cat.case_name = case_name;
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
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_student_infirmary', function (enroll_number, category_id, case_id, treatment_date, time_in, time_out, treatment, sent_home, case_name, category) {
    let req = {};
    req.enroll_number = enroll_number;
    req.category_id = category_id;
    req.case_id = case_id;
    req.treatment_date = treatment_date;
    req.time_in = time_in;
    req.time_out = time_out;
    req.treatment = treatment;
    req.sent_home = sent_home;
    req.case_name = case_name;
    //req.case=case
    req.category = category;
    $.ajax({
      url: '/infirmary_student/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add case  after');
          let obj = {};
          obj.infirmary_id = data.infirmary_id;
          obj.enroll_number = enroll_number;
          obj.category_id = category_id;
          obj.case_id = case_id;
          obj.treatment_date = treatment_date;
          obj.time_in = time_in;
          obj.time_out = time_out;
          obj.treatment = treatment;
          obj.category_name = category;
          obj.case_name = case_name;
          obj.sent_home = sent_home;
          // obj.name = name
          self.studentInfirmarys = [obj, ...self.studentInfirmarys];
          toastr.success("Infirmary  Inserserted Successfully ");
          self.trigger('add_student_infirmary_changed', self.studentInfirmarys);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StudentInfoUpdateStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_standard', function () {
    let req = {};
    $.ajax({
      url: '/student_info_update/read_standard/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Standard Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/student_info_update/read_section/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student_info_update', function (read_section_id, read_enroll_number) {
    console.log(read_section_id);
    console.log(read_enroll_number);
    let req = {};
    req.read_section_id = read_section_id;
    req.read_enroll_number = read_enroll_number;
    $.ajax({
      url: '/student_info_update/read_student_info_update/' + read_section_id + '/' + read_enroll_number,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          self.trigger('read_student_info_update_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StudentLoginSlipStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.studentGroups = [];

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************subjects start*****************************************************************/

  self.on('read_students', function (standard_id, section_id) {
    var obj = {};
    obj['standard_id'] = standard_id;
    obj['section_id'] = section_id;
    $.ajax({
      url: '/student-login-slip/students',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_students_changed', data.students);
        } else if (data.status == 'e') {
          showToast("LoginSlip Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('update_login_status', function (st) {

    $.ajax({
      url: '/student-login-slip/update-login-status/',
      type: "POST",
      data: JSON.stringify(st),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Login status updated successfully ");
          self.trigger('update_login_status_changed');
        } else if (data.status == 'e') {
          showToast("Error updating status. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('print_login_slip', function (standard_id, section_id, student_id) {
    var obj = {};
    obj['student_id'] = student_id;
    obj['standard_id'] = standard_id;
    obj['section_id'] = section_id;
    $.ajax({
      url: '/student-login-slip/print-login-slip/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {

          self.trigger('print_login_slip_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Error print login slip. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('print_login_slip_all', function (standard_id, section_id) {
    var obj = {};
    obj['standard_id'] = standard_id;
    obj['section_id'] = section_id;
    $.ajax({
      url: '/student-login-slip/print-login-slip-all/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {

          self.trigger('print_login_slip_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Error print login slip. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('reset_password', function (enroll_number) {
    var obj = {};
    obj['enroll_number'] = enroll_number;
    $.ajax({
      url: '/student-login-slip/reset-password/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          toastr.success("Password reset successfully ");
          self.trigger('reset_password_changed');
        } else if (data.status == 'e') {
          showToast("Error in reset password. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('generate_id', function (standard_id, section_id, student_id) {
    var obj = {};
    obj['student_id'] = student_id;
    obj['standard_id'] = standard_id;
    obj['section_id'] = section_id;
    $.ajax({
      url: '/student-login-slip/generate-id/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {

          self.trigger('generate_id_changed');
        } else if (data.status == 'e') {
          showToast("Error generating ID. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StudentNotificationStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.students = [];

  self.on('read_standard', function () {
    let req = {};
    $.ajax({
      url: '/student-notification/read_standard/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Standard Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/student-notification/read_section/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_students', function (obj) {
    console.log('i am in read_students api call from ajax');
    let req = {};
    console.log(obj.course);
    req.standard_id = obj.standard_id;
    req.section_id = obj.section_id;
    $.ajax({
      url: '/student-notification/read_student/' + obj.standard_id + '/' + obj.section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.students = data.students;
          if (data.students.length == 0) {
            toastr.info("No Data Found!");
          }
          self.trigger('students_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('send_sms', function (mobile_no, student_message) {
    let req = {};
    req.mobile_no = mobile_no;
    req.message = student_message;
    req.type = 'Student';
    $.ajax({
      url: '/sms/',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('student_sms_changed');
        } else if (data.status == 'e') {
          showToast("Error sending SMS. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('send_email', function (email, student_subject, student_message) {
    let req = {};
    req.email = email;
    req.subject = student_subject;
    req.message = student_message;
    req.type = 'Student';
    $.ajax({
      url: '/email/',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('student_email_changed');
        } else if (data.status == 'e') {
          showToast("Error sending Email. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StudentResultActivationStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.studentGroups = [];

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************subjects start*****************************************************************/

  self.on('read_students', function (standard_id, section_id) {
    var obj = {};
    obj['standard_id'] = standard_id;
    obj['section_id'] = section_id;
    $.ajax({
      url: '/student-result-activation/students',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_students_changed', data.students);
        } else if (data.status == 'e') {
          showToast("ResultActivation Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('update_result_status', function (st) {

    $.ajax({
      url: '/student-result-activation/update-result-status/',
      type: "POST",
      data: JSON.stringify(st),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {

          toastr.success("Result Activation Updated Successfully ");
          self.trigger('update_result_status_changed');
        } else if (data.status == 'e') {
          showToast("Error updating status. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StudentSchoolLeavingStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.studentGroups = [];

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/student-school-leaving/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/student-school-leaving/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************subjects start*****************************************************************/

  self.on('read_students', function (standard_id, section_id, type) {
    var obj = {};
    obj['standard_id'] = standard_id;
    obj['section_id'] = section_id;
    obj['type'] = type;
    $.ajax({
      url: '/student-school-leaving/students',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          if (data.students.length == 0) {
            toastr.info("No Data Found");
          }
          self.trigger('read_students_changed', data.students);
        } else if (data.status == 'e') {
          showToast("SchoolLeaving Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('create_certificate', function (obj) {
    $.ajax({
      url: '/student-school-leaving/create_certificate',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Created");
          self.trigger('create_certificate_changed');
        } else if (data.status == 'e') {
          showToast("SchoolLeaving Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('print_feed_back_form', function (student_id) {
    let req = {};
    req.student_id = student_id;
    $.ajax({
      url: '/student-school-leaving/print_feed_back_form/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {

          // toastr.success("Login status updated successfully ")
          self.trigger('print_feed_back_form_changed', data.students, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Error reading. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('print_certificate', function (student_id) {
    let req = {};
    req.student_id = student_id;
    console.log(student_id);
    $.ajax({
      url: '/student-school-leaving/print_certificate/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.trigger('print_certificate_changed', data.students, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Error reading. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_student_certificte', function (student_id) {

    let req = {};
    req.student_id = student_id;

    $.ajax({
      url: '/student-school-leaving/delete_student_certificte/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          /*let tempstudents = self.students.filter(c => {
            return c.student_id != student_id
          })
          self.students = tempstudents*/
          toastr.info("Successfully Deleted");
          self.trigger('delete_student_certificte_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StudentSearchStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_by_field', function (roll_no, student_name, reg_number, f_name, m_name) {
    let req = {};
    req.roll_no = roll_no;
    req.student_name = student_name;
    req.reg_number = reg_number;
    req.f_name = f_name;
    req.m_name = m_name;
    $.ajax({
      url: '/studentSearch/read_by_field',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.searchStudents = data.searchStudents;
          toastr.success("Successfully");
          self.trigger('read_by_field_change', self.searchStudents);
        } else if (data.status == 'e') {
          showToast("Error search Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //student Browser Data

  self.on('read_student_browser', function (standard_id, section_id) {
    let req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    $.ajax({
      url: '/studentSearch/read_student_browser',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.browseStudents = data.browseStudents;
          self.session_name = data.session_name;
          toastr.success("Successfully");
          self.trigger('read_student_browser_change', self.browseStudents, self.session_name);
        } else if (data.status == 'e') {
          showToast("Error search Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //read Student Family Occupation
  self.on('read_occupation', function () {
    let req = {};
    $.ajax({
      url: '/studentSearch/read_occupation/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.parentOccupations = data.parentOccupations;
          self.trigger('read_occupation_changed', data.parentOccupations);
        } else if (data.status == 'e') {
          showToast("Occuaption Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //Read Occupation Report

  self.on('read_occupation_report', function (occupation) {
    let req = {};
    $.ajax({
      url: '/studentSearch/read_occupation_report/' + occupation,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.occupationReports = data.occupationReports;
          self.trigger('read_occupation_report_change', data.occupationReports);
        } else if (data.status == 'e') {
          showToast("Occuaption Report Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('view_image_list', function (standard_id, section_id) {
    let req = {};
    req.standard_id = standard_id;
    req.section_id = section_id;
    $.ajax({
      url: '/studentSearch/view_image_list',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('view_image_list_changed', data.image_list, getCookie('session_name'), getCookie('session_id'));
        } else if (data.status == 'e') {
          showToast("Error search Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function StudentStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_standard', function () {
    let req = {};
    $.ajax({
      url: '/student/read_standard/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.standards = data.standards;
          self.trigger('read_standard_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("Standard Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/student/read_section/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.sections = data.sections;
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("Section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_house', function () {
    let req = {};
    $.ajax({
      url: '/student/read_house/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.houses = data.houses;
          self.trigger('read_house_changed', data.houses);
        } else if (data.status == 'e') {
          showToast("House Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_cast', function () {
    let req = {};
    $.ajax({
      url: '/student/read_cast/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.cast = data.cast;
          self.trigger('read_cast_changed', data.cast);
        } else if (data.status == 'e') {
          showToast("Cast Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_religion', function () {
    let req = {};
    $.ajax({
      url: '/student/read_religion/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.religion = data.religion;
          self.trigger('read_religion_changed', data.religion);
        } else if (data.status == 'e') {
          showToast("Religion Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student_first_edit', function (read_standard_id, read_section_id, first_edit_value) {

    let req = {};
    req.read_standard_id = read_standard_id;
    req.read_section_id = read_section_id;
    req.first_edit_value = first_edit_value;
    $.ajax({
      url: '/student/read_student_first_edit/' + read_standard_id + '/' + read_section_id + '/' + first_edit_value,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_student_first_edit_changed', data.student_first_edit);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_student_first', function (obj, first_edit_value) {
    let req = {};

    req.editValues = obj;
    console.log(first_edit_value);
    $.ajax({
      url: '/student/edit_student_first/' + first_edit_value,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Update");
          self.trigger('edit_student_first_changed');
        } else if (data.status == 'e') {
          showToast("Error Updating Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student', function (read_standard_id, read_section_id, read_enroll_number) {

    let req = {};
    req.read_standard_id = read_standard_id;
    req.read_section_id = read_section_id;
    req.read_enroll_number = read_enroll_number;
    $.ajax({
      url: '/student/read_student/' + read_standard_id + '/' + read_section_id + '/' + read_enroll_number,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {

          if (data.students == []) {
            toastr.info("No Data Found!");
          }
          self.trigger('read_student_changed', data.students, getCookie('session_id'), getCookie('session_name'), getCookie('role'));
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student_csv', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/student/read_student_csv',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_student_csv_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('read_for_edit_student', function (student_id) {
    console.log(student_id);
    let req = {};
    req.student_id = student_id;

    $.ajax({
      url: '/student/read_for_edit_student/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.student_details = data.student_details;
          self.trigger('read_for_edit_student_changed', data.student_details, getCookie('session_id'));
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_student_profile', function (student_id) {
    console.log(student_id);
    let req = {};
    req.student_id = student_id;

    $.ajax({
      url: '/student/read_student_profile/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.student_profile_details = data.student_profile_details;
          self.trigger('read_student_profile_changed', data.student_profile_details, getCookie('session_id'));
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_student', function (obj) {
    $.ajax({
      url: '/student/add_student',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add Student after');
          toastr.success("Successfully Inserted");
          self.trigger('add_student_changed', self.students, data.student_id);
        } else if (data.status == 'e') {
          showToast("Error adding Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_student', function (obj, student_id) {
    let req = {};

    req.student_id = student_id;
    $.ajax({
      url: '/student/edit_student/' + student_id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Update");
          self.trigger('edit_student_changed', self.students);
        } else if (data.status == 'e') {
          showToast("Error Updating Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('create_student_withdraw', function (obj, student_id) {
    /*let req = {}*/

    /*req.student_id=student_id*/
    $.ajax({
      url: '/student/create_student_withdraw/' + student_id,
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Withdraw Student");
          self.trigger('create_student_withdraw_changed', self.withdraw_students);
        } else if (data.status == 'e') {
          showToast("Error Updating Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_student', function (student_id) {

    let req = {};
    req.student_id = student_id;

    $.ajax({
      url: '/student/delete_student/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          /*let tempstudents = self.students.filter(c => {
            return c.student_id != student_id
          })
          self.students = tempstudents*/
          toastr.info("Successfully Deleted");
          self.trigger('delete_student_changed');
        } else if (data.status == 'e') {
          showToast("Error Deleting Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('regenerate_roll_no', function (read_section_id) {
    let req = {};

    req.read_section_id = read_section_id;
    $.ajax({
      url: '/student/regenerate_roll_no/' + read_section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          toastr.success("Successfully Regenerate Roll No");
          self.trigger('regenerate_roll_no_changed');
        } else if (data.status == 'e') {
          showToast("Error Updating Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('student_list', function (read_section_id) {
    let req = {};
    req.read_section_id = read_section_id;
    $.ajax({
      url: '/student/student_list/' + read_section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('student_list_changed', data.student_list, data.total);
        } else if (data.status == 'e') {
          showToast("Error Listing Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('print_list', function (read_standard_id, read_section_id) {
    let req = {};
    console.log(read_section_id);
    req.read_standard_id = read_standard_id;
    req.read_section_id = read_section_id;
    $.ajax({
      url: '/student/print_list/' + read_standard_id + '/' + read_section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('print_list_changed', data.print_list);
        } else if (data.status == 'e') {
          showToast("Error Listing Student. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('upload_student_image', function (student_image, student_id) {
    var form_data = new FormData();
    form_data.append("student_profile_picture", student_image);
    $.ajax({
      url: '/student/upload_student_image/studentImages/' + student_id,
      type: "POST",
      dataType: 'script',
      processData: false,
      contentType: false,
      data: form_data,
      headers: { "Authorization": getCookie('token') },
      success: function (image_name) {
        console.log(image_name);
        self.trigger('upload_student_image_changed', image_name);
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_upload_student_image', function (student_id) {

    $.ajax({
      url: '/student/delete_upload_student_image/' + student_id,
      type: "POST",
      dataType: 'script',
      processData: false,
      contentType: false,
      headers: { "Authorization": getCookie('token') },
      success: function (data) {

        self.trigger('delete_upload_student_image_changed');
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('upload_father_image', function (father_image, student_id) {
    var form_data = new FormData();
    form_data.append("father_profile_picture", father_image);
    $.ajax({
      url: '/student/upload_father_image/fatherImages/' + student_id,
      type: "POST",
      dataType: 'script',
      processData: false,
      contentType: false,
      data: form_data,
      headers: { "Authorization": getCookie('token') },
      success: function (image_name) {
        console.log(image_name);
        self.trigger('upload_father_image_changed', image_name);
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_upload_father_image', function (student_id) {

    $.ajax({
      url: '/student/delete_upload_father_image/' + student_id,
      type: "POST",
      dataType: 'script',
      processData: false,
      contentType: false,
      headers: { "Authorization": getCookie('token') },
      success: function (data) {

        self.trigger('delete_upload_father_image_changed');
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('upload_mother_image', function (mother_image, student_id) {
    var form_data = new FormData();
    form_data.append("mother_profile_picture", mother_image);
    $.ajax({
      url: '/student/upload_mother_image/motherImages/' + student_id,
      type: "POST",
      dataType: 'script',
      processData: false,
      contentType: false,
      data: form_data,
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(image_name);
        self.trigger('upload_mother_image_changed', image_name);
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_upload_mother_image', function (student_id) {

    $.ajax({
      url: '/student/delete_upload_mother_image/' + student_id,
      type: "POST",
      dataType: 'script',
      processData: false,
      contentType: false,
      headers: { "Authorization": getCookie('token') },
      success: function (data) {

        self.trigger('delete_upload_mother_image_changed');
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('upload_guardian_image', function (guardian_image, student_id) {
    var form_data = new FormData();
    form_data.append("guardian_profile_picture", guardian_image);
    console.log("guardian_image");
    console.log(guardian_image);
    $.ajax({
      url: '/student/upload_guardian_image/guardianImages/' + student_id,
      type: "POST",
      dataType: 'script',
      processData: false,
      contentType: false,
      data: form_data,
      headers: { "Authorization": getCookie('token') },
      success: function (image_name) {
        console.log(image_name);
        self.trigger('upload_guardian_image_changed', image_name);
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_upload_guardian_image', function (student_id) {

    $.ajax({
      url: '/student/delete_upload_guardian_image/' + student_id,
      type: "POST",
      dataType: 'script',
      processData: false,
      contentType: false,
      headers: { "Authorization": getCookie('token') },
      success: function (data) {

        self.trigger('delete_upload_guardian_image_changed');
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('upload_copy_father_image', function (student_id) {

    let req = {};
    req.student_id = student_id;
    console.log("student_id");
    console.log(req.student_id);
    $.ajax({
      url: '/student/upload_copy_father_image/' + student_id,
      type: "POST",
      data: JSON.stringify(),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        self.trigger('upload_copy_father_image_changed');
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('upload_copy_mother_image', function (student_id) {
    let req = {};
    req.student_id = student_id;
    console.log("student_id");
    console.log(req.student_id);
    $.ajax({
      url: '/student/upload_copy_mother_image/' + student_id,
      type: "POST",
      data: JSON.stringify(),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {

        self.trigger('upload_copy_mother_image_changed');
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });
}
function StudentWithdrawnStudentStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.studentGroups = [];

  self.on('read_classes', function () {
    let req = {};
    $.ajax({
      url: '/standard',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_classes_changed', data.standards);
        } else if (data.status == 'e') {
          showToast("standards Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_section', function () {
    let req = {};
    $.ajax({
      url: '/section',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_section_changed', data.sections);
        } else if (data.status == 'e') {
          showToast("section Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  /*******************************************************************subjects start*****************************************************************/

  self.on('read_students', function (standard_id, section_id, fdt, tdt) {
    var obj = {};
    obj['standard_id'] = standard_id;
    obj['section_id'] = section_id;
    obj['fdt'] = fdt;
    obj['tdt'] = tdt;
    $.ajax({
      url: '/student-withdrawn-student/students',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_students_changed', data.students);
        } else if (data.status == 'e') {
          showToast("WithdrawnStudent Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_withdraw_student', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/student-withdrawn-student/csv_export_withdraw_student',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_withdraw_student_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('cancle_withdraw_students', function (student_id) {
    var obj = {};
    obj['student_id'] = student_id;
    $.ajax({
      url: '/student-withdrawn-student/cancle-withdraw-students/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {

          toastr.success("Sections assigned successfully ");
          self.trigger('cancle_withdraw_students_changed');
        } else if (data.status == 'e') {
          showToast("Error while free up students. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function SubjectStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.subjects = [];

  self.on('read_subject', function () {
    console.log('i am in suject api call from ajax');
    let req = {};
    $.ajax({
      url: '/subject/read_subject',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.subjects = data.subjects;
          self.trigger('read_subject_changed', data.subjects);
        } else if (data.status == 'e') {
          showToast(" Subject Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_Subject', function () {
    console.log('i am in csv_export_Subject api call from ajax');
    let req = {};
    $.ajax({
      url: '/subject/csv_export_Subject',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_subject_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {
        //showToast("", data)
      }
    });
  });

  self.on('delete_subject', function (id) {
    $.ajax({
      url: '/subject/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempSubjects = self.subjects.filter(c => {
            return c.subject_id != id;
          });
          self.subjects = tempSubjects;
          toastr.info("Subject Deleted Successfully");
          self.trigger('delete_subject_changed', self.subjects);
        } else if (data.status == 'e') {
          showToast("Error Deleting Subject. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_subject', function (subject_name, subject_short_name, department_id, id) {
    let req = {};
    req.subject_name = subject_name;
    req.subject_short_name = subject_short_name;
    req.department_id = department_id;
    req.id = id;
    $.ajax({
      url: '/subject/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.subjects = self.subjects.map(cat => {
            if (cat.subject_id == id) {
              cat.subject_id = id;
              cat.subject_name = subject_name;
              cat.subject_short_name = subject_short_name;
              cat.department_id = department_id;
            }
            // cat.confirmEdit = false
            return cat;
          });
          toastr.success("Subject Updated Successfully ");
          self.trigger('edit_subject_changed', self.subjects);
        } else if (data.status == 'e') {
          showToast("Error updating subjects. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_subject', function (subject_name, subject_short_name, department_id) {
    let req = {};
    req.subject_name = subject_name;
    req.subject_short_name = subject_short_name;
    req.department_id = department_id;
    $.ajax({
      url: '/subject/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add subject after');
          let obj = {};
          obj.subject_id = data.id;
          obj.subject_name = subject_name;
          obj.subject_short_name = subject_short_name;
          obj.department_id = department_id;
          self.subjects = [obj, ...self.subjects];
          toastr.success("Subject Inserserted Successfully ");
          self.trigger('add_subject_changed', self.subjects);
        } else if (data.status == 'e') {
          showToast("Invalid Username or password. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function TeacherTimeTableStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_init', function () {
    let req = {};
    $.ajax({
      url: '/teacher-time-table/read-init',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_init_changed', data.teachers, data.days, data.periods, data.standards, data.sections, data.subjects);
        } else if (data.status == 'e') {
          showToast("Teachers Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_edit_time_table', function (period_id, day_id) {
    let req = {};
    $.ajax({
      url: '/teacher-time-table/read-edit-time-table/' + period_id + '/' + day_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_edit_time_table_changed', data.rooms);
        } else if (data.status == 'e') {
          showToast("Rooms Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_periods', function (emp_id) {
    let req = {};
    $.ajax({
      url: '/teacher-time-table/read-periods/' + emp_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_periods_changed', data.time_table);
        } else if (data.status == 'e') {
          showToast("Periods Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('update_time_table', function (obj) {
    $.ajax({
      url: '/teacher-time-table/edit-time-table',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('update_time_table_changed');
        } else if (data.status == 'e') {
          showToast("Error updating time table. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_time_table', function (obj) {
    $.ajax({
      url: '/teacher-time-table/add-time-table',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('add_time_table_changed');
        } else if (data.status == 'e') {
          showToast("Error adding time table. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('delete_time_table', function (obj) {
    $.ajax({
      url: '/teacher-time-table/delete-time-table',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('delete_time_table_changed');
        } else if (data.status == 'e') {
          showToast("Error deleting time table. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function ThreesixtyDegreeViewStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_student', function (obj) {

    $.ajax({
      url: '/threesixty_degree_view/read_student/',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_student_changed', data.students);
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
  self.on('read_student_details', function (student_id) {
    console.log(student_id);
    let req = {};
    req.student_id = student_id;

    $.ajax({
      url: '/threesixty_degree_view/read_student_details/' + student_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_student_details_changed', data.student_details, getCookie('session_id'));
        } else if (data.status == 'e') {
          showToast("Student Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function TimeTableAdminStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_init_class_report', function () {
    let req = {};
    $.ajax({
      url: '/time-table-admin/read-init-class-report',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_init_class_report_changed', data.teachers, data.days, data.periods, data.rooms, data.standards, data.sections);
        } else if (data.status == 'e') {
          showToast("Teachers Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_periods_class_report', function (section_id) {
    let req = {};
    $.ajax({
      url: '/time-table-admin/read-periods-class-report/' + section_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_periods_class_report_changed', data.time_table, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Periods Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //Room Report

  self.on('read_init_room_report', function () {
    let req = {};
    $.ajax({
      url: '/time-table-admin/read-init-room-report',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_init_room_report_changed', data.teachers, data.days, data.periods, data.rooms, data.standards, data.sections);
        } else if (data.status == 'e') {
          showToast("Teachers Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_periods_room_report', function (room_id) {
    let req = {};
    $.ajax({
      url: '/time-table-admin/read-periods-room-report/' + room_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_periods_room_report_changed', data.time_table, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Periods Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  //Teacher Report

  self.on('read_init_teacher_report', function () {
    let req = {};
    $.ajax({
      url: '/time-table-admin/read-init-teacher-report',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_init_teacher_report_changed', data.teachers, data.days, data.periods, data.rooms, data.standards, data.sections);
        } else if (data.status == 'e') {
          showToast("Teachers Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_periods_teacher_report', function () {
    let req = {};
    $.ajax({
      url: '/time-table-admin/read-periods-teacher-report/',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_periods_teacher_report_changed', data.time_table, getCookie('session_name'));
        } else if (data.status == 'e') {
          showToast("Periods Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_init_assign_teacher', function () {
    let req = {};
    $.ajax({
      url: '/time-table-admin/read-init-assign-teacher',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_init_assign_teacher_changed', data.teachers);
        } else if (data.status == 'e') {
          showToast("Teachers Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('assign_teacher_time_table', function (teacher_one, teacher_two) {
    let req = {};
    req.teacher_one = teacher_one;
    req.teacher_two = teacher_two;
    $.ajax({
      url: '/time-table-admin/assign-teacher-time-table',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('assign_teacher_time_table_changed');
        } else if (data.status == 'e') {
          showToast("Error assigning teacher. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function TimeTableDaySettingsStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.days = [];

  self.on('read_day', function () {
    console.log('i am in read_level api call from ajax');
    let req = {};
    $.ajax({
      url: '/time-table-day-settings',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.days = data.days;
          self.trigger('day_changed', data.days);
        } else if (data.status == 'e') {
          showToast("level Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_day', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/time-table-day-settings/csv_export_day',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_day_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('delete_day', function (id) {
    $.ajax({
      url: '/time-table-day-settings/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempDay = self.days.filter(c => {
            return c.day_id != id;
          });
          self.days = tempDay;
          self.trigger('day_changed', self.days);
        } else if (data.status == 'e') {
          showToast("Error Deleting Day. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_day', function (day_name, id) {
    let req = {};
    req.day_name = day_name;
    req.day_id = id;
    $.ajax({
      url: '/time-table-day-settings/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.days = self.days.map(cat => {
            if (cat.day_id == id) {
              cat.day_name = day_name;
            }
            // cat.confirmEdit = false
            return cat;
          });
          self.trigger('day_changed', self.days);
        } else if (data.status == 'e') {
          showToast("Error updating Course. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_day', function (day_name) {
    let req = {};
    req.day_name = day_name;
    $.ajax({
      url: '/time-table-day-settings/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add day_name after');
          let obj = {};
          obj.day_id = data.id;
          obj.day_name = day_name;
          self.days = [obj, ...self.days];
          self.trigger('day_changed', self.days);
        } else if (data.status == 'e') {
          showToast("Error adding Days. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function TimeTablePeriodSettingsStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.periods = [];

  self.on('read_period', function () {
    console.log('i am in read_level api call from ajax');
    let req = {};
    $.ajax({
      url: '/time-table-period-settings',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.periods = data.periods;
          self.trigger('period_changed', data.periods);
        } else if (data.status == 'e') {
          showToast("level Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_period', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/time-table-period-settings/csv_export_period',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_period_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('delete_period', function (id) {
    $.ajax({
      url: '/time-table-period-settings/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempPeriod = self.periods.filter(c => {
            return c.period_id != id;
          });
          self.periods = tempPeriod;
          self.trigger('period_changed', self.periods);
        } else if (data.status == 'e') {
          showToast("Error Deleting Period. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_period', function (period_name, start_time, end_time, is_break, remarks, id) {
    let req = {};
    req.period_name = period_name;
    req.start_time = start_time;
    req.end_time = end_time;
    req.is_break = is_break;
    req.remarks = remarks;
    req.period_id = id;
    $.ajax({
      url: '/time-table-period-settings/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.periods = self.periods.map(cat => {
            if (cat.period_id == id) {
              cat.period_name = period_name;
              cat.start_time = start_time;
              cat.end_time = end_time;
              cat.is_break = is_break;
              cat.remarks = remarks;
            }
            // cat.confirmEdit = false
            return cat;
          });
          self.trigger('period_changed', self.periods);
        } else if (data.status == 'e') {
          showToast("Error updating Course. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_period', function (period_name, start_time, end_time, is_break, remarks) {
    let req = {};
    req.period_name = period_name;
    req.start_time = start_time;
    req.end_time = end_time;
    req.is_break = is_break;
    req.remarks = remarks;
    $.ajax({
      url: '/time-table-period-settings/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add period_name after');
          let obj = {};
          obj.period_id = data.id;
          obj.period_name = period_name;
          obj.start_time = start_time;
          obj.end_time = end_time;
          obj.is_break = is_break;
          obj.remarks = remarks;
          self.periods = [obj, ...self.periods];
          self.trigger('period_changed', self.periods);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function TimeTableReportStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_summary', function () {
    console.log('i am in read_level api call from ajax');
    let req = {};
    $.ajax({
      url: '/time-table-report',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('summary_changed', data.summaries);
        } else if (data.status == 'e') {
          showToast("Summary Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_detail', function () {
    console.log('i am in read_level api call from ajax');
    let req = {};
    $.ajax({
      url: '/time-table-report/details',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('detail_changed', data.details);
        } else if (data.status == 'e') {
          showToast("Details Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function TimeTableRoomSettingsStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.rooms = [];

  self.on('read_room', function () {
    console.log('i am in read_level api call from ajax');
    let req = {};
    $.ajax({
      url: '/time-table-room-settings',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.rooms = data.rooms;
          self.trigger('room_changed', data.rooms);
        } else if (data.status == 'e') {
          showToast("level Read Error. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('csv_export_room', function (obj) {
    let req = {};
    req.data = obj;
    $.ajax({
      url: '/time-table-room-settings/csv_export_room',
      contentType: "application/json",
      dataType: "json",
      type: 'POST',
      data: JSON.stringify(req),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('csv_export_room_changed', data.url);
        } else if (data.status == 'e') {}
      },
      error: function (data) {}
    });
  });

  self.on('delete_room', function (id) {
    $.ajax({
      url: '/time-table-room-settings/delete/' + id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          let tempRoom = self.rooms.filter(c => {
            return c.room_name != id;
          });
          self.rooms = tempRoom;
          self.trigger('room_changed', self.rooms);
        } else if (data.status == 'e') {
          showToast("Error Deleting Level. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('edit_room', function (room_name, room_details, id) {
    let req = {};
    req.room_name = room_name;
    req.room_details = room_details;
    req.id = id;
    $.ajax({
      url: '/time-table-room-settings/edit/' + id,
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        if (data.status == 's') {
          self.rooms = self.rooms.map(cat => {
            if (cat.room_name == id) {
              cat.room_name = room_name;
              cat.room_details = room_details;
            }
            // cat.confirmEdit = false
            return cat;
          });
          self.trigger('room_changed', self.rooms);
        } else if (data.status == 'e') {
          showToast("Error updating Course. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('add_room', function (room_name, room_details) {
    let req = {};
    req.room_name = room_name;
    req.room_details = room_details;
    $.ajax({
      url: '/time-table-room-settings/add',
      type: "POST",
      data: JSON.stringify(req),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          console.log('add room_name after');
          let obj = {};
          //obj.level_id = data.level_id
          obj.room_name = room_name;
          obj.room_details = room_details;
          self.rooms = [obj, ...self.rooms];
          self.trigger('room_changed', self.rooms);
        } else if (data.status == 'e') {
          showToast("Error adding Designation. Please try again.", data);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
function TimeTableSubstitutaionStore() {
  riot.observable(this); // Riot provides our event emitter.
  var self = this;

  self.on('read_init', function () {
    let req = {};
    $.ajax({
      url: '/time-table-substitutation/read-init',
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_init_changed', data.teachers, data.days, data.periods, data.rooms);
          // self.trigger('read_init_changed', data.teachers,data.days,data.periods,data.standards,data.sections,data.subjects)
        } else if (data.status == 'e') {
          showToast("Teachers Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_periods', function (emp_id) {
    let req = {};
    $.ajax({
      url: '/time-table-substitutation/read-periods/' + emp_id,
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_periods_changed', data.time_table);
        } else if (data.status == 'e') {
          showToast("Periods Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('read_edit_time_table', function (obj) {
    $.ajax({
      url: '/time-table-substitutation/read-edit-time-table/',
      contentType: "application/json",
      dataType: "json",
      type: "POST",
      data: JSON.stringify(obj),
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('read_edit_time_table_changed', data.teacher_peiods);
        } else if (data.status == 'e') {
          showToast("Free Periods Read Error. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('reset_time_table', function (obj) {
    $.ajax({
      url: '/time-table-substitutation/reset-time-table',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('reset_time_table_changed');
        } else if (data.status == 'e') {
          showToast("Error resetting time table. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });

  self.on('update_time_table', function (obj) {
    $.ajax({
      url: '/time-table-substitutation/edit-time-table',
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      dataType: "json",
      headers: { "Authorization": getCookie('token') },
      success: function (data) {
        console.log(data);
        if (data.status == 's') {
          self.trigger('update_time_table_changed');
        } else if (data.status == 'e') {
          showToast("Error updating time table. Please try again.", data.messaage);
        }
      },
      error: function (data) {
        showToast("", data);
      }
    });
  });
}
