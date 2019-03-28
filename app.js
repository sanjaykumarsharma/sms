var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection  = require('express-myconnection'); 
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
//var compression  = require('compression')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var examSchemeRouter = require('./routes/exam-scheme');
var gradeRouter = require('./routes/grade');
var marksManagerRouter = require('./routes/marks-manager');
var marksEntryRouter = require('./routes/marks-entry');
var marksReportRouter = require('./routes/marks-report');
var maturityDevelopmentReportRouter = require('./routes/maturity-development');
var resultActivationReportRouter = require('./routes/result-activation');
var physicalFitnessReportRouter = require('./routes/physical-fitness');
var subjectGroupMapReportRouter = require('./routes/exam-subject-group-map');
var studentAssignHouseRouter = require('./routes/student-assign-house');
var studentGroupStudentRouter = require('./routes/student-group-student');
var studentAssignSubjectRouter = require('./routes/student-assign-subject');
var studentWithdrawnStudentRouter = require('./routes/student-withdrawn-student');
var teacherTimeTableRouter = require('./routes/teacher-time-table');
var timeTableSubstitutaionRouter = require('./routes/time-table-substitutation');
var timeTableAdminRouter = require('./routes/time-table-admin');
var timeTableRoomSettingsRouter = require('./routes/time-table-room-settings');
var timeTablePeriodSettingsRouter = require('./routes/time-table-period-settings');
var timeTableDaySettingsRouter = require('./routes/time-table-day-settings');
var timeTableReportRouter = require('./routes/time-table-report');
var firstAssessmentReportRouter = require('./routes/first_assessment_report');
var finalAssessmentReportRouter = require('./routes/final_assessment_report');
//======== qadir ==================

var promoteRouter = require('./routes/promote');
var studentAssignSectionRouter = require('./routes/student-assign-section');
var studentLoginSlipRouter = require('./routes/student-login-slip');
var studentSchoolLeavingRouter = require('./routes/student-school-leaving');
var studentResultActivationRouter = require('./routes/student-result-activation');


//Bodhi
var rolesRouter = require('./routes/roles');
var coursesRouter = require('./routes/courses');
var activityitemRouter = require('./routes/activity_item');
var activitycategoryRouter = require('./routes/activity_category');
var activityeventRouter = require('./routes/activity_event');
var activityRouter = require('./routes/activity_detail');
var classteacherRouter = require('./routes/classteacher');
var mentorCategoryRouter = require('./routes/mentor_category');
var mentorCaseRouter = require('./routes/mentor_case');
var mentorDetailRouter = require('./routes/mentor_detail');
var mentorReportRouter = require('./routes/mentor_report');
var disciplineCategoryRouter = require('./routes/discipline_category');
var disciplineCaseRouter = require('./routes/discipline_case');
var disciplineDetailRouter = require('./routes/discipline_detail');
var disciplineReportRouter = require('./routes/discipline_report');
var studentRouter = require('./routes/student');
var studentInfoUpdateRouter = require('./routes/student_info_update');
var smsRouter = require('./routes/sms');
var emailRouter = require('./routes/email');
var studentnotificationRouter = require('./routes/student-notification');
var employeenotificationRouter = require('./routes/employee-notification');
var idsignatureRouter = require('./routes/id_signature');
var idcardRouter = require('./routes/id_card');
var activityReport = require('./routes/activity_report');
var Career = require('./routes/career');
var Alumni = require('./routes/alumni');
var AssessmentReport = require('./routes/assessment_report');
var YearlySectionWiseComparisonReport = require('./routes/yearly_section_wise_comparison_report');
var YearlyClassWiseComparisonReport = require('./routes/yearly_class_wise_comparison_report');
var YearlyClassWiseSubjectAvgReport = require('./routes/yearly_class_wise_subject_avg_report');
var ConsolidateTabulationSheetReport = require('./routes/consolidate_tabulation_sheet_report');
var SubjectWiseFailureReport = require('./routes/subject_wise_failure_report');
var StudentWiseSubjectFailureReport = require('./routes/student_wise_subject_failure_report');
var threesixtyDegreeView = require('./routes/threesixty_degree_view');
var PromotionSheetReport = require('./routes/promotion-sheet-report');




