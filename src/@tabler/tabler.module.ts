import { NgModule } from '@angular/core';
import { TabManagerService } from './services/tab-manager.service';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { TablerTabsListComponent } from './components/tab-list/tabs-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';



const dbConfig: DBConfig = {
    name: 'tabler',
    version: 1,
    objectStoresMeta: [
        {
            store: 'tab',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'url', keypath: 'url', options: { unique: false } },
            ]
        },
        {
            store: 'card',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'url', keypath: 'url', options: { unique: false } },
            ]
        }
    ],
    migrationFactory() {
        return {
            1: (db: any, transaction: any) => {
              const store = transaction.objectStore('card');
              store.createIndex('tab', 'tab', { unique: false });
            }
        };
    },
};

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxIndexedDBModule.forRoot(dbConfig),
        
        ButtonModule,

    ],
    providers: [
        TabManagerService,

    ],
    declarations: [
        TablerTabsListComponent,

    ],
    exports: [
        TablerTabsListComponent,

    ],
})
export class TablerModule { }
