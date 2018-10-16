<student-school-leaving>
<loading-bar if={loading}></loading-bar>  

  <section class=" is-fluid" show={view=='home'}>

    <div class="level">
      <div class="level-left">
        <h2 class="title" style="color: #ff3860;">School Leaving Certificate</h2>
      </div>
      <div class="level-right">
      </div>
    </div>
     
    <div class="box">
      <div class="columns">

        <div class="column is-narrow"><label class="label">Standard</label></div>  
        <div class="column is-narrow">  
          <div class="control">
            <div class="select is-fullwidth">
              <select ref="standardSelect" id="standard" onchange={changeSection}>
                <option value="">Select Standard</option>
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
                <option value="">Select Section</option>
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
                <option value="">Select Type</option>
                <option value="Normal">Normal</option>
                <option value="TC">TC</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-narrow">
          <button class="button is-danger has-text-weight-bold" onclick={refreshStudents} >GO </button>
        </div>
          
      </div>
    </div> 

     <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th class="sl_no">SL No</th>
          <th>Enroll No</th>
          <th>Student Name</th>
          <th>Withdraw Class</th>
          <th>Date of Withdraw</th>
          <th>Reason</th>
          <th>Certificate Issue</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={c, i in students}>
          <td>{i+1}</td>
          <td>{c.enroll_number}</td>
          <td>{c.first_name} {c.middle_name} {c.last_name}</td>
          <td>{c.dol}</td>
          <td>{c.remarks}</td>
          <td>{c.type}</td>
          <td class="has-text-right">
            <span>
              <a class="button is-small is-rounded is-danger" rel="nofollow" onclick={printFeedBackForm.bind(this, c)}>Print</a>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
     
  </section>

  <section class=" is-fluid" show={view=='feed-back-form'}>

    <div each={c, i in printDetails}>

      <center>
        <table style="border-style:none;">
          <tr style="border-style:none;">
            <td style="border-style:none;">
               <img src="img/school_small.png" style="height:100px;">
            </td>
            <td style="text-align:center;border-style:none;">
               <img src="img/school_new_logo.jpg" style="height:100px;">
               <p style="text-align:center; font-size:11px;font-weight:bold;padding:0;margin:0;">243 G. T. Road(N) Liluah, Howrah - 711204 Tel - (033) 2654-3387/89</p> 
               <p style="text-align:center; font-size:11px;font-weight:bold;padding:0;margin:0;">EMAIL - info@mckv.edu.in - WEB - http://www.mckv.edu.in</p>
            </td>
            <td style="float:right;border-style:none;">
               <img  style="margin-right:0px" src="img/nabet.JPG" height="100px">
            </td>
          </tr>
        </table>
        <hr>
      <div class="topHeader">CERTIFICATE OF CONDUCT & CHARACTER</div> 

      <caption>STUDENT PARTICULARS</caption>
      <table style="margin-top:5px;">
        <tr>
         <th class="title">Name in Full</th>
         <td ColSpan="5">{c.name}</td>
        </tr>
        <tr>
          <th>Standard</th><td>'. {c.standard} . "-" . {c.section}</td>
          <th>Enrol No.</th><td>{c.enroll_number}</td>
          <th>House</th><td>{c.house_name}</td>
        </tr>';
        <tr>
          <th  class="title">Name of Father</th>
          <td ColSpan="5">{c.f_name}</td>
        </tr>
        <tr>
          <th  class="title">Date of Birth</th>
          <td ColSpan="5">{c.dob}</td>
        </tr>
        <tr>
          <th  class="title">Date of Admission to MCKV</th>
          <td ColSpan="5">{c.doa}.'</td>
        </tr>
        <tr>
          <th  class="title">Class in which he took admission</th>
          <td ColSpan="5">{c.admission_for_class}.'</td>
        </tr>
        <tr>
          <th  class="title">Date of  leaving school</th>
          <td ColSpan="5">{c.dol}</td>
        </tr> 
        <tr>
          <th  class="title">Examination appeared for/passed</th>
          <td ColSpan="5">{c.examination_appeared}</td>
        </tr>
        <tr>
          <th  class="title">Conduct</th>
          <td ColSpan="5">{c.conduct}</td>
        </tr>
        <tr>
          <th  class="title">Attendance</th>
          <td ColSpan="5">{c.attendance}</td>
        </tr>
      </table>

      <table>
        <caption style="text-align:left !important;font-size:.8em; !important">Social & Life Skills:</caption>
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

      <table>   
        <tr>
          <th class="title">Remarks if any </th>
          <td>{c.remarks}</td>
        </tr>
      </table>
      <br><br><br>
 
      <table style="border-style:none;margin-top:60px">
        <tr>
           <td class="principal title">___________________<br><span class="principalText">Principal</sapn></td>              
        </tr>
       </table>   
      <table style="border-style:none;margin-top:5px">
        <tr>
           <td class="principal title"></td>
           <td class="profile">(for school profile, see reverse)</td>
           <td class="currentDate title">{c.issue_date}</td>               
        </tr>
       </table>   
      
      <div class='page-break'></div>
    
      <div>
        <center>
          <div class='header'>School Profile</div>
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
            <table style='margin-top:10px;border:none'>
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

  </section>

  
	<script>
	var self = this
    self.on("mount", function(){
      self.loading = false;
      self.view = 'home'
      self.update()
      // flatpickr(".date", {
      //   allowInput: true,
      //   dateFormat: "d/m/Y",
      // })
      self.readClass()
      self.readSection()
    })
    self.on("unmount", function(){
      studentSchoolLeavingStore.off('read_classes_changed',ClassesChanged)
      studentSchoolLeavingStore.off('read_section_changed',SectionChanged)

      studentSchoolLeavingStore.off('read_students_changed',ReadSectionsChanged)
      studentSchoolLeavingStore.off('print_feed_back_form_changed',PrintFeedBackFormChanged)
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
       if(self.refs.standardSelect.value==''){
        toastr.info("Please select standard and try again")
       }else{
        self.tempSections = []
        self.tempSections = self.sections.filter(s=>{
          return s.standard_id==self.refs.standardSelect.value
        })
       }
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


    self.printFeedBackForm = (c,e) =>{
      self.loading = true
      studentSchoolLeavingStore.trigger('print_feed_back_form', c.student_id)
    }

    // ****************************************** all change metods *************************************
    studentSchoolLeavingStore.on('read_classes_changed',ClassesChanged)
    function ClassesChanged(classes){
      self.loading = false
      self.classes = []
      self.classes = classes
      self.update()
      console.log(self.classes)
    }

    studentSchoolLeavingStore.on('read_section_changed',SectionChanged)
    function SectionChanged(sections){
      self.loading = false
      self.sections = []
      self.sections = sections
      self.update()
    }

    /************************************************ students changed Method ************************************************/
    studentSchoolLeavingStore.on('read_students_changed',ReadSectionsChanged)
    function ReadSectionsChanged(students){
      self.loading = false
      self.students = []
      self.students = students
      self.students.map(c => {
          c.selected=false
      })
     
      self.update()
    }

    studentSchoolLeavingStore.on('print_feed_back_form_changed',PrintFeedBackFormChanged)
    function PrintFeedBackFormChanged(students){
      self.loading = false
      self.view='feed-back-form'
      self.printDetails = []
      self.printDetails = students
      self.update()
      
    } 

</script>
</student-school-leaving>