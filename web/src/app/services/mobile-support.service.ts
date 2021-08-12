import { EventEmitter, Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { textChangeRangeIsUnchanged } from 'typescript';

export interface UpdateData {
    isMobile: boolean | undefined;
    isTouchDevice: boolean | undefined;
}

@Injectable({
    providedIn: 'root',
})
export class MobileSupportService {
    public isMobile: boolean | undefined = undefined;
    public isTouchDevice: boolean | undefined = undefined;

    public supportUpdate: EventEmitter<UpdateData> =
        new EventEmitter<UpdateData>();

    constructor(private deviceDetectorService: DeviceDetectorService) {
        setInterval(this.update.bind(this), 4000);
        this.update();
    }

    public getData(): UpdateData {
        return this.update(false);
    }

    private update(sendUpdate = true): UpdateData {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const isMobileDetection = this.deviceDetectorService.isMobile();
        const isTabletDetection = this.deviceDetectorService.isTablet();

        const isMobile = viewportHeight > viewportWidth * 0.75;
        const isTouchDevice = isMobileDetection || isTabletDetection;

        const update: UpdateData = {
            isMobile:
                this.isMobile != isMobile || !sendUpdate ? isMobile : undefined,
            isTouchDevice:
                this.isTouchDevice != isTouchDevice || !sendUpdate
                    ? isTouchDevice
                    : undefined,
        };

        if (
            (update.isMobile != undefined || this.isTouchDevice != undefined) &&
            sendUpdate
        )
            this.supportUpdate.emit({
                isMobile,
                isTouchDevice,
            });

        this.isMobile = isMobile;
        this.isTouchDevice = isTouchDevice;

        return update;
    }
}
