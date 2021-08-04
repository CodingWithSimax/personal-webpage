import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from './languages.component';
import { ExtrasModule } from 'src/app/extras/extras.module';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';

@NgModule({
    declarations: [LanguagesComponent, ProgressIndicatorComponent],
    imports: [CommonModule, ExtrasModule],
    exports: [LanguagesComponent],
})
export class LanguagesModule {}
