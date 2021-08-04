import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedLabelComponent } from './animated-label/animated-label.component';
import { LabelTitleComponent } from './label-title/label-title.component';

@NgModule({
    declarations: [AnimatedLabelComponent, LabelTitleComponent],
    imports: [CommonModule],
    exports: [AnimatedLabelComponent, LabelTitleComponent],
})
export class ExtrasModule {}
