import { EventEmitter, Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { textChangeRangeIsUnchanged } from 'typescript';

export interface UpdateData {
    isMobile: number | undefined;
    isAnimationOn: number | undefined;
}

@Injectable({
    providedIn: 'root',
})
export class MobileSupportService {
    public isAnimationOn = -1;
    public isMobile = -1;

    public supportUpdate: EventEmitter<UpdateData> =
        new EventEmitter<UpdateData>();

    constructor(private deviceDetectorService: DeviceDetectorService) {
        setInterval(this.update.bind(this), 4000);
        this.update();
    }

    private update() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const isMobile =
            (this.deviceDetectorService.isMobile() &&
                !this.deviceDetectorService.isTablet()) ||
            viewportHeight > viewportWidth
                ? 1
                : 0;
        const isAnimationOn =
            this.deviceDetectorService.isMobile() ||
            this.deviceDetectorService.isTablet()
                ? 0
                : 1;

        const update: UpdateData = {
            isMobile: this.isMobile != isMobile ? isMobile : undefined,
            isAnimationOn:
                this.isAnimationOn != isAnimationOn ? isAnimationOn : undefined,
        };

        if (update.isMobile == 1) update.isAnimationOn = 0;
        else if (update.isMobile == 0) update.isAnimationOn = 1;

        if (update.isAnimationOn != undefined || update.isMobile != undefined)
            this.supportUpdate.emit(update);

        this.isMobile = isMobile;
        this.isAnimationOn = isAnimationOn;
    }
}
