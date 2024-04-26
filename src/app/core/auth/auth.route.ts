import { Route } from '@angular/router';
import { MbsTestComponent } from './components/test/test.component';
import { ConaAuthLoginComponent } from './components/login/login.component';
import { ConaAuthLoginCallbackComponent } from './components/callback/callback.component';

export const conaAuthRoutes: Route[] = [
	{
		path: '', 
		pathMatch : 'full',
		redirectTo: 'me'
	},
	{
		path: 'login',
		component: ConaAuthLoginComponent,
	},
	{
		path: 'login/callback',
		component: ConaAuthLoginCallbackComponent,
	},
	{
		path: 'me',
		//canActivate: [AuthGuard],
		component: MbsTestComponent,
	},
];