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
import { MbsIncaricoResolver } from '@mbs-work/resolvers/incarico.resolver';
import { EnzoIncaricoListPageComponent } from './components/incarico/incarico-list-page/incarico-list-page.component';
import { EnzoIncaricoDetailPageComponent } from './components/incarico/incarico-detail-page/incarico-detail-page.component';
import { MbsFaseResolver } from '@mbs-work/resolvers/fase.resolver';
import { EnzoFaseListPageComponent } from './components/fase/fase-list-page/fase-list-page.component';
import { EnzoFaseDetailPageComponent } from './components/fase/fase-detail-page/fase-detail-page.component';
import { MbsTecnicoResolver } from '@mbs-work/resolvers/tecnico.resolver';
import { EnzoTecnicoListPageComponent } from './components/tecnico/tecnico-list-page/tecnico-list-page.component';
import { EnzoTecnicoDetailPageComponent } from './components/tecnico/tecnico-detail-page/tecnico-detail-page.component';
import { MbsAziendaResolver } from '@mbs-work/resolvers/azienda.resolver';
import { EnzoAziendaListPageComponent } from './components/azienda/azienda-list-page/azienda-list-page.component';
import { EnzoAziendaDetailPageComponent } from './components/azienda/azienda-detail-page/azienda-detail-page.component';
import { MbsProgettoResolver } from '@mbs-work/resolvers/progetto.resolver';
import { EnzoProgettoListPageComponent } from './components/progetto/progetto-list-page/progetto-list-page.component';
import { EnzoProgettoDetailPageComponent } from './components/progetto/progetto-detail-page/progetto-detail-page.component';
import { MbsNominaResolver } from '@mbs-work/resolvers/nomina.resolver';
import { EnzoNominaListPageComponent } from './components/nomina/nomina-list-page/nomina-list-page.component';
import { EnzoNominaDetailPageComponent } from './components/nomina/nomina-detail-page/nomina-detail-page.component';
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
	{
		path: 'incarico',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncaricoListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncaricoDetailPageComponent,
				resolve: {
					incarico: MbsIncaricoResolver,
				},
			},
		]
	},
	{
		path: 'fase',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoFaseListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoFaseDetailPageComponent,
				resolve: {
					fase: MbsFaseResolver,
				},
			},
		]
	},
	{
		path: 'tecnico',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoTecnicoListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoTecnicoDetailPageComponent,
				resolve: {
					tecnico: MbsTecnicoResolver,
				},
			},
		]
	},
	{
		path: 'azienda',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoAziendaListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoAziendaDetailPageComponent,
				resolve: {
					azienda: MbsAziendaResolver,
				},
			},
		]
	},
	{
		path: 'progetto',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoProgettoListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoProgettoDetailPageComponent,
				resolve: {
					progetto: MbsProgettoResolver,
				},
			},
		]
	},
	{
		path: 'nomina',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoNominaListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoNominaDetailPageComponent,
				resolve: {
					nomina: MbsNominaResolver,
				},
			},
		]
	},
	
];