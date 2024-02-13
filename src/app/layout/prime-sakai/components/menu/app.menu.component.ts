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
                label: 'Work',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-building', routerLink: ['/work/dashboard'] },
                    { label: 'Progetti', icon: 'pi pi-fw pi-building', routerLink: ['/work/project'] },
                    { label: 'Tecnici', icon: 'pi pi-fw pi-compass', routerLink: ['/work/employee'] },
                    { label: 'Aziende', icon: 'pi pi-fw pi-chart-line', routerLink: ['/work/company'] },
                ]
            },
			{
                label: 'Gestione amministrativa',
                items: [
                    { label: 'Cig', icon: 'pi pi-fw pi-building', routerLink: ['/amm/cig'] },
					
                ]
            },
			{
                label: 'Incentivi',
                items: [
					{ label: 'Regolamento incentivi', icon: 'pi pi-fw pi-building', routerLink: ['/i7e/incentive-regulation'] },
                    { label: 'Metodo di calcolo', icon: 'pi pi-fw pi-building', routerLink: ['/i7e/calculation-method'] },
					{ label: 'Fattore di calcolo', icon: 'pi pi-fw pi-building', routerLink: ['/i7e/calculation-factor'] },
					{ label: 'Trattenute', icon: 'pi pi-fw pi-building', routerLink: ['/i7e/withheld'] },
					{ label: 'Fase', icon: 'pi pi-fw pi-building', routerLink: ['/i7e/stage'] },
					{ label: 'Ruolo', icon: 'pi pi-fw pi-building', routerLink: ['/i7e/role'] },
					{ label: 'Valori', icon: 'pi pi-fw pi-building', routerLink: ['/i7e/role-value'] },
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
                    { label: 'Ruoli', icon: 'pi pi-fw pi-building', routerLink: ['/work/role'] },
                    { label: 'Categoria lavori', icon: 'pi pi-fw pi-compass', routerLink: ['/work/work-category'] },
					{ label: 'Tipi di intervento', icon: 'pi pi-fw pi-building', routerLink: ['/main/operation-type'] },
					{ label: 'Tipi di fascicoli', icon: 'pi pi-fw pi-compass', routerLink: ['/main/dossier-type'] },
					{ label: 'Tutti i fascicoli', icon: 'pi pi-fw pi-chart-line', routerLink: ['/main/dossier'] },
					{ label: 'Tipo appalti', icon: 'pi pi-fw pi-chart-line', routerLink: ['/i7e/procurement-type'] },
                ]
            },
        ];
    }
}
