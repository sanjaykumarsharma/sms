<discipline-detail>
  <print-header></print-header>
  <loading-bar if={loading}></loading-bar>
	<section class=" is-fluid" show={discipline_view =='show_discipline'}>
    <h2 class="title has-text-centered is-size-5" style="color: #ff3860;">Discipline Detail</h2>
		<div class="level box no-print">
      <div class="level-left">
        <div class="columns">
          <div class="column is-narrow"><label class="label">Category</label></div> 
          <div class="column is-narrow">
          <div class="control">
            <div class="select">
              <select ref="category_id" id="CategoryName" onchange={getDisciplineData}>
                <option value="-1">ALL</option>
                <option each={categories} value={category_id}>{category_name}</option>
              </select>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="level-right">
        <div class="control">
          <input class="input" ref="searchDisciplineDetail" onkeyup={filterDisciplineDetail} type="text" placeholder="Search By Enroll No or Name">
        </div>
        <button class="button is-warning has-text-weight-bold ml5" onclick={add_new_discipline}>
          <span class="icon">
            <span class="fas fa-plus"></span>
          </span>
        </button>
        <button class="button is-link has-text-weight-bold ml5" onclick={getDisciplineData}>
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
        </button>
        <button class="button is-success has-text-weight-bold ml5" onclick={downloadCSV}>
          <span class="icon">
            <i class="far fa-file-excel"></i>
          </span>
        </button>
        <a class="button is-primary has-text-weight-bold ml5" onclick="window.print()">
          <span class="icon">
            <i class="fas fa-print"></i>
          </span>
        </a> 
      </div>
    </div>
		<table class="table is-fullwidth is-bordered is-hoverable is-narrow print-discipline">
      <p><center><strong>Category:{categoryName}</strong></center></p>
			<thead>
				<tr>
          <th>SL No</th>
          <th>Referred by</th>
          <th>Recorded by</th>
					<th>Name</th>
					<th>Enroll No</th>
					<th>Class</th>
					<th>Case</th>
					<th>Date</th>
					<th>Diagnosis</th>
					<th>Suggestion</th>
					<th style="width: 100px;" class="no-print"></th>
				</tr>
			</thead>
			<tbody>
				<tr each={ac, i in filteredDisciplineDetail }>
          <td>{i + 1}</td>
					<td>{ac.referred_by}</td>
					<td>{ac.created_by}</td>
					<td>{ac.student_name}</td>
					<td>{ac.enroll_number}</td>
					<td>{ac.standard}</td>
					<td>{ac.case_name}</td>
					<td>{ac.consult_date}</td>
					<td>{ac.diagnosis}</td>
					<td>{ac.remarks}</td>
					<td class="has-text-right no-print">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={ac.confirmDelete}>
              <span><a class="button is-small " onclick={edit.bind(this, ac.id)} title="Edit">
                <i class="fa fa-edit" aria-hidden="true"></i></a></span>
              <span if={role=='ADMIN'}> <a class=" button is-small" rel="nofollow" onclick={confirmDelete} title="Delete">
                <i class="fa fa-trash" aria-hidden="true"></i></a></span>
            </div>
            <div class="table-buttons" if={ac.confirmDelete}>
              <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" aria-hidden="true"></i></span>
              <span disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
            </div>
          </td>
				</tr>
			</tbody>
		</table>
	</section>
	<section class=" is-fluid" show={discipline_view =='add_discipline'}>
		<div class="level">
      <div class="level-left">
        <div class="level-item">
          <h2 class="title is-size-5" style="color: #ff3860;">{title} Detail</h2>
        </div>
      </div>
      <div class="level-right">
        <button class="button is-warning is-rounded is-small" onclick={close_new_discipline}>
          <span class="icon">
            <span class="fas fa-arrow-left"></span>
          </span>
        </button>
      </div>
    </div>

    <div class="box">
      <div class="columns">
        <div class="column is-2">
          <label class="label is-small" for="disciplineReferredInput">Referred by</label>
        </div>
        <div class="column is-2">
          <div class="select is-fullwidth is-small">
            <select ref="disciplineReferredInput" id="disciplineReferredInput">
              <option value="Class Monitor">Class Monitor</option>
              <option value="Class Teacher">Class Teacher</option>
              <option value="Discipline Cell">Discipline Cell</option>
              <option value="Out Sider">Out Sider</option>
              <option value="Parent">Parent</option>
              <option value="School Authority">School Authority</option>
              <option value="Student Directly">Student Directly</option>
              <option value="Subject Teacher">Subject Teacher</option>
            </select>
          </div>
        </div>
        <div class="column is-2">
          <label class="label is-small" for="disciplineEnrollInput">Enroll No</label>
        </div>
        <div class="column is-2 ">
          <input class="input is-small" ref="disciplineEnrollInput" type="text">
        </div>
        <div class="column is-2">
          <label class="label is-small" for="disciplineCategoryidInput">Category</label>
        </div>
        <div class="column is-2">
          <div class="select is-fullwidth is-small">
            <select ref="disciplineCategoryidInput" onchange={readCategoryCase}>
              <option each={categories} value={category_id}>{category_name}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="columns mt30">
        <div class="column is-2">
          <label class="label is-small" for="discipline_case_id">Case</label>
        </div>
        <div class="column is-2">
          <div class="select is-fullwidth is-small">
            <select ref="discipline_case_id">
              <option each={cases} value={case_id}>{case_name}</option>
            </select>
          </div>
        </div>
        <div class="column is-2">
          <label class="label is-small" for="disciplineDateInput">Date</label>
        </div>
        <div class="column is-2 ">
          <input class="input date is-small" type="text" ref="disciplineDateInput" readonly>
        </div>
        <div class="column is-2">
          <label class="label is-small" for="disciplineDiagnosisInput">Diagnosis</label>
        </div>
        <div class="column is-2">
          <input class="input is-small" ref="disciplineDiagnosisInput"  type="text">
        </div>
      </div>

      <div class="columns mt30">
        <div class="column is-2">
          <label class="label is-small" for="disciplineRemarksInput">Suggestion</label>
        </div>
        <div class="column is-4">
          <textarea class="textarea is-small" ref="disciplineRemarksInput" rows="3"></textarea>
        </div>
      </div>
      <div class="columns mt60">
        <div class="column is-full">
          <button class="button is-success has-text-weight-bold adjusted-top" 
            onclick={add}>Submit
          </button>
          <button class="button is-danger has-text-weight-bold adjusted-top" 
            onclick={close_new_discipline}>Cancel
          </button>    
        </div>
      </div>
    </div>
  </section>

