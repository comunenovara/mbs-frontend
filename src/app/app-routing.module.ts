import { ExtraOptions, Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppLayoutComponent } from "./layout/prime-sakai/components/main/app.layout.component";

const routes: Route[] = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: '',
                pathMatch : 'full',
                redirectTo: 'work',
            },
            { path: 'main', loadChildren: () => import('./modules/enzo-mbs-main/mbs-main.module').then(m => m.EnzoMbsMainModule) },
            { path: 'work', loadChildren: () => import('./modules/enzo-mbs-work/mbs-work.module').then(m => m.EnzoMbsWorkModule) },
			{ path: 'amm', loadChildren: () => import('./modules/enzo-mbs-amm/mbs-amm.module').then(m => m.EnzoMbsAmmModule) },
			{ path: 'i7e', loadChildren: () => import('./modules/enzo-mbs-incentive/mbs-incentive.module').then(m => m.EnzoMbsIncentiveModule) },
        ]
    },
//    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
];

const routeConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    useHash: true
}

@NgModule({
    imports: [
        RouterModule.forRoot(routes, routeConfig)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
