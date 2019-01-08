<event-master>
	<div class="field has-addons no-print">
	  	<p class="control">
		    <a class="button {is-active: selected_event_master == 'event-type'}" href="#/master/event-master/event-type">
		      <span>Event Type</span>
		    </a>
	  	</p>
		<p class="control">
		      <a class="button {is-active: selected_event_master == 'new-event' }" href="#/master/event-master/new-event">
		      <span>Event</span>
		      </a>
		</p>
	    <p class="control">
		    <a class="button {is-active: selected_event_master == 'class-holiday'}" href="#/master/event-master/class-holiday">
		      <span>Class Holiday</span>
		    </a>
	  	</p>
    </div>
<div id="event-master-view"></div>
 <script>
    var self = this
    console.log('opts.selected_event_master')
    console.log(opts.selected_event_master)
    if(!opts.selected_event_master){
      self.selected_event_master = 'event-type'
    }else{
      self.selected_event_master = opts.selected_event_master
    }
  </script>
</event-master>


