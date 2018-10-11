riot.tag2('employee-by-department-report', '<section class="container is-fluid"> <div class="level"> <div class="level-left"> <h2 class="title" style="color: #ff3860;">Employees By Department</h2> </div> </div> <div class="flex items-center mt-2 mb-6 no-print"> <div class="bg-green py-1 rounded w-10"></div> <div class="bg-grey h-px flex-auto"></div> </div> <canvas id="canvas_pie"></canvas> <table class="table is-fullwidth is-striped is-hoverable is-bordered"> <thead> <tr> <th class="slno">#</th> <th>Department</th> <th class="has-text-right">Strength</th> </tr> </thead> <tbody> <tr each="{cd, i in chart_data}"> <td>{i+1}</td> <td>{cd.department_full_name}</td> <td class="has-text-right">{cd.employee_count}</td> </tr> <tr> <td></td> <td>Total</td> <td class="has-text-right">{total}</td> </tr> </tbody> </table> </section>', '', '', function(opts) {
"use strict";

var self = this;
self.on("mount", function () {
		self.update();
		self.readEmployee();
});

self.readEmployee = function () {
		employeeReportStore.trigger('read_employee_by_department');
};

self.on("unmount", function () {
		employeeReportStore.off('epmloyee_by_department_changed', EmployeeByDepartmentChanged);
});

employeeReportStore.on('epmloyee_by_department_changed', EmployeeByDepartmentChanged);
function EmployeeByDepartmentChanged(c, total) {
		self.loading = false;
		self.chart_data = [];
		self.chart_data = c;
		self.total = total;

		var chartColors = ['#e3342f', '#F6993F', '#F2D024', '#1F9D55', '#2779BD', '#9561E2', '#B8C2CC', '#fff'];

		var labels = [];
		var chart_percentage = [];
		var backgroundColor = [];

		for (var i = self.chart_data.length - 1; i >= 0; i--) {
				var total_percentage = self.chart_data[i].employee_count * 100 / self.total;
				var percentage = self.chart_data[i].department_full_name + ' ( ' + total_percentage + '% )';

				labels.push(percentage);
				chart_percentage.push(self.chart_data[i].employee_count);
				if (typeof chartColors[i] != "undefined") {
						backgroundColor.push(chartColors[i]);
				}
		}

		console.log(labels);
		console.log(chart_percentage);

		var config = {
				type: 'pie',
				data: {
						datasets: [{
								data: chart_percentage,
								backgroundColor: backgroundColor,
								label: 'labels'
						}],
						labels: labels
				},
				options: {
						responsive: true
				}
		};

		var ctx = document.getElementById('canvas_pie').getContext('2d');
		window.myPie = new Chart(ctx, config);

		self.update();
}
});