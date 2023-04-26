import { NgModule } from '@angular/core';

import { EngeCommonLibModule } from '@enge/common-lib';
import { CheckboxModule } from 'primeng/checkbox';

import { MbsWorkAutocompleteService } from './service/work-auto-complete.service';

import { MbsProjectListLoaderComponent } from './components/project/project-list-loader/project-list-loader.component';
import { MbsProjectDetailBoxComponent } from './components/project/project-detail-box/project-detail-box.component';
import { MbsProjectDisplayColumnComponent } from './components/project/project-display-column/project-display-column.component';
import { MbsProjectNewUpdateFormComponent } from './components/project/project-new-update-form/project-new-update-form.component';
import { MbsProjectResourceService } from './services/project.service';
import { MbsProjectResolver } from './resolvers/project.resolver';

import { MbsRoleListLoaderComponent } from './components/role/role-list-loader/role-list-loader.component';
import { MbsRoleDetailBoxComponent } from './components/role/role-detail-box/role-detail-box.component';
import { MbsRoleDisplayColumnComponent } from './components/role/role-display-column/role-display-column.component';
import { MbsRoleNewUpdateFormComponent } from './components/role/role-new-update-form/role-new-update-form.component';
import { MbsRoleResourceService } from './services/role.service';
import { MbsRoleResolver } from './resolvers/role.resolver';

import { MbsWorkCategoryListLoaderComponent } from './components/work-category/work-category-list-loader/work-category-list-loader.component';
import { MbsWorkCategoryDetailBoxComponent } from './components/work-category/work-category-detail-box/work-category-detail-box.component';
import { MbsWorkCategoryDisplayColumnComponent } from './components/work-category/work-category-display-column/work-category-display-column.component';
import { MbsWorkCategoryNewUpdateFormComponent } from './components/work-category/work-category-new-update-form/work-category-new-update-form.component';
import { MbsWorkCategoryResourceService } from './services/work-category.service';
import { MbsWorkCategoryResolver } from './resolvers/work-category.resolver';

import { MbsEmployeeListLoaderComponent } from './components/employee/employee-list-loader/employee-list-loader.component';
import { MbsEmployeeDetailBoxComponent } from './components/employee/employee-detail-box/employee-detail-box.component';
import { MbsEmployeeDisplayColumnComponent } from './components/employee/employee-display-column/employee-display-column.component';
import { MbsEmployeeNewUpdateFormComponent } from './components/employee/employee-new-update-form/employee-new-update-form.component';
import { MbsEmployeeResourceService } from './services/employee.service';
import { MbsEmployeeResolver } from './resolvers/employee.resolver';

import { MbsCompanyListLoaderComponent } from './components/company/company-list-loader/company-list-loader.component';
import { MbsCompanyDetailBoxComponent } from './components/company/company-detail-box/company-detail-box.component';
import { MbsCompanyDisplayColumnComponent } from './components/company/company-display-column/company-display-column.component';
import { MbsCompanyNewUpdateFormComponent } from './components/company/company-new-update-form/company-new-update-form.component';
import { MbsCompanyResourceService } from './services/company.service';
import { MbsCompanyResolver } from './resolvers/company.resolver';

import { MbsAssignementListLoaderComponent } from './components/assignement/assignement-list-loader/assignement-list-loader.component';
import { MbsAssignementDetailBoxComponent } from './components/assignement/assignement-detail-box/assignement-detail-box.component';
import { MbsAssignementDisplayColumnComponent } from './components/assignement/assignement-display-column/assignement-display-column.component';
import { MbsAssignementNewUpdateFormComponent } from './components/assignement/assignement-new-update-form/assignement-new-update-form.component';
import { MbsAssignementResourceService } from './services/assignement.service';
import { MbsAssignementResolver } from './resolvers/assignement.resolver';

import { MbsIncaricoListLoaderComponent } from './components/incarico/incarico-list-loader/incarico-list-loader.component';
import { MbsIncaricoDetailBoxComponent } from './components/incarico/incarico-detail-box/incarico-detail-box.component';
import { MbsIncaricoDisplayColumnComponent } from './components/incarico/incarico-display-column/incarico-display-column.component';
import { MbsIncaricoNewUpdateFormComponent } from './components/incarico/incarico-new-update-form/incarico-new-update-form.component';
import { MbsIncaricoResourceService } from './services/incarico.service';
import { MbsIncaricoResolver } from './resolvers/incarico.resolver';

