import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaComponent } from './social-media.component';
import { ExtrasModule } from 'src/app/extras/extras.module';
import { SocialMediaSymbolComponent } from './social-media-symbol/social-media-symbol.component';

@NgModule({
    declarations: [SocialMediaComponent, SocialMediaSymbolComponent],
    imports: [CommonModule, ExtrasModule],
    exports: [SocialMediaComponent],
})
export class SocialMediaModule {}
