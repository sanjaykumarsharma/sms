<class-holiday>
   <header></header>
  <loading-bar if={loading}></loading-bar>
  <section class="is-fluid" show={class_holiday_view =='show_holiday'}>
  <div class="level no-print">
    <div class="level-left">
      <h2 class="title" style="color: #ff3860;">Class Holiday</h2>
    </div>
    <div class="level-right">
        <input class="input" ref="searchClassHoliday" onkeyup={filteredClassHoliday} type="text" style="width:200px;margin-right:5px;" placeholder="Search" >
      <button class="button is-warning is-rounded  is-small ml5" onclick={add_class_holiday}>
      <span class="icon">
        <span class="fas fa-plus"></span>
      </span>
      </button>
      <button class="button is-info is-rounded is-pulled-right  is-small ml5" onclick={readClassHoliday} style="margin-right:5px;margin-left:5px">
          <span class="icon">
            <span class="fas fa-sync-alt"></span>
          </span>
          </button>

           <button class="button is-primary has-text-weight-bold is-pulled-right  is-small ml5" onclick="window.print()" title="Print">
                  <span class="icon">
                     <i class="fas fa-print"></i>
                 </span>
        </button>
          <button class="button is-success has-text-weight-bold is-small ml5 is-pulled-right" onclick={downloadCSV} title="Excel Down Load">
              <span class="icon">
                  <i class="far fa-file-excel"></i>
              </span>
          </button>
         
    </div>
  </div>

  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Event</th>
          <th>Class</th>
          <th>Date From</th>
          <th>Date To</th>
          <th>Holiday</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr each={st, i in filteredClassHolidays}>
          <td>{i+1}</td>
          <td>{st.event_name}</td>
          <td>{st.class}</td>
          <td>{st.s_date}</td>
          <td>{st.e_date}</td>
          <td>{st.holiday}</td>
          <td>{st.description}</td>
          <td class="has-text-right no-print">
            <div class="inline-flex rounded border border-grey overflow-hidden" hide={st.confirmDelete}>
              <span><a class="button is-small is-rounded" onclick={edit.bind(this, st)}>Edit</a></span>
              <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick={confirmDelete}>Delete</a></span>
            </div>
            <div class="table-buttons" if={st.confirmDelete}>
              <span disabled={loading} class="button is-small is-rounded" onclick={delete}><i class="fa fa-check" ></i></span>
              <soan disabled={loading} class="button is-small  has-text-danger is-rounded" onclick={cancelOperation}><i class="fa fa-times"></i></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</section>
<section class="is-fluid" show={class_holiday_view =='add_class_holiday'}>
  <div class="label">
    <div class="level-left">
      <h2 class="title" style="color: #ff3860;">{title} Class Holiday</h2>
    </div>
    <div class="level-right">
      <button class="button" onclick={close_class_holiday}>Back</button>
    </div>
  </div>
  <div class="box">
    <div class="columns is-variable is-1 is-multiline">
    	<div class="column is-one-third">
        <label class="label">Event Name</label>
       		<input type="text" ref="event_name" type="text" class="input">
        </div>
      <div class="column is-one-third">
      <label class="label" for="class">Class</label>
        <div class="control">
            <div class="select is-fullwidth">
            <select ref="section_id">
              <option each={standards} value={section_id}>{class}
                            </option>
            </select>
          </div>
            </div>
        </div>
        
        <div class="column is-one-third">
         <label class="label">Date From</label>
        <input class="input date flatpickr-input form-control input"  ref="start_date" placeholder="" tabindex="0" 
        type="text">
        </div>
        <div class="column is-one-third">
         <label class="label">Date To</label>
        <input class="input date flatpickr-input form-control input"  ref="end_date" placeholder="" tabindex="0" 
        type="text">
        </div>
        <div class="column is-one-third">
         <label class="label">Description</label>
        <textarea class="input" ref="description" rows="2" 
        type="text"></textarea> 
        </div>
         <div class="column is-one-third">
         <label class="label">Holiday</label>
               <input type="checkbox" id="holiday_check_box">
          </div>
    <div class="column is-full">
    <button class="button is-danger has-text-weight-bold adjusted-top" onclick={add} >{title}</button>    
   </div>
  </div>
  </div>
</section>
 
  <!-- student profile end -->
