import { Route } from '@angular/router';
import { MbsTestComponent } from './components/test/test.component';


export const conaAuthRoutes: Route[] = [
	{
		path: '', 
		pathMatch : 'full',
		redirectTo: 'login'
	},
	{
		path: 'login',
		component: MbsTestComponent,
	},
	{
		path: 'login/callback',
		component: MbsTestComponent,
	},
	{
		path: 'me',
		//canActivate: [AuthGuard],
		component: MbsTestComponent,
	},
];