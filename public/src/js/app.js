var showToast = (msg, data) => {
  if(msg == "" || !msg){
    msg = "Something went wrong";
  }
  toastr.error(msg + data);
  console.log("[ERROR:]");
  console.log(data);
}

var convertDate = (inputDate) => {//inputDate(d/m/Y) => output(Y-m-d)
  console.log('converting date format');
  if(inputDate == "" || !inputDate){
    inputDate = "";
  }else{
    var d = inputDate.split("/");
    console.log(d[2]+'-'+d[1]+'-'+d[0]);
    return d[2]+'-'+d[1]+'-'+d[0];
  }
}

function getCookie(c_name)
{
   var i,x,y,ARRcookies=document.cookie.split(";");
   for (i=0; i<ARRcookies.length; i++)
   {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name)
      {
        return unescape(y);
      }
   }
}

var loginStore = new LoginStore() 
RiotControl.addStore(loginStore) 

var examSchemeStore = new ExamSchemeStore() 
RiotControl.addStore(examSchemeStore) 

var gradeStore = new GradeStore() 
RiotControl.addStore(gradeStore) 

var marksManagerStore = new MarksManagerStore() 
RiotControl.addStore(marksManagerStore) 

var marksEntryStore = new MarksEntryStore()
RiotControl.addStore(marksEntryStore)

var marksReportStore = new MarksReportStore() 
RiotControl.addStore(marksReportStore)

var maturityDevelopmentStore = new MaturityDevelopmentStore() 
RiotControl.addStore(maturityDevelopmentStore)

var resultActivationStore = new ResultActivationStore() 
RiotControl.addStore(resultActivationStore)

var physicalFitnessStore = new PhysicalFitnessStore() 
RiotControl.addStore(physicalFitnessStore)

var examSubjectGroupMapStore = new ExamSubjectGroupMapStore() 
RiotControl.addStore(examSubjectGroupMapStore)

//student
var studentAssignHouseStore = new StudentAssignHouseStore() 
RiotControl.addStore(studentAssignHouseStore)

var studentStudentGroupStore = new StudentStudentGroupStore() 
RiotControl.addStore(studentStudentGroupStore)

var studentAssignSubjectStore = new StudentAssignSubjectStore() 
RiotControl.addStore(studentAssignSubjectStore)

var studentWithdrawnStudentStore = new StudentWithdrawnStudentStore() 
RiotControl.addStore(studentWithdrawnStudentStore)

var studentAssignSectionStore = new StudentAssignSectionStore() 
RiotControl.addStore(studentAssignSectionStore)

var studentLoginSlipStore = new StudentLoginSlipStore() 
RiotControl.addStore(studentLoginSlipStore)

var studentSchoolLeavingStore = new StudentSchoolLeavingStore() 
RiotControl.addStore(studentSchoolLeavingStore)

var studentResultActivationStore = new StudentResultActivationStore() 
RiotControl.addStore(studentResultActivationStore)


//****************************************************ghulam
var sessionStore = new SessionStore() 
RiotControl.addStore(sessionStore)

var bankStore = new BankStore() 
RiotControl.addStore(bankStore)

var fineStore = new FineStore() 
RiotControl.addStore(fineStore) 

var feeHeadStore = new FeeHeadStore() 
RiotControl.addStore(feeHeadStore)

var feePlanStore = new FeePlanStore() 
RiotControl.addStore(feePlanStore)

var applyPlanStore = new ApplyPlanStore() 
RiotControl.addStore(applyPlanStore)

var feeSlipStore = new FeeSlipStore() 
RiotControl.addStore(feeSlipStore)

var scholarshipStore = new ScholarshipStore() 
RiotControl.addStore(scholarshipStore)

var feeReceivedStore = new FeeReceivedStore() 
RiotControl.addStore(feeReceivedStore) 

var feesReportStore = new FeesReportStore() 
RiotControl.addStore(feesReportStore)



//bodhi
var activityitemStore = new ActivityItemStore() 
RiotControl.addStore(activityitemStore)

var activitycategoryStore = new ActivityCategoryStore() 
RiotControl.addStore(activitycategoryStore) 

var activityeventStore = new ActivityEventStore() 
RiotControl.addStore(activityeventStore)

var activityStore = new ActivityStore() 
RiotControl.addStore(activityStore)

