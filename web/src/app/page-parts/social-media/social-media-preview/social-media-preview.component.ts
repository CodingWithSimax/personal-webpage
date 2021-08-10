import { Component, OnInit } from '@angular/core';
import { PreviewData, PreviewServiceService } from './preview-service.service';

@Component({
    selector: 'app-social-media-preview',
    templateUrl: './social-media-preview.component.html',
    styleUrls: ['./social-media-preview.component.css'],
})
export class SocialMediaPreviewComponent implements OnInit {
    public selectedPreview = 0;

    constructor(public previewService: PreviewServiceService) {}

    public ngOnInit(): void {
        this.previewService.updatePreview.subscribe(this.loadURL.bind(this));
    }

    public loadURL(data: PreviewData): void {
        console.log('load data', data);
        let index = 0;
        for (const obj of this.previewService.previews) {
            if (obj.url === data.url) {
                this.selectedPreview = index;
                break;
            }
            index++;
        }
    }

    public redirect(url: string): void {
        window.open(url, '_blank');
    }
}
