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
                label: 'Incentivi',
                items: [
                    { label: 'Regolamento', icon: 'pi pi-fw pi-building', routerLink: ['/main/incentive-regulation'] },
                    { label: 'Beneficiari', icon: 'pi pi-fw pi-chart-line', routerLink: ['/main/incentive-beneficiary'] },
                    { label: 'Calcoli', icon: 'pi pi-fw pi-compass', routerLink: ['/main/incentive-calculation'] },
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
                label: 'Config',
                items: [
                    { label: 'Tipi appalti', icon: 'pi pi-fw pi-building', routerLink: ['/work/project'] },
                    { label: 'Tecnici', icon: 'pi pi-fw pi-compass', routerLink: ['/work/employee'] },
                ]
            },
            {
                label: 'Gestione lavoro',
                items: [
                    { label: 'Incarichi', icon: 'pi pi-fw pi-building', routerLink: ['/work/incarico'] },
                    { label: 'Ruoli', icon: 'pi pi-fw pi-building', routerLink: ['/work/role'] },
                    { label: 'Fasi', icon: 'pi pi-fw pi-compass', routerLink: ['/work/fase'] },
                    { label: 'Categoria lavori', icon: 'pi pi-fw pi-compass', routerLink: ['/work/work-category'] },
                ]
            },
        ];
    }
}