var classTeacherStore = new ClassTeacherStore() 
RiotControl.addStore(classTeacherStore)

var mentorcategoryStore = new MentorCategoryStore() 
RiotControl.addStore(mentorcategoryStore)

var mentorcaseStore = new MentorCaseStore() 
RiotControl.addStore(mentorcaseStore)

var mentordetailStore = new MentorDetailStore() 
RiotControl.addStore(mentordetailStore)

var mentorReportStore = new MentorReportStore() 
RiotControl.addStore(mentorReportStore)

var disciplinecategoryStore = new DisciplineCategoryStore() 
RiotControl.addStore(disciplinecategoryStore)

var disciplinecaseStore = new DisciplineCaseStore() 
RiotControl.addStore(disciplinecaseStore)

var disciplinedetailStore = new DisciplineDetailStore() 
RiotControl.addStore(disciplinedetailStore)

var disciplineReportStore = new DisciplineReportStore() 
RiotControl.addStore(disciplineReportStore)

var activityReportStore = new ActivityReportStore() 
RiotControl.addStore(activityReportStore)

var studentStore = new StudentStore() 
RiotControl.addStore(studentStore)

var studentinfoupdateStore = new StudentInfoUpdateStore() 
RiotControl.addStore(studentinfoupdateStore)

var employeeNotificationStore = new EmployeeNotificationStore()
RiotControl.addStore(employeeNotificationStore)

var studentNotificationStore = new StudentNotificationStore()
RiotControl.addStore(studentNotificationStore)

var idSignatureStore = new IdSignatureStore()
RiotControl.addStore(idSignatureStore)

var idCardStore = new IdCardStore()
RiotControl.addStore(idCardStore)

//tarique
var roleStore = new RoleStore() 
RiotControl.addStore(roleStore) 

var itemStore = new ItemStore() 
RiotControl.addStore(itemStore)

var employeeTypeStore = new employeeTypeStore() 
RiotControl.addStore(employeeTypeStore)

var designationStore = new DesignationStore() 
RiotControl.addStore(designationStore)

var levelStore = new LevelStore() 
RiotControl.addStore(levelStore) 

var countryStore = new CountryStore() 
RiotControl.addStore(countryStore) 

var subjectStore = new SubjectStore() 
RiotControl.addStore(subjectStore) 

var cityStore = new CityStore() 
RiotControl.addStore(cityStore) 

var stateStore = new StateStore() 
RiotControl.addStore(stateStore) 

var religionStore = new ReligionStore() 
RiotControl.addStore(religionStore) 

var areaStore = new AreaStore() 
RiotControl.addStore(areaStore) 

var standardStore = new StandardStore() 
RiotControl.addStore(standardStore) ;

var sectionStore = new SectionStore() 
RiotControl.addStore(sectionStore) ;

var clubStore = new ClubStore() 
RiotControl.addStore(clubStore) ;

var parentgroupStore = new ParentGroupStore() 
RiotControl.addStore(parentgroupStore) ;

var remarkStore = new RemarkStore() 
RiotControl.addStore(remarkStore) ;

var inventorydepartmentStore = new InventoryDepartmentStore() 
RiotControl.addStore(inventorydepartmentStore) ;

var departmentStore = new DepartmentStore() 
RiotControl.addStore(departmentStore) ;

var employmentStatusStore = new EmploymentStatusStore() 
RiotControl.addStore(employmentStatusStore) 

var employeeRoleStore = new EmployeeRoleStore() 
RiotControl.addStore(employeeRoleStore)

var eventTypeStore = new EventTypeStore() 
RiotControl.addStore(eventTypeStore)  

var neweventStore = new NewEventStore() 
RiotControl.addStore(neweventStore) 

var classholidayStore = new ClassHolidayStore() 
RiotControl.addStore(classholidayStore)  

var categoryStore = new CategoryStore() 
RiotControl.addStore(categoryStore)

var infirmarycategoryStore = new InfirmaryCategoryStore() 
RiotControl.addStore(infirmarycategoryStore)

var studentinfirmaryStore = new StudentInfirmaryStore() 
RiotControl.addStore(studentinfirmaryStore) 

var staffinfirmaryStore = new StaffInfirmaryStore() 
RiotControl.addStore(staffinfirmaryStore) 

var staffbpweightStore = new StaffBPWeightStore() 
RiotControl.addStore(staffbpweightStore) 

