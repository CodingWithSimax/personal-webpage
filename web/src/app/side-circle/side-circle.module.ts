import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideCircleComponent } from './side-circle.component';
import { CirclePageComponent } from './circle-page/circle-page.component';

@NgModule({
    declarations: [SideCircleComponent, CirclePageComponent],
    imports: [CommonModule],
    exports: [SideCircleComponent, CirclePageComponent],
})
export class SideCircleModule {}
