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
                label: 'MBS',
                items: [
                    { label: 'Beni immobili', icon: 'pi pi-fw pi-building', routerLink: ['/enzo/asset'] },
                    { label: 'Rilievi', icon: 'pi pi-fw pi-compass', routerLink: ['/enzo/relif'] },
                    { label: 'Interventi', icon: 'pi pi-fw pi-chart-line', routerLink: ['/enzo/operation'] },
                ]
            },
			{
                label: 'Config - Solo amministratori',
                items: [
                    { label: 'Tipi di intervento', icon: 'pi pi-fw pi-building', routerLink: ['/enzo/operation-type'] },
                    { label: 'Tipi di fascicoli', icon: 'pi pi-fw pi-compass', routerLink: ['/enzo/dossier-type'] },
                    { label: 'Tutti i fascicoli', icon: 'pi pi-fw pi-chart-line', routerLink: ['/enzo/dossier'] },
                ]
            },
            {
                label: 'Work',
                items: [
                    { label: 'Progetti', icon: 'pi pi-fw pi-building', routerLink: ['/work/progetto'] },
                    { label: 'Progetti', icon: 'pi pi-fw pi-building', routerLink: ['/work/project'] },
                    { label: 'Tecnici', icon: 'pi pi-fw pi-compass', routerLink: ['/work/tecnico'] },
                    { label: 'Tecnici', icon: 'pi pi-fw pi-compass', routerLink: ['/work/employee'] },
                    { label: 'Aziende', icon: 'pi pi-fw pi-chart-line', routerLink: ['/work/azienda'] },
                    { label: 'Aziende', icon: 'pi pi-fw pi-chart-line', routerLink: ['/work/company'] },
                ]
            },
            {
                label: 'Config - Work',
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
