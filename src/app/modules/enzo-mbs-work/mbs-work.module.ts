import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MbsWorkLibModule, MBS_WORK_ENDPOINT } from '@mbs-work';
import { EngeCommonAppModule } from '@enge/common-app';

import { ChipModule } from 'primeng/chip';

import { enzoMbsWorkRoutes } from './mbs-work.route';

import { EnzoIncaricoListPageComponent } from './components/incarico/incarico-list-page/incarico-list-page.component';
import { EnzoIncaricoDetailPageComponent } from './components/incarico/incarico-detail-page/incarico-detail-page.component';
import { EnzoIncaricoDialogComponent } from './components/incarico/incarico-dialog/incarico-dialog.component';
import { EnzoFaseListPageComponent } from './components/fase/fase-list-page/fase-list-page.component';
import { EnzoFaseDetailPageComponent } from './components/fase/fase-detail-page/fase-detail-page.component';
import { EnzoFaseDialogComponent } from './components/fase/fase-dialog/fase-dialog.component';
import { EnzoProgettoListPageComponent } from './components/progetto/progetto-list-page/progetto-list-page.component';
import { EnzoProgettoDetailPageComponent } from './components/progetto/progetto-detail-page/progetto-detail-page.component';
import { EnzoProgettoDialogComponent } from './components/progetto/progetto-dialog/progetto-dialog.component';
import { EnzoTecnicoListPageComponent } from './components/tecnico/tecnico-list-page/tecnico-list-page.component';
import { EnzoTecnicoDetailPageComponent } from './components/tecnico/tecnico-detail-page/tecnico-detail-page.component';
import { EnzoTecnicoDialogComponent } from './components/tecnico/tecnico-dialog/tecnico-dialog.component';
import { EnzoAziendaListPageComponent } from './components/azienda/azienda-list-page/azienda-list-page.component';
import { EnzoAziendaDetailPageComponent } from './components/azienda/azienda-detail-page/azienda-detail-page.component';
import { EnzoAziendaDialogComponent } from './components/azienda/azienda-dialog/azienda-dialog.component';
import { EnzoNominaListPageComponent } from './components/nomina/nomina-list-page/nomina-list-page.component';
import { EnzoNominaDetailPageComponent } from './components/nomina/nomina-detail-page/nomina-detail-page.component';
import { EnzoNominaDialogComponent } from './components/nomina/nomina-dialog/nomina-dialog.component';

@NgModule({
	imports: [ 
		RouterModule.forChild(enzoMbsWorkRoutes),
		MbsWorkLibModule,
		EngeCommonAppModule,
		ChipModule,
		
	],
	declarations: [
		EnzoIncaricoListPageComponent,
		EnzoIncaricoDetailPageComponent,
		EnzoIncaricoDialogComponent,
		
		EnzoFaseListPageComponent,
		EnzoFaseDetailPageComponent,
		EnzoFaseDialogComponent,
		
		EnzoProgettoListPageComponent,
		EnzoProgettoDetailPageComponent,
		EnzoProgettoDialogComponent,
		
		EnzoTecnicoListPageComponent,
		EnzoTecnicoDetailPageComponent,
		EnzoTecnicoDialogComponent,
		
		EnzoAziendaListPageComponent,
		EnzoAziendaDetailPageComponent,
		EnzoAziendaDialogComponent,
		
		EnzoNominaListPageComponent,
		EnzoNominaDetailPageComponent,
		EnzoNominaDialogComponent,
		
	],
	providers: [
		{
			provide: MBS_WORK_ENDPOINT,
			useValue: 'http://10.1.20.20:82/mbs/work'
		},
	]
})
export class EnzoMbsWorkModule {}