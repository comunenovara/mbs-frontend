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
                redirectTo: 'enzo/asset/list',
            },
            { path: 'enzo', loadChildren: () => import('./modules/enzo-mbs-main/mbs-main.module').then(m => m.EnzoMbsMainModule) }
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
