import { Route } from '@angular/router';
import { MbsCigNewFormComponent } from './components/cig-new-form/cig-new-form.component';
//import { MbsTestComponent } from './components/test/test.component';


export const enzoMbsAmmRoutes: Route[] = [
	{
		path: '', 
		pathMatch : 'full',
		redirectTo: 'cig'
	},
	{
		path: 'cig',
		component: MbsCigNewFormComponent,
	},
	{
		path: 'test',
		//canActivate: [AuthGuard],
		//component: MbsTestComponent,
	},
];