var infirmarycaseStore = new InfirmaryCaseStore() 
RiotControl.addStore(infirmarycaseStore) 

var eventStore = new EventStore() 
RiotControl.addStore(eventStore)

var inventoryRackStore = new InventoryRackStore() 
RiotControl.addStore(inventoryRackStore)

var inventoryUnitStore = new InventoryUnitStore() 
RiotControl.addStore(inventoryUnitStore)

var inventoryCategoryStore  = new InventoryCategoryStore() 
RiotControl.addStore(inventoryCategoryStore)

var inventorySubcategoryStore  = new InventorySubCategoryStore() 
RiotControl.addStore(inventorySubcategoryStore)

var inventoryItemStore  = new InventoryItemStore() 
RiotControl.addStore(inventoryItemStore)

var inventoryStockStore  = new InventoryStockStore() 
RiotControl.addStore(inventoryStockStore)

var inventoryIssueStore  = new InventoryIssueStore() 
RiotControl.addStore(inventoryIssueStore)

var inventorySaleStore  = new InventorySaleStore() 
RiotControl.addStore(inventorySaleStore)

var inventoryReportStore  = new InventoryReportStore() 
RiotControl.addStore(inventoryReportStore)

var staffStore  = new StaffStore() 
RiotControl.addStore(staffStore)

var studentSearchStore  = new StudentSearchStore() 
RiotControl.addStore(studentSearchStore)

var birthDayStore  = new BirthDayStore() 
RiotControl.addStore(birthDayStore)

var attendanceStore  = new AttendanceStore() 
RiotControl.addStore(attendanceStore)

var adminReportStore  = new AdminReportStore() 
RiotControl.addStore(adminReportStore)


var currentPage = null;

