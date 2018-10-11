riot.tag2('roles', '<section class="container is-fluid"> <h2 class="title" style="color: #ff3860;">Roles</h2> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"> <div class="bg-grey h-px flex-auto"></div> </div> </div> <div class="box"> <div class="columns"> <div class="column is-half"> <div class="field"> <label class="label" for="role">Role</label> <div class="control"> <input class="input" type="text" ref="addRoleInput" onkeyup="{addEnter}"> </div> </div> </div> <div class="column is-narrow"> <div class="field"> <div class="control"> <button class="button is-danger has-text-weight-bold adjusted-top" onclick="{add}">{title}</button> </div> </div> </div> </div> </div> <table class="table is-fullwidth is-striped is-hoverable"> <thead> <tr> <th>Role</th> <th></th> </tr> </thead> <tbody> <tr each="{r, i in roleDataItems}"> <td>{r.role}</td> <td class="has-text-right"> <div class="inline-flex rounded border border-grey overflow-hidden" hide="{r.confirmDelete}"> <span><a class="button is-small is-rounded" onclick="{edit.bind(this, r)}">Edit</a></span> <span> <a class="button is-small has-text-danger is-rounded" rel="nofollow" onclick="{confirmDelete}">Delete</a></span> </div> <div class="table-buttons" if="{r.confirmDelete}"> <span disabled="{loading}" class="button is-small is-rounded" onclick="{delete}"><i class="fa fa-check"></i></span> <soan disabled="{loading}" class="button is-small has-text-danger is-rounded" onclick="{cancelOperation}"><i class="fa fa-times"></i></span> </div> </td> </tr> </tbody> </table> </section>', '', '', function(opts) {
"use strict";

var self = this;
self.on("mount", function () {
  self.title = 'Create';
  self.update();
  self.readRoles();
});
self.on("unmount", function () {
  roleStore.off('roles_changed', RolesChanged);
});

//read courses
self.readRoles = function () {
  roleStore.trigger('read_roles');
};

self.add = function () {
  if (!self.refs.addRoleInput.value) {
    toastr.info("Please enter Role and try again");
  } else {
    self.loading = true;
    if (self.title == 'Create') {
      console.log('create');
      roleStore.trigger('add_role', self.refs.addRoleInput.value);
    } else if (self.title == 'Update') {
      console.log('update');
      roleStore.trigger('edit_role', self.refs.addRoleInput.value, self.edit_id);
    }
  }
  //console.log(self.addRoleInput.value)
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
  self.roles.map(function (d) {
    d.confirmDelete = false;
    d.confirmEdit = false;
  });
};

self.confirmDelete = function (e) {
  self.roles.map(function (d) {
    if (d.id != e.item.d.id) {
      d.confirmDelete = false;
    } else {
      d.confirmDelete = true;
    }
  });
};

self.delete = function (e) {
  self.loading = true;
  roleStore.trigger('delete_role', e.item.r.id);
};

self.edit = function (r, e) {
  console.log(r);
  self.title = 'Update';
  self.refs.addRoleInput.value = r.role;
  self.edit_id = r.id;
};

roleStore.on('roles_changed', RolesChanged);
function RolesChanged(roles) {
  console.log('roles_changed1');
  console.log(roles);
  self.title = 'Create';
  self.refs.addRoleInput.value = '';
  self.loading = false;
  self.roles = roles;
  self.roleDataItems = [];
  self.roleDataItems = roles;
  self.update();
  console.log(self.roleDataItems);
  console.log('self.roleDataItems');
}
});