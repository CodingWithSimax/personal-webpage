import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import {
    MobileSupportService,
    UpdateData,
} from 'src/app/services/mobile-support.service';
import { HighlightSpanKind } from 'typescript';
import {
    PreviewData,
    PreviewServiceService,
} from '../social-media-preview/preview-service.service';

@Component({
    selector: 'app-social-media-symbol',
    templateUrl: './social-media-symbol.component.html',
    styleUrls: ['./social-media-symbol.component.css'],
})
export class SocialMediaSymbolComponent implements OnInit {
    public static removeHighlightning: EventEmitter<undefined> =
        new EventEmitter<undefined>();

    @Input() public src: string | undefined;
    @Input() public href: string | undefined;
    @Input() public value: string | undefined;
    @Input() public platformName: string | undefined;
    @Input() public isMobile: boolean | undefined;

    public symbolOpacity = 70;

    constructor(public previewService: PreviewServiceService) {}

    public ngOnInit(): void {
        SocialMediaSymbolComponent.removeHighlightning.subscribe(
            this.doRemoveHighlightning.bind(this)
        );
        this.previewService.addPreview({
            name: <string>this.value,
            url: <string>this.href,
            platformName: <string>this.platformName,
        });
    }

    public doRemoveHighlightning(): void {
        this.symbolOpacity = 70;
    }

    public redirect(): void {
        if (this.href != undefined) window.location.replace(this.href);
    }

    public showPage(): void {
        if (!this.isMobile) {
            SocialMediaSymbolComponent.removeHighlightning.emit(undefined);
            this.symbolOpacity = 100;
            this.previewService.changePreview(<PreviewData>{
                name: this.value,
                url: this.href,
            });
        } else {
            this.redirect();
        }
    }
}
