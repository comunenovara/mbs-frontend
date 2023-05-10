import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MbsWorkLibModule, MBS_WORK_ENDPOINT } from '@mbs-work';
import { EngeCommonAppModule } from '@enge/common-app';

import { ChipModule } from 'primeng/chip';

import { enzoMbsWorkRoutes } from './mbs-work.route';

import { EnzoProjectListPageComponent } from './components/project/project-list-page/project-list-page.component';
import { EnzoProjectDetailPageComponent } from './components/project/project-detail-page/project-detail-page.component';
import { EnzoProjectDialogComponent } from './components/project/project-dialog/project-dialog.component';
import { EnzoRoleListPageComponent } from './components/role/role-list-page/role-list-page.component';
import { EnzoRoleDetailPageComponent } from './components/role/role-detail-page/role-detail-page.component';
import { EnzoRoleDialogComponent } from './components/role/role-dialog/role-dialog.component';
import { EnzoWorkCategoryListPageComponent } from './components/work-category/work-category-list-page/work-category-list-page.component';
import { EnzoWorkCategoryDetailPageComponent } from './components/work-category/work-category-detail-page/work-category-detail-page.component';
import { EnzoWorkCategoryDialogComponent } from './components/work-category/work-category-dialog/work-category-dialog.component';
import { EnzoEmployeeListPageComponent } from './components/employee/employee-list-page/employee-list-page.component';
import { EnzoEmployeeDetailPageComponent } from './components/employee/employee-detail-page/employee-detail-page.component';
import { EnzoEmployeeDialogComponent } from './components/employee/employee-dialog/employee-dialog.component';
import { EnzoCompanyListPageComponent } from './components/company/company-list-page/company-list-page.component';
import { EnzoCompanyDetailPageComponent } from './components/company/company-detail-page/company-detail-page.component';
import { EnzoCompanyDialogComponent } from './components/company/company-dialog/company-dialog.component';
import { EnzoAssignementListPageComponent } from './components/assignement/assignement-list-page/assignement-list-page.component';
import { EnzoAssignementDetailPageComponent } from './components/assignement/assignement-detail-page/assignement-detail-page.component';
import { EnzoAssignementDialogComponent } from './components/assignement/assignement-dialog/assignement-dialog.component';
import { AssignementTableComponent } from './components/assignement/assignement-table/assignement-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
	imports: [ 
		RouterModule.forChild(enzoMbsWorkRoutes),
		MbsWorkLibModule,
		EngeCommonAppModule,
		ChipModule,
		
	],
	declarations: [
		EnzoProjectListPageComponent,
		EnzoProjectDetailPageComponent,
		EnzoProjectDialogComponent,
		
		EnzoRoleListPageComponent,
		EnzoRoleDetailPageComponent,
		EnzoRoleDialogComponent,
		
		EnzoWorkCategoryListPageComponent,
		EnzoWorkCategoryDetailPageComponent,
		EnzoWorkCategoryDialogComponent,
		
		EnzoEmployeeListPageComponent,
		EnzoEmployeeDetailPageComponent,
		EnzoEmployeeDialogComponent,
		
		EnzoCompanyListPageComponent,
		EnzoCompanyDetailPageComponent,
		EnzoCompanyDialogComponent,
		
		EnzoAssignementListPageComponent,
		EnzoAssignementDetailPageComponent,
		EnzoAssignementDialogComponent,
		AssignementTableComponent,
		

		DashboardComponent,
		
	],
	providers: [
		{
			provide: MBS_WORK_ENDPOINT,
			useValue: 'http://10.1.20.20:82/mbs/work'
		},
	]
})
export class EnzoMbsWorkModule {}