import { MbsFaseListLoaderComponent } from './components/fase/fase-list-loader/fase-list-loader.component';
import { MbsFaseDetailBoxComponent } from './components/fase/fase-detail-box/fase-detail-box.component';
import { MbsFaseDisplayColumnComponent } from './components/fase/fase-display-column/fase-display-column.component';
import { MbsFaseNewUpdateFormComponent } from './components/fase/fase-new-update-form/fase-new-update-form.component';
import { MbsFaseResourceService } from './services/fase.service';
import { MbsFaseResolver } from './resolvers/fase.resolver';

import { MbsTecnicoListLoaderComponent } from './components/tecnico/tecnico-list-loader/tecnico-list-loader.component';
import { MbsTecnicoDetailBoxComponent } from './components/tecnico/tecnico-detail-box/tecnico-detail-box.component';
import { MbsTecnicoDisplayColumnComponent } from './components/tecnico/tecnico-display-column/tecnico-display-column.component';
import { MbsTecnicoNewUpdateFormComponent } from './components/tecnico/tecnico-new-update-form/tecnico-new-update-form.component';
import { MbsTecnicoResourceService } from './services/tecnico.service';
import { MbsTecnicoResolver } from './resolvers/tecnico.resolver';

import { MbsAziendaListLoaderComponent } from './components/azienda/azienda-list-loader/azienda-list-loader.component';
import { MbsAziendaDetailBoxComponent } from './components/azienda/azienda-detail-box/azienda-detail-box.component';
import { MbsAziendaDisplayColumnComponent } from './components/azienda/azienda-display-column/azienda-display-column.component';
import { MbsAziendaNewUpdateFormComponent } from './components/azienda/azienda-new-update-form/azienda-new-update-form.component';
import { MbsAziendaResourceService } from './services/azienda.service';
import { MbsAziendaResolver } from './resolvers/azienda.resolver';

import { MbsProgettoListLoaderComponent } from './components/progetto/progetto-list-loader/progetto-list-loader.component';
import { MbsProgettoDetailBoxComponent } from './components/progetto/progetto-detail-box/progetto-detail-box.component';
import { MbsProgettoDisplayColumnComponent } from './components/progetto/progetto-display-column/progetto-display-column.component';
import { MbsProgettoNewUpdateFormComponent } from './components/progetto/progetto-new-update-form/progetto-new-update-form.component';
import { MbsProgettoResourceService } from './services/progetto.service';
import { MbsProgettoResolver } from './resolvers/progetto.resolver';

import { MbsNominaListLoaderComponent } from './components/nomina/nomina-list-loader/nomina-list-loader.component';
import { MbsNominaDetailBoxComponent } from './components/nomina/nomina-detail-box/nomina-detail-box.component';
import { MbsNominaDisplayColumnComponent } from './components/nomina/nomina-display-column/nomina-display-column.component';
import { MbsNominaNewUpdateFormComponent } from './components/nomina/nomina-new-update-form/nomina-new-update-form.component';
import { MbsNominaResourceService } from './services/nomina.service';
import { MbsNominaResolver } from './resolvers/nomina.resolver';


