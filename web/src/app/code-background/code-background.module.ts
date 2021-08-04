import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBackgroundComponent } from './code-background.component';
import { ExtrasModule } from '../extras/extras.module';
import { LineBeginningComponent } from './line-beginning/line-beginning.component';

@NgModule({
    declarations: [CodeBackgroundComponent, LineBeginningComponent],
    imports: [CommonModule, ExtrasModule],
    exports: [CodeBackgroundComponent],
})
export class CodeBackgroundModule {}
