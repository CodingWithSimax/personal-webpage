import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import {
    MobileSupportService,
    UpdateData,
} from 'src/app/services/mobile-support.service';
import {
    ComponentTouchSupport,
    TouchSupportService,
} from 'src/app/services/touch-support.service';
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
    public static updateHightliting: EventEmitter<string> =
        new EventEmitter<string>();

    @Input() public src: string | undefined;
    @Input() public href = '';
    @Input() public value: string | undefined;
    @Input() public platformName: string | undefined;
    @Input() public isMobile: boolean | undefined;

    public symbolOpacity = 70;
    public isTouchDevice = false;
    public componentTouchSupport: ComponentTouchSupport;

    constructor(
        public previewService: PreviewServiceService,
        private mobileSupportService: MobileSupportService,
        private touchSupportService: TouchSupportService
    ) {
        this.componentTouchSupport =
            this.touchSupportService.registerComponent(this);
    }

    public ngOnInit(): void {
        this.mobileSupportService.supportUpdate.subscribe(
            this.updateMobileSupport.bind(this)
        );
        this.updateMobileSupport(this.mobileSupportService.getData());

        SocialMediaSymbolComponent.updateHightliting.subscribe(
            this.doUpdateHightliting.bind(this)
        );
        this.previewService.addPreview({
            name: <string>this.value,
            url: <string>this.href,
            platformName: <string>this.platformName,
        });
    }

    public updateMobileSupport(data: UpdateData): void {
        this.isTouchDevice = <boolean>data.isTouchDevice;
    }

    public doUpdateHightliting(url: string): void {
        this.symbolOpacity = this.href === url ? 100 : 70;
    }

    public redirect(): void {
        if (this.href != undefined) {
            console.log('redirecting to ' + this.href + '...');
            this.isTouchDevice
                ? (window.location.href = this.href)
                : window.open(this.href, '_blank');
        }
    }

    public showPage(): void {
        if (!this.isMobile) {
            SocialMediaSymbolComponent.updateHightliting.emit(this.href);
            this.previewService.changePreview(<PreviewData>{
                name: this.value,
                url: this.href,
            });
        } else {
            this.redirect();
        }
    }
}
