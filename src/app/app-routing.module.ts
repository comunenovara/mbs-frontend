import { ExtraOptions, Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppLayoutComponent } from "./layout/prime-sakai/components/main/app.layout.component";
import { NotfoundComponent } from './demo/components/notfound/notfound.component';

const routes: Route[] = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
            { path: 'mbs', loadChildren: () => import('./mbs/mbs.module').then(m => m.MbsModule) },
            { path: 'enzo', loadChildren: () => import('./modules/enzo-mbs-main/mbs-main.module').then(m => m.EnzoMbsMainModule) }
        ]
    },
    { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
];

const routeConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload'
}

@NgModule({
    imports: [
        RouterModule.forRoot(routes, routeConfig)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
