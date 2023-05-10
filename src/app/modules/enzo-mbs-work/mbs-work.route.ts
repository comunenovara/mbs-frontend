import { Route } from '@angular/router';

import { MbsProjectResolver } from '@mbs-work/resolvers/project.resolver';
import { EnzoProjectListPageComponent } from './components/project/project-list-page/project-list-page.component';
import { EnzoProjectDetailPageComponent } from './components/project/project-detail-page/project-detail-page.component';
import { MbsRoleResolver } from '@mbs-work/resolvers/role.resolver';
import { EnzoRoleListPageComponent } from './components/role/role-list-page/role-list-page.component';
import { EnzoRoleDetailPageComponent } from './components/role/role-detail-page/role-detail-page.component';
import { MbsWorkCategoryResolver } from '@mbs-work/resolvers/work-category.resolver';
import { EnzoWorkCategoryListPageComponent } from './components/work-category/work-category-list-page/work-category-list-page.component';
import { EnzoWorkCategoryDetailPageComponent } from './components/work-category/work-category-detail-page/work-category-detail-page.component';
import { MbsEmployeeResolver } from '@mbs-work/resolvers/employee.resolver';
import { EnzoEmployeeListPageComponent } from './components/employee/employee-list-page/employee-list-page.component';
import { EnzoEmployeeDetailPageComponent } from './components/employee/employee-detail-page/employee-detail-page.component';
import { MbsCompanyResolver } from '@mbs-work/resolvers/company.resolver';
import { EnzoCompanyListPageComponent } from './components/company/company-list-page/company-list-page.component';
import { EnzoCompanyDetailPageComponent } from './components/company/company-detail-page/company-detail-page.component';
import { MbsAssignementResolver } from '@mbs-work/resolvers/assignement.resolver';
import { EnzoAssignementListPageComponent } from './components/assignement/assignement-list-page/assignement-list-page.component';
import { EnzoAssignementDetailPageComponent } from './components/assignement/assignement-detail-page/assignement-detail-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const enzoMbsWorkRoutes: Route[] = [
	{
		path: '', 
		pathMatch : 'full',
		redirectTo: 'dashboard'
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
	},
	{
		path: 'project',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoProjectListPageComponent,
			},
			{
				path: 'detail/:id',
				component: EnzoProjectDetailPageComponent,
				resolve: {
					project: MbsProjectResolver,
				},
			},
		]
	},
	{
		path: 'role',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoRoleListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoRoleDetailPageComponent,
				resolve: {
					role: MbsRoleResolver,
				},
			},
		]
	},
	{
		path: 'work-category',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoWorkCategoryListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoWorkCategoryDetailPageComponent,
				resolve: {
					workCategory: MbsWorkCategoryResolver,
				},
			},
		]
	},
	{
		path: 'employee',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoEmployeeListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoEmployeeDetailPageComponent,
				resolve: {
					employee: MbsEmployeeResolver,
				},
			},
		]
	},
	{
		path: 'company',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoCompanyListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoCompanyDetailPageComponent,
				resolve: {
					company: MbsCompanyResolver,
				},
			},
		]
	},
	{
		path: 'assignement',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoAssignementListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoAssignementDetailPageComponent,
				resolve: {
					assignement: MbsAssignementResolver,
				},
			},
		]
	},

	
];