//Tarique
var staffRouter = require('./routes/staff');
var classTeacherRouter = require('./routes/class_teacher');
var studentSearchRouter = require('./routes/studentSearch');
var adminReportRouter = require('./routes/admin_report');
var birthDayRouter = require('./routes/birth_day');
var attendanceRouter = require('./routes/attendance');

var rolesRouter = require('./routes/roles');
var itemRouter = require('./routes/item');
var employeeTypeRouter = require('./routes/employee_type');
var eventTypeRouter = require('./routes/event_type');
var designationsRouter = require('./routes/designations');
var departmentRouter = require('./routes/department');
var levelRouter = require('./routes/level');
var countryRouter = require('./routes/country');
var cityRouter = require('./routes/city');
var religionRouter = require('./routes/religion');
var areaRouter = require('./routes/area');
var stateRouter = require('./routes/state');
var standardRouter = require('./routes/standard');
var sectionRouter = require('./routes/section');
var clubRouter = require('./routes/club');
var parentgroupRouter = require('./routes/parent_group');
var remarkRouter = require('./routes/remark');
var activateSessionRouter = require('./routes/activate_session');
var inventoryDepartmentRouter = require('./routes/inventory_department');
var emplyomentStatusRouter = require('./routes/employment_status');
var employeeStatusRouter = require('./routes/role');
var categoryRouter = require('./routes/category');
var subjectRouter = require('./routes/subject');

var infarmaryCategoryRouter = require('./routes/infirmary_category');
var infarmaryCaseRouter = require('./routes/infirmary_case');
var infarmaryStudentRouter = require('./routes/infirmary_student');
var infirmaryStaffRouter = require('./routes/infirmary_staff');

var inventoryRackRouter = require('./routes/inventory_rack');
var inventoryUnitRouter = require('./routes/inventory_unit');
var inventoryCategoryRouter = require('./routes/inventory_category');
var inventorySubcategoryRouter = require('./routes/inventory_subcategory');
var inventoryItemRouter = require('./routes/inventory_item');
var inventoryStockRouter = require('./routes/inventory_stock');
var inventoryIssueRouter = require('./routes/inventory_issue');
var inventorySaleRouter = require('./routes/inventory_sale');
var inventoryReportRouter = require('./routes/inventory_report');

var staffBPWeightRouter = require('./routes/staff_bp_weight');
var eventRouter = require('./routes/event');
var newEventRouter = require('./routes/new_event');
var classHolidayRouter = require('./routes/class_holiday');
var certificateRouter = require('./routes/certificate');

//ghulam
var sessionRouter = require('./routes/fees_session');
var bankRouter = require('./routes/bank');
var fineSettingRouter = require('./routes/fine_setting');
var feeHeadRouter = require('./routes/fee_heads');
var feeSlipRouter = require('./routes/fee_slips');
var feePlanRouter = require('./routes/fee_plans');
var applyPlanRouter = require('./routes/apply_fee_plans');
var scholarshipRouter = require('./routes/scholarship');
var feeReceivedRouter = require('./routes/receive_fees');
var feesReportRouter = require('./routes/fees_report');
var feesWithdrawRouter = require('./routes/fees_withdraw');

var app = express();

