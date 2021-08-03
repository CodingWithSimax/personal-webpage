import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideCircleModule } from './side-circle/side-circle.module';
import { HomeModule } from './page-parts/home/home.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, SideCircleModule, HomeModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