@NgModule({
	imports: [ 
		EngeCommonLibModule,
		CheckboxModule,

	],
	declarations: [
		MbsProjectListLoaderComponent,
		MbsProjectDetailBoxComponent,
		MbsProjectDisplayColumnComponent,
		MbsProjectNewUpdateFormComponent,
		MbsRoleListLoaderComponent,
		MbsRoleDetailBoxComponent,
		MbsRoleDisplayColumnComponent,
		MbsRoleNewUpdateFormComponent,
		MbsWorkCategoryListLoaderComponent,
		MbsWorkCategoryDetailBoxComponent,
		MbsWorkCategoryDisplayColumnComponent,
		MbsWorkCategoryNewUpdateFormComponent,
		MbsEmployeeListLoaderComponent,
		MbsEmployeeDetailBoxComponent,
		MbsEmployeeDisplayColumnComponent,
		MbsEmployeeNewUpdateFormComponent,
		MbsCompanyListLoaderComponent,
		MbsCompanyDetailBoxComponent,
		MbsCompanyDisplayColumnComponent,
		MbsCompanyNewUpdateFormComponent,
		MbsAssignementListLoaderComponent,
		MbsAssignementDetailBoxComponent,
		MbsAssignementDisplayColumnComponent,
		MbsAssignementNewUpdateFormComponent,
		MbsIncaricoListLoaderComponent,
		MbsIncaricoDetailBoxComponent,
		MbsIncaricoDisplayColumnComponent,
		MbsIncaricoNewUpdateFormComponent,
		MbsFaseListLoaderComponent,
		MbsFaseDetailBoxComponent,
		MbsFaseDisplayColumnComponent,
		MbsFaseNewUpdateFormComponent,
		MbsTecnicoListLoaderComponent,
		MbsTecnicoDetailBoxComponent,
		MbsTecnicoDisplayColumnComponent,
		MbsTecnicoNewUpdateFormComponent,
		MbsAziendaListLoaderComponent,
		MbsAziendaDetailBoxComponent,
		MbsAziendaDisplayColumnComponent,
		MbsAziendaNewUpdateFormComponent,
		MbsProgettoListLoaderComponent,
		MbsProgettoDetailBoxComponent,
		MbsProgettoDisplayColumnComponent,
		MbsProgettoNewUpdateFormComponent,
		MbsNominaListLoaderComponent,
		MbsNominaDetailBoxComponent,
		MbsNominaDisplayColumnComponent,
		MbsNominaNewUpdateFormComponent,
	],
	providers: [
		MbsWorkAutocompleteService,
		MbsProjectResourceService,
		MbsProjectResolver,
		MbsRoleResourceService,
		MbsRoleResolver,
		MbsWorkCategoryResourceService,
		MbsWorkCategoryResolver,
		MbsEmployeeResourceService,
		MbsEmployeeResolver,
		MbsCompanyResourceService,
		MbsCompanyResolver,
		MbsAssignementResourceService,
		MbsAssignementResolver,
		MbsIncaricoResourceService,
		MbsIncaricoResolver,
		MbsFaseResourceService,
		MbsFaseResolver,
		MbsTecnicoResourceService,
		MbsTecnicoResolver,
		MbsAziendaResourceService,
		MbsAziendaResolver,
		MbsProgettoResourceService,
		MbsProgettoResolver,
		MbsNominaResourceService,
		MbsNominaResolver,
		
	],
	exports: [
		MbsProjectListLoaderComponent,
		MbsProjectDetailBoxComponent,
		MbsProjectDisplayColumnComponent,
		MbsProjectNewUpdateFormComponent,
		MbsRoleListLoaderComponent,
		MbsRoleDetailBoxComponent,
		MbsRoleDisplayColumnComponent,
		MbsRoleNewUpdateFormComponent,
		MbsWorkCategoryListLoaderComponent,
		MbsWorkCategoryDetailBoxComponent,
		MbsWorkCategoryDisplayColumnComponent,
		MbsWorkCategoryNewUpdateFormComponent,
		MbsEmployeeListLoaderComponent,
		MbsEmployeeDetailBoxComponent,
		MbsEmployeeDisplayColumnComponent,
		MbsEmployeeNewUpdateFormComponent,
		MbsCompanyListLoaderComponent,
		MbsCompanyDetailBoxComponent,
		MbsCompanyDisplayColumnComponent,
		MbsCompanyNewUpdateFormComponent,
		MbsAssignementListLoaderComponent,
		MbsAssignementDetailBoxComponent,
		MbsAssignementDisplayColumnComponent,
		MbsAssignementNewUpdateFormComponent,
		MbsIncaricoListLoaderComponent,
		MbsIncaricoDetailBoxComponent,
		MbsIncaricoDisplayColumnComponent,
		MbsIncaricoNewUpdateFormComponent,
		MbsFaseListLoaderComponent,
		MbsFaseDetailBoxComponent,
		MbsFaseDisplayColumnComponent,
		MbsFaseNewUpdateFormComponent,
		MbsTecnicoListLoaderComponent,
		MbsTecnicoDetailBoxComponent,
		MbsTecnicoDisplayColumnComponent,
		MbsTecnicoNewUpdateFormComponent,
		MbsAziendaListLoaderComponent,
		MbsAziendaDetailBoxComponent,
		MbsAziendaDisplayColumnComponent,
		MbsAziendaNewUpdateFormComponent,
		MbsProgettoListLoaderComponent,
		MbsProgettoDetailBoxComponent,
		MbsProgettoDisplayColumnComponent,
		MbsProgettoNewUpdateFormComponent,
		MbsNominaListLoaderComponent,
		MbsNominaDetailBoxComponent,
		MbsNominaDisplayColumnComponent,
		MbsNominaNewUpdateFormComponent,
	],
})
export class MbsWorkLibModule {}