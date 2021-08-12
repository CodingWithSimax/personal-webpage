import { EventEmitter, Injectable } from '@angular/core';

export interface PreviewData {
    name: string;
    url: string;
    platformName: string;
}

@Injectable({
    providedIn: 'root',
})
export class PreviewServiceService {
    public updatePreview: EventEmitter<PreviewData> =
        new EventEmitter<PreviewData>();

    public previews: Array<PreviewData> = [];
    public index = 0;

    constructor() {}

    public addPreview(data: PreviewData): void {
        if (
            this.previews.filter((data2) => data2.url === data.url).length <= 0
        ) {
            this.previews.push(data);
        }
    }

    public changePreview(data: PreviewData): void {
        this.updatePreview.emit(data);
    }
}
