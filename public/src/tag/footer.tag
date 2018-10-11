<!-- <footer class="footer no-print" if={showFooter}>
  <div class="container is-fluid">
    <div class="level">
      <div class="level-left">
        <h3 class="has-text-weight-bold has-text-success is-size-4">Sarthak</h3>
      </div>
      <div class="level-right">
        <div class="level-item">
          Made in India with <span class="icon has-text-danger"><span class="fas fa-heart"></span></span>
        </div>
      </div>
    </div>
  </div>


<script>
  var self = this
  /*console.log('opts.selected_nav_item')
    console.log(opts.selected_nav_item)*/
    if(!opts.selected_nav_item){
      self.selected_nav_item = 'login'
      self.showFooter=false
    }else{
      self.selected_nav_item = opts.selected_nav_item
      if(self.selected_nav_item == 'login'){
        self.showFooter=false
      }else{
        self.showFooter=true
      }
      
    }

     RiotControl.on('login_changed_footer', function(login_status) {
      console.log("calling me in footer tag")
      if(login_status.role!='FAIL'){
        self.showFooter=true
      }
      self.update()
    });

</script>


</footer> -->