import { NgModule } from '@angular/core';
import { AgalCoreModule } from '@agal-core/agal-core.module';

import { PigesOrganizationListLoaderComponent } from './components/organization/organization-list-loader/organization-list-loader.component';
import { PigesOrganizationDetailBoxComponent } from './components/organization/organization-detail-box/organization-detail-box.component';
import { PigesOrganizationDisplayColumnComponent } from './components/organization/organization-display-column/organization-display-column.component';
import { PigesOrganizationResourceService } from './services/organization.service';
import { PigesOrganizationResolver } from './resolvers/organization.resolver';

import { PigesTenantListLoaderComponent } from './components/tenant/tenant-list-loader/tenant-list-loader.component';
import { PigesTenantDetailBoxComponent } from './components/tenant/tenant-detail-box/tenant-detail-box.component';
import { PigesTenantDisplayColumnComponent } from './components/tenant/tenant-display-column/tenant-display-column.component';
import { PigesTenantResourceService } from './services/tenant.service';
import { PigesTenantResolver } from './resolvers/tenant.resolver';

import { PigesConfigListLoaderComponent } from './components/config/config-list-loader/config-list-loader.component';
import { PigesConfigDetailBoxComponent } from './components/config/config-detail-box/config-detail-box.component';
import { PigesConfigDisplayColumnComponent } from './components/config/config-display-column/config-display-column.component';
import { PigesConfigResourceService } from './services/config.service';
import { PigesConfigResolver } from './resolvers/config.resolver';

import { PigesAccountListLoaderComponent } from './components/account/account-list-loader/account-list-loader.component';
import { PigesAccountDetailBoxComponent } from './components/account/account-detail-box/account-detail-box.component';
import { PigesAccountDisplayColumnComponent } from './components/account/account-display-column/account-display-column.component';
import { PigesAccountResourceService } from './services/account.service';
import { PigesAccountResolver } from './resolvers/account.resolver';

import { PigesFipListLoaderComponent } from './components/fip/fip-list-loader/fip-list-loader.component';
import { PigesFipDetailBoxComponent } from './components/fip/fip-detail-box/fip-detail-box.component';
import { PigesFipDisplayColumnComponent } from './components/fip/fip-display-column/fip-display-column.component';
import { PigesFipResourceService } from './services/fip.service';
import { PigesFipResolver } from './resolvers/fip.resolver';

import { PigesIdentityListLoaderComponent } from './components/identity/identity-list-loader/identity-list-loader.component';
import { PigesIdentityDetailBoxComponent } from './components/identity/identity-detail-box/identity-detail-box.component';
import { PigesIdentityDisplayColumnComponent } from './components/identity/identity-display-column/identity-display-column.component';
import { PigesIdentityResourceService } from './services/identity.service';
import { PigesIdentityResolver } from './resolvers/identity.resolver';


@NgModule({
	imports: [ 
		AgalCoreModule,

	],
	declarations: [
        PigesOrganizationListLoaderComponent,
        PigesOrganizationDetailBoxComponent,
		PigesOrganizationDisplayColumnComponent,
        PigesTenantListLoaderComponent,
        PigesTenantDetailBoxComponent,
		PigesTenantDisplayColumnComponent,
        PigesConfigListLoaderComponent,
        PigesConfigDetailBoxComponent,
		PigesConfigDisplayColumnComponent,
        PigesAccountListLoaderComponent,
        PigesAccountDetailBoxComponent,
		PigesAccountDisplayColumnComponent,
        PigesFipListLoaderComponent,
        PigesFipDetailBoxComponent,
		PigesFipDisplayColumnComponent,
        PigesIdentityListLoaderComponent,
        PigesIdentityDetailBoxComponent,
		PigesIdentityDisplayColumnComponent,
	],
	providers: [
		PigesOrganizationResourceService,
        PigesOrganizationResolver,
		PigesTenantResourceService,
        PigesTenantResolver,
		PigesConfigResourceService,
        PigesConfigResolver,
		PigesAccountResourceService,
        PigesAccountResolver,
		PigesFipResourceService,
        PigesFipResolver,
		PigesIdentityResourceService,
        PigesIdentityResolver,
		
	],
	exports: [
        PigesOrganizationListLoaderComponent,
        PigesOrganizationDetailBoxComponent,
		PigesOrganizationDisplayColumnComponent,
        PigesTenantListLoaderComponent,
        PigesTenantDetailBoxComponent,
		PigesTenantDisplayColumnComponent,
        PigesConfigListLoaderComponent,
        PigesConfigDetailBoxComponent,
		PigesConfigDisplayColumnComponent,
        PigesAccountListLoaderComponent,
        PigesAccountDetailBoxComponent,
		PigesAccountDisplayColumnComponent,
        PigesFipListLoaderComponent,
        PigesFipDetailBoxComponent,
		PigesFipDisplayColumnComponent,
        PigesIdentityListLoaderComponent,
        PigesIdentityDetailBoxComponent,
		PigesIdentityDisplayColumnComponent,
	],
})
export class PigesDnaModule {}