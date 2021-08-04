import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideCircleModule } from './side-circle/side-circle.module';
import { HomeModule } from './page-parts/home/home.module';
import { ExtrasModule } from './extras/extras.module';
import { LanguagesModule } from './page-parts/languages/languages.module';
import { CodeBackgroundModule } from './code-background/code-background.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        SideCircleModule,
        HomeModule,
        ExtrasModule,
        LanguagesModule,
        CodeBackgroundModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
