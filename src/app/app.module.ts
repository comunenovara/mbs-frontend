import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PrimeSakaiLayoutModule } from './layout/prime-sakai/app.layout.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,

        AppRoutingModule,

        PrimeSakaiLayoutModule,

    ],
    providers: [ ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