<script>
	var self = this
    self.on("mount", function(){
    self.loading = false;
    self.title='Add'
    self.discipline_view = 'show_discipline'
    self.role = getCookie('role')
    self.update()
    flatpickr(".date", {
      allowInput: true,
      dateFormat: "d/m/Y",
    })
    self.readCategories()
    self.readCase()
    })

    self.on("unmount", function(){
      disciplinedetailStore.off('read_discipline_categories_changed',CategoriesChanged)
      disciplinedetailStore.off('read_case_changed',CaseChanged)
      disciplinedetailStore.off('read_discipline_changed',ReadDisciplineChanged)
      disciplinedetailStore.off('add_discipline_detail_changed',DisciplineChanged)
      disciplinedetailStore.off('read_for_edit_discipline_changed',ReadDisciplineForEditChanged)
      disciplinedetailStore.off('edit_discipline_detail_changed',EditDisciplineChanged)
      disciplinedetailStore.off('delete_discipline_detail_changed',DeleteDisciplineDetailsChanged)
    })

    self.readCategories = () =>{
      disciplinedetailStore.trigger('read_discipline_categories')
    }
    self.readCategoryCase = () => {
    	self.cases = []
    	self.cases = self.discipline_case.filter(c => {
          return c.category_id == self.refs.disciplineCategoryidInput.value
        }) 
    }

    self.readCase = () =>{
      disciplinedetailStore.trigger('read_discipline_case')
    }

    self.getDisciplineData = () =>{
      self.loading = true;
      disciplinedetailStore.trigger('read_discipline', self.refs.category_id.value)
    }

    self.downloadCSV = () =>{
      disciplinedetailStore.trigger('csv_export_discipline', self.refs.category_id.value)
    }

    self.add_new_discipline = () =>{
    	self.discipline_view='add_discipline'
    	self.title='Add'
    	self.clearForm()
    	self.update()
    }

     self.close_new_discipline = () =>{
    	self.discipline_view='show_discipline'
    	self.update()
    }

    self.edit = (c,ac) => {
      console.log(c)
      self.id = c
      disciplinedetailStore.trigger('read_for_edit_discipline',self.id)
      self.discipline_view='add_discipline'
      self.title='Update' 
    }

    self.cancelOperation = (ac) => {
      self.disciplines.map(c => {
        c.confirmDelete = false
        c.confirmEdit = false
      })
    }
    self.confirmDelete = (ac) => {
      self.disciplines.map(c => {
        if(c.id != ac.item.ac.id){
          c.confirmDelete = false
        }else{
          c.confirmDelete = true
        }
      })
    }

    self.delete = (ac) => {
      self.loading = true
      disciplinedetailStore.trigger('delete_discipline_detail', ac.item.ac.id)
    }

    self.add = () => {
    	if(!self.refs.disciplineEnrollInput.value){
       	toastr.info("Please enter Enroll No. and try again")
      }else if(!self.refs.disciplineCategoryidInput.value){
        toastr.info("Please Select Category and try again")
      }else if(!self.refs.disciplineDateInput.value){
        toastr.info("Please enter Date and try again")
      }else{
       	var obj={}
       	obj['referred_by']=self.refs.disciplineReferredInput.value
       	obj['enroll_number']=self.refs.disciplineEnrollInput.value
       	obj['category_id']=self.refs.disciplineCategoryidInput.value
       	obj['case_id']=self.refs.discipline_case_id.value
       	obj['consult_date']=convertDate(self.refs.disciplineDateInput.value)
       	obj['diagnosis']=self.refs.disciplineDiagnosisInput.value
       	obj['remarks']=self.refs.disciplineRemarksInput.value
     	  if(self.title=='Add'){
          disciplinedetailStore.trigger('add_discipline_detail', obj)
        }else if(self.title=='Update'){
          disciplinedetailStore.trigger('edit_discipline_detail', obj,self.edit_id)
          console.log(obj)
          self.discipline_view='show_discipline'
          }
        }
    }
    self.clearForm = () =>{
    	self.refs.disciplineReferredInput.value = 'Class Monitor'
	    self.refs.disciplineEnrollInput.value = ''
	    self.refs.disciplineDateInput.value = ''
	    self.refs.disciplineDiagnosisInput.value = ''
	    self.refs.disciplineRemarksInput.value = ''
      self.readCategories()
      self.readCategoryCase()
    }

    self.filterDisciplineDetail = ()=>{
      self.filteredDisciplineDetail = self.disciplines.filter(c => {
        var filter_value=c.student_name + c.enroll_number;
        return JSON.stringify(filter_value).toLowerCase().indexOf(self.refs.searchDisciplineDetail.value.toLowerCase())>=0
      })
    }

    disciplinedetailStore.on('read_discipline_categories_changed',CategoriesChanged)
    function CategoriesChanged(categories){
      console.log(categories) 
      self.categories = categories
      self.update()
      self.getDisciplineData()
    }

    disciplinedetailStore.on('read_discipline_case_changed',CaseChanged)
    function CaseChanged(discipline_case){
      console.log(discipline_case) 
      self.discipline_case = discipline_case
      self.update()
    }

    disciplinedetailStore.on('read_discipline_changed',ReadDisciplineChanged)
    function ReadDisciplineChanged(disciplines){
      self.loading = false;
      self.disciplines = disciplines
      self.filteredDisciplineDetail = disciplines
      self.categoryName = $("#CategoryName option:selected").text();
      if(self.disciplines.length==0){
        toastr.info("No Data Found")
      }
      self.update()
     }

    disciplinedetailStore.on('add_discipline_detail_changed',DisciplineChanged)
    function DisciplineChanged(disciplines){
      console.log(disciplines) 
      self.disciplines = disciplines
      self.discipline_view='show_discipline'
      self.getDisciplineData()
      self.filteredDisciplineDetail = disciplines
      self.update()
    }

    disciplinedetailStore.on('read_for_edit_discipline_changed',ReadDisciplineForEditChanged)
    function ReadDisciplineForEditChanged(discipline_details){
      console.log(discipline_details) 
      self.discipline_details = discipline_details
      self.refs.disciplineReferredInput.value = discipline_details[0].referred_by
      self.refs.disciplineEnrollInput.value = discipline_details[0].enroll_number
      self.refs.disciplineCategoryidInput.value = discipline_details[0].category_id
      self.cases = []
	    self.cases = self.discipline_case.filter(c => {
	     return c.category_id == discipline_details[0].category_id
	    })
      self.refs.disciplineDateInput.value = discipline_details[0].consult_date
      self.refs.disciplineDiagnosisInput.value = discipline_details[0].diagnosis
      self.refs.disciplineRemarksInput.value = discipline_details[0].remarks
      self.edit_id = discipline_details[0].id
      self.update()
      self.refs.discipline_case_id.value = discipline_details[0].case_id
      console.log(self.discipline_details)
     }

    disciplinedetailStore.on('edit_discipline_detail_changed',EditDisciplineChanged)
    function EditDisciplineChanged(disciplines){
      console.log(disciplines) 
      self.disciplines = disciplines
      self.getDisciplineData()
      self.filteredDisciplineDetail = disciplines
      self.update()
    }

    disciplinedetailStore.on('delete_discipline_detail_changed',DeleteDisciplineDetailsChanged)
    function DeleteDisciplineDetailsChanged(delete_discipline_details){
      self.getDisciplineData()

      self.update()
     }
</script>
</discipline-detail>