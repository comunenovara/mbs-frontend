import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MbsWorkLibModule, MBS_WORK_ENDPOINT } from '@mbs-work';
import { EngeCommonAppModule } from '@enge/common-app';

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
import { EnzoIncaricoListPageComponent } from './components/incarico/incarico-list-page/incarico-list-page.component';
import { EnzoIncaricoDetailPageComponent } from './components/incarico/incarico-detail-page/incarico-detail-page.component';
import { EnzoIncaricoDialogComponent } from './components/incarico/incarico-dialog/incarico-dialog.component';
import { EnzoFaseListPageComponent } from './components/fase/fase-list-page/fase-list-page.component';
import { EnzoFaseDetailPageComponent } from './components/fase/fase-detail-page/fase-detail-page.component';
import { EnzoFaseDialogComponent } from './components/fase/fase-dialog/fase-dialog.component';
import { EnzoTecnicoListPageComponent } from './components/tecnico/tecnico-list-page/tecnico-list-page.component';
import { EnzoTecnicoDetailPageComponent } from './components/tecnico/tecnico-detail-page/tecnico-detail-page.component';
import { EnzoTecnicoDialogComponent } from './components/tecnico/tecnico-dialog/tecnico-dialog.component';
import { EnzoAziendaListPageComponent } from './components/azienda/azienda-list-page/azienda-list-page.component';
import { EnzoAziendaDetailPageComponent } from './components/azienda/azienda-detail-page/azienda-detail-page.component';
import { EnzoAziendaDialogComponent } from './components/azienda/azienda-dialog/azienda-dialog.component';
import { EnzoProgettoListPageComponent } from './components/progetto/progetto-list-page/progetto-list-page.component';
import { EnzoProgettoDetailPageComponent } from './components/progetto/progetto-detail-page/progetto-detail-page.component';
import { EnzoProgettoDialogComponent } from './components/progetto/progetto-dialog/progetto-dialog.component';
import { EnzoNominaListPageComponent } from './components/nomina/nomina-list-page/nomina-list-page.component';
import { EnzoNominaDetailPageComponent } from './components/nomina/nomina-detail-page/nomina-detail-page.component';
import { EnzoNominaDialogComponent } from './components/nomina/nomina-dialog/nomina-dialog.component';

@NgModule({
	imports: [ 
		RouterModule.forChild(enzoMbsWorkRoutes),
		MbsWorkLibModule,
		EngeCommonAppModule,

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
		
		EnzoIncaricoListPageComponent,
		EnzoIncaricoDetailPageComponent,
		EnzoIncaricoDialogComponent,
		
		EnzoFaseListPageComponent,
		EnzoFaseDetailPageComponent,
		EnzoFaseDialogComponent,
		
		EnzoTecnicoListPageComponent,
		EnzoTecnicoDetailPageComponent,
		EnzoTecnicoDialogComponent,
		
		EnzoAziendaListPageComponent,
		EnzoAziendaDetailPageComponent,
		EnzoAziendaDialogComponent,
		
		EnzoProgettoListPageComponent,
		EnzoProgettoDetailPageComponent,
		EnzoProgettoDialogComponent,
		
		EnzoNominaListPageComponent,
		EnzoNominaDetailPageComponent,
		EnzoNominaDialogComponent,
		
	],
	providers: [
		{
			provide: MBS_WORK_ENDPOINT,
			useValue: 'http://localhost:3000/mbs/work'
		}
	]
})
export class EnzoMbsWorkModule {}