import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaComponent } from './social-media.component';
import { ExtrasModule } from 'src/app/extras/extras.module';
import { SocialMediaSymbolComponent } from './social-media-symbol/social-media-symbol.component';
import { SocialMediaPreviewComponent } from './social-media-preview/social-media-preview.component';

@NgModule({
    declarations: [
        SocialMediaComponent,
        SocialMediaSymbolComponent,
        SocialMediaPreviewComponent,
    ],
    imports: [CommonModule, ExtrasModule],
    exports: [SocialMediaComponent],
})
export class SocialMediaModule {}