app.use(logger('dev'));
app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : '',
        database:'mckvieor_school',
        multipleStatements: true,
    },'request')
)
app.use(express.json({limit:'20mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(compression);

var mysql = require('mysql')

function verifyToken(req, res, next) {
  console.log('here');
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    // Check if bearer is undefined
    jwt.verify(bearerHeader, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        next();
      }
    });
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/exam-scheme', verifyToken, examSchemeRouter);
app.use('/grade', verifyToken, gradeRouter);
app.use('/marks-manager', verifyToken, marksManagerRouter);
app.use('/marks-entry', verifyToken, marksEntryRouter);
app.use('/marks-report', verifyToken, marksReportRouter);
app.use('/maturity-development', verifyToken, maturityDevelopmentReportRouter);
app.use('/result-activation', verifyToken, resultActivationReportRouter);
app.use('/physical-fitness', verifyToken, physicalFitnessReportRouter);
app.use('/exam-subject-group-map', verifyToken, subjectGroupMapReportRouter);
app.use('/student-assign-house', verifyToken, studentAssignHouseRouter);
app.use('/student-group-student', verifyToken, studentGroupStudentRouter);
app.use('/student-assign-subject', verifyToken, studentAssignSubjectRouter);
app.use('/student-withdrawn-student', verifyToken, studentWithdrawnStudentRouter);
app.use('/teacher-time-table', verifyToken, teacherTimeTableRouter);
app.use('/time-table-substitutation', verifyToken, timeTableSubstitutaionRouter);
app.use('/time-table-admin', verifyToken, timeTableAdminRouter);
app.use('/time-table-room-settings', verifyToken, timeTableRoomSettingsRouter);
app.use('/time-table-period-settings', verifyToken, timeTablePeriodSettingsRouter);
app.use('/time-table-day-settings', verifyToken, timeTableDaySettingsRouter);
app.use('/time-table-report', verifyToken, timeTableReportRouter);
app.use('/first_assessment_report', verifyToken, firstAssessmentReportRouter);
app.use('/final_assessment_report', verifyToken, finalAssessmentReportRouter);
//==== promotion by qadir ========
app.use('/promote', verifyToken, promoteRouter);
app.use('/student-assign-section', verifyToken, studentAssignSectionRouter);
app.use('/student-login-slip', verifyToken, studentLoginSlipRouter);
app.use('/student-school-leaving', verifyToken, studentSchoolLeavingRouter);
app.use('/student-result-activation', verifyToken, studentResultActivationRouter);

//Bodhi
app.use('/roles', verifyToken, rolesRouter);
app.use('/courses', verifyToken, coursesRouter);
app.use('/activity_item', verifyToken, activityitemRouter);
app.use('/activity_category', verifyToken, activitycategoryRouter);
app.use('/activity_event', verifyToken, activityeventRouter);
app.use('/activity_detail', verifyToken, activityRouter);
app.use('/classteacher', verifyToken, classteacherRouter);
app.use('/mentor_category', verifyToken, mentorCategoryRouter);
app.use('/mentor_case', verifyToken, mentorCaseRouter);
app.use('/mentor_detail', verifyToken, mentorDetailRouter);
app.use('/mentor_report', verifyToken, mentorReportRouter);
app.use('/discipline_category', verifyToken, disciplineCategoryRouter);
app.use('/discipline_case', verifyToken, disciplineCaseRouter);
app.use('/discipline_detail', verifyToken, disciplineDetailRouter);
app.use('/discipline_report', verifyToken, disciplineReportRouter);
app.use('/student', verifyToken, studentRouter);
app.use('/student_info_update', verifyToken, studentInfoUpdateRouter);
app.use('/sms', verifyToken, smsRouter);
app.use('/email', verifyToken, emailRouter);
app.use('/employee-notification', verifyToken, employeenotificationRouter);
app.use('/student-notification', verifyToken, studentnotificationRouter);
app.use('/id_signature', verifyToken, idsignatureRouter);
app.use('/id_card', verifyToken, idcardRouter);
app.use('/activity_report', verifyToken, activityReport);
app.use('/career', verifyToken, Career);
app.use('/alumni', verifyToken, Alumni);
app.use('/assessment_report', verifyToken, AssessmentReport);
app.use('/yearly_section_wise_comparison_report', verifyToken, YearlySectionWiseComparisonReport);
app.use('/yearly_class_wise_comparison_report', verifyToken, YearlyClassWiseComparisonReport);
app.use('/yearly_class_wise_subject_avg_report', verifyToken, YearlyClassWiseSubjectAvgReport);
app.use('/consolidate_tabulation_sheet_report', verifyToken, ConsolidateTabulationSheetReport);
app.use('/subject_wise_failure_report', verifyToken, SubjectWiseFailureReport);
app.use('/student_wise_subject_failure_report', verifyToken, StudentWiseSubjectFailureReport);
app.use('/threesixty_degree_view', verifyToken, threesixtyDegreeView);
app.use('/promotion-sheet-report', verifyToken, PromotionSheetReport);

//Tarique
app.use('/admin_report', verifyToken, adminReportRouter);
app.use('/birth_day', verifyToken, birthDayRouter);
app.use('/attendance', verifyToken, attendanceRouter);
app.use('/class_teacher', verifyToken, classTeacherRouter);
app.use('/studentSearch', verifyToken, studentSearchRouter);
app.use('/staff', verifyToken, staffRouter);
app.use('/roles', verifyToken, rolesRouter);
app.use('/item', verifyToken, itemRouter);
app.use('/employee_type', verifyToken, employeeTypeRouter);
app.use('/event_type', verifyToken, eventTypeRouter);
app.use('/designations',  verifyToken, designationsRouter);
app.use('/department',  verifyToken, departmentRouter);
app.use('/category',  verifyToken, categoryRouter);
app.use('/subject',  verifyToken, subjectRouter);
app.use('/level', verifyToken, levelRouter);
app.use('/country', verifyToken, countryRouter);
app.use('/city', verifyToken, cityRouter);
app.use('/state', verifyToken, stateRouter);
app.use('/religion', verifyToken, religionRouter);
app.use('/standard', verifyToken, standardRouter);
app.use('/section', verifyToken, sectionRouter);
app.use('/parent_group', verifyToken, parentgroupRouter);
app.use('/remark', verifyToken, remarkRouter);
app.use('/activate_session', verifyToken, activateSessionRouter);
app.use('/inventory_department', verifyToken, inventoryDepartmentRouter);
app.use('/club', verifyToken, clubRouter);
app.use('/area', verifyToken, areaRouter);
app.use('/employment_status', verifyToken, emplyomentStatusRouter);
app.use('/role', verifyToken, employeeStatusRouter);
app.use('/infirmary_category', verifyToken, infarmaryCategoryRouter);
app.use('/infirmary_case', verifyToken, infarmaryCaseRouter);
app.use('/infirmary_student', verifyToken, infarmaryStudentRouter);
app.use('/infirmary_staff', verifyToken, infirmaryStaffRouter);

app.use('/inventory_rack', verifyToken, inventoryRackRouter);
app.use('/inventory_unit', verifyToken, inventoryUnitRouter);
app.use('/inventory_category', verifyToken, inventoryCategoryRouter);
app.use('/inventory_subcategory', verifyToken, inventorySubcategoryRouter);
app.use('/inventory_item', verifyToken, inventoryItemRouter);
app.use('/inventory_stock', verifyToken, inventoryStockRouter);
app.use('/inventory_issue', verifyToken, inventoryIssueRouter);
app.use('/inventory_sale', verifyToken, inventorySaleRouter);
app.use('/inventory_report', verifyToken, inventoryReportRouter);

app.use('/staff_bp_weight', verifyToken, staffBPWeightRouter);
app.use('/event', verifyToken, eventRouter);
app.use('/new_event', verifyToken, newEventRouter);
app.use('/class_holiday', verifyToken, classHolidayRouter);
app.use('/certificate', verifyToken, certificateRouter);


//ghulam
app.use('/bank', verifyToken, bankRouter);
app.use('/fees_session', verifyToken, sessionRouter);
app.use('/fine_setting', verifyToken, fineSettingRouter);
app.use('/fee_heads', verifyToken, feeHeadRouter);
app.use('/fee_slips', verifyToken, feeSlipRouter);
app.use('/fee_plans', verifyToken, feePlanRouter);
app.use('/apply_fee_plans', verifyToken, applyPlanRouter);
app.use('/scholarship', verifyToken, scholarshipRouter);
app.use('/receive_fees', verifyToken, feeReceivedRouter);
app.use('/fees_report', verifyToken, feesReportRouter);
app.use('/fees_withdraw', verifyToken, feesWithdrawRouter);


module.exports = app;
