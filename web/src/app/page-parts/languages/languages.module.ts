import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from './languages.component';

@NgModule({
    declarations: [LanguagesComponent],
    imports: [CommonModule],
    exports: [LanguagesComponent],
})
export class LanguagesModule {}
