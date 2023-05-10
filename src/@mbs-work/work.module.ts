import { NgModule } from '@angular/core';

import { EngeCommonLibModule } from '@enge/common-lib';

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

@NgModule({
	imports: [ 
		EngeCommonLibModule,

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
		
	],
})
export class MbsWorkLibModule {}