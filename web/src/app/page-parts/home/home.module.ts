import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ExtrasModule } from 'src/app/extras/extras.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, ExtrasModule],
    exports: [HomeComponent],
})
export class HomeModule {}
