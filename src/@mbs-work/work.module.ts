import { NgModule } from '@angular/core';

import { EngeCommonLibModule } from '@enge/common-lib';

import { MbsWorkAutocompleteService } from './service/work-auto-complete.service';

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

import { MbsProgettoListLoaderComponent } from './components/progetto/progetto-list-loader/progetto-list-loader.component';
import { MbsProgettoDetailBoxComponent } from './components/progetto/progetto-detail-box/progetto-detail-box.component';
import { MbsProgettoDisplayColumnComponent } from './components/progetto/progetto-display-column/progetto-display-column.component';
import { MbsProgettoNewUpdateFormComponent } from './components/progetto/progetto-new-update-form/progetto-new-update-form.component';
import { MbsProgettoResourceService } from './services/progetto.service';
import { MbsProgettoResolver } from './resolvers/progetto.resolver';

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

import { MbsNominaListLoaderComponent } from './components/nomina/nomina-list-loader/nomina-list-loader.component';
import { MbsNominaDetailBoxComponent } from './components/nomina/nomina-detail-box/nomina-detail-box.component';
import { MbsNominaDisplayColumnComponent } from './components/nomina/nomina-display-column/nomina-display-column.component';
import { MbsNominaNewUpdateFormComponent } from './components/nomina/nomina-new-update-form/nomina-new-update-form.component';
import { MbsNominaResourceService } from './services/nomina.service';
import { MbsNominaResolver } from './resolvers/nomina.resolver';


@NgModule({
	imports: [ 
		EngeCommonLibModule,
		
	],
	declarations: [
		MbsIncaricoListLoaderComponent,
		MbsIncaricoDetailBoxComponent,
		MbsIncaricoDisplayColumnComponent,
		MbsIncaricoNewUpdateFormComponent,
		MbsFaseListLoaderComponent,
		MbsFaseDetailBoxComponent,
		MbsFaseDisplayColumnComponent,
		MbsFaseNewUpdateFormComponent,
		MbsProgettoListLoaderComponent,
		MbsProgettoDetailBoxComponent,
		MbsProgettoDisplayColumnComponent,
		MbsProgettoNewUpdateFormComponent,
		MbsTecnicoListLoaderComponent,
		MbsTecnicoDetailBoxComponent,
		MbsTecnicoDisplayColumnComponent,
		MbsTecnicoNewUpdateFormComponent,
		MbsAziendaListLoaderComponent,
		MbsAziendaDetailBoxComponent,
		MbsAziendaDisplayColumnComponent,
		MbsAziendaNewUpdateFormComponent,
		MbsNominaListLoaderComponent,
		MbsNominaDetailBoxComponent,
		MbsNominaDisplayColumnComponent,
		MbsNominaNewUpdateFormComponent,
	],
	providers: [
		MbsWorkAutocompleteService,
		MbsIncaricoResourceService,
		MbsIncaricoResolver,
		MbsFaseResourceService,
		MbsFaseResolver,
		MbsProgettoResourceService,
		MbsProgettoResolver,
		MbsTecnicoResourceService,
		MbsTecnicoResolver,
		MbsAziendaResourceService,
		MbsAziendaResolver,
		MbsNominaResourceService,
		MbsNominaResolver,
		
	],
	exports: [
		MbsIncaricoListLoaderComponent,
		MbsIncaricoDetailBoxComponent,
		MbsIncaricoDisplayColumnComponent,
		MbsIncaricoNewUpdateFormComponent,
		MbsFaseListLoaderComponent,
		MbsFaseDetailBoxComponent,
		MbsFaseDisplayColumnComponent,
		MbsFaseNewUpdateFormComponent,
		MbsProgettoListLoaderComponent,
		MbsProgettoDetailBoxComponent,
		MbsProgettoDisplayColumnComponent,
		MbsProgettoNewUpdateFormComponent,
		MbsTecnicoListLoaderComponent,
		MbsTecnicoDetailBoxComponent,
		MbsTecnicoDisplayColumnComponent,
		MbsTecnicoNewUpdateFormComponent,
		MbsAziendaListLoaderComponent,
		MbsAziendaDetailBoxComponent,
		MbsAziendaDisplayColumnComponent,
		MbsAziendaNewUpdateFormComponent,
		MbsNominaListLoaderComponent,
		MbsNominaDetailBoxComponent,
		MbsNominaDisplayColumnComponent,
		MbsNominaNewUpdateFormComponent,
	],
})
export class MbsWorkLibModule {}