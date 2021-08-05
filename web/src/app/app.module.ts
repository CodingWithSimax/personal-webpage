import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideCircleModule } from './side-circle/side-circle.module';
import { HomeModule } from './page-parts/home/home.module';
import { ExtrasModule } from './extras/extras.module';
import { LanguagesModule } from './page-parts/languages/languages.module';
import { CodeBackgroundModule } from './code-background/code-background.module';
import { ContactFormModule } from './page-parts/contact-form/contact-form.module';
import { SocialMediaModule } from './page-parts/social-media/social-media.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        SideCircleModule,
        HomeModule,
        ExtrasModule,
        LanguagesModule,
        CodeBackgroundModule,
        ContactFormModule,
        SocialMediaModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
