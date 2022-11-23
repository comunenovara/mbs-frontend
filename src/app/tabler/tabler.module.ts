import { NgModule } from '@angular/core';
import { TabManagerService } from './services/tab-manager.service';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';



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
        NgxIndexedDBModule.forRoot(dbConfig),

    ],
    providers: [
        TabManagerService,

    ],
    declarations: [

    ],
    exports: [


    ],
})
export class TablerModule { }
