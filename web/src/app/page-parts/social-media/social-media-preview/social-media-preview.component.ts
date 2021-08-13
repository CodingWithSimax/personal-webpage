import { Component, OnInit } from '@angular/core';
import {
    MobileSupportService,
    UpdateData,
} from 'src/app/services/mobile-support.service';
import {
    ComponentTouchSupport,
    TouchSupportService,
} from 'src/app/services/touch-support.service';
import { SocialMediaSymbolComponent } from '../social-media-symbol/social-media-symbol.component';
import { PreviewData, PreviewServiceService } from './preview-service.service';

@Component({
    selector: 'app-social-media-preview',
    templateUrl: './social-media-preview.component.html',
    styleUrls: ['./social-media-preview.component.css'],
})
export class SocialMediaPreviewComponent implements OnInit {
    public isTouchDevice = false;

    public selectedPreview = 0;
    private remainingUpdateTime = 5000;

    private interval: NodeJS.Timeout | undefined = undefined;
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

        this.previewService.updatePreview.subscribe(this.loadURL.bind(this));
        this.interval = setInterval(() => {
            this.remainingUpdateTime -= 1000;
            if (this.remainingUpdateTime <= 0) {
                this.selectedPreview++;
                if (this.selectedPreview >= this.previewService.previews.length)
                    this.selectedPreview = 0;
                SocialMediaSymbolComponent.updateHightliting.emit(
                    this.previewService.previews[this.selectedPreview].url
                );
                this.remainingUpdateTime = 5000;
            }
        }, 1000);
    }

    public ngOnDestroy(): void {
        if (this.interval != undefined) clearInterval(this.interval);
    }

    public updateMobileSupport(data: UpdateData): void {
        this.isTouchDevice = <boolean>data.isTouchDevice;
    }

    public loadURL(data: PreviewData): void {
        console.log('load data', data);
        let index = 0;
        for (const obj of this.previewService.previews) {
            if (obj.url === data.url) {
                this.selectedPreview = index;
                this.remainingUpdateTime = 5000;
                break;
            }
            index++;
        }
    }

    public redirect(args: Array<any> | undefined): void {
        if (args == undefined) return;
        this.isTouchDevice
            ? (window.location.href = <string>args[0])
            : window.open(<string>args[0], '_blank');
    }
}
