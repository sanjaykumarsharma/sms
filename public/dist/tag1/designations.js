riot.tag2('designations', '<section class="container is-fluid"> <h2 class="title" style="color: #ff3860;">Designations</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="designation">Designation</label> <div class="control"> <input class="input" type="text" ref="addDesignationInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>Designation</th> <th></th> </tr> </thead> <tbody> <tr each="{d, i in designationDataItems}"> <td>{d.designation}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{d.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, d)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{d.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
"use strict";

var self = this;
self.on("mount", function () {
  self.title = 'Create';
  self.update();
  self.readDesignations();
});

self.on("unmount", function () {
  designationStore.off('designations_changed', DesignationsChanged);
});

//read courses
self.readDesignations = function () {
  designationStore.trigger('read_designations');
};

self.add = function () {
  if (!self.refs.addDesignationInput.value) {
    toastr.info("Please enter Designation and try again");
  } else {
    self.loading = true;
    if (self.title == 'Create') {
      console.log('create');
      designationStore.trigger('add_designation', self.refs.addDesignationInput.value);
    } else if (self.title == 'Update') {
      console.log('update');
      designationStore.trigger('edit_designation', self.refs.addDesignationInput.value, self.edit_id);
    }
  }
};

self.addEnter = function (e) {
  if (e.which == 13) {
    self.add();
  }
};

self.editEnter = function (e) {
  if (e.which == 13) {
    self.edit(e);
  }
};

self.cancelOperation = function (e) {
  self.designations.map(function (d) {
    d.confirmDelete = false;
    d.confirmEdit = false;
  });
};

self.confirmDelete = function (e) {
  self.designations.map(function (d) {
    if (d.id != e.item.d.id) {
      d.confirmDelete = false;
    } else {
      d.confirmDelete = true;
    }
  });
};

self.delete = function (e) {
  self.loading = true;
  designationStore.trigger('delete_designation', e.item.d.id);
};

self.edit = function (d, e) {
  console.log(d);
  self.title = 'Update';
  self.refs.addDesignationInput.value = d.designation;
  self.edit_id = d.id;
};

designationStore.on('designations_changed', DesignationsChanged);
function DesignationsChanged(designations) {
  console.log('designations_changed1');
  console.log(designations);
  self.title = 'Create';
  self.refs.addDesignationInput.value = '';
  self.loading = false;
  self.designations = designations;
  self.designationDataItems = [];
  self.designationDataItems = designations;
  self.update();
  console.log(self.designationDataItems);
  console.log('self.designationDataItems');
}
});