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
                label: 'Main',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-building', routerLink: ['/work/dashboard'] },
                    { label: 'Cig', icon: 'pi pi-fw pi-building', routerLink: ['/amm/cig'] },
                ]
            },
			{
                label: 'Carico lavoro',
                items: [
					{ label: 'Progetti', icon: 'pi pi-fw pi-building', routerLink: ['/work/project'] },
                    { label: 'Tecnici', icon: 'pi pi-fw pi-compass', routerLink: ['/work/employee'] },
                    { label: 'Aziende', icon: 'pi pi-fw pi-chart-line', routerLink: ['/work/company'] },
                ]
            },
			{
                label: 'Incentivi',
                items: [
					{ label: 'Regolamento incentivi', icon: 'pi pi-fw pi-building', routerLink: ['/i7e/incentive-regulation'] },
                ]
            },
			{
                label: 'Gestione immobili',
                items: [
                    { label: 'Proprietà', icon: 'pi pi-fw pi-building', routerLink: ['/main/asset'] },
                    { label: 'Rilievi', icon: 'pi pi-fw pi-compass', routerLink: ['/main/relif'] },
                    { label: 'Interventi', icon: 'pi pi-fw pi-chart-line', routerLink: ['/main/operation'] },
                ]
            },
            {
                label: 'Config - Work',
                items: [
                    { label: 'Lavori Ruoli', icon: 'pi pi-fw pi-building', routerLink: ['/work/role'] },
                    { label: 'Lavori Categoria lavori', icon: 'pi pi-fw pi-compass', routerLink: ['/work/work-category'] },
					{ label: 'Tipi di intervento', icon: 'pi pi-fw pi-building', routerLink: ['/main/operation-type'] },
					{ label: 'Tipi di fascicoli', icon: 'pi pi-fw pi-compass', routerLink: ['/main/dossier-type'] },
					{ label: 'Tutti i fascicoli', icon: 'pi pi-fw pi-chart-line', routerLink: ['/main/dossier'] },
					{ label: 'Tipo appalti', icon: 'pi pi-fw pi-chart-line', routerLink: ['/i7e/procurement-type'] },
                ]
            },
        ];
    }
}
