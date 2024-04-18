import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Varie',
                items: [
                    { label: 'Cig', icon: 'pi pi-fw pi-building', routerLink: ['/amm/cig'] },
                ]
            },
			{
                label: 'Carico lavoro',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-building', routerLink: ['/work/dashboard'] },
					{ label: 'Progetti', icon: 'pi pi-fw pi-building', routerLink: ['/work/project'] },
                    { label: 'Tecnici', icon: 'pi pi-fw pi-compass', routerLink: ['/work/employee'] },
                    { label: 'Aziende', icon: 'pi pi-fw pi-chart-line', routerLink: ['/work/company'] },
                ]
            },
			{
                label: 'Progetti',
                items: [
                    { label: 'Progetti', icon: 'pi pi-fw pi-building', routerLink: ['/main/governative-project'] },
                    { label: 'Appalti', icon: 'pi pi-fw pi-compass', routerLink: ['/main/governative-procurement-lot'] },
                ]
            },
            {
                label: 'Incentivi',
                items: [
                    { label: 'Regolamento', icon: 'pi pi-fw pi-building', routerLink: ['/main/incentive-regulation'] },
                    { label: 'Beneficiari', icon: 'pi pi-fw pi-chart-line', routerLink: ['/main/incentive-beneficiary'] },
                    { label: 'Calcoli', icon: 'pi pi-fw pi-compass', routerLink: ['/main/incentive-calculation'] },
                ]
            },
            {
                label: 'Config',
                items: [
                    { label: 'Tipi appalti', icon: 'pi pi-fw pi-building', routerLink: ['/main/procurement-type'] },
                    { label: 'Tipi di intervento', icon: 'pi pi-fw pi-building', routerLink: ['/main/operation-type'] },
					{ label: 'Tipi di fascicoli', icon: 'pi pi-fw pi-compass', routerLink: ['/main/dossier-type'] },
                    { label: 'Lavori Ruoli', icon: 'pi pi-fw pi-building', routerLink: ['/work/role'] },
                    { label: 'Lavori Categoria lavori', icon: 'pi pi-fw pi-compass', routerLink: ['/work/work-category'] },
                ]
            },
        ];
    }
}
