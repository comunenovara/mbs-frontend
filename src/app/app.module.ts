import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PrimeSakaiLayoutModule } from './layout/prime-sakai/app.layout.module';

import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { TablerModule } from './tabler/tabler.module';

@NgModule({
    imports: [
        AppRoutingModule,
        PrimeSakaiLayoutModule,
        TablerModule,

        
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },

        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    declarations: [
        NotfoundComponent,
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
