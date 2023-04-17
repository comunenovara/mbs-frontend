import { Route } from '@angular/router';

import { MbsIncaricoResolver } from '@mbs-work/resolvers/incarico.resolver';
import { EnzoIncaricoListPageComponent } from './components/incarico/incarico-list-page/incarico-list-page.component';
import { EnzoIncaricoDetailPageComponent } from './components/incarico/incarico-detail-page/incarico-detail-page.component';
import { MbsFaseResolver } from '@mbs-work/resolvers/fase.resolver';
import { EnzoFaseListPageComponent } from './components/fase/fase-list-page/fase-list-page.component';
import { EnzoFaseDetailPageComponent } from './components/fase/fase-detail-page/fase-detail-page.component';
import { MbsProgettoResolver } from '@mbs-work/resolvers/progetto.resolver';
import { EnzoProgettoListPageComponent } from './components/progetto/progetto-list-page/progetto-list-page.component';
import { EnzoProgettoDetailPageComponent } from './components/progetto/progetto-detail-page/progetto-detail-page.component';
import { MbsTecnicoResolver } from '@mbs-work/resolvers/tecnico.resolver';
import { EnzoTecnicoListPageComponent } from './components/tecnico/tecnico-list-page/tecnico-list-page.component';
import { EnzoTecnicoDetailPageComponent } from './components/tecnico/tecnico-detail-page/tecnico-detail-page.component';
import { MbsAziendaResolver } from '@mbs-work/resolvers/azienda.resolver';
import { EnzoAziendaListPageComponent } from './components/azienda/azienda-list-page/azienda-list-page.component';
import { EnzoAziendaDetailPageComponent } from './components/azienda/azienda-detail-page/azienda-detail-page.component';
import { MbsNominaResolver } from '@mbs-work/resolvers/nomina.resolver';
import { EnzoNominaListPageComponent } from './components/nomina/nomina-list-page/nomina-list-page.component';
import { EnzoNominaDetailPageComponent } from './components/nomina/nomina-detail-page/nomina-detail-page.component';

export const enzoMbsWorkRoutes: Route[] = [
	{
		path: '', 
		pathMatch : 'full',
		redirectTo: 'page'
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