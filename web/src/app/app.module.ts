import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideCircleModule } from './side-circle/side-circle.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, SideCircleModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
