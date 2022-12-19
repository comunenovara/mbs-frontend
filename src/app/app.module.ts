import { NgModule } from '@angular/core';

import { TablerModule } from '@tabler/tabler.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PrimeSakaiLayoutModule } from './layout/prime-sakai/app.layout.module';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        BrowserModule,
		HttpClientModule,

        AppRoutingModule,
        
        TablerModule,

        PrimeSakaiLayoutModule,

    ],
    providers: [

    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