<script>
   var self = this
     self.on("mount", function(){
       self.title='Create'
       self.role = getCookie('role')
       self.update()
      // self.holiday_view='show_holiday'
       self.readStandard()
        self.readClassHoliday()
       self.class_holiday_view='show_holiday'
       flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })
     })
     self.on("unmount", function(){
       classholidayStore.off('add_class_holiday_changed', AddClassHolidayChanged)
       classholidayStore.off('read_class_holiday_changed', ReadClassHolidayChanged)
     //  classholidayStore.off('read_new_event_changed',NewEventChanged)
       classholidayStore.off('read_standard_changed',standardChanged)
       classholidayStore.off('edit_class_holiday_changed',EditClassHolidayChanged)
       classholidayStore.off('delete_class_holiday_changed',DeleteClassHolidayChanged)
       classholidayStore.off('csv_export_class_holiday_changed',csv_export_class_holidayChanged)
     })

     self.downloadCSV = () =>{
          classholidayStore.trigger('csv_export_class_holiday')
        //  console.log(obj)
    }

      self.filteredClassHoliday = ()=>{
        self.filteredClassHolidays = self.classHolidays.filter(c => {
          return JSON.stringify(c).toLowerCase().indexOf(self.refs.searchClassHoliday.value.toLowerCase())>=0
        })
      } 

     //read courses
     self.readNewEvent = () => {
        classholidayStore.trigger('read_new_event')
     }
      self.readStandard = () => {
        classholidayStore.trigger('read_standard')
     }

     self.add_class_holiday = () => {
        self.class_holiday_view='add_class_holiday'
       // self.holiday_view=''
     }
    self.close_class_holiday = () => {
        self.class_holiday_view='show_holiday'
        // self.class_holiday_view=''
        self.readClassHoliday()
    }

    // read employe_roles
     self.readClassHoliday = () => {
      self.loading=true
        classholidayStore.trigger('read_class_holiday')
     }

      self.add = () => {
      	if($('#holiday_check_box').is(":checked")){
      		self.holiday='Y';
      	}else{
      		self.holiday='N';
      	}
       if(!self.refs.event_name.value){
         toastr.info("Please enter Event and try again")
       }else{
         self.loading = true
         if(self.title=='Create'){
           console.log('create')
           classholidayStore.trigger('add_class_holiday', self.refs.event_name.value,
            self.refs.section_id.value,self.refs.start_date.value,self.refs.end_date.value,self.refs.description.value,self.holiday)
         }else if(self.title=='Update'){
           console.log('update')
           classholidayStore.trigger('edit_class_holiday',  self.refs.event_name.value,
            self.refs.section_id.value,self.refs.start_date.value,self.refs.end_date.value,self.refs.description.value,self.holiday,self.edit_id)
         }
       }
     }

     self.addEnter = (e) => {
       if(e.which == 13){
         self.add()
       }
     }

      self.editEnter = (e) => {
       if(e.which == 13){
         self.edit(e)
       }  
     }

    self.cancelOperation = (e) => {
       self.classHolidays.map(ev => {
           ev.confirmDelete = false
           ev.confirmEdit = false
       })
     }

     self.confirmDelete = (e) => {
     	console.log(e.item.st.event_id)
     	console.log("+++++++++++++")
       self.classHolidays.map(ev => {
       	console.log(ev.event_id)
         if(ev.event_id != e.item.st.event_id){
           ev.confirmDelete = false
         }else{
           ev.confirmDelete = true
         }
       })
     }

     self.delete = (e) => {
       self.loading = true
       classholidayStore.trigger('delete_class_holiday', e.item.st.event_id)
     }

     self.edit = (ev,e) => {
       console.log(ev)
       self.title='Update'
        flatpickr(".date", {
         allowInput: true,
         altFormat: "d/m/Y",
         dateFormat: "Y-m-d",
       })

       self.class_holiday_view='add_class_holiday'
       self.refs.event_name.value = ev.event_name
       self.refs.start_date.value = ev.start_date
       console.log(self.refs.start_date.value)
       self.refs.end_date.value = ev.end_date
       self.refs.description.value = ev.description
       self.refs.section_id.value = ev.section_id
       console.log(ev.holiday);
       if(ev.holiday=='Y'){
       	 $('#holiday_check_box').prop('checked',true)
       }else{
       	 $('#holiday_check_box').prop('checked',false)
       }
       self.edit_id = ev.event_id
     }
    
     classholidayStore.on('add_class_holiday_changed',AddClassHolidayChanged)
     function AddClassHolidayChanged(classHolidays){
       console.log(classHolidays) 
       self.title='Create'
       self.refs.start_date.value =''
       self.refs.end_date.value =''
       self.refs.description.value =''
      // self.refs.new_event_id.value =''
       self.refs.section_id.value =''
       self.loading = false
       self.classHolidays = classHolidays
       self.update()
       self.readClassHoliday()
       console.log(self.classHolidays)
     }

     classholidayStore.on('edit_class_holiday_changed',EditClassHolidayChanged)
     function EditClassHolidayChanged(classHolidays){
       console.log(classHolidays) 
       self.title='Create'
       self.refs.start_date.value =''
       self.refs.end_date.value =''
       self.refs.description.value =''
       //self.refs.new_event_id.value =''
       self.refs.section_id.value =''
       self.loading = false
       self.classHolidays = classHolidays
       self.update()
       self.readClassHoliday()
      // console.log(self.empsectionsloye_roles)
     }

     classholidayStore.on('delete_class_holiday_changed',DeleteClassHolidayChanged)
     function DeleteClassHolidayChanged(classHolidays){
       console.log(classHolidays) 
       self.title='Create'
       self.refs.start_date.value =''
       self.refs.end_date.value =''
       self.refs.description.value =''
       self.refs.event_name.value =''
       self.refs.section_id.value =''
       self.loading = false
       self.classHolidays = classHolidays
       self.update()
       self.readClassHoliday()
       console.log(self.classHolidays)
     }

     classholidayStore.on('read_class_holiday_changed',ReadClassHolidayChanged)
     function ReadClassHolidayChanged(classHolidays){
       console.log(classHolidays) 
       self.title='Create'
       self.refs.start_date.value =''
       self.refs.end_date.value =''
       self.refs.description.value =''
       self.refs.event_name.value =''
       self.refs.section_id.value =''
       self.loading = false
       self.classHolidays = classHolidays
       self.filteredClassHolidays = classHolidays
       self.update()
       console.log(self.classHolidays)
     }

    /* classholidayStore.on('read_new_event_changed',NewEventChanged)
     function NewEventChanged(newEvents){
       console.log(newEvents) 
       self.newEvents = newEvents
       self.update()
       console.log(self.newEvents)
     }*/
     classholidayStore.on('read_standard_changed',standardChanged)
     function standardChanged(standards){
       console.log(standards) 
       self.standards = standards
       self.update()
       console.log(self.standards)
     }

     classholidayStore.on('csv_export_class_holiday_changed',csv_export_class_holidayChanged)
    function csv_export_class_holidayChanged(url){
      var open_url = window.location.origin+url 
      window.open(open_url);
      self.loading = false
      self.update()
    }

</script>
</class-holiday>