let goTo = (path1, path2, path3) => {
  riot.mount('main-nav', {selected_nav_item: path1});
  if (currentPage) {
    currentPage.unmount(true);
  }
  switch(path1) {
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
      currentPage = riot.mount('div#view', 'marks-report', {selected_marks_report: path2})[0];
      switch(path2){
        case 'consolidate-tabulation-sheet':
          riot.mount("div#marks-report-view", 'consolidate-tabulation-sheet')
        break;
        case 'merit-list':
          riot.mount("div#marks-report-view", 'merit-list')
        break;
        case 'top-five':
          riot.mount("div#marks-report-view", 'top-five')
        break;
        case 'first-assessment-report-card':
          riot.mount("div#marks-report-view", 'first-assessment-report-card')
        break;
        case 'final-assessment-report-card':
          riot.mount("div#marks-report-view", 'final-assessment-report-card')
        break;
        default:
          riot.mount("div#marks-report-view", 'consolidate-tabulation-sheet')
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
        currentPage = riot.mount('div#view', 'receive-fees', {selected_master: path1})[0];
         switch(path2){
          case 'receive-fees':
            riot.mount("div#setting-view", 'receive-fees')
          break;
        }
    break;
    
    case 'fee-bill':
      currentPage = riot.mount('div#view', 'bill', {selected_master: path2})[0];
      console.log("currentPage = ")
      console.log(currentPage)
      switch(path2){
        case 'fee-head':
          riot.mount("div#bill-view", 'fee-head')
        break;
        case 'fee-slip':
          riot.mount("div#bill-view", 'fee-slip')
        break;
        case 'fee-plan':
          riot.mount("div#bill-view", 'fee-plan')
        break;
        case 'apply-fee-plan':
          riot.mount("div#bill-view", 'apply-fee-plan')
        break;
        case 'copy-fee-plan':
          riot.mount("div#bill-view", 'copy-fee-plan')
        break;
        default:
          riot.mount("div#bill-view", 'fee-head')
      }
    break;
    case 'fees-report':
      currentPage = riot.mount('div#view', 'fees-report', {selected_master: path2})[0];
      console.log("currentPage = ")
      console.log(currentPage)
      switch(path2){
        case 'month-wise':
          riot.mount("div#fees-report-view", 'month-wise')
        break;
        case 'daily-collection':
          riot.mount("div#fees-report-view", 'daily-collection')
        break;
        case 'daily-register':
          riot.mount("div#fees-report-view", 'daily-register')
        break;
        case 'bank-wise':
          riot.mount("div#fees-report-view", 'bank-wise')
        break;
        case 'date-wise':
          riot.mount("div#fees-report-view", 'date-wise')
        break;
        case 'head-wise-summary':
          riot.mount("div#fees-report-view", 'head-wise-summary')
        break;
        case 'head-wise':
          riot.mount("div#fees-report-view", 'head-wise')
        break;
        case 'outstanding-fees':
          riot.mount("div#fees-report-view", 'outstanding-fees')
        break;
        case 'outstanding-fees-class':
          riot.mount("div#fees-report-view", 'outstanding-fees-class')
        break;
        case 'due-by-class':
          riot.mount("div#fees-report-view", 'due-by-class')
        break;
        case 'fees-collection-summary':
          riot.mount("div#fees-report-view", 'fees-collection-summary')
        break;
        case 'fees-collection-summary':
          riot.mount("div#fees-report-view", 'fees-collection-summary')
        break;
        case 'estimated-fees':
          riot.mount("div#fees-report-view", 'estimated-fees')
        break;
        case 'advance-by-class':
          riot.mount("div#fees-report-view", 'advance-by-class')
        break;
        case 'advance-fees':
          riot.mount("div#fees-report-view", 'advance-fees')
        break;
        case 'scholarship-list':
          riot.mount("div#fees-report-view", 'scholarship-list')
        break;
        case 'issued-letter':
          riot.mount("div#fees-report-view", 'issued-letter')
        break;
        case 'fees-scheme-report':
          riot.mount("div#fees-report-view", 'fees-scheme-report')
        break;
        case 'fees-scheme-assigned':
          riot.mount("div#fees-report-view", 'fees-scheme-assigned')
        break;
        case 'fees-scheme-unassigned':
          riot.mount("div#fees-report-view", 'fees-scheme-unassigned')
        break;
        default:
          riot.mount("div#fees-report-view", 'month-wise')
      }
    break;



    case 'scholarship':
        currentPage = riot.mount('div#view', 'scholarship', {selected_master: path1})[0];
         switch(path2){
          case 'scholarship':
            riot.mount("div#setting-view", 'scholarship')
          break;
        }
    break;

    case 'fees-setting':
      currentPage = riot.mount('div#view', 'fees-setting', {selected_master: path2})[0];
      switch(path2){
        case 'fine-setting':
          riot.mount("div#setting-view", 'fine-setting')
        break;
        case 'bank-account-setting':
          riot.mount("div#setting-view", 'bank-account-setting')
        break;
        case 'session-setting':
          riot.mount("div#setting-view", 'session-setting')
        break;
        default:
          riot.mount("div#setting-view", 'fine-setting')
      }
    break;
    /*==============qadir end ======*/
    case 'activity-detail':
      currentPage = riot.mount('div#view', 'activity-detail')[0];
    break;
    case 'activity-setting':
      currentPage = riot.mount('div#view', 'activity-setting', {selected_master: path2})[0];
      switch(path2){
        case 'activity-item':
          riot.mount("div#activity-setting-view", 'activity-item')
        break;
        case 'activity-event':
          riot.mount("div#activity-setting-view", 'activity-event')
        break;
        case 'activity-category':
          riot.mount("div#activity-setting-view", 'activity-category')
        break;
        default:
          riot.mount("div#activity-setting-view", 'activity-item')
      }
    break;
    case 'activity-report':
     currentPage = riot.mount('div#view', 'activity-report', {selected_master: path2})[0];
     switch(path2){
       case 'activity-date-wise-report':
         riot.mount("div#activity-report-view", 'activity-date-wise-report')
       break;
       case 'activity-session-wise-report':
         riot.mount("div#activity-report-view", 'activity-session-wise-report')
       break;
       case 'activity-event-wise-report':
         riot.mount("div#activity-report-view", 'activity-event-wise-report')
       break;
       case 'activity-student-event-report':
         riot.mount("div#activity-report-view", 'activity-student-event-report')
       break;
       case 'activity-event-wise-graph-report':
         riot.mount("div#activity-report-view", 'activity-event-wise-graph-report')
       break;
       default:
         riot.mount("div#activity-report-view", 'activity-date-wise-report')
     }
    break;
    case 'employee-notification':
     currentPage = riot.mount('div#view', 'employee-notification')[0];
    break;
    case 'student-notification':
     currentPage = riot.mount('div#view', 'student-notification')[0];
    break;
    case 'mentor-detail':
      currentPage = riot.mount('div#view', 'mentor-detail')[0];
    break;
    case 'mentor-setting':
      currentPage = riot.mount('div#view', 'mentor-setting', {selected_master: path2})[0];
      switch(path2){
        case 'mentor-category':
          riot.mount("div#mentor-setting-view", 'mentor-category')
        break;
        case 'mentor-case':
          riot.mount("div#mentor-setting-view", 'mentor-case')
        break;
        default:
          riot.mount("div#mentor-setting-view", 'mentor-category')
      }
    break;
    case 'mentor-report':
      currentPage = riot.mount('div#view', 'mentor-report', {selected_master: path2})[0];
      switch(path2){
        case 'mentor-case-wise-report':
          riot.mount("div#mentor-report-view", 'mentor-case-wise-report')
        break;
        case 'mentor-class-wise-report':
          riot.mount("div#mentor-report-view", 'mentor-class-wise-report')
        break;
        case 'mentor-date-wise-case-report':
          riot.mount("div#mentor-report-view", 'mentor-date-wise-case-report')
        break;
        default:
          riot.mount("div#mentor-report-view", 'mentor-case-wise-report')
      }
    break;
    case 'discipline-detail':
      currentPage = riot.mount('div#view', 'discipline-detail')[0];
    break;
    case 'student':
      currentPage = riot.mount('div#view', 'student')[0];
    break;
    case 'discipline-setting':
      currentPage = riot.mount('div#view', 'discipline-setting', {selected_master: path2})[0];
      switch(path2){
        case 'discipline-category':
          riot.mount("div#discipline-setting-view", 'discipline-category')
        break;
        case 'discipline-case':
          riot.mount("div#discipline-setting-view", 'discipline-case')
        break;
        default:
          riot.mount("div#discipline-setting-view", 'discipline-category')
      }
    break;
    case 'discipline-report':
      currentPage = riot.mount('div#view', 'discipline-report', {selected_master: path2})[0];
      switch(path2){
        case 'discipline-case-wise-report':
          riot.mount("div#discipline-report-view", 'discipline-case-wise-report')
        break;
        case 'discipline-class-wise-report':
          riot.mount("div#discipline-report-view", 'discipline-class-wise-report')
        break;
        case 'discipline-date-wise-case-report':
          riot.mount("div#discipline-report-view", 'discipline-date-wise-case-report')
        break;
        default:
          riot.mount("div#discipline-report-view", 'discipline-case-wise-report')
      }
    break;
    //tarique
    case 'staff':
          riot.mount("div#view", 'staff')
    break;
    case 'ex-staff':
          riot.mount("div#view", 'ex-staff')
    break;
    case 'browse-staff':
          riot.mount("div#view", 'browse-staff')
    break;
    case 'student-search':
          riot.mount("div#view", 'student-search')
    break;
    case 'student-browser':
          riot.mount("div#view", 'student-browser')
    break;
    case 'occupation-report':
          riot.mount("div#view", 'occupation-report')
    break;
    case 'birthday':
          riot.mount("div#view", 'birthday')
    break;
    case 'attendance-entry':
          riot.mount("div#view", 'attendance-entry')
    break;
    case 'daily-attendance':
          riot.mount("div#view", 'daily-attendance')
    break;
    case 'admin-report':
      currentPage = riot.mount('div#view', 'admin-report', {selected_admin_report: path2})[0];
      switch(path2){
        case 'student-summary-report':
          riot.mount("div#admin-report-view", 'student-summary-report')
        break;
        case 'student-strength-report':
          riot.mount("div#admin-report-view", 'student-strength-report')
        break;
        case 'student-category-summary-report':
          riot.mount("div#admin-report-view", 'student-category-summary-report')
        break;
        case 'student-category-strength-report':
          riot.mount("div#admin-report-view", 'student-category-strength-report')
        break;
        case 'student-religion-strength-report':
          riot.mount("div#admin-report-view", 'student-religion-strength-report')
        break;
        case 'student-group-report':
          riot.mount("div#admin-report-view", 'student-group-report')
        break;
        case 'student-house-report':
          riot.mount("div#admin-report-view", 'student-house-report')
        break;
        case 'student-class-teacher-report':
          riot.mount("div#admin-report-view", 'student-class-teacher-report')
        break;
        case 'new-admission-report':
          currentPage = riot.mount('div#admin-report-view', 'new-admission-report', {selected_new_admission_report: path3})[0];
          switch(path3){

            case 'new-admission-category-report':
              riot.mount("div#new-admission-report-view", 'new-admission-category-report')
            break;
            case 'new-admission-list-report':
              riot.mount("div#new-admission-report-view", 'new-admission-list-report')
            break;
            default:
              riot.mount("div#new-admission-report-view", 'new-admission-category-report')

          }
        break;
        default:
          riot.mount("div#admin-report-view", 'student-summary-report')
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
      currentPage = riot.mount('div#view', 'setting', {selected_master: path2})[0];
      switch(path2){
        case 'item':
          riot.mount("div#setting-view", 'item')
        break;
        case 'event':
          riot.mount("div#setting-view", 'event')
        break;
        case 'category':
          riot.mount("div#setting-view", 'category')
        break;
        default:
          riot.mount("div#setting-view", 'item')
        }
    break;
    case 'inventory-report':
      currentPage = riot.mount('div#view', 'inventory-report', {selected_inventory_report: path2})[0];
      switch(path2){
        case 'inventory-received-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-received-goods-report')
        break;
        case 'inventory-issued-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-issued-goods-report')
        break;
        case 'inventory-person-wise-issued-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-person-wise-issued-goods-report')
        break;
        case 'inventory-item-wise-issued-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-item-wise-issued-goods-report')
        break;
        case 'inventory-sales-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-sales-goods-report')
        break;
        case 'inventory-return-goods-report':
          riot.mount("div#inventory-report-view", 'inventory-return-goods-report')
        break;
        default:
          riot.mount("div#inventory-report-view", 'inventory-received-goods-report')
        }
    break;

    case 'infirmary-setting':
      currentPage = riot.mount('div#view', 'infirmary-setting', {selected_master: path2})[0];
      switch(path2){
        case 'infirmary-category':
          riot.mount("div#infirmary-setting-view", 'infirmary-category')
        break;
        case 'infirmary-case':
          riot.mount("div#infirmary-setting-view", 'infirmary-case')
        break;
        default:
          riot.mount("div#infirmary-setting-view", 'infirmary-case')
      } 
    break;
    case 'inventory-setting':
      currentPage = riot.mount('div#view', 'inventory-setting', {selected_master: path2})[0];
      switch(path2){
        case 'inventory-rack':
          riot.mount("div#inventory-setting-view", 'inventory-rack')
        break;
        case 'inventory-unit':
          riot.mount("div#inventory-setting-view", 'inventory-unit')
        break;
         case 'inventory-subcategory':
          riot.mount("div#inventory-setting-view", 'inventory-subcategory')
        break;
         case 'inventory-category':
          riot.mount("div#inventory-setting-view", 'inventory-category')
        break;
         case 'inventory-item':
          riot.mount("div#inventory-setting-view", 'inventory-item')
        break;
        default:
          riot.mount("div#inventory-setting-view", 'inventory-rack')
      } 
      break;  
     case 'master':
      currentPage = riot.mount('div#view', 'master', {selected_master: path2})[0];
      switch(path2){
        case 'employee-type':
          riot.mount("div#master-view", 'employee-type')
        break;
        case 'designation':
          riot.mount("div#master-view", 'designations')
        break;
        case 'department':
          riot.mount("div#master-view", 'department')
        break;
        case 'level':
          riot.mount("div#master-view", 'level')
        break;
        case 'employment-status':
          riot.mount("div#master-view", 'employment-status')
        break;
        case 'role':
          riot.mount("div#master-view", 'role')
        break;
        case 'category':
          riot.mount("div#master-view", 'category')
        break;
        case 'subject':
          riot.mount("div#master-view", 'subject')
        break;
         case 'class-teacher-master':
          riot.mount("div#master-view", 'class-teacher-master')
        break;
        case 'country':
          riot.mount("div#master-view", 'country')
        break;
        case 'city':
          riot.mount("div#master-view", 'city')
        break;
        case 'state':
          riot.mount("div#master-view", 'state')
        break;
        case 'religion':
          riot.mount("div#master-view", 'religion')
        break;
        case 'area':
          riot.mount("div#master-view", 'area')
        break;
        case 'standard':
          riot.mount("div#master-view", 'standard')
        break;
        case 'section-master':
          riot.mount("div#master-view", 'section-master')
        break;
        case 'club':
          riot.mount("div#master-view", 'club')
        break;
        case 'parentgroup':
          riot.mount("div#master-view", 'parentgroup')
        break;
        case 'remark':
          riot.mount("div#master-view", 'remark')
        break;
        case 'inventory-department':
          riot.mount("div#master-view", 'inventory-department')
        break;
        case 'event-master':
          currentPage = riot.mount('div#master-view', 'event-master', {selected_event_master: path3})[0];
          switch(path3){
            case 'event-type':
              riot.mount("div#event-master-view", 'event-type')
            break;
            case 'new-event':
              riot.mount("div#event-master-view", 'new-event')
            break;
              case 'class-holiday':
              riot.mount("div#event-master-view", 'class-holiday')
            break;
            default:
              riot.mount("div#event-master-view", 'event-type')

          }
        break;
        default:
          riot.mount("div#master-view", 'employee-type')
      }
    break;

    case 'infirmary':
      currentPage = riot.mount('div#view', 'infirmary', {selected_master: path2})[0];
      switch(path2){
        case 'infirmary-student':
          riot.mount("div#infirmary-view", 'infirmary-student')
        break;
        case 'student-report':
          riot.mount("div#infirmary-view", 'infirmary-student')
        break;
        case 'infirmary-staff':
          riot.mount("div#infirmary-view", 'infirmary-staff')
        break;
         case 'infirmary-staff-bp-weight':
          riot.mount("div#infirmary-view", 'infirmary-staff-bp-weight')
         break; 
        case 'infirmary-student-report':
          currentPage = riot.mount('div#infirmary-view', 'infirmary-student-report', {selected_infirmary_student_report: path3})[0];
          switch(path3){
            case 'infirmary-date-wise-case-report':
              riot.mount("div#infirmary-student-report-view", 'infirmary-date-wise-case-report')
              console.log("inside main")
            break;
            case 'class-wise-report':
              riot.mount("div#infirmary-student-report-view", 'class-wise-report')
            break;
              case 'case-wise-report':
              riot.mount("div#infirmary-student-report-view", 'case-wise-report')
            break;
            default:
              riot.mount("div#infirmary-student-report-view", 'infirmary-date-wise-case-report')

          }
        
        break;

        // infirmary staff report
        case 'infirmary-staff-report':
          currentPage = riot.mount('div#infirmary-view', 'infirmary-staff-report', {selected_infirmary_staff_report: path3})[0];
          switch(path3){
            case 'infirmary-staff-date-wise-case-report':
              riot.mount("div#infirmary-staff-report-view", 'infirmary-staff-date-wise-case-report')
              console.log("inside main")
            break;
            case 'infirmary-staff-monthly-report':
              riot.mount("div#infirmary-staff-report-view", 'infirmary-staff-monthly-report')
            break;
              case 'infirmary-staff-health-card-report':
              riot.mount("div#infirmary-staff-report-view", 'infirmary-staff-health-card-report')
            break;
            default:
              riot.mount("div#infirmary-staff-report-view", 'infirmary-staff-date-wise-case-report')

          }
        break;
        // infirmary staff report
        case 'infirmary-staff-bp-weight-report':
          currentPage = riot.mount('div#infirmary-view', 'infirmary-staff-bp-weight-report', {selected_infirmary_staff_bp_weight_report: path3})[0];
          switch(path3){
           // console.log("inside3");
            case 'infirmary-staff-wise-report':
              riot.mount("div#infirmary-staff-bp-weight-report-view", 'infirmary-staff-wise-report')
             // console.log("inside bp");
            break;
            case 'infirmary-staff-monthly-report':
              riot.mount("div#infirmary-staff-bp-weight-report-view", 'infirmary-staff-monthly-report')
            break;
              case 'infirmary-staff-health-card-report':
              riot.mount("div#infirmary-staff-bp-weight-report-view", 'infirmary-staff-health-card-report')
            break;
            default:
              riot.mount("div#infirmary-staff-bp-weight-report-view", 'infirmary-staff-wise-report')

          }
        break;
        default:
        console.log("inside default")
          riot.mount("div#infirmary-view", 'infirmary-student')
      }
      break;
    default:
      currentPage = riot.mount('div#view', 'master/employee-type')[0];
  }
}


route.stop()
route.start(true)
route(goTo);

// riot.route.stop()
// riot.route.start(true)
// riot.route(goTo);