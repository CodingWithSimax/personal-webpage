import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedLabelComponent } from './animated-label/animated-label.component';
import { LabelTitleComponent } from './label-title/label-title.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { MessageBoxComponent } from './message-box/message-box.component';

@NgModule({
    declarations: [
        AnimatedLabelComponent,
        LabelTitleComponent,
        CustomButtonComponent,
        MessageBoxComponent,
    ],
    imports: [CommonModule],
    exports: [
        AnimatedLabelComponent,
        LabelTitleComponent,
        CustomButtonComponent,
        MessageBoxComponent,
    ],
})
export class ExtrasModule {}
