<student-school-leaving>
  <print-header></print-header>
  <loading-bar if={loading}></loading-bar>  
  <section class=" is-fluid" show={view=='home'}>
    <div class="level">
      <div class="level-left">
        <h2 class="title is-size-5" style="color: #ff3860;">School Leaving Certificate</h2>
      </div>
      <div class="level-right">
        <div class="column is-narrow"><label class="label">Issue date</label></div>
          <div class="column is-narrow">
            <div class="control">
              <input class="input date is-small" ref="issue_date" type="text">
            </div>
          </div>
        <button class="button is-primary has-text-weight-bold ml5 is-small" onclick={printCertificate} >Print Certificate</button>
        <button class="button is-info has-text-weight-bold is-small ml5" onclick={printCertificate} >Print Duplicate Certificate</button>
        <button class="button is-success has-text-weight-bold is-small ml5" onclick={printFeedback} >Print Feedback Form</button>
        <button class="button is-link has-text-weight-bold ml5 is-small"  
          onclick={refreshStudents}>
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
        </button>
      </div>
    </div> 
    <div class="level box">
      <div class="level-left">
        <div class="columns">
          <div class="column is-narrow"><label class="label">Standard</label></div> 
            <div class="column is-narrow">  
            <div class="control">
              <div class="select is-fullwidth is">
                <select ref="standardSelect" id="standard" onchange={changeSection}>
                  <option each={classes} value={standard_id}>{standard}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="column is-narrow"><label class="label">Section</label></div>
          <div class="column is-narrow">  
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="sectionSelect" id="section">
                  <option each={tempSections} value={section_id}>{section}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="column is-narrow"><label class="label">Type</label></div> 
          <div class="column is-narrow">  
            <div class="control">
              <div class="select is-fullwidth">
                <select ref="typeSelect">
                  <option value="Normal">Normal</option>
                  <option value="TC">TC</option>
                </select>
              </div>
            </div>
          </div>
          <div class="column is-narrow">
            <button class="button is-danger has-text-weight-bold" onclick={refreshStudents} >Show Report</button>
          </div>
        </div>
      </div>
      <div class="level-right">
        <!-- <a class="button is-small is-rounded" style="margin-bottom:12px;" rel="nofollow" onclick={}></a> -->
        
      </div>
    </div>

     <table class="table is-fullwidth is-bordered is-hoverable is-narrow">
      <thead>
        <tr>
          <th class="sl_no">SL No</th>
          <th>Enroll No</th>
          <th>Student Name</th>
          <th>Withdraw Class</th>
          <th>Date of Withdraw</th>
          <th>Reason</th>
          <th>Certificate Issue</th>
          <th class="has-text-centered">
            <input type="checkbox" id="checkStudent" onclick={selectAll}>
          </th>
          <th style="width:100px;"></th>
        </tr>
      </thead>
      <tbody>
        <tr each={c, i in students}>
          <td>{i+1}</td>
          <td>{c.enroll_number}</td>
          <td>{c.first_name} {c.middle_name} {c.last_name}</td>
          <td>{c.dol}</td>
          <td></td>
          <td>{c.remarks}</td>
          <td class="has-text-centered">{c.type}</td>
          <td class="has-text-centered">
    
            <span >
              <input type="checkbox" class="id_check_box" checked={c.done}  id="{ 'StudentId' + c.student_id }" onclick={selectStudent.bind(this,c)} >
            </span>
          </td>
          <td class="has-text-right">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={c.confirmDelete}>
              <span><a class="button is-small" onclick={create_certificate.bind(this, c)} title="Create Certificate">
              <i class="fa fa-plus-circle" aria-hidden="true"></i></i></a></span>
              <span > <a class="button is-small" rel="nofollow" onclick={confirmDelete} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></a></span>
            </div>
            <div class="table-buttons" if={c.confirmDelete}>
              <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
              <span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
            </div>  
          </td>
        </tr>
      </tbody>
    </table>  
  </section>

  <section class=" is-fluid" show={view=='school-leaving-certificate'}>
    <div class="level no-print">
      <div class="level-left">
        
      </div>
      <div class="level-right">
        <button class="button is-primary has-text-weight-bold is-small" onclick="window.print()">
          <span class="icon">
            <i class="fas fa-print"></i>
          </span>
        </button>
        <button class="button is-warning has-text-weight-bold is-small ml5" onclick={backToHome}>
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
        </button>
      </div>
    </div>
  
    <div each={c, i in printCertificateDetails}>
      <center>
      <div class="topHeader">CERTIFICATE OF CONDUCT & CHARACTER</div> 
  
      <table class="table is-fullwidth is-bordered" style="width:860px;">
      <caption class="caption-school-leaving">STUDENT PARTICULARS</caption>
        <tr>
         <th>Name in Full</th>
         <td ColSpan="5">{c.name}</td>
        </tr>
        <tr>
          <th>Standard</th><td> {c.standard}  {c.section}</td>
          <th>Enrol No.</th><td>{c.enroll_number}</td>
          <th>House</th><td>{c.house_name}</td>
        </tr>
        <tr>
          <th>Name of Father</th>
          <td ColSpan="5">{c.f_name}</td>
        </tr>
        <tr>
          <th>Date of Birth</th>
          <td ColSpan="5">{c.dob}</td>
        </tr>
        <tr>
          <th>Date of Admission to MCKV</th>
          <td ColSpan="5">{c.doa}</td>
        </tr>
        <tr>
          <th>Class in which he took admission</th>
          <td ColSpan="5">{c.admission_for_class}</td>
        </tr>
        <tr>
          <th>Date of  leaving school</th>
          <td ColSpan="5">{c.dol}</td>
        </tr> 
        <tr>
          <th>Examination appeared for/passed</th>
          <td ColSpan="5">{c.examination_appeared}</td>
        </tr>
        <tr>
          <th>Conduct</th>
          <td ColSpan="5">{c.conduct}</td>
        </tr>
        <tr>
          <th>Attendance</th>
          <td ColSpan="5">{c.attendance}</td>
        </tr>
      </table>
  
      <table class="table is-fullwidth is-bordered" style="width:860px;margin-top: -25px;">
        <caption style="text-align:left !important;font-size:.8em; !important " class="caption-school-leaving">Social & Life Skills:</caption>
        <tr>
          <th class="socialTitle">a) Relations with the Faculty</th><td>{c.faculty_relationship}</td>
        </tr>
        <tr>
          <th class="socialTitle">b) Relations with his peers</th><td>{c.peer_group_relationship}</td>
        </tr>
        <tr>
          <th class="socialTitle">c) Sense of responsibility towards Class </th><td>{c.class_responsibility}</td>
          
        </tr>
        <tr>
          <th class="socialTitle">d) Attitude</th><td>{c.attitude}</td>
        </tr>
        <tr>
          <th class="socialTitle">e) Sense of responsibility towards House </th><td>{c.house_responsibility}</td>
          
        </tr>
        <tr>
          <th class="socialTitle">f) Punctuality</th><td>{c.punctuality}</td>
        </tr>
      </table>
  
      <table class="table is-fullwidth is-bordered" style="width:860px;margin-top:-25px;">   
        <tr>
          <th>Remarks if any </th>
          <td>{c.remarks}</td>
        </tr>
      </table>
      <br><br><br>
   
      <table class="table is-fullwidth" style="width:860px;">
        <tr>
           <td class="principal-school-leaving" style=" width:230px;">___________________<br><span class="principalText" style="padding-left: 35px;">Principal</sapn></td>              
        </tr>
       </table>   
      <table class="table is-fullwidth" style="width:860px;">
        <tr>
           <td class="principal title"></td>
           <td class="profile-school-leaving">(for school profile, see reverse)</td>
           <td class="currentDate "><b>{issue_date}</b></td>               
        </tr>
       </table>   
      
      <div class='page-break'></div>
    
      <div>
        <center>
          <div class='header' style="padding: 5px;border: solid #000000 2px;width: 120px;font-size: 1em;font-weight: bold;border-radius: 10px;">School Profile</div>
        </center>
        <br>
  
        <div class='profileDetail'  style='width:800px;'>
         <p>
           <strong>M.C.KEJRIWAL VIDYAPEETH</strong> offers an all-round education upto the Senior Secondary level, and 
           is affiliated to the Council for the Indian School Certificate Examinations, New Delhi.
            The Council conducts the <strong>I.C.S.E</strong> and <strong>I.S.C</strong> Examinations at the close of 
            Classes X and XII at the national level, based upon syllabi prescribed by it. 
          </p>
          <br>
          <p>
            <strong>M.C.KEJRIWAL VIDYAPEETH</strong> has a very wide spectrum of co-curricular activities which 
            receive as much importance as its academic disciplines. 
            Through this wide range of activities, our students are exposed to varying situations and experiences. 
            In addition to this, they regularly participate in inter-school competitions at the regional, 
            national and international levels.
          </p>
          <br>
          <p>
           The scholastic and extra- mural programmes of MCKV are geared to the nurture of academic excellence, 
           independent critical and creative thinking, tapping of diverse talents, leadership training and a commitment to social service.
          </p>
        </div>
        <div style='width:800px;'>
            <table class="table is-fullwidth " style="width:860px;">
              <tr><td  style='border: #fff;'><b><u>Explanation of Grades</u></b></td></tr> 
              <tr><td style='border: #fff;'>A = Excellent</td></tr>
              <tr><td style='border: #fff;'>B = Very Good</td></tr>
              <tr><td  style='border: #fff;'>C = Good</td></tr>
              <tr><td  style='border: #fff;'>D = Fair</td></tr>
              <tr><td  style='border: #fff;'>E = Poor</td></tr>
            </table>
        </div>
      </div>
  
    </div>  
  </center>
  
  </section>

  <section class=" is-fluid" show={view=='create-certificate-form'}>
    <div class="level">
      <div class="level-left">
        <h2 class="title is-size-5" style="color: #ff3860;"> Create School Leaving Certificate</h2>
      </div>
      <div class="level-right">
        <button class="button is-warning has-text-weight-bold" onclick={close_create_certificate}>
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
        </button>
      </div>
    </div>

    <div class="box">

      <div class="columns mt20">
        <div class="column is-2">
          <label class="label is-small" for="examination_appeared">Examination appeared for/passed</label>
        </div>
        <div class="column is-2">
          <input class="input is-small" ref="examination_appeared" type="text" disabled>
        </div>
        <div class="column is-2">
          <label class="label is-small" for="leaving_date">Date of Leaving</label>
        </div>
        <div class="column is-2">
          <input class="input date is-small" type="text" ref="leaving_date" >
        </div>
        <div class="column is-2">
          <label class="label is-small" for="conduct">Conduct</label>
        </div>
        <div class="column is-2">
          <div class="select is-fullwidth is-small">
            <select ref="conduct">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
        </div>
      </div>

      <div class="columns mt30">
        <div class="column is-2">
          <label class="label is-small" for="attendance">Attendance</label>
        </div>
        <div class="column is-2">
          <div class="select is-fullwidth is-small">
            <select ref="attendance">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
        </div>
        <div class="column is-2" show={isc_stream}>
          <label class="label is-small" for="isc_stream">For ISC Student</label>
        </div>
        <div class="column is-2" show={isc_stream}>
          <div class="select is-fullwidth is-small">
            <select ref="isc_stream">
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Humanities">Humanities</option>
            </select>
          </div>
        </div>
      </div>

      <div class="columns mt30">
        <div class="column is-full">
          <h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Sociability</h3>
          <hr class="student-hr is-full" style="margin-top: 0.5em; margin-bottom: 0.5em;">
        </div>
      </div>

      <div class="columns mt30">
        <div class="column is-2">
          <label class="label is-small" for="faculty_relationship">Relations with the Faculty</label>
        </div>
        <div class="column is-2">
          <div class="select is-fullwidth is-small">
            <select ref="faculty_relationship">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
        </div>
        <div class="column is-2">
          <label class="label is-small" for="peer_group_relationship">Relations with his peers</label>
        </div>
        <div class="column is-2">
          <div class="select is-fullwidth is-small">
            <select ref="peer_group_relationship">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
        </div>
        <div class="column is-2">
          <label class="label is-small" for="class_responsibility">Sense of Responsibility towards Class</label>
        </div>
        <div class="column is-2">
          <div class="select is-fullwidth is-small">
            <select ref="class_responsibility">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
        </div>
      </div>

      <div class="columns mt30">
        <div class="column is-2">
          <label class="label is-small" for="house_responsibility">Sense of Responsibility towards House</label>
        </div>
        <div class="column is-2">
          <div class="select is-fullwidth is-small">
            <select ref="house_responsibility">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
        </div>
        <div class="column is-2">
          <label class="label is-small" for="attitude">Attitude</label>
        </div>
        <div class="column is-2">
          <div class="select is-fullwidth is-small">
            <select ref="attitude">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
        </div>
        <div class="column is-2">
          <label class="label is-small" for="punctuality">Punctuality</label>
        </div>
        <div class="column is-2">
          <div class="select is-fullwidth is-small">
            <select ref="punctuality">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
        </div>
      </div>

      <div class="columns mt30">
        <div class="column is-full">
          <h3 class="has-text-weight-bold is-size-6 has-text-link student-h3">Details of Achievement</h3>
          <hr class="student-hr is-full" style="margin-top: 0.5em; margin-bottom: 0.5em;">
        </div>
      </div>

      <div class="columns mt30">
        <div class="column is-4">
          <textarea class="textarea" ref="remarks" rows="4"></textarea>
        </div>
      </div>

      <div class="columns mt30">
        <div class="column is-full">
          <button class=" button is-success has-text-weight-bold " onclick={addLeavingCertificate} >Submit</button>
          <button class=" button is-danger has-text-weight-bold " id="" onclick={close_create_certificate}>Cancel</button>   
        </div>
      </div>

    </div>
  </section>


  <section class=" is-fluid" show={view=='school-leaving-certificate-form'}>
    <div class="level no-print">
      <div class="level-left">
        
      </div>
      <div class="level-right">
        <button class="button is-primary has-text-weight-bold is-small" onclick="window.print()">
          <span class="icon">
            <i class="fas fa-print"></i>
          </span>
        </button>
        <button class="button is-warning has-text-weight-bold is-small ml5" onclick={backToHome}>
        <span class="icon">
          <span class="fas fa-arrow-left"></span>
        </span>
        </button>
      </div>
    </div>

    <!--  Print Feedback Form Start -->
    <div each={c, i in printFeedbackDetails}>
    <center>
        <div class="topHeader">Feedback Format for the Certificate of Conduct & Character for the Year: {session_name}</div>
        <table class="table is-fullwidth is-bordered" style="width:860px;">
          <div style="text-align:left;width:860px;">
          <caption class="caption-school-leaving">STUDENT PARTICULARS  </caption>    
              <tr>
                <th>Name in Full</th><td ColSpan="5">{c.name}</td>
              </tr>
              <tr>
                <th>Standard</th><td>{c.standard}-{c.section}</td>
                <th>Enrol No.</th><td>{c.enroll_number}</td>
                <th>House</th><td>{c.house_name}</td>
              </tr>
              <tr>
                <th >Name of Father</th><td ColSpan="5">{c.f_name}</td>
              </tr>
              <tr>
                <th >Date of Birth</th><td ColSpan="5">{c.dob}</td>
              </tr>
              <tr>
                <th >Date of Admission to MCKV</th><td ColSpan="5">{c.doa}</td>
              </tr>
              <tr>
                <th >Class in which he took admission</th><td ColSpan="5">{c.admission_for_class}</td>
              </tr>
              <tr>
                <th >Date of  leaving school</th><td ColSpan="5"></td>
              </tr> 
              <tr>
                <th>Examination appeared for/passed</th><td ColSpan="5">{c.standard}</td>
              </tr>
              <tr>
                <th>Conduct</th><td ColSpan="5">{c.conduct}</td>
              </tr>
              <tr>
                <th>Attendance</th><td ColSpan="5">{c.attendance}</td>
              </tr>
            </table>
            <table class="table is-fullwidth is-bordered" style="width:860px;margin-top:-25px;">
              <caption class="caption-school-leaving" style="text-align:left !important;font-size: 0.8em;">Social & Life Skills:  (Please write A to E in the box)</caption>
              <tr>
                <th class="socialTitle">a) Relations with the Faculty</th><td></td>
              </tr>
              <tr>
                <th class="socialTitle">b) Relations with his peers</th><td></td>
              </tr>
              <tr>
                <th class="socialTitle">c) Sense of responsibility towards Class </th><td></td>
              </tr>
              <tr>
                <th class="socialTitle">d) Attitude</th><td></td>
              </tr>
              <tr>
                <th class="socialTitle">e) Sense of responsibility towards House </th><td></td>  
              </tr>
              <tr>
                <th class="socialTitle">f) Punctuality</th><td></td>
              </tr>
               
            </table>
            <table class="table is-fullwidth is-bordered" style="width:860px;margin-top:-25px;">
              <tr style="line-height: 30px;">
                <th class="socialTitle">Remarks if any </th><td></td>
              </tr>
            </table>
              <table style="border-style:none;margin-top:60px; width:860px;">
                <tr>
                 <td style="text-align: center; border-style:none;">___________________<br><span class="principalText">Class Teacher </sapn></td>
                 <td style="text-align: center;border-style:none;">_______________________<br><span class="principalText"> Senior School Incharge</sapn></td>
                 <td style="text-align: center;border-style:none;">___________________<br><span class="principalText">   Headmistress   </sapn></td>
                </tr>
              </table> 
              <div class='page-break'></div>
        </div>
      </center>
    </div>
    <!-- Certificate Print End -->
  </section>

  
	<script>
	var self = this
    self.on("mount", function(){
      self.loading = false;
      self.role = getCookie('role')
      self.view = 'home'
      self.update()
      flatpickr(".date", {
        allowInput: true,
        dateFormat: "d/m/Y",
      })
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentSchoolLeavingStore.off('read_classes_changed',ClassesChanged)
      studentSchoolLeavingStore.off('read_section_changed',SectionChanged)

      studentSchoolLeavingStore.off('read_students_changed',ReadSectionsChanged)
      studentSchoolLeavingStore.off('print_feed_back_form_changed',PrintFeedBackFormChanged)
      studentSchoolLeavingStore.off('create_certificate_changed',CreateCertificateChanged)
      studentSchoolLeavingStore.off('print_certificate_changed',PrintCertificateChanged)
    })

    self.readClass = () => {
       self.loading = true;
       studentSchoolLeavingStore.trigger('read_classes')
    }

    self.readSection = () => {
       self.loading = true;
       studentSchoolLeavingStore.trigger('read_section')
    }

    self.changeSection = () => {
        self.tempSections = []
        self.tempSections = self.sections.filter(s=>{
          return s.standard_id==self.refs.standardSelect.value
        })
        self.update()
        console.log(self.tempSections)
    }

    // ****************************************** students *************************************

    self.refreshStudents = () =>{

      let error = '';
      
      if(self.refs.standardSelect.value==''){
        error = error + "Please select standard, "
      }

      if(self.refs.sectionSelect.value==''){
        error = error + "Please select section of student, "
      }

      if(self.refs.typeSelect.value==''){
        error = error + "Please select type, "
      }

      if(error.length!=0){
        toastr.error(error)
        return
      }else{
        self.loading = true
        studentSchoolLeavingStore.trigger('read_students', self.refs.standardSelect.value, self.refs.sectionSelect.value, self.refs.typeSelect.value) 
      }
      
    }


    self.backToHome = () =>{
      self.view='home'
    }

    self.printFeedback = () =>{

      let student_id='';
       self.students.map( q => {
          if(q.done){
            if(student_id==''){
              student_id=q.student_id
            }else{
              student_id=student_id+','+q.student_id
            }
          }
        })
       console.log(student_id);
      if(student_id==''){
        toastr.info('Please select at least one student and try again')
      }else{
        
        studentSchoolLeavingStore.trigger('print_feed_back_form', student_id)
      }

      
    }

    self.printCertificate = () =>{

      let student_id='';
       self.students.map( q => {
          if(q.done){
            if(student_id==''){
              student_id=q.student_id
            }else{
              student_id=student_id+','+q.student_id
            }
            self.type=q.type
          }
        })
       console.log(student_id);
       console.log(self.type);
      if(student_id==''){
        toastr.info('Please select at least one student and try again')
      }else if(!self.refs.issue_date.value){
        toastr.error("Please enter Issue Date and try again")
      }else if(self.type!="Yes"){
        toastr.error("Please Create Certificate and try again")
      }else{
        
        studentSchoolLeavingStore.trigger('print_certificate', student_id)
      }

      
    }

    self.create_certificate = (c,e) => {
      if(!self.refs.issue_date.value){
        toastr.error("Please enter Issue Date and try again")
        return;
      }
       if(c.type=='Yes'){
        toastr.error("School Leaving Certificate has already been issued. please use duplicate Certificate Button to print again. ")
        return;
      } 
      self.student_id = c.student_id
      self.standard = c.standard
      self.refs.examination_appeared.value = self.standard
      self.view = 'create-certificate-form'
      if(self.refs.examination_appeared.value == "TWELVE"){
        self.isc_stream = true
      }else{
        self.isc_stream = false
      }
   
    }

    self.close_create_certificate = () => {
      self.view='home' 
    }

    self.addLeavingCertificate = () =>{
      console.log(self.student_id)
      var obj={}
      obj['type'] = "Yes"
      obj['student_id'] = self.student_id
      obj['examination_appeared'] = self.refs.examination_appeared.value
      obj['leaving_date'] = convertDate(self.refs.leaving_date.value)
      obj['conduct'] = self.refs.conduct.value
      obj['attendance'] = self.refs.attendance.value
      obj['faculty_relationship'] = self.refs.faculty_relationship.value
      obj['peer_group_relationship'] = self.refs.peer_group_relationship.value
      obj['class_responsibility'] = self.refs.class_responsibility.value
      obj['house_responsibility'] = self.refs.house_responsibility.value
      obj['attitude'] = self.refs.attitude.value
      obj['punctuality'] = self.refs.punctuality.value
      obj['remarks'] = self.refs.remarks.value
      obj['isc_stream'] = self.refs.isc_stream.value
      if(!self.refs.leaving_date.value){
        toastr.error("Please enter Date Of Leaving and try again")
        return;
      }else{
        studentSchoolLeavingStore.trigger('create_certificate', obj)
      }
    }

    self.selectAll = () => {

      if($('#checkStudent').is(":checked")){
        self.students.map(i=>{
            i.done = true;
            $('StudentId'+i.student_id).prop('checked', true);
            
          })
      }else{
        self.students.map(i=>{
            i.done = false;
            $('StudentId'+i.student_id).prop('checked', false);
            self.student_id = i.student_id;
            console.log(self.student_id)
          })
      }
      console.log(self.students)
    }

     self.selectStudent = (item,event) => {
      item.done=!event.item.c.done
        self.student_id = item.student_id;
        console.log(self.student_id)
    }

    self.cancelOperation = (c) => {
      self.students.map(p => {
          p.confirmDelete = false
          p.confirmEdit = false
      })
    }
    self.confirmDelete = (c) => {
      self.students.map(p => {
        if(p.student_id != c.item.c.student_id){
          p.confirmDelete = false
        }else{
          p.confirmDelete = true
        }
      })
    }

    self.delete = (c) => {
      self.loading = true
      studentSchoolLeavingStore.trigger('delete_student_certificte', c.item.c.student_id)
    }

    // ****************************************** all change metods *************************************
    studentSchoolLeavingStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      self.readSection()
    }

    studentSchoolLeavingStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
      self.changeSection()
      
      //self.refreshStudents()
    }

    /************************************************ students changed Method ************************************************/
    studentSchoolLeavingStore.on('read_students_changed',ReadSectionsChanged)
    function ReadSectionsChanged(students){
      self.loading = false
      self.students = []
      self.students = students
      self.students.map(i=>{
        i.done = false;
      })
      self.update()
    }

    studentSchoolLeavingStore.on('create_certificate_changed',CreateCertificateChanged)
    function CreateCertificateChanged(){
      self.loading = false
      self.view='home'
      self.refs.leaving_date.value = ""
      self.refs.conduct.value = "A"
      self.refs.attendance.value = "A"
      self.refs.faculty_relationship.value = "A"
      self.refs.peer_group_relationship.value = "A"
      self.refs.class_responsibility.value = "A"
      self.refs.house_responsibility.value = "A"
      self.refs.attitude.value = "A"
      self.refs.punctuality.value = "A"
      self.refs.remarks.value = ""
      self.refs.isc_stream.value = "Science"
      self.update()
      self.refreshStudents()
    }

    studentSchoolLeavingStore.on('print_feed_back_form_changed',PrintFeedBackFormChanged)
    function PrintFeedBackFormChanged(students,session_name){
      self.loading = false
      self.view='school-leaving-certificate-form'
      self.printFeedbackDetails = students
      self.session_name = session_name
      self.update()
      
    } 

    studentSchoolLeavingStore.on('print_certificate_changed',PrintCertificateChanged)
    function PrintCertificateChanged(students,session_name){ 
      self.loading = false
      self.view='school-leaving-certificate'
      self.printCertificateDetails = students
      self.session_name = session_name
      self.issue_date = self.refs.issue_date.value
      self.update()
      
    }

    studentSchoolLeavingStore.on('delete_student_certificte_changed',DeleteStudentCertificteChanged)
    function DeleteStudentCertificteChanged(){ 
      self.loading = false
      self.update()
      self.refreshStudents()
      
    }

</script>
</student-school-leaving>