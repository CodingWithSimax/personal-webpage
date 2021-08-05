import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form.component';
import { ExtrasModule } from 'src/app/extras/extras.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './custom-input/custom-input.component';

@NgModule({
    declarations: [ContactFormComponent, CustomInputComponent],
    imports: [CommonModule, ExtrasModule, ReactiveFormsModule],
    exports: [ContactFormComponent],
})
export class ContactFormModule {}
